import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, TrendingUp, Flame, Sparkles, Archive, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

type DailyContent = {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  apiEndpoint: string;
  badgeText: string;
  badgeColor: string;
  gradientFrom: string;
  gradientTo: string;
};

export default function HotRightNowSlider() {
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, translateX: 0 });
  const [cardWidth, setCardWidth] = useState(240); // Smaller cards for minimal design

  // Daily rotation logic based on current day
  const dailyContent = useMemo((): DailyContent => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const rotationIndex = dayOfYear % 3;

    const contentTypes: DailyContent[] = [
      {
        title: "AI Picks of the Day",
        subtitle: "Curated by our AI based on market trends and community sentiment",
        icon: Sparkles,
        apiEndpoint: '/api/ai/recommendations',
        badgeText: "AI Pick",
        badgeColor: "bg-purple-500 hover:bg-purple-600",
        gradientFrom: "from-purple-50",
        gradientTo: "to-blue-50"
      },
      {
        title: "Newly Added to the Archive",
        subtitle: "Fresh additions to our comprehensive sneaker database",
        icon: Archive,
        apiEndpoint: '/api/sneakers/featured',
        badgeText: "New",
        badgeColor: "bg-green-500 hover:bg-green-600",
        gradientFrom: "from-green-50",
        gradientTo: "to-emerald-50"
      },
      {
        title: "Recently Dropped",
        subtitle: "The latest releases hitting the market right now",
        icon: Zap,
        apiEndpoint: '/api/sneakers/trending',
        badgeText: "Fresh",
        badgeColor: "bg-orange-500 hover:bg-orange-600",
        gradientFrom: "from-orange-50",
        gradientTo: "to-red-50"
      }
    ];

    return contentTypes[rotationIndex];
  }, []);

  const { data: sneakers, isLoading } = useQuery({
    queryKey: [dailyContent.apiEndpoint],
    queryFn: async () => {
      const response = await fetch(dailyContent.apiEndpoint);
      if (!response.ok) throw new Error(`Failed to fetch ${dailyContent.title.toLowerCase()}`);
      return response.json();
    },
    staleTime: 1000 * 60 * 10, // 10 minutes cache for better performance
    refetchOnWindowFocus: false
  });

  // Calculate card width based on screen size
  useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth >= 1024) {
        setCardWidth(240); // Large screens: smaller cards for minimal design
      } else if (window.innerWidth >= 640) {
        setCardWidth(280); // Medium screens
      } else {
        setCardWidth(window.innerWidth - 48); // Small screens: 1 card per view
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  // Smooth continuous scrolling
  useEffect(() => {
    if (!sneakers?.length || isDragging) return;
    
    const animationFrame = requestAnimationFrame(() => {
      setTranslateX(prev => {
        const maxTranslate = -(sneakers.length * cardWidth);
        const newTranslate = prev - 0.3; // Slower movement for minimal design
        
        // Reset to beginning when reached the end
        if (newTranslate <= maxTranslate) {
          return 0;
        }
        return newTranslate;
      });
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [sneakers?.length, cardWidth, isDragging, translateX]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      translateX: translateX
    });
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const newTranslateX = dragStart.translateX + deltaX;
    
    // Apply boundaries to prevent dragging too far
    const maxTranslate = -(sneakers.length * cardWidth);
    const boundedTranslate = Math.max(Math.min(newTranslateX, cardWidth), maxTranslate - cardWidth);
    
    setTranslateX(boundedTranslate);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Global mouse up listener for when user releases outside the slider
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mouseleave', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mouseleave', handleGlobalMouseUp);
    };
  }, [isDragging]);


  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <div className="h-5 bg-neutral-200 dark:bg-neutral-700 w-48 mb-2 animate-pulse" />
            <div className="h-4 bg-neutral-200 dark:bg-neutral-700 w-64 animate-pulse" />
          </div>
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-48 sm:w-56 animate-pulse">
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
        </div>
      </section>
    );
  }

  if (!sneakers?.length) return null;

  // Duplicate sneakers array for seamless loop
  const extendedSneakers = [...sneakers, ...sneakers];

  const IconComponent = dailyContent.icon;

  return (
    <section className="py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Minimalist Header */}
        <div className="mb-10">
          <h2 className="text-xl font-light text-neutral-900 dark:text-neutral-100 mb-2">
            {dailyContent.title}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light">
            {dailyContent.subtitle}
          </p>
        </div>

        {/* Clean Grid Layout */}
        <div className="relative">
          {/* Horizontal Scroll Container */}
          <div 
            className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 ${isDragging ? 'cursor-grabbing' : ''}`}
            style={{
              scrollSnapType: 'x mandatory',
              userSelect: 'none'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {extendedSneakers.map((sneaker: any, index: number) => (
              <div 
                key={`${sneaker.id}-${index}`} 
                className="flex-shrink-0 w-48 sm:w-56"
                style={{ scrollSnapAlign: 'start' }}
              >
                <Link href={`/sneaker/${sneaker.slug}`}>
                  <div 
                    className="group cursor-pointer"
                    onMouseDown={(e) => e.preventDefault()}
                  >
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
              </div>
            ))}
          </div>
        </div>

        {/* Subtle View All Link */}
        <div className="flex justify-center mt-10">
          <Link href="/discover">
            <span className="text-sm font-light text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors border-b border-neutral-300 dark:border-neutral-600 hover:border-neutral-900 dark:hover:border-neutral-100 pb-1">
              View All
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}