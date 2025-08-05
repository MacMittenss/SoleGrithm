import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotate?: number;
  glowEffect?: boolean;
  shadowIntensity?: 'sm' | 'md' | 'lg' | 'xl';
  borderGradient?: boolean;
}

export function HoverCard({
  children,
  className,
  hoverScale = 1.02,
  hoverRotate = 0,
  glowEffect = false,
  shadowIntensity = 'md',
  borderGradient = false
}: HoverCardProps) {
  const shadowClasses = {
    sm: 'hover:shadow-sm',
    md: 'hover:shadow-md',
    lg: 'hover:shadow-lg',
    xl: 'hover:shadow-xl'
  };

  return (
    <motion.div
      className={cn(
        "relative transition-all duration-300 cursor-pointer",
        shadowClasses[shadowIntensity],
        borderGradient && "p-[1px] bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-lg",
        className
      )}
      whileHover={{
        scale: hoverScale,
        rotate: hoverRotate,
        y: -2,
        ...(glowEffect && {
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
        })
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
    >
      {borderGradient ? (
        <div className="bg-background rounded-lg h-full w-full">
          {children}
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
}