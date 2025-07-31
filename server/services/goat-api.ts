import axios from 'axios';

interface GOATProduct {
  id: number;
  name: string;
  brand_name: string;
  color: string;
  details: string;
  release_date: string;
  retail_price_cents: number;
  story_html: string;
  main_picture_url: string;
  picture_urls: string[];
  status: string;
  market_data: {
    lowest_price_cents: number;
    lowest_price_cents_usd: number;
    highest_offer_cents: number;
    last_sale_price_cents: number;
    last_sale_size: string;
    number_of_sales: number;
    price_premium: number;
    average_price_cents: number;
  };
  sizes: Array<{
    size: string;
    lowest_price_cents: number;
    highest_offer_cents: number;
    last_sale_price_cents: number;
  }>;
}

interface GOATSearchResponse {
  products: GOATProduct[];
  count: number;
  facets: any;
}

class GOATAPI {
  private baseURL = 'https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2';
  private appId = '2FWOTDVM2O';
  private apiKey = 'ac96de6fef0e02bb95d433d8d5c7038a'; // Public search key
  
  private headers = {
    'X-Algolia-Application-Id': this.appId,
    'X-Algolia-API-Key': this.apiKey,
    'Content-Type': 'application/json'
  };

  // Search for sneakers on GOAT
  async searchSneakers(query: string, limit: number = 20): Promise<GOATSearchResponse> {
    try {
      const searchPayload = {
        params: `query=${encodeURIComponent(query)}&hitsPerPage=${limit}&page=0&facets=["brand_name","category","color","size"]&attributesToRetrieve=["id","name","brand_name","color","details","main_picture_url","lowest_price_cents","retail_price_cents","release_date"]`
      };

      const response = await axios.post(`${this.baseURL}/query`, searchPayload, {
        headers: this.headers,
        timeout: 10000
      });

      return {
        products: response.data.hits || [],
        count: response.data.nbHits || 0,
        facets: response.data.facets || {}
      };
    } catch (error) {
      console.error('GOAT API search error:', error);
      throw new Error('Failed to search GOAT');
    }
  }

  // Get detailed product information
  async getProduct(productId: number): Promise<GOATProduct | null> {
    try {
      // GOAT doesn't have a direct product endpoint for public access
      // We'll need to search by ID or use their GraphQL endpoint
      const searchResponse = await this.searchSneakers(`objectID:${productId}`, 1);
      return searchResponse.products[0] || null;
    } catch (error) {
      console.error(`GOAT API product error for ${productId}:`, error);
      return null;
    }
  }

  // Get trending sneakers from GOAT
  async getTrendingSneakers(category: string = 'sneakers'): Promise<GOATProduct[]> {
    try {
      const searchPayload = {
        params: `query=&hitsPerPage=50&page=0&facetFilters=[["category:${category}"]]&attributesToRetrieve=["id","name","brand_name","color","details","main_picture_url","lowest_price_cents","retail_price_cents","release_date","number_of_sales"]&sortBy=number_of_sales:desc`
      };

      const response = await axios.post(`${this.baseURL}/query`, searchPayload, {
        headers: this.headers,
        timeout: 10000
      });

      return response.data.hits || [];
    } catch (error) {
      console.error('GOAT trending error:', error);
      return [];
    }
  }

  // Get products by brand
  async getProductsByBrand(brandName: string, limit: number = 50): Promise<GOATProduct[]> {
    try {
      const searchPayload = {
        params: `query=&hitsPerPage=${limit}&page=0&facetFilters=[["brand_name:${brandName}"]]&attributesToRetrieve=["id","name","brand_name","color","details","main_picture_url","lowest_price_cents","retail_price_cents","release_date"]`
      };

      const response = await axios.post(`${this.baseURL}/query`, searchPayload, {
        headers: this.headers,
        timeout: 10000
      });

      return response.data.hits || [];
    } catch (error) {
      console.error(`GOAT brand search error for ${brandName}:`, error);
      return [];
    }
  }

  // Get new releases
  async getNewReleases(limit: number = 20): Promise<GOATProduct[]> {
    try {
      const searchPayload = {
        params: `query=&hitsPerPage=${limit}&page=0&attributesToRetrieve=["id","name","brand_name","color","details","main_picture_url","lowest_price_cents","retail_price_cents","release_date"]&sortBy=release_date:desc`
      };

      const response = await axios.post(`${this.baseURL}/query`, searchPayload, {
        headers: this.headers,
        timeout: 10000
      });

      return response.data.hits || [];
    } catch (error) {
      console.error('GOAT new releases error:', error);
      return [];
    }
  }
}

export const goatAPI = new GOATAPI();
export type { GOATProduct, GOATSearchResponse };