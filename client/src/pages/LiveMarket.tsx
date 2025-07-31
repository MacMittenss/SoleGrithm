import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft, TrendingUp, Activity, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LiveMarketData from '@/components/LiveMarketData';

const LiveMarket: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <h1 className="text-3xl font-bold">Live Market Data</h1>
              <p className="text-muted-foreground">
                Real-time sneaker prices and trends from StockX, GOAT, and more
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live Data</span>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Data Sources</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Market data is aggregated from StockX, GOAT, and other major sneaker resale platforms. 
              Prices are updated in real-time and cached for optimal performance.
            </p>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <span>• StockX API Integration</span>
              <span>• GOAT Market Data</span>
              <span>• Real-Time Updates</span>
              <span>• Price History Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMarket;