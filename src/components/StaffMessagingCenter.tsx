import { useState, useRef, useEffect } from "react";
import { Send, Shield, Users, Bell, MessageSquare, AlertTriangle, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface StaffMessage {
  id: string;
  sender: 'ceo' | 'staff';
  senderName: string;
  content: string;
  timestamp: string;
  priority: 'normal' | 'high' | 'urgent';
  department?: string;
}

interface SupportTicket {
  id: string;
  user: string;
  email: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  assignedTo?: string;
  created: string;
  category: 'technical' | 'billing' | 'account' | 'general';
}

const StaffMessagingCenter = () => {
  const [newMessage, setNewMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState<"team" | "tickets">("team");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [staffMessages, setStaffMessages] = useState<StaffMessage[]>([
    {
      id: '1',
      sender: 'ceo',
      senderName: 'Michael Chen',
      content: 'Good morning team! Let\'s review the quarterly metrics and discuss the new feature rollout.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      priority: 'high'
    },
    {
      id: '2',
      sender: 'staff',
      senderName: 'Sarah Johnson',
      content: 'Morning! I\'ve compiled the user engagement reports. The new social features are showing 23% increase in daily active users.',
      timestamp: new Date(Date.now() - 3300000).toISOString(),
      priority: 'normal',
      department: 'Operations'
    },
    {
      id: '3',
      sender: 'staff',
      senderName: 'David Wilson',
      content: 'Great numbers Sarah! I\'ve been monitoring the support tickets - we\'re down to 12 open tickets from 45 last week.',
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      priority: 'normal',
      department: 'Support'
    }
  ]);

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: '1',
      user: 'Alex Rivera',
      email: 'alex@example.com',
      subject: 'Cannot publish my digital fingerprint',
      message: 'Hi, I\'m trying to publish my site but getting an error. The template editor seems to freeze when I click publish.',
      priority: 'high',
      status: 'open',
      created: new Date(Date.now() - 1800000).toISOString(),
      category: 'technical'
    },
    {
      id: '2',
      user: 'Maya Chen',
      email: 'maya@example.com',
      subject: 'Billing question about Pro plan',
      message: 'I upgraded to Pro but don\'t see the premium templates. Can you help me access them?',
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'Sarah Johnson',
      created: new Date(Date.now() - 7200000).toISOString(),
      category: 'billing'
    },
    {
      id: '3',
      user: 'David Park',
      email: 'david@example.com',
      subject: 'Request for account verification',
      message: 'I\'d like to get my account verified. I\'m a business owner with 10K+ followers on other platforms.',
      priority: 'low',
      status: 'resolved',
      created: new Date(Date.now() - 14400000).toISOString(),
      category: 'account'
    }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: StaffMessage = {
      id: Date.now().toString(),
      sender: 'staff',
      senderName: 'Current Staff Member',
      content: newMessage,
      timestamp: new Date().toISOString(),
      priority: 'normal',
      department: 'Operations'
    };

    setStaffMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleTicketAction = (ticketId: string, action: 'assign' | 'resolve' | 'escalate') => {
    setSupportTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            status: action === 'resolve' ? 'resolved' : action === 'assign' ? 'in-progress' : ticket.status,
            assignedTo: action === 'assign' ? 'Current Staff Member' : ticket.assignedTo
          }
        : ticket
    ));
    
    toast(`Ticket ${action === 'resolve' ? 'resolved' : action === 'assign' ? 'assigned' : 'escalated'} successfully`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-4 border-l-red-500';
      case 'high': return 'border-l-4 border-l-accent-red';
      default: return '';
    }
  };

  const getTicketPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-500/20 text-red-300';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-300';
      case 'resolved': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <AlertTriangle className="w-4 h-4" />;
      case 'billing': return <MessageSquare className="w-4 h-4" />;
      case 'account': return <Users className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [staffMessages]);

  return (
    <div className="h-full flex">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-white/10 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-luxury-periwinkle rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-headline font-bold text-foreground">
                Staff Operations
              </h1>
              <p className="text-sm text-muted-foreground">Team Communication Hub</p>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedTab("team")}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTab === "team" 
                  ? "bg-neon-blue/20 text-neon-blue" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Team Chat
            </button>
            <button
              onClick={() => setSelectedTab("tickets")}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTab === "tickets" 
                  ? "bg-neon-blue/20 text-neon-blue" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Support
              {supportTickets.filter(t => t.status === 'open').length > 0 && (
                <Badge className="ml-2 bg-accent-red text-white">
                  {supportTickets.filter(t => t.status === 'open').length}
                </Badge>
              )}
            </button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="p-4 border-b border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-neon-blue">
                {supportTickets.filter(t => t.status === 'open').length}
              </div>
              <div className="text-xs text-muted-foreground">Open Tickets</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">
                {supportTickets.filter(t => t.status === 'resolved').length}
              </div>
              <div className="text-xs text-muted-foreground">Resolved Today</div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="p-4 flex-1">
          <h3 className="font-semibold text-foreground mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Users className="w-4 h-4 mr-2" />
              User Lookup
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Send Notice
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Team Chat */}
        {selectedTab === "team" && (
          <>
            <div className="p-6 border-b border-white/10">
              <h2 className="font-headline font-bold text-foreground">
                Staff Team Channel
              </h2>
              <p className="text-sm text-muted-foreground">
                Collaborate with CEO and team members
              </p>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {staffMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue/30 to-luxury-purple/30 flex items-center justify-center flex-shrink-0">
                      {msg.sender === 'ceo' ? (
                        <Crown className="w-5 h-5 text-luxury-purple" />
                      ) : (
                        <Shield className="w-5 h-5 text-neon-blue" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-foreground">{msg.senderName}</span>
                        <Badge className={msg.sender === 'ceo' ? 'bg-luxury-purple/20 text-luxury-purple' : 'bg-neon-blue/20 text-neon-blue'}>
                          {msg.sender === 'ceo' ? 'CEO' : 'Staff'}
                        </Badge>
                        {msg.department && (
                          <Badge variant="outline" className="text-xs">
                            {msg.department}
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      
                      <div className={`p-4 rounded-xl bg-white/5 ${getPriorityColor(msg.priority)}`}>
                        <p className="text-foreground leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-white/10">
              <div className="flex items-center space-x-4">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Message the team..."
                  className="flex-1 bg-white/5 border-white/20"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-neon-blue hover:bg-neon-blue/80 text-canvas-dark"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Support Tickets */}
        {selectedTab === "tickets" && (
          <>
            <div className="p-6 border-b border-white/10">
              <h2 className="font-headline font-bold text-foreground">
                Support Tickets
              </h2>
              <p className="text-sm text-muted-foreground">
                Help users with their questions and issues
              </p>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="glass-card border-l-4 border-l-neon-blue">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-neon-blue/20 rounded-lg">
                          {getCategoryIcon(ticket.category)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{ticket.subject}</h3>
                          <p className="text-sm text-muted-foreground">
                            {ticket.user} • {ticket.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTicketPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={getTicketStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-foreground leading-relaxed">{ticket.message}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Created {formatDistanceToNow(new Date(ticket.created), { addSuffix: true })}
                        {ticket.assignedTo && (
                          <span className="ml-2 text-neon-blue">• Assigned to {ticket.assignedTo}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => handleTicketAction(ticket.id, 'assign')}
                          variant="outline"
                          size="sm"
                          disabled={ticket.status === 'resolved'}
                        >
                          {ticket.assignedTo ? 'Reassign' : 'Assign to Me'}
                        </Button>
                        <Button
                          onClick={() => handleTicketAction(ticket.id, 'resolve')}
                          variant="outline"
                          size="sm"
                          className="text-green-400 border-green-400/30"
                          disabled={ticket.status === 'resolved'}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Resolve
                        </Button>
                      </div>
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

export default StaffMessagingCenter;