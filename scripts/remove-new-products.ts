import { db } from '../server/db';
import { sneakers } from '../shared/schema';
import { notInArray } from 'drizzle-orm';

async function main() {
  // Keep only these 4 original products by their slugs
  const keepSlugs = [
    'nike-air-force-3-low-sp-nigo-x-levis-olive-grey-hq0262-001',
    'crocs-classic-clog-marvel-spider-man-neo-211489-90h',
    'the-north-face-1996-retro-nuptse-700-fill-packable-jacket-recycled-tnf-black-nf0a3c8dle41nf0a3c8djk3nfoa3c8dle4-mnf0a3c8d4g3nf0a3c8dgoe1nf0a3c8dgoe',
    'jordan-4-retro-white-cement-2025-fv5029-100'
  ];

  // Delete all products NOT in the keep list
  const result = await db
    .delete(sneakers)
    .where(notInArray(sneakers.slug, keepSlugs))
    .returning();

  console.log(`Deleted ${result.length} products:`);
  result.forEach(p => console.log(`  - ${p.name} (${p.slug})`));
  
  console.log(`\nRemaining products: ${keepSlugs.length}`);
  process.exit(0);
}

main().catch(console.error);
