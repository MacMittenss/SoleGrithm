import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import Hero from "@/components/Hero";
import HotRightNowSlider from "@/components/HotRightNowSlider";
import PinterestSneakerCard from "@/components/PinterestSneakerCard";
import PinterestBlogCard from "@/components/PinterestBlogCard";
import GoatStyleFeaturedGrid from "@/components/GoatStyleFeaturedGrid";
import { MasonryGrid } from "@/components/ui/masonry-grid";
import VisualSearchDemo from "@/components/VisualSearchDemo";
import CollectionsDemo from "@/components/CollectionsDemo";
import ARDemo from "@/components/ARDemo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Star, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  Heart,
  ShoppingBag,
  Zap,
  ChevronDown,
  Play,
  Search
} from "lucide-react";
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const { user, isAuthenticated } = useAuth();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform values for parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Animation variants for mobile-first design
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  // API Data fetching
  const { data: sneakers, isLoading: sneakersLoading } = useQuery({
    queryKey: ["/api/sneakers/trending"],
  });

  const { data: featuredSneakers, isLoading: featuredLoading } = useQuery({
    queryKey: ["/api/sneakers/featured"],
  });

  const { data: brands } = useQuery({
    queryKey: ["/api/brands"],
  });

  // Filter trending sneakers based on selected brand
  const filteredSneakers = Array.isArray(sneakers) ? sneakers.filter((sneaker: any) => {
    if (selectedBrand === 'All') return true;
    return sneaker.brandName === selectedBrand;
  }) : [];

  const { data: blogPosts, isLoading: blogLoading, error: blogError } = useQuery({
    queryKey: ["/api/blog"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Now that the query client is fixed, all queries should work



  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section with Parallax */}
      <motion.div style={{ y, opacity }}>
        <Hero />
      </motion.div>

      {/* What's Hot Right Now Slider */}
      <motion.div variants={itemVariants}>
        <HotRightNowSlider />
      </motion.div>

      {/* Quick Stats with Animated Counters */}
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-background via-muted/30 to-background"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={containerVariants}
          >
            {[
              { value: "50K+", label: "Sneakers Cataloged", delay: 0 },
              { value: "15K+", label: "Active Collectors", delay: 0.1 },
              { value: "25K+", label: "Community Reviews", delay: 0.2 },
              { value: "98%", label: "Satisfaction Rate", delay: 0.3 }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      delay: stat.delay,
                      ease: "easeOut"
                    }
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Mobile-First Quick Actions */}
      {!isAuthenticated && (
        <motion.section 
          className="py-12 sm:py-16 px-4"
          variants={itemVariants}
        >
          <div className="max-w-sm mx-auto space-y-4">
            <motion.div
              className="text-center mb-6"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold mb-2">Join SoleGrithm</h3>
              <p className="text-sm text-muted-foreground">Start your sneaker journey today</p>
            </motion.div>
            
            <motion.div
              className="space-y-3"
              variants={containerVariants}
            >
              <Link href="/auth">
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button 
                    className="w-full h-12 text-base font-medium"
                    data-testid="button-get-started"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </Link>
              
              <Link href="/visual-search">
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button 
                    variant="outline" 
                    className="w-full h-12 text-base"
                    data-testid="button-try-search"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Try Visual Search
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Personalized Quick Stats for Authenticated Users */}
      {isAuthenticated && (
        <motion.section 
          className="py-12 sm:py-16 px-4"
          variants={itemVariants}
        >
          <div className="max-w-md mx-auto">
            <motion.div
              className="bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-2xl p-6 border border-primary/10"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Welcome back, {user?.displayName || 'Sneakerhead'}!</h3>
                <p className="text-sm text-muted-foreground">Your sneaker stats</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">42</div>
                  <div className="text-xs text-muted-foreground">Sneakers Owned</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-500">18</div>
                  <div className="text-xs text-muted-foreground">On Wishlist</div>
                </div>
              </div>
              
              <Link href="/profile">
                <Button variant="outline" className="w-full mt-4" data-testid="button-view-profile">
                  View Profile
                  <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg]" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* GOAT-Style Featured Sneakers Section */}
      <motion.section 
        className="py-16 sm:py-24"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {featuredLoading ? (
            <div className="mb-6">
              <div className="h-6 bg-muted rounded w-32 mb-6" />
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-muted rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <GoatStyleFeaturedGrid
              sneakers={Array.isArray(featuredSneakers) ? featuredSneakers.map((sneaker: any) => ({
                id: sneaker.id,
                name: sneaker.name,
                brand: sneaker.brandName || 'Unknown Brand',
                price: new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(sneaker.retailPrice),
                imageUrl: sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
                slug: sneaker.slug,
                brandName: sneaker.brandName,
                retailPrice: sneaker.retailPrice,
                colorway: sneaker.colorway
              })) : []}
              title="Just Dropped"
            />
          )}
        </div>
      </motion.section>

      {/* Pinterest-Style Trending Sneakers Section */}
      <motion.section 
        className="py-16 sm:py-24 bg-muted/20"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Trending Now
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Discover what's hot in the sneaker community
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-1 bg-background/50 backdrop-blur-sm border border-border/50 p-1 rounded-lg">
              <Button 
                variant={selectedBrand === 'All' ? 'secondary' : 'ghost'} 
                size="sm" 
                className={selectedBrand === 'All' ? 'bg-background shadow-sm' : ''}
                onClick={() => setSelectedBrand('All')}
              >
                All
              </Button>
              {Array.isArray(brands) ? brands.map((brand: any) => (
                <Button 
                  key={brand.id}
                  variant={selectedBrand === brand.name ? 'secondary' : 'ghost'} 
                  size="sm"
                  className={selectedBrand === brand.name ? 'bg-background shadow-sm' : ''}
                  onClick={() => setSelectedBrand(brand.name)}
                >
                  {brand.name}
                </Button>
              )) : null}
            </div>
          </div>

          {/* Pinterest-Style Masonry Grid */}
          {sneakersLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg aspect-[3/4] mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <MasonryGrid
              columns={{ default: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
              gap="1rem"
              className="max-w-7xl mx-auto"
            >
              {filteredSneakers?.slice(0, 12).map((sneaker: any, index: number) => (
                <PinterestSneakerCard
                  key={sneaker.id}
                  sneaker={{
                    id: sneaker.id,
                    name: sneaker.name,
                    brand: sneaker.brandName || 'Unknown Brand',
                    price: new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(sneaker.retailPrice),
                    imageUrl: sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
                    slug: sneaker.slug,
                    isNew: new Date(sneaker.releaseDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    brandName: sneaker.brandName,
                    retailPrice: sneaker.retailPrice,
                    colorway: sneaker.colorway
                  }}
                  aspectRatio={index % 3 === 0 ? 'portrait' : 'square'}
                  priority={index < 4}
                  onSave={(sneakerId) => {
                    // Handle save to collection functionality
                    console.log('Save sneaker:', sneakerId);
                  }}
                  isSaved={false}
                />
              ))}
            </MasonryGrid>
          )}

          <motion.div 
            className="text-center mt-8 sm:mt-12"
            variants={itemVariants}
          >
            <Link href="/live-market">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button size="lg" className="h-12 px-8 text-base" data-testid="button-view-all-sneakers">
                  View All Sneakers
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Mobile-First Feature Sections */}
      <motion.div variants={itemVariants}>
        <VisualSearchDemo />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CollectionsDemo />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ARDemo />
      </motion.div>

      {/* Pinterest-Style Blog Section */}
      <motion.section 
        className="py-16 sm:py-24 bg-muted/20"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Latest Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Discover sneaker culture and trends
            </p>
          </motion.div>

          {blogLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg aspect-[3/4] mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            Array.isArray(blogPosts) && blogPosts.length > 0 ? (
              <MasonryGrid
                columns={{ default: 2, sm: 3, md: 4, lg: 4 }}
                gap="1rem"
                className="max-w-6xl mx-auto"
              >
                {blogPosts.slice(0, 6).map((post: any, index: number) => (
                <PinterestBlogCard
                  key={post.id}
                  post={{
                    id: post.id,
                    title: post.title,
                    excerpt: post.excerpt || 'Discover the latest in sneaker culture and trends.',
                    slug: post.slug,
                    featuredImage: post.featuredImage || "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
                    author: post.author || 'SoleGrithm Team',
                    publishedAt: post.publishedAt || new Date().toISOString(),
                    readTime: post.readTime || Math.floor(Math.random() * 8) + 3,
                    category: post.category || 'Sneaker Culture'
                  }}
                  priority={index < 2}
                  onSave={(postId) => {
                    // Handle save to reading list functionality
                    console.log('Save post:', postId);
                  }}
                  isSaved={false}
                />
                ))}
              </MasonryGrid>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No stories available</p>
              </div>
            )
          )}

          <motion.div className="text-center mt-8 sm:mt-12" variants={itemVariants}>
            <Link href="/blog">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button variant="outline" size="lg" className="h-12 px-8" data-testid="button-view-all-stories">
                  View All Stories
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* AI-Powered Features Showcase */}
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Smart Discovery Tools
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Find your perfect sneakers with AI-powered technology
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
          >
            {/* Visual Search */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="p-6 sm:p-8 border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl flex items-center justify-center">
                    <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Visual Search</h3>
                    <p className="text-sm text-muted-foreground">AI Image Recognition</p>
                  </div>
                </div>
                <VisualSearchDemo />
                <Link href="/visual-search">
                  <Button variant="outline" className="w-full mt-4" data-testid="button-try-visual-search">
                    Try Visual Search
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Collections */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="p-6 sm:p-8 border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Smart Collections</h3>
                    <p className="text-sm text-muted-foreground">AI Curated Lists</p>
                  </div>
                </div>
                <CollectionsDemo />
                <Link href="/collections">
                  <Button variant="outline" className="w-full mt-4" data-testid="button-explore-collections">
                    Explore Collections
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* AR Try-On */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="p-6 sm:p-8 border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">AR Try-On</h3>
                    <p className="text-sm text-muted-foreground">Virtual Fitting</p>
                  </div>
                </div>
                <ARDemo />
                <Link href="/ar-try-on">
                  <Button variant="outline" className="w-full mt-4" data-testid="button-try-ar">
                    Try AR Experience
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Community & Social Section */}
      <motion.section 
        className="py-16 sm:py-24"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Join the Community
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with sneaker enthusiasts worldwide
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center"
            variants={containerVariants}
          >
            {/* Community Stats */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 sm:p-8 border-0 shadow-lg bg-gradient-to-br from-orange-500/5 to-red-500/5">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">50K+ Members</h3>
                      <p className="text-muted-foreground">Active collectors & enthusiasts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">100K+ Reviews</h3>
                      <p className="text-muted-foreground">Authentic community reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">$2M+ Traded</h3>
                      <p className="text-muted-foreground">Monthly marketplace volume</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Social Features */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold">Connect & Share</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Share Your Collection</h4>
                    <p className="text-sm text-muted-foreground">Showcase your sneaker collection to the community</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Rate & Review</h4>
                    <p className="text-sm text-muted-foreground">Help others with authentic sneaker reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Trend Alerts</h4>
                    <p className="text-sm text-muted-foreground">Get notified about price drops and new releases</p>
                  </div>
                </div>
              </div>
              <Link href="/auth">
                <Button size="lg" className="w-full" data-testid="button-join-community">
                  Join Community
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Women in Sneakers Section */}
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-background"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center"
            variants={containerVariants}
          >
            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    Women in Sneakers
                  </h2>
                  <p className="text-muted-foreground">Breaking barriers, setting trends</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Celebrating and elevating women in sneaker culture. Discover female-led brands, 
                exclusive collections, and stories of women breaking barriers in the sneaker industry.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-pink-500/10 text-pink-700 dark:text-pink-300">
                  Female Founders
                </Badge>
                <Badge variant="secondary" className="bg-purple-500/10 text-purple-700 dark:text-purple-300">
                  Exclusive Collections
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-700 dark:text-blue-300">
                  Inspiring Stories
                </Badge>
              </div>
              <Link href="/women-in-sneakers">
                <Button size="lg" className="mt-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600" data-testid="button-explore-women-sneakers">
                  Explore Women in Sneakers
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Visual */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 sm:p-8 border-0 shadow-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-32 bg-gradient-to-br from-pink-400/20 to-pink-600/20 rounded-lg flex items-center justify-center">
                      <Heart className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div className="h-20 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-20 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                      <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="h-32 bg-gradient-to-br from-indigo-400/20 to-indigo-600/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* SoleRadar Discovery Section */}
      <motion.section 
        className="py-16 sm:py-24"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                SoleRadar Discovery
              </h2>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Personalized sneaker discovery powered by AI and community insights
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full flex items-center justify-center mx-auto">
                    <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Trending Now</h3>
                  <p className="text-muted-foreground">Discover what's hot in the sneaker world with real-time trend analysis</p>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Style Quiz</h3>
                  <p className="text-muted-foreground">Take our AI-powered quiz to discover your perfect sneaker style</p>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-full flex items-center justify-center mx-auto">
                    <MessageSquare className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold">AI Reviews</h3>
                  <p className="text-muted-foreground">Get intelligent review summaries and insights from the community</p>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div className="text-center mt-8" variants={itemVariants}>
            <Link href="/discover">
              <Button size="lg" data-testid="button-start-discovery">
                Start Your Discovery
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Sole Map - Global Trends Section */}
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-background"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center"
            variants={containerVariants}
          >
            {/* Visual */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 sm:p-8 border-0 shadow-xl bg-gradient-to-br from-green-500/10 to-blue-500/10">
                <div className="relative h-64 sm:h-80">
                  {/* Mock map visualization */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-lg">
                    <div className="relative h-full flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-4 w-full h-full p-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} className="bg-white/10 rounded-lg flex items-center justify-center">
                            <div className={`w-2 h-2 rounded-full ${
                              i % 3 === 0 ? 'bg-red-400' : i % 2 === 0 ? 'bg-blue-400' : 'bg-green-400'
                            } animate-pulse`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">Live trend heatmap across major cities</p>
                </div>
              </Card>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    Sole Map
                  </h2>
                  <p className="text-muted-foreground">Global sneaker trends visualization</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Explore sneaker trends across the globe with our interactive heat map. 
                See what's trending in major cities, discover regional preferences, and 
                track the spread of sneaker culture worldwide.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                  <span className="text-sm">High-heat trends</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Emerging markets</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Stable demand</span>
                </div>
              </div>
              <Link href="/trend-map">
                <Button size="lg" className="mt-6" data-testid="button-explore-sole-map">
                  Explore Sole Map
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Live Market Section */}
      <motion.section 
        className="py-16 sm:py-24"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center"
            variants={containerVariants}
          >
            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                    Live Market
                  </h2>
                  <p className="text-muted-foreground">Real-time pricing and market data</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Track sneaker prices across all major platforms in real-time. Get alerts for 
                price drops, monitor market trends, and make informed decisions with our 
                comprehensive market analytics.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">Live Prices</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Real-time updates from StockX, GOAT, and more</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Price Alerts</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Get notified when prices drop</p>
                </div>
              </div>
              <Link href="/live-market">
                <Button size="lg" className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" data-testid="button-explore-live-market">
                  Explore Live Market
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Live Market Visual */}
            <motion.div variants={itemVariants}>
              <Card className="p-6 sm:p-8 border-0 shadow-xl bg-gradient-to-br from-orange-500/10 to-red-500/10">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-sm font-medium">Nike Air Jordan 1</span>
                    <span className="text-green-600 font-bold">$420</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-sm font-medium">Yeezy Boost 350</span>
                    <span className="text-red-600 font-bold">$280</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <span className="text-sm font-medium">Nike Dunk Low</span>
                    <span className="text-blue-600 font-bold">$150</span>
                  </div>
                  <div className="text-center pt-4">
                    <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Last updated: 2 minutes ago
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action - Get Started */}
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 via-orange-500/5 to-background"
        variants={itemVariants}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to Elevate Your Sneaker Game?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of sneaker enthusiasts discovering, collecting, and connecting 
              through the power of AI and community.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={containerVariants}
            >
              <Link href="/auth">
                <Button size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90" data-testid="button-get-started-main">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/discover">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg" data-testid="button-explore-features">
                  Explore Features
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Final Features Section */}
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-muted/20 to-background"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Why SoleGrithm?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              The most comprehensive platform for sneaker enthusiasts
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={containerVariants}
          >
            {[
              {
                icon: TrendingUp,
                title: "Real-Time Pricing",
                description: "Track market prices across all major platforms in real-time",
                delay: 0
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Connect with collectors and enthusiasts worldwide",
                delay: 0.1
              },
              {
                icon: MessageSquare,
                title: "AI Assistant",
                description: "Get personalized recommendations from our AI sneaker expert",
                delay: 0.2
              },
              {
                icon: Star,
                title: "Authentic Reviews",
                description: "Read verified reviews from real sneaker owners",
                delay: 0.3
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      delay: feature.delay,
                      ease: "easeOut"
                    }
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="p-4 sm:p-6 text-center border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow group">
                  <motion.div 
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-orange-500 transition-colors" />
                  </motion.div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm group-hover:text-foreground transition-colors">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
