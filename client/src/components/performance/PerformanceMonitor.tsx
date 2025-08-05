import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PerformanceMonitor } from '@/utils/performance';

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  memoryUsage?: {
    used: number;
    total: number;
    limit: number;
  };
}

export default function PerformanceMonitorComponent() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Collect performance metrics
    const collectMetrics = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paintEntries = performance.getEntriesByType('paint');
        
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
        
        let memoryInfo;
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          memoryInfo = {
            used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
            total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
            limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
          };
        }

        setMetrics({
          pageLoadTime: Math.round(navigation.loadEventEnd - navigation.navigationStart),
          firstContentfulPaint: Math.round(fcp),
          largestContentfulPaint: 0, // Would need intersection observer
          cumulativeLayoutShift: 0, // Would need layout shift observer
          firstInputDelay: 0, // Would need event timing
          memoryUsage: memoryInfo
        });
      }
    };

    // Collect metrics after page load
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }

    // Show monitor in development
    if (import.meta.env.DEV) {
      const showMonitor = () => setIsVisible(true);
      const hideMonitor = () => setIsVisible(false);
      
      // Toggle with Ctrl+Shift+P
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'P') {
          setIsVisible(prev => !prev);
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      
      return () => {
        window.removeEventListener('load', collectMetrics);
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, []);

  if (!isVisible || !metrics) return null;

  const getPerformanceColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'bg-green-500';
    if (value <= thresholds[1]) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            Performance Monitor
            <button
              onClick={() => setIsVisible(false)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span>Page Load:</span>
            <Badge variant="outline" className={getPerformanceColor(metrics.pageLoadTime, [1000, 3000])}>
              {metrics.pageLoadTime}ms
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span>First Paint:</span>
            <Badge variant="outline" className={getPerformanceColor(metrics.firstContentfulPaint, [800, 1800])}>
              {metrics.firstContentfulPaint}ms
            </Badge>
          </div>
          
          {metrics.memoryUsage && (
            <div className="flex justify-between items-center">
              <span>Memory:</span>
              <Badge variant="outline">
                {metrics.memoryUsage.used}MB / {metrics.memoryUsage.total}MB
              </Badge>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
            Press Ctrl+Shift+P to toggle
          </div>
        </CardContent>
      </Card>
    </div>
  );
}