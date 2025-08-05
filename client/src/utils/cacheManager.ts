// Client-side cache manager for optimized performance

interface CacheEntry {
  data: any;
  timestamp: number;
  expiry: number;
}

class CacheManager {
  private cache = new Map<string, CacheEntry>();
  private maxSize = 100; // Maximum cache entries

  set(key: string, data: any, ttl: number = 300000): void { // Default 5 minutes TTL
    // Clean up if cache is getting too large
    if (this.cache.size >= this.maxSize) {
      this.cleanup();
    }

    const entry: CacheEntry = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    };

    this.cache.set(key, entry);
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }

    // Check if expired
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    
    // Remove expired entries
    entries.forEach(([key, entry]) => {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    });

    // If still too large, remove oldest entries
    if (this.cache.size >= this.maxSize) {
      const sortedEntries = entries
        .filter(([key]) => this.cache.has(key)) // Only keep non-expired
        .sort(([, a], [, b]) => a.timestamp - b.timestamp);

      const toRemove = sortedEntries.slice(0, Math.floor(this.maxSize / 4));
      toRemove.forEach(([key]) => this.cache.delete(key));
    }
  }

  getStats() {
    const now = Date.now();
    const entries = Array.from(this.cache.values());
    const expired = entries.filter(entry => now > entry.expiry).length;
    
    return {
      totalEntries: this.cache.size,
      expiredEntries: expired,
      validEntries: this.cache.size - expired,
      memoryUsage: JSON.stringify([...this.cache.entries()]).length
    };
  }
}

// Export singleton instance
export const cacheManager = new CacheManager();

// Utility function for cache-wrapped API calls
export async function cachedApiCall<T>(
  key: string,
  apiCall: () => Promise<T>,
  ttl: number = 300000
): Promise<T> {
  // Check cache first
  const cached = cacheManager.get<T>(key);
  if (cached) {
    return cached;
  }

  // Make API call and cache result
  try {
    const result = await apiCall();
    cacheManager.set(key, result, ttl);
    return result;
  } catch (error) {
    // Don't cache errors
    throw error;
  }
}