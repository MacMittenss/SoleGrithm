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
  Users
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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            AI-Powered Discovery
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Discover Your Next Grail
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Harness the power of AI to find personalized recommendations, predict market trends, 
            and discover sneakers that match your unique style and preferences.
          </p>
        </div>

        <Tabs defaultValue="recommendations" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4 h-auto p-1">
            <TabsTrigger value="recommendations" className="flex items-center gap-2 py-3">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Recommendations</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2 py-3">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Trending</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2 py-3">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">AI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="vision" className="flex items-center gap-2 py-3">
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Image Search</span>
            </TabsTrigger>
          </TabsList>

          {/* AI Recommendations */}
          <TabsContent value="recommendations" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Preference Input */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
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
                    className="w-full" 
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
                  <h3 className="text-2xl font-bold">Personalized for You</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <Brain className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                </div>
                
                {!recommendations?.length && !recommendationsLoading && (
                  <div className="text-center py-12">
                    <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-semibold mb-2">Get Started with AI Recommendations</h4>
                    <p className="text-muted-foreground mb-4">
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
                        <SneakerCard 
                          key={sneaker.id} 
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
                      ))}
                    </div>
                    
                    {recommendations.length > 4 && (
                      <div className="text-center">
                        <Button variant="outline" className="mb-4">
                          Show More Recommendations
                        </Button>
                      </div>
                    )}
                    
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
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

          {/* Trending Analysis */}
          <TabsContent value="trending" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Hottest Brand</p>
                      <p className="text-2xl font-bold text-primary">
                        {trending?.length > 0 ? trending[0]?.brandName || 'Nike' : 'Nike'}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500">
                      +{trending?.length > 0 ? trending[0]?.weeklyGrowth || '23.5' : '23.5'}%
                    </span>
                    <span className="text-muted-foreground ml-1">this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Top Trending Score</p>
                      <p className="text-2xl font-bold text-primary">
                        {trending?.length > 0 ? trending[0]?.trendingScore || '95' : '95'}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-blue-500">Heat Index</span>
                    <span className="text-muted-foreground ml-1">out of 100</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Search Volume</p>
                      <p className="text-2xl font-bold text-primary">
                        {trending?.length > 0 ? 
                          `${Math.floor((trending[0]?.searchVolume || 5000) / 1000)}K` : '5K'}
                      </p>
                    </div>
                    <Search className="h-8 w-8 text-purple-500" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-purple-500">
                      {trending?.length > 0 ? trending[0]?.name || 'Top Sneaker' : 'Top Sneaker'}
                    </span>
                    <span className="text-muted-foreground ml-1">searches today</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Trending Items</p>
                      <p className="text-2xl font-bold text-primary">{trending?.length || 0}</p>
                    </div>
                    <Users className="h-8 w-8 text-orange-500" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-orange-500">Live</span>
                    <span className="text-muted-foreground ml-1">trending now</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Trending Now</h3>
                <Badge variant="outline" className="text-xs">
                  Updated every hour
                </Badge>
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
                  {trending?.slice(0, 8).map((sneaker: any, index) => (
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
                      {/* Trending indicators */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          #{index + 1}
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                          +{sneaker.weeklyGrowth}%
                        </Badge>
                      </div>
                      {sneaker.trendingScore > 90 && (
                        <div className="absolute top-2 right-2">
                          <Badge className="text-xs bg-red-500 text-white">🔥 Hot</Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* AI Chat */}
          <TabsContent value="chat" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Chat with SoleBot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6 h-96 overflow-y-auto bg-muted/50 rounded-lg p-4">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex items-start gap-3 ${chat.type === 'user' ? 'justify-end' : ''}`}>
                        {chat.type === 'bot' && (
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className={`rounded-lg p-3 max-w-md ${
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
                        <div className="bg-background rounded-lg p-3 max-w-md">
                          <p className="text-sm text-muted-foreground">SoleBot is thinking...</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <form onSubmit={handleChatSubmit} className="flex gap-2">
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Image Search */}
          <TabsContent value="vision" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-primary" />
                    Sneaker Image Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {imageFile ? (
                    <div className="space-y-4">
                      <img 
                        src={URL.createObjectURL(imageFile)} 
                        alt="Uploaded sneaker" 
                        className="w-full max-h-64 object-cover rounded-lg"
                      />
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => imageAnalysisMutation.mutate(imageFile)}
                          disabled={imageAnalysisMutation.isPending}
                          className="flex-1"
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
                          variant="outline" 
                          onClick={() => setImageFile(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Upload a sneaker image</p>
                        <p className="text-xs text-muted-foreground">
                          Our AI will identify the sneaker, find similar styles, and provide market insights
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button variant="outline" className="mt-4" asChild>
                          <span>Choose Image</span>
                        </Button>
                      </label>
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
                          className="flex-1"
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
                          className="flex-1"
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
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs text-muted-foreground mb-1">Identified As</p>
                          <p className="font-semibold">{imageAnalysisMutation.data.identification}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Brand</p>
                            <p className="font-semibold">{imageAnalysisMutation.data.brand}</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">Style</p>
                            <p className="font-semibold">{imageAnalysisMutation.data.style}</p>
                          </div>
                        </div>
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-xs text-green-600 mb-1">Estimated Value</p>
                          <p className="font-bold text-green-700 text-lg">{imageAnalysisMutation.data.estimatedValue}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
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
                      <p className="text-sm text-muted-foreground mb-4">
                        Based on your uploaded image, here are similar sneakers:
                      </p>
                      <div className="grid grid-cols-1 gap-4">
                        {recommendations?.slice(0, 3).map((sneaker: any) => (
                          <div key={sneaker.id} className="flex gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <img 
                              src={sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"}
                              alt={sneaker.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{sneaker.name}</p>
                              <p className="text-xs text-muted-foreground">{sneaker.brandName}</p>
                              <p className="text-sm font-semibold text-primary">
                                ${sneaker.retailPrice}
                              </p>
                            </div>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full">
                        <Search className="w-4 h-4 mr-2" />
                        View All Similar Sneakers
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">
                      <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="font-medium mb-2">Upload an image to see similar sneakers</p>
                      <p className="text-xs">Our AI will find sneakers with similar colors, shapes, and styles</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}