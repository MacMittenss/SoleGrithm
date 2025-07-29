import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, TrendingUp, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function HotRightNowSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: trendingSneakers, isLoading } = useQuery({
    queryKey: ['/api/sneakers/trending'],
    queryFn: async () => {
      const response = await fetch('/api/sneakers/trending');
      if (!response.ok) throw new Error('Failed to fetch trending sneakers');
      return response.json();
    }
  });

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!trendingSneakers?.length) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(trendingSneakers.length / 4));
    }, 5000);

    return () => clearInterval(timer);
  }, [trendingSneakers?.length]);

  const nextSlide = () => {
    if (!trendingSneakers?.length) return;
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(trendingSneakers.length / 4));
  };

  const prevSlide = () => {
    if (!trendingSneakers?.length) return;
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(trendingSneakers.length / 4)) % Math.ceil(trendingSneakers.length / 4));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
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

  if (!trendingSneakers?.length) return null;

  const slidesCount = Math.ceil(trendingSneakers.length / 4);
  const currentSneakers = trendingSneakers.slice(currentSlide * 4, (currentSlide + 1) * 4);

  return (
    <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-500 rounded-full blur-xl" />
        <div className="absolute top-32 right-20 w-32 h-32 bg-orange-500 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-yellow-500 rounded-full blur-xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="h-8 w-8 text-red-500" />
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              What's Hot Right Now
            </h2>
            <Flame className="h-8 w-8 text-red-500" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The sneakers everyone's talking about, updated in real-time
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {slidesCount > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-red-200 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/50"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white/90 dark:bg-black/90 backdrop-blur-sm border-red-200 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/50"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Sneakers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentSneakers.map((sneaker: any, index: number) => (
              <Link key={sneaker.id} href={`/sneaker/${sneaker.slug}`}>
                <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-red-100 dark:border-red-900/30">
                  <div className="relative overflow-hidden">
                    <img
                      src={sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"}
                      alt={sneaker.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-red-500 hover:bg-red-600 text-white border-0">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Hot
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 dark:bg-black/90 text-black dark:text-white">
                        #{currentSlide * 4 + index + 1}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <p className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wide">
                        {sneaker.brandName || 'Unknown Brand'}
                      </p>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {sneaker.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">
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
            ))}
          </div>

          {/* Slide Indicators */}
          {slidesCount > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: slidesCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-red-500 w-8'
                      : 'bg-red-200 dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0">
            <Link href="/discover">
              <TrendingUp className="h-4 w-4 mr-2" />
              Explore All Trending
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}