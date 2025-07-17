import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import SneakerCard from "@/components/SneakerCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

export default function Catalog() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const [searchQuery, setSearchQuery] = useState(urlParams.get('search') || '');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const { data: sneakers, isLoading: sneakersLoading } = useQuery({
    queryKey: ['/api/sneakers/search', searchQuery, selectedBrand],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (selectedBrand) params.append('brand', selectedBrand);
      
      const response = await fetch(`/api/sneakers/search?${params}`);
      if (!response.ok) throw new Error('Failed to search sneakers');
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger refetch by updating query key
  };

  const filteredAndSortedSneakers = sneakers ? [...sneakers].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.retailPrice || '0') - parseFloat(b.retailPrice || '0');
      case 'price-high':
        return parseFloat(b.retailPrice || '0') - parseFloat(a.retailPrice || '0');
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  }) : [];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Sneaker Catalog</h1>
          <p className="text-xl text-muted-foreground">
            Discover and explore our comprehensive collection of sneakers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <form onSubmit={handleSearch} className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search sneakers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </form>

                {/* Brand Filter */}
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Brands</SelectItem>
                    {brands?.map((brand: any) => (
                      <SelectItem key={brand.id} value={brand.id.toString()}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <p className="text-muted-foreground">
                {filteredAndSortedSneakers.length} sneakers found
              </p>
              {searchQuery && (
                <Badge variant="secondary">
                  Searching: {searchQuery}
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-2 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedBrand && (
                <Badge variant="secondary">
                  Brand: {brands?.find((b: any) => b.id.toString() === selectedBrand)?.name}
                  <button 
                    onClick={() => setSelectedBrand('')}
                    className="ml-2 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Sneaker Grid */}
        {sneakersLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-2xl h-64 mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-5 bg-muted rounded w-2/3" />
                  <div className="h-6 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredAndSortedSneakers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedSneakers.map((sneaker: any) => (
              <SneakerCard key={sneaker.id} sneaker={sneaker} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No sneakers found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or browse our featured collection
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedBrand('');
                }}>
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {filteredAndSortedSneakers.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Sneakers
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
