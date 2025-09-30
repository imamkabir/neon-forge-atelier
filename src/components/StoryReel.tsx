import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, MessageCircle } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

interface Story {
  id: string;
  userId: string;
  user: {
    name: string;
    avatar: string;
    handle: string;
  };
  type: "image" | "text";
  media?: string;
  content?: string;
  caption?: string;
  backgroundColor?: string;
  createdAt: string;
  views: number;
}

interface StoryReelProps {
  stories: Story[];
}

const StoryReel = ({ stories }: StoryReelProps) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStoryClick = (story: Story, index: number) => {
    setSelectedStory(story);
    setCurrentIndex(index);
  };

  const nextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedStory(stories[currentIndex + 1]);
    } else {
      setSelectedStory(null);
    }
  };

  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedStory(stories[currentIndex - 1]);
    }
  };

  return (
    <>
      {/* Story Reel */}
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            className="flex-shrink-0 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStoryClick(story, index)}
          >
            <div className="relative">
              {/* Story Ring */}
              <div className="story-ring p-0.5">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-violet/20">
                  {story.type === "image" && story.media ? (
                    <img
                      src={story.media}
                      alt={story.caption}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: story.backgroundColor || "#8CC5FF" }}
                    >
                      <Avatar className="w-12 h-12">
                        <img src={story.user.avatar} alt={story.user.name} />
                      </Avatar>
                    </div>
                  )}
                </div>
              </div>
              
              {/* User Name */}
              <p className="text-xs text-foreground/70 text-center mt-2 truncate w-16">
                {story.user.name.split(' ')[0]}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStory(null)}
          >
            {/* Progress Bars */}
            <div className="absolute top-4 left-4 right-4 flex space-x-1 z-10">
              {stories.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: index < currentIndex ? "100%" : "0%" }}
                    animate={{ 
                      width: index === currentIndex ? "100%" : index < currentIndex ? "100%" : "0%" 
                    }}
                    transition={{ duration: index === currentIndex ? 5 : 0 }}
                    onAnimationComplete={() => {
                      if (index === currentIndex) nextStory();
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Story Header */}
            <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 ring-2 ring-white/20">
                  <img src={selectedStory.user.avatar} alt={selectedStory.user.name} />
                </Avatar>
                <div>
                  <p className="text-white font-medium">{selectedStory.user.name}</p>
                  <p className="text-white/70 text-sm">
                    {new Date(selectedStory.createdAt).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedStory(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Story Content */}
            <motion.div
              className="w-full max-w-md mx-auto aspect-[9/16] relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {selectedStory.type === "image" && selectedStory.media ? (
                <img
                  src={selectedStory.media}
                  alt={selectedStory.caption}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div 
                  className="w-full h-full rounded-2xl flex items-center justify-center p-8"
                  style={{ backgroundColor: selectedStory.backgroundColor }}
                >
                  <p className="text-white text-2xl font-medium text-center leading-relaxed">
                    {selectedStory.content}
                  </p>
                </div>
              )}

              {/* Story Actions */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.button
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
                
                <div className="text-white/70 text-sm">
                  {selectedStory.views.toLocaleString()} views
                </div>
              </div>
            </motion.div>

            {/* Navigation Areas */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer"
              onClick={prevStory}
            />
            <div 
              className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer"
              onClick={nextStory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StoryReel;