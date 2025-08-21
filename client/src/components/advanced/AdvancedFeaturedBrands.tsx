import React, { useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from './SplitText';
import GradientText from './GradientText';
import SectionWrapper from '@/components/SectionWrapper';
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { TrendingUp, Star, Users, Zap } from 'lucide-react';
import { Link } from 'wouter';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

interface Brand {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
}

const AdvancedFeaturedBrands: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const { data: brands, isLoading } = useQuery<Brand[]>({
    queryKey: ['/api/brands'],
  });

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current || !headingRef.current || isLoading) return;

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

      // Cards staggered reveal animation
      const cards = cardsRef.current?.querySelectorAll('[data-brand-card]');
      if (cards) {
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top center",
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
  }, [isLoading, brands]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const featuredBrands = brands?.slice(0, 8) || [];

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
          background: 'linear-gradient(135deg, rgba(5, 15, 25, 0.95), rgba(15, 5, 20, 0.98), rgba(20, 10, 30, 0.95))',
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
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(254, 122, 96, 0.1)',
                border: '1px solid rgba(254, 122, 96, 0.2)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Star className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">FEATURED BRANDS</span>
            </motion.div>

            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.8] mb-6">
              <SplitText type="words" delay={0.2}>
                Iconic Brands
              </SplitText>
              <br />
              <GradientText className="block">
                Defining Style
              </GradientText>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              <SplitText type="words" delay={0.4}>
                Discover the most influential sneaker brands shaping culture and setting trends worldwide
              </SplitText>
            </p>
          </div>

          {/* Brands Grid */}
          <div
            ref={cardsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {featuredBrands.map((brand, index) => (
              <Link key={brand.id} href={`/brands/${brand.slug}`}>
                <div
                  data-brand-card
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  data-testid={`brand-card-${brand.slug}`}
                >
                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, rgba(254, 122, 96, 0.1), rgba(88, 29, 255, 0.1))',
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                    {/* Brand Icon/Logo placeholder */}
                    <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-orange-400 to-purple-600 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {brand.name.charAt(0)}
                      </span>
                    </div>

                    {/* Brand Name */}
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {brand.name}
                    </h3>

                    {/* Trending Badge */}
                    <Badge
                      variant="outline"
                      className="bg-orange-500/10 border-orange-500/20 text-orange-400 text-xs"
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{Math.floor(Math.random() * 50) + 10}k</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        <span>{Math.floor(Math.random() * 20) + 5}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect border */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, transparent, rgba(254, 122, 96, 0.2), transparent)',
                      padding: '1px',
                    }}
                  >
                    <div
                      className="w-full h-full rounded-2xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                      }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AdvancedFeaturedBrands;