// removed shebang for TypeScript checks; run with `tsx` or `ts-node` when executing
import { storage } from '../server/storage';

(async function(){
  try {
    const brands = await storage.getAllBrands();
    console.log('brands_count:', brands.length);
    if (brands.length === 0) return;
    brands.forEach(b => {
      console.log(`- id=${b.id} name=${b.name} slug=${b.slug} logo=${b.logo || '(none)'} createdAt=${(b.createdAt || '').toString()}`);
    });
  } catch (err) {
    const e:any = err;
    console.error('error listing brands:', e && (e.message || e));
    process.exit(2);
  }
})();
