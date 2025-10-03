import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  Search,
  ArrowRight
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';


// Type definitions
interface MarketOverview {
  totalItems: number;
  topGainers: Array<{
    id: number;
    name: string;
    currentPrice: number;
    priceChange24h: number;
  }>;
  avgPrice: number;
  priceRange: { min: number; max: number };
  topLosers: Array<{
    id: number;
    name: string;
    currentPrice: number;
    priceChange24h: number;
  }>;
  lastUpdated: string;
}

interface TrendingSneaker {
  id: number;
  name: string;
  currentPrice: number;
  priceChange24h: number;
  trend: 'up' | 'down';
}

interface Sneaker {
  id: number;
  name: string;
  slug: string;
  retailPrice: number;
  colorway?: string;
  images?: string[];
}

const LiveMarketOverview: React.FC = () => {
  // ...existing code...
  // Real sneakers data for catalog and stats
  const { data: sneakers, isLoading: sneakersLoading } = useQuery<Sneaker[]>({
    queryKey: ['/api/sneakers'],
    queryFn: () => fetch('/api/sneakers').then(res => res.json()),
  });

  // Debug: log sneakers array to inspect retailPrice values
  console.log('Sneakers data:', sneakers);
  // Missing state hooks
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [showFullCatalog, setShowFullCatalog] = useState(false);

  // Placeholder for brands query
  const brands: Array<{ id: number; name: string; slug: string }> = [];

  // Real live market overview data
  const { data: overview, isLoading: overviewLoading } = useQuery<MarketOverview>({
    queryKey: ['/api/market/overview'],
    queryFn: () => fetch('/api/market/overview').then(res => res.json()),
    refetchInterval: 60000, // Refresh every minute
  });

  // Real trending sneakers data
  const { data: trending, isLoading: trendingLoading } = useQuery<TrendingSneaker[]>({
    queryKey: ['/api/market/trending'],
    queryFn: () => fetch('/api/market/trending?limit=10').then(res => res.json()),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Helper function stubs
  const fadeIn = {};
  const formatPrice = (price: number) => `$${price}`;
  const formatChange = (change: number) => `${change > 0 ? '+' : ''}${change}`;
  const getTrendColor = (change: number) => change > 0 ? 'text-green-400' : 'text-red-400';



      // Stats array defined after sneakers
      const stats = [
        { number: sneakers && Array.isArray(sneakers) ? sneakers.length.toLocaleString() : '--', label: 'Sneakers Tracked', icon: '📊' },
        { number: '15+', label: 'Data Sources', icon: '🔗' }, 
        { number: '99%', label: 'Accuracy Rate', icon: '✅' },
        { number: '24/7', label: 'Live Updates', icon: '🔄' }
      ];

  return (
    <div className="w-full space-y-16" data-testid="live-market-overview">
        {/* Header */}
        <motion.div
          {...fadeIn}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold uppercase tracking-wider text-white">
            LIVE MARKET
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time sneaker market data and trends
          </p>
        </motion.div>

        {/* Market Stats Section */}
        <motion.section
          {...fadeIn}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Stats Grid - Rearranged with 2x2 Layout */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            marginBottom: '1rem'
          }}>
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="stat-item"
                style={{ 
                  textAlign: 'left',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ 
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem'
                }}>
                  {stat.icon}
                </div>
                <div style={{ 
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: '#ffffff',
                  lineHeight: 1
                }}>
                  {stat.number}
                </div>
                <div style={{ 
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: '#999999',
                  letterSpacing: '0.025em'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          {/* Price Range */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-sm p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Price Range</p>
              <p className="text-xl font-bold text-white">
                {sneakersLoading || !sneakers || sneakers.length === 0
                  ? '--'
                  : (() => {
                      const prices = sneakers
                        .map(s => s.retailPrice)
                        .filter(price => typeof price === 'number' && price > 0);
                      console.log('Price range prices:', prices);
                      if (prices.length === 0) return '--';
                      const min = Math.min(...prices);
                      const max = Math.max(...prices);
                      return `${formatPrice(min)} - ${formatPrice(max)}`;
                    })()
                }
              </p>
            </div>
          </div>
          {/* Market Sentiment (placeholder) */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-sm p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Sentiment</p>
              <p className="text-xl font-bold text-white capitalize">
                {sneakers && sneakers.length > 0 ? 'Live' : 'Neutral'}
              </p>
            </div>
          </div>
          {/* Tracked Items */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-sm p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Tracked Items</p>
              <p className="text-3xl font-bold text-white">
                {sneakers ? sneakers.length : '--'}
              </p>
            </div>
          </div>
      </motion.section>

      {/* Market Movers Section */}
      {overview && (
        <motion.section
          {...fadeIn}
          className="space-y-8"
        >
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-white">
            MARKET MOVERS
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Gainers */}
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-sm p-6">
              <h3 className="text-lg font-medium text-white mb-6 uppercase tracking-wider">
                Top Gainers
              </h3>
              <div className="space-y-4">
                {overview.topGainers.slice(0, 5).map((gainer, index) => (
                  <div
                    key={gainer.id}
                    className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0"
                    data-testid={`gainer-${index}`}
                  >
                    <div>
                      <p className="font-medium text-white text-sm">
                        {gainer.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatPrice(gainer.currentPrice)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-400">
                          +${Math.abs(gainer.priceChange24h)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-sm p-6">
              <h3 className="text-lg font-medium text-white mb-6 uppercase tracking-wider">
                Top Losers
              </h3>
              <div className="space-y-4">
                {overview.topLosers.slice(0, 5).map((loser, index) => (
                  <div
                    key={loser.id}
                    className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0"
                    data-testid={`loser-${index}`}
                  >
                    <div>
                      <p className="font-medium text-white text-sm">
                        {loser.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatPrice(loser.currentPrice)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-400" />
                      <div className="text-right">
                        <p className="text-sm font-semibold text-red-400">
                          -${Math.abs(loser.priceChange24h)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Trending Section */}
      <motion.section
        {...fadeIn}
        className="space-y-8"
      >
        <h2 className="text-2xl font-semibold uppercase tracking-wide text-white">
          TRENDING NOW
        </h2>
        
        {trending && trending.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.slice(0, 6).map((sneaker, index) => (
              <div
                key={sneaker.id}
                className="bg-[#1a1a1a] border border-gray-800 rounded-sm p-6 group hover:border-gray-700 transition-colors"
                data-testid={`trending-sneaker-${index}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                      #{index + 1} Trending
                    </span>
                    <div className={`${getTrendColor(sneaker.priceChange24h)}`}>
                      {sneaker.trend === 'up' ? 
                        <TrendingUp className="w-4 h-4" /> : 
                        <TrendingDown className="w-4 h-4" />
                      }
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-white line-clamp-2">
                    {sneaker.name}
                  </h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-white">
                        {formatPrice(sneaker.currentPrice)}
                      </p>
                      <p className={`text-sm ${getTrendColor(sneaker.priceChange24h)}`}>
                        {formatChange(sneaker.priceChange24h)}
                      </p>
                    </div>
                    <Link href={`/sneakers/${sneaker.id}`}>
                      <span className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-sm">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No trending data available</p>
          </div>
        )}
      </motion.section>

      {/* Catalog Teaser Section */}
      <motion.section
        {...fadeIn}
        className="space-y-8"
      >
        <h2 className="text-2xl font-semibold uppercase tracking-wide text-white">
          EXPLORE CATALOG
        </h2>
        
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-sm p-8">
          <div className="space-y-6">
            {/* Search and Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search sneakers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black border-gray-700 text-white placeholder:text-gray-500"
                  data-testid="catalog-search"
                />
              </div>

              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger 
                  className="bg-black border-gray-700 text-white"
                  data-testid="brand-filter"
                >
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands?.map((brand) => (
                    <SelectItem key={brand.id} value={brand.slug}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={() => setShowFullCatalog(!showFullCatalog)}
                className="bg-white text-black hover:bg-gray-200 font-medium uppercase tracking-wider"
                data-testid="browse-catalog"
              >
                {showFullCatalog ? 'Hide Catalog' : 'Browse Catalog'}
              </Button>
            </div>

            {/* Quick Preview (when not expanded) */}
            {!showFullCatalog && sneakers && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sneakers.slice(0, 4).map((sneaker) => (
                  <Link key={sneaker.id} href={`/sneakers/${sneaker.slug}`}>
                    <div className="group cursor-pointer">
                      <div className="aspect-square bg-gray-900 rounded-sm mb-2 overflow-hidden">
                        <img
                                src={Array.isArray(sneaker.images) && sneaker.images.length > 0 ? sneaker.images[0] : "https://images.unsplash.com/photo-1551107696-a4b537c892cc"}
                          alt={sneaker.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-sm text-white font-medium line-clamp-1">
                        {sneaker.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        ${sneaker.retailPrice}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Expanded Catalog */}
            {showFullCatalog && (
              <div className="space-y-6">
                {sneakersLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-48 bg-gray-800 rounded-sm mb-4" />
                        <div className="h-4 bg-gray-800 rounded mb-2" />
                        <div className="h-3 bg-gray-800 rounded w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sneakers?.map((sneaker) => (
                      <Link key={sneaker.id} href={`/sneakers/${sneaker.slug}`}>
                        <div className="group cursor-pointer">
                          <div className="aspect-[4/3] bg-gray-900 rounded-sm mb-4 overflow-hidden">
                            <img
                                src={Array.isArray(sneaker.images) && sneaker.images.length > 0 ? sneaker.images[0] : "https://images.unsplash.com/photo-1551107696-a4b537c892cc"}
                              alt={sneaker.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <h3 className="font-medium text-white mb-1 line-clamp-2">
                            {sneaker.name}
                          </h3>
                          <p className="text-sm text-gray-400 mb-2">
                            {sneaker.colorway}
                          </p>
                          <p className="text-lg font-bold text-white">
                            ${sneaker.retailPrice}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Footer Note */}
      {overview && (
        <div className="text-center text-sm text-gray-500">
          Last updated: {new Date(overview.lastUpdated).toLocaleTimeString()} • 
          Data refreshes automatically
        </div>
      )}
    </div>
  );
}

export default LiveMarketOverview;