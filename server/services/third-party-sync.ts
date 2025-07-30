import { db } from '../db';
import { sneakers, priceHistory, apiSyncLog } from '../../shared/schema';
import { eq, desc } from 'drizzle-orm';

export interface PriceData {
  sneakerId: number;
  source: string;
  lowestAsk: number;
  highestBid: number;
  lastSale: number;
  salesLast72Hours: number;
  priceChangePercentage: number;
}

export interface MarketData {
  id: string;
  name: string;
  brand: string;
  sku: string;
  retailPrice: number;
  images: string[];
  releaseDate: string;
  categories: string[];
  colorway: string;
  description: string;
}

export class ThirdPartyAPIService {
  // Mock StockX API integration
  static async syncStockXPrices() {
    try {
      console.log('Starting StockX price sync...');
      
      // Get all sneakers that need price updates
      const sneakersToUpdate = await db.select()
        .from(sneakers)
        .limit(50); // Batch process to avoid rate limits

      let updatedCount = 0;
      const errors: string[] = [];

      for (const sneaker of sneakersToUpdate) {
        try {
          // Mock API call - in production, replace with actual StockX API
          const mockPriceData = this.generateMockPriceData(sneaker.id);
          
          // Insert price history record
          await db.insert(priceHistory).values({
            sneakerId: sneaker.id,
            source: 'stockx',
            lowestAsk: mockPriceData.lowestAsk.toString(),
            highestBid: mockPriceData.highestBid.toString(),
            lastSale: mockPriceData.lastSale.toString(),
            salesLast72Hours: mockPriceData.salesLast72Hours,
            priceChangePercentage: mockPriceData.priceChangePercentage,
            recordedAt: new Date()
          });

          updatedCount++;
        } catch (error) {
          errors.push(`Error updating sneaker ${sneaker.id}: ${error}`);
        }
      }

      // Log sync status
      await this.logSyncStatus('stockx', 'prices', 'success', updatedCount, errors);
      
      console.log(`StockX sync completed: ${updatedCount} records updated`);
      return { success: true, updated: updatedCount, errors };
    } catch (error) {
      await this.logSyncStatus('stockx', 'prices', 'error', 0, [error.message]);
      console.error('StockX sync failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Mock GOAT API integration
  static async syncGOATData() {
    try {
      console.log('Starting GOAT data sync...');
      
      const sneakersToUpdate = await db.select()
        .from(sneakers)
        .limit(25);

      let updatedCount = 0;

      for (const sneaker of sneakersToUpdate) {
        try {
          // Mock GOAT API data
          const mockData = this.generateMockMarketData(sneaker);
          
          // Update sneaker with additional market data
          await db.update(sneakers)
            .set({
              description: mockData.description || sneaker.description,
              updatedAt: new Date()
            })
            .where(eq(sneakers.id, sneaker.id));

          updatedCount++;
        } catch (error) {
          console.error(`Error updating sneaker ${sneaker.id}:`, error);
        }
      }

      await this.logSyncStatus('goat', 'market_data', 'success', updatedCount);
      
      console.log(`GOAT sync completed: ${updatedCount} records updated`);
      return { success: true, updated: updatedCount };
    } catch (error) {
      await this.logSyncStatus('goat', 'market_data', 'error', 0, [error.message]);
      console.error('GOAT sync failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Get latest price data for a sneaker
  static async getLatestPrices(sneakerId: number) {
    try {
      const prices = await db.select()
        .from(priceHistory)
        .where(eq(priceHistory.sneakerId, sneakerId))
        .orderBy(desc(priceHistory.recordedAt))
        .limit(5);

      return prices;
    } catch (error) {
      console.error('Error getting latest prices:', error);
      return [];
    }
  }

  // Schedule regular syncs (would be called by a cron job)
  static async scheduledSync() {
    try {
      console.log('Starting scheduled third-party API sync...');
      
      const stockxResult = await this.syncStockXPrices();
      const goatResult = await this.syncGOATData();
      
      return {
        stockx: stockxResult,
        goat: goatResult,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Scheduled sync failed:', error);
      return { error: error.message };
    }
  }

  // Private helper methods
  private static async logSyncStatus(
    provider: string, 
    endpoint: string, 
    status: string, 
    recordsUpdated: number, 
    errors: string[] = []
  ) {
    try {
      await db.insert(apiSyncLog).values({
        provider,
        endpoint,
        lastSyncAt: new Date(),
        status,
        recordsUpdated,
        errorMessage: errors.length > 0 ? errors.join('; ') : null,
        metadata: { errorCount: errors.length }
      });
    } catch (error) {
      console.error('Error logging sync status:', error);
    }
  }

  private static generateMockPriceData(sneakerId: number): PriceData {
    const basePrice = 150 + (sneakerId * 25) % 500;
    const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
    
    return {
      sneakerId,
      source: 'stockx',
      lowestAsk: basePrice * (1 + variation + 0.1),
      highestBid: basePrice * (1 + variation - 0.1),
      lastSale: basePrice * (1 + variation),
      salesLast72Hours: Math.floor(Math.random() * 50) + 5,
      priceChangePercentage: (Math.random() - 0.5) * 20 // ±10%
    };
  }

  private static generateMockMarketData(sneaker: any): Partial<MarketData> {
    const descriptions = [
      `Premium ${sneaker.name} featuring authentic design and quality construction.`,
      `Limited edition ${sneaker.name} with exclusive colorway and materials.`,
      `Classic ${sneaker.name} combining style and comfort for everyday wear.`,
      `High-performance ${sneaker.name} designed for both fashion and function.`
    ];

    return {
      description: descriptions[sneaker.id % descriptions.length]
    };
  }
}