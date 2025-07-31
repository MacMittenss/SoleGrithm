import { stockxAPI, StockXProduct } from './stockx-api.js';
import { goatAPI, GOATProduct } from './goat-api.js';

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

class SneakerMarketAggregator {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  // Get cached data if available and not expired
  private getCached(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  // Set cache data
  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // Search across all platforms
  async searchSneakers(query: string, limit: number = 20): Promise<AggregatedSneaker[]> {
    const cacheKey = `search:${query}:${limit}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      const [stockxResults, goatResults] = await Promise.allSettled([
        stockxAPI.searchSneakers(query, Math.ceil(limit / 2)),
        goatAPI.searchSneakers(query, Math.ceil(limit / 2))
      ]);

      const aggregated: AggregatedSneaker[] = [];

      // Process StockX results
      if (stockxResults.status === 'fulfilled') {
        for (const product of stockxResults.value.products.slice(0, limit)) {
          aggregated.push(this.convertStockXToAggregated(product));
        }
      }

      // Process GOAT results
      if (goatResults.status === 'fulfilled') {
        for (const product of goatResults.value.products.slice(0, limit)) {
          const existing = aggregated.find(s => 
            s.name.toLowerCase().includes(product.name.toLowerCase()) ||
            product.name.toLowerCase().includes(s.name.toLowerCase())
          );

          if (existing) {
            // Merge with existing product
            this.mergeGOATData(existing, product);
          } else {
            aggregated.push(this.convertGOATToAggregated(product));
          }
        }
      }

      // Sort by popularity score and limit results
      const result = aggregated
        .sort((a, b) => b.popularityScore - a.popularityScore)
        .slice(0, limit);

      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Market aggregator search error:', error);
      return [];
    }
  }

  // Get trending sneakers across all platforms
  async getTrendingSneakers(limit: number = 50): Promise<AggregatedSneaker[]> {
    const cacheKey = `trending:${limit}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      const [stockxTrending, goatTrending] = await Promise.allSettled([
        stockxAPI.getTrendingSneakers(),
        goatAPI.getTrendingSneakers()
      ]);

      const aggregated: AggregatedSneaker[] = [];

      // Process results from both platforms
      if (stockxTrending.status === 'fulfilled') {
        stockxTrending.value.slice(0, limit).forEach(product => {
          aggregated.push(this.convertStockXToAggregated(product));
        });
      }

      if (goatTrending.status === 'fulfilled') {
        goatTrending.value.slice(0, limit).forEach(product => {
          const existing = aggregated.find(s => 
            this.isSimilarProduct(s.name, product.name)
          );

          if (existing) {
            this.mergeGOATData(existing, product);
          } else {
            aggregated.push(this.convertGOATToAggregated(product));
          }
        });
      }

      const result = aggregated
        .sort((a, b) => b.popularityScore - a.popularityScore)
        .slice(0, limit);

      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Market aggregator trending error:', error);
      return [];
    }
  }

  // Get comprehensive market trends
  async getMarketTrends(): Promise<MarketTrends> {
    const cacheKey = 'market-trends';
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      const [trending, newReleases] = await Promise.all([
        this.getTrendingSneakers(100),
        this.getNewReleases(50)
      ]);

      const trends: MarketTrends = {
        trending: trending.slice(0, 20),
        mostActive: trending
          .sort((a, b) => b.marketData.totalSales - a.marketData.totalSales)
          .slice(0, 20),
        biggestGainers: trending
          .filter(s => s.marketData.priceChange24h > 0)
          .sort((a, b) => b.marketData.priceChange24h - a.marketData.priceChange24h)
          .slice(0, 20),
        biggestLosers: trending
          .filter(s => s.marketData.priceChange24h < 0)
          .sort((a, b) => a.marketData.priceChange24h - b.marketData.priceChange24h)
          .slice(0, 20),
        newReleases: newReleases.slice(0, 20)
      };

      this.setCache(cacheKey, trends);
      return trends;
    } catch (error) {
      console.error('Market trends error:', error);
      throw new Error('Failed to fetch market trends');
    }
  }

  // Get new releases
  async getNewReleases(limit: number = 20): Promise<AggregatedSneaker[]> {
    const cacheKey = `new-releases:${limit}`;
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      const goatReleases = await goatAPI.getNewReleases(limit);
      const result = goatReleases.map(product => this.convertGOATToAggregated(product));

      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.error('New releases error:', error);
      return [];
    }
  }

  // Convert StockX product to aggregated format
  private convertStockXToAggregated(product: StockXProduct): AggregatedSneaker {
    return {
      id: `stockx-${product.id}`,
      name: product.name,
      brand: product.brand,
      colorway: product.colorway,
      releaseDate: product.releaseDate,
      retailPrice: product.retailPrice,
      imageUrl: product.media.imageUrl,
      sources: {
        stockx: {
          id: product.id,
          lastSale: product.market.lastSale,
          lowestAsk: product.market.lowestAsk,
          highestBid: product.market.highestBid,
          salesCount: product.market.salesThisPeriod,
          priceChange: product.market.priceChange,
          url: `https://stockx.com/${product.id}`
        }
      },
      marketData: {
        averagePrice: product.market.lastSale,
        lowestPrice: product.market.lowestAsk,
        highestPrice: product.market.lastSale,
        totalSales: product.market.salesThisPeriod,
        volatility: product.market.volatility,
        priceChange24h: product.market.priceChangePercent,
        marketCap: product.market.lastSale * product.market.salesThisPeriod
      },
      popularityScore: this.calculatePopularityScore(product.market.salesThisPeriod, product.market.volatility),
      lastUpdated: new Date()
    };
  }

  // Convert GOAT product to aggregated format
  private convertGOATToAggregated(product: GOATProduct): AggregatedSneaker {
    const lowestPrice = product.market_data?.lowest_price_cents ? product.market_data.lowest_price_cents / 100 : 0;
    const lastSale = product.market_data?.last_sale_price_cents ? product.market_data.last_sale_price_cents / 100 : 0;
    const salesCount = product.market_data?.number_of_sales || 0;

    return {
      id: `goat-${product.id}`,
      name: product.name,
      brand: product.brand_name,
      colorway: product.color,
      releaseDate: product.release_date,
      retailPrice: product.retail_price_cents ? product.retail_price_cents / 100 : 0,
      imageUrl: product.main_picture_url,
      sources: {
        goat: {
          id: product.id,
          lowestPrice: lowestPrice,
          highestOffer: product.market_data?.highest_offer_cents ? product.market_data.highest_offer_cents / 100 : 0,
          lastSale: lastSale,
          salesCount: salesCount,
          url: `https://goat.com/sneakers/${product.id}`
        }
      },
      marketData: {
        averagePrice: product.market_data?.average_price_cents ? product.market_data.average_price_cents / 100 : lastSale,
        lowestPrice: lowestPrice,
        highestPrice: lastSale,
        totalSales: salesCount,
        volatility: 0,
        priceChange24h: product.market_data?.price_premium || 0,
        marketCap: lastSale * salesCount
      },
      popularityScore: this.calculatePopularityScore(salesCount, 0),
      lastUpdated: new Date()
    };
  }

  // Merge GOAT data into existing aggregated product
  private mergeGOATData(existing: AggregatedSneaker, goatProduct: GOATProduct): void {
    const goatPrice = goatProduct.market_data?.last_sale_price_cents ? goatProduct.market_data.last_sale_price_cents / 100 : 0;
    const goatSales = goatProduct.market_data?.number_of_sales || 0;

    existing.sources.goat = {
      id: goatProduct.id,
      lowestPrice: goatProduct.market_data?.lowest_price_cents ? goatProduct.market_data.lowest_price_cents / 100 : 0,
      highestOffer: goatProduct.market_data?.highest_offer_cents ? goatProduct.market_data.highest_offer_cents / 100 : 0,
      lastSale: goatPrice,
      salesCount: goatSales,
      url: `https://goat.com/sneakers/${goatProduct.id}`
    };

    // Update market data with combined information
    const stockxPrice = existing.sources.stockx?.lastSale || 0;
    existing.marketData.averagePrice = (stockxPrice + goatPrice) / 2;
    existing.marketData.lowestPrice = Math.min(existing.marketData.lowestPrice, goatPrice);
    existing.marketData.totalSales += goatSales;
    existing.popularityScore = this.calculatePopularityScore(existing.marketData.totalSales, existing.marketData.volatility);
  }

  // Check if two product names are similar
  private isSimilarProduct(name1: string, name2: string): boolean {
    const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const n1 = normalize(name1);
    const n2 = normalize(name2);
    
    return n1.includes(n2) || n2.includes(n1) || this.levenshteinDistance(n1, n2) < 3;
  }

  // Calculate Levenshtein distance for string similarity
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + substitutionCost
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  // Calculate popularity score based on sales and volatility
  private calculatePopularityScore(sales: number, volatility: number): number {
    const salesScore = Math.min(sales / 100, 50); // Max 50 points for sales
    const volatilityScore = Math.min(volatility * 10, 30); // Max 30 points for volatility
    const baseScore = 20; // Base score for having data
    
    return Math.round(salesScore + volatilityScore + baseScore);
  }
}

export const marketAggregator = new SneakerMarketAggregator();
export type { AggregatedSneaker, MarketTrends };