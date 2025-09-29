import { useState } from "react";
import { Search, Send, MoreHorizontal, Phone, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavBar from "@/components/NavBar";
import BreathingDots from "@/components/BreathingDots";
import { useSocialStore } from "@/store/socialStore";
import { formatDistanceToNow } from "date-fns";

const Messages = () => {
  const { users, messages, currentUser, sendMessage } = useSocialStore();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Get conversations (mock data for demo)
  const conversations = users
    .filter(user => user.id !== currentUser?.id)
    .map(user => {
      const lastMessage = messages
        .filter(msg => 
          (msg.senderId === user.id && msg.receiverId === currentUser?.id) ||
          (msg.senderId === currentUser?.id && msg.receiverId === user.id)
        )
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];

      return {
        user,
        lastMessage: lastMessage || {
          id: 'mock',
          senderId: user.id,
          receiverId: currentUser?.id || '',
          content: "Hey! How's your digital fingerprint coming along?",
          timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
          read: Math.random() > 0.3
        },
        unreadCount: Math.floor(Math.random() * 3)
      };
    })
    .sort((a, b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime());

  const selectedUser = users.find(u => u.id === selectedUserId);
  
  const chatMessages = selectedUserId ? 
    messages.filter(msg => 
      (msg.senderId === selectedUserId && msg.receiverId === currentUser?.id) ||
      (msg.senderId === currentUser?.id && msg.receiverId === selectedUserId)
    ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    : [];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUserId) return;
    
    sendMessage(selectedUserId, newMessage);
    setNewMessage("");
  };

  const filteredConversations = conversations.filter(conv =>
    searchQuery === "" ||
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative">
      <NavBar />
      <BreathingDots />
      
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 max-w-7xl h-[calc(100vh-5rem)]">
          
          <div className="glass rounded-2xl overflow-hidden h-full flex">
            
            {/* Conversations Sidebar */}
            <div className="w-80 border-r border-white/10 flex flex-col">
              
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-headline font-bold text-foreground mb-4">
                  Messages
                </h1>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="pl-10 bg-white/5 border-white/20"
                  />
                </div>
              </div>
              
              {/* Conversations List */}
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.user.id}
                      onClick={() => setSelectedUserId(conv.user.id)}
                      className={`p-4 rounded-xl cursor-pointer transition-all mb-2 ${
                        selectedUserId === conv.user.id
                          ? 'bg-neon-blue/20 border border-neon-blue/30'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={conv.user.avatar}
                            alt={conv.user.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-canvas-surface"></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-foreground truncate">
                              {conv.user.name}
                            </h3>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(conv.lastMessage.timestamp), { addSuffix: true })}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate">
                              {conv.lastMessage.content}
                            </p>
                            {conv.unreadCount > 0 && (
                              <div className="w-5 h-5 bg-neon-blue rounded-full flex items-center justify-center">
                                <span className="text-xs text-canvas-dark font-bold">
                                  {conv.unreadCount}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              
              {selectedUser ? (
                <>
                  {/* Chat Header */}
                  <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedUser.avatar}
                        alt={selectedUser.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h2 className="font-headline font-bold text-foreground">
                          {selectedUser.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          @{selectedUser.username} • Online
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-6">
                    <div className="space-y-4">
                      {chatMessages.length > 0 ? (
                        chatMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${
                              msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                                msg.senderId === currentUser?.id
                                  ? 'bg-neon-blue text-canvas-dark'
                                  : 'bg-white/10 text-foreground'
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <p className={`text-xs mt-1 ${
                                msg.senderId === currentUser?.id 
                                  ? 'text-canvas-dark/70' 
                                  : 'text-muted-foreground'
                              }`}>
                                {formatDistanceToNow(new Date(msg.timestamp), { addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <div className="text-6xl mb-4 opacity-20">💬</div>
                          <h3 className="text-xl font-headline font-bold text-foreground mb-2">
                            Start a conversation
                          </h3>
                          <p className="text-muted-foreground">
                            Send your first message to {selectedUser.name}
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-6 border-t border-white/10">
                    <div className="flex items-center space-x-4">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-white/5 border-white/20"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        size="icon"
                        className="bg-neon-blue hover:bg-neon-blue/80 text-canvas-dark"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                /* No Chat Selected */
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4 opacity-20">💬</div>
                    <h2 className="text-2xl font-headline font-bold text-foreground mb-2">
                      Select a conversation
                    </h2>
                    <p className="text-muted-foreground">
                      Choose from your existing conversations or start a new one
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;