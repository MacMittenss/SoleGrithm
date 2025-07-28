import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Gem, Clock, Sun, TrendingUp, Crown, Target } from 'lucide-react';
import { Link } from 'wouter';

export default function CollectionsDemo() {
  const featuredCollections = [
    {
      id: 'underrated-gems',
      title: 'Underrated Gems',
      description: 'Hidden treasures with exceptional value and untapped potential.',
      icon: <Gem className="w-6 h-6 text-primary" />,
      count: '24 sneakers',
      avgPrice: '$142',
      gradient: 'from-blue-500/10 to-purple-500/10'
    },
    {
      id: 'retro-jordans', 
      title: 'Best Retro Jordans',
      description: 'Iconic silhouettes that defined basketball culture.',
      icon: <Crown className="w-6 h-6 text-primary" />,
      count: '18 sneakers',
      avgPrice: '$285',
      gradient: 'from-red-500/10 to-orange-500/10'
    },
    {
      id: 'summer-flex',
      title: 'Summer Flex Picks',
      description: 'Lightweight, breathable designs for warm weather.',
      icon: <Sun className="w-6 h-6 text-primary" />,
      count: '31 sneakers', 
      avgPrice: '$156',
      gradient: 'from-yellow-500/10 to-orange-500/10'
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Curation
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Curated Collections
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover expertly curated sneaker collections powered by AI analysis of market trends, 
            release history, and cultural significance. Each collection tells a story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredCollections.map((collection) => (
            <Card key={collection.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${collection.gradient}`} />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    {collection.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {collection.title}
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">
                      {collection.count} • {collection.avgPrice} avg
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {collection.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-muted/50 rounded-lg overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop&q=80&crop=entropy&cs=tinysrgb&seed=${i + 1}`}
                        alt="Sneaker preview"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Target className="w-4 h-4 mr-2" />
                  View Collection
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">6+</div>
              <div className="text-xs text-muted-foreground">AI Collections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">150+</div>
              <div className="text-xs text-muted-foreground">Curated Picks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div className="text-xs text-muted-foreground">Auto-Updated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">92%</div>
              <div className="text-xs text-muted-foreground">Accuracy Rate</div>
            </div>
          </div>
          
          <Button size="lg" asChild>
            <Link href="/collections">
              <Sparkles className="w-4 h-4 mr-2" />
              Explore All Collections
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}