import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import futuristicSneakerImage from '@assets/close-up-futuristic-sneakers (1)_1755555541238.jpg';

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
      <div className="relative z-10 w-full h-full flex items-end pb-32">
        
        {/* Left side - Text Content */}
        <motion.div
          ref={textRef}
          className="flex flex-col justify-end space-y-8 pl-8 lg:pl-16 max-w-2xl relative z-10"
          style={{ y, opacity }}
        >
          {/* Main heading - VITURE style */}
          <div className="text-left space-y-2">
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-none tracking-tight text-white">
              Welcome&nbsp;To
            </h1>
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-none tracking-tight">
              <span 
                style={{
                  background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Sole
              </span>
              <span className="text-white">Grithm</span>
            </h1>
          </div>

          {/* AI Discovery Message */}
          <div className="pt-8">
            <p className="text-white text-xl font-medium leading-relaxed max-w-lg">
              Meet the AI-powered sneaker discovery engine. Feed the Sole. Fuel the Algorithm.
            </p>
          </div>
        </motion.div>

        {/* Background Sneaker Image - Behind text, on top of gradient */}
        <motion.div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-50 z-0"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"]) }}
        >
          <img
            src={futuristicSneakerImage}
            alt="Futuristic sneaker background"
            className="w-auto h-screen max-h-[80vh] object-contain"
            style={{ filter: 'brightness(0.8)' }}
          />
        </motion.div>

      </div>
    </motion.div>
  );
}