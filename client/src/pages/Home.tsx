import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Advanced components with VITURE-style animations
import AdvancedFlagshipFeatures from "@/components/advanced/AdvancedFlagshipFeatures";
import AdvancedLatestStories from "@/components/advanced/AdvancedLatestStories";
import AdvancedLiveMarket from "@/components/advanced/AdvancedLiveMarket";
import AdvancedSoleMap from "@/components/advanced/AdvancedSoleMap";
import AdvancedVisualSearch from "@/components/advanced/AdvancedVisualSearch";
import AdvancedCollections from "@/components/advanced/AdvancedCollections";
import SoleRadarSection from "@/components/advanced/SoleRadarSection";
import AdvancedFooter from "@/components/advanced/AdvancedFooter";

// GitHub Hero Section
import HeroSection from "@/components/HeroSection";

// Legacy components
import HotRightNowSlider from "@/components/HotRightNowSlider";
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

// Typography components for Style Quiz
import SplitText from "@/components/advanced/SplitText";
import GradientText from "@/components/advanced/GradientText";
import { useAuth } from '@/hooks/useAuth';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import womenSneakersImage from "@assets/generated_images/Woman_in_stylish_sneakers_90ff70fb.png";
import arTryonImage from "@assets/generated_images/AR_sneaker_try-on_technology_732da862.png";

// Declare the spline-viewer custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": {
        url: string;
        style?: React.CSSProperties;
        background?: string;
        className?: string;
      };
    }
  }
}

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const containerRef = useRef(null);
  
  // Refs for Style Quiz GSAP animations
  const styleQuizRef = useRef(null);
  const styleQuizContentRef = useRef(null);
  
  // Initialize smooth scrolling
  useSmoothScroll();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform values for parallax effects - opacity always visible
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  // Data fetching
  const { data: sneakers, isLoading: sneakersLoading } = useQuery({
    queryKey: ["/api/sneakers/trending"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: featuredSneakers, isLoading: featuredLoading } = useQuery({
    queryKey: ["/api/sneakers/featured"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: brands } = useQuery({
    queryKey: ["/api/brands"],
    staleTime: 1000 * 60 * 15, // 15 minutes
  });


  return (
    <>
      <div 
        ref={containerRef}
        className="min-h-screen"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 30, 0.98))',
          minHeight: '100vh',
        }}
      >
      {/* Hero Section from GitHub */}
      <HeroSection />

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

      {/* Advanced Latest Stories with GSAP Pinned Animation */}
      <AdvancedLatestStories />

      {/* Sole Radar Section - AI Discovery (blur and overlay animations removed) */}
      <SoleRadarSection />

      {/* Advanced Live Market Section */}
      <AdvancedLiveMarket />

      {/* Advanced Sole Map */}
      <AdvancedSoleMap />

      {/* Advanced Visual Search */}
      <AdvancedVisualSearch />

      {/* Advanced Collections */}
      <AdvancedCollections />

      {/* Style Quiz Section - Template Layout */}
      <section
        ref={styleQuizRef}
        className="section background-black"
        data-testid="section-style-quiz"
      >
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="space-7rem"></div>
          
          {/* Header - Template Layout */}
          <div className="utilities-wrapper-title" style={{ 
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            marginBottom: '2.2vw'
          }}>
            <h5 className="heading">
              STYLE QUIZ AI
            </h5>
            <h2 className="font-c" style={{ 
              color: 'var(--white)',
              letterSpacing: '-.07vw',
              textTransform: 'capitalize',
              marginTop: 0,
              marginBottom: 0,
              fontSize: '4.44vw',
              fontWeight: 500,
              lineHeight: '5vw'
            }}>
              Discover Your Perfect Style
            </h2>
          </div>

          {/* Description */}
          <div className="utilities-wrapper-paragraph" style={{ 
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            marginBottom: '3vw'
          }}>
            <p style={{ 
              color: 'var(--white)',
              letterSpacing: '.07vw',
              marginBottom: 0,
              fontSize: '1.11vw',
              fontWeight: 300,
              lineHeight: '1.89vw',
              maxWidth: '42.22vw',
              margin: '0 auto'
            }}>
              Take our quick style quiz and get personalized sneaker recommendations 
              tailored just for you with AI-powered precision.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Form Column */}
            <div ref={styleQuizContentRef}>
              <div className="relative p-8 rounded-2xl border border-white/20"
                style={{
                  backgroundColor: 'var(--secondary)',
                }}>
                <div className="mb-6">
                  <label style={{ 
                    display: 'block',
                    color: 'var(--white)',
                    padding: '0.5rem 0',
                    fontWeight: 600,
                    marginBottom: '0.75rem'
                  }} htmlFor="stylequiz">
                    Ready to find your style?
                  </label>
                  <input
                    className="w-full p-4 rounded-xl border border-white/20 bg-white/5 text-white placeholder-gray-400 leading-tight focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                    id="stylequiz"
                    type="text"
                    placeholder="Enter your name to get started..."
                    data-testid="input-style-quiz-name"
                  />
                </div>

                <div className="pt-4">
                  <Link href="/quiz">
                    <div className="button-with-circle-icon w-full" data-testid="button-start-style-quiz">
                      <div className="button-text" style={{ color: 'var(--white)' }}>Start Style Quiz</div>
                      <div className="button-arrow-wrapper">
                        <ArrowRight className="arrow" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Interactive Style Options Column */}
            <div className="relative">
              <div className="relative p-8 rounded-2xl border border-white/20"
                style={{
                  backgroundColor: 'var(--secondary)',
                }}>
                <div className="text-center space-y-6">
                  {/* Sneaker Icon */}
                  <div className="w-32 h-32 mx-auto rounded-2xl flex items-center justify-center bg-white">
                    <ShoppingBag className="w-16 h-16 text-black" />
                  </div>
                  
                  <div>
                    <h3 style={{ 
                      color: 'var(--white)',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                      marginBottom: '0.5rem'
                    }}>AI Style Matching</h3>
                    <p style={{ 
                      color: '#a0a0a0',
                      marginBottom: '1.5rem'
                    }}>
                      Click to explore interactive style preferences
                    </p>
                    
                    {/* Style Options Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className="p-4 rounded-xl border border-white/20 cursor-pointer hover:border-white/40 transition-all"
                        style={{
                          backgroundColor: 'var(--lighter-black)',
                        }}
                        data-testid="style-option-casual"
                      >
                        <Heart className="w-6 h-6 text-white mx-auto mb-2" />
                        <p className="text-sm font-medium text-white">Casual</p>
                      </div>
                      
                      <div
                        className="p-4 rounded-xl border border-white/20 cursor-pointer hover:border-white/40 transition-all"
                        style={{
                          backgroundColor: 'var(--lighter-black)',
                        }}
                        data-testid="style-option-athletic"
                      >
                        <Zap className="w-6 h-6 text-white mx-auto mb-2" />
                        <p className="text-sm font-medium text-white">Athletic</p>
                      </div>
                      
                      <div
                        className="p-4 rounded-xl border border-white/20 cursor-pointer hover:border-white/40 transition-all"
                        style={{
                          backgroundColor: 'var(--lighter-black)',
                        }}
                        data-testid="style-option-streetwear"
                      >
                        <Star className="w-6 h-6 text-white mx-auto mb-2" />
                        <p className="text-sm font-medium text-white">Street</p>
                      </div>
                      
                      <div
                        className="p-4 rounded-xl border border-white/20 cursor-pointer hover:border-white/40 transition-all"
                        style={{
                          backgroundColor: 'var(--lighter-black)',
                        }}
                        data-testid="style-option-formal"
                      >
                        <Sparkles className="w-6 h-6 text-white mx-auto mb-2" />
                        <p className="text-sm font-medium text-white">Formal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-7rem"></div>
        </div>
      </section>

      {/* AR Try-On Section */}
      <ARDemo />

      {/* Community & Social Section */}
      <section className="py-16 sm:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-white">
              Join the Community
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
              Connect with sneaker enthusiasts worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* DaisyUI iPhone Mockup */}
            <div className="flex justify-center">
              <div className="mockup-phone scale-75 sm:scale-90">
                <div className="mockup-phone-camera"></div> 
                <div className="mockup-phone-display bg-gradient-to-b from-blue-500/10 to-purple-500/10 relative overflow-hidden">
                  {/* Phone Interface */}
                  <div className="relative p-3">
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
                              initial={{ opacity: 1, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.6, delay: 0.1 }}
                            />
                            <motion.img 
                              className="w-full h-full object-cover rounded-sm" 
                              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" 
                              alt="Community post"
                              initial={{ opacity: 1, scale: 0.8 }}
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
                              initial={{ opacity: 1, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.6, delay: 0.3 }}
                            />
                            <motion.img 
                              className="w-full h-full object-cover rounded-sm" 
                              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" 
                              alt="Community post"
                              initial={{ opacity: 1, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.6, delay: 0.4 }}
                            />
                            <motion.img 
                              className="w-full h-full object-cover rounded-sm" 
                              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" 
                              alt="Community post"
                              initial={{ opacity: 1, scale: 0.8 }}
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
                              initial={{ opacity: 1, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.6, delay: 0.6 }}
                            />
                            <motion.img 
                              className="w-full h-full object-cover rounded-sm" 
                              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" 
                              alt="Community post"
                              initial={{ opacity: 1, scale: 0.8 }}
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
            <motion.div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">Connect & Share</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Share Your Collection</h4>
                    <p className="text-sm text-white/70">Showcase your sneaker collection to the community</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Rate & Review</h4>
                    <p className="text-sm text-white/70">Help others with authentic sneaker reviews</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/30">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Trend Alerts</h4>
                    <p className="text-sm text-white/70">Get notified about price drops and new releases</p>
                  </div>
                </div>
              </div>
              <Link href="/auth">
                <Button size="lg" className="w-full bg-white text-black hover:bg-white/90" data-testid="button-join-community">
                  Join Community
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why SoleGrithm Section */}
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-muted/20 to-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Why SoleGrithm?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              The most comprehensive platform for sneaker enthusiasts
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
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
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    delay: feature.delay,
                    ease: "easeOut"
                  }
                }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="p-4 sm:p-6 text-center border-0 shadow-lg bg-card/50 hover:shadow-xl transition-shadow group">
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
          </motion.div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <AdvancedFooter />
      </div>
    </>
  );
}