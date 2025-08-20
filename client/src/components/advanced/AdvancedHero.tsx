import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import futuristicSneakerImage from '@assets/transparent-Photoroom_1755556579483.png';
import womenSneakersImage from "@assets/generated_images/Woman_in_stylish_sneakers_90ff70fb.png";
import arTryonImage from "@assets/generated_images/AR_sneaker_try-on_technology_732da862.png";
import SplitText from './SplitText';
import GradientText from './GradientText';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AdvancedHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const nextTextRef = useRef<HTMLDivElement>(null);
  const nextImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !nextSectionRef.current) return;

    const ctx = gsap.context(() => {
      // Create the main scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=200%", // Extended scroll distance for detailed animations
          pin: true,
          scrub: 1, // Smooth scrubbing tied to scroll
          anticipatePin: 1,
          onUpdate: (self) => {
            console.log("Scroll progress:", self.progress);
          }
        }
      });

      // Phase 1: Hero Logo/Tagline Fade Out (0% - 30% of scroll)
      tl.to([logoRef.current, taglineRef.current], {
        scale: 0.8,
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1
      }, 0)

      // Phase 2: Next Section Background Fade In (20% - 40% of scroll)
      .fromTo(nextSectionRef.current, {
        opacity: 0,
        scale: 0.9
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, 0.5)

      // Phase 3: Next Section Text Reveal - Line by Line (40% - 70% of scroll)
      .fromTo(nextTextRef.current?.children || [], {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2
      }, 1.2)

      // Phase 4: Image Materialization (60% - 90% of scroll)
      .fromTo(nextImageRef.current, {
        scale: 0.7,
        opacity: 0,
        rotationY: 15
      }, {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "power3.out"
      }, 1.8)

      // Phase 5: Final Polish - Subtle Enhancements (80% - 100% of scroll)
      .to(nextSectionRef.current, {
        filter: "brightness(1.1)",
        duration: 0.5,
        ease: "power1.out"
      }, 2.5);

      // Background gradient animation (independent of scroll)
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative">
      {/* Hero Section - Start State */}
      <motion.div
        className="relative min-h-screen flex items-center overflow-hidden px-8 lg:px-16"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.98))',
        }}
        data-testid="hero-section"
      >
        {/* Animated background elements */}
        <motion.div className="absolute inset-0 opacity-20">
          {/* Gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{
              background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
              filter: 'blur(100px)',
            }}
            data-float
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
            style={{
              background: 'linear-gradient(to right, #581dff 0%, #fe7a60 61%, #ff2900 100%)',
              filter: 'blur(80px)',
            }}
            data-float
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </motion.div>

        {/* Hero Content - Logo and Tagline */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div ref={logoRef}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] text-white">
                <SplitText type="words" stagger={0.05} delay={0.5}>
                  SoleGrithm
                </SplitText>
              </h1>
            </div>

            {/* Tagline */}
            <div ref={taglineRef}>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto">
                <SplitText type="words" stagger={0.03} delay={1}>
                  AI-Powered Sneaker Discovery Platform
                </SplitText>
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Next Section - Sub-Hero Display */}
      <div
        ref={nextSectionRef}
        className="absolute inset-0 opacity-0"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 10, 20, 0.95), rgba(30, 20, 40, 0.98))',
        }}
      >
        <div className="h-full flex items-center px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">
            
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center space-y-8 relative z-10">
              <div ref={nextTextRef} className="space-y-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  <GradientText>Discover</GradientText>
                </h2>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  Your Perfect Sneakers
                </h3>
                <p className="text-lg md:text-xl text-gray-300 max-w-xl">
                  Experience the future of sneaker discovery with AI-powered recommendations, 
                  visual search, and immersive AR try-on technology.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/discover">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                      data-testid="button-discover"
                    >
                      Start Discovering
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/visual-search">
                    <Button 
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10"
                      data-testid="button-visual-search"
                    >
                      Try Visual Search
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Visual Display */}
            <div ref={nextImageRef} className="relative flex items-center justify-center">
              <div className="relative">
                <motion.img
                  src={futuristicSneakerImage}
                  alt="Futuristic Sneaker"
                  className="w-full max-w-lg h-auto object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                
                {/* Floating UI Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  animate={{
                    y: [0, -10, 0],
                    rotation: [0, 2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="text-white text-sm font-medium">AI Match: 98%</div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-4 border border-orange-500/30"
                  animate={{
                    y: [0, 10, 0],
                    rotation: [0, -2, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                >
                  <div className="text-white text-sm font-medium">AR Ready</div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}