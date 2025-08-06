import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Bot, MessageCircle, X, Send, Sparkles, Search, Filter, Heart } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const quickActions = [
  {
    id: 'sizing',
    icon: Filter,
    title: 'Find My Size',
    description: 'Get personalized sizing recommendations',
    prompt: 'Help me find the right size for women\'s sneakers'
  },
  {
    id: 'recommendations',
    icon: Heart,
    title: 'Style Recommendations',
    description: 'Discover sneakers that match your style',
    prompt: 'Recommend women\'s sneakers based on my preferences'
  },
  {
    id: 'collaborations',
    icon: Sparkles,
    title: 'Latest Collabs',
    description: 'Find women-designed collaborations',
    prompt: 'Show me the latest women\'s sneaker collaborations'
  },
  {
    id: 'search',
    icon: Search,
    title: 'Smart Search',
    description: 'Search with natural language',
    prompt: 'Find me sneakers similar to...'
  }
];

const sampleSuggestions = [
  "Find women's Air Jordan 1s in size 8",
  "What are the best women's running shoes?",
  "Show me pink sneakers under $150",
  "Which brands offer the widest women's sizes?",
  "Recommend sneakers for narrow feet",
  "Find sustainable women's sneakers"
];

export default function AIAssistWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your personal sneaker assistant, specialized in helping women find the perfect kicks. I can help you with sizing, style recommendations, finding collaborations, and answering any questions about women's sneakers. How can I help you today?",
      timestamp: new Date(),
      suggestions: sampleSuggestions.slice(0, 3)
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(content),
        timestamp: new Date(),
        suggestions: getRandomSuggestions()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('size') || input.includes('sizing')) {
      return "I'd be happy to help you find the right size! Women's sneaker sizing can vary between brands. Generally, Nike and Jordan run about 1.5 sizes larger than women's shoe sizes, while Adidas typically runs true to size. For the most accurate fit, I recommend checking the specific brand's size chart. What brand are you interested in?";
    }
    
    if (input.includes('recommend') || input.includes('suggest')) {
      return "Based on current trends in women's sneakers, I'd recommend checking out the Air Jordan 1 High 'Aleali May' for a premium collaboration, the Nike Dunk low in 'Pink Prime' for everyday wear, or the New Balance 550 'Aime Leon Dore' for a sophisticated look. What's your style preference - sporty, casual, or more fashion-forward?";
    }
    
    if (input.includes('collab') || input.includes('collaboration')) {
      return "Some amazing women's collaborations to check out include Aleali May's Jordan collections, Yoon Ahn's Ambush Nike collabs, and the recent Comme des Garcons Converse releases. These designers bring unique feminine perspectives to sneaker culture. Would you like me to find specific releases from any of these collaborators?";
    }
    
    if (input.includes('pink') || input.includes('color')) {
      return "Pink sneakers are having a major moment! Some popular options include the Nike Dunk Low 'Pink Prime', Air Jordan 4 'Pink Oreo', and the Yeezy Boost 350 V2 'Rose'. What shade of pink are you looking for - soft pastels, hot pink, or something more muted?";
    }
    
    return "I understand you're looking for help with women's sneakers! I can assist you with finding the right size, recommending styles based on your preferences, discovering the latest collaborations, or answering specific questions about fit and comfort. What would you like to explore?";
  };

  const getRandomSuggestions = (): string[] => {
    const shuffled = [...sampleSuggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const handleQuickAction = (action: typeof quickActions[0]) => {
    setIsOpen(true);
    setTimeout(() => {
      handleSendMessage(action.prompt);
    }, 500);
  };

  return (
    <>
      {/* Floating Widget Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
          data-testid="button-ai-assist-open"
        >
          <Bot className="w-6 h-6" />
        </Button>
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 animate-ping" />
      </motion.div>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col p-0">
          {/* Header */}
          <DialogHeader className="p-4 pb-2 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-lg font-semibold">Women's Sneaker Assistant</DialogTitle>
                  <p className="text-sm text-muted-foreground">Specialized in women's kicks</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                data-testid="button-ai-assist-close"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="p-4 border-b bg-gray-50 dark:bg-gray-900">
              <h4 className="text-sm font-medium mb-3">Quick Actions:</h4>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <Button
                      key={action.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action)}
                      className="justify-start h-auto p-3 text-left"
                      data-testid={`button-quick-action-${action.id}`}
                    >
                      <div className="flex items-start gap-2">
                        <IconComponent className="w-4 h-4 mt-0.5 text-purple-500" />
                        <div>
                          <div className="font-medium text-xs">{action.title}</div>
                          <div className="text-xs text-muted-foreground">{action.description}</div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-purple-500 text-white rounded-l-lg rounded-tr-lg' 
                      : 'bg-gray-100 dark:bg-gray-800 text-foreground rounded-r-lg rounded-tl-lg'
                  } p-3`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs opacity-75">Try asking:</p>
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSendMessage(suggestion)}
                            className="w-full justify-start text-xs h-auto p-2 bg-white/10 hover:bg-white/20 text-left"
                            data-testid={`button-suggestion-${index}`}
                          >
                            "{suggestion}"
                          </Button>
                        ))}
                      </div>
                    )}
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
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-r-lg rounded-tl-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                      <span className="text-xs text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about women's sneakers..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }
                }}
                disabled={isTyping}
                data-testid="input-ai-chat"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="bg-purple-500 hover:bg-purple-600 text-white"
                data-testid="button-send-message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI assistant specialized in women's sneaker culture and sizing
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}