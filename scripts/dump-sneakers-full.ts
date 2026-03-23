// removed shebang for TypeScript checks; run with `tsx` or `ts-node` when executing
import { db } from '../server/db';
import { sneakers } from '../shared/schema';

(async function main(){
  try {
    const rows = await db.select({ id: sneakers.id, name: sneakers.name, slug: sneakers.slug, description: sneakers.description, images: sneakers.images }).from(sneakers as any).limit(50);
    console.log('sneakers_count_sample:', rows.length);
    rows.forEach((r: any) => console.log(JSON.stringify(r)));
  } catch (err) {
    const e:any = err;
    console.error('error dumping sneakers:', e && (e.message || e));
    process.exit(2);
  }
})();
