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
  
  // Refs for new hero GSAP animations
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const welcomeTextRef = useRef<HTMLHeadingElement>(null);
  
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

  useEffect(() => {
    // Robot-synced zoom animation for SOLEGRITHM text
    if (heroTextRef.current && welcomeTextRef.current) {
      const tl = gsap.timeline({ delay: 1.2 }); // Start when robot animation starts

      // Keep text visible for now - disable letter splitting
      const text = heroTextRef.current;
      // text.innerHTML = text.textContent || "SOLEGRITHM";

      // Set welcome text initial state - make visible immediately 
      gsap.set(welcomeTextRef.current, { opacity: 1, scale: 1 });

      // Animate welcome text with zoom-out effect
      tl.to(welcomeTextRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2.5,
        ease: "expo.out",
      })

        // Animate SOLEGRITHM letters with synchronized zoom-out
        .to(
          text.querySelectorAll("span"),
          {
            opacity: 1,
            scale: 1,
            duration: 2.5,
            ease: "expo.out",
            stagger: 0.02,
          },
          "-=2.3"
        ); // Start slightly after welcome text
    }
  }, []);

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
      {/* Hero Section */}
      <section className="hero-section">
        <div className="fingerprint"></div>
        <div className="circle"></div>
        <div className="w-layout-blockcontainer container w-container">
          <div className="hero-wrapper">
            <h5 ref={welcomeTextRef} className="heading">
              Welcome To
            </h5>
            <h1 ref={heroTextRef} className="hero-text">
              SOLEGRITHM
            </h1>
            <a href="#brands" className="arrow-border-wrapper w-inline-block">
              <div className="icon-wrapper">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
        <div className="spline">
          <iframe
            src="https://my.spline.design/nexbotrobotcharacterconcept-MuKFwn44xdQzWJqISlDVY35e/"
            frameBorder="0"
            width="100%"
            height="100%"
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
            }}
          />
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="section">
        <div className="w-layout-blockcontainer container padding-4-5rem w-container">
          <div className="space-7rem"></div>
          <div className="brands-wrapper">
            <div className="brands-grid">
              <div className="logos-wrapper">
                <div style={{ width: '80px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666' }}>NIKE</div>
              </div>
              <div className="logos-wrapper">
                <div style={{ width: '80px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666' }}>ADIDAS</div>
              </div>
              <div className="logos-wrapper">
                <div style={{ width: '80px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666' }}>JORDAN</div>
              </div>
              <div className="logos-wrapper">
                <div style={{ width: '80px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666' }}>PUMA</div>
              </div>
            </div>
            <div className="brands-grid">
              <div className="logos-wrapper">
                <div style={{ width: '80px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666' }}>CONVERSE</div>
              </div>
              <div className="logos-wrapper">
                <div style={{ width: '80px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666' }}>VANS</div>
              </div>
              <div className="logos-wrapper">
                <div style={{ width: '80px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666' }}>REEBOK</div>
              </div>
              <div className="logos-wrapper">
                <div style={{ width: '80px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#666' }}>BALENCIAGA</div>
              </div>
            </div>
          </div>
          <div className="space-7rem"></div>
        </div>
      </section>

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

      {/* Style Quiz Section - Curtain Reveal Animation */}
      <section
        ref={styleQuizRef}
        className="relative py-32 overflow-hidden min-h-screen"
        style={{
          background: '#000000', // Black background to match curtain
        }}
        data-testid="section-style-quiz"
      >
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
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
                  initial={{ opacity: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
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
                    initial={{ opacity: 1, y: 20 }}
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
                  className="relative p-8 rounded-3xl border border-white/10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  }}
                  initial={{ opacity: 1, y: 30 }}
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
                <div className="relative p-8 rounded-3xl border border-white/10"
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

      {/* AR Try-On Section */}
      <ARDemo />

      {/* Footer Section */}
      <AdvancedFooter />
      </div>
    </>
  );
}