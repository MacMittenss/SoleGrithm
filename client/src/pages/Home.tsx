import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Advanced components with VITURE-style animations
import AdvancedHero from "@/components/advanced/AdvancedHero";
import AdvancedFlagshipFeatures from "@/components/advanced/AdvancedFlagshipFeatures";

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

      {/* Test message */}
      <div className="text-center p-8">
        <p className="text-white text-xl">Testing: Hero + Flagship + HotRightNow loaded</p>
      </div>
      </div>
    </>
  );
}