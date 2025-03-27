
import { useState, useRef, useEffect } from 'react';
import { Send, ArrowDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotInterfaceProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatbotInterface = ({
  className,
  isOpen,
  onClose
}: ChatbotInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your healthcare assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Check if should show scroll down button
  useEffect(() => {
    const handleScroll = () => {
      if (!messagesContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
      
      setShowScrollDown(isScrolledUp);
    };
    
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (messagesContainer) {
        messagesContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simple responses based on keywords
    const userQuery = input.toLowerCase();
    let botResponse = "I'm not sure how to help with that. Could you try asking something about our healthcare services, doctors, or appointments?";
    
    setTimeout(() => {
      if (userQuery.includes('hello') || userQuery.includes('hi')) {
        botResponse = "Hello! How can I assist you with your healthcare needs today?";
      } else if (userQuery.includes('appointment') || userQuery.includes('book')) {
        botResponse = "You can book an appointment by visiting our doctors section and selecting a healthcare provider. Would you like me to direct you there?";
      } else if (userQuery.includes('doctor')) {
        botResponse = "We have many specialists available. You can view all our doctors in the 'Doctors' section. Would you like information about a specific specialty?";
      } else if (userQuery.includes('checkup') || userQuery.includes('test')) {
        botResponse = "We offer comprehensive health checkups. You can learn more in our 'Checkup' section which includes free online assessments.";
      } else if (userQuery.includes('therapy') || userQuery.includes('mental health')) {
        botResponse = "Our therapy services include counseling, cognitive behavioral therapy, and more. Visit our 'Therapy' section for details.";
      } else if (userQuery.includes('location') || userQuery.includes('where')) {
        botResponse = "You can find our locations on the integrated map. Would you like me to show you the nearest healthcare facilities?";
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className={cn(
      "fixed z-50 overflow-hidden",
      "bg-white shadow-glass-lg glass-panel",
      "w-[90%] sm:w-[400px] max-w-[400px] h-[500px]",
      "flex flex-col",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="bg-health-100 text-health-600 p-1.5 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 12H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="font-medium">Healthcare Assistant</h3>
            <p className="text-xs text-muted-foreground">Ask me anything about our services</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>
      
      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <div 
            key={message.id}
            className={cn(
              "flex max-w-[80%] animate-fade-in",
              message.sender === 'user' ? "ml-auto" : "mr-auto"
            )}
          >
            <div 
              className={cn(
                "rounded-2xl px-4 py-2",
                message.sender === 'user' 
                  ? "bg-health-500 text-white rounded-tr-none"
                  : "bg-gray-100 text-gray-800 rounded-tl-none"
              )}
            >
              <p>{message.content}</p>
              <time className={cn(
                "text-xs block mt-1",
                message.sender === 'user' ? "text-health-100" : "text-gray-500"
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </time>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex max-w-[80%] mr-auto animate-fade-in">
            <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Scroll down button */}
      {showScrollDown && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-20 right-4 rounded-full shadow-md animate-fade-in"
          onClick={scrollToBottom}
        >
          <ArrowDown size={16} />
        </Button>
      )}
      
      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};
