import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import SneakerCard from "@/components/SneakerCard";
import VisualSearchDemo from "@/components/VisualSearchDemo";
import CollectionsDemo from "@/components/CollectionsDemo";
import ARDemo from "@/components/ARDemo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { TrendingUp, Users, MessageSquare, Star } from "lucide-react";

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  const { data: featuredSneakers, isLoading: sneakersLoading } = useQuery({
    queryKey: ['/api/sneakers/featured'],
    queryFn: async () => {
      const response = await fetch('/api/sneakers/featured');
      if (!response.ok) throw new Error('Failed to fetch featured sneakers');
      return response.json();
    }
  });

  const { data: brands } = useQuery({
    queryKey: ['/api/brands'],
    queryFn: async () => {
      const response = await fetch('/api/brands');
      if (!response.ok) throw new Error('Failed to fetch brands');
      return response.json();
    }
  });

  // Filter sneakers based on selected brand
  const filteredSneakers = featuredSneakers?.filter((sneaker: any) => {
    if (selectedBrand === 'All') return true;
    return sneaker.brandName === selectedBrand;
  });

  const { data: blogPosts, isLoading: blogLoading } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: async () => {
      const response = await fetch('/api/blog');
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    }
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section - Ultra-minimalistic, buttonless */}
      <Hero />

      {/* Quick Stats */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground font-medium">Sneakers Cataloged</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">15K+</div>
              <div className="text-sm text-muted-foreground font-medium">Active Collectors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">25K+</div>
              <div className="text-sm text-muted-foreground font-medium">Community Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground font-medium">Brands Tracked</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sneakers */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Featured Sneakers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the latest drops and timeless classics in our curated collection
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <Button 
                variant={selectedBrand === 'All' ? 'secondary' : 'ghost'} 
                size="sm" 
                className={selectedBrand === 'All' ? 'bg-background shadow-sm' : ''}
                onClick={() => setSelectedBrand('All')}
              >
                All
              </Button>
              {brands?.map((brand: any) => (
                <Button 
                  key={brand.id}
                  variant={selectedBrand === brand.name ? 'secondary' : 'ghost'} 
                  size="sm"
                  className={selectedBrand === brand.name ? 'bg-background shadow-sm' : ''}
                  onClick={() => setSelectedBrand(brand.name)}
                >
                  {brand.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Sneaker Grid */}
          {sneakersLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredSneakers?.slice(0, 8).map((sneaker: any) => (
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
                    isNew: new Date(sneaker.releaseDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    rating: 4.5,
                    reviewCount: Math.floor(Math.random() * 50) + 10
                  }} 
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/catalog">View All Sneakers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Visual Search Demo Section */}
      <VisualSearchDemo />

      {/* Collections Demo Section */}
      <CollectionsDemo />

      {/* AR Try-On Demo Section */}
      <ARDemo />

      {/* Latest Blog Posts */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Latest Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dive deep into sneaker culture with our community-driven blog
            </p>
          </div>

          {blogLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-2xl h-64 mb-6" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {blogPosts?.slice(0, 3).map((post: any) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.featuredImage || "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge variant="secondary" className="mb-2">Featured</Badge>
                        <h3 className="text-white font-semibold text-lg group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground line-clamp-3">
                        {post.excerpt || "Exploring the latest trends and stories in sneaker culture..."}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">View All Stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Why SoleGrithm?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most comprehensive platform for sneaker enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Real-Time Pricing</h3>
              <p className="text-muted-foreground text-sm">
                Track market prices across all major platforms in real-time
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
              <p className="text-muted-foreground text-sm">
                Connect with collectors and enthusiasts worldwide
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Assistant</h3>
              <p className="text-muted-foreground text-sm">
                Get personalized recommendations from our AI sneaker expert
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Authentic Reviews</h3>
              <p className="text-muted-foreground text-sm">
                Read verified reviews from real sneaker owners
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
