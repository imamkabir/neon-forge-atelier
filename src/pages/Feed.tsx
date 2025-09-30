import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles, TrendingUp, Users, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import AuraBackground from "@/components/AuraBackground";
import StoryReel from "@/components/StoryReel";
import PostCard from "@/components/PostCard";
import Composer from "@/components/Composer";

// Mock data imports
import usersData from "@/mock/users.json";
import postsData from "@/mock/posts.json";
import storiesData from "@/mock/stories.json";

const Feed = () => {
  const [posts, setPosts] = useState(postsData);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [showComposer, setShowComposer] = useState(false);

  // Enhance posts with user data
  const enhancedPosts = posts.map(post => ({
    ...post,
    user: usersData.find(user => user.id === post.userId)!
  }));

  // Enhance stories with user data
  const enhancedStories = storiesData.map(story => ({
    ...story,
    user: usersData.find(user => user.id === story.userId)!
  }));

  const trendingHashtags = [
    { tag: "#neon", posts: 1247, trending: true },
    { tag: "#digitalidentity", posts: 892, trending: true },
    { tag: "#luxury", posts: 743, trending: false },
    { tag: "#future", posts: 621, trending: true },
    { tag: "#business", posts: 456, trending: false }
  ];

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
        setPosts(posts.map(p => 
          p.id === postId ? { ...p, likes: p.likes - 1 } : p
        ));
      } else {
        newLiked.add(postId);
        setPosts(posts.map(p => 
          p.id === postId ? { ...p, likes: p.likes + 1 } : p
        ));
      }
      return newLiked;
    });
  };

  const handleNewPost = (content: string, media?: string[]) => {
    const newPost = {
      id: Date.now().toString(),
      userId: "1", // Current user
      type: media && media.length > 0 ? "image" : "text" as const,
      content,
      media,
      hashtags: content.match(/#\w+/g)?.map(tag => tag.substring(1)) || [],
      likes: 0,
      comments: 0,
      reposts: 0,
      createdAt: new Date().toISOString(),
      location: "Digital Realm"
    };

    setPosts([newPost, ...posts]);
    setShowComposer(false);
  };

  const sortedPosts = {
    top: [...enhancedPosts].sort((a, b) => (b.likes + b.comments + b.reposts) - (a.likes + a.comments + a.reposts)),
    following: enhancedPosts.filter(post => ["2", "3", "4"].includes(post.userId)), // Mock following
    newest: [...enhancedPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  };

  return (
    <AuraBackground variant="blue" intensity="subtle">
      <NavBar />
      
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <div className="sticky top-32">
                {/* User Quick Card */}
                <motion.div
                  className="glass-card text-center"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Avatar className="w-16 h-16 mx-auto mb-4 ring-2 ring-primary/30">
                    <img src={usersData[0].avatar} alt={usersData[0].name} />
                  </Avatar>
                  <h3 className="font-serif font-bold text-foreground mb-2">
                    {usersData[0].name}
                  </h3>
                  <p className="text-foreground/60 text-sm mb-4">@{usersData[0].handle}</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-bold text-foreground">{usersData[0].posts}</div>
                      <div className="text-xs text-foreground/50">Posts</div>
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{usersData[0].followers.toLocaleString()}</div>
                      <div className="text-xs text-foreground/50">Followers</div>
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{usersData[0].following}</div>
                      <div className="text-xs text-foreground/50">Following</div>
                    </div>
                  </div>
                </motion.div>

                {/* Trending */}
                <motion.div
                  className="glass-card"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="font-serif font-bold text-foreground">Trending</h3>
                  </div>
                  <div className="space-y-4">
                    {trendingHashtags.map((hashtag, index) => (
                      <motion.div
                        key={index}
                        className="hover:bg-white/5 p-3 rounded-xl cursor-pointer transition-colors group"
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-primary font-medium group-hover:text-primary/80 transition-colors">
                              {hashtag.tag}
                            </div>
                            <div className="text-sm text-foreground/50">
                              {hashtag.posts.toLocaleString()} posts
                            </div>
                          </div>
                          {hashtag.trending && (
                            <motion.div
                              className="w-2 h-2 bg-crimson rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-6 space-y-8">
              {/* Stories */}
              <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-2 mb-6">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-serif font-bold text-foreground">Stories</h3>
                </div>
                <StoryReel stories={enhancedStories} />
              </motion.div>

              {/* Composer */}
              <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12 ring-2 ring-primary/30">
                    <img src={usersData[0].avatar} alt={usersData[0].name} />
                  </Avatar>
                  
                  <button
                    onClick={() => setShowComposer(true)}
                    className="flex-1 text-left px-6 py-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors text-foreground/60"
                  >
                    What's happening in your world?
                  </button>
                  
                  <motion.button
                    onClick={() => setShowComposer(true)}
                    className="p-3 bg-primary hover:bg-primary/80 rounded-xl text-background"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Feed Tabs */}
              <Tabs defaultValue="top" className="w-full">
                <TabsList className="glass w-full grid grid-cols-3 mb-8">
                  <TabsTrigger value="top" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                    Top
                  </TabsTrigger>
                  <TabsTrigger value="following" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                    Following
                  </TabsTrigger>
                  <TabsTrigger value="newest" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                    Newest
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="top" className="space-y-8">
                  <AnimatePresence>
                    {sortedPosts.top.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                      >
                        <PostCard
                          post={post}
                          onLike={handleLike}
                          isLiked={likedPosts.has(post.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </TabsContent>

                <TabsContent value="following" className="space-y-8">
                  <AnimatePresence>
                    {sortedPosts.following.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                      >
                        <PostCard
                          post={post}
                          onLike={handleLike}
                          isLiked={likedPosts.has(post.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </TabsContent>

                <TabsContent value="newest" className="space-y-8">
                  <AnimatePresence>
                    {sortedPosts.newest.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                      >
                        <PostCard
                          post={post}
                          onLike={handleLike}
                          isLiked={likedPosts.has(post.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <div className="sticky top-32 space-y-6">
                {/* Suggested Follows */}
                <motion.div
                  className="glass-card"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center space-x-2 mb-6">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="font-serif font-bold text-foreground">Discover</h3>
                  </div>
                  <div className="space-y-4">
                    {usersData.slice(1, 4).map((user, index) => (
                      <motion.div
                        key={user.id}
                        className="flex items-center justify-between group"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10 ring-1 ring-white/20">
                            <img src={user.avatar} alt={user.name} />
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {user.name}
                            </div>
                            <div className="text-sm text-foreground/50">@{user.handle}</div>
                          </div>
                        </div>
                        <motion.button
                          className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-sm font-medium transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Follow
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  className="glass-card"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h3 className="font-serif font-bold text-foreground mb-6">Your Impact</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Profile Views</span>
                      <span className="font-bold text-primary">2.4K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Post Reach</span>
                      <span className="font-bold text-violet">15.7K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Engagement Rate</span>
                      <span className="font-bold text-crimson">8.9%</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Composer Modal */}
      <AnimatePresence>
        {showComposer && (
          <Composer
            onClose={() => setShowComposer(false)}
            onPost={handleNewPost}
          />
        )}
      </AnimatePresence>
    </AuraBackground>
  );
};

export default Feed;