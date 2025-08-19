import React, { useRef, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useScrollPin } from '@/hooks/useScrollPin';

interface ScrollPinnedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  height?: string;
  animationElements?: string[]; // CSS selectors for elements to animate
  staggerDelay?: number;
  onAnimationComplete?: () => void;
}

export default function ScrollPinnedSection({
  children,
  className = '',
  id,
  height = '100vh',
  animationElements = [],
  staggerDelay = 0.2,
  onAnimationComplete,
}: ScrollPinnedSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    containerRef,
    isPinned,
    animationProgress,
    isAnimationComplete,
  } = useScrollPin({
    threshold: 0.1,
    duration: 2000,
    onAnimationComplete,
  });

  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Staggered animation effect
  useEffect(() => {
    if (!contentRef.current || !isPinned) return;

    const elements = contentRef.current.querySelectorAll('[data-scroll-animate]');
    if (!elements || elements.length === 0) return;

    elements.forEach((element, index) => {
      const delay = index * staggerDelay;
      const startProgress = delay / 2; // Start animation based on delay
      const endProgress = startProgress + 0.5; // Animation duration in progress terms
      
      const elementProgress = Math.max(0, Math.min(1, 
        (animationProgress - startProgress) / (endProgress - startProgress)
      ));

      const htmlElement = element as HTMLElement;
      
      // Apply transforms based on progress
      const translateY = (1 - elementProgress) * 60;
      const opacity = elementProgress;
      const scale = 0.9 + (elementProgress * 0.1);

      htmlElement.style.transform = `translateY(${translateY}px) scale(${scale})`;
      htmlElement.style.opacity = opacity.toString();
    });
  }, [isPinned, animationProgress, staggerDelay]);

  // Set containerRef to be the same as sectionRef
  useEffect(() => {
    if (sectionRef.current && containerRef) {
      (containerRef as any).current = sectionRef.current;
    }
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative ${className}`}
      style={{
        height,
        position: isPinned ? 'sticky' : 'relative',
        top: isPinned ? 0 : 'auto',
        zIndex: isPinned ? 10 : 1,
      }}
      data-testid={`section-${id}`}
    >
      <motion.div
        ref={contentRef}
        className="relative h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isInView ? 1 : 0,
        }}
        style={{
          backgroundColor: isPinned ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.6 }}
      >
        {children}
        
        {/* Progress indicator when pinned */}
        {isPinned && !isAnimationComplete && (
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">
                  Loading {Math.round(animationProgress * 100)}%
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
}