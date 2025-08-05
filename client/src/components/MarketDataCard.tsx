import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  ExternalLink,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface MarketAnalytics {
  currentPrice: number;
  priceChange24h: number;
  priceChangePercent: number;
  volume24h: number;
  marketCap: number;
  volatility: number;
  trend: 'up' | 'down' | 'stable';
  platforms: Array<{
    platform: string;
    price: number;
    currency: string;
    lastUpdated: Date;
    availability: 'in_stock' | 'out_of_stock' | 'limited';
    url?: string;
  }>;
  priceHistory: Array<{
    price: number;
    timestamp: Date;
    platform: string;
    size?: string;
  }>;
}

interface MarketDataCardProps {
  sneakerId: number;
  sneakerName: string;
  size?: string;
  compact?: boolean;
}

export function MarketDataCard({ sneakerId, sneakerName, size, compact = false }: MarketDataCardProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: analytics, isLoading, error } = useQuery<MarketAnalytics>({
    queryKey: ['/api/market/analytics', sneakerId, size, refreshKey],
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 15000, // Consider data stale after 15 seconds
  });

  const { data: comparison } = useQuery({
    queryKey: ['/api/market/compare', sneakerId, refreshKey],
    refetchInterval: 60000, // Refresh every minute
  });

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <Card className="w-full" data-testid="card-market-loading">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Market Data</CardTitle>
            <div className="animate-spin">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !analytics) {
    return (
      <Card className="w-full border-red-200 dark:border-red-800" data-testid="card-market-error">
        <CardContent className="pt-6">
          <div className="text-center text-red-600 dark:text-red-400">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Market data unavailable</p>
            <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
              <RefreshCw className="w-4 h-4 mr-1" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatPrice = (price: number) => `$${price.toLocaleString()}`;
  const formatChange = (change: number, isPercent: boolean = false) => {
    const formatted = isPercent ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : `${change >= 0 ? '+' : ''}$${Math.abs(change)}`;
    return formatted;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return 'text-green-600 dark:text-green-400';
    if (value < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        data-testid="card-market-compact"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Market Price</span>
          <Button variant="ghost" size="sm" onClick={handleRefresh} className="h-6 w-6 p-0">
            <RefreshCw className="w-3 h-3" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{formatPrice(analytics.currentPrice)}</div>
            <div className={`flex items-center text-sm ${getTrendColor(analytics.priceChange24h)}`}>
              {getTrendIcon(analytics.trend)}
              <span className="ml-1">{formatChange(analytics.priceChangePercent, true)}</span>
            </div>
          </div>
          <Badge variant={analytics.trend === 'up' ? 'default' : analytics.trend === 'down' ? 'destructive' : 'secondary'}>
            {analytics.trend}
          </Badge>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      data-testid="card-market-full"
    >
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Live Market Data
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Live
              </Badge>
              <Button variant="ghost" size="sm" onClick={handleRefresh} data-testid="button-refresh-market">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{sneakerName}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Price Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Current Price</label>
              <div className="text-3xl font-bold">{formatPrice(analytics.currentPrice)}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">24h Change</label>
              <div className={`text-xl font-semibold flex items-center gap-1 ${getTrendColor(analytics.priceChange24h)}`}>
                {getTrendIcon(analytics.trend)}
                <span>{formatChange(analytics.priceChange24h)}</span>
                <span className="text-sm">({formatChange(analytics.priceChangePercent, true)})</span>
              </div>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-300">Volume (24h)</div>
              <div className="font-semibold">{analytics.volume24h}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-300">Market Cap</div>
              <div className="font-semibold">{formatPrice(analytics.marketCap)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-300">Volatility</div>
              <div className="font-semibold">{(analytics.volatility * 100).toFixed(2)}%</div>
            </div>
          </div>

          {/* Platform Prices */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">
              Platform Comparison
            </label>
            <div className="space-y-2">
              {analytics.platforms.slice(0, 4).map((platform, index) => (
                <motion.div
                  key={platform.platform}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  data-testid={`platform-${platform.platform.toLowerCase().replace(' ', '-')}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{platform.platform}</div>
                    <Badge 
                      variant={platform.availability === 'in_stock' ? 'default' : 
                              platform.availability === 'limited' ? 'secondary' : 'destructive'}
                      className="text-xs"
                    >
                      {platform.availability.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{formatPrice(platform.price)}</span>
                    {platform.url && (
                      <Button variant="ghost" size="sm" asChild className="h-6 w-6 p-0">
                        <a href={platform.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Best Deal Recommendation */}
          {comparison && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-green-800 dark:text-green-200">Best Deal</div>
                  <div className="text-green-700 dark:text-green-300">
                    {comparison.recommendation?.name} - {formatPrice(comparison.bestPrice)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-600 dark:text-green-400">Save</div>
                  <div className="font-semibold text-green-700 dark:text-green-300">
                    {formatPrice(comparison.priceSpread)}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2 border-t border-gray-200 dark:border-gray-700">
            Last updated: {new Date().toLocaleTimeString()} • Auto-refreshes every 30s
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default MarketDataCard;