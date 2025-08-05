import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02
  }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3
};

export function PageTransition({ children, className }: PageTransitionProps) {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Slide transition for mobile navigation
export function SlideTransition({ children, direction = 'right' }: { 
  children: React.ReactNode; 
  direction?: 'left' | 'right' | 'up' | 'down' 
}) {
  const [location] = useLocation();

  const directionVariants = {
    left: {
      initial: { x: '-100%', opacity: 0 },
      in: { x: 0, opacity: 1 },
      out: { x: '100%', opacity: 0 }
    },
    right: {
      initial: { x: '100%', opacity: 0 },
      in: { x: 0, opacity: 1 },
      out: { x: '-100%', opacity: 0 }
    },
    up: {
      initial: { y: '-100%', opacity: 0 },
      in: { y: 0, opacity: 1 },
      out: { y: '100%', opacity: 0 }
    },
    down: {
      initial: { y: '100%', opacity: 0 },
      in: { y: 0, opacity: 1 },
      out: { y: '-100%', opacity: 0 }
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial="initial"
        animate="in"
        exit="out"
        variants={directionVariants[direction]}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}