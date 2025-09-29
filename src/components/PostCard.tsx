import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useSocialStore, type Post, type User } from "@/store/socialStore";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  user: User;
}

const PostCard = ({ post, user }: PostCardProps) => {
  const { likedPosts, likePost, unlikePost } = useSocialStore();
  const isLiked = likedPosts.has(post.id);

  const handleLike = () => {
    if (isLiked) {
      unlikePost(post.id);
    } else {
      likePost(post.id);
    }
  };

  const formatHashtags = (content: string) => {
    return content.split(' ').map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <span key={index} className="text-neon-blue hover:underline cursor-pointer">
            {word}{' '}
          </span>
        );
      }
      return word + ' ';
    });
  };

  return (
    <div className="glass-card hover:bg-white/10 transition-all duration-300 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-12 h-12 ring-2 ring-neon-blue/30">
            <img src={user.avatar} alt={user.name} className="rounded-full" />
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground">{user.name}</h3>
              {user.verified && (
                <div className="w-4 h-4 bg-neon-blue rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
              {user.badges.includes('Neon Pioneer') && (
                <div className="px-2 py-0.5 bg-luxury-purple/20 text-luxury-periwinkle text-xs rounded-full">
                  Pioneer
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>@{user.username}</span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-foreground leading-relaxed text-lg">
          {formatHashtags(post.content)}
        </p>
        
        {post.images && post.images.length > 0 && (
          <div className="mt-4 rounded-xl overflow-hidden">
            <img 
              src={post.images[0]} 
              alt="Post content" 
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center space-x-2 ${
              isLiked 
                ? 'text-accent-red hover:text-accent-red/80' 
                : 'text-muted-foreground hover:text-accent-red'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-muted-foreground hover:text-neon-blue"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-muted-foreground hover:text-luxury-periwinkle"
          >
            <Share className="w-5 h-5" />
            <span>{post.shares}</span>
          </Button>
        </div>
        
        {post.isPinned && (
          <div className="text-xs text-luxury-periwinkle bg-luxury-purple/20 px-2 py-1 rounded-full">
            Pinned
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;