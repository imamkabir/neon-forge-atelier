import { useState } from "react";
import { motion } from "framer-motion";
import { X, Image, Smile, MapPin, Hash, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import usersData from "@/mock/users.json";

interface ComposerProps {
  onClose: () => void;
  onPost: (content: string, media?: string[]) => void;
}

const Composer = ({ onClose, onPost }: ComposerProps) => {
  const [content, setContent] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  const currentUser = usersData[0]; // Mock current user

  const handlePost = () => {
    if (!content.trim()) return;
    onPost(content, selectedMedia.length > 0 ? selectedMedia : undefined);
  };

  const handleImageUpload = () => {
    // Mock image upload
    const mockImages = [
      "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop"
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setSelectedMedia([randomImage]);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-strong max-w-2xl w-full rounded-3xl overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-foreground">
            Create Post
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            <Avatar className="w-12 h-12 ring-2 ring-primary/30">
              <img src={currentUser.avatar} alt={currentUser.name} />
            </Avatar>
            <div className="flex-1">
              <div className="font-medium text-foreground mb-1">{currentUser.name}</div>
              <div className="text-sm text-foreground/50">@{currentUser.handle}</div>
            </div>
          </div>

          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening in your world?"
            className="min-h-32 bg-transparent border-none text-lg resize-none focus:ring-0 text-foreground placeholder:text-foreground/40"
            maxLength={280}
          />

          {/* Media Preview */}
          {selectedMedia.length > 0 && (
            <motion.div
              className="mt-4 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={selectedMedia[0]}
                alt="Selected media"
                className="w-full h-48 object-cover rounded-2xl"
              />
              <button
                onClick={() => setSelectedMedia([])}
                className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          )}

          {/* Location */}
          {location && (
            <motion.div
              className="mt-4 flex items-center space-x-2 text-sm text-foreground/60"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
              <button
                onClick={() => setLocation("")}
                className="text-foreground/40 hover:text-foreground/60"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={handleImageUpload}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-foreground/60 hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Image className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-foreground/60 hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Smile className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={() => setLocation("Digital Realm")}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-foreground/60 hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MapPin className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-foreground/60 hover:text-primary"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Hash className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-foreground/50">
              {content.length}/280
            </div>
            <motion.button
              onClick={handlePost}
              disabled={!content.trim()}
              className="btn-neon disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: content.trim() ? 1.05 : 1 }}
              whileTap={{ scale: content.trim() ? 0.95 : 1 }}
            >
              <Send className="w-4 h-4 mr-2" />
              Post
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Composer;