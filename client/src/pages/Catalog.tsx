import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SneakerCard from "@/components/SneakerCard";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Catalog() {
  const [filters, setFilters] = useState({
    search: "",
    brandId: undefined as number | undefined,
    categories: [] as string[],
    page: 1,
    limit: 24
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/sneakers', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.brandId) params.append('brandId', filters.brandId.toString());
      if (filters.categories.length > 0) params.append('categories', filters.categories.join(','));
      params.append('page', filters.page.toString());
      params.append('limit', filters.limit.toString());

      const response = await fetch(`/api/sneakers?${params}`);
      if (!response.ok) throw new Error('Failed to fetch sneakers');
      return response.json();
    }
  });

  const { data: brands } = useQuery({
    queryKey: ['/api/brands'],
    queryFn: async () => {
      const response = await fetch('/api/brands');
      if (!response.ok) throw new Error('Failed to fetch brands');
      return response.json();
    }
  });

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const totalPages = data ? Math.ceil(data.total / filters.limit) : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Sneaker Catalog
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore our comprehensive collection of sneakers from top brands
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilter
            filters={filters}
            brands={brands || []}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Results */}
        <div className="mb-8">
          {data && (
            <p className="text-muted-foreground">
              Showing {data.sneakers.length} of {data.total} sneakers
              {filters.search && ` for "${filters.search}"`}
            </p>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load sneakers. Please try again.</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="mt-4"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Sneaker Grid */}
        {data?.sneakers && data.sneakers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {data.sneakers.map((sneaker: any) => (
              <SneakerCard key={sneaker.id} sneaker={sneaker} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {data?.sneakers && data.sneakers.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No sneakers found matching your criteria
            </p>
            <Button 
              onClick={() => setFilters({
                search: "",
                brandId: undefined,
                categories: [],
                page: 1,
                limit: 24
              })}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            <Button
              variant="outline"
              disabled={filters.page === 1}
              onClick={() => handlePageChange(filters.page - 1)}
            >
              Previous
            </Button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={filters.page === page ? "default" : "outline"}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              );
            })}
            
            <Button
              variant="outline"
              disabled={filters.page === totalPages}
              onClick={() => handlePageChange(filters.page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
