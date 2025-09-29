import { useState, useRef, useEffect } from "react";
import { Send, Crown, Users, Bell, Settings, Paperclip, Smile, MoveHorizontal as MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  sender: 'ceo' | 'staff';
  senderName: string;
  content: string;
  timestamp: string;
  priority: 'normal' | 'high' | 'urgent';
  attachments?: string[];
  reactions?: { emoji: string; count: number }[];
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  purpose: string[];
  message: string;
  timestamp: string;
  status: 'new' | 'read' | 'responded';
  assignedTo?: string;
}

const CEOMessagingCenter = () => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState<"team" | "contacts">("team");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [teamMessages, setTeamMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ceo',
      senderName: 'Michael Chen',
      content: 'Good morning team! Let\'s review the quarterly metrics and discuss the new feature rollout. I\'ve noticed some excellent user engagement numbers.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      priority: 'high'
    },
    {
      id: '2',
      sender: 'staff',
      senderName: 'Sarah Johnson',
      content: 'Morning! I\'ve compiled the user engagement reports. The new social features are showing 23% increase in daily active users. The digital fingerprint cards are particularly popular.',
      timestamp: new Date(Date.now() - 3300000).toISOString(),
      priority: 'normal'
    },
    {
      id: '3',
      sender: 'staff',
      senderName: 'David Wilson',
      content: 'Great numbers Sarah! I\'ve been monitoring the support tickets - we\'re down to 12 open tickets from 45 last week. The new template editor is working smoothly.',
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      priority: 'normal'
    },
    {
      id: '4',
      sender: 'ceo',
      senderName: 'Michael Chen',
      content: 'Excellent work everyone! 🎉 Let\'s schedule a strategy session for tomorrow to discuss scaling our infrastructure. Also, I want to review the contact form submissions.',
      timestamp: new Date(Date.now() - 2700000).toISOString(),
      priority: 'normal',
      reactions: [{ emoji: '🎉', count: 3 }, { emoji: '👍', count: 2 }]
    }
  ]);

  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([
    {
      id: '1',
      name: 'Alexandra Rodriguez',
      email: 'alex@techstartup.com',
      purpose: ['Digital Flagship', 'Brand Identity'],
      message: 'Hi, I\'m the founder of a tech startup and I\'m looking for a premium digital presence that matches our innovative approach. We\'ve raised Series A and need something that commands respect in the enterprise space.',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      status: 'new'
    },
    {
      id: '2',
      name: 'Marcus Thompson',
      email: 'marcus@luxuryrealestate.com',
      purpose: ['Bespoke App'],
      message: 'I run a luxury real estate firm and need a custom application for our high-net-worth clients. Something that feels exclusive and provides a white-glove digital experience.',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      status: 'read',
      assignedTo: 'Sarah Johnson'
    },
    {
      id: '3',
      name: 'Elena Vasquez',
      email: 'elena@artgallery.com',
      purpose: ['Digital Flagship'],
      message: 'We\'re opening a contemporary art gallery and need a digital presence that\'s as sophisticated as our physical space. The website should feel like walking through a premium gallery.',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      status: 'responded'
    }
  ]);

  const onlineStaff = [
    { name: 'Sarah Johnson', role: 'Lead Operations', status: 'online', avatar: 'SJ' },
    { name: 'David Wilson', role: 'Community Manager', status: 'online', avatar: 'DW' },
    { name: 'Alex Martinez', role: 'Tech Lead', status: 'away', avatar: 'AM' },
    { name: 'Emma Thompson', role: 'Security Specialist', status: 'online', avatar: 'ET' }
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'ceo',
      senderName: 'Michael Chen',
      content: newMessage,
      timestamp: new Date().toISOString(),
      priority: 'normal'
    };

    setTeamMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleContactAction = (contactId: string, action: 'assign' | 'respond' | 'archive') => {
    setContactSubmissions(prev => prev.map(contact => 
      contact.id === contactId 
        ? { 
            ...contact, 
            status: action === 'respond' ? 'responded' : action === 'assign' ? 'read' : contact.status,
            assignedTo: action === 'assign' ? 'Sarah Johnson' : contact.assignedTo
          }
        : contact
    ));
    
    toast(`Contact ${action === 'respond' ? 'responded to' : action === 'assign' ? 'assigned' : 'archived'} successfully`);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [teamMessages]);

  const getRoleIcon = (role: string) => {
    return role === 'ceo' ? <Crown className="w-4 h-4 text-luxury-purple" /> : <Users className="w-4 h-4 text-neon-blue" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-4 border-l-red-500';
      case 'high': return 'border-l-4 border-l-accent-red';
      default: return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-accent-red/20 text-accent-red';
      case 'read': return 'bg-yellow-400/20 text-yellow-400';
      case 'responded': return 'bg-green-400/20 text-green-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  return (
    <div className="h-full flex">
      {/* Left Sidebar - Navigation */}
      <div className="w-80 border-r border-white/10 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-luxury-purple to-neon-blue rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-headline font-bold text-foreground">
                CEO Command Center
              </h1>
              <p className="text-sm text-muted-foreground">Executive Communications</p>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedTab("team")}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTab === "team" 
                  ? "bg-luxury-purple/20 text-luxury-purple" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Team Chat
            </button>
            <button
              onClick={() => setSelectedTab("contacts")}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTab === "contacts" 
                  ? "bg-luxury-purple/20 text-luxury-purple" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Contact Forms
              {contactSubmissions.filter(c => c.status === 'new').length > 0 && (
                <Badge className="ml-2 bg-accent-red text-white">
                  {contactSubmissions.filter(c => c.status === 'new').length}
                </Badge>
              )}
            </button>
          </div>
        </div>
        
        {/* Team Chat Sidebar */}
        {selectedTab === "team" && (
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-white/10">
              <h3 className="font-semibold text-foreground mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Online Staff ({onlineStaff.filter(s => s.status === 'online').length})
              </h3>
              <div className="space-y-2">
                {onlineStaff.map((staff, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5">
                    <div className="w-8 h-8 bg-gradient-to-br from-neon-blue/30 to-luxury-purple/30 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{staff.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground text-sm">{staff.name}</div>
                      <div className="text-xs text-muted-foreground">{staff.role}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      staff.status === 'online' ? 'bg-green-500' :
                      staff.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>
            
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
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Crown className="w-4 h-4 mr-2" />
                  Executive Report
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Forms Sidebar */}
        {selectedTab === "contacts" && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-4">
                Recent Submissions
              </h3>
              <div className="space-y-3">
                {contactSubmissions.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      contact.status === 'new' 
                        ? 'bg-accent-red/10 border-accent-red/30 hover:bg-accent-red/20' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground text-sm">{contact.name}</span>
                      <Badge className={getStatusColor(contact.status)}>
                        {contact.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">{contact.email}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(contact.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat/Contact Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Team Chat */}
        {selectedTab === "team" && (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline font-bold text-foreground">
                    Executive Team Channel
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Secure communication with your leadership team
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
                {teamMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue/30 to-luxury-purple/30 flex items-center justify-center flex-shrink-0">
                      {getRoleIcon(msg.sender)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-foreground">{msg.senderName}</span>
                        <Badge className={msg.sender === 'ceo' ? 'bg-luxury-purple/20 text-luxury-purple' : 'bg-neon-blue/20 text-neon-blue'}>
                          {msg.sender === 'ceo' ? 'CEO' : 'Staff'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      
                      <div className={`p-4 rounded-xl bg-white/5 ${getPriorityColor(msg.priority)}`}>
                        <p className="text-foreground leading-relaxed">{msg.content}</p>
                        
                        {msg.reactions && msg.reactions.length > 0 && (
                          <div className="flex items-center space-x-2 mt-3">
                            {msg.reactions.map((reaction, index) => (
                              <button
                                key={index}
                                className="flex items-center space-x-1 px-2 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                              >
                                <span>{reaction.emoji}</span>
                                <span className="text-xs text-muted-foreground">{reaction.count}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Message your team..."
                    className="bg-white/5 border-white/20 text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-luxury-purple hover:bg-luxury-purple/80 text-white px-8"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Contact Submissions */}
        {selectedTab === "contacts" && (
          <>
            <div className="p-6 border-b border-white/10">
              <h2 className="font-headline font-bold text-foreground mb-2">
                Contact Form Submissions
              </h2>
              <p className="text-sm text-muted-foreground">
                New business inquiries and client requests
              </p>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {contactSubmissions.map((contact) => (
                  <div key={contact.id} className="glass-card border-l-4 border-l-neon-blue">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(contact.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-muted-foreground mb-2">Interested in:</div>
                      <div className="flex flex-wrap gap-2">
                        {contact.purpose.map((purpose, index) => (
                          <Badge key={index} variant="outline" className="border-neon-blue/30 text-neon-blue">
                            {purpose}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-foreground leading-relaxed">{contact.message}</p>
                    </div>

                    {contact.assignedTo && (
                      <div className="mb-4 p-3 bg-neon-blue/10 rounded-lg">
                        <div className="text-sm text-neon-blue">
                          Assigned to: {contact.assignedTo}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3">
                      <Button
                        onClick={() => handleContactAction(contact.id, 'assign')}
                        variant="outline"
                        size="sm"
                        disabled={contact.status === 'responded'}
                      >
                        Assign to Staff
                      </Button>
                      <Button
                        onClick={() => handleContactAction(contact.id, 'respond')}
                        variant="outline"
                        size="sm"
                        className="text-green-400 border-green-400/30"
                        disabled={contact.status === 'responded'}
                      >
                        Mark Responded
                      </Button>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
};

export default CEOMessagingCenter;