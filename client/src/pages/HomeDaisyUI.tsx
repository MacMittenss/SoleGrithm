import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { motion } from 'framer-motion';
import { Link } from "wouter";
import { 
  TrendingUp, 
  Users, 
  Star, 
  ArrowRight, 
  Eye, 
  Heart,
  ShoppingCart,
  Play,
  Search,
} from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import HotRightNowSlider from "@/components/HotRightNowSlider";
import { MasonryGrid } from "@/components/ui/masonry-grid";
import PinterestBlogCard from "@/components/PinterestBlogCard";

export default function HomeDaisyUI() {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [activeCategory, setActiveCategory] = useState<string>('trending');
  const { user, isAuthenticated } = useAuth();

  // Data queries with our authentic data
  const { data: sneakers, isLoading: sneakersLoading } = useQuery({
    queryKey: ["/api/sneakers/featured"],
  });

  const { data: trendingSneakers, isLoading: trendingLoading } = useQuery({
    queryKey: ["/api/sneakers/trending"],
  });

  const { data: brands, isLoading: brandsLoading } = useQuery({
    queryKey: ["/api/brands"],
  });

  const { data: blogPosts, isLoading: blogLoading } = useQuery({
    queryKey: ["/api/blog"],
  });

  const getCategorySneakers = () => {
    switch(activeCategory) {
      case 'trending':
        return trendingSneakers?.slice(0, 6) || [];
      case 'new':
        return sneakers?.filter((s: any) => s.isNew)?.slice(0, 6) || [];
      case 'popular':
        return sneakers?.sort((a: any, b: any) => (b.reviews || 0) - (a.reviews || 0))?.slice(0, 6) || [];
      default:
        return sneakers?.slice(0, 6) || [];
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* DaisyUI Hero Section with SoleGrithm branding */}
      <div className="daisy-hero bg-gradient-to-br from-primary/10 via-accent/5 to-background min-h-screen">
        <div className="daisy-hero-content text-center max-w-6xl">
          <div className="max-w-4xl">
            {/* Hero Badge */}
            <motion.div 
              className="daisy-badge daisy-badge-lg daisy-badge-primary mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              ✨ AI-Powered Sneaker Discovery
            </motion.div>
            
            {/* Hero Title */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              SoleGrithm
            </motion.h1>
            
            {/* Hero Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-base-content/70 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover, collect, and trade sneakers with the power of AI. 
              Connect with a community that shares your passion for exceptional footwear.
            </motion.p>
            
            {/* Hero Actions */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/discover">
                <button className="daisy-btn daisy-btn-primary daisy-btn-lg px-8" data-testid="button-start-discovering">
                  <Search className="w-5 h-5 mr-2" />
                  Start Discovering
                </button>
              </Link>
              <Link href="/ar-demo">
                <button className="daisy-btn daisy-btn-outline daisy-btn-lg px-8" data-testid="button-watch-demo">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* DaisyUI Stats Section with our real data */}
      <div className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="daisy-stats shadow-xl bg-base-200 w-full">
            <div className="daisy-stat place-items-center">
              <div className="daisy-stat-title">Sneakers</div>
              <div className="daisy-stat-value text-primary">50K+</div>
              <div className="daisy-stat-desc">In our catalog</div>
            </div>
            <div className="daisy-stat place-items-center">
              <div className="daisy-stat-title">Users</div>
              <div className="daisy-stat-value text-secondary">15K+</div>
              <div className="daisy-stat-desc">Active collectors</div>
            </div>
            <div className="daisy-stat place-items-center">
              <div className="daisy-stat-title">Reviews</div>
              <div className="daisy-stat-value text-accent">25K+</div>
              <div className="daisy-stat-desc">Community reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* What's Hot Right Now - Keep our existing slider */}
      <HotRightNowSlider />

      {/* DaisyUI Featured Products with our authentic data */}
      <div className="py-24 bg-base-200/50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Sneakers</h2>
            <p className="text-xl text-base-content/60 max-w-2xl mx-auto">
              Curated by our AI and community experts
            </p>
          </div>

          {/* DaisyUI Tabs for Categories */}
          <div className="daisy-tabs daisy-tabs-boxed justify-center mb-12">
            <button 
              className={`daisy-tab daisy-tab-lg ${activeCategory === 'trending' ? 'daisy-tab-active' : ''}`}
              onClick={() => setActiveCategory('trending')}
              data-testid="tab-trending"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </button>
            <button 
              className={`daisy-tab daisy-tab-lg ${activeCategory === 'new' ? 'daisy-tab-active' : ''}`}
              onClick={() => setActiveCategory('new')}
              data-testid="tab-new"
            >
              <Star className="w-4 h-4 mr-2" />
              New Arrivals
            </button>
            <button 
              className={`daisy-tab daisy-tab-lg ${activeCategory === 'popular' ? 'daisy-tab-active' : ''}`}
              onClick={() => setActiveCategory('popular')}
              data-testid="tab-popular"
            >
              <Users className="w-4 h-4 mr-2" />
              Popular
            </button>
          </div>

          {/* DaisyUI Product Grid with our real sneaker data */}
          {sneakersLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="daisy-card bg-base-100 shadow-xl">
                  <figure className="animate-pulse">
                    <div className="w-full h-64 bg-base-300" />
                  </figure>
                  <div className="daisy-card-body">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-base-300 rounded w-3/4" />
                      <div className="h-3 bg-base-300 rounded w-1/2" />
                      <div className="h-6 bg-base-300 rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getCategorySneakers().map((sneaker: any, index: number) => (
                <motion.div
                  key={sneaker.id}
                  className="daisy-card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <figure className="relative overflow-hidden">
                    <img
                      src={sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?w=600&h=400&fit=crop"}
                      alt={sneaker.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col gap-2">
                        <button className="daisy-btn daisy-btn-circle daisy-btn-sm bg-base-100/90" data-testid={`button-favorite-${sneaker.id}`}>
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="daisy-btn daisy-btn-circle daisy-btn-sm bg-base-100/90" data-testid={`button-quickview-${sneaker.id}`}>
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </figure>

                  <div className="daisy-card-body">
                    <h2 className="daisy-card-title">
                      {sneaker.name}
                      {sneaker.isNew && (
                        <div className="daisy-badge daisy-badge-secondary">NEW</div>
                      )}
                    </h2>
                    <p className="text-base-content/60">{sneaker.brandName || 'Unknown Brand'}</p>
                    
                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(sneaker.retailPrice || 0)}
                      </span>
                    </div>

                    <div className="daisy-card-actions justify-end">
                      <Link href={`/sneaker/${sneaker.slug}`}>
                        <button className="daisy-btn daisy-btn-primary" data-testid={`button-view-${sneaker.id}`}>
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/live-market">
              <button className="daisy-btn daisy-btn-outline daisy-btn-lg" data-testid="button-view-all-products">
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Blog Section with DaisyUI cards */}
      <div className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Latest Stories</h2>
            <p className="text-xl text-base-content/60">
              Discover sneaker culture and trends
            </p>
          </div>

          {blogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="daisy-card bg-base-200 shadow-lg">
                  <figure className="animate-pulse">
                    <div className="w-full h-48 bg-base-300" />
                  </figure>
                  <div className="daisy-card-body">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-base-300 rounded w-full" />
                      <div className="h-3 bg-base-300 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.isArray(blogPosts) && blogPosts.slice(0, 3).map((post: any, index: number) => (
                <motion.div
                  key={post.id}
                  className="daisy-card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <figure>
                    <img
                      src={post.featuredImage || "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop"}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                  <div className="daisy-card-body">
                    <h2 className="daisy-card-title">{post.title}</h2>
                    <p className="text-base-content/60">{post.excerpt}</p>
                    <div className="daisy-card-actions justify-end">
                      <Link href={`/blog/${post.slug}`}>
                        <button className="daisy-btn daisy-btn-primary daisy-btn-sm">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-base-200/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Choose SoleGrithm?</h2>
            <p className="text-xl text-base-content/60">
              Experience the future of sneaker discovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI-Powered Recommendations",
                description: "Get personalized sneaker suggestions based on your style and preferences"
              },
              {
                icon: "👥", 
                title: "Community Driven",
                description: "Connect with fellow sneakerheads and discover trending styles"
              },
              {
                icon: "📱",
                title: "AR Try-On",
                description: "See how sneakers look on your feet before you buy"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="daisy-card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="daisy-card-body items-center text-center">
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <h3 className="daisy-card-title text-xl mb-2">{feature.title}</h3>
                  <p className="text-base-content/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Pair?
          </h2>
          <p className="text-xl text-base-content/60 mb-8">
            Join thousands of sneaker enthusiasts discovering their next favorite kicks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="daisy-btn daisy-btn-primary daisy-btn-lg px-8" data-testid="button-get-started">
                Get Started Free
              </button>
            </Link>
            <Link href="/about">
              <button className="daisy-btn daisy-btn-outline daisy-btn-lg px-8" data-testid="button-learn-more">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}