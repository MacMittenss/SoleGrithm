import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValue } from 'framer-motion';

interface ScrollPinOptions {
  threshold?: number;
  duration?: number;
  onPinStart?: () => void;
  onPinEnd?: () => void;
  onAnimationComplete?: () => void;
}

export function useScrollPin(options: ScrollPinOptions = {}) {
  const {
    threshold = 0.1,
    duration = 2000,
    onPinStart,
    onPinEnd,
    onAnimationComplete
  } = options;

  const containerRef = useRef<HTMLElement>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Track scroll position to determine pin state
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (progress >= threshold && !isPinned && !isAnimationComplete) {
        setIsPinned(true);
        onPinStart?.();
      } else if (progress < threshold && isPinned) {
        setIsPinned(false);
        onPinEnd?.();
      }
    });

    return unsubscribe;
  }, [scrollYProgress, threshold, isPinned, isAnimationComplete, onPinStart, onPinEnd]);

  // Animation progress tracking
  useEffect(() => {
    if (!isPinned) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimationProgress(progress);
      
      if (progress >= 1) {
        setIsAnimationComplete(true);
        onAnimationComplete?.();
      } else {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isPinned, duration, onAnimationComplete]);

  // Reset animation state when scrolling back up
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (progress < threshold * 0.5) {
        setAnimationProgress(0);
        setIsAnimationComplete(false);
      }
    });

    return unsubscribe;
  }, [scrollYProgress, threshold]);

  return {
    containerRef,
    isPinned,
    animationProgress,
    isAnimationComplete,
    scrollYProgress
  };
}