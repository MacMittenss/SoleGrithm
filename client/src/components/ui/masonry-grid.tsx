import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MasonryGridProps {
  children: React.ReactNode[];
  columns?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  className?: string;
}

export function MasonryGrid({
  children,
  columns = { default: 1, sm: 2, md: 3, lg: 4, xl: 5 },
  gap = '1rem',
  className
}: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after initial render
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getColumnCount = () => {
    if (typeof window === 'undefined') return columns.default;
    
    const width = window.innerWidth;
    if (width >= 1280 && columns.xl) return columns.xl;
    if (width >= 1024 && columns.lg) return columns.lg;
    if (width >= 768 && columns.md) return columns.md;
    if (width >= 640 && columns.sm) return columns.sm;
    return columns.default;
  };

  const [columnCount, setColumnCount] = useState(getColumnCount);

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columns]);

  // Distribute children across columns
  const columnArray = Array.from({ length: columnCount }, () => [] as React.ReactNode[]);
  
  (children || []).forEach((child, index) => {
    const columnIndex = index % columnCount;
    columnArray[columnIndex].push(child);
  });

  return (
    <motion.div
      ref={containerRef}
      className={cn("w-full", className)}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: gap,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      data-testid="masonry-grid"
    >
      {columnArray.map((column, columnIndex) => (
        <motion.div
          key={columnIndex}
          className="flex flex-col"
          style={{ gap: gap }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.4, 
            delay: columnIndex * 0.1,
            ease: "easeOut"
          }}
        >
          {column.map((child, itemIndex) => (
            <motion.div
              key={`${columnIndex}-${itemIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: (columnIndex * 0.1) + (itemIndex * 0.05),
                ease: "easeOut"
              }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default MasonryGrid;