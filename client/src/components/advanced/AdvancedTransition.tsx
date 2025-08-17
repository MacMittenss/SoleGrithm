import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AdvancedTransitionProps {
  children: React.ReactNode;
  id: string;
  nextId?: string;
}

export default function AdvancedTransition({ children, id, nextId }: AdvancedTransitionProps) {
  const targetRef = React.useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // VITURE-style horizontal wipe transition
  const wipeProgress = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const clipPath = useTransform(
    wipeProgress,
    [0, 1],
    [
      'polygon(0 0, 0 0, 0 100%, 0% 100%)', // Start from left, no reveal
      'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' // Full reveal
    ]
  );

  return (
    <motion.div
      ref={targetRef}
      className="relative h-screen"
      style={{
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }}
    >
      {/* Current section content */}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath,
        }}
      >
        {children}
      </motion.div>

      {/* Black overlay that wipes in */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{
          clipPath: useTransform(
            wipeProgress,
            [0, 1],
            [
              'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', // Hidden on right
              'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' // Covers everything
            ]
          ),
        }}
      />
    </motion.div>
  );
}