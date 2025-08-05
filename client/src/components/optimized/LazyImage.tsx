import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  blurDataURL?: string;
  priority?: boolean;
}

export default function LazyImage({
  src,
  alt,
  fallbackSrc = '/placeholder-sneaker.jpg',
  className,
  containerClassName,
  blurDataURL,
  priority = false,
  ...props
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(priority ? src : blurDataURL || '');
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!imageRef || priority) return;

    // Intersection Observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before element is visible
        threshold: 0.1,
      }
    );

    observerRef.current.observe(imageRef);

    return () => {
      if (observerRef.current && imageRef) {
        observerRef.current.unobserve(imageRef);
      }
    };
  }, [imageRef, src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Blur placeholder */}
      {!isLoaded && blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-0" : "opacity-100 blur-sm scale-110"
          )}
        />
      )}
      
      {/* Main image */}
      <img
        ref={setImageRef}
        src={imageSrc || blurDataURL}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          hasError && "opacity-50",
          className
        )}
        loading={priority ? "eager" : "lazy"}
        {...props}
      />
      
      {/* Loading state */}
      {!isLoaded && !blurDataURL && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse" />
      )}
    </div>
  );
}