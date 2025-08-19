import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface HeroScrollOverlayProps {
  children: React.ReactNode;
  nextSection: React.ReactNode;
}

export default function HeroScrollOverlay({ children, nextSection }: HeroScrollOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    layoutEffect: false
  });

  // Smooth spring-based progress for fluid animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Hero section blur and scale effects
  const heroBlur = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0, 2, 8, 15]);
  const heroScale = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [1, 0.98, 0.9, 0.8]);
  const heroY = useTransform(smoothProgress, [0, 0.5, 1], [0, -20, -100]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.6, 0.9, 1], [1, 0.8, 0.3, 0]);

  // Clockwise rotating overlay from bottom-right
  const overlayScale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 0.1, 1.2, 1.5]);
  const overlayRotate = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [45, 25, 5, 0]);
  const overlayX = useTransform(smoothProgress, [0, 0.4, 1], [100, 50, 0]);
  const overlayY = useTransform(smoothProgress, [0, 0.4, 1], [100, 50, 0]);
  const overlayOpacity = useTransform(smoothProgress, [0, 0.1, 0.3, 1], [0, 0.3, 0.8, 1]);

  // Next section reveal
  const nextSectionY = useTransform(smoothProgress, [0, 0.5, 0.8, 1], [100, 80, 20, 0]);
  const nextSectionOpacity = useTransform(smoothProgress, [0, 0.4, 0.7, 1], [0, 0, 0.5, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section with Scroll Effects */}
      <motion.div
        ref={heroRef}
        className="relative z-10 sticky top-0"
        style={{
          filter: `blur(${heroBlur}px)`,
          scale: heroScale,
          y: heroY,
          opacity: heroOpacity,
        }}
      >
        {children}
      </motion.div>

      {/* Clockwise Rotating Black Overlay */}
      <motion.div
        className="fixed inset-0 z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom right, #000000 0%, #000000 60%, transparent 100%)',
          scale: overlayScale,
          rotate: overlayRotate,
          x: overlayX,
          y: overlayY,
          opacity: overlayOpacity,
          transformOrigin: 'bottom right',
        }}
      />

      {/* Geometric Pattern Overlay for VITURE Effect */}
      <motion.div
        className="fixed inset-0 z-25 pointer-events-none"
        style={{
          background: `
            linear-gradient(45deg, transparent 48%, rgba(0,0,0,0.8) 49%, rgba(0,0,0,0.8) 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(0,0,0,0.6) 49%, rgba(0,0,0,0.6) 51%, transparent 52%)
          `,
          backgroundSize: '40px 40px',
          scale: overlayScale,
          rotate: overlayRotate,
          x: overlayX,
          y: overlayY,
          opacity: useTransform(overlayOpacity, [0, 1], [0, 0.3]),
          transformOrigin: 'bottom right',
        }}
      />

      {/* Next Section with Reveal Animation */}
      <motion.div
        className="relative z-30 min-h-screen"
        style={{
          y: nextSectionY,
          opacity: nextSectionOpacity,
        }}
      >
        {nextSection}
      </motion.div>

      {/* Spacer to create scroll distance */}
      <div className="h-[200vh]" />
    </div>
  );
}