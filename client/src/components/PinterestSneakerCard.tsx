import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PinterestCard } from '@/components/ui/pinterest-card';
import LazyImage from '@/components/optimized/LazyImage';
import { useUserTracking } from '@/hooks/useUserTracking';
import { cn } from '@/lib/utils';

interface PinterestSneakerCardProps {
  sneaker: {
    id: number;
    name: string;
    brand: string;
    price: string;
    imageUrl: string;
    slug: string;
    isNew?: boolean;
    rating?: number;
    reviewCount?: number;
    brandName?: string;
    retailPrice?: number;
    colorway?: string;
  };
  onSave?: (sneakerId: number) => void;
  isSaved?: boolean;
  priority?: boolean;
  aspectRatio?: 'auto' | 'square' | 'portrait' | 'landscape';
}

export default function PinterestSneakerCard({ 
  sneaker, 
  onSave, 
  isSaved = false, 
  priority = false,
  aspectRatio = 'auto'
}: PinterestSneakerCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { trackSneakerView } = useUserTracking();

  const handleSave = () => {
    onSave?.(sneaker.id);
  };

  const handleClick = () => {
    trackSneakerView(sneaker.id, 'pinterest_card');
  };

  return (
    <Link href={`/sneakers/${sneaker.slug}`} onClick={handleClick}>
      <PinterestCard
        className="group cursor-pointer h-fit"
        onSave={handleSave}
        isSaved={isSaved}
        aspectRatio={aspectRatio}
        priority={priority}
        showActions={true}
      >
        <div className="relative overflow-hidden">
          {/* Main product image - Pinterest style with minimal text */}
          <LazyImage
            src={sneaker.imageUrl || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"}
            alt={sneaker.name}
            className={cn(
              "w-full object-cover transition-transform duration-500 group-hover:scale-105",
              aspectRatio === 'square' && "aspect-square",
              aspectRatio === 'portrait' && "aspect-[3/4]",
              aspectRatio === 'landscape' && "aspect-[4/3]",
              aspectRatio === 'auto' && "h-auto"
            )}
            fallbackSrc="https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            priority={priority}
          />
          
          {/* Minimal overlay with essential info - Pinterest style */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            {/* Price - bottom left, minimal */}
            <div className="absolute bottom-3 left-3">
              <motion.div
                className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-sm font-semibold text-gray-900">{sneaker.price}</span>
              </motion.div>
            </div>
            
            {/* Quick shop button - bottom right */}
            <div className="absolute bottom-3 right-3">
              <motion.button
                className="p-2 bg-white/95 backdrop-blur-sm rounded-full text-gray-900 hover:bg-white transition-colors"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle quick shop action
                }}
                data-testid="button-quick-shop"
              >
                <ShoppingBag className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
          
          {/* Top badges - minimal, only when necessary */}
          {sneaker.isNew && (
            <div className="absolute top-2 left-2">
              <Badge variant="destructive" className="text-xs px-2 py-1 bg-red-500 text-white">
                New
              </Badge>
            </div>
          )}
        </div>
        
        {/* Minimal text content - Pinterest style */}
        <div className="p-3">
          {/* Brand name - subtle */}
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
            {sneaker.brand}
          </p>
          
          {/* Product name - clean, minimal */}
          <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2 leading-tight">
            {sneaker.name}
          </h3>
          
          {/* Colorway if available - very subtle */}
          {sneaker.colorway && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {sneaker.colorway}
            </p>
          )}
        </div>
      </PinterestCard>
    </Link>
  );
}