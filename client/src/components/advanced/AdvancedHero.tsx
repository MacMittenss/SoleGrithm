import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import heroSneakerImage from '@assets/generated_images/Premium_hero_sneaker_product_b50a2183.png';

export default function AdvancedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const isInView = useInView(containerRef, { once: true });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Background gradient animation and entrance animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate gradient background - pulsating effect
      gsap.to(containerRef.current, {
        background: 'radial-gradient(ellipse at center, rgba(255, 41, 0, 0.15) 0%, rgba(254, 122, 96, 0.08) 35%, rgba(88, 29, 255, 0.15) 100%)',
        duration: 3,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Floating elements animation
      const floatingElements = containerRef.current?.querySelectorAll('[data-float]');
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

      // Entrance animations when in view
      if (isInView) {
        // Animate text entrance
        if (textRef.current) {
          gsap.fromTo(textRef.current.children, 
            { 
              y: 100, 
              opacity: 0 
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              stagger: 0.2,
              delay: 0.3
            }
          );
        }

        // Animate sneaker image
        if (imageRef.current) {
          gsap.fromTo(imageRef.current, 
            { 
              x: 200, 
              opacity: 0,
              scale: 0.8
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: 'power3.out',
              delay: 0.6
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden px-8 lg:px-16"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.98))',
      }}
      data-testid="hero-section"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]) }}
      >
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

      {/* VITURE-style layout: Text left, Image right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        
        {/* Left side - Text Content */}
        <motion.div
          ref={textRef}
          className="flex flex-col justify-center space-y-8"
          style={{ y, opacity }}
        >
          {/* Main heading - VITURE style */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-none tracking-tight text-white">
              Welcome
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-none tracking-tight text-white">
              to
            </h1>
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-none tracking-tight"
              style={{
                background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              SoleGrithm
            </h1>
          </div>

          {/* CTA Button - minimal VITURE style */}
          <div className="pt-8">
            <Link href="/discover">
              <Button
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
                data-testid="hero-cta-button"
              >
                Explore Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Right side - Hero Sneaker Image */}
        <motion.div
          ref={imageRef}
          className="flex justify-center lg:justify-end items-center"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"]) }}
        >
          <div className="relative">
            {/* Hero sneaker image */}
            <motion.img
              src={heroSneakerImage}
              alt="Premium sneaker"
              className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-auto object-contain"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.6, ease: "easeOut" }
              }}
            />
            
            {/* Subtle glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255, 41, 0, 0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}