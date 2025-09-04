import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { X, Send, Bot, User, Loader2, Sparkles, TrendingUp, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import SneakerCard from '@/components/SneakerCard';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
  sneakerRecommendations?: any[];
  marketInsights?: any;
  actionable?: boolean;
}

export default function AIChat({ isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hey! I'm SoleBot, your AI sneaker expert. I can help you find the perfect sneakers, track prices, get style advice, and answer any questions about sneaker culture. What can I help you with today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ["What's trending in sneakers right now?", "Help me find my next pair", "Tell me about sneaker care"],
      actionable: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user?.getIdToken()}`
        },
        body: JSON.stringify({
          message: inputMessage,
          context: {
            userPreferences: [], // Could be enhanced with user profile data
            recentQueries: messages.slice(-3).filter(m => m.sender === 'user').map(m => m.content),
            collectionSize: 0 // Could be enhanced with actual collection data
          },
          conversationHistory: messages.slice(-6) // Send conversation history for context
        })
      });

      if (!response.ok) throw new Error('Failed to get AI response');

      const aiData = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiData.response || aiData.message || "I'm here to help with your sneaker questions!",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: aiData.suggestions || [],
        sneakerRecommendations: aiData.sneakerRecommendations || [],
        marketInsights: aiData.marketInsights,
        actionable: aiData.actionable || false
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get AI response. Please try again.',
        variant: 'destructive'
      });
      
      // Add fallback message
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now, but I'm still here to help! Try asking about specific sneaker models, styling advice, or market trends.",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ["What's trending in sneakers?", "Help me find a specific model", "Sneaker care tips"],
        actionable: false
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    // Automatically send the suggestion
    setTimeout(() => {
      const event = { target: { value: suggestion } } as any;
      setInputMessage(suggestion);
      handleSendMessage();
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-lg">SoleBot</CardTitle>
            <Badge variant="secondary" className="text-xs">AI Assistant</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 p-0 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`chat-message ${
                      message.sender === 'user' ? 'user' : 'bot'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    
                    {/* Enhanced bot message features */}
                    {message.sender === 'bot' && (
                      <div className="mt-3 space-y-3">
                        {/* Sneaker Recommendations */}
                        {message.sneakerRecommendations && message.sneakerRecommendations.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                              <ShoppingBag className="w-3 h-3" />
                              Recommended Sneakers
                            </div>
                            <div className="grid gap-2">
                              {message.sneakerRecommendations.slice(0, 2).map((sneaker, idx) => (
                                <div key={idx} className="bg-muted rounded-lg p-2 text-xs">
                                  <div className="font-medium">{sneaker.name}</div>
                                  <div className="text-muted-foreground">{sneaker.brand} • ${sneaker.retailPrice}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Market Insights */}
                        {message.marketInsights && (
                          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-2 text-xs">
                            <div className="font-medium text-blue-700 dark:text-blue-300 flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Market Insight
                            </div>
                            <div className="text-blue-600 dark:text-blue-400 mt-1">
                              {typeof message.marketInsights === 'string' ? message.marketInsights : 'Market data available'}
                            </div>
                          </div>
                        )}

                        {/* Quick Suggestions */}
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Try asking:
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {message.suggestions.map((suggestion, idx) => (
                                <Button
                                  key={idx}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 text-xs"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  data-testid={`suggestion-button-${idx}`}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="chat-message bot">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">SoleBot is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about sneakers, prices, or style advice..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}