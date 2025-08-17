import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import sneakerImage from '@assets/generated_images/Transparent_background_sneaker_8c24cd73.png';

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
        fontFamily: 'Space Grotesk, sans-serif',
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
            {/* Main heading - Minimalistic */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white"
              data-animate
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Welcome to SoleGrithm
            </motion.h1>

            {/* Subtitle paragraph */}
            <motion.p 
              className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-lg"
              data-animate
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Discover your next favorite sneaker with AI-powered recommendations and real-time market insights.
            </motion.p>
          </motion.div>

          {/* Right column - Sneaker image with no background */}
          <motion.div
            className="relative flex items-center justify-center lg:justify-end"
            style={{ y: imageY }}
          >
            <motion.img
              ref={imageRef}
              src={sneakerImage}
              alt="Sneaker"
              className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-auto object-contain"
              style={{
                filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.3))',
              }}
              data-testid="hero-sneaker-image"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}