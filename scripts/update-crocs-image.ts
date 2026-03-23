import { db } from '../server/db';
import { sneakers } from '../shared/schema';
import { eq } from 'drizzle-orm';

async function main() {
  // Correct image URL for Crocs Classic Clog Marvel Spider-Man Neo
  const correctImageUrl = 'https://images.stockx.com/images/Crocs-Classic-Clog-Marvel-Spider-Man-Neo-Product.jpg';
  
  const result = await db
    .update(sneakers)
    .set({ 
      images: [correctImageUrl]
    })
    .where(eq(sneakers.slug, 'crocs-classic-clog-marvel-spider-man-neo-211489-90h'))
    .returning();

  console.log('Updated:', result);
  process.exit(0);
}

main().catch(console.error);
