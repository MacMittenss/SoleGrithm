import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { Heart, ShoppingBag, Star, Eye, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard } from '@/components/micro-interactions/HoverCard';
import { PulseEffect } from '@/components/micro-interactions/PulseEffect';
import LazyImage from '@/components/optimized/LazyImage';
import { cn } from '@/lib/utils';

interface EnhancedSneakerCardProps {
  sneaker: {
    id: number;
    name: string;
    brand?: string;
    brandName?: string;
    price?: string;
    retailPrice?: number;
    imageUrl: string;
    images?: string[];
    slug: string;
    isNew?: boolean;
    rating?: number;
    reviewCount?: number;
    colorway?: string;
    releaseDate?: string;
    trending?: boolean;
    discount?: number;
  };
  showQuickActions?: boolean;
  showMarketData?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function EnhancedSneakerCard({
  sneaker,
  showQuickActions = true,
  showMarketData = false,
  size = 'md'
}: EnhancedSneakerCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [showHover, setShowHover] = useState(false);

  const sizeClasses = {
    sm: 'w-full max-w-xs',
    md: 'w-full max-w-sm',
    lg: 'w-full max-w-md'
  };

  const images = sneaker.images || [sneaker.imageUrl];
  const currentImage = images[imageIndex] || sneaker.imageUrl;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const hoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -8,
      transition: { 
        duration: 0.3, 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }
    }
  };

  return (
    <motion.div
      className={cn("group", sizeClasses[size])}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setShowHover(true)}
      onHoverEnd={() => setShowHover(false)}
    >
      <motion.div variants={hoverVariants}>
        <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="relative">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Link href={`/sneakers/${sneaker.slug}`}>
                <LazyImage
                  src={currentImage}
                  alt={sneaker.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  placeholder="blur"
                />
              </Link>

              {/* Image Navigation Dots */}
              {images.length > 1 && showHover && (
                <motion.div
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setImageIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        index === imageIndex 
                          ? "bg-white shadow-md" 
                          : "bg-white/50 hover:bg-white/70"
                      )}
                    />
                  ))}
                </motion.div>
              )}

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {sneaker.isNew && (
                  <PulseEffect continuous>
                    <Badge variant="secondary" className="bg-green-500 text-white text-xs">
                      New
                    </Badge>
                  </PulseEffect>
                )}
                {sneaker.trending && (
                  <Badge variant="secondary" className="bg-orange-500 text-white text-xs flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Trending
                  </Badge>
                )}
                {sneaker.discount && (
                  <Badge variant="secondary" className="bg-red-500 text-white text-xs">
                    -{sneaker.discount}%
                  </Badge>
                )}
              </div>

              {/* Quick Actions */}
              <AnimatePresence>
                {showQuickActions && showHover && (
                  <motion.div
                    className="absolute top-2 right-2 flex flex-col gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        size="icon"
                        variant="secondary"
                        className={cn(
                          "h-8 w-8 rounded-full shadow-md transition-colors",
                          isLiked ? "bg-red-500 text-white" : "bg-white/90 text-gray-600"
                        )}
                        onClick={() => setIsLiked(!isLiked)}
                        data-testid={`like-button-${sneaker.id}`}
                      >
                        <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full bg-white/90 text-gray-600 shadow-md hover:bg-primary hover:text-white"
                        data-testid={`quick-view-${sneaker.id}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full bg-white/90 text-gray-600 shadow-md hover:bg-green-500 hover:text-white"
                        data-testid={`add-to-bag-${sneaker.id}`}
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content */}
            <CardContent className="p-4">
              <div className="space-y-2">
                {/* Brand and Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {sneaker.brand || sneaker.brandName || 'Unknown'}
                  </span>
                  {sneaker.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">
                        {sneaker.rating} ({sneaker.reviewCount || 0})
                      </span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <Link href={`/sneakers/${sneaker.slug}`}>
                  <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                    {sneaker.name}
                  </h3>
                </Link>

                {/* Colorway */}
                {sneaker.colorway && (
                  <p className="text-xs text-muted-foreground">
                    {sneaker.colorway}
                  </p>
                )}

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">
                      {sneaker.price || `$${sneaker.retailPrice || 'N/A'}`}
                    </span>
                    {sneaker.discount && sneaker.retailPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${sneaker.retailPrice}
                      </span>
                    )}
                  </div>
                  
                  {showMarketData && (
                    <Badge variant="outline" className="text-xs">
                      Live Market
                    </Badge>
                  )}
                </div>

                {/* Release Date */}
                {sneaker.releaseDate && (
                  <p className="text-xs text-muted-foreground">
                    Released: {new Date(sneaker.releaseDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}