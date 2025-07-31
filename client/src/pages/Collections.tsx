import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Heart, 
  Bookmark, 
  TrendingUp, 
  Clock, 
  Star,
  Filter,
  Grid3X3,
  List,
  Shuffle,
  Target,
  Crown,
  Gem,
  Sun,
  Snowflake,
  Calendar,
  Zap
} from 'lucide-react';
import { Link } from 'wouter';
import SneakerCard from '@/components/SneakerCard';

interface Collection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  sneakers: any[];
  criteria: string;
  aiRationale: string;
  totalCount: number;
  avgPrice: string;
  priceRange: string;
  tags: string[];
}

export default function Collections() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Fetch AI-curated collections
  const { data: collections, isLoading } = useQuery({
    queryKey: ['/api/collections/ai-curated'],
    queryFn: async () => {
      const response = await fetch('/api/collections/ai-curated');
      if (!response.ok) throw new Error('Failed to fetch collections');
      return response.json();
    }
  });

  // Save collection mutation
  const saveCollectionMutation = useMutation({
    mutationFn: async (collectionId: string) => {
      const response = await fetch('/api/collections/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collectionId })
      });
      return response.json();
    }
  });

  // Generate new collection mutation
  const generateCollectionMutation = useMutation({
    mutationFn: async ({ theme, preferences }: { theme: string; preferences?: any }) => {
      const response = await fetch('/api/collections/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, preferences })
      });
      if (!response.ok) throw new Error('Failed to generate collection');
      return response.json();
    },
    onSuccess: (newCollection) => {
      // Add the new collection to the existing collections
      if (collections) {
        collections.unshift(newCollection);
      }
    }
  });

  const generateNewCollection = () => {
    const themes = ['street-art', 'minimalist', 'retro-future', 'nature-inspired'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    
    generateCollectionMutation.mutate({ 
      theme: randomTheme,
      preferences: { category: selectedCategory }
    });
  };

  const categories = [
    { id: 'all', label: 'All Collections', icon: Grid3X3 },
    { id: 'gems', label: 'Hidden Gems', icon: Gem },
    { id: 'retro', label: 'Retro Classics', icon: Clock },
    { id: 'seasonal', label: 'Seasonal Picks', icon: Sun },
    { id: 'trending', label: 'Trending Now', icon: TrendingUp },
    { id: 'premium', label: 'Premium Selection', icon: Crown }
  ];

  const filteredCollections = collections?.filter((collection: Collection) => 
    selectedCategory === 'all' || collection.tags.includes(selectedCategory)
  ) || [];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Curation
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Curated Collections
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover expertly curated sneaker collections powered by AI analysis of market trends, 
            release history, and cultural significance. Each collection tells a story.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Collections Grid/List */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-96" />
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            {filteredCollections.map((collection: Collection) => (
              <Card key={collection.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-lg">
                        {collection.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{collection.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {collection.totalCount} sneakers • {collection.avgPrice} avg
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => saveCollectionMutation.mutate(collection.id)}
                      disabled={saveCollectionMutation.isPending}
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-muted-foreground">{collection.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {collection.aiGenerated && (
                      <Badge variant="default" className="text-xs bg-primary">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Generated
                      </Badge>
                    )}
                    {collection.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="text-xs">
                      {collection.priceRange}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* AI Rationale */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">AI Insight</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {collection.aiRationale}
                    </p>
                  </div>

                  {/* Featured Sneakers Preview */}
                  <div>
                    <h4 className="font-medium text-sm mb-3">Featured in Collection</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {collection.sneakers.slice(0, 4).map((sneaker, index) => (
                        <div key={index} className="group cursor-pointer">
                          <div className="aspect-square bg-muted/50 rounded-lg overflow-hidden mb-2">
                            <img 
                              src={sneaker.imageUrl || `https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop`}
                              alt={sneaker.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="text-xs">
                            <div className="font-medium truncate">{sneaker.name}</div>
                            <div className="text-muted-foreground">${sneaker.retailPrice}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button asChild className="flex-1">
                      <Link href={`/collections/${collection.id}`}>
                        View Collection
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Target className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Generate New Collection */}
        <div className="mt-16 text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shuffle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Discover More</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Let our AI generate a personalized collection just for you
              </p>
              <Button 
                onClick={() => generateNewCollection()}
                disabled={generateCollectionMutation.isPending}
              >
                {generateCollectionMutation.isPending ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    AI Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Generate New Collection
                  </>
                )}
              </Button>
              {generateCollectionMutation.isError && (
                <p className="text-sm text-red-500 mt-2">
                  AI generation unavailable - using enhanced curated selection
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}