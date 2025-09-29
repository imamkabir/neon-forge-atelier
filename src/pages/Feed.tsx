import { useState } from "react";
import { Plus, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import NavBar from "@/components/NavBar";
import BreathingDots from "@/components/BreathingDots";
import PostCard from "@/components/PostCard";
import DigitalFingerprintCard from "@/components/DigitalFingerprintCard";
import { useSocialStore } from "@/store/socialStore";
import { toast } from "sonner";

const Feed = () => {
  const { posts, users, currentUser, trendingHashtags, createPost } = useSocialStore();
  const [newPostContent, setNewPostContent] = useState("");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    
    const hashtags = newPostContent.match(/#\w+/g)?.map(tag => tag.substring(1)) || [];
    createPost(newPostContent, hashtags);
    setNewPostContent("");
    setIsCreatePostOpen(false);
    toast("Post created successfully!");
  };

  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="min-h-screen bg-background relative">
      <NavBar />
      <BreathingDots />
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              {/* User Fingerprint Card */}
              {currentUser && (
                <div className="sticky top-24">
                  <DigitalFingerprintCard
                    userName={currentUser.name}
                    fingerprintNumber={currentUser.fingerprintNumber}
                    planLevel={currentUser.plan}
                    dateCreated={currentUser.joinDate}
                    badges={currentUser.badges}
                  />
                </div>
              )}
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-6 space-y-6">
              {/* Create Post */}
              <div className="glass-card">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue/20 to-luxury-purple/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-neon-blue">
                      {currentUser?.name.charAt(0)}
                    </span>
                  </div>
                  
                  <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
                    <DialogTrigger asChild>
                      <Input
                        placeholder="What's happening in your world?"
                        className="flex-1 bg-white/5 border-white/20 hover:bg-white/10 cursor-pointer"
                        readOnly
                      />
                    </DialogTrigger>
                    <DialogContent className="bg-canvas-surface border-white/20 max-w-2xl">
                      <div className="space-y-4">
                        <h2 className="text-xl font-headline font-bold text-foreground">
                          Create Post
                        </h2>
                        <Textarea
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          placeholder="What's happening in your world?"
                          className="min-h-32 bg-white/5 border-white/20 resize-none text-lg"
                          maxLength={280}
                        />
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {newPostContent.length}/280
                          </div>
                          <Button
                            onClick={handleCreatePost}
                            disabled={!newPostContent.trim()}
                            className="btn-neon"
                          >
                            Post
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button
                    onClick={() => setIsCreatePostOpen(true)}
                    size="icon"
                    className="bg-neon-blue hover:bg-neon-blue/80 text-canvas-dark"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Feed Tabs */}
              <Tabs defaultValue="top" className="w-full">
                <TabsList className="glass w-full grid grid-cols-3">
                  <TabsTrigger value="top" className="data-[state=active]:bg-neon-blue/20">
                    Top
                  </TabsTrigger>
                  <TabsTrigger value="following" className="data-[state=active]:bg-neon-blue/20">
                    Following
                  </TabsTrigger>
                  <TabsTrigger value="newest" className="data-[state=active]:bg-neon-blue/20">
                    Newest
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="top" className="space-y-6 mt-6">
                  {sortedPosts
                    .sort((a, b) => b.likes - a.likes)
                    .map((post) => {
                      const user = users.find(u => u.id === post.userId);
                      return user ? <PostCard key={post.id} post={post} user={user} /> : null;
                    })}
                </TabsContent>

                <TabsContent value="following" className="space-y-6 mt-6">
                  {sortedPosts
                    .filter(post => currentUser?.following || false)
                    .map((post) => {
                      const user = users.find(u => u.id === post.userId);
                      return user ? <PostCard key={post.id} post={post} user={user} /> : null;
                    })}
                </TabsContent>

                <TabsContent value="newest" className="space-y-6 mt-6">
                  {sortedPosts.map((post) => {
                    const user = users.find(u => u.id === post.userId);
                    return user ? <PostCard key={post.id} post={post} user={user} /> : null;
                  })}
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <div className="glass-card">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search posts, users..."
                      className="pl-10 bg-transparent border-none"
                    />
                  </div>
                </div>

                {/* Trending */}
                <div className="glass-card">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-neon-blue" />
                    <h3 className="font-headline font-bold text-foreground">Trending</h3>
                  </div>
                  <div className="space-y-3">
                    {trendingHashtags.slice(0, 5).map((hashtag, index) => (
                      <div key={index} className="hover:bg-white/5 p-2 rounded-lg cursor-pointer transition-colors">
                        <div className="text-neon-blue font-medium">{hashtag}</div>
                        <div className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 1000) + 100} posts
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Follows */}
                <div className="glass-card">
                  <h3 className="font-headline font-bold text-foreground mb-4">
                    People You May Know
                  </h3>
                  <div className="space-y-4">
                    {users.slice(1, 3).map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-medium text-foreground">{user.name}</div>
                            <div className="text-sm text-muted-foreground">@{user.username}</div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10">
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;