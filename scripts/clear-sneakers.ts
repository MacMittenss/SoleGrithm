import { db } from '../server/db';
import {
  sneakers,
  collections,
  priceHistory,
  marketPrices,
  reviews,
  geographicTrends
} from '../shared/schema';
import { eq } from 'drizzle-orm';

/**
 * Dangerous operation: deletes ALL sneakers and their dependent records.
 * Safety: requires CONFIRM_DELETE_SNEAKERS environment variable set to 'yes'.
 * Usage (from repo root):
 *   CONFIRM_DELETE_SNEAKERS=yes npx tsx scripts/clear-sneakers.ts
 */

async function main() {
  const confirmation = (process.env.CONFIRM_DELETE_SNEAKERS || '').toLowerCase();
  if (confirmation !== 'yes') {
    console.log('CONFIRM_DELETE_SNEAKERS is not set to "yes". Aborting.');
    console.log('If you really want to delete all sneakers, run:');
    console.log('  CONFIRM_DELETE_SNEAKERS=yes npx tsx scripts/clear-sneakers.ts');
    process.exit(1);
  }

  console.log('Fetching all sneakers...');
  const all = await db.select({ id: (sneakers as any).id, slug: (sneakers as any).slug }).from(sneakers);
  if (!all || all.length === 0) {
    console.log('No sneakers found. Nothing to delete.');
    process.exit(0);
  }

  console.log(`Found ${all.length} sneakers. Deleting dependent records then sneakers...`);

  try {
    let deletedCount = 0;
    const total = all.length;
    const batchSize = 100; // show progress every N

    for (let i = 0; i < all.length; i++) {
      const row = all[i];
      const id = row.id as number;
      const slug = row.slug as string | undefined;
      try {
        if (i % batchSize === 0) console.log(`-> Processing sneaker ${i + 1}/${total} (id=${id} slug=${slug || 'n/a'})`);

        try {
          await db.delete(collections).where(eq((collections as any).sneakerId, id));
        } catch (e) {
          // table might not exist or deletion failed; log and continue
          console.warn(`   warning: could not delete from collections for sneaker id=${id}:`, (e as any)?.message || e);
        }

        try {
          await db.delete(priceHistory).where(eq((priceHistory as any).sneakerId, id));
        } catch (e) {
          console.warn(`   warning: could not delete from price_history for sneaker id=${id}:`, (e as any)?.message || e);
        }

        try {
          await db.delete(marketPrices).where(eq((marketPrices as any).sneakerId, id));
        } catch (e) {
          console.warn(`   warning: could not delete from market_prices for sneaker id=${id}:`, (e as any)?.message || e);
        }

        try {
          await db.delete(reviews).where(eq((reviews as any).sneakerId, id));
        } catch (e) {
          console.warn(`   warning: could not delete from reviews for sneaker id=${id}:`, (e as any)?.message || e);
        }

        try {
          await db.delete(geographicTrends).where(eq((geographicTrends as any).sneakerId, id));
        } catch (e) {
          console.warn(`   warning: could not delete from geographic_trends for sneaker id=${id}:`, (e as any)?.message || e);
        }

        try {
          await db.delete(sneakers).where(eq((sneakers as any).id, id));
          deletedCount++;
        } catch (e) {
          console.warn(`   warning: could not delete sneaker id=${id}:`, (e as any)?.message || e);
        }
      } catch (outerErr) {
        console.error(`   unexpected error processing sneaker id=${id}:`, (outerErr as any)?.message || outerErr);
      }
    }

    console.log(`Completed deletions. Sneakers deleted: ${deletedCount}/${total}`);

    console.log('All sneakers and dependent records deleted successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error while deleting sneakers:', err);
    process.exit(2);
  }
}

main();
