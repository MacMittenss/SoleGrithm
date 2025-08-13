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
      {/* Hero Section - Static Fixed Position */}
      <div className="relative">
        <Hero />
      </div>

      {/* Nike-Style Split Hero Sections - Full Width Connected */}
      <section className="bg-white dark:bg-background">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Women in Sneakers Hero - Full Width Left */}
            <div 
              className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden group cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${womenSneakersImage})`
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
                <div className="max-w-lg">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                    Women in Sneakers
                  </h3>
                  <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8">
                    Celebrating the powerful influence of women in sneaker culture and style
                  </p>
                  <Link href="/women">
                    <Button 
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 font-semibold"
                      data-testid="button-women-sneakers"
                    >
                      Explore Collection
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* AR Try-On Hero - Full Width Right */}
            <div 
              className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden group cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${arTryonImage})`
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
                <div className="max-w-lg">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                    AR Try-On
                  </h3>
                  <p className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8">
                    Experience the future of sneaker shopping with augmented reality technology
                  </p>
                  <Link href="/ar-tryeon">
                    <Button 
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 font-semibold"
                      data-testid="button-ar-tryeon"
                    >
                      Try It Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What's Hot Right Now Slider */}
      <motion.div variants={itemVariants}>
        <HotRightNowSlider />
      </motion.div>





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






      {/* Minimalist Trending Sneakers Section */}
      <motion.section 
        className="py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-900"
        variants={itemVariants}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Minimalist Header */}
          <div className="mb-10 text-center">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Trending Now
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light">
              Discover what's hot in the sneaker community
            </p>
          </div>

          {/* Clean Filter Tabs */}
          <div className="mb-10">
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2 justify-center">
              <button
                className={`text-sm font-light whitespace-nowrap transition-colors pb-2 border-b-2 ${
                  selectedBrand === 'All'
                    ? 'text-neutral-900 dark:text-neutral-100 border-neutral-900 dark:border-neutral-100'
                    : 'text-neutral-500 dark:text-neutral-500 border-transparent hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
                onClick={() => setSelectedBrand('All')}
                data-testid="filter-all"
              >
                All
              </button>
              {Array.isArray(brands) ? brands.map((brand: any) => (
                <button
                  key={brand.id}
                  className={`text-sm font-light whitespace-nowrap transition-colors pb-2 border-b-2 ${
                    selectedBrand === brand.name
                      ? 'text-neutral-900 dark:text-neutral-100 border-neutral-900 dark:border-neutral-100'
                      : 'text-neutral-500 dark:text-neutral-500 border-transparent hover:text-neutral-700 dark:hover:text-neutral-300'
                  }`}
                  onClick={() => setSelectedBrand(brand.name)}
                  data-testid={`filter-${brand.name.toLowerCase()}`}
                >
                  {brand.name}
                </button>
              )) : null}
            </div>
          </div>

          {/* Clean Grid Layout */}
          {sneakersLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-neutral-200 dark:bg-neutral-700 mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 w-full" />
                    <div className="flex justify-between">
                      <div className="h-3 bg-neutral-200 dark:bg-neutral-700 w-16" />
                      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
              {Array.isArray(filteredSneakers) ? filteredSneakers.slice(0, 10).map((sneaker: any) => (
                <Link key={sneaker.id} href={`/sneaker/${sneaker.slug}`}>
                  <div className="group cursor-pointer">
                    {/* Ultra Clean Product Image */}
                    <div className="aspect-square mb-4 bg-white dark:bg-neutral-800 overflow-hidden">
                      <img
                        src={sneaker.images?.[0]?.replace('w=800&h=600', 'w=400&h=400&bg=ffffff') || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&bg=ffffff"}
                        alt={sneaker.name}
                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-200"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Minimal Product Info */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-normal text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-5">
                        {sneaker.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-neutral-500 dark:text-neutral-500 uppercase tracking-wider font-light">
                          {sneaker.brandName || 'Unknown'}
                        </p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                          ${sneaker.retailPrice || '0'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              )) : []}
            </div>
          )}

          {/* Subtle View All Link */}
          <div className="flex justify-center">
            <Link href="/live-market">
              <span className="text-sm font-light text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors border-b border-neutral-300 dark:border-neutral-600 hover:border-neutral-900 dark:hover:border-neutral-100 pb-1" data-testid="button-view-all-sneakers">
                View All Sneakers
              </span>
            </Link>
          </div>
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



      {/* Discovery • Community Section - Figma Template Style */}
      <motion.section 
        className="py-24 sm:py-32 bg-neutral-50 dark:bg-neutral-900"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-4 h-4" />
              Discovery • Community
            </motion.div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-thin tracking-tight text-neutral-900 dark:text-white mb-8">
              Find Your
              <span className="block font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Perfect Match
              </span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Connect with a community of sneaker enthusiasts and discover your next favorite pair through personalized AI recommendations
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Side - Community Feed */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">
                  Community Discoveries
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                  See what fellow sneakerheads are discovering and sharing
                </p>
              </div>

              {/* Community Cards */}
              <motion.div className="space-y-6" variants={containerVariants}>
                {[
                  {
                    user: "Alex Chen",
                    avatar: "AC",
                    discovery: "Just found the perfect Jordan 1 Retro High for my collection!",
                    sneaker: "Air Jordan 1 Retro High",
                    time: "2 hours ago",
                    likes: 24,
                    color: "from-red-500 to-orange-500"
                  },
                  {
                    user: "Sarah Kim",
                    avatar: "SK", 
                    discovery: "AI recommended these Yeezys and they're exactly my style ✨",
                    sneaker: "Yeezy Boost 350 V2",
                    time: "5 hours ago",
                    likes: 18,
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    user: "Mike Torres",
                    avatar: "MT",
                    discovery: "Finally found my grail through the community marketplace!",
                    sneaker: "Travis Scott x Nike",
                    time: "1 day ago",
                    likes: 42,
                    color: "from-green-500 to-blue-500"
                  }
                ].map((post, index) => (
                  <motion.div
                    key={post.user}
                    className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all group cursor-pointer"
                    variants={cardVariants}
                    whileHover="hover"
                    data-testid={`community-post-${index}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${post.color} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-neutral-900 dark:text-white">{post.user}</span>
                          <span className="text-neutral-500 text-sm">•</span>
                          <span className="text-neutral-500 text-sm">{post.time}</span>
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300 mb-3">{post.discovery}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{post.sneaker}</span>
                          <div className="flex items-center gap-1 text-neutral-500">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{post.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="text-center" variants={itemVariants}>
                <Link href="/community">
                  <Button variant="outline" className="h-12 px-8 rounded-full border-2" data-testid="button-view-community">
                    Join the Community
                    <Users className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Discovery Engine */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <motion.div
                className="relative bg-gradient-to-br from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl p-8 lg:p-12 border border-neutral-200 dark:border-neutral-700 overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
              >
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
                
                <div className="relative z-10 text-center">
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.6 }}
                  >
                    <Compass className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                    AI Discovery Engine
                  </h3>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                    Our advanced AI analyzes your style preferences, browsing history, and community trends to recommend sneakers you'll love
                  </p>
                  
                  <Link href="/discover">
                    <motion.div
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button 
                        size="lg" 
                        className="h-14 px-10 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full shadow-lg"
                        data-testid="button-start-ai-discovery"
                      >
                        Start Discovery
                        <Sparkles className="w-5 h-5 ml-2" />
                      </Button>
                    </motion.div>
                  </Link>

                  {/* Feature Pills */}
                  <motion.div 
                    className="flex flex-wrap justify-center gap-3 mt-8"
                    variants={containerVariants}
                  >
                    {[
                      { label: "Style Analysis", icon: Eye },
                      { label: "Trend Tracking", icon: TrendingUp },
                      { label: "Community Input", icon: Users }
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.label}
                        className="flex items-center gap-2 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-neutral-200/50 dark:border-neutral-700/50"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                      >
                        <feature.icon className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{feature.label}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-4"
                variants={containerVariants}
              >
                {[
                  { value: "10K+", label: "Discoveries", color: "from-blue-500 to-cyan-500" },
                  { value: "95%", label: "Match Rate", color: "from-purple-500 to-pink-500" },
                  { value: "5K+", label: "Community", color: "from-green-500 to-teal-500" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                      {stat.label}
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
            {/* DaisyUI iPhone Mockup */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <motion.div 
                className="mockup-phone scale-75 sm:scale-90"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.2)",
                    "0 0 30px rgba(147, 51, 234, 0.2)",
                    "0 0 20px rgba(59, 130, 246, 0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="mockup-phone-camera"></div> 
                <div className="mockup-phone-display bg-gradient-to-b from-blue-500/10 to-purple-500/10 relative overflow-hidden">
                  {/* Phone Interface */}
                  <div className="absolute inset-0 p-4">
                    {/* Status Bar */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white text-xs">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 border border-white rounded-sm">
                          <div className="w-full h-full bg-white rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white text-base">Join the Algorithm</p>
                    </div>
                  </div>
                </div>
              </motion.div>
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
