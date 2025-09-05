import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Advanced components with VITURE-style animations
import AdvancedHero from "@/components/advanced/AdvancedHero";
import AdvancedFlagshipFeatures from "@/components/advanced/AdvancedFlagshipFeatures";
import AdvancedLatestStories from "@/components/advanced/AdvancedLatestStories";
import AdvancedLiveMarket from "@/components/advanced/AdvancedLiveMarket";
import AdvancedSoleMap from "@/components/advanced/AdvancedSoleMap";
import AdvancedVisualSearch from "@/components/advanced/AdvancedVisualSearch";
import AdvancedCollections from "@/components/advanced/AdvancedCollections";

// Legacy components
import HotRightNowSlider from "@/components/HotRightNowSlider";

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
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const containerRef = useRef(null);
  
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

      {/* Advanced Latest Stories with GSAP Pinned Animation */}
      <AdvancedLatestStories />

      {/* NOTE: SoleRadarSection removed due to DOM manipulation errors */}

      {/* Advanced Live Market Section */}
      <AdvancedLiveMarket />

      {/* Advanced Sole Map */}
      <AdvancedSoleMap />

      {/* Advanced Visual Search */}
      <AdvancedVisualSearch />

      {/* Advanced Collections */}
      <AdvancedCollections />
      </div>
    </>
  );
}