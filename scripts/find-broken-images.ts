import 'dotenv/config';
import { db } from '../server/db';
import { sneakers } from '../shared/schema';
import { sql, desc } from 'drizzle-orm';

async function main() {
  try {
    const rows = await db
      .select({ id: sneakers.id, slug: sneakers.slug, name: sneakers.name, images: sneakers.images })
      .from(sneakers as any)
      .where(sql`${sneakers.images} = '{}' OR ${sneakers.images} IS NULL OR ${sneakers.images} = ${sql`NULL`}`)
      .orderBy(desc(sneakers.createdAt))
      .limit(10);

    console.log('broken_images_candidates:');
    rows.forEach((r: any) => console.log(`- id=${r.id} slug=${r.slug} name=${r.name} images=${JSON.stringify(r.images)}`));
  } catch (err) {
    const e: any = err;
    console.error('DB query error:', e && (e.message || e));
    process.exit(1);
  }
}

main().then(() => process.exit(0));
