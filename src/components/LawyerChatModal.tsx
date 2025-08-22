import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Phone, Video, MoreVertical, CheckCheck } from 'lucide-react';
import { Property } from '@/data/properties';

interface LawyerChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'lawyer';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

export const LawyerChatModal = ({ isOpen, onClose, property }: LawyerChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I see you're interested in "${property.title}". I'm Advocate Rajesh Kumar, and I'll help you with the legal verification process.`,
      sender: 'lawyer',
      timestamp: new Date(Date.now() - 5000),
      status: 'read'
    },
    {
      id: '2',
      text: 'What specific documents would you like me to review for this property?',
      sender: 'lawyer',
      timestamp: new Date(Date.now() - 3000),
      status: 'read'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate lawyer response
    setTimeout(() => {
      const responses = [
        "I'll review those documents right away. Can you also provide the EC (Encumbrance Certificate) for the past 30 years?",
        "That's a great question. Based on my experience, this area has clean title history. Let me verify the specific plot details.",
        "For this type of property, we'll need to check the conversion documents and ensure all approvals are in place.",
        "I recommend getting a title verification report. This typically takes 2-3 working days. Shall I proceed?",
        "The property looks promising. However, I always suggest verifying the mutation records and checking for any pending litigations."
      ];

      const lawyerResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'lawyer',
        timestamp: new Date(),
        status: 'read'
      };

      setMessages(prev => [...prev, lawyerResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-2xl h-[600px] p-0 bg-background border-border">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full"
            >
              {/* Header */}
              <DialogHeader className="p-4 border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/api/placeholder/48/48" />
                      <AvatarFallback className="bg-primary text-primary-foreground">RK</AvatarFallback>
                    </Avatar>
                    <div>
                      <DialogTitle className="text-lg">Advocate Rajesh Kumar</DialogTitle>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-sm text-muted-foreground">Online</span>
                        <Badge variant="outline" className="text-xs">Property Law Expert</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" className="hover:bg-accent">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-accent">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-accent">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DialogHeader>

              {/* Property Context */}
              <div className="p-3 bg-muted/20 border-b border-border">
                <div className="text-xs text-muted-foreground mb-1">Discussing Property:</div>
                <div className="text-sm font-medium text-foreground">{property.title}</div>
                <div className="text-xs text-muted-foreground">{property.location}</div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex space-x-2 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        {message.sender === 'lawyer' && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src="/api/placeholder/32/32" />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">RK</AvatarFallback>
                          </Avatar>
                        )}
                        <div className={`rounded-2xl px-4 py-2 ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <div className={`flex items-center justify-end space-x-1 mt-1 ${
                            message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            <span className="text-xs">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {message.sender === 'user' && message.status && (
                              <CheckCheck className={`h-3 w-3 ${
                                message.status === 'read' ? 'text-blue-400' : 'text-primary-foreground/70'
                              }`} />
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center space-x-2"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/api/placeholder/32/32" />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">RK</AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-2xl px-4 py-2 flex items-center space-x-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="w-2 h-2 bg-muted-foreground rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-muted-foreground rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-muted-foreground rounded-full"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border bg-muted/20">
                <div className="flex items-center space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your legal question..."
                    className="flex-1 bg-background border-border"
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || isTyping}
                    className="bg-primary hover:bg-primary-light text-primary-foreground"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  🔒 End-to-end encrypted • Response time: ~2 minutes
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};