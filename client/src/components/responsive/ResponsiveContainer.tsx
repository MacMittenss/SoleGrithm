import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centerContent?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function ResponsiveContainer({
  children,
  className,
  size = 'xl',
  centerContent = false,
  padding = 'md',
  animated = false
}: ResponsiveContainerProps) {
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-4 sm:px-6 lg:px-8 xl:px-12'
  };

  const containerProps = {
    className: cn(
      'w-full mx-auto',
      sizeClasses[size],
      paddingClasses[padding],
      centerContent && 'flex items-center justify-center',
      className
    )
  };

  if (animated) {
    return (
      <motion.div
        {...containerProps}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  return <div {...containerProps}>{children}</div>;
}

// Grid container for responsive layouts
interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
}

export function ResponsiveGrid({
  children,
  className,
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = 'md'
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const gridClasses = cn(
    'grid',
    cols.sm && `grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    gapClasses[gap],
    className
  );

  return <div className={gridClasses}>{children}</div>;
}