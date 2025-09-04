import { useState } from "react";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EnhancedProductCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isSale?: boolean;
  sizes?: string[];
  onAddToCart?: (id: number) => void;
  onToggleFavorite?: (id: number) => void;
  isFavorite?: boolean;
}

export default function EnhancedProductCard({
  id,
  name,
  brand,
  price,
  originalPrice,
  imageUrl,
  rating = 0,
  reviewCount = 0,
  isNew = false,
  isSale = false,
  sizes = [],
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: EnhancedProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className="daisy-card bg-white dark:bg-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      data-testid={`card-product-${id}`}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-base-300">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          data-testid={`img-product-${id}`}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="daisy-badge daisy-badge-primary bg-blue-500 text-white">
              NEW
            </Badge>
          )}
          {isSale && discountPercentage > 0 && (
            <Badge className="daisy-badge daisy-badge-error bg-red-500 text-white">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute top-3 right-3 flex flex-col gap-2"
            >
              <motion.button
                className={`daisy-btn daisy-btn-circle daisy-btn-sm ${
                  isFavorite 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                } shadow-lg`}
                onClick={() => onToggleFavorite?.(id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-testid={`button-favorite-${id}`}
              >
                <Heart 
                  size={16} 
                  className={isFavorite ? 'fill-current' : ''} 
                />
              </motion.button>
              
              <motion.button
                className="daisy-btn daisy-btn-circle daisy-btn-sm bg-white hover:bg-gray-100 text-gray-700 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                data-testid={`button-quickview-${id}`}
              >
                <Eye size={16} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Size Selector Overlay */}
        <AnimatePresence>
          {isHovered && sizes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-3 left-3 right-3"
            >
              <div className="bg-white/95 dark:bg-base-100/95 backdrop-blur-sm rounded-lg p-3">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick Size:</p>
                <div className="flex gap-1 flex-wrap">
                  {sizes.slice(0, 6).map((size) => (
                    <button
                      key={size}
                      className={`daisy-btn daisy-btn-xs ${
                        selectedSize === size
                          ? 'daisy-btn-primary'
                          : 'daisy-btn-outline'
                      }`}
                      onClick={() => setSelectedSize(size)}
                      data-testid={`button-size-${size}-${id}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="daisy-card-body p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 
              className="daisy-card-title text-lg font-bold text-gray-900 dark:text-white line-clamp-2"
              data-testid={`text-name-${id}`}
            >
              {name}
            </h3>
            <p 
              className="text-sm text-gray-600 dark:text-gray-400 mt-1"
              data-testid={`text-brand-${id}`}
            >
              {brand}
            </p>
          </div>
        </div>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({reviewCount})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span 
            className="text-xl font-bold text-gray-900 dark:text-white"
            data-testid={`text-price-${id}`}
          >
            ${price}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="daisy-card-actions justify-end">
          <Button
            className="w-full daisy-btn daisy-btn-primary flex items-center gap-2"
            onClick={() => onAddToCart?.(id)}
            data-testid={`button-addcart-${id}`}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Loading Skeleton Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </motion.div>
  );
}