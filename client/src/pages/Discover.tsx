// Floating AI Chat Button and Modal
type ChatFloatingButtonProps = {
  chatMessage: string;
  setChatMessage: React.Dispatch<React.SetStateAction<string>>;
  chatHistory: Array<{ type: 'user' | 'bot'; message: string; timestamp: string }>;
  setChatHistory: React.Dispatch<React.SetStateAction<Array<{ type: 'user' | 'bot'; message: string; timestamp: string }>>>;
  chatMutation: any;
  handleChatSubmit: (e: React.FormEvent) => void;
};

function ChatFloatingButton({ chatMessage, setChatMessage, chatHistory, setChatHistory, chatMutation, handleChatSubmit }: ChatFloatingButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="fixed z-50 bottom-6 right-6 bg-black text-white rounded-full shadow-lg p-4 flex items-center hover:bg-zinc-900 transition-colors border border-white/10"
        onClick={() => setOpen(true)}
        aria-label="Open AI Chat"
        style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)' }}
      >
        <MessageSquare className="w-7 h-7" />
      </button>
      {open && (
        <div className="fixed z-50 bottom-24 right-6 w-[95vw] max-w-md bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col" style={{ minHeight: 400, maxHeight: '80vh' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-lg font-bold text-white">
              <MessageSquare className="w-5 h-5" /> SoleBot
            </div>
            <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white text-xl font-bold">×</button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 mb-2 bg-zinc-800 rounded-lg p-3">
            {chatHistory.map((chat: { type: 'user' | 'bot'; message: string; timestamp: string }, index: number) => (
              <div key={index} className={`flex items-start gap-3 ${chat.type === 'user' ? 'justify-end' : ''}`}>
                {chat.type === 'bot' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`rounded-lg p-3 max-w-xs ${
                  chat.type === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto' 
                    : 'bg-background'
                }`}>
                  <p className="text-sm whitespace-pre-line">{chat.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(chat.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                {chat.type === 'user' && (
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">You</span>
                  </div>
                )}
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white animate-pulse" />
                </div>
                <div className="bg-background rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-muted-foreground">SoleBot is thinking...</p>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleChatSubmit} className="flex gap-2 mt-2">
            <Input
              placeholder="Ask me about sneakers, trends, recommendations..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={chatMutation.isPending}>
              Send
            </Button>
          </form>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => chatMutation.mutate("What's trending this week?")}
              disabled={chatMutation.isPending}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Show trending sneakers
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => chatMutation.mutate("Predict price changes for popular sneakers")}
              disabled={chatMutation.isPending}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Predict price changes
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => chatMutation.mutate("Recommend sneakers under $200")}
              disabled={chatMutation.isPending}
            >
              <Star className="w-4 h-4 mr-2" />
              Recommend based on style
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => chatMutation.mutate("What are the upcoming releases this month?")}
              disabled={chatMutation.isPending}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Upcoming releases
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { 
  Sparkles, 
  TrendingUp, 
  Camera, 
  MessageSquare,
  Target,
  Zap,
  Brain,
  Search,
  Upload,
  Star,
  DollarSign,
  Calendar,
  Users,
  Compass,
  CheckCircle
} from "lucide-react";
import SneakerCard from "@/components/SneakerCard";

export default function Discover() {
  const [chatMessage, setChatMessage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'bot', message: string, timestamp: string}>>([
    {
      type: 'bot',
      message: "Hey! I'm SoleBot, your AI sneaker expert. Ask me anything about sneakers, trends, prices, or get personalized recommendations!",
      timestamp: new Date().toISOString()
    }
  ]);
  const [preferences, setPreferences] = useState({
    style: '',
    budget: '',
    occasion: '',
    brands: ''
  });

  const queryClient = useQueryClient();

  // Get AI recommendations with preferences
  const { data: recommendations, isLoading: recommendationsLoading, refetch: refetchRecommendations } = useQuery({
    queryKey: ['/api/ai/recommendations', preferences],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (preferences.style) params.append('style', preferences.style);
      if (preferences.budget) params.append('budget', preferences.budget);
      if (preferences.brands) params.append('brands', preferences.brands);
      if (preferences.occasion) params.append('occasion', preferences.occasion);
      
      const response = await fetch(`/api/ai/recommendations?${params}`);
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      return response.json();
    },
    enabled: true
  });

  // Get trending sneakers
  const { data: trending, isLoading: trendingLoading } = useQuery({
    queryKey: ['/api/sneakers/trending'],
    queryFn: async () => {
      const response = await fetch('/api/sneakers/trending');
      if (!response.ok) throw new Error('Failed to fetch trending sneakers');
      return response.json();
    }
  });

  // Get price predictions
  const { data: predictions, isLoading: predictionsLoading } = useQuery({
    queryKey: ['/api/ai/price-predictions'],
    queryFn: async () => {
      const response = await fetch('/api/ai/price-predictions');
      if (!response.ok) throw new Error('Failed to fetch price predictions');
      return response.json();
    }
  });

  // Chat with AI mutation
  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      if (!response.ok) throw new Error('Failed to send message');
      return response.json();
    },
    onSuccess: (data, message) => {
      // Add user message and bot response to chat history
      setChatHistory(prev => [
        ...prev,
        { type: 'user', message, timestamp: new Date().toISOString() },
        { type: 'bot', message: data.response, timestamp: data.timestamp }
      ]);
      setChatMessage('');
    }
  });

  // Image analysis mutation
  const imageAnalysisMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch('/api/ai/analyze-image', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Failed to analyze image');
      return response.json();
    }
  });

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      chatMutation.mutate(chatMessage);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      imageAnalysisMutation.mutate(file);
    }
  };

  return (
    <div className="min-h-screen py-16 bg-black">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 xl:px-32"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.07vw', color: 'white' }}
      >
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-400/10 text-blue-400 px-4 py-2 rounded-full text-base font-semibold mb-5"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.07vw', color: '#60a5fa' }}>
            <Compass className="w-5 h-5" />
            Real-Time Intelligence
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
            SoleRadar
          </h1>
          <p className="text-2xl text-zinc-300 max-w-3xl mx-auto font-light" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.07vw', color: 'white' }}>
            Real-time sneaker intelligence powered by AI. Track trends, discover hot drops, 
            and get personalized recommendations from live market data.
          </p>
        </div>

  <Tabs defaultValue="recommendations" className="space-y-12" style={{ color: 'white' }}>
          <TabsList className="flex justify-evenly gap-12 w-full h-auto p-1 bg-zinc-900 rounded-xl border border-white/10 mb-8 overflow-x-auto whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.07vw' }}>
            <TabsTrigger value="recommendations" className="flex items-center gap-2 py-4 text-white data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-400 text-lg font-semibold">
              <Target className="w-5 h-5" />
              <span className="hidden sm:inline">Recommendations</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2 py-4 text-white data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-400 text-lg font-semibold">
              <TrendingUp className="w-5 h-5" />
              <span className="hidden sm:inline">Trending</span>
            </TabsTrigger>
            {/* AI Chat tab removed */}
            <TabsTrigger value="vision" className="flex items-center gap-2 py-4 text-white data-[state=active]:bg-zinc-800 data-[state=active]:text-blue-400 text-lg font-semibold">
              <Camera className="w-5 h-5" />
              <span className="hidden sm:inline">Image Search</span>
            </TabsTrigger>
          </TabsList>

          {/* AI Recommendations */}
          <TabsContent value="recommendations" className="space-y-10" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.07vw', color: 'white' }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Preference Input */}
              <Card className="lg:col-span-1 bg-black border border-white/10 shadow-lg text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    Your Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Style Preference</label>
                    <Input
                      placeholder="e.g., minimalist, streetwear, athletic"
                      value={preferences.style}
                      onChange={(e) => setPreferences({...preferences, style: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Budget Range</label>
                    <Input
                      placeholder="e.g., $100-300, under $200"
                      value={preferences.budget}
                      onChange={(e) => setPreferences({...preferences, budget: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Occasion</label>
                    <Input
                      placeholder="e.g., casual wear, gym, office"
                      value={preferences.occasion}
                      onChange={(e) => setPreferences({...preferences, occasion: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Preferred Brands</label>
                    <Input
                      placeholder="e.g., Nike, Adidas, Jordan"
                      value={preferences.brands}
                      onChange={(e) => setPreferences({...preferences, brands: e.target.value})}
                    />
                  </div>
                  <Button 
                    className="w-full bg-black text-white border border-white hover:bg-zinc-900 hover:text-white font-semibold"
                    onClick={() => refetchRecommendations()}
                    disabled={recommendationsLoading}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {recommendationsLoading ? 'Generating...' : 'Get AI Recommendations'}
                  </Button>
                </CardContent>
              </Card>

              {/* Recommendations Grid */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '0.07vw', color: 'white' }}>Personalized for You</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.07vw' }}>
                    <Brain className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                </div>
                
                {!recommendations?.length && !recommendationsLoading && (
                  <div className="text-center py-12">
                    <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-semibold mb-2" style={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>Get Started with AI Recommendations</h4>
                    <p className="text-muted-foreground mb-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.07vw', color: 'white' }}>
                      Fill in your preferences and click "Get AI Recommendations" to discover sneakers tailored to your style.
                    </p>
                  </div>
                )}
                
                {recommendationsLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-muted rounded-2xl h-64 mb-4" />
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded w-1/3" />
                          <div className="h-5 bg-muted rounded w-2/3" />
                          <div className="h-6 bg-muted rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recommendations?.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      {recommendations.slice(0, 4).map((sneaker: any) => (
                        <div key={sneaker.id} className="bg-black border border-white/10 rounded-2xl shadow-lg p-4 text-white">
                          <SneakerCard 
                            sneaker={{
                              id: sneaker.id,
                              name: sneaker.name,
                              brand: sneaker.brandName || 'Unknown Brand',
                              price: new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD'
                              }).format(sneaker.retailPrice),
                              imageUrl: sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                              slug: sneaker.slug,
                              isNew: false,
                              rating: 4.5,
                              reviewCount: Math.floor(Math.random() * 50) + 10
                            }} 
                          />
                        </div>
                      ))}
                    </div>
                    
                    {recommendations.length > 4 && (
                      <div className="text-center">
                        <Button variant="outline" className="mb-4 bg-black text-white border border-white hover:bg-zinc-900 hover:text-white">
                          Show More Recommendations
                        </Button>
                      </div>
                    )}
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.07vw', color: 'white' }}>
                        <Sparkles className="w-4 h-4 inline mr-1" />
                        These recommendations are based on your preferences and current market trends. 
                        Update your preferences for more personalized results.
                      </p>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </TabsContent>

          {/* Real-Time Trending Analysis */}
          <TabsContent value="trending" className="space-y-8" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.07vw', color: 'white' }}>
            {/* Live Market Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border border-white/10 text-white bg-transparent shadow-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Market Leader</p>
                      <p className="text-2xl font-bold text-white">
                        {trending?.length > 0 ? trending[0]?.brandName || 'Nike' : 'Nike'}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-white">
                      +{trending?.length > 0 ? trending[0]?.weeklyGrowth || '23.5' : '23.5'}%
                    </span>
                    <span className="text-white ml-1">this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 text-white bg-transparent shadow-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Heat Index</p>
                      <p className="text-2xl font-bold text-white">
                        {trending?.length > 0 ? trending[0]?.trendingScore || '95' : '95'}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-white">Market Activity</span>
                    <span className="text-white ml-1">live data</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 text-white bg-transparent shadow-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Trade Volume</p>
                      <p className="text-2xl font-bold text-white">
                        {trending?.length > 0 ? 
                          `${Math.floor((trending[0]?.searchVolume || 5000) / 1000)}K` : '5K'}
                      </p>
                    </div>
                    <Search className="h-8 w-8 text-white" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-white">Daily Trades</span>
                    <span className="text-white ml-1">last 24h</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-white/10 text-white bg-transparent shadow-none">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Live Trackers</p>
                      <p className="text-2xl font-bold text-white">{trending?.length || 0}</p>
                    </div>
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-white">Active</span>
                    <span className="text-white ml-1">monitoring</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* This Week's Heat Section */}
            {/* Multiple Trending Sections */}
            <div className="space-y-12">
              {/* This Week's Heat */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">
                    This Week's Heat
                  </h3>
                </div>
                
                {trendingLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length:4 }).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-muted rounded-2xl h-64 mb-4" />
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded w-1/3" />
                          <div className="h-5 bg-muted rounded w-2/3" />
                          <div className="h-6 bg-muted rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trending?.slice(0, 4).map((sneaker: any) => (
                      <div key={sneaker.id} className="relative">
                        <SneakerCard 
                          sneaker={{
                            id: sneaker.id,
                            name: sneaker.name,
                            brand: sneaker.brandName || 'Unknown Brand',
                            price: new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(sneaker.retailPrice),
                            imageUrl: sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                            slug: sneaker.slug,
                            isNew: false,
                            rating: 4.5,
                            reviewCount: Math.floor(Math.random() * 50) + 10
                          }} 
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top 10 Most Traded */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">
                    Top 10 Most Traded
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trending?.slice(0, 10).map((sneaker: any, index: number) => (
                    <div key={`traded-${sneaker.id}`} className="flex gap-4 p-4 border border-white/10 rounded-lg hover:bg-zinc-900 transition-colors text-white bg-transparent">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                      <img 
                        src={sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"}
                        alt={sneaker.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{sneaker.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{sneaker.brandName}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">${sneaker.retailPrice}</span>
                          <Badge variant="secondary" className="text-xs">
                            {Math.floor(Math.random() * 500) + 100} trades
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Climbing the Charts */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">
                    Climbing the Charts
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trending?.slice(0, 6).map((sneaker: any, index: number) => (
                    <Card key={`climbing-${sneaker.id}`} className="relative overflow-hidden border border-white/10 text-white bg-transparent shadow-none">
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-500 text-white text-xs">
                          +{sneaker.weeklyGrowth}%
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <img 
                          src={sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"}
                          alt={sneaker.name}
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                        <h4 className="font-semibold text-sm mb-1">{sneaker.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{sneaker.brandName}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">${sneaker.retailPrice}</span>
                          <div className="flex items-center gap-1 text-green-600">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-xs font-medium">Rising</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Trending Now</h3>
              </div>
              
              {trendingLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-muted rounded-2xl h-64 mb-4" />
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-1/3" />
                        <div className="h-5 bg-muted rounded w-2/3" />
                        <div className="h-6 bg-muted rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trending?.slice(0, 8).map((sneaker: any, index: number) => (
                    <div key={sneaker.id} className="relative">
                      <SneakerCard 
                        sneaker={{
                          id: sneaker.id,
                          name: sneaker.name,
                          brand: sneaker.brandName || 'Unknown Brand',
                          price: new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                          }).format(sneaker.retailPrice),
                          imageUrl: sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                          slug: sneaker.slug,
                          isNew: false,
                          rating: 4.5,
                          reviewCount: Math.floor(Math.random() * 50) + 10
                        }} 
                      />
                      {/* Badges removed */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>





          {/* AI Chat floating button and modal */}
          <ChatFloatingButton 
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            chatMutation={chatMutation}
            handleChatSubmit={handleChatSubmit}
          />

          {/* Image Search */}
          <TabsContent value="vision" className="space-y-8" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.07vw', color: 'white' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-black border border-white/10 text-white shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-white" />
                    Sneaker Image Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {imageFile ? (
                    <div className="space-y-4 bg-black rounded-2xl p-8 shadow-lg">
                      <img 
                        src={URL.createObjectURL(imageFile)} 
                        alt="Uploaded sneaker" 
                        className="w-full max-h-64 object-cover rounded-xl shadow border-2 border-white"
                      />
                      <div className="flex gap-3 justify-center">
                        <Button
                          className="bg-zinc-900 text-white border border-white hover:bg-zinc-800 flex-1"
                          size="sm"
                          onClick={() => imageAnalysisMutation.mutate(imageFile)}
                          disabled={imageAnalysisMutation.isPending}
                        >
                          {imageAnalysisMutation.isPending ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Brain className="w-4 h-4 mr-2" />
                              Analyze Image
                            </>
                          )}
                        </Button>
                        <Button
                          className="bg-zinc-900 text-white border border-white hover:bg-zinc-800 flex-1"
                          size="sm"
                          variant="outline"
                          onClick={() => setImageFile(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 bg-black rounded-2xl p-8 shadow-lg flex flex-col items-center">
                      <div className="mx-auto w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center border-2 border-white">
                        <Upload className="w-10 h-10 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold mb-2 text-white tracking-wide">
                          Drop your sneaker photo here
                        </p>
                        <p className="text-sm text-zinc-300 mb-4">
                          JPG, PNG, WebP up to 10MB
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <Button asChild className="bg-white text-black font-semibold px-6 py-2 rounded-lg shadow hover:bg-zinc-200 transition mt-4">
                          <label htmlFor="image-upload" className="cursor-pointer">
                            Choose File
                          </label>
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Demo Buttons */}
                  {!imageFile && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-center">Or try these examples:</p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-black text-white border-white hover:bg-zinc-900"
                          onClick={() => {
                            imageAnalysisMutation.mutate(new File([], 'demo-jordan.jpg'));
                          }}
                          disabled={imageAnalysisMutation.isPending}
                        >
                          Demo: Jordan 1
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-black text-white border-white hover:bg-zinc-900"
                          onClick={() => {
                            imageAnalysisMutation.mutate(new File([], 'demo-nike.jpg'));
                          }}
                          disabled={imageAnalysisMutation.isPending}
                        >
                          Demo: Nike Dunk
                        </Button>
                      </div>
                    </div>
                  )}

                  {imageAnalysisMutation.data && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Analysis Results</h4>
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {imageAnalysisMutation.data.confidence}% Match
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="p-3 border border-white/10 rounded-lg text-white bg-transparent">
                          <p className="text-xs text-muted-foreground mb-1">Identified As</p>
                          <p className="font-semibold">{imageAnalysisMutation.data.identification}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-3 border border-white/10 rounded-lg text-white bg-transparent">
                            <p className="text-xs text-muted-foreground mb-1">Brand</p>
                            <p className="font-semibold">{imageAnalysisMutation.data.brand}</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Style</p>
                            <p className="font-semibold">{imageAnalysisMutation.data.style}</p>
                          </div>
                        </div>
                        <div className="p-3 border border-white/10 rounded-lg text-green-400 bg-transparent">
                          <p className="text-xs text-green-600 mb-1">Estimated Value</p>
                          <p className="font-bold text-green-700 text-lg">{imageAnalysisMutation.data.estimatedValue}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-black border border-white/10 text-white shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Similar Sneakers
                    {imageAnalysisMutation.data && (
                      <Badge variant="outline">
                        AI Matched
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {imageAnalysisMutation.data ? (
                    <div className="space-y-4">
                      <p className="text-sm text-zinc-300 mb-4">
                        Based on your uploaded image, here are similar sneakers:
                      </p>
                      <div className="grid grid-cols-1 gap-4">
                        {recommendations?.slice(0, 3).map((sneaker: any) => (
                          <div key={sneaker.id} className="flex gap-3 p-3 border border-white/10 rounded-lg hover:bg-zinc-900 transition-colors bg-black text-white">
                            <img 
                              src={sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"}
                              alt={sneaker.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm text-white">{sneaker.name}</p>
                              <p className="text-xs text-zinc-300">{sneaker.brandName}</p>
                              <p className="text-sm font-semibold text-white">
                                ${sneaker.retailPrice}
                              </p>
                            </div>
                            <Button size="sm" variant="outline" className="border-white text-white">
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full border-white text-white bg-black hover:bg-zinc-900">
                        <Search className="w-4 h-4 mr-2" />
                        View All Similar Sneakers
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center text-zinc-300 py-8">
                      <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="font-medium mb-2">Upload an image to see similar sneakers</p>
                      <p className="text-xs">Our AI will find sneakers with similar colors, shapes, and styles</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            {/* Pro Tips for Best Results (spanning both columns) */}
            <div className="col-span-1 lg:col-span-2 mt-8">
              <div className="rounded-2xl bg-zinc-900 shadow-lg border border-white/10 p-8 flex flex-col justify-center text-center">
                <div className="flex items-center gap-2 text-2xl mb-6 justify-center">
                  <Target className="w-7 h-7 text-white" />
                  <span className="text-white font-bold">Pro Tips for Best Results</span>
                </div>
                <div className="space-y-6 text-lg">
                  <div className="flex flex-col items-center">
                    <Zap className="w-6 h-6 text-blue-400 mb-2" />
                    <div>
                      <div className="font-semibold text-white text-xl">Clear, well-lit photos work best</div>
                      <div className="text-zinc-300 text-lg">Avoid blurry or dark images</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Zap className="w-6 h-6 text-blue-400 mb-2" />
                    <div>
                      <div className="font-semibold text-white text-xl">Show the full sneaker profile</div>
                      <div className="text-zinc-300 text-lg">Side view captures the most details</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <Zap className="w-6 h-6 text-blue-400 mb-2" />
                    <div>
                      <div className="font-semibold text-white text-xl">Celebrity or influencer photos work great</div>
                      <div className="text-zinc-300 text-lg">Our AI recognizes context and styling</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}