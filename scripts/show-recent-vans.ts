import 'dotenv/config';
import { db } from '../server/db';
import { sneakers } from '../shared/schema';
import { sql, desc } from 'drizzle-orm';

async function main() {
  try {
    const rows = await db
      .select({ id: sneakers.id, slug: sneakers.slug, name: sneakers.name, createdAt: sneakers.createdAt })
      .from(sneakers as any)
      .where(sql`${sneakers.slug} LIKE 'vans-%'`)
      .orderBy(desc(sneakers.createdAt))
      .limit(10);

    console.log('recent_vans:');
    rows.forEach((r: any) => console.log(`- id=${r.id} slug=${r.slug} name=${r.name}`));
  } catch (err) {
    const e: any = err;
    console.error('DB query error:', e && (e.message || e));
    process.exit(1);
  }
}

main().then(() => process.exit(0));
