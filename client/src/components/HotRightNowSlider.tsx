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



  if (isLoading) {
    return (
      <section className="py-16 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-6 bg-muted rounded w-48 mb-2 animate-pulse" />
            <div className="h-4 bg-muted rounded w-64 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="animate-pulse">
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
      </section>
    );
  }

  if (!sneakers?.length) return null;

  const IconComponent = dailyContent.icon;

  return (
    <section className="py-16 bg-white dark:bg-background">
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

        {/* Nike-Style Minimal Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
          {sneakers.slice(0, 12).map((sneaker: any, index: number) => (
            <Link key={sneaker.id} href={`/sneaker/${sneaker.slug}`}>
              <div className="group cursor-pointer">
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
          ))}
        </div>

        {/* Simple View All Link */}
        <div className="text-center">
          <Link href="/discover">
            <span className="text-sm font-medium text-foreground hover:text-muted-foreground underline transition-colors">
              View All {dailyContent.badgeText} Picks
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}