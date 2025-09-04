import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { EnhancedInput } from '@/components/ui/enhanced-input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'trending' | 'suggestion';
  icon?: React.ReactNode;
  count?: number;
}

interface InteractiveSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showFilters?: boolean;
}

export default function InteractiveSearch({
  placeholder = "Search sneakers, brands, or styles...",
  onSearch,
  onSuggestionSelect,
  className,
  size = 'md',
  showFilters = true
}: InteractiveSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('recent-searches', []);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  // Fetch search suggestions
  const { data: suggestions, isLoading } = useQuery({
    queryKey: ['search-suggestions', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) return [];
      
      const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(debouncedQuery)}`);
      if (!response.ok) return [];
      return response.json();
    },
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Mock trending searches (replace with real data)
  const trendingSearches: SearchSuggestion[] = [
    { id: '1', text: 'Jordan 1 Retro', type: 'trending', count: 1234 },
    { id: '2', text: 'Nike Dunk Low', type: 'trending', count: 987 },
    { id: '3', text: 'Yeezy 350', type: 'trending', count: 765 },
    { id: '4', text: 'Adidas Forum', type: 'trending', count: 543 }
  ];

  const sizeClasses = {
    sm: 'text-sm h-10',
    md: 'text-base h-12',
    lg: 'text-lg h-14'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Add to recent searches
    const updatedRecent = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updatedRecent);

    onSearch?.(searchQuery);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    handleSearch(suggestion.text);
    onSuggestionSelect?.(suggestion);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const allSuggestions: SearchSuggestion[] = [
    // Recent searches
    ...recentSearches.map((search, index) => ({
      id: `recent-${index}`,
      text: search,
      type: 'recent' as const,
      icon: <Clock className="h-4 w-4" />
    })),
    // API suggestions
    ...(suggestions || []).map((suggestion: any, index: number) => ({
      id: `suggestion-${index}`,
      text: suggestion.text || suggestion.name || suggestion,
      type: 'suggestion' as const
    })),
    // Trending (only show when no query)
    ...(query.length === 0 ? trendingSearches : [])
  ];

  return (
    <div ref={searchRef} className={cn("relative w-full max-w-2xl", className)}>
      {/* Search Input */}
      <div className="relative">
        <motion.div
          className={cn(
            "relative flex items-center",
            isFocused && "ring-2 ring-primary/20 rounded-lg"
          )}
          animate={{
            scale: isFocused ? 1.01 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          <EnhancedInput
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            icon={<Search className="h-4 w-4" />}
            className={cn(
              "pr-20 border-0 bg-muted/50 focus:bg-background transition-all duration-200",
              sizeClasses[size]
            )}
            data-testid="interactive-search-input"
          />

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {query && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="h-6 w-6 p-0 hover:bg-muted"
                data-testid="clear-search"
              >
                <X className="h-3 w-3" />
              </Button>
            )}

            {showFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-muted"
                data-testid="search-filters"
              >
                <Filter className="h-3 w-3" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (isFocused || query.length > 0) && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="shadow-lg border border-border/50 bg-background/95 backdrop-blur-md">
              <CardContent className="p-2">
                {isLoading ? (
                  <div className="py-4 text-center text-sm text-muted-foreground">
                    Searching...
                  </div>
                ) : allSuggestions.length > 0 ? (
                  <div className="space-y-1">
                    {/* Recent Searches Header */}
                    {recentSearches.length > 0 && query.length === 0 && (
                      <div className="flex items-center justify-between px-3 py-2">
                        <span className="text-xs font-medium text-muted-foreground">Recent</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearRecentSearches}
                          className="text-xs h-auto p-1"
                        >
                          Clear
                        </Button>
                      </div>
                    )}

                    {/* Suggestions List */}
                    {allSuggestions.map((suggestion, index) => (
                      <motion.div
                        key={suggestion.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors",
                          "hover:bg-muted/50 group"
                        )}
                        onClick={() => handleSuggestionClick(suggestion)}
                        data-testid={`suggestion-${suggestion.type}-${index}`}
                      >
                        {suggestion.icon || (
                          suggestion.type === 'trending' ? (
                            <TrendingUp className="h-4 w-4 text-orange-500" />
                          ) : (
                            <Search className="h-4 w-4 text-muted-foreground" />
                          )
                        )}
                        
                        <span className="flex-1 text-sm">{suggestion.text}</span>
                        
                        {suggestion.type === 'recent' && (
                          <Badge variant="outline" className="text-xs">
                            Recent
                          </Badge>
                        )}
                        
                        {suggestion.count && (
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.count.toLocaleString()}
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : query.length > 0 ? (
                  <div className="py-4 text-center text-sm text-muted-foreground">
                    No suggestions found
                  </div>
                ) : (
                  <div className="py-4 text-center text-sm text-muted-foreground">
                    Start typing to search
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}