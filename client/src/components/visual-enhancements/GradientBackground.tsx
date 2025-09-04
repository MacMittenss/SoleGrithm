import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientBackgroundProps {
  variant?: 'subtle' | 'vibrant' | 'dark' | 'custom';
  animated?: boolean;
  className?: string;
  children?: React.ReactNode;
  customGradient?: string;
}

const gradientVariants = {
  subtle: 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20',
  vibrant: 'bg-gradient-to-br from-purple-500 via-pink-500 to-red-500',
  dark: 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900'
};

export function GradientBackground({
  variant = 'subtle',
  animated = false,
  className,
  children,
  customGradient
}: GradientBackgroundProps) {
  const gradientClass = customGradient || gradientVariants[variant];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Animated background */}
      {animated ? (
        <motion.div
          className={cn("absolute inset-0", gradientClass)}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% 200%"
          }}
        />
      ) : (
        <div className={cn("absolute inset-0", gradientClass)} />
      )}

      {/* Floating orbs for extra visual appeal */}
      {animated && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 30, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-1/2 left-3/4 w-16 h-16 bg-pink-400/20 rounded-full blur-xl"
            animate={{
              x: [0, -60, 0],
              y: [0, -40, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}