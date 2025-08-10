import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import LazyImage from '@/components/optimized/LazyImage';
import { useUserTracking } from '@/hooks/useUserTracking';

interface GoatStyleFeaturedGridProps {
  sneakers: Array<{
    id: number;
    name: string;
    brand: string;
    price: string;
    imageUrl: string;
    slug: string;
    brandName?: string;
    retailPrice?: number;
    colorway?: string;
  }>;
  title?: string;
  showTitle?: boolean;
}

export default function GoatStyleFeaturedGrid({ 
  sneakers, 
  title = "Just Dropped",
  showTitle = true
}: GoatStyleFeaturedGridProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { trackSneakerView } = useUserTracking();

  const handleClick = (sneakerId: number) => {
    trackSneakerView(sneakerId, 'featured_grid');
  };

  return (
    <div className="w-full">
      {/* Section Title - GOAT style */}
      {showTitle && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground tracking-tight">
            {title}
          </h3>
        </div>
      )}

      {/* Uniform Grid - GOAT style */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
        {sneakers.map((sneaker, index) => (
          <Link 
            key={sneaker.id} 
            href={`/sneakers/${sneaker.slug}`}
            onClick={() => handleClick(sneaker.id)}
          >
            <motion.div
              className="relative aspect-square cursor-pointer group"
              onHoverStart={() => setHoveredId(sneaker.id)}
              onHoverEnd={() => setHoveredId(null)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.02,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              data-testid={`featured-sneaker-${sneaker.id}`}
            >
              {/* Sneaker Image - Product cutout style like GOAT */}
              <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-white rounded-lg overflow-hidden border border-border/30 group-hover:border-border group-hover:shadow-md transition-all duration-300">
                <div className="w-full h-full flex items-center justify-center p-2">
                  <LazyImage
                    src={sneaker.imageUrl || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"}
                    alt={sneaker.name}
                    className="max-w-[85%] max-h-[85%] object-contain transition-all duration-300 group-hover:scale-105 drop-shadow-sm"
                    fallbackSrc="https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
                    priority={index < 12}
                  />
                </div>
                
                {/* Hover Overlay - GOAT style name reveal */}
                <AnimatePresence>
                  {hoveredId === sneaker.id && (
                    <motion.div
                      className="absolute inset-0 bg-black/60 flex items-end justify-center p-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="bg-white/95 backdrop-blur-sm rounded px-2 py-1 text-center"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <p className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight">
                          {sneaker.name}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {sneaker.price}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}