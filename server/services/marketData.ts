import { db } from '../db';
import { sneakers, marketPrices, priceHistory } from '@shared/schema';
import { eq, desc, and, gte, avg, count } from 'drizzle-orm';

export interface MarketPrice {
  platform: string;
  price: number;
  currency: string;
  lastUpdated: Date;
  availability: 'in_stock' | 'out_of_stock' | 'limited';
  url?: string;
}

export interface PricePoint {
  price: number;
  timestamp: Date;
  platform: string;
  size?: string;
}

export interface MarketAnalytics {
  currentPrice: number;
  priceChange24h: number;
  priceChangePercent: number;
  volume24h: number;
  marketCap: number;
  volatility: number;
  trend: 'up' | 'down' | 'stable';
  platforms: MarketPrice[];
  priceHistory: PricePoint[];
}

class MarketDataService {
  private platformAPIs = {
    stockx: {
      baseUrl: 'https://stockx.com/api',
      rateLimit: 100, // requests per hour
      lastRequest: 0
    },
    goat: {
      baseUrl: 'https://www.goat.com/api',
      rateLimit: 200,
      lastRequest: 0
    },
    flightclub: {
      baseUrl: 'https://www.flightclub.com/api',
      rateLimit: 150,
      lastRequest: 0
    }
  };

  private mockMarketData = {
    // High-quality mock data that simulates real market conditions
    platforms: [
      {
        name: 'StockX',
        basePrice: 1.0,
        volatility: 0.15,
        trend: 1.02
      },
      {
        name: 'GOAT',
        basePrice: 1.05,
        volatility: 0.12,
        trend: 0.98
      },
      {
        name: 'Flight Club',
        basePrice: 1.15,
        volatility: 0.08,
        trend: 1.01
      },
      {
        name: 'Stadium Goods',
        basePrice: 1.12,
        volatility: 0.10,
        trend: 0.99
      }
    ]
  };

  async getMarketAnalytics(sneakerId: number, size?: string): Promise<MarketAnalytics> {
    try {
      // Get sneaker base price
      const [sneaker] = await db.select().from(sneakers).where(eq(sneakers.id, sneakerId));
      if (!sneaker) throw new Error('Sneaker not found');

      const basePrice = Number(sneaker.retailPrice) || 150;
      
      // Generate realistic market data
      const currentPlatformPrices = this.generateRealisticPrices(basePrice, sneaker.name);
      const currentPrice = this.calculateWeightedAveragePrice(currentPlatformPrices);
      
      // Calculate 24h change
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      const yesterdayPrice = this.generateHistoricalPrice(basePrice, oneDayAgo);
      const priceChange24h = currentPrice - yesterdayPrice;
      const priceChangePercent = (priceChange24h / yesterdayPrice) * 100;

      // Generate price history for chart
      const priceHistoryData = this.generatePriceHistory(basePrice, 30);

      return {
        currentPrice,
        priceChange24h,
        priceChangePercent,
        volume24h: Math.floor(Math.random() * 500) + 100,
        marketCap: currentPrice * (Math.floor(Math.random() * 10000) + 5000),
        volatility: this.calculateVolatility(priceHistoryData),
        trend: priceChange24h > 0 ? 'up' : priceChange24h < 0 ? 'down' : 'stable',
        platforms: currentPlatformPrices,
        priceHistory: priceHistoryData
      };
    } catch (error) {
      console.error('Error fetching market analytics:', error);
      throw error;
    }
  }

  private generateRealisticPrices(basePrice: number, sneakerName: string): MarketPrice[] {
    const platforms = this.mockMarketData.platforms;
    const now = new Date();
    
    // Add some market factors based on sneaker characteristics
    let marketMultiplier = 1.0;
    
    // Popular brands/models get higher prices
    if (sneakerName.toLowerCase().includes('jordan') || sneakerName.toLowerCase().includes('yeezy')) {
      marketMultiplier *= 1.3;
    }
    if (sneakerName.toLowerCase().includes('dunk') || sneakerName.toLowerCase().includes('travis')) {
      marketMultiplier *= 1.5;
    }
    
    // Add time-based volatility
    const timeVolatility = Math.sin(Date.now() / 100000) * 0.1;
    
    return platforms.map(platform => {
      const randomFactor = (Math.random() - 0.5) * platform.volatility;
      const trendFactor = platform.trend - 1;
      const finalPrice = basePrice * marketMultiplier * platform.basePrice * (1 + randomFactor + trendFactor + timeVolatility);
      
      return {
        platform: platform.name,
        price: Math.round(finalPrice),
        currency: 'USD',
        lastUpdated: new Date(now.getTime() - Math.random() * 3600000), // Within last hour
        availability: Math.random() > 0.3 ? 'in_stock' : Math.random() > 0.5 ? 'limited' : 'out_of_stock',
        url: `https://${platform.name.toLowerCase().replace(' ', '')}.com/search/${sneakerName.replace(/\s+/g, '-').toLowerCase()}`
      };
    });
  }

  private calculateWeightedAveragePrice(platformPrices: MarketPrice[]): number {
    const weights = {
      'StockX': 0.35,
      'GOAT': 0.30,
      'Flight Club': 0.20,
      'Stadium Goods': 0.15
    };
    
    let totalWeightedPrice = 0;
    let totalWeight = 0;
    
    platformPrices.forEach(price => {
      const weight = weights[price.platform as keyof typeof weights] || 0.1;
      totalWeightedPrice += price.price * weight;
      totalWeight += weight;
    });
    
    return Math.round(totalWeightedPrice / totalWeight);
  }

  private generateHistoricalPrice(basePrice: number, date: Date): number {
    // Generate consistent historical price based on date
    const daysSinceEpoch = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
    const seed = daysSinceEpoch % 1000;
    const randomFactor = (Math.sin(seed) * 0.2) + (Math.cos(seed * 1.5) * 0.1);
    return basePrice * (1 + randomFactor);
  }

  private generatePriceHistory(basePrice: number, days: number): PricePoint[] {
    const history: PricePoint[] = [];
    const now = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate price with realistic trends and volatility
      const dayProgress = (days - i) / days;
      const trendFactor = Math.sin(dayProgress * Math.PI * 2) * 0.15;
      const volatility = (Math.random() - 0.5) * 0.1;
      const seasonalFactor = Math.sin((date.getMonth() / 12) * Math.PI * 2) * 0.05;
      
      const price = basePrice * (1 + trendFactor + volatility + seasonalFactor);
      
      history.push({
        price: Math.round(price),
        timestamp: date,
        platform: 'Average',
        size: 'All'
      });
    }
    
    return history;
  }

  private calculateVolatility(priceHistory: PricePoint[]): number {
    if (priceHistory.length < 2) return 0;
    
    const prices = priceHistory.map(p => p.price);
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const standardDeviation = Math.sqrt(variance);
    
    return Number((standardDeviation / mean).toFixed(4));
  }

  async updateMarketPrices(sneakerId: number): Promise<void> {
    try {
      const analytics = await this.getMarketAnalytics(sneakerId);
      
      // Store current market prices
      for (const platformPrice of analytics.platforms) {
        await db.insert(marketPrices).values({
          sneakerId,
          platform: platformPrice.platform,
          price: platformPrice.price.toString(),
          currency: platformPrice.currency,
          availability: platformPrice.availability,
          lastUpdated: platformPrice.lastUpdated,
          url: platformPrice.url
        });
      }
      
      // Add to price history
      await db.insert(priceHistory).values({
        sneakerId,
        price: analytics.currentPrice.toString(),
        timestamp: new Date(),
        platform: 'Average',
        size: 'All'
      });
      
    } catch (error) {
      console.error('Error updating market prices:', error);
      throw error;
    }
  }

  async getTrendingSneakers(limit: number = 20): Promise<any[]> {
    try {
      // Get all sneakers for now and enhance with market data
      const allSneakers = await db.select().from(sneakers).limit(limit);
      
      return Promise.all(allSneakers.map(async sneaker => {
        const analytics = await this.getMarketAnalytics(sneaker.id);
        return {
          ...sneaker,
          currentPrice: analytics.currentPrice,
          priceChange24h: analytics.priceChange24h,
          trend: analytics.trend,
          trending: true
        };
      }));
    } catch (error) {
      console.error('Error fetching trending sneakers:', error);
      return [];
    }
  }

  async searchSneakersByPrice(minPrice?: number, maxPrice?: number, limit: number = 50): Promise<any[]> {
    try {
      // Get all sneakers and filter by price
      const allSneakers = await db.select().from(sneakers).limit(limit);
      
      // Filter by price if specified
      let filteredSneakers = allSneakers;
      if (minPrice !== undefined || maxPrice !== undefined) {
        filteredSneakers = allSneakers.filter(sneaker => {
          const price = Number(sneaker.retailPrice) || 0;
          return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
        });
      }
      
      // Enhance with market data
      return Promise.all(filteredSneakers.map(async sneaker => {
        const analytics = await this.getMarketAnalytics(sneaker.id);
        return {
          ...sneaker,
          marketData: {
            currentPrice: analytics.currentPrice,
            priceChange24h: analytics.priceChange24h,
            trend: analytics.trend
          }
        };
      }));
    } catch (error) {
      console.error('Error searching sneakers by price:', error);
      return [];
    }
  }
}

export const marketDataService = new MarketDataService();