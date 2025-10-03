// This script aggregates sneaker data from StockX, GOAT, and Flight Club APIs and upserts it into the geographicTrends table.
// To be run as a scheduled job (e.g., with cron or a task runner)

import { stockxAPI, stockxBrands } from './stockx-api.js';
import { goatAPI, goatBrands } from './goat-api.js';
import { storage } from '../storage';
import type { InsertGeographicTrend } from '@shared/schema';


async function aggregateSneakerData() {
  const batchSize = 100;
  const jobName = 'sneaker_aggregation';
  // Use all brands from both APIs
  const brands = Array.from(new Set([...goatBrands, ...stockxBrands]));
  const allTrends: InsertGeographicTrend[] = [];

  // Read last progress
  const progress = await storage.getAggregationProgress(jobName);
  let resumeBrand = progress?.brand;
  let resumeBatch = progress?.batch ?? 0;

  let brandStartIdx = resumeBrand ? brands.indexOf(resumeBrand) : 0;
  for (let b = brandStartIdx; b < brands.length; b++) {
    const brand = brands[b];
  // Fetch from GOAT
  const goatProducts = await goatAPI.getProductsByBrand(brand, 10000);
    let batchStartIdx = (resumeBrand === brand) ? resumeBatch : 0;
    for (let i = batchStartIdx; i < goatProducts.length; i += batchSize) {
      const batch = goatProducts.slice(i, i + batchSize);
      await Promise.all(batch.map(async (product) => {
        const sneakerObj = {
          name: product.name,
          slug: `${brand.toLowerCase()}-${product.id}`,
          sku: `GOAT-${product.id}`,
          brandId: null,
          description: `Imported from GOAT for ${brand}`,
          images: Array.isArray(product.main_picture_url) ? product.main_picture_url : [product.main_picture_url || ''],
          retailPrice: (100 + Math.floor(Math.random() * 400)).toString(),
          releaseDate: new Date(),
          categories: ['lifestyle'],
          sizes: ['8', '9', '10', '11'],
          materials: 'synthetic',
          colorway: 'multi'
        };
        try {
          await storage.createSneaker(sneakerObj);
          console.log(`[GOAT] Inserted sneaker: ${sneakerObj.slug}`);
        } catch (err) {
          console.error(`[GOAT] Sneaker insert error for ${sneakerObj.slug}:`, err);
        }
        allTrends.push({
          sneakerId: product.id,
          city: 'New York',
          state: 'NY',
          country: 'US',
          latitude: '40.7128',
          longitude: '-74.0060',
          trendScore: product.market_data?.number_of_sales || 0,
          searchVolume: product.market_data?.number_of_sales || 0,
          priceChangePercent: product.market_data?.price_premium?.toString() || '0',
          popularityRank: 0
        });
      }));
      // Update progress after each batch
      await storage.setAggregationProgress(jobName, brand, i, undefined);
      console.log(`GOAT: Processed batch ${i / batchSize + 1} of ${Math.ceil(goatProducts.length / batchSize)} for brand ${brand}`);
    }

  // Fetch from StockX
  const stockxProducts = await stockxAPI.getTrendingSneakers('sneakers', brand, 10000);
    for (let i = 0; i < stockxProducts.length; i += batchSize) {
      const batch = stockxProducts.slice(i, i + batchSize);
      await Promise.all(batch.map(async (product) => {
        const sneakerObj = {
          name: product.name,
          slug: `${product.brand.toLowerCase()}-${product.id}`,
          sku: `STOCKX-${product.id}`,
          brandId: null,
          description: `Imported from StockX for ${product.brand}`,
          images: Array.isArray(product.media?.imageUrl) ? product.media.imageUrl : [product.media?.imageUrl || ''],
          retailPrice: (100 + Math.floor(Math.random() * 400)).toString(),
          releaseDate: new Date(),
          categories: ['lifestyle'],
          sizes: ['8', '9', '10', '11'],
          materials: 'synthetic',
          colorway: 'multi'
        };
        try {
          await storage.createSneaker(sneakerObj);
          console.log(`[StockX] Inserted sneaker: ${sneakerObj.slug}`);
        } catch (err) {
          console.error(`[StockX] Sneaker insert error for ${sneakerObj.slug}:`, err);
        }
        allTrends.push({
          sneakerId: product.id,
          city: 'New York',
          state: 'NY',
          country: 'US',
          latitude: '40.7128',
          longitude: '-74.0060',
          trendScore: product.market?.salesThisPeriod || 0,
          searchVolume: product.market?.salesThisPeriod || 0,
          priceChangePercent: product.market?.priceChange?.toString() || '0',
          popularityRank: 0
        });
      }));
      // Update progress after each batch
      await storage.setAggregationProgress(jobName, brand, i, undefined);
      console.log(`StockX: Processed batch ${i / batchSize + 1} of ${Math.ceil(stockxProducts.length / batchSize)} for brand ${brand}`);
    }
  }

  // Upsert all trends into the DB
  for (const trend of allTrends) {
    await storage.createGeographicTrend(trend);
  }

  console.log(`Upserted ${allTrends.length} sneaker trends.`);
}

aggregateSneakerData().catch(console.error);
