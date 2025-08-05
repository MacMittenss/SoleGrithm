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
  const [cardWidth, setCardWidth] = useState(320); // Default card width including gap

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
        setCardWidth(320); // Large screens: 4 cards per view, ~300px + gap
      } else if (window.innerWidth >= 640) {
        setCardWidth(360); // Medium screens: 2 cards per view
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
        const newTranslate = prev - 0.5; // Slow movement speed
        
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
      <section className={`py-16 bg-gradient-to-r ${dailyContent.gradientFrom} ${dailyContent.gradientTo} dark:from-purple-950/20 dark:to-blue-950/20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-2xl h-64 mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="h-5 bg-muted rounded w-1/2" />
                  <div className="h-6 bg-muted rounded w-3/4" />
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
    <section className={`py-16 bg-gradient-to-r ${dailyContent.gradientFrom} ${dailyContent.gradientTo} dark:from-purple-950/20 dark:to-blue-950/20 relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 rounded-full blur-xl" />
        <div className="absolute top-32 right-20 w-32 h-32 bg-blue-500 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-indigo-500 rounded-full blur-xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <IconComponent className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {dailyContent.title}
            </h2>
            <IconComponent className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {dailyContent.subtitle}
          </p>
          <div className="mt-4">
            <Badge variant="outline" className="text-xs text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800">
              Updates daily • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Badge>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden">
          {/* Continuous Scrolling Container */}
          <div 
            className={`flex gap-6 transition-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
              <div key={`${sneaker.id}-${index}`} className="flex-shrink-0" style={{ width: `${cardWidth - 24}px` }}>
                <Link href={`/sneaker/${sneaker.slug}`}>
                  <Card 
                    className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-purple-100 dark:border-purple-900/30 h-full"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div className="relative overflow-hidden">
                    <img
                      src={sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"}
                      alt={sneaker.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={`${dailyContent.badgeColor} text-white border-0`}>
                        <IconComponent className="h-3 w-3 mr-1" />
                        {dailyContent.badgeText}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 dark:bg-black/90 text-black dark:text-white">
                        #{(index % sneakers.length) + 1}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <p className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                        {sneaker.brandName || 'Unknown Brand'}
                      </p>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {sneaker.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(sneaker.retailPrice)}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          +{Math.floor(Math.random() * 30) + 10}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>

          {/* Fade gradients on edges */}
          <div className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r ${dailyContent.gradientFrom} via-white/50 to-transparent dark:from-black dark:via-black/50 pointer-events-none z-10`} />
          <div className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l ${dailyContent.gradientFrom} via-white/50 to-transparent dark:from-black dark:via-black/50 pointer-events-none z-10`} />
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0">
            <Link href="/discover">
              <IconComponent className="h-4 w-4 mr-2" />
              Explore More {dailyContent.badgeText} Picks
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}