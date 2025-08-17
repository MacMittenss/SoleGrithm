import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import SplitText from './SplitText';
import GradientText from './GradientText';

export default function AdvancedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const isInView = useInView(containerRef, { once: true });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Background gradient animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate gradient background
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.98))',
      }}
      data-testid="hero-section"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ scale }}
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

      {/* Main content */}
      <motion.div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 text-center"
        style={{ y, opacity }}
      >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(255, 41, 0, 0.1)',
              border: '1px solid rgba(255, 41, 0, 0.2)',
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">AI-Powered Sneaker Discovery</span>
          </motion.div>
        </motion.div>

        {/* Main headline with split text animation */}
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            <SplitText
              className="block"
              type="words"
              delay={0.5}
              staggerDelay={0.1}
            >
              Discover Your Perfect
            </SplitText>
            <GradientText className="block" animate={true}>
              Sneaker Match
            </GradientText>
          </h1>
          
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Where AI meets passion. Explore, collect, and connect in the world's most 
            intelligent sneaker community platform.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <Link href="/discovery">
            <motion.button
              className="group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden"
              style={{
                background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-start-discovery"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Discovering
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>

          <motion.button
            className="group flex items-center gap-3 px-6 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="button-watch-demo"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Play className="w-5 h-5 ml-0.5" />
            </div>
            <span className="font-medium">Watch Demo</span>
          </motion.button>
        </motion.div>

        {/* Floating stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
        >
          {[
            { value: '50K+', label: 'Sneaker Models' },
            { value: '15+', label: 'Brand Partners' },
            { value: '99%', label: 'AI Accuracy' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              data-float
              whileHover={{ scale: 1.1 }}
            >
              <div
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}