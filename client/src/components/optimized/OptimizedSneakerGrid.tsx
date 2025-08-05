import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import SneakerCard from '../SneakerCard';
import SneakerCardSkeleton from '../skeletons/SneakerCardSkeleton';
import LazyLoadSection from '../performance/LazyLoadSection';
import { useVirtualList } from '@/hooks/useVirtualList';

interface OptimizedSneakerGridProps {
  endpoint: string;
  queryKey: string[];
  enableVirtualization?: boolean;
  enableHoverPreview?: boolean;
  itemsPerPage?: number;
  className?: string;
}

export default function OptimizedSneakerGrid({
  endpoint,
  queryKey,
  enableVirtualization = false,
  enableHoverPreview = true,
  itemsPerPage = 20,
  className = ''
}: OptimizedSneakerGridProps) {
  const { data: sneakers, isLoading, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Failed to fetch sneakers');
      return response.json();
    },
    staleTime: 1000 * 60 * 15, // 15 minutes cache
    refetchOnWindowFocus: false
  });

  // Memoize filtered sneakers for better performance
  const optimizedSneakers = useMemo(() => {
    if (!sneakers) return [];
    return sneakers.slice(0, itemsPerPage);
  }, [sneakers, itemsPerPage]);

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load sneakers. Please try again.</p>
      </div>
    );
  }

  // Skeleton loading state
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {[...Array(8)].map((_, i) => (
          <SneakerCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Virtual list for large datasets
  if (enableVirtualization && optimizedSneakers.length > 50) {
    const { items, offsetY, totalHeight, handleScroll } = useVirtualList({
      items: optimizedSneakers,
      itemHeight: 320,
      containerHeight: 800,
      overscan: 5
    });

    return (
      <div
        className="overflow-auto"
        style={{ height: 800 }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ transform: `translateY(${offsetY}px)` }}>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
              {items.map((sneaker: any, index: number) => (
                <LazyLoadSection key={sneaker.id} fallback={<SneakerCardSkeleton />}>
                  <SneakerCard
                    sneaker={sneaker}
                    enableHoverPreview={enableHoverPreview}
                  />
                </LazyLoadSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular grid for normal datasets
  return (
    <motion.div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {optimizedSneakers.map((sneaker, index) => (
        <motion.div key={sneaker.id} variants={itemVariants}>
          <LazyLoadSection 
            fallback={<SneakerCardSkeleton />}
            rootMargin="100px"
          >
            <SneakerCard
              sneaker={sneaker}
              enableHoverPreview={enableHoverPreview}
            />
          </LazyLoadSection>
        </motion.div>
      ))}
    </motion.div>
  );
}