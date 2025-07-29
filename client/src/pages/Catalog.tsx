import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid, List, Heart, Plus } from "lucide-react";
import SneakerCard from "@/components/SneakerCard";

interface Sneaker {
  id: number;
  name: string;
  slug: string;
  brandId: number;
  brandName?: string;
  description: string;
  images: string[];
  retailPrice: number;
  categories: string[];
  colorway: string;
  releaseDate: string;
}

interface Brand {
  id: number;
  name: string;
  logo: string;
}

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: sneakers, isLoading: sneakersLoading } = useQuery({
    queryKey: ['/api/sneakers', searchQuery, selectedBrand, selectedCategory, sortBy],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedBrand && selectedBrand !== 'all') params.append('brand', selectedBrand);
      if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
      if (sortBy) params.append('sort', sortBy);
      
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

  // Get unique categories from sneakers
  const categories = sneakers ? 
    [...new Set(sneakers.flatMap((sneaker: Sneaker) => sneaker.categories))] : [];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Sneaker Catalog</h1>
          <p className="text-muted-foreground text-lg">
            Discover the latest and greatest sneakers from top brands
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search and View Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sneakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4">
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands?.map((brand: Brand) => (
                  <SelectItem key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category: string) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {sneakersLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sneakers?.map((sneaker: Sneaker) => (
              <SneakerCard
                key={sneaker.id}
                sneaker={{
                  id: sneaker.id,
                  name: sneaker.name,
                  brand: sneaker.brandName || 'Unknown',
                  price: formatPrice(sneaker.retailPrice),
                  imageUrl: sneaker.images[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc",
                  slug: sneaker.slug,
                  // Extended properties for hover preview
                  brandName: sneaker.brandName,
                  description: sneaker.description,
                  images: sneaker.images,
                  retailPrice: sneaker.retailPrice,
                  categories: sneaker.categories,
                  sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
                  materials: 'Premium materials and construction',
                  colorway: sneaker.colorway,
                  releaseDate: sneaker.releaseDate,
                  sku: `SKU-${sneaker.id}`
                }}
                enableHoverPreview={true}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sneakers?.map((sneaker: Sneaker) => (
              <Card key={sneaker.id} className="group cursor-pointer transition-all hover:shadow-lg">
                <Link href={`/sneakers/${sneaker.slug}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                        <img
                          src={sneaker.images[0] || "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=150&fit=crop"}
                          alt={sneaker.name}
                          className="w-32 h-24 object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {sneaker.categories.map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{sneaker.name}</h3>
                        <p className="text-muted-foreground mb-2">{sneaker.colorway}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {sneaker.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xl">{formatPrice(sneaker.retailPrice)}</span>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                // Add to wishlist functionality
                              }}
                            >
                              <Heart className="h-4 w-4 mr-1" />
                              Wishlist
                            </Button>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                // Add to collection functionality
                              }}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add to Collection
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!sneakersLoading && sneakers?.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <Search className="h-12 w-12 text-muted-foreground mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No sneakers found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedBrand("all");
                setSelectedCategory("all");
                setSortBy("newest");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}