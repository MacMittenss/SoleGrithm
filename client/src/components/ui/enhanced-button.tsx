import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  ripple?: boolean;
  shimmer?: boolean;
  pulse?: boolean;
  bounce?: boolean;
}

export function EnhancedButton({
  children,
  className,
  ripple = false,
  shimmer = false,
  pulse = false,
  bounce = false,
  onClick,
  ...props
}: EnhancedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const rippleElement = document.createElement('span');
      rippleElement.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      button.appendChild(rippleElement);
      setTimeout(() => rippleElement.remove(), 600);
    }
    
    onClick?.(e);
  };

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    ...(pulse && {
      animate: { scale: [1, 1.02, 1] },
      transition: { duration: 2, repeat: Infinity }
    }),
    ...(bounce && {
      whileHover: { y: -2 },
      transition: { type: "spring", stiffness: 400, damping: 10 }
    })
  };

  return (
    <>
      <style>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      
      <motion.div {...motionProps}>
        <Button
          className={cn(
            "relative overflow-hidden transition-all duration-200",
            shimmer && "bg-gradient-to-r from-primary via-primary/80 to-primary bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]",
            className
          )}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    </>
  );
}