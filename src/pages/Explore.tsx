import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, TrendingUp, Users, Hash, Star, MapPin, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import AuraBackground from "@/components/AuraBackground";
import PostCard from "@/components/PostCard";
import usersData from "@/mock/users.json";
import postsData from "@/mock/posts.json";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("trending");

  // Enhanced posts with user data
  const enhancedPosts = postsData.map(post => ({
    ...post,
    user: usersData.find(user => user.id === post.userId)!
  }));

  const trendingPosts = [...enhancedPosts]
    .sort((a, b) => (b.likes + b.comments + b.reposts) - (a.likes + a.comments + a.reposts))
    .slice(0, 6);

  const trendingHashtags = [
    { tag: "#neon", posts: 1247, growth: "+23%" },
    { tag: "#digitalidentity", posts: 892, growth: "+18%" },
    { tag: "#luxury", posts: 743, growth: "+12%" },
    { tag: "#future", posts: 621, growth: "+31%" },
    { tag: "#business", posts: 456, growth: "+8%" },
    { tag: "#design", posts: 398, growth: "+15%" }
  ];

  const suggestedUsers = usersData.slice(1, 7);

  const filteredContent = {
    posts: enhancedPosts.filter(post =>
      searchQuery === "" ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    users: suggestedUsers.filter(user =>
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.handle.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    hashtags: trendingHashtags.filter(hashtag =>
      searchQuery === "" ||
      hashtag.tag.toLowerCase().includes(searchQuery.toLowerCase())
    )
  };

  return (
    <AuraBackground variant="blue" intensity="subtle">
      <NavBar />
      
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          
          {/* Hero */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
              <span className="text-luxury">Explore</span>{" "}
              Excellence
            </h1>
            <p className="text-xl text-foreground/70 font-light max-w-3xl mx-auto">
              Discover trending content, exceptional creators, and conversations that matter
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            className="glass-card mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts, creators, hashtags..."
                className="pl-14 h-16 text-lg bg-transparent border-none focus:ring-0"
              />
            </div>
          </motion.div>

          {/* Explore Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="glass grid w-full grid-cols-4 max-w-2xl mx-auto mb-12">
                <TabsTrigger value="trending" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="posts" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  <Hash className="w-4 h-4 mr-2" />
                  Posts
                </TabsTrigger>
                <TabsTrigger value="people" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  <Users className="w-4 h-4 mr-2" />
                  People
                </TabsTrigger>
                <TabsTrigger value="hashtags" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  <Star className="w-4 h-4 mr-2" />
                  Tags
                </TabsTrigger>
              </TabsList>

              {/* Trending Posts */}
              <TabsContent value="trending" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <AnimatePresence>
                    {trendingPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                      >
                        <PostCard post={post} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </TabsContent>

              {/* All Posts */}
              <TabsContent value="posts" className="space-y-8">
                <div className="max-w-2xl mx-auto space-y-8">
                  <AnimatePresence>
                    {filteredContent.posts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ delay: index * 0.05, duration: 0.6 }}
                      >
                        <PostCard post={post} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </TabsContent>

              {/* People */}
              <TabsContent value="people" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredContent.users.map((user, index) => (
                      <motion.div
                        key={user.id}
                        className="glass-card text-center group cursor-pointer"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                      >
                        <motion.div
                          className="relative mb-6"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Avatar className="w-20 h-20 mx-auto ring-2 ring-primary/30">
                            <img src={user.avatar} alt={user.name} />
                          </Avatar>
                          {user.tier !== "Free" && (
                            <motion.div
                              className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
                            >
                              <Star className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                        
                        <div className="mb-6">
                          <div className="flex items-center justify-center space-x-2 mb-2">
                            <h3 className="font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                              {user.name}
                            </h3>
                            {user.verified && (
                              <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full" />
                              </div>
                            )}
                          </div>
                          <p className="text-foreground/60 text-sm mb-3">@{user.handle}</p>
                          <p className="text-foreground/70 text-sm line-clamp-2 leading-relaxed">
                            {user.bio}
                          </p>
                        </div>
                        
                        <div className="flex justify-center space-x-6 mb-6 text-sm">
                          <div>
                            <span className="font-bold text-foreground">{user.followers.toLocaleString()}</span>
                            <span className="text-foreground/50 ml-1">followers</span>
                          </div>
                          <div>
                            <span className="font-bold text-foreground">{user.posts}</span>
                            <span className="text-foreground/50 ml-1">posts</span>
                          </div>
                        </div>
                        
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button className="btn-neon w-full">
                            Follow
                          </Button>
                        </motion.div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </TabsContent>

              {/* Hashtags */}
              <TabsContent value="hashtags" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredContent.hashtags.map((hashtag, index) => (
                      <motion.div
                        key={index}
                        className="glass-card hover:bg-white/10 cursor-pointer group"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                            {hashtag.tag}
                          </h3>
                          <motion.div
                            className="flex items-center space-x-1 text-green-400"
                            whileHover={{ scale: 1.1 }}
                          >
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-medium">{hashtag.growth}</span>
                          </motion.div>
                        </div>
                        
                        <div className="text-foreground/60 mb-4">
                          {hashtag.posts.toLocaleString()} posts
                        </div>
                        
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-violet rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((hashtag.posts / 1500) * 100, 100)}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </AuraBackground>
  );
};

export default Explore;