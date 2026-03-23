import { db } from '../server/db';
import { sneakers } from '../shared/schema';

async function main() {
  const results = await db.select({ 
    id: sneakers.id, 
    name: sneakers.name, 
    slug: sneakers.slug 
  })
  .from(sneakers)
  .orderBy(sneakers.id);

  console.log('Total products:', results.length);
  results.forEach(p => console.log(`  ${p.id}. ${p.name}`));
  process.exit(0);
}

main().catch(console.error);
