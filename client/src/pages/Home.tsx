import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

// Advanced components with VITURE-style animations
import AdvancedHero from "@/components/advanced/AdvancedHero";
import AdvancedLiveMarket from "@/components/advanced/AdvancedLiveMarket";
import AdvancedSoleMap from "@/components/advanced/AdvancedSoleMap";
import AdvancedVisualSearch from "@/components/advanced/AdvancedVisualSearch";
import AdvancedCollections from "@/components/advanced/AdvancedCollections";
import AdvancedPreloader from "@/components/advanced/AdvancedPreloader";
import Minimap from "@/components/advanced/Minimap";
import SplitText from "@/components/advanced/SplitText";
import GradientText from "@/components/advanced/GradientText";
import SectionWrapper from "@/components/SectionWrapper";
import ScrollPinnedSection from "@/components/advanced/ScrollPinnedSection";

// Legacy components (will be gradually replaced)
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
  Camera,
  Target
} from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import womenSneakersImage from "@assets/generated_images/Woman_in_stylish_sneakers_90ff70fb.png";
import arTryonImage from "@assets/generated_images/AR_sneaker_try-on_technology_732da862.png";

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const containerRef = useRef(null);
  
  // Initialize smooth scrolling
  useSmoothScroll();
  
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



  // Minimap sections configuration
  const minimapSections = [
    { id: 'hero', title: 'Hero', progress: 0 },
    { id: 'trending', title: 'Trending', progress: 0 },
    { id: 'blog', title: 'Stories', progress: 0 },
    { id: 'visual-search', title: 'Visual Search', progress: 0 },
    { id: 'collections', title: 'Collections', progress: 0 },
    { id: 'live-market', title: 'Live Market', progress: 0 },
    { id: 'discover', title: 'Discover', progress: 0 }
  ];

  return (
    <>
      {/* Advanced Preloader */}
      <AdvancedPreloader
        onComplete={() => setIsLoading(false)}
        duration={2800}
        brandText="SoleGrithm"
      />

      {/* Minimap Navigation */}
      {!isLoading && (
        <Minimap
          sections={minimapSections}
          className="hidden lg:block"
        />
      )}

      <motion.div 
        ref={containerRef}
        className="min-h-screen bg-black overflow-x-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
          minHeight: '100vh',
        }}
      >
      {/* Hero Section - Advanced VITURE-style */}
      <SectionWrapper
        id="hero"
        sticky={true}
        maskTransition={true}
        className="relative"
        height="100vh"
      >
        <AdvancedHero />
      </SectionWrapper>

      {/* Scroll Pinned Sub Hero Sections */}
      <ScrollPinnedSection
        id="sub-heroes"
        height="100vh"
        className="bg-white dark:bg-background"
        staggerDelay={0.3}
        onAnimationComplete={() => console.log('Sub heroes animation complete')}
      >
        <div className="w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
            
            {/* Women in Sneakers Hero - Full Width Left */}
            <div 
              className="relative h-full overflow-hidden group cursor-pointer"
              data-scroll-animate
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${womenSneakersImage})`
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
                <div className="max-w-lg" data-scroll-animate>
                  <h3 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4"
                    data-scroll-animate
                  >
                    Women in Sneakers
                  </h3>
                  <p 
                    className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8"
                    data-scroll-animate
                  >
                    Celebrating the powerful influence of women in sneaker culture and style
                  </p>
                  <div data-scroll-animate>
                    <Link href="/women">
                      <Button 
                        size="lg"
                        className="bg-white text-black hover:bg-white/90 font-semibold transform hover:scale-105 transition-all duration-200"
                        data-testid="button-women-sneakers"
                      >
                        Explore Collection
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* AR Try-On Hero - Full Width Right */}
            <div 
              className="relative h-full overflow-hidden group cursor-pointer"
              data-scroll-animate
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${arTryonImage})`
                }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
                <div className="max-w-lg" data-scroll-animate>
                  <h3 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4"
                    data-scroll-animate
                  >
                    AR Try-On
                  </h3>
                  <p 
                    className="text-white/90 text-base sm:text-lg mb-6 sm:mb-8"
                    data-scroll-animate
                  >
                    Experience the future of sneaker shopping with augmented reality technology
                  </p>
                  <div data-scroll-animate>
                    <Link href="/ar-tryeon">
                      <Button 
                        size="lg"
                        className="bg-white text-black hover:bg-white/90 font-semibold transform hover:scale-105 transition-all duration-200"
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
        </div>
      </ScrollPinnedSection>

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






      {/* Trending Now Section - Live Market Style */}
      <SectionWrapper
        id="trending-now" 
        sticky={true}
        maskTransition={true}
        className="relative"
        height="100vh"
      >
        <motion.section
          className="relative py-32 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(30, 30, 30, 0.95))',
          }}
          data-testid="section-trending-now"
        >
          {/* Background gradient effects */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 30% 70%, rgba(255, 41, 0, 0.08) 0%, rgba(254, 122, 96, 0.04) 35%, rgba(88, 29, 255, 0.08) 100%)',
            }}
          />

          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 rounded-full border border-orange-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-24 h-24 rotate-45 border border-purple-500/20"
            animate={{ rotate: [45, 135, 45] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content Column */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {/* Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: 'rgba(255, 41, 0, 0.1)',
                    border: '1px solid rgba(255, 41, 0, 0.2)',
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium">TRENDING NOW</span>
                </motion.div>

                {/* Main Title */}
                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    <SplitText type="words" delay={0.3} staggerDelay={0.08}>
                      What's Hot in
                    </SplitText>
                    <br />
                    <GradientText className="block">
                      Sneaker Culture
                    </GradientText>
                  </h2>
                  
                  <motion.p
                    className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    Discover the most sought-after sneakers trending across our community. 
                    Real-time insights from sneakerheads worldwide.
                  </motion.p>
                </div>

                {/* Stats Grid */}
                <motion.div
                  className="grid grid-cols-3 gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {[
                    { number: filteredSneakers?.length || 25, label: 'Trending Items', suffix: '+' },
                    { number: Array.isArray(brands) ? brands.length : 8, label: 'Top Brands', suffix: '+' },
                    { number: 98, label: 'Community Score', suffix: '%' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-2xl sm:text-3xl font-bold mb-2">
                        <span
                          style={{
                            background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                          }}
                        >
                          {stat.number}
                        </span>
                        <span
                          style={{
                            background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                          }}
                        >
                          {stat.suffix}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <Link href="/trending">
                    <motion.button
                      className="group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden"
                      style={{
                        background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-testid="button-explore-trending"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Explore Trending
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Interactive Dashboard Column */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {/* Glassmorphism container */}
                <div
                  className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-orange-500" />
                      <h3 className="text-xl font-semibold">Trending Dashboard</h3>
                    </div>
                    <motion.div
                      className="w-3 h-3 rounded-full bg-green-500"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex gap-2 mb-6 overflow-x-auto">
                    <button
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedBrand === 'All'
                          ? 'bg-white/20 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                      onClick={() => setSelectedBrand('All')}
                      data-testid="filter-all"
                    >
                      All
                    </button>
                    {Array.isArray(brands) ? brands.slice(0, 4).map((brand: any) => (
                      <button
                        key={brand.id}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                          selectedBrand === brand.name
                            ? 'bg-white/20 text-white'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                        onClick={() => setSelectedBrand(brand.name)}
                        data-testid={`filter-${brand.name.toLowerCase()}`}
                      >
                        {brand.name}
                      </button>
                    )) : null}
                  </div>

                  {/* Trending sneakers list */}
                  <div className="space-y-4 mb-6">
                    {Array.isArray(filteredSneakers) ? filteredSneakers.slice(0, 4).map((sneaker: any, index: number) => (
                      <motion.div
                        key={sneaker.id}
                        className="p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/10 rounded-lg overflow-hidden">
                            <img
                              src={sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"}
                              alt={sneaker.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm truncate">{sneaker.name}</span>
                              <motion.span
                                className="text-lg font-bold"
                                style={{
                                  background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                                  WebkitBackgroundClip: 'text',
                                  backgroundClip: 'text',
                                  color: 'transparent',
                                }}
                              >
                                ${sneaker.retailPrice || '0'}
                              </motion.span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-400">{sneaker.brandName}</span>
                              <span className="text-green-500 font-medium">
                                #{index + 1} Trending
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )) : null}
                  </div>

                  {/* Live status */}
                  <div className="text-center pt-4 border-t border-white/10">
                    <div className="inline-flex items-center gap-2 text-xs text-gray-400">
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Live trending data • Updated 2m ago
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </SectionWrapper>

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
                <motion.div
                  key={post.id}
                  initial={{ 
                    opacity: 0, 
                    x: index % 2 === 0 ? -100 : 100,
                    scale: 0.9 
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1 
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    ease: "easeOut"
                  }}
                >
                  <PinterestBlogCard
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
                </motion.div>
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



      {/* Personalized Discovery Section - Clean Grid Design */}
      <motion.section 
        className="py-20 bg-muted/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-16" 
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold lg:text-5xl pb-8">
              Sole Radar
            </h2>
            <p className="mb-16 text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover sneakers tailored to your unique style through AI-powered recommendations and personalized discovery features.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-16 lg:gap-x-24 gap-y-20"
            variants={containerVariants}
          >
            {[
              {
                icon: Compass,
                title: "AI Style Matching",
                description: "Our AI analyzes your preferences and suggests sneakers that match your unique style perfectly."
              },
              {
                icon: Target,
                title: "Smart Recommendations",
                description: "Get personalized sneaker suggestions based on your browsing history and style preferences."
              },
              {
                icon: Zap,
                title: "Instant Discovery",
                description: "Find your perfect sneakers in seconds with our lightning-fast AI algorithm and search."
              },
              {
                icon: Heart,
                title: "Style Evolution",
                description: "Track your style journey and discover new trends that align with your evolving taste."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ 
                  opacity: 0, 
                  y: 50,
                  scale: 0.9 
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1 
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
                data-testid={`feature-${feature.title.toLowerCase().replace(' ', '-')}`}
              >
                <motion.div 
                  className="flex items-center justify-center w-8 h-8 mb-4 text-white bg-foreground rounded-full"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: [0, -5, 5, 0] 
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-5 h-5" />
                </motion.div>
                <h3 className="mb-2 text-base font-semibold leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div 
            className="text-center mt-16" 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/discover">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg font-medium rounded-xl"
                data-testid="button-start-discovery"
              >
                Start Your Discovery Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Style Quiz Section - Minimalistic Design */}
      <motion.section 
        className="py-24 md:py-36"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center px-6">
          {/* Left Col - Content */}
          <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <motion.h1 
              className="my-4 text-3xl md:text-5xl font-bold leading-tight text-center md:text-left"
              variants={itemVariants}
            >
              Discover Your
              <span className="text-primary block">
                Perfect Style
              </span>
              with AI!
            </motion.h1>
            <motion.p 
              className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left text-muted-foreground"
              variants={itemVariants}
            >
              Take our quick style quiz and get personalized sneaker recommendations tailored just for you.
            </motion.p>

            <motion.form 
              className="bg-card shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full"
              variants={itemVariants}
            >
              <div className="mb-4">
                <label className="block text-foreground py-2 font-bold mb-2" htmlFor="stylequiz">
                  Ready to find your style?
                </label>
                <input
                  className="shadow appearance-none border rounded w-full p-3 text-foreground leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out bg-background"
                  id="stylequiz"
                  type="text"
                  placeholder="Enter your name to get started..."
                  data-testid="input-style-quiz-name"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <Link href="/quiz">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    type="button"
                    data-testid="button-start-style-quiz"
                  >
                    Start Style Quiz
                  </Button>
                </Link>
              </div>
            </motion.form>
          </div>

          {/* Right Col - Interactive Sneaker */}
          <motion.div 
            className="w-full xl:w-3/5 p-12 overflow-hidden"
            variants={itemVariants}
          >
            <motion.div
              className="mx-auto w-full md:w-4/5 cursor-pointer"
              initial={{ rotate: -6 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 6,
                transition: { duration: 0 }
              }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: -6 }}
              transition={{ duration: 0 }}
              data-testid="interactive-sneaker-image"
            >
              {/* Sneaker SVG - Interactive Design */}
              <div className="relative bg-card rounded-2xl p-8 shadow-xl border">
                <div className="text-center space-y-6">
                  {/* Sneaker Icon Placeholder */}
                  <motion.div
                    className="w-32 h-32 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -5, 5, 0] 
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <ShoppingBag className="w-16 h-16 text-primary" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI Style Matching</h3>
                    <p className="text-muted-foreground mb-4">
                      Click to explore interactive style preferences
                    </p>
                    
                    {/* Interactive Elements */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        className="p-3 rounded-lg bg-background border cursor-pointer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        data-testid="style-option-casual"
                      >
                        <Heart className="w-5 h-5 text-primary mx-auto mb-1" />
                        <p className="text-xs font-medium">Casual</p>
                      </motion.div>
                      
                      <motion.div
                        className="p-3 rounded-lg bg-background border cursor-pointer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        data-testid="style-option-athletic"
                      >
                        <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
                        <p className="text-xs font-medium">Athletic</p>
                      </motion.div>
                      
                      <motion.div
                        className="p-3 rounded-lg bg-background border cursor-pointer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        data-testid="style-option-streetwear"
                      >
                        <Star className="w-5 h-5 text-primary mx-auto mb-1" />
                        <p className="text-xs font-medium">Street</p>
                      </motion.div>
                      
                      <motion.div
                        className="p-3 rounded-lg bg-background border cursor-pointer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        data-testid="style-option-formal"
                      >
                        <Sparkles className="w-5 h-5 text-primary mx-auto mb-1" />
                        <p className="text-xs font-medium">Formal</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div 
            className="mx-auto md:pt-16 text-center"
            variants={itemVariants}
          >
            <p className="text-muted-foreground font-bold pb-8 lg:pb-6">
              Get personalized recommendations:
            </p>
            <div className="flex w-full justify-center md:justify-start pb-24 lg:pb-0 gap-4">
              <motion.div
                className="text-center transform hover:scale-125 duration-300 ease-in-out cursor-pointer"
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.95 }}
                data-testid="feature-ai-matching"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium">AI Matching</p>
              </motion.div>
              
              <motion.div
                className="text-center transform hover:scale-125 duration-300 ease-in-out cursor-pointer"
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.95 }}
                data-testid="feature-quick-results"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium">Quick Results</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* AI Reviews Section - Minimalistic Design */}
      <motion.section 
        className="py-24 md:py-36 bg-muted/30"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center px-6">
          {/* Left Col - Interactive Review Dashboard */}
          <motion.div 
            className="w-full xl:w-3/5 p-12 overflow-hidden"
            variants={itemVariants}
          >
            <motion.div
              className="mx-auto w-full md:w-4/5 cursor-pointer"
              initial={{ rotate: 3 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: -3,
                transition: { duration: 0 }
              }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: 3 }}
              transition={{ duration: 0 }}
              data-testid="interactive-review-dashboard"
            >
              {/* Review Dashboard - Interactive Design */}
              <div className="relative bg-card rounded-2xl p-8 shadow-xl border">
                <div className="space-y-6">
                  {/* Dashboard Header */}
                  <div className="text-center">
                    <motion.div
                      className="w-24 h-24 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: [0, -5, 5, 0] 
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <MessageSquare className="w-12 h-12 text-primary" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">AI Review Analysis</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Real-time insights from community feedback
                    </p>
                  </div>
                  
                  {/* Interactive Review Cards */}
                  <div className="space-y-3">
                    {[
                      { 
                        sneaker: "Air Jordan 1 Retro", 
                        score: 92, 
                        highlight: "Exceptional comfort & style",
                        reviews: 1847
                      },
                      { 
                        sneaker: "Nike Dunk Low", 
                        score: 89, 
                        highlight: "Great for everyday wear",
                        reviews: 2341
                      },
                      { 
                        sneaker: "Yeezy Boost 350", 
                        score: 85, 
                        highlight: "Unique design, runs small",
                        reviews: 1205
                      }
                    ].map((review, index) => (
                      <motion.div
                        key={review.sneaker}
                        className="flex items-center justify-between p-4 rounded-lg bg-background border cursor-pointer"
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        data-testid={`review-card-${index}`}
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">{review.sneaker}</p>
                          <p className="text-xs text-muted-foreground">"{review.highlight}"</p>
                          <p className="text-xs text-muted-foreground mt-1">{review.reviews.toLocaleString()} reviews</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{review.score}</div>
                          <div className="text-xs text-muted-foreground">AI Score</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Interactive Features */}
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    <motion.div
                      className="text-center p-3 rounded-lg bg-background border cursor-pointer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      data-testid="feature-sentiment"
                    >
                      <Heart className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs font-medium">Sentiment</p>
                    </motion.div>
                    
                    <motion.div
                      className="text-center p-3 rounded-lg bg-background border cursor-pointer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      data-testid="feature-insights"
                    >
                      <Eye className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs font-medium">Insights</p>
                    </motion.div>
                    
                    <motion.div
                      className="text-center p-3 rounded-lg bg-background border cursor-pointer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      data-testid="feature-trends"
                    >
                      <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs font-medium">Trends</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Col - Content */}
          <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <motion.h1 
              className="my-4 text-3xl md:text-5xl font-bold leading-tight text-center md:text-left"
              variants={itemVariants}
            >
              Smart Review
              <span className="text-primary block">
                Analysis
              </span>
              by AI!
            </motion.h1>
            <motion.p 
              className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left text-muted-foreground"
              variants={itemVariants}
            >
              Get instant insights from thousands of sneaker reviews analyzed by our AI system.
            </motion.p>

            <motion.form 
              className="bg-card shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full"
              variants={itemVariants}
            >
              <div className="mb-4">
                <label className="block text-foreground py-2 font-bold mb-2" htmlFor="reviewsearch">
                  Search for sneaker reviews
                </label>
                <input
                  className="shadow appearance-none border rounded w-full p-3 text-foreground leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out bg-background"
                  id="reviewsearch"
                  type="text"
                  placeholder="Enter sneaker name or brand..."
                  data-testid="input-review-search"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <Link href="/review-summary">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    type="button"
                    data-testid="button-explore-ai-reviews"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Explore AI Reviews
                  </Button>
                </Link>
              </div>
            </motion.form>
          </div>

          {/* Bottom Features */}
          <motion.div 
            className="mx-auto md:pt-16 text-center w-full"
            variants={itemVariants}
          >
            <p className="text-muted-foreground font-bold pb-8 lg:pb-6">
              Powered by advanced AI analysis:
            </p>
            <div className="flex w-full justify-center gap-6">
              <motion.div
                className="text-center transform hover:scale-125 duration-300 ease-in-out cursor-pointer"
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.95 }}
                data-testid="feature-sentiment-analysis"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium">Sentiment Analysis</p>
              </motion.div>
              
              <motion.div
                className="text-center transform hover:scale-125 duration-300 ease-in-out cursor-pointer"
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.95 }}
                data-testid="feature-key-insights"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium">Key Insights</p>
              </motion.div>

              <motion.div
                className="text-center transform hover:scale-125 duration-300 ease-in-out cursor-pointer"
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.95 }}
                data-testid="feature-trend-analysis"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-medium">Trend Analysis</p>
              </motion.div>
            </div>
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
                  <div className="absolute inset-0 p-3">
                    {/* Status Bar */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-white text-xs">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 border border-white rounded-sm">
                          <div className="w-full h-full bg-white rounded-sm"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* App Header */}
                    <div className="absolute top-8 left-3 right-3">
                      <h3 className="text-white text-sm font-semibold text-center mb-3">Community</h3>
                    </div>
                    
                    {/* Image Gallery - Centered with spacing */}
                    <div className="absolute top-16 left-6 right-6 bottom-8 flex items-center justify-center">
                      <div className="w-full h-full max-h-56">
                        <div className="grid grid-cols-3 gap-1 h-full">
                          <div className="grid gap-1">
                            <motion.img 
                              className="w-full h-full object-cover rounded-sm" 
                              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" 
                              alt="Community post"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.6, delay: 0.1 }}
                            />
                            <motion.img 
                              className="w-full h-full object-cover rounded-sm" 
                              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" 
                              alt="Community post"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                            />
                          </div>
                          <div className="grid gap-1">
                            <motion.img 
                              className="w-full h-full object-cover rounded-sm" 
                              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" 
                              alt="Community post"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.6, delay: 0.3 }}
                            />
                            <motion.img 
                              className="w-full h-full object-cover rounded-sm" 
                              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" 
                              alt="Community post"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.6, delay: 0.4 }}
                            />
                            <motion.img 
                              className="w-full h-full object-cover rounded-sm" 
                              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" 
                              alt="Community post"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.6, delay: 0.5 }}
                            />
                          </div>
                          <div className="grid gap-1">
                            <motion.img 
                              className="w-full h-full object-cover rounded-sm" 
                              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" 
                              alt="Community post"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.6, delay: 0.6 }}
                            />
                            <motion.img 
                              className="w-full h-full object-cover rounded-sm" 
                              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" 
                              alt="Community post"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.6, delay: 0.7 }}
                            />
                          </div>
                        </div>
                      </div>
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

      {/* Live Market Section - Advanced */}
      <SectionWrapper
        id="live-market" 
        sticky={true}
        maskTransition={true}
        className="relative"
        height="100vh"
      >
        <AdvancedLiveMarket />
      </SectionWrapper>

      {/* Sole Map Section - Advanced */}
      <SectionWrapper
        id="sole-map"
        sticky={true} 
        maskTransition={true}
        className="relative"
        height="100vh"
      >
        <AdvancedSoleMap />
      </SectionWrapper>

      {/* Visual Search Section - Advanced */}
      <SectionWrapper
        id="visual-search"
        sticky={true}
        maskTransition={true}
        className="relative"
        height="100vh"
      >
        <AdvancedVisualSearch />
      </SectionWrapper>

      {/* Collections Section - Advanced */}
      <SectionWrapper
        id="collections"
        sticky={true}
        maskTransition={true}
        className="relative"
        height="100vh"
      >
        <AdvancedCollections />
      </SectionWrapper>

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
    </>
  );
}
