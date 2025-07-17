import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SneakerCard from "@/components/SneakerCard";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Stats {
  totalSneakers: string;
  activeUsers: string;
  reviews: string;
  brands: string;
}

const stats: Stats = {
  totalSneakers: "50K+",
  activeUsers: "15K+", 
  reviews: "25K+",
  brands: "500+"
};

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const { data: featuredSneakers, isLoading: sneakersLoading } = useQuery({
    queryKey: ['/api/sneakers'],
    queryFn: async () => {
      const response = await fetch('/api/sneakers?limit=8');
      if (!response.ok) throw new Error('Failed to fetch sneakers');
      return response.json();
    }
  });

  const { data: blogPosts, isLoading: blogLoading } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: async () => {
      const response = await fetch('/api/blog?limit=6');
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    }
  });

  const filterOptions = ["All", "Nike", "Jordan", "Adidas", "New Balance"];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Ultra Minimalistic */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2112&h=1080" 
            alt="Premium sneakers on minimal background" 
            className="w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-tight">
            Where Sole<br />
            <span className="text-primary">Meets Soul</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            The ultimate platform for sneaker discovery, collection, and community
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stats.totalSneakers}</div>
              <div className="text-sm text-muted-foreground font-medium">Sneakers Cataloged</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stats.activeUsers}</div>
              <div className="text-sm text-muted-foreground font-medium">Active Collectors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stats.reviews}</div>
              <div className="text-sm text-muted-foreground font-medium">Community Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stats.brands}</div>
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
              {filterOptions.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className="px-6"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Sneaker Grid */}
          {sneakersLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-2xl h-64 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-6 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredSneakers?.sneakers?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredSneakers.sneakers.map((sneaker: any) => (
                <SneakerCard key={sneaker.id} sneaker={sneaker} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No sneakers available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button size="lg" className="px-8">
              View All Sneakers
            </Button>
          </div>
        </div>
      </section>

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
                  <div className="bg-muted rounded-2xl h-64 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-6 bg-muted rounded w-full"></div>
                    <div className="h-16 bg-muted rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : blogPosts?.posts?.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {blogPosts.posts.slice(0, 3).map((post: any) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
