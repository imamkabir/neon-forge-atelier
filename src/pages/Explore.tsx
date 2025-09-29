import { useState } from "react";
import { Search, TrendingUp, Users, Hash, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import BreathingDots from "@/components/BreathingDots";
import PostCard from "@/components/PostCard";
import { useSocialStore } from "@/store/socialStore";

const Explore = () => {
  const { posts, users, followedUsers, followUser, unfollowUser } = useSocialStore();
  const [searchQuery, setSearchQuery] = useState("");

  const trendingPosts = [...posts]
    .sort((a, b) => (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares))
    .slice(0, 10);

  const topUsers = [...users]
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 8);

  const allHashtags = [
    { tag: "#neon", posts: 1247, trending: true },
    { tag: "#digitalidentity", posts: 892, trending: true },
    { tag: "#luxury", posts: 743, trending: false },
    { tag: "#tech", posts: 621, trending: true },
    { tag: "#future", posts: 456, trending: false },
    { tag: "#business", posts: 398, trending: false },
    { tag: "#design", posts: 324, trending: true },
    { tag: "#innovation", posts: 287, trending: false }
  ];

  const handleFollow = (userId: string) => {
    if (followedUsers.has(userId)) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <NavBar />
      <BreathingDots />
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-headline font-bold text-neon mb-4">
              Explore
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover trending content, creators, and conversations
            </p>
          </div>

          {/* Search */}
          <div className="glass-card mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts, users, hashtags..."
                className="pl-12 h-14 text-lg bg-transparent border-none"
              />
            </div>
          </div>

          {/* Explore Tabs */}
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="glass grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="trending" className="data-[state=active]:bg-neon-blue/20">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="posts" className="data-[state=active]:bg-neon-blue/20">
                <Hash className="w-4 h-4 mr-2" />
                Posts
              </TabsTrigger>
              <TabsTrigger value="people" className="data-[state=active]:bg-neon-blue/20">
                <Users className="w-4 h-4 mr-2" />
                People
              </TabsTrigger>
              <TabsTrigger value="hashtags" className="data-[state=active]:bg-neon-blue/20">
                <Award className="w-4 h-4 mr-2" />
                Tags
              </TabsTrigger>
            </TabsList>

            {/* Trending Posts */}
            <TabsContent value="trending" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trendingPosts.map((post) => {
                  const user = users.find(u => u.id === post.userId);
                  return user ? (
                    <PostCard key={post.id} post={post} user={user} />
                  ) : null;
                })}
              </div>
            </TabsContent>

            {/* All Posts */}
            <TabsContent value="posts" className="space-y-6">
              <div className="max-w-2xl mx-auto space-y-6">
                {posts
                  .filter(post => 
                    searchQuery === "" || 
                    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map((post) => {
                    const user = users.find(u => u.id === post.userId);
                    return user ? (
                      <PostCard key={post.id} post={post} user={user} />
                    ) : null;
                  })}
              </div>
            </TabsContent>

            {/* People */}
            <TabsContent value="people" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topUsers
                  .filter(user => 
                    searchQuery === "" ||
                    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.username.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((user) => (
                    <div key={user.id} className="glass-card text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-neon-blue/30">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <h3 className="font-headline font-bold text-foreground">{user.name}</h3>
                          {user.verified && (
                            <div className="w-4 h-4 bg-neon-blue rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <p className="text-muted-foreground">@{user.username}</p>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{user.bio}</p>
                      </div>
                      
                      <div className="flex justify-center space-x-4 mb-4 text-sm">
                        <div>
                          <span className="font-bold text-foreground">{user.followers.toLocaleString()}</span>
                          <span className="text-muted-foreground ml-1">followers</span>
                        </div>
                        <div>
                          <span className="font-bold text-foreground">{user.following}</span>
                          <span className="text-muted-foreground ml-1">following</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4 justify-center">
                        {user.badges.slice(0, 2).map((badge, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-luxury-purple/20 text-luxury-periwinkle text-xs rounded-full"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      
                      <Button
                        onClick={() => handleFollow(user.id)}
                        variant={followedUsers.has(user.id) ? "outline" : "default"}
                        className={
                          followedUsers.has(user.id)
                            ? "border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10"
                            : "bg-neon-blue hover:bg-neon-blue/80 text-canvas-dark"
                        }
                      >
                        {followedUsers.has(user.id) ? "Following" : "Follow"}
                      </Button>
                    </div>
                  ))}
              </div>
            </TabsContent>

            {/* Hashtags */}
            <TabsContent value="hashtags" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allHashtags
                  .filter(hashtag => 
                    searchQuery === "" ||
                    hashtag.tag.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((hashtag, index) => (
                    <div key={index} className="glass-card hover:bg-white/10 cursor-pointer transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-neon-blue">{hashtag.tag}</h3>
                        {hashtag.trending && (
                          <div className="flex items-center space-x-1 text-accent-red">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-xs">Trending</span>
                          </div>
                        )}
                      </div>
                      <p className="text-muted-foreground">
                        {hashtag.posts.toLocaleString()} posts
                      </p>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Explore;