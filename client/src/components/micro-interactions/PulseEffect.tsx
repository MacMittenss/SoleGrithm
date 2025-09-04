import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PulseEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  continuous?: boolean;
  trigger?: boolean;
}

export function PulseEffect({
  children,
  className,
  intensity = 'medium',
  color = 'primary',
  continuous = false,
  trigger = false
}: PulseEffectProps) {
  const intensityScale = {
    subtle: 1.02,
    medium: 1.05,
    strong: 1.1
  };

  const colorRings = {
    primary: 'ring-primary/50',
    success: 'ring-green-500/50',
    warning: 'ring-yellow-500/50',
    danger: 'ring-red-500/50'
  };

  const pulseVariants = {
    initial: { 
      scale: 1,
      boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)'
    },
    pulse: {
      scale: [1, intensityScale[intensity], 1],
      boxShadow: [
        '0 0 0 0 rgba(59, 130, 246, 0.7)',
        '0 0 0 10px rgba(59, 130, 246, 0)',
        '0 0 0 0 rgba(59, 130, 246, 0)'
      ]
    }
  };

  return (
    <motion.div
      className={cn("relative", className)}
      variants={pulseVariants}
      initial="initial"
      animate={continuous || trigger ? "pulse" : "initial"}
      transition={{
        duration: 1.5,
        repeat: continuous ? Infinity : trigger ? 1 : 0,
        ease: "easeInOut"
      }}
    >
      {children}
      
      {/* Ring effect overlay */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full ring-2",
          colorRings[color]
        )}
        initial={{ opacity: 0, scale: 1 }}
        animate={continuous || trigger ? {
          opacity: [0, 0.7, 0],
          scale: [1, 1.2, 1.4]
        } : {}}
        transition={{
          duration: 1.5,
          repeat: continuous ? Infinity : trigger ? 1 : 0,
          ease: "easeOut"
        }}
      />
    </motion.div>
  );
}