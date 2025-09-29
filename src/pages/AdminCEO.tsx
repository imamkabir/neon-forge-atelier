import { useState } from "react";
import { Crown, Users, TrendingUp, Shield, Settings, BarChart3, AlertTriangle, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import BreathingDots from "@/components/BreathingDots";
import StatsCard from "@/components/StatsCard";
import { useSocialStore } from "@/store/socialStore";
import { formatDistanceToNow } from "date-fns";

const AdminCEO = () => {
  const { users, posts } = useSocialStore();
  const [featureFlags, setFeatureFlags] = useState({
    newUserRegistration: true,
    premiumFeatures: true,
    socialFeed: true,
    messaging: true,
    analytics: true,
    templateEditor: true
  });

  // Mock analytics data
  const analytics = {
    totalRevenue: 247500,
    monthlyGrowth: 23.5,
    activeUsers: users.length * 100,
    totalPosts: posts.length * 50,
    engagement: 87.2,
    conversionRate: 4.8
  };

  const topPerformers = users
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 5);

  const recentActivity = [
    { type: 'user_signup', user: 'Alex Rivera', time: '2 minutes ago', impact: 'high' },
    { type: 'premium_upgrade', user: 'Maya Chen', time: '15 minutes ago', impact: 'high' },
    { type: 'post_viral', user: 'David Park', time: '1 hour ago', impact: 'medium' },
    { type: 'security_alert', user: 'System', time: '2 hours ago', impact: 'critical' },
    { type: 'feature_request', user: 'Sarah Wilson', time: '3 hours ago', impact: 'low' }
  ];

  const toggleFeature = (feature: keyof typeof featureFlags) => {
    setFeatureFlags(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  return (
    <div className="min-h-screen bg-background relative">
      <NavBar />
      <BreathingDots />
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* CEO Header */}
          <div className="glass-card mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-luxury-purple to-luxury-lavender rounded-full flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-headline font-bold text-luxury">
                    CEO Command Center
                  </h1>
                  <p className="text-muted-foreground">
                    Executive oversight and strategic control
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-2xl font-bold text-neon-blue">
                    ${analytics.totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">
                    +{analytics.monthlyGrowth}%
                  </div>
                  <div className="text-sm text-muted-foreground">Growth Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Executive Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="glass grid w-full grid-cols-6">
              <TabsTrigger value="overview" className="data-[state=active]:bg-luxury-purple/30">
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-luxury-purple/30">
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="staff" className="data-[state=active]:bg-luxury-purple/30">
                <Shield className="w-4 h-4 mr-2" />
                Staff
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-luxury-purple/30">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-luxury-purple/30">
                <Settings className="w-4 h-4 mr-2" />
                Features
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-luxury-purple/30">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Company Overview */}
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Active Users"
                  value={analytics.activeUsers.toLocaleString()}
                  change="+12.5%"
                  trend="up"
                  icon={Users}
                />
                <StatsCard
                  title="Total Posts"
                  value={analytics.totalPosts.toLocaleString()}
                  change="+8.2%"
                  trend="up"
                  icon={TrendingUp}
                />
                <StatsCard
                  title="Engagement Rate"
                  value={`${analytics.engagement}%`}
                  change="+3.1%"
                  trend="up"
                  icon={Star}
                />
                <StatsCard
                  title="Conversion Rate"
                  value={`${analytics.conversionRate}%`}
                  change="+0.8%"
                  trend="up"
                  icon={BarChart3}
                />
              </div>

              {/* Recent Activity & Top Performers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Activity */}
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-foreground">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.impact === 'critical' ? 'bg-red-500' :
                            activity.impact === 'high' ? 'bg-yellow-500' :
                            activity.impact === 'medium' ? 'bg-blue-500' : 'bg-gray-500'
                          }`}></div>
                          <div>
                            <div className="font-medium text-foreground">
                              {activity.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </div>
                            <div className="text-sm text-muted-foreground">{activity.user}</div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Top Performers */}
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-foreground">Top Performers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topPerformers.map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg font-bold text-luxury-periwinkle">
                            #{index + 1}
                          </div>
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
                        <div className="text-right">
                          <div className="font-bold text-neon-blue">
                            {user.followers.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">followers</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* User Management */}
            <TabsContent value="users" className="space-y-6 mt-6">
              <div className="glass-card">
                <h3 className="text-xl font-headline font-bold text-foreground mb-6">
                  User Management
                </h3>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            @{user.username} • {user.plan} Plan
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Joined {formatDistanceToNow(new Date(user.joinDate), { addSuffix: true })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right text-sm">
                          <div className="text-foreground">{user.followers} followers</div>
                          <div className="text-muted-foreground">{user.streak} day streak</div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Staff Oversight */}
            <TabsContent value="staff" className="space-y-6 mt-6">
              <div className="glass-card">
                <h3 className="text-xl font-headline font-bold text-foreground mb-6">
                  Staff Oversight
                </h3>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-20">👥</div>
                  <h3 className="text-xl font-headline font-bold text-foreground mb-2">
                    Staff Management System
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Monitor staff performance, assign roles, and track activity logs
                  </p>
                  <Button className="btn-neon">
                    Manage Staff Access
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Strategic Analytics */}
            <TabsContent value="analytics" className="space-y-6 mt-6">
              <div className="glass-card">
                <h3 className="text-xl font-headline font-bold text-foreground mb-6">
                  Strategic Analytics
                </h3>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-20">📊</div>
                  <h3 className="text-xl font-headline font-bold text-foreground mb-2">
                    Advanced Analytics Dashboard
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Revenue trends, user behavior insights, and growth projections
                  </p>
                  <Button className="btn-neon">
                    View Full Analytics
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Feature Flags */}
            <TabsContent value="features" className="space-y-6 mt-6">
              <div className="glass-card">
                <h3 className="text-xl font-headline font-bold text-foreground mb-6">
                  Feature Control Center
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(featureFlags).map(([feature, enabled]) => (
                    <div key={feature} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div>
                        <div className="font-semibold text-foreground capitalize">
                          {feature.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {feature === 'newUserRegistration' && 'Allow new users to sign up'}
                          {feature === 'premiumFeatures' && 'Enable premium subscription features'}
                          {feature === 'socialFeed' && 'Show social media feed'}
                          {feature === 'messaging' && 'Enable user messaging system'}
                          {feature === 'analytics' && 'Show analytics to users'}
                          {feature === 'templateEditor' && 'Allow template customization'}
                        </div>
                      </div>
                      <Switch
                        checked={enabled}
                        onCheckedChange={() => toggleFeature(feature as keyof typeof featureFlags)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Security Center */}
            <TabsContent value="security" className="space-y-6 mt-6">
              <div className="glass-card">
                <h3 className="text-xl font-headline font-bold text-foreground mb-6">
                  Security Command Center
                </h3>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-20">🔒</div>
                  <h3 className="text-xl font-headline font-bold text-foreground mb-2">
                    Advanced Security Monitoring
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Track logins, monitor anomalies, and manage security protocols
                  </p>
                  <Button className="btn-neon">
                    Security Dashboard
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminCEO;