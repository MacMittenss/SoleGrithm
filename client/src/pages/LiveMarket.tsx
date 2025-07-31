import React, { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, TrendingUp, Activity, ExternalLink, Search, Filter, Grid, List, Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SneakerCard from '@/components/SneakerCard';
import LiveMarketData from '@/components/LiveMarketData';

// Interfaces for market data
interface AggregatedSneaker {
  id: string;
  name: string;
  brand: string;
  colorway: string;
  releaseDate: string;
  retailPrice: number;
  imageUrl: string;
  sources: {
    stockx?: {
      id: string;
      lowestAsk: number;
      highestBid: number;
      lastSale: number;
      salesCount: number;
      url: string;
    };
    goat?: {
      id: number;
      lowestPrice: number;
      highestOffer: number;
      lastSale: number;
      salesCount: number;
      url: string;
    };
  };
  marketData: {
    averagePrice: number;
    lowestPrice: number;
    highestPrice: number;
    totalSales: number;
    priceChange24h: number;
    trend: 'up' | 'down' | 'stable';
  };
  sizes?: Array<{
    size: string;
    price: number;
    available: boolean;
    source: 'stockx' | 'goat';
  }>;
}

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
  materials?: string;
  sku?: string;
  sizes?: string[];
}

interface Brand {
  id: number;
  name: string;
  logo: string;
}

const LiveMarket: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("catalog");
  // Fetch local sneakers for the catalog section
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
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Live Market</h1>
              <p className="text-muted-foreground">
                Browse sneakers with live prices and market data
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live Data</span>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="catalog">Sneaker Catalog</TabsTrigger>
            <TabsTrigger value="market">Market Analytics</TabsTrigger>
          </TabsList>

          {/* Catalog Tab - Combined with Live Market Data */}
          <TabsContent value="catalog" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search sneakers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Brand" />
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
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Category" />
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
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="price_low">Price: Low to High</SelectItem>
                        <SelectItem value="price_high">Price: High to Low</SelectItem>
                        <SelectItem value="name">Name A-Z</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex border rounded-md">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {sneakers ? `${sneakers.length} sneakers found` : 'Loading...'}
              </p>
            </div>

            {/* Sneakers Grid */}
            {sneakersLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-muted rounded-lg mb-4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                      <div className="h-4 bg-muted rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              }`}>
                {sneakers?.map((sneaker: Sneaker) => (
                  <Card key={sneaker.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={sneaker.images[0] || "/placeholder-sneaker.jpg"}
                        alt={sneaker.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <Badge variant="secondary" className="text-xs mb-2">
                            {sneaker.brandName || "Brand"}
                          </Badge>
                          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                            {sneaker.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {sneaker.colorway}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-bold text-primary">
                              {formatPrice(sneaker.retailPrice)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Retail Price
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-600">
                              Live Market Price
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Updating...
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button size="sm" className="flex-1" asChild>
                            <Link href={`/sneaker/${sneaker.slug}`}>
                              View Details
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Market Analytics Tab - Original LiveMarketData Component */}
          <TabsContent value="market" className="space-y-6">
            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-lg">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-Time Prices</h3>
                <p className="text-sm text-muted-foreground">
                  Live pricing data aggregated from StockX and GOAT marketplaces with automatic updates.
                </p>
              </div>

              <div className="text-center p-6 border rounded-lg">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Market Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Track price movements, sales volume, and market volatility across different platforms.
                </p>
              </div>

              <div className="text-center p-6 border rounded-lg">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Multi-Platform</h3>
                <p className="text-sm text-muted-foreground">
                  Compare prices across StockX, GOAT, and other major sneaker marketplaces in one place.
                </p>
              </div>
            </div>

            {/* Live Market Data Component */}
            <LiveMarketData />
          </TabsContent>
        </Tabs>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Data Sources</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Market data is aggregated from StockX, GOAT, and other major sneaker resale platforms. 
              Prices update every 5 minutes to ensure accuracy. Data may be delayed during high-traffic periods.
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <span>• StockX Integration</span>
              <span>• GOAT API</span>
              <span>• Real-time Updates</span>
              <span>• Multi-platform Comparison</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMarket;