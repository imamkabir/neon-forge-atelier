import { useState } from "react";
import { Shield, Users, MessageSquare, AlertCircle, FileText, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import BreathingDots from "@/components/BreathingDots";
import StatsCard from "@/components/StatsCard";
import { useSocialStore } from "@/store/socialStore";
import { formatDistanceToNow } from "date-fns";

const AdminStaff = () => {
  const { users, posts } = useSocialStore();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock staff data
  const tickets = [
    {
      id: '1',
      user: 'Alex Rivera',
      subject: 'Cannot upload profile picture',
      priority: 'medium',
      status: 'open',
      created: '2024-12-29T10:00:00Z',
      category: 'technical'
    },
    {
      id: '2',
      user: 'Maya Chen',
      subject: 'Billing issue with premium upgrade',
      priority: 'high',
      status: 'in-progress',
      created: '2024-12-29T08:30:00Z',
      category: 'billing'
    },
    {
      id: '3',
      user: 'David Park',
      subject: 'Request for account verification',
      priority: 'low',
      status: 'resolved',
      created: '2024-12-28T15:45:00Z',
      category: 'account'
    }
  ];

  const reports = [
    {
      id: '1',
      reportedUser: 'John Doe',
      reportedBy: 'Jane Smith',
      reason: 'Spam content',
      status: 'pending',
      created: '2024-12-29T11:20:00Z',
      severity: 'medium'
    },
    {
      id: '2',
      reportedUser: 'Mike Johnson',
      reportedBy: 'Alex Rivera',
      reason: 'Inappropriate content',
      status: 'investigating',
      created: '2024-12-29T09:15:00Z',
      severity: 'high'
    }
  ];

  const stats = {
    totalUsers: users.length * 100,
    activeToday: users.length * 23,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    openTickets: tickets.filter(t => t.status === 'open').length
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': case 'pending': return 'bg-red-500/20 text-red-300';
      case 'in-progress': case 'investigating': return 'bg-yellow-500/20 text-yellow-300';
      case 'resolved': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <NavBar />
      <BreathingDots />
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Staff Header */}
          <div className="glass-card mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-luxury-periwinkle rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-headline font-bold text-neon">
                    Staff Operations Center
                  </h1>
                  <p className="text-muted-foreground">
                    Manage users, support tickets, and platform moderation
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-2xl font-bold text-neon-blue">
                    {stats.openTickets}
                  </div>
                  <div className="text-sm text-muted-foreground">Open Tickets</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent-red">
                    {stats.pendingReports}
                  </div>
                  <div className="text-sm text-muted-foreground">Pending Reports</div>
                </div>
              </div>
            </div>
          </div>

          {/* Staff Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Users"
              value={stats.totalUsers.toLocaleString()}
              change="+5.2%"
              trend="up"
              icon={Users}
            />
            <StatsCard
              title="Active Today"
              value={stats.activeToday.toLocaleString()}
              change="+12.1%"
              trend="up"
              icon={Users}
            />
            <StatsCard
              title="Open Tickets"
              value={stats.openTickets.toString()}
              change="-2"
              trend="down"
              icon={MessageSquare}
            />
            <StatsCard
              title="Pending Reports"
              value={stats.pendingReports.toString()}
              change="+1"
              trend="up"
              icon={AlertCircle}
            />
          </div>

          {/* Staff Tabs */}
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="glass grid w-full grid-cols-5">
              <TabsTrigger value="users" className="data-[state=active]:bg-neon-blue/20">
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="tickets" className="data-[state=active]:bg-neon-blue/20">
                <MessageSquare className="w-4 h-4 mr-2" />
                Tickets
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-neon-blue/20">
                <AlertCircle className="w-4 h-4 mr-2" />
                Reports
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-neon-blue/20">
                <FileText className="w-4 h-4 mr-2" />
                Content
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-neon-blue/20">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* User Management */}
            <TabsContent value="users" className="space-y-6 mt-6">
              <div className="glass-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-headline font-bold text-foreground">
                    User Management
                  </h3>
                  <div className="flex items-center space-x-4">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search users..."
                      className="w-64 bg-white/5 border-white/20"
                    />
                    <Button variant="outline">Export Users</Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {users
                    .filter(user => 
                      searchQuery === "" ||
                      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      user.username.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center space-x-4">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-foreground">{user.name}</span>
                              {user.verified && (
                                <Badge variant="outline" className="border-neon-blue text-neon-blue">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              @{user.username} • {user.plan} Plan
                            </div>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                              <span>{user.followers} followers</span>
                              <span>{user.streak} day streak</span>
                              <span>Joined {formatDistanceToNow(new Date(user.joinDate), { addSuffix: true })}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-accent-red border-accent-red/30">
                            Suspend
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>

            {/* Support Tickets */}
            <TabsContent value="tickets" className="space-y-6 mt-6">
              <div className="glass-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-headline font-bold text-foreground">
                    Support Tickets
                  </h3>
                  <Button className="btn-neon">New Ticket</Button>
                </div>
                
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            #{ticket.id}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(ticket.created), { addSuffix: true })}
                        </span>
                      </div>
                      
                      <h4 className="font-semibold text-foreground mb-2">
                        {ticket.subject}
                      </h4>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Submitted by {ticket.user}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Reply
                          </Button>
                          <Button variant="outline" size="sm">
                            Assign
                          </Button>
                          <Button variant="outline" size="sm" className="text-green-400 border-green-400/30">
                            Resolve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Content Reports */}
            <TabsContent value="reports" className="space-y-6 mt-6">
              <div className="glass-card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-headline font-bold text-foreground">
                    Content Reports
                  </h3>
                  <Button variant="outline">View All Reports</Button>
                </div>
                
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge className={
                            report.severity === 'high' ? 'bg-red-500/20 text-red-300' :
                            report.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-green-500/20 text-green-300'
                          }>
                            {report.severity}
                          </Badge>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(report.created), { addSuffix: true })}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="font-semibold text-foreground mb-1">
                          Reported User: {report.reportedUser}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Reported by: {report.reportedBy}
                        </div>
                        <div className="text-sm text-foreground mt-2">
                          Reason: {report.reason}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View Content
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact User
                        </Button>
                        <Button variant="outline" size="sm" className="text-accent-red border-accent-red/30">
                          Take Action
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Content Moderation */}
            <TabsContent value="content" className="space-y-6 mt-6">
              <div className="glass-card">
                <h3 className="text-xl font-headline font-bold text-foreground mb-6">
                  Content Moderation
                </h3>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-20">📝</div>
                  <h3 className="text-xl font-headline font-bold text-foreground mb-2">
                    Content Management System
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Review flagged content, moderate posts, and manage community guidelines
                  </p>
                  <Button className="btn-neon">
                    Review Content Queue
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Staff Settings */}
            <TabsContent value="settings" className="space-y-6 mt-6">
              <div className="glass-card">
                <h3 className="text-xl font-headline font-bold text-foreground mb-6">
                  Staff Settings
                </h3>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-20">⚙️</div>
                  <h3 className="text-xl font-headline font-bold text-foreground mb-2">
                    Staff Configuration
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Manage staff permissions, notification settings, and workflow preferences
                  </p>
                  <Button className="btn-neon">
                    Configure Settings
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

export default AdminStaff;