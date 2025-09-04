import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Advanced components with VITURE-style animations
import AdvancedHero from "@/components/advanced/AdvancedHero";
import AdvancedFlagshipFeatures from "@/components/advanced/AdvancedFlagshipFeatures";
import AdvancedLiveMarket from "@/components/advanced/AdvancedLiveMarket";
import AdvancedSoleMap from "@/components/advanced/AdvancedSoleMap";
import AdvancedVisualSearch from "@/components/advanced/AdvancedVisualSearch";
import AdvancedCollections from "@/components/advanced/AdvancedCollections";
import AdvancedPreloader from "@/components/advanced/AdvancedPreloader";
import AdvancedLatestStories from "@/components/advanced/AdvancedLatestStories";
import SoleRadarSection from "@/components/advanced/SoleRadarSection";
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
  Target,
  BookOpen
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
  const trendingSectionRef = useRef<HTMLDivElement>(null);
  const trendingHeaderRef = useRef<HTMLHeadingElement>(null);
  const trendingContentRef = useRef<HTMLDivElement>(null);
  const styleQuizRef = useRef<HTMLElement>(null);
  const styleQuizContentRef = useRef<HTMLDivElement>(null);
  
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

  // GSAP Animation for Trending Section - Proper section pinning with component-by-component reveal
  useEffect(() => {
    if (!trendingSectionRef.current || !trendingHeaderRef.current || !trendingContentRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states for all content elements  
      gsap.set(trendingContentRef.current?.children || [], { opacity: 0, y: 50 });

      // Split heading into words (manual splitter like flagship)
      const heading = trendingHeaderRef.current;
      if (heading) {
        const words = heading.innerText.split(" ");
        heading.innerHTML = words.map(w => `<span class="trending-word">${w}</span>`).join(" ");
        gsap.set(".trending-word", { opacity: 0, y: 50 });
        
        // Make sure header is visible initially for text splitting
        gsap.set(heading, { opacity: 1 });
      }

      // Create pinned timeline that animates components sequentially as user scrolls
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: trendingSectionRef.current,
          start: "top top",
          end: "+=150%", // Extended scroll distance for component reveals
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // Sequential animation of components
      tl.to(".trending-word", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.3,
        ease: "power2.out"
      })
      if (trendingContentRef.current?.children[0]) {
        tl.to(trendingContentRef.current.children[0], { // Filter pills
          opacity: 1,
          y: 0,
          duration: 0.4,
        }, "+=0.2");
      }
      
      if (trendingContentRef.current?.children[1]) {
        tl.to(trendingContentRef.current.children[1], { // Sneaker grid
          opacity: 1,
          y: 0,
          duration: 0.6,
        }, "+=0.1");
      }
      
      if (trendingContentRef.current?.children[2]) {
        tl.to(trendingContentRef.current.children[2], { // Stats row
          opacity: 1,
          y: 0,
          duration: 0.4,
        }, "+=0.1");
      }
      
      if (trendingContentRef.current?.children[3]) {
        tl.to(trendingContentRef.current.children[3], { // CTA section
          opacity: 1,
          y: 0,
          duration: 0.4,
        }, "+=0.1");
      }

    }, trendingSectionRef);

    return () => ctx.revert();
  }, [sneakers, brands]); // Depend on data being loaded

  const { data: blogPosts, isLoading: blogLoading, error: blogError } = useQuery({
    queryKey: ["/api/blog"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Now that the query client is fixed, all queries should work



  return (
    <>
      {/* Advanced Preloader */}
      <AdvancedPreloader
        onComplete={() => setIsLoading(false)}
        duration={2800}
        brandText="SoleGrithm"
      />

      <div 
        ref={containerRef}
        className="min-h-screen"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 30, 0.98))',
          minHeight: '100vh',
        }}
      >
      {/* Hero Section - Advanced VITURE-style */}
      <AdvancedHero />

      {/* Advanced Flagship Features with GSAP Scroll Animation */}
      <AdvancedFlagshipFeatures />

      {/* What's Hot Right Now Slider */}
      <div>
        <HotRightNowSlider />
      </div>





      {/* Personalized Quick Stats for Authenticated Users */}
      {isAuthenticated && (
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-2xl p-6 border border-primary/10">
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
            </div>
          </div>
        </section>
      )}






      {/* Trending Now Section - Pinned Animation */}
      <div
        ref={trendingSectionRef}
        className="relative min-h-screen py-32 overflow-hidden"
        style={{
          background: 'transparent',
        }}
        data-testid="section-trending-now"
      >
          {/* Background gradient effects - Same as flagship */}
          <div className="absolute top-16 bottom-0 left-0 right-0 overflow-hidden">
            {/* Purple/Pink/Blue gradient orbs like flagship - positioned lower to avoid brands section */}
            <div 
              className="absolute top-32 left-1/4 w-80 h-80 rounded-full opacity-20"
              style={{
                background: 'linear-gradient(to right, #8B5CF6 0%, #EC4899 61%, #06B6D4 100%)',
                filter: 'blur(100px)',
              }}
            />
            <div 
              className="absolute bottom-20 right-1/4 w-60 h-60 rounded-full opacity-15"
              style={{
                background: 'linear-gradient(to right, #06B6D4 0%, #8B5CF6 61%, #EC4899 100%)',
                filter: 'blur(80px)',
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h2 
                ref={trendingHeaderRef}
                className="font-bold leading-tight text-white mb-4"
                style={{ 
                  opacity: 1,
                  fontSize: 'clamp(2.5rem, 8vw, 6.8rem)', // Responsive sizing to fit on one line
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  width: '100%'
                }}
              >
                What's Hot in Sneaker Culture
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                The latest Sole Trends
              </p>
            </div>

            {/* Content Section */}
            <div ref={trendingContentRef}>
            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-32">
              <button
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedBrand === 'All'
                    ? 'bg-white/20 text-white border border-white/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
                onClick={() => setSelectedBrand('All')}
                data-testid="filter-all"
              >
                All Brands
              </button>
              {Array.isArray(brands) ? brands.slice(0, 6).map((brand: any) => (
                <button
                  key={brand.id}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    selectedBrand === brand.name
                      ? 'bg-white/20 text-white border border-white/20'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                  }`}
                  onClick={() => setSelectedBrand(brand.name)}
                  data-testid={`filter-${brand.name.toLowerCase()}`}
                >
                  {brand.name}
                </button>
              )) : null}
            </div>

            {/* Sneaker Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {Array.isArray(filteredSneakers) ? filteredSneakers.slice(0, 8).map((sneaker: any, index: number) => (
                <div
                  key={sneaker.id}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer hover:-translate-y-2 hover:scale-105 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  }}
                >
                  {/* Trend Rank Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                      }}
                    >
                      #{index + 1}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="aspect-square overflow-hidden bg-white/10 border-b border-white/10">
                    <img
                      src={sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"}
                      alt={sneaker.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="font-semibold text-white text-lg mb-1 truncate">
                        {sneaker.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{sneaker.brandName}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className="text-2xl font-bold"
                        style={{
                          background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }}
                      >
                        ${sneaker.retailPrice || '0'}
                      </span>
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-500 font-medium">Hot</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
              )) : (
                // Loading skeleton
                Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                    }}
                  >
                    <div className="aspect-square bg-white/10 animate-pulse" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-white/10 rounded animate-pulse" />
                      <div className="h-3 bg-white/10 rounded w-2/3 animate-pulse" />
                      <div className="h-6 bg-white/10 rounded w-1/2 animate-pulse" />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { number: filteredSneakers?.length || 25, label: 'Trending Items', suffix: '+' },
                { number: Array.isArray(brands) ? brands.length : 8, label: 'Top Brands', suffix: '+' },
                { number: 98, label: 'Community Score', suffix: '%' }
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl border border-white/10 hover:scale-105 hover:-translate-y-1 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                  }}
                >
                  <div className="text-3xl sm:text-4xl font-bold mb-2">
                    <span
                      style={{
                        background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      {stat.number}{stat.suffix}
                    </span>
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Link href="/trending">
                <button
                  className="group relative px-12 py-4 rounded-full font-semibold text-white overflow-hidden hover:scale-105 active:scale-95 transition-transform"
                  style={{
                    background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                  }}
                  data-testid="button-explore-trending"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Explore All Trending
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>

              {/* Live indicator */}
              <div className="inline-flex items-center gap-2 text-sm text-gray-400 mt-6">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                  }}
                />
                Live trending data • Updated 2m ago
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Stories Section - Advanced GSAP Pinned Animation */}
      <AdvancedLatestStories />



      {/* Sole Radar Section - Advanced GSAP Pinned Animation */}
      <SoleRadarSection />

      {/* Style Quiz Section - Curtain Reveal Animation */}
      <section
        ref={styleQuizRef}
        className="relative py-32 overflow-hidden min-h-screen"
        style={{
          background: '#000000', // Black background to match curtain
        }}
        data-testid="section-style-quiz"
      >
        {/* Background effects */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 70% 50%, rgba(150, 0, 255, 0.08) 0%, rgba(100, 50, 255, 0.04) 35%, rgba(255, 100, 150, 0.06) 100%)',
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 rounded-full border border-purple-500/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 rotate-45 border border-pink-500/20"
          animate={{ rotate: [45, 135, 45] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Column */}
            <div ref={styleQuizContentRef} className="space-y-8">
                {/* Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: 'rgba(150, 0, 255, 0.1)',
                    border: '1px solid rgba(150, 0, 255, 0.2)',
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">STYLE QUIZ AI</span>
                </motion.div>

                {/* Main Title */}
                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    <SplitText type="words" delay={0.3}>
                      Discover Your
                    </SplitText>
                    <br />
                    <GradientText className="block">
                      Perfect Style
                    </GradientText>
                  </h2>
                  
                  <motion.p
                    className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    Take our quick style quiz and get personalized sneaker recommendations 
                    tailored just for you with AI-powered precision.
                  </motion.p>
                </div>

                {/* Enhanced Form */}
                <motion.form 
                  className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <div className="mb-6">
                    <label className="block text-white py-2 font-semibold mb-3" htmlFor="stylequiz">
                      Ready to find your style?
                    </label>
                    <motion.input
                      className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-400 leading-tight focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      id="stylequiz"
                      type="text"
                      placeholder="Enter your name to get started..."
                      data-testid="input-style-quiz-name"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <div className="pt-4">
                    <Link href="/quiz">
                      <motion.button
                        className="group relative px-8 py-4 text-lg font-semibold text-white overflow-hidden rounded-full w-full"
                        style={{
                          background: 'linear-gradient(to right, #9600ff 0%, #6450ff 61%, #ff6496 100%)',
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-testid="button-start-style-quiz"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Start Style Quiz
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </motion.button>
                    </Link>
                  </div>
                </motion.form>
              </div>

              {/* Interactive Sneaker Column */}
              <div className="relative">
                {/* Enhanced Interactive Card */}
                <div className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  }}>
                  <div className="text-center space-y-6">
                    {/* Enhanced Sneaker Icon */}
                    <div className="w-32 h-32 mx-auto rounded-2xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(150, 0, 255, 0.1), rgba(100, 50, 255, 0.1))',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}>
                      <ShoppingBag className="w-16 h-16 text-purple-500" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">AI Style Matching</h3>
                      <p className="text-gray-400 mb-6">
                        Click to explore interactive style preferences
                      </p>
                      
                      {/* Enhanced Interactive Elements */}
                      <div className="grid grid-cols-2 gap-3">
                        <div
                          className="p-4 rounded-xl border border-white/10 cursor-pointer"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                          }}
                          data-testid="style-option-casual"
                        >
                          <Heart className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                          <p className="text-sm font-medium text-white">Casual</p>
                        </div>
                        
                        <div
                          className="p-4 rounded-xl border border-white/10 cursor-pointer"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                          }}
                          data-testid="style-option-athletic"
                        >
                          <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                          <p className="text-sm font-medium text-white">Athletic</p>
                        </div>
                        
                        <div
                          className="p-4 rounded-xl border border-white/10 cursor-pointer"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                          }}
                          data-testid="style-option-streetwear"
                        >
                          <Star className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                          <p className="text-sm font-medium text-white">Street</p>
                        </div>
                        
                        <div
                          className="p-4 rounded-xl border border-white/10 cursor-pointer"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                          }}
                          data-testid="style-option-formal"
                        >
                          <Sparkles className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                          <p className="text-sm font-medium text-white">Formal</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



      {/* Community & Social Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Join the Community
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with sneaker enthusiasts worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* DaisyUI iPhone Mockup */}
            <div className="flex justify-center">
              <div className="mockup-phone scale-75 sm:scale-90"
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
              </div>
            </div>

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
          </div>
        </div>
      </section>

      {/* Women in Sneakers Section - Advanced Visual AI Search Style */}
      <SectionWrapper
        id="women-in-sneakers"
        sticky={true}
        maskTransition={false}
        className="relative"
        height="100vh"
      >
        <section
          className="relative py-32 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(50, 20, 40, 0.98), rgba(30, 10, 50, 0.95))',
          }}
          data-testid="section-women-sneakers"
        >
          {/* Background effects */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 30% 70%, rgba(255, 100, 150, 0.08) 0%, rgba(150, 50, 255, 0.04) 35%, rgba(255, 150, 200, 0.06) 100%)',
            }}
          />

          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 rounded-full border border-pink-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-24 h-24 rotate-45 border border-purple-500/20"
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
                    background: 'rgba(255, 100, 150, 0.1)',
                    border: '1px solid rgba(255, 100, 150, 0.2)',
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span className="text-sm font-medium">WOMEN IN SNEAKERS</span>
                </motion.div>

                {/* Main Title */}
                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    <SplitText type="words" delay={0.3}>
                      Breaking Barriers,
                    </SplitText>
                    <br />
                    <GradientText className="block">
                      Setting Trends
                    </GradientText>
                  </h2>
                  
                  <motion.p
                    className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    Celebrating and elevating women in sneaker culture. Discover female-led brands, 
                    exclusive collections, and stories of women breaking barriers in the industry.
                  </motion.p>
                </div>

                {/* Feature badges */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {[
                    { label: 'Female Founders', color: 'rgba(255, 100, 150, 0.1)' },
                    { label: 'Exclusive Collections', color: 'rgba(150, 50, 255, 0.1)' },
                    { label: 'Inspiring Stories', color: 'rgba(100, 150, 255, 0.1)' }
                  ].map((badge, index) => (
                    <motion.div
                      key={badge.label}
                      className="px-4 py-2 rounded-full border border-white/20 text-sm font-medium text-white"
                      style={{ background: badge.color }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {badge.label}
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  <Link href="/women-in-sneakers">
                    <motion.button
                      className="group relative px-8 py-4 text-lg font-semibold text-white overflow-hidden rounded-full"
                      style={{
                        background: 'linear-gradient(to right, #ff6496 0%, #9650ff 61%, #ff9650 100%)',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-testid="button-explore-women-sneakers"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Explore Women in Sneakers
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Visual Grid Column */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                {/* Enhanced Visual Grid */}
                <div
                  className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <motion.div
                        className="h-32 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 100, 150, 0.1), rgba(255, 150, 200, 0.1))',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                      >
                        <Heart className="w-8 h-8 text-pink-500" />
                      </motion.div>
                      <motion.div
                        className="h-20 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(150, 50, 255, 0.1), rgba(200, 100, 255, 0.1))',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
                      >
                        <Users className="w-6 h-6 text-purple-500" />
                      </motion.div>
                    </div>
                    <div className="space-y-4">
                      <motion.div
                        className="h-20 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(100, 150, 255, 0.1), rgba(150, 200, 255, 0.1))',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                      >
                        <Star className="w-6 h-6 text-blue-500" />
                      </motion.div>
                      <motion.div
                        className="h-32 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(200, 100, 255, 0.1), rgba(255, 150, 255, 0.1))',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
                      >
                        <Sparkles className="w-8 h-8 text-purple-500" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>



      {/* Sole Search - Visual Search Section - Advanced */}
      <SectionWrapper
        id="sole-search"
        sticky={true}
        maskTransition={false}
        className="relative"
        height="100vh"
      >
        <AdvancedVisualSearch />
      </SectionWrapper>

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
            <div className="space-y-6">
              <div className="relative bg-gradient-to-br from-background to-muted/50 rounded-2xl p-8 sm:p-12 border overflow-hidden">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl flex items-center justify-center mx-auto">
                    <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2">Interactive Heat Map</h3>
                    <motion.p className="text-sm sm:text-base text-muted-foreground mb-6">
                      Live visualization of sneaker trends across major cities worldwide
                    </motion.p>
                    
                    <div>
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
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-3 gap-4 pt-4">
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
                  </div>
                </div>
              </div>
            </div>

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
        maskTransition={false}
        className="relative"
        height="100vh"
      >
        <AdvancedLiveMarket />
      </SectionWrapper>

      {/* Sole Map Section - Advanced */}
      <SectionWrapper
        id="sole-map-advanced"
        sticky={true} 
        maskTransition={false}
        className="relative"
        height="100vh"
      >
        <AdvancedSoleMap />
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
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action - Get Started */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 via-orange-500/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to Elevate Your Sneaker Game?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of sneaker enthusiasts discovering, collecting, and connecting 
              through the power of AI and community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
            </div>
          </div>
        </div>
      </section>



      {/* Final Features Section */}
      <section 
        className="py-16 sm:py-24 bg-gradient-to-br from-muted/20 to-background"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Why SoleGrithm?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              The most comprehensive platform for sneaker enthusiasts
            </p>
          </div>

          <div 
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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-orange-500 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm group-hover:text-foreground transition-colors">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
