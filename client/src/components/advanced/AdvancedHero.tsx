import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import heroImage from '@assets/generated_images/Premium_sneaker_hero_shot_fb19956c.png';

export default function AdvancedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const isInView = useInView(containerRef, { once: true });

  // Subtle parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Entrance animations
  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // Animate text content entrance
      if (textRef.current) {
        gsap.fromTo(textRef.current.children, 
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15,
            delay: 0.2
          }
        );
      }

      // Animate image entrance
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, 
          { x: 80, opacity: 0, scale: 0.95 },
          { 
            x: 0, 
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.4
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 sm:px-8 lg:px-12"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
      }}
      data-testid="hero-section"
    >
      {/* Two-column layout - VITURE style */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen">
          
          {/* Left column - Text content */}
          <motion.div
            ref={textRef}
            className="flex flex-col justify-center space-y-6 lg:space-y-8 py-20 lg:py-0"
            style={{ opacity: textOpacity }}
          >
            {/* Product name/label */}
            <motion.div
              className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm w-fit"
              data-animate
            >
              <span className="text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wide">
                SoleGrithm
              </span>
            </motion.div>

            {/* Main heading - VITURE style */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              data-animate
            >
              <span className="block text-white mb-2">Illuminate</span>
              <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
                Your Sneaker
              </span>
              <span className="block text-white">Journey</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-lg"
              data-animate
            >
              The most advanced platform for sneaker discovery, powered by AI and driven by community passion.
            </motion.p>

            {/* Key features */}
            <motion.div 
              className="space-y-3 text-white/60"
              data-animate
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm sm:text-base">AI-Powered Recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm sm:text-base">Real-Time Market Data</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-sm sm:text-base">Visual Search Technology</span>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              data-animate
            >
              <Link href="/discover">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 px-8 py-4 text-base font-semibold transition-all duration-300"
                  data-testid="discover-cta"
                >
                  Discover Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/visual-search">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm px-8 py-4 text-base font-medium transition-all duration-300"
                  data-testid="visual-search-cta"
                >
                  Try Visual Search
                </Button>
              </Link>
            </motion.div>

            {/* Pricing info - VITURE style */}
            <motion.div 
              className="pt-6 border-t border-white/10"
              data-animate
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  Free
                </div>
                <div className="text-sm text-white/60">
                  to start your journey
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Hero image */}
          <motion.div
            className="relative flex items-center justify-center lg:justify-end"
            style={{ y: imageY }}
          >
            <motion.img
              ref={imageRef}
              src={heroImage}
              alt="Premium Sneaker Hero"
              className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-auto object-contain"
              style={{
                filter: 'drop-shadow(0 25px 50px rgba(255, 65, 0, 0.3))',
              }}
              data-testid="hero-image"
            />
            
            {/* Subtle glow effect behind image */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-purple-600/20 blur-3xl -z-10 scale-75"
              style={{
                transform: 'translateY(20%)',
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}