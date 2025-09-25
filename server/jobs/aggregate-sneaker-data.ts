// This script aggregates sneaker data from StockX, GOAT, and Flight Club APIs and upserts it into the geographicTrends table.
// To be run as a scheduled job (e.g., with cron or a task runner)

import { stockxAPI } from './stockx-api.js';
import { goatAPI } from './goat-api.js';
import { storage } from '../storage';
import type { InsertGeographicTrend } from '@shared/schema';

async function aggregateSneakerData() {
  // Example brands to fetch; in production, fetch all brands from your DB or API
  const brands = ['Nike', 'Adidas', 'New Balance', 'Balenciaga', 'Puma', 'Reebok', 'Converse', 'Vans', 'Asics', 'Jordan'];
  const allTrends: InsertGeographicTrend[] = [];

  for (const brand of brands) {
    // Fetch from GOAT
    const goatProducts = await goatAPI.getProductsByBrand(brand, 100);
    for (const product of goatProducts) {
      allTrends.push({
        sneakerId: product.id,
        city: 'New York', // TODO: Replace with real geo data
        state: 'NY',
        country: 'US',
  latitude: '40.7128',
  longitude: '-74.0060',
        trendScore: product.market_data?.number_of_sales || 0,
        searchVolume: product.market_data?.number_of_sales || 0,
        priceChangePercent: product.market_data?.price_premium?.toString() || '0',
        popularityRank: 0, // Calculate if needed
      });
    }

    // Fetch from StockX
    const stockxProducts = await stockxAPI.getTrendingSneakers('sneakers');
    for (const product of stockxProducts) {
      allTrends.push({
        sneakerId: product.id,
        city: 'New York', // TODO: Replace with real geo data
        state: 'NY',
        country: 'US',
  latitude: '40.7128',
  longitude: '-74.0060',
        trendScore: product.market?.salesThisPeriod || 0,
        searchVolume: product.market?.salesThisPeriod || 0,
        priceChangePercent: product.market?.priceChange?.toString() || '0',
        popularityRank: 0,
      });
    }
  }

  // Upsert all trends into the DB
  for (const trend of allTrends) {
    await storage.createGeographicTrend(trend);
  }

  console.log(`Upserted ${allTrends.length} sneaker trends.`);
}

aggregateSneakerData().catch(console.error);
