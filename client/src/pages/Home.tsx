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
  Search,
  Compass,
  Camera
} from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import womenSneakersImage from "@assets/generated_images/Woman_in_stylish_sneakers_90ff70fb.png";
import arTryonImage from "@assets/generated_images/AR_sneaker_try-on_technology_732da862.png";

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

      {/* Nike-Style Split Hero Sections */}
      <motion.section 
        className="py-8 lg:py-12 bg-white dark:bg-background"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Women in Sneakers Hero */}
            <motion.div 
              className="relative h-[350px] sm:h-[400px] lg:h-[450px] overflow-hidden rounded-lg group cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${womenSneakersImage})`
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
                    Women in Sneakers
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base mb-4 sm:mb-6 max-w-md">
                    Celebrating the powerful influence of women in sneaker culture and style
                  </p>
                  <Link href="/women">
                    <Button 
                      size="sm"
                      className="bg-white text-black hover:bg-white/90 font-semibold"
                      data-testid="button-women-sneakers"
                    >
                      Explore Collection
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* AR Try-On Hero */}
            <motion.div 
              className="relative h-[350px] sm:h-[400px] lg:h-[450px] overflow-hidden rounded-lg group cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${arTryonImage})`
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
                    AR Try-On
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base mb-4 sm:mb-6 max-w-md">
                    Experience the future of sneaker shopping with augmented reality technology
                  </p>
                  <Link href="/ar-tryeon">
                    <Button 
                      size="sm"
                      className="bg-white text-black hover:bg-white/90 font-semibold"
                      data-testid="button-ar-tryeon"
                    >
                      Try It Now
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

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






      {/* Nike-Style Trending Sneakers Section */}
      <motion.section 
        className="py-16 sm:py-24 bg-white dark:bg-background"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Header - Previous Style */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Trending Now
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Discover what's hot in the sneaker community
            </p>
          </div>

          {/* Centered Filter Tabs - Previous Style */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-1 bg-background/50 backdrop-blur-sm border border-border/50 p-1 rounded-lg">
              <Button 
                variant={selectedBrand === 'All' ? 'secondary' : 'ghost'} 
                size="sm" 
                className={selectedBrand === 'All' ? 'bg-background shadow-sm' : ''}
                onClick={() => setSelectedBrand('All')}
                data-testid="filter-all"
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
                  data-testid={`filter-${brand.name.toLowerCase()}`}
                >
                  {brand.name}
                </Button>
              )) : null}
            </div>
          </div>

          {/* Nike-Style Minimal Grid */}
          {sneakersLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-muted rounded-lg mb-3" />
                  <div className="space-y-1">
                    <div className="h-3 bg-muted rounded w-16" />
                    <div className="h-4 bg-muted rounded w-20" />
                    <div className="h-4 bg-muted rounded w-12" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
              {Array.isArray(filteredSneakers) ? filteredSneakers.slice(0, 12).map((sneaker: any) => (
                <Link key={sneaker.id} href={`/sneaker/${sneaker.slug}`}>
                  <div className="group cursor-pointer">
                    {/* Clean product image */}
                    <div className="aspect-square mb-3 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                      <img
                        src={sneaker.images?.[0]?.replace('w=800&h=600', 'w=400&h=400&bg=ffffff') || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&bg=ffffff"}
                        alt={sneaker.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Minimal text below - Nike style */}
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                        {sneaker.brandName || 'Unknown Brand'}
                      </p>
                      <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
                        {sneaker.name}
                      </h3>
                      <p className="text-sm font-semibold text-foreground">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(sneaker.retailPrice)}
                      </p>
                    </div>
                  </div>
                </Link>
              )) : []}
            </div>
          )}

          {/* View All Button - Previous Style */}
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



      {/* SoleRadar Discovery Section - Using ARDemo styling */}
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-background"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Compass className="w-4 h-4" />
              SoleRadar Discovery
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Personalized Discovery Experience
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              AI-powered sneaker discovery tailored to your style, preferences, and community insights. 
              Find your next perfect pair with intelligent recommendations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Discovery Interface */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.div
                className="relative bg-gradient-to-br from-background to-muted/50 rounded-2xl p-8 sm:p-12 border overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="text-center space-y-6">
                  <motion.div
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2">Smart Recommendations</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6">
                      Get personalized sneaker suggestions based on your style and preferences
                    </p>
                    
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link href="/discover">
                        <Button 
                          size="lg" 
                          className="h-12 px-8 text-base bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                          data-testid="button-start-discovery"
                        >
                          <Compass className="w-5 h-5 mr-2" />
                          Start Discovery
                        </Button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Features */}
                  <motion.div 
                    className="grid grid-cols-2 gap-4 pt-4"
                    variants={containerVariants}
                  >
                    {[
                      { icon: TrendingUp, label: "Trending Now", color: "text-blue-500" },
                      { icon: Sparkles, label: "AI Powered", color: "text-cyan-500" }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.label}
                        className="text-center p-3 rounded-xl bg-card/50 backdrop-blur-sm border"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <feature.icon className={`w-5 h-5 ${feature.color} mx-auto mb-2`} />
                        <p className="text-xs font-medium">{feature.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Discovery Categories */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-xl sm:text-2xl font-semibold text-center">
                Discover By Category
              </h3>
              
              <motion.div className="space-y-4" variants={containerVariants}>
                {[
                  { category: "Trending Now", description: "What's hot in sneaker culture", icon: TrendingUp },
                  { category: "Your Style", description: "Matched to your preferences", icon: Heart },
                  { category: "New Releases", description: "Latest drops and releases", icon: Sparkles }
                ].map((item, index) => (
                  <motion.div
                    key={item.category}
                    className="p-4 rounded-xl border bg-card hover:border-primary/50 transition-all"
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    data-testid={`category-${item.category.toLowerCase().replace(' ', '-')}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-base">{item.category}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Style Quiz Section - Using ARDemo styling */}
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-background"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              Style Quiz
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Discover Your Style Experience
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Take our AI-powered style quiz to discover sneakers that perfectly match your personality, 
              lifestyle, and aesthetic preferences with personalized recommendations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Quiz Interface */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.div
                className="relative bg-gradient-to-br from-background to-muted/50 rounded-2xl p-8 sm:p-12 border overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="text-center space-y-6">
                  <motion.div
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl flex items-center justify-center mx-auto"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2">AI Style Assessment</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6">
                      Personalized recommendations based on your unique style profile
                    </p>
                    
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link href="/quiz">
                        <Button 
                          size="lg" 
                          className="h-12 px-8 text-base bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          data-testid="button-take-style-quiz"
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          Take Style Quiz
                        </Button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Features */}
                  <motion.div 
                    className="grid grid-cols-2 gap-4 pt-4"
                    variants={containerVariants}
                  >
                    {[
                      { icon: Sparkles, label: "AI-Powered", color: "text-purple-500" },
                      { icon: Heart, label: "Personalized", color: "text-pink-500" }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.label}
                        className="text-center p-3 rounded-xl bg-card/50 backdrop-blur-sm border"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <feature.icon className={`w-5 h-5 ${feature.color} mx-auto mb-2`} />
                        <p className="text-xs font-medium">{feature.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Quiz Preview */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-xl sm:text-2xl font-semibold text-center">
                Quick Style Questions
              </h3>
              
              <motion.div className="space-y-4" variants={containerVariants}>
                <motion.div
                  className="p-4 rounded-xl border bg-card hover:border-primary/50 transition-all"
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <p className="text-sm font-medium mb-3">What's your daily style?</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs bg-purple-500/10 text-purple-700">Casual</Badge>
                    <Badge variant="outline" className="text-xs">Athletic</Badge>
                    <Badge variant="outline" className="text-xs">Streetwear</Badge>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 rounded-xl border bg-card hover:border-primary/50 transition-all"
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <p className="text-sm font-medium mb-3">Preferred colors?</p>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-black rounded-full border-2 border-white shadow-md" />
                    <div className="w-6 h-6 bg-white rounded-full border-2 border-gray-300 shadow-md" />
                    <div className="w-6 h-6 bg-red-500 rounded-full shadow-md" />
                    <div className="w-6 h-6 bg-blue-500 rounded-full shadow-md" />
                  </div>
                </motion.div>

                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground">2 minutes • 8 questions</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* AI Reviews Section - Using ARDemo styling */}
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-green-500/5 via-teal-500/5 to-background"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="w-4 h-4" />
              AI Reviews
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Intelligent Review Experience
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Get comprehensive AI-powered analysis of thousands of sneaker reviews. Our intelligent system 
              analyzes community feedback to provide key insights about comfort, quality, sizing, and style.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* AI Review Interface */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.div
                className="relative bg-gradient-to-br from-background to-muted/50 rounded-2xl p-8 sm:p-12 border overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="text-center space-y-6">
                  <motion.div
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-2xl flex items-center justify-center mx-auto"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2">Smart Review Analysis</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6">
                      AI-powered insights from thousands of community reviews and expert opinions
                    </p>
                    
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link href="/review-summary">
                        <Button 
                          size="lg" 
                          className="h-12 px-8 text-base bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                          data-testid="button-explore-ai-reviews"
                        >
                          <MessageSquare className="w-5 h-5 mr-2" />
                          Explore AI Reviews
                        </Button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Key Features */}
                  <motion.div 
                    className="grid grid-cols-2 gap-4 pt-4"
                    variants={containerVariants}
                  >
                    {[
                      { icon: MessageSquare, label: "Smart Summaries", color: "text-green-500" },
                      { icon: Star, label: "Key Insights", color: "text-teal-500" }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.label}
                        className="text-center p-3 rounded-xl bg-card/50 backdrop-blur-sm border"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <feature.icon className={`w-5 h-5 ${feature.color} mx-auto mb-2`} />
                        <p className="text-xs font-medium">{feature.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Review Examples */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-xl sm:text-2xl font-semibold text-center">
                Sample AI Reviews
              </h3>
              
              <motion.div className="space-y-4" variants={containerVariants}>
                {[
                  { 
                    name: "Nike Air Jordan 1", 
                    rating: 5, 
                    insight: "Great build quality, comfortable fit, iconic design",
                    color: "from-green-500/10 to-teal-500/10"
                  },
                  { 
                    name: "Yeezy Boost 350", 
                    rating: 4, 
                    insight: "Very comfortable, unique style, runs small",
                    color: "from-teal-500/10 to-green-500/10"
                  }
                ].map((review, index) => (
                  <motion.div
                    key={review.name}
                    className={`p-4 rounded-xl border bg-gradient-to-br ${review.color} hover:border-primary/50 transition-all`}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{review.name}</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(star => (
                          <Star 
                            key={star} 
                            className={`w-3 h-3 ${
                              star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">"{review.insight}"</p>
                  </motion.div>
                ))}

                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground">Based on 1,250+ community reviews</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
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



      {/* Sole Search - Visual Search Section */}
      <VisualSearchDemo />

      {/* AR Try-On Section */}
      <ARDemo />

      {/* Sole Map - Global Trends Section - Using ARDemo styling */}
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-green-500/5 to-blue-500/5"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="w-4 h-4" />
              Sole Map
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Global Trends Experience
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore real-time sneaker trends across the globe with interactive visualization. 
              Discover regional preferences and track sneaker culture worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Interactive Map Visualization */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.div
                className="relative bg-gradient-to-br from-background to-muted/50 rounded-2xl p-8 sm:p-12 border overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="text-center space-y-6">
                  <motion.div
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl flex items-center justify-center mx-auto"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2">Interactive Heat Map</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6">
                      Live visualization of sneaker trends across major cities worldwide
                    </p>
                    
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Link href="/trend-map">
                        <Button 
                          size="lg" 
                          className="h-12 px-8 text-base bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                          data-testid="button-explore-sole-map"
                        >
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Explore Sole Map
                        </Button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Features */}
                  <motion.div 
                    className="grid grid-cols-3 gap-4 pt-4"
                    variants={containerVariants}
                  >
                    {[
                      { label: "High-heat", color: "bg-red-400" },
                      { label: "Emerging", color: "bg-blue-400" },
                      { label: "Stable", color: "bg-green-400" }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.label}
                        className="text-center p-3 rounded-xl bg-card/50 backdrop-blur-sm border"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <div className={`w-4 h-4 ${feature.color} rounded-full mx-auto mb-2`} />
                        <p className="text-xs font-medium">{feature.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Trending Cities */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-xl sm:text-2xl font-semibold text-center">
                Trending Cities
              </h3>
              
              <motion.div className="space-y-4" variants={containerVariants}>
                {[
                  { city: "New York", trend: "Nike Dunk Low", activity: 95 },
                  { city: "Los Angeles", trend: "Jordan 1 High", activity: 87 },
                  { city: "Atlanta", trend: "Yeezy 350", activity: 76 }
                ].map((location, index) => (
                  <motion.div
                    key={location.city}
                    className="p-4 rounded-xl border bg-card hover:border-primary/50 transition-all"
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    data-testid={`city-${location.city.toLowerCase()}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-base">{location.city}</h4>
                        <p className="text-sm text-muted-foreground">{location.trend}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{location.activity}%</div>
                        <div className={`w-16 h-2 rounded-full ${
                          location.activity > 90 ? 'bg-red-400' : 
                          location.activity > 80 ? 'bg-blue-400' : 'bg-green-400'
                        }`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
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
