import { useParams } from "react-router-dom";
import { Calendar, MapPin, Link as LinkIcon, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import BreathingDots from "@/components/BreathingDots";
import PostCard from "@/components/PostCard";
import DigitalFingerprintCard from "@/components/DigitalFingerprintCard";
import { useSocialStore } from "@/store/socialStore";
import { formatDistanceToNow } from "date-fns";

const FingerprintProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { users, posts, currentUser, followedUsers, followUser, unfollowUser } = useSocialStore();
  
  const user = users.find(u => u.id === id);
  const userPosts = posts.filter(p => p.userId === id);
  const isOwnProfile = currentUser?.id === id;
  const isFollowing = followedUsers.has(id || "");

  if (!user) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center">
        <BreathingDots />
        <div className="glass-card text-center">
          <h2 className="text-2xl font-headline font-bold text-foreground mb-2">
            Profile Not Found
          </h2>
          <p className="text-muted-foreground">
            This digital fingerprint doesn't exist or has been deactivated.
          </p>
        </div>
      </div>
    );
  }

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollowUser(user.id);
    } else {
      followUser(user.id);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <NavBar />
      <BreathingDots />
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Profile Header */}
          <div className="glass-card mb-8">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Avatar & Basic Info */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-neon-blue/30 mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="text-center lg:text-left">
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className="text-3xl font-headline font-bold text-foreground">
                      {user.name}
                    </h1>
                    {user.verified && (
                      <div className="w-6 h-6 bg-neon-blue rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-xl text-muted-foreground mb-4">@{user.username}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {!isOwnProfile && (
                      <>
                        <Button
                          onClick={handleFollowToggle}
                          variant={isFollowing ? "outline" : "default"}
                          className={
                            isFollowing
                              ? "border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10"
                              : "bg-neon-blue hover:bg-neon-blue/80 text-canvas-dark"
                          }
                        >
                          {isFollowing ? "Following" : "Follow"}
                        </Button>
                        <Button variant="outline" className="border-white/20">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </>
                    )}
                    {isOwnProfile && (
                      <Button variant="outline" className="border-neon-blue/50 text-neon-blue">
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-6">
                
                {/* Bio */}
                <div>
                  <p className="text-lg text-foreground leading-relaxed mb-4">
                    {user.bio}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {formatDistanceToNow(new Date(user.joinDate), { addSuffix: true })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Digital Realm</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-neon-blue hover:underline cursor-pointer">
                        neon.tech/{user.username}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex space-x-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {userPosts.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {user.followers.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {user.following}
                    </div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neon-blue">
                      {user.streak}
                    </div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Achievements</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 bg-luxury-purple/20 text-luxury-periwinkle rounded-full flex items-center space-x-2"
                      >
                        <div className="w-2 h-2 bg-luxury-periwinkle rounded-full"></div>
                        <span className="text-sm font-medium">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Digital Fingerprint Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <DigitalFingerprintCard
                  userName={user.name}
                  fingerprintNumber={user.fingerprintNumber}
                  planLevel={user.plan}
                  dateCreated={user.joinDate}
                  badges={user.badges}
                />
              </div>
            </div>

            {/* Posts & Activity */}
            <div className="lg:col-span-8">
              <Tabs defaultValue="posts" className="w-full">
                <TabsList className="glass grid w-full grid-cols-3">
                  <TabsTrigger value="posts" className="data-[state=active]:bg-neon-blue/20">
                    Posts ({userPosts.length})
                  </TabsTrigger>
                  <TabsTrigger value="media" className="data-[state=active]:bg-neon-blue/20">
                    Media
                  </TabsTrigger>
                  <TabsTrigger value="likes" className="data-[state=active]:bg-neon-blue/20">
                    Likes
                  </TabsTrigger>
                </TabsList>

                {/* Posts Tab */}
                <TabsContent value="posts" className="space-y-6 mt-6">
                  {userPosts.length > 0 ? (
                    userPosts
                      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                      .map((post) => (
                        <PostCard key={post.id} post={post} user={user} />
                      ))
                  ) : (
                    <div className="glass-card text-center py-12">
                      <div className="text-6xl mb-4 opacity-20">📝</div>
                      <h3 className="text-xl font-headline font-bold text-foreground mb-2">
                        No posts yet
                      </h3>
                      <p className="text-muted-foreground">
                        {isOwnProfile 
                          ? "Share your first thought with the world!" 
                          : `${user.name} hasn't posted anything yet.`
                        }
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Media Tab */}
                <TabsContent value="media" className="space-y-6 mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {userPosts
                      .filter(post => post.images && post.images.length > 0)
                      .map((post) => (
                        <div key={post.id} className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                          <img
                            src={post.images![0]}
                            alt="Post media"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                  </div>
                  {userPosts.filter(post => post.images && post.images.length > 0).length === 0 && (
                    <div className="glass-card text-center py-12">
                      <div className="text-6xl mb-4 opacity-20">🖼️</div>
                      <h3 className="text-xl font-headline font-bold text-foreground mb-2">
                        No media posts
                      </h3>
                      <p className="text-muted-foreground">
                        No images or videos have been shared yet.
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Likes Tab */}
                <TabsContent value="likes" className="space-y-6 mt-6">
                  <div className="glass-card text-center py-12">
                    <div className="text-6xl mb-4 opacity-20">❤️</div>
                    <h3 className="text-xl font-headline font-bold text-foreground mb-2">
                      Liked posts are private
                    </h3>
                    <p className="text-muted-foreground">
                      Only you can see your liked posts for privacy.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FingerprintProfile;