import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import futuristicSneakerImage from '@assets/transparent-Photoroom_1755556579483.png';
import SplitText from './SplitText';
import GradientText from './GradientText';
import BlurryGradient from './BlurryGradient';
import MarqueeText from './MarqueeText';

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
          {/* Main heading - VITURE Season Sans style */}
          <div className="text-left space-y-3" style={{ 
            fontFamily: '"SF Pro Display", "Helvetica Neue", "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
            fontWeight: 450,
            letterSpacing: '0.02em'
          }}>
            {/* Welcome To - First Line */}
            <div>
              <SplitText
                className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.85] text-white"
                type="words"
                stagger={0.05}
                delay={0.5}
              >
                Welcome To
              </SplitText>
            </div>

            {/* SoleGrithm - Second Line with Gradient */}
            <div>
              <GradientText className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.85] font-bold">
                SoleGrithm
              </GradientText>
            </div>
          </div>

          {/* Subtitle */}
          <div className="max-w-lg">
            <SplitText
              className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed"
              type="words"
              stagger={0.03}
              delay={1}
            >
              Discover, Collect, and Connect Through AI-Powered Sneaker Intelligence
            </SplitText>
          </div>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 pt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <Link href="/discover">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold transform hover:scale-105 transition-all duration-200"
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
                className="border-white/30 text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-200"
                data-testid="button-visual-search"
              >
                Try Visual Search
              </Button>
            </Link>
          </motion.div>

          {/* Marquee Text */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <MarqueeText
              text="AI-POWERED • COMMUNITY-DRIVEN • FUTURE-READY • SNEAKER CULTURE • "
              className="text-white/40 text-sm font-medium"
              speed={30}
            />
          </motion.div>
        </motion.div>

        {/* Right side - Image with floating elements */}
        <motion.div
          ref={imageRef}
          className="absolute right-8 lg:right-16 bottom-32 max-w-lg relative z-0"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "15%"]) }}
        >
          {/* Main sneaker image */}
          <motion.img
            src={futuristicSneakerImage}
            alt="Futuristic Sneaker"
            className="w-full h-auto object-contain"
            style={{
              filter: 'drop-shadow(0 25px 50px rgba(255, 41, 0, 0.3))',
            }}
          />
          
          {/* Floating UI Elements */}
          <motion.div
            className="absolute -top-8 -left-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
            data-float
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
            <div className="text-white/70 text-xs">Perfect for you</div>
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -right-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-4 border border-orange-500/30"
            data-float
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
            <div className="text-white/70 text-xs">Try it on</div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 -left-12 bg-blue-500/20 backdrop-blur-sm rounded-xl p-3 border border-blue-500/30"
            data-float
            animate={{
              x: [-5, 5, -5],
              rotation: [0, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          >
            <div className="text-white text-xs font-medium">Live Price</div>
            <div className="text-green-400 text-sm font-bold">$250</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Blurry gradient overlay */}
      <BlurryGradient
        className="absolute bottom-0 left-0 w-full h-32"
        colors={['rgba(255, 41, 0, 0.1)', 'rgba(88, 29, 255, 0.1)']}
        blur={60}
      />
    </motion.div>
  );
}