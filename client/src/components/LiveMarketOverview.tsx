import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  DollarSign,
  Activity,
  Eye,
  Search,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import MarketDataCard from './MarketDataCard';

interface MarketOverview {
  totalItems: number;
  avgPrice: number;
  priceRange: { min: number; max: number };
  topGainers: Array<{
    id: number;
    name: string;
    currentPrice: number;
    priceChange24h: number;
    trend: string;
  }>;
  topLosers: Array<{
    id: number;
    name: string;
    currentPrice: number;
    priceChange24h: number;
    trend: string;
  }>;
  marketSentiment: 'bullish' | 'bearish';
  lastUpdated: string;
}

interface TrendingSneaker {
  id: number;
  name: string;
  currentPrice: number;
  priceChange24h: number;
  trend: 'up' | 'down' | 'stable';
  trending: boolean;
}

export function LiveMarketOverview() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSneaker, setSelectedSneaker] = useState<number | null>(null);

  const { data: overview, isLoading: overviewLoading } = useQuery<MarketOverview>({
    queryKey: ['/api/market/overview'],
    refetchInterval: 60000, // Refresh every minute
  });

  const { data: trending, isLoading: trendingLoading } = useQuery<TrendingSneaker[]>({
    queryKey: ['/api/market/trending'],
    queryFn: () => fetch('/api/market/trending?limit=10').then(res => res.json()),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const formatPrice = (price: number) => `$${price.toLocaleString()}`;
  const formatChange = (change: number, isPercent: boolean = false) => {
    const formatted = isPercent ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : `${change >= 0 ? '+' : ''}$${Math.abs(change)}`;
    return formatted;
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return 'text-green-600 dark:text-green-400';
    if (value < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="w-full space-y-6" data-testid="live-market-overview">
      {/* Market Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Live Sneaker Market
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Real-time prices, trends, and market analytics
        </p>
        {overview && (
          <Badge variant="outline" className="text-xs">
            Market is {overview.marketSentiment} • {overview.totalItems} tracked items
          </Badge>
        )}
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" data-testid="tab-overview">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="trending" data-testid="tab-trending">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="detailed" data-testid="tab-detailed">
            <Eye className="w-4 h-4 mr-2" />
            Detailed View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Market Stats Cards */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Avg Price</p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {overview ? formatPrice(overview.avgPrice) : '--'}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">Price Range</p>
                      <p className="text-lg font-bold text-green-900 dark:text-green-100">
                        {overview ? `${formatPrice(overview.priceRange.min)} - ${formatPrice(overview.priceRange.max)}` : '--'}
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Market Sentiment</p>
                      <p className="text-lg font-bold text-purple-900 dark:text-purple-100 capitalize">
                        {overview?.marketSentiment || 'Neutral'}
                      </p>
                    </div>
                    {overview?.marketSentiment === 'bullish' ? 
                      <TrendingUp className="w-8 h-8 text-green-600" /> : 
                      <TrendingDown className="w-8 h-8 text-red-600" />
                    }
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Tracked Items</p>
                      <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                        {overview?.totalItems || '--'}
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Top Gainers and Losers */}
          {overview && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600 dark:text-green-400 flex items-center gap-2">
                      <ArrowUpRight className="w-5 h-5" />
                      Top Gainers (24h)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {overview.topGainers.slice(0, 3).map((gainer, index) => (
                        <motion.div
                          key={gainer.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                          onClick={() => setSelectedSneaker(gainer.id)}
                          data-testid={`gainer-${index}`}
                        >
                          <div>
                            <p className="font-medium text-green-900 dark:text-green-100">
                              {gainer.name}
                            </p>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              {formatPrice(gainer.currentPrice)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600 dark:text-green-400">
                              +${Math.abs(gainer.priceChange24h)}
                            </p>
                            <p className="text-xs text-green-500">
                              +{((gainer.priceChange24h / gainer.currentPrice) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600 dark:text-red-400 flex items-center gap-2">
                      <ArrowDownRight className="w-5 h-5" />
                      Top Losers (24h)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {overview.topLosers.slice(0, 3).map((loser, index) => (
                        <motion.div
                          key={loser.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                          onClick={() => setSelectedSneaker(loser.id)}
                          data-testid={`loser-${index}`}
                        >
                          <div>
                            <p className="font-medium text-red-900 dark:text-red-100">
                              {loser.name}
                            </p>
                            <p className="text-sm text-red-700 dark:text-red-300">
                              {formatPrice(loser.currentPrice)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-red-600 dark:text-red-400">
                              -${Math.abs(loser.priceChange24h)}
                            </p>
                            <p className="text-xs text-red-500">
                              {((loser.priceChange24h / loser.currentPrice) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Trending Sneakers</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {trending && trending.length > 0 ? (
              trending.map((sneaker, index) => (
                <motion.div
                  key={sneaker.id}
                  variants={itemVariants}
                  className="cursor-pointer"
                  onClick={() => setSelectedSneaker(sneaker.id)}
                  data-testid={`trending-sneaker-${index}`}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          #{index + 1} Trending
                        </Badge>
                        <div className={`flex items-center gap-1 ${getTrendColor(sneaker.priceChange24h)}`}>
                          {sneaker.trend === 'up' ? 
                            <TrendingUp className="w-4 h-4" /> : 
                            <TrendingDown className="w-4 h-4" />
                          }
                        </div>
                      </div>
                      <h4 className="font-medium mb-2 line-clamp-2">{sneaker.name}</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold">{formatPrice(sneaker.currentPrice)}</p>
                          <p className={`text-sm ${getTrendColor(sneaker.priceChange24h)}`}>
                            {formatChange(sneaker.priceChange24h)}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Activity className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No trending data available at the moment</p>
                <Button variant="outline" className="mt-4">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="detailed">
          <div className="space-y-4">
            {selectedSneaker ? (
              <MarketDataCard 
                sneakerId={selectedSneaker} 
                sneakerName={trending?.find(s => s.id === selectedSneaker)?.name || 'Selected Sneaker'}
              />
            ) : (
              <div className="text-center py-12">
                <Eye className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Select a sneaker from the trending tab to view detailed market data</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {overview && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date(overview.lastUpdated).toLocaleTimeString()} • 
          Data refreshes automatically
        </div>
      )}
    </div>
  );
}

export default LiveMarketOverview;