import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Calendar, MapPin, Globe, Users, Heart, Repeat2, Share, MoveHorizontal as MoreHorizontal, UserPlus, UserCheck, Crown, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import NavBar from "@/components/NavBar";
import AuraBackground from "@/components/AuraBackground";
import PostCard from "@/components/PostCard";
import usersData from "@/mock/users.json";
import postsData from "@/mock/posts.json";
import { formatDistanceToNow } from "date-fns";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [bannerLoaded, setBannerLoaded] = useState(false);

  const user = usersData.find(u => u.id === id);
  const userPosts = postsData.filter(p => p.userId === id).map(post => ({
    ...post,
    user: user!
  }));

  useEffect(() => {
    if (user) {
      setFollowerCount(user.followers);
      // Mock following status
      setIsFollowing(Math.random() > 0.5);
    }
  }, [user]);

  if (!user) {
    return (
      <AuraBackground>
        <NavBar />
        <div className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              Profile Not Found
            </h2>
            <p className="text-foreground/60">
              This digital fingerprint doesn't exist or has been deactivated.
            </p>
          </div>
        </div>
      </AuraBackground>
    );
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
  };

  // Generate personalized banner from username hash
  const generateBannerGradient = (name: string) => {
    const hash = name.split("").reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const hue1 = Math.abs(hash) % 360;
    const hue2 = (hue1 + 60) % 360;
    
    return `linear-gradient(135deg, hsl(${hue1}, 30%, 15%), hsl(${hue2}, 25%, 10%))`;
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Enterprise":
        return <Crown className="w-4 h-4 text-violet" />;
      case "Pro":
        return <Star className="w-4 h-4 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <AuraBackground variant="blue" intensity="subtle">
      <NavBar />
      
      <div className="pt-24">
        {/* Hero Banner */}
        <motion.div
          className="relative h-80 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: bannerLoaded ? 1 : 0 }}
          onAnimationComplete={() => setBannerLoaded(true)}
        >
          <div 
            className="absolute inset-0"
            style={{ background: generateBannerGradient(user.name) }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* Floating Elements */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>

        <div className="container mx-auto px-6 -mt-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* Profile Header */}
            <motion.div
              className="glass-card mb-8"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Avatar & Basic Info */}
                <div className="flex flex-col items-center lg:items-start">
                  <motion.div
                    className="relative mb-6"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                  >
                    <Avatar className="w-32 h-32 ring-4 ring-primary/30 shadow-2xl shadow-primary/20">
                      <img src={user.avatar} alt={user.name} />
                    </Avatar>
                    
                    {/* Tier Indicator */}
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-10 h-10 bg-background rounded-full border-2 border-primary/30 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                    >
                      {getTierIcon(user.tier) || (
                        <div className="w-4 h-4 bg-primary/50 rounded-full" />
                      )}
                    </motion.div>
                  </motion.div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      onClick={handleFollow}
                      className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                        isFollowing
                          ? "bg-white/10 text-foreground border border-white/20 hover:bg-white/20"
                          : "btn-neon"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="w-4 h-4 mr-2" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Follow
                        </>
                      )}
                    </motion.button>
                    
                    <motion.button
                      className="btn-glass"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </motion.button>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="flex-1 space-y-6">
                  
                  {/* Name & Handle */}
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <motion.h1
                        className="text-4xl font-serif font-bold text-foreground"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                      >
                        {user.name}
                      </motion.h1>
                      {user.verified && (
                        <motion.div
                          className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.7, type: "spring" }}
                        >
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </div>
                    
                    <motion.p
                      className="text-xl text-foreground/60 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      @{user.handle}
                    </motion.p>
                  </div>

                  {/* Bio */}
                  <motion.p
                    className="text-lg text-foreground/80 leading-relaxed max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    {user.bio}
                  </motion.p>

                  {/* Meta Info */}
                  <motion.div
                    className="flex flex-wrap gap-6 text-sm text-foreground/60"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {formatDistanceToNow(new Date(user.joinDate), { addSuffix: true })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                    {user.website && (
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <a 
                          href={user.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          {user.website.replace('https://', '')}
                        </a>
                      </div>
                    )}
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    className="flex space-x-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    <div className="text-center">
                      <motion.div
                        className="text-2xl font-bold text-foreground"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                      >
                        {userPosts.length}
                      </motion.div>
                      <div className="text-sm text-foreground/60">Posts</div>
                    </div>
                    <div className="text-center">
                      <motion.div
                        className="text-2xl font-bold text-foreground"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1, type: "spring" }}
                      >
                        {followerCount.toLocaleString()}
                      </motion.div>
                      <div className="text-sm text-foreground/60">Followers</div>
                    </div>
                    <div className="text-center">
                      <motion.div
                        className="text-2xl font-bold text-foreground"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, type: "spring" }}
                      >
                        {user.following}
                      </motion.div>
                      <div className="text-sm text-foreground/60">Following</div>
                    </div>
                    <div className="text-center">
                      <motion.div
                        className="text-2xl font-bold text-primary"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3, type: "spring" }}
                      >
                        {user.score.toLocaleString()}
                      </motion.div>
                      <div className="text-sm text-foreground/60">Score</div>
                    </div>
                  </motion.div>

                  {/* Badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <h4 className="font-serif font-semibold text-foreground mb-4">Achievements</h4>
                    <div className="flex flex-wrap gap-3">
                      {user.badges.map((badge, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-2 px-4 py-2 glass rounded-full border border-primary/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          <Award className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">{badge}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Neon Digital Fingerprint Card */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="fingerprint-card max-w-md mx-auto lg:mx-0">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-sm" />
                    </div>
                    <span className="font-serif font-bold text-primary text-sm tracking-wide">
                      NEON TECH
                    </span>
                  </div>
                  <div className="text-xs text-foreground/40 font-mono">
                    DIGITAL ID
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-1">
                    {user.name}
                  </h3>
                  <div className="text-foreground/60 text-sm mb-2">
                    Digital {user.tier} Member
                  </div>
                  <div className="text-xs text-foreground/40">
                    ID: {user.fingerprintId}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                  <div>
                    <div className="text-lg font-bold text-primary">{user.posts}</div>
                    <div className="text-xs text-foreground/50">Posts</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-violet">{(user.followers / 1000).toFixed(1)}K</div>
                    <div className="text-xs text-foreground/50">Reach</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-crimson">{user.tier}</div>
                    <div className="text-xs text-foreground/50">Tier</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-foreground/40">
                  <span>Member since {user.joinDate}</span>
                  <div className="w-3 h-3 bg-primary/50 rounded-full animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* Posts & Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Tabs defaultValue="posts" className="w-full">
                <TabsList className="glass grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="posts" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                    Posts ({userPosts.length})
                  </TabsTrigger>
                  <TabsTrigger value="media" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                    Media
                  </TabsTrigger>
                  <TabsTrigger value="likes" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                    Likes
                  </TabsTrigger>
                  <TabsTrigger value="about" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                    About
                  </TabsTrigger>
                </TabsList>

                {/* Posts Tab */}
                <TabsContent value="posts" className="space-y-8">
                  <AnimatePresence>
                    {userPosts.length > 0 ? (
                      userPosts
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map((post, index) => (
                          <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                          >
                            <PostCard post={post} />
                          </motion.div>
                        ))
                    ) : (
                      <motion.div
                        className="glass-card text-center py-16"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="text-6xl mb-6 opacity-20">📝</div>
                        <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                          No posts yet
                        </h3>
                        <p className="text-foreground/60">
                          {user.name} hasn't shared anything yet.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TabsContent>

                {/* Media Tab */}
                <TabsContent value="media" className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {userPosts
                      .filter(post => post.media && post.media.length > 0)
                      .map((post, index) => (
                        <motion.div
                          key={post.id}
                          className="aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.6 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={post.media![0]}
                            alt="Post media"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </motion.div>
                      ))}
                  </div>
                </TabsContent>

                {/* About Tab */}
                <TabsContent value="about" className="space-y-6">
                  <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-xl font-serif font-bold text-foreground mb-4">
                      About {user.name}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed mb-6">
                      {user.bio}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-foreground/60">Location</span>
                            <span className="text-foreground">{user.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-foreground/60">Tier</span>
                            <span className="text-foreground">{user.tier}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-foreground/60">Score</span>
                            <span className="text-foreground">{user.score.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Achievements</h4>
                        <div className="space-y-2">
                          {user.badges.map((badge, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Award className="w-3 h-3 text-primary" />
                              <span className="text-sm text-foreground/80">{badge}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </AuraBackground>
  );
};

export default Profile;