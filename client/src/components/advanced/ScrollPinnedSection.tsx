import { useRef, useEffect, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

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

  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Simple staggered animation effect on scroll into view
  useEffect(() => {
    if (!contentRef.current || !isInView) return;

    const elements = contentRef.current.querySelectorAll('[data-scroll-animate]');
    if (!elements || elements.length === 0) return;

    elements.forEach((element, index) => {
      const htmlElement = element as HTMLElement;
      const delay = index * staggerDelay * 1000; // Convert to milliseconds
      
      // Reset styles first
      htmlElement.style.transform = `translateY(60px) scale(0.9)`;
      htmlElement.style.opacity = '0';
      
      // Animate with delay
      setTimeout(() => {
        htmlElement.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        htmlElement.style.transform = `translateY(0px) scale(1)`;
        htmlElement.style.opacity = '1';
      }, delay);
    });

    // Call onAnimationComplete after all animations
    if (onAnimationComplete) {
      const totalDuration = elements.length * staggerDelay * 1000 + 800; // 800ms for last animation
      setTimeout(onAnimationComplete, totalDuration);
    }
  }, [isInView, staggerDelay, onAnimationComplete]);

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative ${className}`}
      style={{ height }}
      data-testid={`section-${id}`}
    >
      <motion.div
        ref={contentRef}
        className="relative h-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isInView ? 1 : 0,
        }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}