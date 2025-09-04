import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PinterestCardProps {
  children: React.ReactNode;
  className?: string;
  showActions?: boolean;
  onSave?: () => void;
  onShare?: () => void;
  onMenu?: () => void;
  isSaved?: boolean;
  aspectRatio?: 'auto' | 'square' | 'portrait' | 'landscape';
  priority?: boolean;
}

export function PinterestCard({
  children,
  className,
  showActions = true,
  onSave,
  onShare,
  onMenu,
  isSaved = false,
  aspectRatio = 'auto',
  priority = false
}: PinterestCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const aspectRatioClasses = {
    auto: '',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  };

  return (
    <motion.div
      className={cn(
        "group relative bg-card rounded-lg overflow-hidden cursor-pointer break-inside-avoid",
        "shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]",
        "transition-all duration-300 ease-out",
        aspectRatioClasses[aspectRatio],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        ease: "easeOut",
        delay: priority ? 0 : Math.random() * 0.2
      }}
      data-testid="pinterest-card"
    >
      {children}
      
      {/* Pinterest-style action overlay */}
      {showActions && (
        <motion.div
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          {/* Top actions */}
          <div className="absolute top-3 right-3 flex gap-2">
            <motion.button
              className={cn(
                "p-2 rounded-full backdrop-blur-sm transition-all duration-200",
                isSaved 
                  ? "bg-red-500 text-white" 
                  : "bg-white/90 text-gray-800 hover:bg-white"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onSave?.();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-save-card"
            >
              <Heart className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
            </motion.button>
          </div>
          
          {/* Bottom actions */}
          <div className="absolute bottom-3 right-3 flex gap-2">
            {onShare && (
              <motion.button
                className="p-2 rounded-full bg-white/90 text-gray-800 hover:bg-white backdrop-blur-sm transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-testid="button-share-card"
              >
                <Share className="w-4 h-4" />
              </motion.button>
            )}
            
            {onMenu && (
              <motion.button
                className="p-2 rounded-full bg-white/90 text-gray-800 hover:bg-white backdrop-blur-sm transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onMenu();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-testid="button-menu-card"
              >
                <MoreHorizontal className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default PinterestCard;