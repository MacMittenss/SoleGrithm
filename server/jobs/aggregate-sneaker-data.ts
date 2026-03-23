import "dotenv/config";
// Ensure environment variables are set for local testing
if (!process.env.OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY is not set. Set it in .env or environment variables to enable OpenAI features.');
}
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required. Please set it in your .env file.');
}
// This script aggregates sneaker data from StockX, GOAT, and Flight Club APIs and upserts it into the geographicTrends table.
// To be run as a scheduled job (e.g., with cron or a task runner)

import { stockxAPI, stockxBrands } from './stockx-api.js';
import { KicksAPIProvider } from '../sneaker-data-provider';
import { storage } from '../storage';
import type { InsertGeographicTrend } from '@shared/schema';
import { collectImageCandidates, isImageUrlAlive } from '../utils/image';


async function aggregateSneakerData() {
  const batchSize = 100;
  const jobName = 'sneaker_aggregation';
  // Use brands from KicksAPI (can be extended for other providers)
  const brands = ["Nike", "Adidas", "Jordan", "Reebok", "Puma", "New Balance", "Converse", "Vans"];
  const allTrends: InsertGeographicTrend[] = [];

  // Initialize KicksAPI provider
  const kicksProvider = new KicksAPIProvider(process.env.KICKSAPI_KEY!);

  // Read last progress
  const progress = await storage.getAggregationProgress(jobName);
  let resumeBrand = progress?.brand;
  let resumeBatch = progress?.batch ?? 0;

  let brandStartIdx = resumeBrand ? brands.indexOf(resumeBrand) : 0;
  for (let b = brandStartIdx; b < brands.length; b++) {
    const brand = brands[b];
    let sneakers: any[] = [];
    try {
      sneakers = await kicksProvider.getSneakersByBrand(brand, 100);
      if (!Array.isArray(sneakers)) {
        console.error(`[KicksAPI] sneakers is not an array for brand ${brand}:`, sneakers);
        continue;
      }
    } catch (err) {
      console.error(`[KicksAPI] Error fetching sneakers for brand ${brand}:`, err);
      continue;
    }
    let batchStartIdx = (resumeBrand === brand) ? resumeBatch : 0;
    for (let i = batchStartIdx; i < sneakers.length; i += batchSize) {
      const batch = sneakers.slice(i, i + batchSize);
      await Promise.all(batch.map(async (product) => {
        // pick best image candidate
        const candidates = collectImageCandidates(product);
        let chosenImage: string | undefined;
        for (const c of candidates) {
          try {
            // quick HEAD check to avoid storing broken URLs
            // keep it short to avoid long waits
            // Fire-and-forget - if HEAD times out or fails, skip
            // eslint-disable-next-line no-await-in-loop
            if (await isImageUrlAlive(c)) {
              chosenImage = c;
              break;
            }
          } catch (e) {
            // ignore
          }
        }

        const sneakerObj = {
          name: product.name,
          slug: `${product.brand.toLowerCase()}-${product.id}`,
          sku: product.sku || product.id,
          brandId: null,
          description: product.description || `Imported from KicksAPI for ${brand}`,
          images: chosenImage ? [chosenImage] : [],
          retailPrice: product.retailPrice?.toString() || '',
          releaseDate: product.releaseDate ? new Date(product.releaseDate) : new Date(),
          categories: ['lifestyle'],
          sizes: product.sizes || [],
          materials: product.materials || '',
          colorway: product.colorway || ''
        };
        if (!chosenImage) console.warn(`[KicksAPI] No valid image found for ${product.id} (${product.name || 'unknown'}) - candidates: ${JSON.stringify(candidates.slice(0,5))}`);
        try {
          await storage.createSneaker(sneakerObj);
          console.log(`[KicksAPI] Inserted sneaker: ${sneakerObj.slug}`);
        } catch (err) {
          console.error(`[KicksAPI] Sneaker insert error for ${sneakerObj.slug}:`, err);
        }
        allTrends.push({
          sneakerId: product.id,
          city: 'New York',
          state: 'NY',
          country: 'US',
          latitude: '40.7128',
          longitude: '-74.0060',
          trendScore: 0,
          searchVolume: 0,
          priceChangePercent: '0',
          popularityRank: 0
        });
      }));
      // Update progress after each batch
      await storage.setAggregationProgress(jobName, brand, i, undefined);
      console.log(`KicksAPI: Processed batch ${i / batchSize + 1} of ${Math.ceil(sneakers.length / batchSize)} for brand ${brand}`);
    }
  }

  // Upsert all trends into the DB
  for (const trend of allTrends) {
    await storage.createGeographicTrend(trend);
  }

  console.log(`Upserted ${allTrends.length} sneaker trends.`);
}

aggregateSneakerData().catch(console.error);
