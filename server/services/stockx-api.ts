import axios from 'axios';

interface StockXProduct {
  id: string;
  name: string;
  brand: string;
  colorway: string;
  releaseDate: string;
  retailPrice: number;
  market: {
    lastSale: number;
    lowestAsk: number;
    highestBid: number;
    salesThisPeriod: number;
    deadstockSold: number;
    volatility: number;
    priceChange: number;
    priceChangePercent: number;
  };
  media: {
    imageUrl: string;
    thumbUrl: string;
  };
  size: {
    sizeChart: string;
    sizes: Array<{
      size: string;
      lastSale: number;
      lowestAsk: number;
      highestBid: number;
    }>;
  };
}

interface StockXSearchResponse {
  products: StockXProduct[];
  total: number;
  hasMore: boolean;
}

class StockXAPI {
  private baseURL = 'https://stockx.com/api';
  private headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  // Search for sneakers on StockX
  async searchSneakers(query: string, limit: number = 20): Promise<StockXSearchResponse> {
    try {
      const response = await axios.get(`${this.baseURL}/browse`, {
        params: {
          _search: query,
          dataType: 'product',
          facetsToRetrieve: ['brand', 'category'],
          resultsPerPage: limit,
          page: 1
        },
        headers: this.headers,
        timeout: 10000
      });

      return {
        products: response.data.Products || [],
        total: response.data.Pagination?.total || 0,
        hasMore: response.data.Pagination?.hasNextPage || false
      };
    } catch (error) {
      console.error('StockX API search error:', error);
      throw new Error('Failed to search StockX');
    }
  }

  // Get detailed product information
  async getProduct(productId: string): Promise<StockXProduct | null> {
    try {
      const response = await axios.get(`${this.baseURL}/products/${productId}`, {
        headers: this.headers,
        timeout: 10000
      });

      return response.data.Product || null;
    } catch (error) {
      console.error(`StockX API product error for ${productId}:`, error);
      return null;
    }
  }

  // Get market data for a specific product
  async getMarketData(productId: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseURL}/products/${productId}/market`, {
        headers: this.headers,
        timeout: 10000
      });

      return response.data;
    } catch (error) {
      console.error(`StockX market data error for ${productId}:`, error);
      return null;
    }
  }

  // Get trending sneakers from StockX
  async getTrendingSneakers(category: string = 'sneakers'): Promise<StockXProduct[]> {
    try {
      const response = await axios.get(`${this.baseURL}/browse`, {
        params: {
          category: category,
          sort: 'featured',
          order: 'desc',
          resultsPerPage: 50
        },
        headers: this.headers,
        timeout: 10000
      });

      return response.data.Products || [];
    } catch (error) {
      console.error('StockX trending error:', error);
      return [];
    }
  }

  // Get price history for a product
  async getPriceHistory(productId: string, period: string = '1M'): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseURL}/products/${productId}/activity`, {
        params: {
          state: 'sold',
          currency: 'USD',
          sort: 'createdAt',
          order: 'DESC',
          limit: 100
        },
        headers: this.headers,
        timeout: 10000
      });

      return response.data.ProductActivity || [];
    } catch (error) {
      console.error(`StockX price history error for ${productId}:`, error);
      return [];
    }
  }
}

export const stockxAPI = new StockXAPI();
export type { StockXProduct, StockXSearchResponse };