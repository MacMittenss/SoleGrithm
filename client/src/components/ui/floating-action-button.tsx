import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FloatingActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  visible?: boolean;
  badge?: number;
  className?: string;
}

export function FloatingActionButton({
  icon: Icon,
  label,
  onClick,
  position = 'bottom-right',
  color = 'primary',
  size = 'md',
  visible = true,
  badge,
  className
}: FloatingActionButtonProps) {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const colorClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    success: 'bg-green-500 text-white hover:bg-green-600',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };

  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-14 w-14'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn(
            "fixed z-50",
            positionClasses[position]
          )}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Button
              onClick={onClick}
              className={cn(
                "rounded-full shadow-lg transition-all duration-200",
                "hover:shadow-xl focus:shadow-xl",
                sizeClasses[size],
                colorClasses[color],
                className
              )}
              size="icon"
              aria-label={label}
              data-testid={`fab-${label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Icon className={iconSizes[size]} />
              
              {badge && badge > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium"
                >
                  {badge > 99 ? '99+' : badge}
                </motion.span>
              )}
            </Button>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: position.includes('right') ? 10 : -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none",
                position.includes('right') ? 'right-full mr-2' : 'left-full ml-2'
              )}
            >
              {label}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}