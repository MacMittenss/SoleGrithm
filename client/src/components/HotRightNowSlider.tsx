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

export default function BrandShowcase() {
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, translateX: 0 });
  const [cardWidth, setCardWidth] = useState(280);

  const { data: brands, isLoading } = useQuery({
    queryKey: ['/api/brands'],
    staleTime: 1000 * 60 * 15, // 15 minutes cache
    refetchOnWindowFocus: false
  });

  // Comprehensive brand showcase including luxury, sportswear, and marketplaces
  const featuredBrands = useMemo(() => {
    const allBrands = [
      // Major Sportswear
      { id: 1, name: 'Nike', slug: 'nike', type: 'brand', isPopular: true },
      { id: 2, name: 'Adidas', slug: 'adidas', type: 'brand', isPopular: true },
      { id: 3, name: 'Jordan', slug: 'jordan', type: 'brand', isPopular: true },
      { id: 4, name: 'New Balance', slug: 'new-balance', type: 'brand', isPopular: false },
      { id: 5, name: 'Converse', slug: 'converse', type: 'brand', isPopular: false },
      { id: 6, name: 'Vans', slug: 'vans', type: 'brand', isPopular: false },
      { id: 7, name: 'Puma', slug: 'puma', type: 'brand', isPopular: false },
      { id: 8, name: 'Reebok', slug: 'reebok', type: 'brand', isPopular: false },
      { id: 9, name: 'ASICS', slug: 'asics', type: 'brand', isPopular: false },
      
      // Luxury & High-Fashion
      { id: 10, name: 'Balenciaga', slug: 'balenciaga', type: 'luxury', isPopular: true },
      { id: 11, name: 'Golden Goose', slug: 'golden-goose', type: 'luxury', isPopular: false },
      { id: 12, name: 'Off-White', slug: 'off-white', type: 'luxury', isPopular: true },
      { id: 13, name: 'Gucci', slug: 'gucci', type: 'luxury', isPopular: false },
      { id: 14, name: 'Saint Laurent', slug: 'saint-laurent', type: 'luxury', isPopular: false },
      { id: 15, name: 'Common Projects', slug: 'common-projects', type: 'luxury', isPopular: false },
      
      // Marketplaces
      { id: 16, name: 'GOAT', slug: 'goat', type: 'marketplace', isPopular: true },
      { id: 17, name: 'StockX', slug: 'stockx', type: 'marketplace', isPopular: true },
      { id: 18, name: 'Flight Club', slug: 'flight-club', type: 'marketplace', isPopular: false },
      { id: 19, name: 'Stadium Goods', slug: 'stadium-goods', type: 'marketplace', isPopular: false },
      { id: 20, name: 'Grailed', slug: 'grailed', type: 'marketplace', isPopular: false }
    ];
    
    return allBrands.map(brand => ({
      ...brand,
      description: getBrandDescription(brand.name, brand.type),
      sneakerCount: getBrandSneakerCount(brand.name, brand.type),
      logoUrl: getBrandLogo(brand.name)
    }));
  }, []);

  function getBrandDescription(brandName: string, type: string): string {
    const descriptions: Record<string, string> = {
      // Sportswear
      'Nike': 'Innovation and performance excellence',
      'Adidas': 'Three stripes, infinite possibilities',
      'Jordan': 'Basketball heritage and street culture',
      'New Balance': 'Crafted for comfort and style',
      'Converse': 'Timeless classics since 1908',
      'Vans': 'Off the wall creativity',
      'Puma': 'Forever faster, forever bold',
      'Reebok': 'Sport and fitness innovation',
      'ASICS': 'Japanese precision and technology',
      
      // Luxury
      'Balenciaga': 'Avant-garde luxury footwear',
      'Golden Goose': 'Italian luxury with vintage appeal',
      'Off-White': 'Streetwear meets high fashion',
      'Gucci': 'Italian luxury and craftsmanship',
      'Saint Laurent': 'Parisian elegance and rock chic',
      'Common Projects': 'Minimalist luxury sneakers',
      
      // Marketplaces
      'GOAT': 'Authentic sneaker marketplace',
      'StockX': 'Real-time sneaker trading',
      'Flight Club': 'Premium sneaker consignment',
      'Stadium Goods': 'Luxury streetwear marketplace',
      'Grailed': 'Curated menswear marketplace'
    };
    return descriptions[brandName] || `Premium ${type} experience`;
  }

  function getBrandSneakerCount(brandName: string, type: string): number {
    const counts: Record<string, number> = {
      // Major brands
      'Nike': 3500, 'Adidas': 2800, 'Jordan': 1200, 'New Balance': 950,
      'Converse': 500, 'Vans': 750, 'Puma': 680, 'Reebok': 420, 'ASICS': 580,
      
      // Luxury
      'Balenciaga': 85, 'Golden Goose': 120, 'Off-White': 95, 'Gucci': 150,
      'Saint Laurent': 75, 'Common Projects': 60,
      
      // Marketplaces (total items)
      'GOAT': 50000, 'StockX': 75000, 'Flight Club': 15000, 
      'Stadium Goods': 25000, 'Grailed': 35000
    };
    return counts[brandName] || 200;
  }

  function getBrandLogo(brandName: string): string {
    // High-quality brand logos
    const logos: Record<string, string> = {
      'Nike': 'https://logoeps.com/wp-content/uploads/2013/03/nike-vector-logo.png',
      'Adidas': 'https://logoeps.com/wp-content/uploads/2014/04/adidas-vector-logo.png',
      'Jordan': 'https://logos-world.net/wp-content/uploads/2020/06/Jordan-Logo.png',
      'New Balance': 'https://logoeps.com/wp-content/uploads/2013/03/new-balance-vector-logo.png',
      'Converse': 'https://logoeps.com/wp-content/uploads/2014/07/converse-vector-logo.png',
      'Vans': 'https://logoeps.com/wp-content/uploads/2013/03/vans-vector-logo.png',
      'Puma': 'https://logoeps.com/wp-content/uploads/2013/03/puma-vector-logo.png',
      'Reebok': 'https://logoeps.com/wp-content/uploads/2013/03/reebok-vector-logo.png',
      'ASICS': 'https://logoeps.com/wp-content/uploads/2013/03/asics-vector-logo.png',
      'Balenciaga': 'https://logoeps.com/wp-content/uploads/2013/03/balenciaga-vector-logo.png',
      'Off-White': 'https://logoeps.com/wp-content/uploads/2017/09/off-white-vector-logo.png',
      'Gucci': 'https://logoeps.com/wp-content/uploads/2013/03/gucci-vector-logo.png',
      'GOAT': 'https://brand.goat.com/web/v1/image/logo-black.svg',
      'StockX': 'https://stockx.imgix.net/stockx-logo-black-no-wordmark.svg'
    };
    return logos[brandName] || `https://via.placeholder.com/120x60/666666/FFFFFF?text=${encodeURIComponent(brandName)}`;
  }

  // Calculate logo spacing based on screen size
  useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth >= 1024) {
        setCardWidth(160); // Compact logo spacing for desktop
      } else if (window.innerWidth >= 640) {
        setCardWidth(128); // Medium screens
      } else {
        setCardWidth(120); // Small screens
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  // Smooth continuous scrolling for brands
  useEffect(() => {
    if (!featuredBrands?.length || isDragging) return;
    
    const animationFrame = requestAnimationFrame(() => {
      setTranslateX(prev => {
        const maxTranslate = -(featuredBrands.length * (cardWidth + 24));
        const newTranslate = prev - 0.2; // Even slower for brand showcase
        
        // Reset to beginning when reached the end
        if (newTranslate <= maxTranslate) {
          return 0;
        }
        return newTranslate;
      });
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [featuredBrands?.length, cardWidth, isDragging, translateX]);

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
              <div key={i} className="flex-shrink-0 w-64 animate-pulse">
                <div className="h-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg mb-4" />
                <div className="space-y-2">
                  <div className="h-5 bg-neutral-200 dark:bg-neutral-700 w-full" />
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 w-32" />
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!featuredBrands?.length) return null;

  // Duplicate brands array for seamless loop
  const extendedBrands = [...featuredBrands, ...featuredBrands];

  return (
    <section className="py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Minimalist Header */}
        <div className="mb-8">
          <h2 className="text-xl font-light text-neutral-900 dark:text-neutral-100 mb-2">
            Featured Brands
          </h2>
        </div>

        {/* Clean Brand Showcase */}
        <div className="relative overflow-hidden">
          {/* Continuous Scrolling Container */}
          <div 
            className={`flex gap-6 transition-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              transform: `translateX(${translateX}px)`,
              width: `${extendedBrands.length * (cardWidth + 24)}px`,
              userSelect: 'none'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {extendedBrands.map((brand: any, index: number) => (
              <div 
                key={`${brand.id}-${index}`} 
                className="flex-shrink-0 w-32 sm:w-40"
              >
                <Link href={`/catalog?brand=${brand.slug}`}>
                  <div 
                    className="group cursor-pointer flex items-center justify-center h-16 hover:opacity-75 transition-opacity duration-200"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <img 
                      src={brand.logoUrl} 
                      alt={`${brand.name} logo`}
                      className="h-10 w-auto max-w-full object-contain opacity-60 dark:opacity-50 filter grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Subtle fade gradients on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neutral-50 to-transparent dark:from-neutral-900 pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-neutral-50 to-transparent dark:from-neutral-900 pointer-events-none z-10" />
        </div>


      </div>
    </section>
  );
}