import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export function useInfiniteScroll({
  threshold = 1.0,
  rootMargin = '0px',
  hasNextPage = false,
  isFetchingNextPage = false
}: UseInfiniteScrollOptions) {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        // Trigger load more
        const event = new CustomEvent('loadMore');
        window.dispatchEvent(event);
      }
    },
    [hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      rootMargin,
    });

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [targetElement, observerCallback, threshold, rootMargin]);

  return { setTargetElement };
}

// Hook for pagination with infinite scroll
export function useInfinitePagination<T>(
  fetchPage: (page: number) => Promise<T[]>,
  initialPage: number = 1
) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = useCallback(async () => {
    if (isFetching || !hasNextPage) return;

    setIsFetching(true);
    setError(null);

    try {
      const newData = await fetchPage(page);
      
      if (newData.length === 0) {
        setHasNextPage(false);
      } else {
        setData(prev => [...prev, ...newData]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more');
    } finally {
      setIsFetching(false);
    }
  }, [fetchPage, page, isFetching, hasNextPage]);

  const reset = useCallback(() => {
    setData([]);
    setPage(initialPage);
    setHasNextPage(true);
    setError(null);
  }, [initialPage]);

  // Listen for loadMore events
  useEffect(() => {
    const handleLoadMore = () => loadMore();
    window.addEventListener('loadMore', handleLoadMore);
    return () => window.removeEventListener('loadMore', handleLoadMore);
  }, [loadMore]);

  return {
    data,
    hasNextPage,
    isFetching,
    error,
    loadMore,
    reset
  };
}