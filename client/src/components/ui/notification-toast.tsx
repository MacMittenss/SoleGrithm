import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationToastProps {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const iconMap = {
  success: Check,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
};

const colorMap = {
  success: {
    bg: 'bg-green-50 dark:bg-green-950/20',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-500',
    text: 'text-green-800 dark:text-green-200'
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-950/20',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-500',
    text: 'text-red-800 dark:text-red-200'
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-950/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: 'text-yellow-500',
    text: 'text-yellow-800 dark:text-yellow-200'
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-500',
    text: 'text-blue-800 dark:text-blue-200'
  }
};

export function NotificationToast({
  id,
  title,
  message,
  type,
  duration = 5000,
  onClose,
  action
}: NotificationToastProps) {
  const Icon = iconMap[type];
  const colors = colorMap[type];

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => onClose(id), duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={cn(
        "relative w-full max-w-sm rounded-lg border p-4 shadow-lg",
        colors.bg,
        colors.border
      )}
      data-testid={`toast-${type}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 flex-shrink-0", colors.icon)} />
        
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-medium", colors.text)}>
            {title}
          </p>
          {message && (
            <p className={cn("mt-1 text-sm", colors.text, "opacity-80")}>
              {message}
            </p>
          )}
          
          {action && (
            <button
              onClick={action.onClick}
              className={cn(
                "mt-2 text-sm font-medium underline hover:no-underline",
                colors.text
              )}
            >
              {action.label}
            </button>
          )}
        </div>
        
        <button
          onClick={() => onClose(id)}
          className={cn(
            "flex-shrink-0 rounded-md hover:bg-black/5 dark:hover:bg-white/5 p-1 transition-colors",
            colors.text
          )}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {/* Progress bar for duration */}
      {duration > 0 && (
        <motion.div
          className={cn(
            "absolute bottom-0 left-0 h-1 rounded-b-lg",
            colors.icon.replace('text-', 'bg-')
          )}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
        />
      )}
    </motion.div>
  );
}

// Toast container component
interface ToastContainerProps {
  toasts: Array<NotificationToastProps & { id: string }>;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export function ToastContainer({ 
  toasts, 
  position = 'top-right' 
}: ToastContainerProps) {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  return (
    <div className={cn(
      "fixed z-50 flex flex-col gap-3 pointer-events-none",
      positionClasses[position]
    )}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <NotificationToast {...toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}