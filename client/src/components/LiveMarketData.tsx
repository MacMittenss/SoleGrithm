import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { TrendingUp, TrendingDown, Search, ExternalLink, DollarSign, Activity, Calendar, Star } from 'lucide-react';

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
      lastSale: number;
      lowestAsk: number;
      highestBid: number;
      salesCount: number;
      priceChange: number;
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
    volatility: number;
    priceChange24h: number;
    marketCap: number;
  };
  popularityScore: number;
  lastUpdated: Date;
}

interface MarketTrends {
  trending: AggregatedSneaker[];
  mostActive: AggregatedSneaker[];
  biggestGainers: AggregatedSneaker[];
  biggestLosers: AggregatedSneaker[];
  newReleases: AggregatedSneaker[];
}

const LiveMarketData: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');

  // Fetch market trends
  const { data: marketTrends, isLoading: trendsLoading, error: trendsError } = useQuery({
    queryKey: ['/api/market/trends'],
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 2 * 60 * 1000 // Consider data stale after 2 minutes
  });

  // Search functionality
  const { data: searchResults, isLoading: searchLoading, refetch: searchSneakers } = useQuery({
    queryKey: ['/api/market/search', searchQuery],
    enabled: false, // Only run when explicitly called
    staleTime: 30 * 1000 // 30 seconds
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchSneakers();
      setActiveTab('search');
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatPercentage = (change: number): string => {
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  const SneakerCard: React.FC<{ sneaker: AggregatedSneaker; showSources?: boolean }> = ({ 
    sneaker, 
    showSources = true 
  }): React.ReactElement => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img 
              src={sneaker.imageUrl} 
              alt={sneaker.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/api/placeholder/80/80';
              }}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-sm truncate">{sneaker.name}</h3>
                <p className="text-xs text-muted-foreground">{sneaker.brand} • {sneaker.colorway}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                <Star className="w-3 h-3 mr-1" />
                {sneaker.popularityScore}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span className="font-medium">{formatPrice(sneaker.marketData.averagePrice)}</span>
              </div>
              <div className="flex items-center gap-1">
                {sneaker.marketData.priceChange24h >= 0 ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span className={sneaker.marketData.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatPercentage(sneaker.marketData.priceChange24h)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="w-3 h-3" />
                <span>{sneaker.marketData.totalSales} sales</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(sneaker.releaseDate).getFullYear()}</span>
              </div>
            </div>

            {showSources && (
              <div className="flex gap-2">
                {sneaker.sources.stockx && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={sneaker.sources.stockx.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      StockX {formatPrice(sneaker.sources.stockx.lastSale)}
                    </a>
                  </Button>
                )}
                {sneaker.sources.goat && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={sneaker.sources.goat.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      GOAT {formatPrice(sneaker.sources.goat.lastSale)}
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ErrorState: React.FC<{ error: any; title: string }> = ({ error, title }) => (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Activity className="w-6 h-6 text-yellow-600" />
        </div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Live market data is temporarily unavailable. Using local catalog data.
        </p>
        <Badge variant="outline">Fallback Mode</Badge>
      </CardContent>
    </Card>
  );

  if (trendsLoading) {
    return (
      <div className="space-y-6">
        <div className="h-12 bg-gray-100 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Live Market Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search sneakers across StockX, GOAT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={searchLoading}>
              {searchLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Market Data Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="active">Most Active</TabsTrigger>
          <TabsTrigger value="gainers">Gainers</TabsTrigger>
          <TabsTrigger value="losers">Losers</TabsTrigger>
          <TabsTrigger value="releases">New Releases</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-4">
          {trendsError ? (
            <ErrorState error={trendsError} title="Trending Data Unavailable" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(marketTrends as MarketTrends)?.trending?.map((sneaker: AggregatedSneaker) => (
                <SneakerCard key={sneaker.id} sneaker={sneaker} />
              )) || []}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(marketTrends as MarketTrends)?.mostActive?.map((sneaker: AggregatedSneaker) => (
              <SneakerCard key={sneaker.id} sneaker={sneaker} />
            )) || []}
          </div>
        </TabsContent>

        <TabsContent value="gainers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(marketTrends as MarketTrends)?.biggestGainers?.map((sneaker: AggregatedSneaker) => (
              <SneakerCard key={sneaker.id} sneaker={sneaker} />
            )) || []}
          </div>
        </TabsContent>

        <TabsContent value="losers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(marketTrends as MarketTrends)?.biggestLosers?.map((sneaker: AggregatedSneaker) => (
              <SneakerCard key={sneaker.id} sneaker={sneaker} />
            )) || []}
          </div>
        </TabsContent>

        <TabsContent value="releases" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(marketTrends as MarketTrends)?.newReleases?.map((sneaker: AggregatedSneaker) => (
              <SneakerCard key={sneaker.id} sneaker={sneaker} />
            )) || []}
          </div>
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          {(searchResults as any)?.results ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(searchResults as any).results.map((sneaker: AggregatedSneaker) => (
                <SneakerCard key={sneaker.id} sneaker={sneaker} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Search for sneakers to see live market data from StockX and GOAT
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Market Stats */}
      {marketTrends && (
        <Card>
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{(marketTrends as MarketTrends)?.trending?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Trending Items</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{(marketTrends as MarketTrends)?.biggestGainers?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Price Gainers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{(marketTrends as MarketTrends)?.newReleases?.length || 0}</div>
                <div className="text-sm text-muted-foreground">New Releases</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">Live</div>
                <div className="text-sm text-muted-foreground">Market Data</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LiveMarketData;