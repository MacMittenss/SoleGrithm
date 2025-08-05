import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, RefreshCw } from 'lucide-react';
import { LoadingDots } from '@/components/micro-interactions/LoadingDots';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={cn(sizeClasses[size])} />
      </motion.div>
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  text?: string;
  className?: string;
  backdrop?: boolean;
}

export function LoadingOverlay({ 
  isLoading, 
  text = "Loading...", 
  className,
  backdrop = true 
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      className={cn(
        "absolute inset-0 flex items-center justify-center z-50",
        backdrop && "bg-background/80 backdrop-blur-sm",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </motion.div>
  );
}

interface PulseLoadingProps {
  lines?: number;
  className?: string;
}

export function PulseLoading({ lines = 3, className }: PulseLoadingProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className="h-4 bg-muted rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </div>
  );
}

interface ProgressiveLoadingProps {
  stages: string[];
  currentStage: number;
  className?: string;
}

export function ProgressiveLoading({ 
  stages, 
  currentStage, 
  className 
}: ProgressiveLoadingProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <LoadingDots size="sm" />
        <span className="text-sm font-medium">
          {stages[currentStage] || "Processing..."}
        </span>
      </div>
      
      <div className="space-y-2">
        {stages.map((stage, index) => (
          <motion.div
            key={stage}
            className={cn(
              "flex items-center gap-2 text-xs",
              index < currentStage ? "text-green-600" : 
              index === currentStage ? "text-primary" : "text-muted-foreground"
            )}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={cn(
              "w-2 h-2 rounded-full",
              index < currentStage ? "bg-green-600" :
              index === currentStage ? "bg-primary animate-pulse" : "bg-muted-foreground"
            )} />
            <span>{stage}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}