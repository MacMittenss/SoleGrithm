import { useEffect } from 'react';

export function useImagePreloader(imageUrls: string[]) {
  useEffect(() => {
    if (!imageUrls?.length) return;

    const preloadImages = () => {
      imageUrls.forEach((url) => {
        if (!url) return;
        
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    // Preload after a small delay to not block initial render
    const timeoutId = setTimeout(preloadImages, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [imageUrls]);
}

export function preloadCriticalImages(urls: string[]) {
  urls.forEach((url) => {
    if (!url) return;
    
    const img = new Image();
    img.src = url;
  });
}