import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  TrendingUp, 
  Shuffle
} from 'lucide-react';
import { Link } from 'wouter';

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
    { id: 'all', label: 'All Collections' },
    { id: 'trending', label: 'Trending' },
    { id: 'premium', label: 'Premium' },
    { id: 'ai-generated', label: 'AI Generated' }
  ];

  const filteredCollections = collections?.filter((collection: Collection) => 
    selectedCategory === 'all' || collection.tags.includes(selectedCategory)
  ) || [];

  return (
    <div className="min-h-screen bg-black">
      <div className="w-layout-blockcontainer container w-container">
        {/* Header Section */}
        <section className="section">
          <div className="text-center">
            <Badge variant="outline" className="mb-4 bg-white/10 border-white/20 text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Curation
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-white font-anton">
              CURATED COLLECTIONS
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Discover expertly curated sneaker collections powered by AI analysis of market trends, 
              release history, and cultural significance. Each collection tells a story.
            </p>
          </div>
        </section>

        {/* Controls Section */}
        <section className="section">
          <div className="flex justify-center">
            <div className="flex gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id 
                    ? 'bg-white text-black hover:bg-white/90' 
                    : 'bg-transparent border-white/30 text-white hover:bg-white/10'
                  }
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Collections Grid/List */}
        <section className="section">
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/10 rounded-lg h-96" />
              </div>
            ))}
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {filteredCollections.map((collection: Collection) => (
                <Card key={collection.id} className="bg-white/5 border-white/10 hover:bg-white/8 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-2 text-white">{collection.title}</h3>
                    <p className="text-white/60 mb-6 text-sm leading-relaxed">{collection.description}</p>
                    
                    {/* Simple 3-image grid */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {collection.sneakers.slice(0, 3).map((sneaker, index) => (
                        <div key={index} className="aspect-square">
                          <img 
                            src={sneaker.imageUrl || `https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop`}
                            alt={sneaker.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                    
                    {/* Single action button */}
                    <Button asChild className="w-full bg-white text-black hover:bg-white/90 font-medium">
                      <Link href={`/collections/${collection.id}`}>
                        View Collection
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Generate New Collection */}
        <section className="section">
          <div className="text-center">
            <Card className="max-w-md mx-auto bg-white/5 border-white/10">
              <CardContent className="py-8">
                <h3 className="text-lg font-medium mb-2 text-white">Discover More</h3>
                <p className="text-sm text-white/60 mb-6">
                  Let our AI generate a personalized collection just for you
                </p>
                <Button 
                  onClick={() => generateNewCollection()}
                  disabled={generateCollectionMutation.isPending}
                  className="bg-white text-black hover:bg-white/90 font-medium"
                >
                  {generateCollectionMutation.isPending ? 'AI Generating...' : 'Generate New Collection'}
                </Button>
                {generateCollectionMutation.isError && (
                  <p className="text-sm text-red-400 mt-4">
                    AI generation unavailable - using enhanced curated selection
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}