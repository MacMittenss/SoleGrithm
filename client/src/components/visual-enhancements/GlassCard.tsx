import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  border?: boolean;
  glow?: boolean;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  blur = 'md',
  opacity = 0.1,
  border = true,
  glow = false,
  hover = false
}: GlassCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-lg overflow-hidden",
        blurClasses[blur],
        border && "border border-white/20 dark:border-white/10",
        glow && "shadow-lg shadow-purple-500/25 dark:shadow-purple-500/10",
        className
      )}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${opacity})`
      }}
      {...(hover && {
        whileHover: {
          scale: 1.02,
          backgroundColor: `rgba(255, 255, 255, ${opacity + 0.05})`
        },
        transition: { duration: 0.2 }
      })}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}