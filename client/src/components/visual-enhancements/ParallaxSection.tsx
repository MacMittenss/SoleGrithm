import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ParallaxSection({
  children,
  className,
  offset = 50,
  speed = 0.5,
  direction = 'up'
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const transforms = {
    up: useTransform(scrollYProgress, [0, 1], [offset, -offset]),
    down: useTransform(scrollYProgress, [0, 1], [-offset, offset]),
    left: useTransform(scrollYProgress, [0, 1], [offset, -offset]),
    right: useTransform(scrollYProgress, [0, 1], [-offset, offset])
  };

  const transform = transforms[direction];

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{
        ...(direction === 'up' || direction === 'down' ? { y: transform } : {}),
        ...(direction === 'left' || direction === 'right' ? { x: transform } : {})
      }}
    >
      {children}
    </motion.div>
  );
}