import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Plus, 
  Star, 
  Calendar, 
  Package, 
  Palette,
  TrendingUp,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';

interface SneakerHoverPreviewProps {
  sneaker: {
    id: number;
    name: string;
    slug: string;
    brandName?: string;
    description: string;
    images: string[];
    retailPrice: number;
    categories: string[];
    sizes: string[];
    materials: string;
    colorway: string;
    releaseDate: string;
    sku: string;
  };
  isVisible: boolean;
  position: { x: number; y: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

export default function SneakerHoverPreview({ 
  sneaker, 
  isVisible, 
  position, 
  onMouseEnter,
  onMouseLeave,
  onClose 
}: SneakerHoverPreviewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Auto-advance images
  useEffect(() => {
    if (!isVisible || sneaker.images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % sneaker.images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isVisible, sneaker.images.length]);

  // Reset image index when sneaker changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [sneaker.id]);

  // Calculate positioning to keep preview in viewport
  const calculatePosition = () => {
    const previewWidth = 400;
    const previewHeight = 500;
    const margin = 20;
    
    let x = position.x + 20;
    let y = position.y - previewHeight / 2;
    
    // Adjust if preview would go off right edge
    if (x + previewWidth > window.innerWidth - margin) {
      x = position.x - previewWidth - 20;
    }
    
    // Adjust if preview would go off top edge
    if (y < margin) {
      y = margin;
    }
    
    // Adjust if preview would go off bottom edge
    if (y + previewHeight > window.innerHeight - margin) {
      y = window.innerHeight - previewHeight - margin;
    }
    
    return { x, y };
  };

  const adjustedPosition = calculatePosition();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % sneaker.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? sneaker.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const mockRating = 4.2 + (sneaker.id % 10) * 0.1;
  const mockReviewCount = 15 + (sneaker.id % 50) * 3;
  const mockTrendingScore = Math.floor(Math.random() * 40) + 10;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed z-50 pointer-events-auto"
          style={{
            left: adjustedPosition.x,
            top: adjustedPosition.y,
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Card className="w-[400px] shadow-2xl border-2 bg-white/95 dark:bg-black/95 backdrop-blur-md">
            <CardContent className="p-0">
              {/* Image Section */}
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                  <img
                    src={sneaker.images[currentImageIndex] || sneaker.images[0]}
                    alt={sneaker.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  
                  {/* Image Navigation */}
                  {sneaker.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-1 transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-1 transition-colors"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      
                      {/* Image Indicators */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {sneaker.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              index === currentImageIndex 
                                ? 'bg-white' 
                                : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-500 text-white border-0">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Badge>
                  </div>
                  
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90 text-black">
                      {sneaker.brandName}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 space-y-4">
                {/* Title and Price */}
                <div>
                  <h3 className="font-bold text-lg line-clamp-2 mb-1">
                    {sneaker.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatPrice(sneaker.retailPrice)}
                    </span>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        +{mockTrendingScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= mockRating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {mockRating.toFixed(1)} ({mockReviewCount} reviews)
                  </span>
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {format(new Date(sneaker.releaseDate), 'MMM yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {sneaker.sizes.length} sizes
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Palette className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">
                      {sneaker.colorway.split('/')[0]}
                    </span>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-1">
                  {sneaker.categories.slice(0, 3).map((category) => (
                    <Badge key={category} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                  {sneaker.categories.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{sneaker.categories.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {sneaker.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" size="sm">
                    <Plus className="h-3 w-3 mr-1" />
                    Add to Collection
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsInWishlist(!isInWishlist)}
                    className={isInWishlist ? 'text-red-500 border-red-200' : ''}
                  >
                    <Heart className={`h-3 w-3 ${isInWishlist ? 'fill-red-500' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}