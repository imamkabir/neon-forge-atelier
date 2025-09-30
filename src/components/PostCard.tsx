import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, MapPin } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface Post {
  id: string;
  userId: string;
  user: {
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
    tier: string;
  };
  type: "text" | "image" | "video";
  content: string;
  media?: string[];
  hashtags: string[];
  likes: number;
  comments: number;
  reposts: number;
  createdAt: string;
  location?: string;
}

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onRepost?: (postId: string) => void;
  onShare?: (postId: string) => void;
  isLiked?: boolean;
}

const PostCard = ({ 
  post, 
  onLike, 
  onComment, 
  onRepost, 
  onShare, 
  isLiked = false 
}: PostCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatContent = (content: string) => {
    return content.split(' ').map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <motion.span
            key={index}
            className="text-primary hover:text-primary/80 cursor-pointer font-medium"
            whileHover={{ scale: 1.05 }}
          >
            {word}{' '}
          </motion.span>
        );
      }
      if (word.startsWith('@')) {
        return (
          <motion.span
            key={index}
            className="text-violet hover:text-violet/80 cursor-pointer font-medium"
            whileHover={{ scale: 1.05 }}
          >
            {word}{' '}
          </motion.span>
        );
      }
      return word + ' ';
    });
  };

  const getTierGlow = (tier: string) => {
    switch (tier) {
      case "Enterprise":
        return "ring-2 ring-violet/30";
      case "Pro":
        return "ring-2 ring-primary/30";
      default:
        return "ring-1 ring-white/20";
    }
  };

  return (
    <motion.div
      className="post-card group"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Avatar className={`w-12 h-12 ${getTierGlow(post.user.tier)}`}>
              <img src={post.user.avatar} alt={post.user.name} className="rounded-full" />
            </Avatar>
          </motion.div>
          
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                {post.user.name}
              </h3>
              {post.user.verified && (
                <motion.div
                  className="w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              )}
              {post.user.tier !== "Free" && (
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                  {post.user.tier}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-foreground/50">
              <span>@{post.user.handle}</span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              {post.location && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{post.location}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-foreground/40 hover:text-foreground hover:bg-white/5"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-foreground/90 leading-relaxed text-lg mb-4">
          {formatContent(post.content)}
        </p>
        
        {post.media && post.media.length > 0 && (
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: imageLoaded ? 1 : 0, scale: imageLoaded ? 1 : 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={post.media[0]}
              alt="Post content"
              className="w-full h-80 object-cover"
              onLoad={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center space-x-8">
          <motion.button
            onClick={() => onLike?.(post.id)}
            className={`flex items-center space-x-2 transition-colors ${
              isLiked 
                ? 'text-crimson' 
                : 'text-foreground/50 hover:text-crimson'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </motion.div>
            <span className="font-medium">{post.likes.toLocaleString()}</span>
          </motion.button>
          
          <motion.button
            onClick={() => onComment?.(post.id)}
            className="flex items-center space-x-2 text-foreground/50 hover:text-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">{post.comments}</span>
          </motion.button>
          
          <motion.button
            onClick={() => onRepost?.(post.id)}
            className="flex items-center space-x-2 text-foreground/50 hover:text-violet transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Repeat2 className="w-5 h-5" />
            <span className="font-medium">{post.reposts}</span>
          </motion.button>
          
          <motion.button
            onClick={() => onShare?.(post.id)}
            className="flex items-center space-x-2 text-foreground/50 hover:text-foreground transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;