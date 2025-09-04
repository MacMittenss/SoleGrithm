import React, { useRef, useEffect, ReactNode } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  sticky?: boolean;
  height?: string;
  background?: string;
  maskTransition?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}

export default function SectionWrapper({
  children,
  className = '',
  id,
  sticky = false,
  height = '100vh',
  background,
  maskTransition = false,
  onEnter,
  onLeave,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: false, amount: 0.4, margin: "-20% 0px -20% 0px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth entrance animations
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 1.05]);

  // Simplified content visibility - no complex overlay masking

  useEffect(() => {
    if (isInView && onEnter) {
      onEnter();
    } else if (!isInView && onLeave) {
      onLeave();
    }
  }, [isInView, onEnter, onLeave]);

  // GSAP-style section reveal animation
  useEffect(() => {
    if (!contentRef.current || !isInView) return;

    const ctx = gsap.context(() => {
      const elements = contentRef.current?.querySelectorAll('[data-animate]');
      if (!elements || elements.length === 0) return;

      gsap.set(elements, {
        y: 100,
        opacity: 0,
        scale: 0.95,
      });

      gsap.to(elements, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.1,
      });
    }, contentRef);

    return () => ctx.revert();
  }, [isInView]);

  const sectionStyle: React.CSSProperties = {
    height: sticky ? undefined : height,
    background: background || 'transparent',
    position: 'relative',
  };

  const stickyStyle: React.CSSProperties = sticky
    ? {
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }
    : {};

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`relative ${className}`}
      style={sectionStyle}
      data-testid={`section-${id}`}
    >
      {/* Overlay functionality removed to prevent homepage visibility issues */}

      <div style={stickyStyle} className={sticky ? 'flex flex-col' : ''}>
        <motion.div
          ref={contentRef}
          className="relative h-full"
          style={{
            y: sticky ? 0 : y,
            opacity: sticky ? 1 : opacity,
            scale: sticky ? 1 : scale,
            zIndex: 20,
          }}
          initial={{
            opacity: sticky ? 1 : 0,
            y: sticky ? 0 : 50,
            scale: sticky ? 1 : 0.95,
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}