import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import SneakerCard from '../SneakerCard';
import SneakerCardSkeleton from '../skeletons/SneakerCardSkeleton';

interface SearchFilters {
  brand?: string;
  category?: string;
  priceRange?: [number, number];
  sortBy?: 'newest' | 'oldest' | 'price-low' | 'price-high' | 'name';
}

interface OptimizedSearchProps {
  placeholder?: string;
  enableFilters?: boolean;
  className?: string;
}

export default function OptimizedSearch({
  placeholder = "Search sneakers...",
  enableFilters = true,
  className = ''
}: OptimizedSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useLocalStorage<SearchFilters>('search-filters', {});
  const [showFilters, setShowFilters] = useState(false);
  
  // Debounce search query for better performance
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Memoized search parameters
  const searchParams = useMemo(() => {
    const params = new URLSearchParams();
    
    if (debouncedQuery) {
      params.append('q', debouncedQuery);
    }
    
    if (filters.brand) {
      params.append('brand', filters.brand);
    }
    
    if (filters.category) {
      params.append('category', filters.category);
    }
    
    if (filters.sortBy) {
      params.append('sort', filters.sortBy);
    }

    return params.toString();
  }, [debouncedQuery, filters]);

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['/api/sneakers/search', searchParams],
    queryFn: async () => {
      if (!debouncedQuery && !Object.keys(filters).length) {
        return [];
      }
      
      const response = await fetch(`/api/sneakers/search?${searchParams}`);
      if (!response.ok) throw new Error('Search failed');
      return response.json();
    },
    enabled: debouncedQuery.length > 0 || Object.keys(filters).length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false
  });

  const { data: brands } = useQuery({
    queryKey: ['/api/brands'],
    queryFn: async () => {
      const response = await fetch('/api/brands');
      if (!response.ok) throw new Error('Failed to fetch brands');
      return response.json();
    },
    staleTime: 1000 * 60 * 30 // 30 minutes cache for brands
  });

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const removeFilter = (key: keyof SearchFilters) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const hasActiveFilters = Object.keys(filters).length > 0 || searchQuery.length > 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4"
          data-testid="search-input"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Toggle */}
      {enableFilters && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
            data-testid="filter-toggle"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-sm"
              data-testid="clear-filters"
            >
              Clear all
            </Button>
          )}
        </div>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{searchQuery}"
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSearchQuery('')}
              />
            </Badge>
          )}
          {filters.brand && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Brand: {filters.brand}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter('brand')}
              />
            </Badge>
          )}
          {filters.category && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {filters.category}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter('category')}
              />
            </Badge>
          )}
          {filters.sortBy && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Sort: {filters.sortBy}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter('sortBy')}
              />
            </Badge>
          )}
        </div>
      )}

      {/* Search Results */}
      <div>
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SneakerCardSkeleton key={i} />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Search failed. Please try again.</p>
          </div>
        )}

        {searchResults && searchResults.length === 0 && hasActiveFilters && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No sneakers found matching your search criteria.
            </p>
          </div>
        )}

        {searchResults && searchResults.length > 0 && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Found {searchResults.length} sneaker{searchResults.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((sneaker: any) => (
                <SneakerCard
                  key={sneaker.id}
                  sneaker={sneaker}
                  enableHoverPreview={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}