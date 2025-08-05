// Performance monitoring utilities

export class PerformanceMonitor {
  private static marks: Map<string, number> = new Map();
  
  static mark(name: string) {
    this.marks.set(name, performance.now());
  }
  
  static measure(name: string, startMark: string): number {
    const startTime = this.marks.get(startMark);
    if (!startTime) {
      console.warn(`Start mark "${startMark}" not found`);
      return 0;
    }
    
    const duration = performance.now() - startTime;
    console.log(`${name}: ${duration.toFixed(2)}ms`);
    return duration;
  }
  
  static clearMarks() {
    this.marks.clear();
  }
}

// Throttle function for scroll and resize events
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Debounce function for search and input events
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Image optimization utilities
export function getOptimizedImageUrl(
  url: string,
  width?: number,
  height?: number,
  quality: number = 80
): string {
  if (!url) return '';
  
  // For Unsplash images, add optimization parameters
  if (url.includes('unsplash.com')) {
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    params.append('q', quality.toString());
    params.append('auto', 'format');
    params.append('fit', 'crop');
    
    return `${url}&${params.toString()}`;
  }
  
  return url;
}

// Preload critical resources
export function preloadResource(url: string, type: 'image' | 'script' | 'style' | 'font' = 'image') {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = type;
  
  if (type === 'image') {
    link.type = 'image/webp';
  }
  
  document.head.appendChild(link);
}

// Bundle analyzer - tracks component render times
export function withPerformanceTracking<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  componentName: string
) {
  return function PerformanceTrackedComponent(props: T) {
    const startTime = performance.now();
    
    React.useEffect(() => {
      const endTime = performance.now();
      console.log(`${componentName} render time: ${(endTime - startTime).toFixed(2)}ms`);
    });
    
    return React.createElement(Component, props);
  };
}

// Memory usage monitoring
export function logMemoryUsage(label: string = 'Memory Usage') {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log(`${label}:`, {
      used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
    });
  }
}