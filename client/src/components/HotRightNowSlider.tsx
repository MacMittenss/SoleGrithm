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
    // Using logos-world.net consistently (same source as working Gucci logo)
    const logos: Record<string, string> = {
      'Nike': 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png',
      'Adidas': 'https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png',
      'Jordan': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><text x="20" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" font-weight="bold" fill="#000">⛹</text></svg>')}`,
      'New Balance': 'https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Logo.png',
      'Converse': 'https://logos-world.net/wp-content/uploads/2020/06/Converse-Logo.png',
      'Vans': 'https://logos-world.net/wp-content/uploads/2020/04/Vans-Logo.png',
      'Puma': 'https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png',
      'Reebok': 'https://logos-world.net/wp-content/uploads/2020/04/Reebok-Logo.png',
      'ASICS': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="60" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="#000">ASICS</text></svg>')}`,
      'Balenciaga': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40"><text x="80" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="normal" fill="#000">BALENCIAGA</text></svg>')}`,
      'Golden Goose': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 40"><text x="90" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="normal" fill="#000">GOLDEN GOOSE</text></svg>')}`,
      'Off-White': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40"><text x="70" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#000">OFF-WHITE</text></svg>')}`,
      'Gucci': 'https://logos-world.net/wp-content/uploads/2020/04/Gucci-Logo.png',
      'Saint Laurent': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 40"><text x="90" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="normal" fill="#000">SAINT LAURENT</text></svg>')}`,
      'Common Projects': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40"><text x="100" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="normal" fill="#000">COMMON PROJECTS</text></svg>')}`,
      'GOAT': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40"><text x="50" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="#000">GOAT</text></svg>')}`,
      'StockX': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="60" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="#00AC7C">StockX</text></svg>')}`,
      'Flight Club': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40"><text x="70" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#000">FLIGHT CLUB</text></svg>')}`,
      'Stadium Goods': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40"><text x="80" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="#000">STADIUM GOODS</text></svg>')}`,
      'Grailed': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="60" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="#000">GRAILED</text></svg>')}`
    };
    
    return logos[brandName] || `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><rect width="120" height="40" fill="#f9f9f9" stroke="#e5e5e5"/><text x="60" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#666">${brandName}</text></svg>`)}`;
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

  // Auto-scroll only when not dragging
  useEffect(() => {
    if (!featuredBrands?.length || isDragging) return;
    
    const interval = setInterval(() => {
      setTranslateX(prev => {
        const maxTranslate = -(featuredBrands.length * (cardWidth + 16));
        const newTranslate = prev - 0.5; // Smooth auto-scroll
        
        // Reset to beginning when reached the end
        if (newTranslate <= maxTranslate) {
          return 0;
        }
        return newTranslate;
      });
    }, 16); // 60fps

    return () => clearInterval(interval);
  }, [featuredBrands?.length, cardWidth, isDragging]);

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
    
    // Direct 1:1 mapping for responsive dragging
    setTranslateX(newTranslateX);
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
      <section className="py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-900 w-full">
        <div className="w-full">
          <div className="mb-8 text-center">
            <div className="h-5 bg-neutral-200 dark:bg-neutral-700 w-48 mb-2 animate-pulse mx-auto" />
          </div>
          <div className="flex gap-4 overflow-hidden w-full justify-center">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-28 sm:w-32 lg:w-36 animate-pulse">
                <div className="h-12 bg-neutral-200 dark:bg-neutral-700 rounded mb-2 flex items-center justify-center">
                  <div className="h-6 w-16 bg-neutral-300 dark:bg-neutral-600 rounded" />
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
    <section className="py-12 sm:py-16 bg-neutral-50 dark:bg-neutral-900 w-full">
      {/* Full Width Container */}
      <div className="w-full">
        {/* Minimalist Header - Centered */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-light text-neutral-900 dark:text-neutral-100 mb-2">
            Featured Brands
          </h2>
        </div>

        {/* Full Width Brand Showcase */}
        <div className="relative overflow-hidden w-full">
          {/* Continuous Scrolling Container */}
          <div 
            className={`flex gap-4 will-change-transform ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              width: `${extendedBrands.length * (cardWidth + 16)}px`,
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
                className="flex-shrink-0 w-28 sm:w-32 lg:w-36"
              >
                <Link href={`/catalog?brand=${brand.slug}`}>
                  <div 
                    className="group cursor-pointer flex items-center justify-center h-12 hover:opacity-75 transition-opacity duration-300"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <img 
                      src={brand.logoUrl} 
                      alt={`${brand.name} logo`}
                      className="h-8 w-auto max-w-full object-contain opacity-70 dark:opacity-60 filter grayscale hover:grayscale-0 hover:opacity-90 transition-all duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml,${encodeURIComponent(`
                          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40">
                            <rect width="120" height="40" fill="#f5f5f5" stroke="#d1d5db"/>
                            <text x="60" y="25" font-family="Arial, sans-serif" font-size="12" fill="#6b7280" text-anchor="middle">${brand.name}</text>
                          </svg>
                        `)}`;
                      }}
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Enhanced fade gradients on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-neutral-50 via-neutral-50/80 to-transparent dark:from-neutral-900 dark:via-neutral-900/80 pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-neutral-50 via-neutral-50/80 to-transparent dark:from-neutral-900 dark:via-neutral-900/80 pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}