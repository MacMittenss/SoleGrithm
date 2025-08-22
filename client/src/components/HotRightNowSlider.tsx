import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, TrendingUp, Flame, Sparkles, Archive, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/advanced/SplitText';
import GradientText from '@/components/advanced/GradientText';
import SectionWrapper from '@/components/SectionWrapper';
import jordanLogo from '@assets/image_1755038304265.png';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

  // GSAP ScrollTrigger Animation Setup
  useEffect(() => {
    if (!sectionRef.current || !gridRef.current || !headingRef.current || isLoading || !featuredBrands.length) return;

    const ctx = gsap.context(() => {
      // Pin the section during scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });

      // Heading fade out animation
      gsap.to(headingRef.current, {
        opacity: 0,
        y: -100,
        scale: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Brand logos staggered reveal animation with delayed start
      const logoItems = gridRef.current?.querySelectorAll('[data-brand-logo]');
      if (logoItems) {
        gsap.fromTo(logoItems,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15, // Slightly slower stagger for better visibility
            ease: "back.out(1.7)",
            delay: 1.5, // Delay to let header/subheader animations complete first
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%", // Start animation when section is 60% in view
              end: "bottom center",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Background gradient animation
      const backgroundElements = sectionRef.current?.querySelectorAll('[data-bg-animate]');
      if (backgroundElements) {
        gsap.to(backgroundElements, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading, featuredBrands]);

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
      'Jordan': jordanLogo,
      'New Balance': 'https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Logo.png',
      'Converse': 'https://logos-world.net/wp-content/uploads/2020/06/Converse-Logo.png',
      'Vans': 'https://logos-world.net/wp-content/uploads/2020/04/Vans-Logo.png',
      'Puma': 'https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png',
      'Reebok': 'https://logos-world.net/wp-content/uploads/2020/04/Reebok-Logo.png',
      'ASICS': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="60" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="#ffffff">ASICS</text></svg>')}`,
      'Balenciaga': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40"><text x="80" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="normal" fill="#ffffff">BALENCIAGA</text></svg>')}`,
      'Golden Goose': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 40"><text x="90" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="normal" fill="#ffffff">GOLDEN GOOSE</text></svg>')}`,
      'Off-White': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40"><text x="70" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" font-weight="bold" fill="#ffffff">OFF-WHITE</text></svg>')}`,
      'Gucci': 'https://logos-world.net/wp-content/uploads/2020/04/Gucci-Logo.png',
      'Saint Laurent': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 40"><text x="90" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="normal" fill="#ffffff">SAINT LAURENT</text></svg>')}`,
      'Common Projects': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40"><text x="100" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="normal" fill="#ffffff">COMMON PROJECTS</text></svg>')}`,
      'GOAT': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40"><text x="50" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="#ffffff">GOAT</text></svg>')}`,
      'StockX': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="60" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="#00AC7C">StockX</text></svg>')}`,
      'Flight Club': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40"><text x="70" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="#ffffff">FLIGHT CLUB</text></svg>')}`,
      'Stadium Goods': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40"><text x="80" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="bold" fill="#ffffff">STADIUM GOODS</text></svg>')}`,
      'Grailed': `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="60" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="#ffffff">GRAILED</text></svg>')}`
    };

    return logos[brandName] || `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><rect width="120" height="40" fill="transparent"/><text x="60" y="25" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#ffffff">${brandName}</text></svg>`)}`;
  }

  // Loading state
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

  return (
    <SectionWrapper
      id="featured-brands"
      sticky={true}
      maskTransition={false}
      className="relative"
      height="100vh"
    >
      <div
        ref={sectionRef}
        className="min-h-screen flex items-center overflow-hidden px-8 lg:px-16"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 30, 0.98))',
        }}
        data-testid="featured-brands-section"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle, #fe7a60 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            data-bg-animate
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full"
            style={{
              background: 'radial-gradient(circle, #581dff 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            data-bg-animate
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          {/* Section Header */}
          <div
            ref={headingRef}
            className="text-center mb-16"
          >


            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.8] mb-6 text-white">
              <SplitText type="words" delay={0.2}>
                Iconic Brands
              </SplitText>
              <br />
              <GradientText className="block">
                We Work With
              </GradientText>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              <SplitText type="words" delay={0.4}>
                Discover the most influential sneaker brands shaping culture and setting trends worldwide
              </SplitText>
            </p>
          </div>

          {/* Brands Grid - All Brands */}
          <div
            ref={gridRef}
            className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-6 max-w-7xl mx-auto items-center"
          >
            {featuredBrands.map((brand: any, index: number) => (
              <Link key={brand.id} href={`/catalog?brand=${brand.slug}`}>
                <div
                  data-brand-logo
                  className="group cursor-pointer flex items-center justify-center h-12 md:h-16"
                  data-testid={`brand-logo-${brand.slug}`}
                >
                  <img
                    src={brand.logoUrl}
                    alt={`${brand.name} logo`}
                    className="w-auto max-w-full h-6 md:h-8 object-contain opacity-80 filter brightness-0 invert hover:opacity-100 transition-all duration-500 hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `data:image/svg+xml,${encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40" viewBox="0 0 120 40">
                          <rect width="120" height="40" fill="transparent"/>
                          <text x="60" y="25" font-family="Arial, sans-serif" font-size="12" fill="#ffffff" text-anchor="middle">${brand.name}</text>
                        </svg>
                      `)}`;
                    }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}