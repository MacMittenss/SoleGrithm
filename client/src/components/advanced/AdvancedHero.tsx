import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import futuristicSneakerImage from '@assets/transparent-Photoroom_1755556579483.png';
import SplitText from './SplitText';
import GradientText from './GradientText';
import BlurryGradient from './BlurryGradient';
import MarqueeText from './MarqueeText';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AdvancedHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Hero fade/scale out animation with pin
      gsap.to([heroTextRef.current], {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
        opacity: 0,
        y: -100,
        scale: 0.8,
        stagger: 0.2
      });



      // Subtle shimmer effect on background orbs
      const backgroundOrbs = heroRef.current?.querySelectorAll('[data-shimmer]');
      if (backgroundOrbs) {
        gsap.to(backgroundOrbs, {
          opacity: 'random(0.15, 0.25)',
          duration: 'random(4, 6)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 2,
        });
      }

      // Soft floating elements animation
      const floatingElements = heroRef.current?.querySelectorAll('[data-float]');
      if (floatingElements) {
        gsap.to(floatingElements, {
          x: 'random(-8, 8)',
          y: 'random(-8, 8)',
          rotation: 'random(-2, 2)',
          duration: 'random(6, 8)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 1.2,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="hero relative min-h-screen flex items-center overflow-hidden px-8 lg:px-16"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.98))',
      }}
      data-testid="hero-section"
    >
      {/* Dotted Grid Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Gradient orbs with subtle shimmer */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
            filter: 'blur(100px)',
          }}
          data-float
          data-shimmer
        />
        
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
          style={{
            background: 'linear-gradient(to right, #581dff 0%, #fe7a60 61%, #ff2900 100%)',
            filter: 'blur(80px)',
          }}
          data-float
          data-shimmer
        />
        
        {/* Additional subtle accent orbs */}
        <div
          className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full"
          style={{
            background: 'radial-gradient(circle, #fe7a60 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          data-shimmer
        />
        
        <div
          className="absolute bottom-1/3 left-1/2 w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, #581dff 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          data-shimmer
        />
      </div>

      {/* Hero Text Content */}
      <div
        ref={heroTextRef}
        className="relative z-10 w-full h-full flex items-end justify-start pb-64 pl-24"
      >
        <div className="text-left space-y-6 max-w-5xl">
          {/* Main heading */}
          <div className="pb-4 pl-2">
            <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-[0.8] text-white">
              Welcome To
            </h1>
            <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-[0.8] bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
              SoleGrithm
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 max-w-4xl font-light pb-6 pl-2">
            Discover, Collect, and Connect Through AI-Powered Sneaker Intelligence
          </p>
        </div>
      </div>
    </div>
  );
}