import { useState, useEffect, useMemo } from 'react';

interface UseVirtualListOptions {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

export function useVirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5
}: UseVirtualListOptions) {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    return {
      startIndex,
      endIndex,
      items: items.slice(startIndex, endIndex + 1),
      offsetY: startIndex * itemHeight,
      totalHeight: items.length * itemHeight
    };
  }, [items, itemHeight, containerHeight, scrollTop, overscan]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return {
    ...visibleItems,
    handleScroll
  };
}