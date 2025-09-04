/**
 * SoleRadar Market Data Service
 * Real-time sneaker market intelligence from multiple sources
 */

interface MarketData {
  source: 'stockx' | 'goat' | 'kicksonfire' | 'internal';
  sneakerId: string;
  name: string;
  brand: string;
  lowestAsk: number;
  highestBid: number;
  lastSale: number;
  salesVolume24h: number;
  priceChange24h: number;
  priceChangePercent: number;
  totalTrades: number;
  averagePrice: number;
  marketCap: number;
  volatility: number;
  trendingScore: number;
  timestamp: string;
}

interface TrendingMetrics {
  weeklyGrowth: number;
  searchVolume: number;
  socialMentions: number;
  heatIndex: number;
  marketActivity: string;
  isHot: boolean;
  rank: number;
}

interface InternalAnalytics {
  searchCount: number;
  viewCount: number;
  wishlistCount: number;
  clickCount: number;
  conversionRate: number;
  userEngagement: number;
}

class SneakerMarketService {
  private baseUrls = {
    stockx: 'https://stockx.com/api',
    goat: 'https://goat.com/api', 
    kicksonfire: 'https://kicksonfire.com/api'
  };

  /**
   * Get real-time trending sneakers from multiple sources
   */
  async getTrendingNow(): Promise<MarketData[]> {
    try {
      // In production, these would be real API calls
      // For now, we'll simulate with enhanced mock data that represents real market patterns
      
      const trendingData: MarketData[] = [
        {
          source: 'stockx',
          sneakerId: 'air-jordan-1-bred',
          name: 'Air Jordan 1 Retro High OG "Bred"',
          brand: 'Jordan',
          lowestAsk: 289,
          highestBid: 275,
          lastSale: 282,
          salesVolume24h: 847,
          priceChange24h: 12,
          priceChangePercent: 4.5,
          totalTrades: 15420,
          averagePrice: 276,
          marketCap: 4250000,
          volatility: 0.15,
          trendingScore: 94,
          timestamp: new Date().toISOString()
        },
        {
          source: 'goat',
          sneakerId: 'nike-dunk-low-panda',
          name: 'Nike Dunk Low "Panda"',
          brand: 'Nike',
          lowestAsk: 132,
          highestBid: 125,
          lastSale: 128,
          salesVolume24h: 1205,
          priceChange24h: 8,
          priceChangePercent: 6.7,
          totalTrades: 28950,
          averagePrice: 124,
          marketCap: 3590000,
          volatility: 0.12,
          trendingScore: 91,
          timestamp: new Date().toISOString()
        },
        {
          source: 'stockx',
          sneakerId: 'yeezy-350-zebra',
          name: 'Adidas Yeezy Boost 350 V2 "Zebra"',
          brand: 'Adidas',
          lowestAsk: 257,
          highestBid: 248,
          lastSale: 253,
          salesVolume24h: 623,
          priceChange24h: 15,
          priceChangePercent: 6.3,
          totalTrades: 12180,
          averagePrice: 245,
          marketCap: 2985000,
          volatility: 0.18,
          trendingScore: 89,
          timestamp: new Date().toISOString()
        }
      ];

      // Sort by trending score
      return trendingData.sort((a, b) => b.trendingScore - a.trendingScore);
    } catch (error) {
      console.error('Error fetching trending data:', error);
      throw new Error('Failed to fetch market data');
    }
  }

  /**
   * Get most traded sneakers in the last 24 hours
   */
  async getMostTraded(): Promise<MarketData[]> {
    try {
      const trendingData = await this.getTrendingNow();
      
      // Sort by sales volume (most traded)
      return trendingData.sort((a, b) => b.salesVolume24h - a.salesVolume24h);
    } catch (error) {
      console.error('Error fetching most traded:', error);
      throw new Error('Failed to fetch trading data');
    }
  }

  /**
   * Get biggest price gainers (climbing the charts)
   */
  async getClimbingCharts(): Promise<MarketData[]> {
    try {
      const trendingData = await this.getTrendingNow();
      
      // Sort by price change percentage (biggest gainers)
      return trendingData.sort((a, b) => b.priceChangePercent - a.priceChangePercent);
    } catch (error) {
      console.error('Error fetching climbing charts:', error);
      throw new Error('Failed to fetch price gainers');
    }
  }

  /**
   * Get internal app analytics for trending
   */
  async getInternalAnalytics(): Promise<InternalAnalytics[]> {
    try {
      // This would connect to your internal analytics database
      // Simulating internal app data
      return [
        {
          searchCount: 15420,
          viewCount: 48950,
          wishlistCount: 2840,
          clickCount: 12560,
          conversionRate: 0.26,
          userEngagement: 0.78
        }
      ];
    } catch (error) {
      console.error('Error fetching internal analytics:', error);
      throw new Error('Failed to fetch analytics');
    }
  }

  /**
   * Get real-time market metrics summary
   */
  async getMarketMetrics(): Promise<{
    totalVolume24h: number;
    avgPriceChange: number;
    topGainer: MarketData;
    mostActive: MarketData;
    marketSentiment: 'bullish' | 'bearish' | 'neutral';
  }> {
    try {
      const trending = await this.getTrendingNow();
      
      const totalVolume24h = trending.reduce((sum, item) => sum + item.salesVolume24h, 0);
      const avgPriceChange = trending.reduce((sum, item) => sum + item.priceChangePercent, 0) / trending.length;
      const topGainer = trending.reduce((prev, current) => 
        current.priceChangePercent > prev.priceChangePercent ? current : prev
      );
      const mostActive = trending.reduce((prev, current) => 
        current.salesVolume24h > prev.salesVolume24h ? current : prev
      );
      
      const marketSentiment = avgPriceChange > 5 ? 'bullish' : avgPriceChange < -5 ? 'bearish' : 'neutral';

      return {
        totalVolume24h,
        avgPriceChange,
        topGainer,
        mostActive,
        marketSentiment
      };
    } catch (error) {
      console.error('Error calculating market metrics:', error);
      throw new Error('Failed to calculate market metrics');
    }
  }

  /**
   * Search for specific sneaker market data
   */
  async searchMarketData(query: string): Promise<MarketData[]> {
    try {
      const allData = await this.getTrendingNow();
      
      return allData.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.brand.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching market data:', error);
      throw new Error('Failed to search market data');
    }
  }

  /**
   * Get price alerts and notifications
   */
  async getPriceAlerts(sneakerId: string): Promise<{
    currentPrice: number;
    targetPrice: number;
    alertType: 'above' | 'below';
    triggered: boolean;
    trend: 'up' | 'down' | 'stable';
  }[]> {
    try {
      // This would connect to user's saved price alerts
      return [];
    } catch (error) {
      console.error('Error fetching price alerts:', error);
      throw new Error('Failed to fetch price alerts');
    }
  }
}

export const sneakerMarketService = new SneakerMarketService();
export type { MarketData, TrendingMetrics, InternalAnalytics };