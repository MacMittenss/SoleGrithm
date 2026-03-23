import { db } from '../server/db';
import { sneakers } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function main() {
  // Correct image URL for Nike Air Force 3 Low SP Nigo x Levi's Olive Grey
  const correctImageUrl = 'https://images.stockx.com/images/Nike-Air-Force-3-Low-SP-Nigo-Olive-Grey-Product.jpg';
  
  const result = await db
    .update(sneakers)
    .set({ 
      images: [correctImageUrl]
    })
    .where(eq(sneakers.slug, 'nike-air-force-3-low-sp-nigo-x-levis-olive-grey-hq0262-001'))
    .returning();

  console.log('Updated:', result);
  process.exit(0);
}

main().catch(console.error);
