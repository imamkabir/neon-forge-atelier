import { useState } from "react";
import { Send, Crown, Shield, Settings, Users, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";
import BreathingDots from "@/components/BreathingDots";
import { formatDistanceToNow } from "date-fns";

const AdminChat = () => {
  const [newMessage, setNewMessage] = useState("");
  
  // Mock admin chat data
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'CEO',
      senderName: 'Michael Chen',
      message: 'Good morning team! Let\'s review the quarterly metrics and discuss the new feature rollout.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      role: 'ceo',
      priority: 'high'
    },
    {
      id: '2',
      sender: 'Staff',
      senderName: 'Sarah Johnson',
      message: 'Morning! I\'ve compiled the user engagement reports. The new social features are showing 23% increase in daily active users.',
      timestamp: new Date(Date.now() - 3300000).toISOString(),
      role: 'staff',
      priority: 'normal'
    },
    {
      id: '3',
      sender: 'Staff',
      senderName: 'David Wilson',
      message: 'Great numbers Sarah! I\'ve been monitoring the support tickets - we\'re down to 12 open tickets from 45 last week.',
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      role: 'staff',
      priority: 'normal'
    },
    {
      id: '4',
      sender: 'CEO',
      senderName: 'Michael Chen',
      message: 'Excellent work everyone! 🎉 Let\'s schedule a strategy session for tomorrow to discuss scaling our infrastructure.',
      timestamp: new Date(Date.now() - 2700000).toISOString(),
      role: 'ceo',
      priority: 'normal'
    },
    {
      id: '5',
      sender: 'Staff',
      senderName: 'Alex Martinez',
      message: 'I\'ll prepare the infrastructure cost analysis and capacity planning docs for tomorrow\'s meeting.',
      timestamp: new Date(Date.now() - 2400000).toISOString(),
      role: 'staff',
      priority: 'normal'
    },
    {
      id: '6',
      sender: 'Staff',
      senderName: 'Emma Thompson',
      message: 'Update on the security audit: All systems are secure, no vulnerabilities detected. Full report attached to the company dashboard.',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      role: 'staff',
      priority: 'high'
    }
  ]);

  const currentUser = {
    name: 'Current User',
    role: 'staff' // This would be dynamic based on logged in user
  };

  const onlineStaff = [
    { name: 'Sarah Johnson', role: 'Lead Support', status: 'online' },
    { name: 'David Wilson', role: 'Community Manager', status: 'online' },
    { name: 'Alex Martinez', role: 'Tech Lead', status: 'away' },
    { name: 'Emma Thompson', role: 'Security Specialist', status: 'online' }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      sender: currentUser.role === 'ceo' ? 'CEO' : 'Staff',
      senderName: currentUser.name,
      message: newMessage,
      timestamp: new Date().toISOString(),
      role: currentUser.role as 'ceo' | 'staff',
      priority: 'normal' as const
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ceo':
        return <Crown className="w-4 h-4 text-luxury-purple" />;
      case 'staff':
        return <Shield className="w-4 h-4 text-neon-blue" />;
      default:
        return <Users className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ceo':
        return <Badge className="bg-luxury-purple/20 text-luxury-purple">CEO</Badge>;
      case 'staff':
        return <Badge className="bg-neon-blue/20 text-neon-blue">Staff</Badge>;
      default:
        return <Badge variant="outline">Member</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-accent-red';
      case 'urgent':
        return 'border-l-4 border-l-red-500';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <NavBar />
      <BreathingDots />
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 max-w-7xl h-[calc(100vh-5rem)]">
          
          <div className="glass rounded-2xl overflow-hidden h-full flex">
            
            {/* Staff Sidebar */}
            <div className="w-80 border-r border-white/10 flex flex-col">
              
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-luxury-purple to-neon-blue rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-headline font-bold text-foreground">
                      Admin Chat
                    </h1>
                    <p className="text-sm text-muted-foreground">CEO ↔ Staff Communication</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-400">Secure Channel</span>
                </div>
              </div>
              
              {/* Online Staff */}
              <div className="p-4 border-b border-white/10">
                <h3 className="font-semibold text-foreground mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Online Staff ({onlineStaff.filter(s => s.status === 'online').length})
                </h3>
                <div className="space-y-2">
                  {onlineStaff.map((staff, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5">
                      <div className={`w-2 h-2 rounded-full ${
                        staff.status === 'online' ? 'bg-green-500' :
                        staff.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground text-sm">{staff.name}</div>
                        <div className="text-xs text-muted-foreground">{staff.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="p-4 flex-1">
                <h3 className="font-semibold text-foreground mb-3 flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Bell className="w-4 h-4 mr-2" />
                    Send Announcement
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Staff Meeting
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Crown className="w-4 h-4 mr-2" />
                    Executive Summary
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              
              {/* Chat Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-headline font-bold text-foreground">
                      Executive Communication Channel
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Secure messaging between CEO and Staff members
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500/20 text-green-400">
                      End-to-End Encrypted
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {messages.map((msg, index) => (
                    <div key={msg.id} className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue/30 to-luxury-purple/30 flex items-center justify-center flex-shrink-0">
                        {getRoleIcon(msg.role)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-foreground">{msg.senderName}</span>
                          {getRoleBadge(msg.role)}
                          <span className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                        
                        <div className={`p-4 rounded-xl bg-white/5 ${getPriorityColor(msg.priority)}`}>
                          <p className="text-foreground leading-relaxed">{msg.message}</p>
                          {msg.priority === 'high' && (
                            <div className="mt-2">
                              <Badge className="bg-accent-red/20 text-accent-red">
                                High Priority
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-6 border-t border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message to the team..."
                      className="bg-white/5 border-white/20 text-lg"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-neon-blue hover:bg-neon-blue/80 text-canvas-dark px-8"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                  <span>Messages are encrypted and logged for security</span>
                  <span>Press Enter to send</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat;