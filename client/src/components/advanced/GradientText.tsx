import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  blur?: boolean;
  animate?: boolean;
}

export default function GradientText({ 
  children, 
  className = '',
  blur = false,
  animate = true 
}: GradientTextProps) {
  const gradientStyle = {
    background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    fontWeight: 700,
  };

  if (blur) {
    return (
      <span className={`relative inline-block ${className}`}>
        {/* Blurred background */}
        <span
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            ...gradientStyle,
            filter: 'blur(30px)',
          }}
        >
          {children}
        </span>
        {/* Sharp foreground */}
        <span className="relative" style={gradientStyle}>
          {children}
        </span>
      </span>
    );
  }

  if (animate) {
    return (
      <motion.span
        className={`inline-block ${className}`}
        style={gradientStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={`inline-block ${className}`} style={gradientStyle}>
      {children}
    </span>
  );
}