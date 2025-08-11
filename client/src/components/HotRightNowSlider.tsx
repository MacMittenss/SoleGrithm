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
      <section className="py-16 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-6 bg-muted rounded w-48 mb-2 animate-pulse" />
            <div className="h-4 bg-muted rounded w-64 animate-pulse" />
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-56 animate-pulse">
                  <div className="aspect-square bg-muted rounded-lg mb-3" />
                  <div className="space-y-1">
                    <div className="h-3 bg-muted rounded w-16" />
                    <div className="h-4 bg-muted rounded w-20" />
                    <div className="h-4 bg-muted rounded w-12" />
                  </div>
                </div>
              ))}
            </div>
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
    <section className="py-16 bg-white dark:bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Header - Nike Style */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <IconComponent className="h-5 w-5 text-foreground" />
            <h2 className="text-2xl font-medium tracking-tight text-foreground">
              {dailyContent.title}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {dailyContent.subtitle}
          </p>
        </div>

        {/* Minimal Slider Container */}
        <div className="relative overflow-hidden">
          {/* Continuous Scrolling Container */}
          <div 
            className={`flex gap-4 transition-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              transform: `translateX(${translateX}px)`,
              width: `${extendedSneakers.length * cardWidth}px`,
              userSelect: 'none'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {extendedSneakers.map((sneaker: any, index: number) => (
              <div key={`${sneaker.id}-${index}`} className="flex-shrink-0" style={{ width: `${cardWidth - 16}px` }}>
                <Link href={`/sneaker/${sneaker.slug}`}>
                  <div 
                    className="group cursor-pointer"
                    onMouseDown={(e) => e.preventDefault()}
                  >
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
              </div>
            ))}
          </div>

          {/* Subtle fade gradients on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent dark:from-background pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent dark:from-background pointer-events-none z-10" />
        </div>

        {/* Simple View All Link - Fixed text */}
        <div className="text-center mt-8">
          <Link href="/discover">
            <span className="text-sm font-medium text-foreground hover:text-muted-foreground underline transition-colors">
              View All AI Picks
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}