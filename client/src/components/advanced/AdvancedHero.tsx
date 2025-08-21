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



      // Background gradient animation (independent)
      gsap.to(heroRef.current, {
        background: 'radial-gradient(ellipse at center, rgba(255, 41, 0, 0.15) 0%, rgba(254, 122, 96, 0.08) 35%, rgba(88, 29, 255, 0.15) 100%)',
        duration: 3,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Floating elements animation
      const floatingElements = heroRef.current?.querySelectorAll('[data-float]');
      if (floatingElements) {
        gsap.to(floatingElements, {
          y: 'random(-20, 20)',
          rotation: 'random(-5, 5)',
          duration: 'random(3, 5)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.5,
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
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Gradient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
            filter: 'blur(100px)',
          }}
          data-float
        />
        
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
          style={{
            background: 'linear-gradient(to right, #581dff 0%, #fe7a60 61%, #ff2900 100%)',
            filter: 'blur(80px)',
          }}
          data-float
        />
      </div>

      {/* Hero Text Content */}
      <div
        ref={heroTextRef}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <div className="text-center space-y-8">
          {/* Main heading */}
          <div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] text-white">
              Welcome To
            </h1>
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              SoleGrithm
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto">
            Discover, Collect, and Connect Through AI-Powered Sneaker Intelligence
          </p>


        </div>
      </div>
    </div>
  );
}