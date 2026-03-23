// removed shebang for TypeScript checks; run with `tsx` or `ts-node` when executing
/*
  scripts/import-from-sneaks.ts
  - Fetches sneaker products from the local `sneaks-api` npm wrapper (server/services/sneaks-npm.ts)
  - Normalizes items and optionally upserts them into the database via storage.createSneaker
  Usage:
    # Dry-run (default): shows count and sample normalized objects
    npx tsx scripts/import-from-sneaks.ts --limit=10

    # To actually write to DB, pass --confirm or set IMPORT_SNEAKS_CONFIRM=yes
    IMPORT_SNEAKS_CONFIRM=yes npx tsx scripts/import-from-sneaks.ts --limit=100 --confirm

*/

import SneaksNpmService from '../server/services/sneaks-npm';
import { storage } from '../server/storage';
import mapSneaksProduct from '../server/services/sneaks-mapper';
import { getSizesForSneaker } from '../server/utils/sneaker-sizes';

function parseArgs(argv: string[]) {
  const out: Record<string, any> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    if (a.includes('=')) {
      const [k, v] = a.split('=');
      out[k.replace(/^--/, '')] = v;
    } else {
      const key = a.replace(/^--/, '');
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        out[key] = next;
        i++;
      } else {
        out[key] = true;
      }
    }
  }
  return out;
}

function safeDate(val: any): Date | null {
  if (!val) return null;
  const d = new Date(val);
  return Number.isFinite(d.getTime()) ? d : null;
}

(async function main() {
  const argv = parseArgs(process.argv.slice(2));
  const limit = Number(argv.limit || argv.l || 100);
  const search = argv.search || argv.q || null;
  const confirmed = argv.confirm === true || argv.confirm === 'true' || process.env.IMPORT_SNEAKS_CONFIRM === 'yes' || process.env.IMPORT_SNEAKS_CONFIRM === 'true';
  const dryRun = argv['dry-run'] === 'true' || argv['dry-run'] === true ? true : !confirmed;
  const retries = Number(argv.retries || argv.r || 2);
  const minRetail = Number(argv['min-retail'] || argv.minRetail || 0);
  const requireStyle = argv['require-style'] === true || argv['require-style'] === 'true' || false;

  console.log('[import-from-sneaks] mode:', dryRun ? 'dry-run' : 'apply');
  console.log('[import-from-sneaks] limit:', limit, 'search:', search ? String(search) : '(most popular)');

  try {
    // Wrap fetch with simple retry logic to handle intermittent 5xx from the underlying provider
    async function fetchWithRetries() {
      let lastErr: any = null;
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          if (search) {
            console.log(`[import-from-sneaks] attempt ${attempt + 1}: search for ${search}`);
            return await SneaksNpmService.searchProducts(String(search), limit);
          } else {
            console.log(`[import-from-sneaks] attempt ${attempt + 1}: getMostPopular`);
            return await SneaksNpmService.getMostPopular(limit);
          }
        } catch (err) {
          lastErr = err;
          console.warn(`[import-from-sneaks] fetch attempt ${attempt + 1} failed:`, (err as any)?.message || err);
          // backoff small
          await new Promise((res) => setTimeout(res, 500 * (attempt + 1)));
        }
      }
      throw lastErr;
    }

    let products: any[] = [];
    try {
      products = await fetchWithRetries();
    } catch (err) {
      const e: any = err;
      console.error('[import-from-sneaks] fetch failed after retries:', e && (e.message || e));
      return process.exit(2);
    }

    console.log('[import-from-sneaks] fetched products:', Array.isArray(products) ? products.length : 0);

    if (!Array.isArray(products) || products.length === 0) {
      console.log('[import-from-sneaks] no products returned');
      return process.exit(0);
    }

    // Ensure products are normalized via mapSneaksProduct (sneaks-npm may sometimes return raw objects)
    let normalized = products.map((p: any) => {
      try {
        // prefer mapper to produce the internal shape
        const mapped = mapSneaksProduct(p, { source: 'sneaks-npm' });
        return mapped;
      } catch (e) {
        return p;
      }
    });

    // Apply simple filters: require styleID/sku present, min retail price
    if (requireStyle) {
      normalized = normalized.filter((p: any) => p && (p.id || p.sku));
    }
    if (minRetail > 0) {
      normalized = normalized.filter((p: any) => typeof p.retailPrice === 'number' && p.retailPrice >= minRetail);
    }

    // Show a small sample
    const sample = normalized.slice(0, Math.min(5, normalized.length));
    console.log('[import-from-sneaks] sample normalized objects:');
    sample.forEach((p, idx) => {
      console.log(`${idx + 1}. slug=${p.slug} name=${p.name} retail=${p.retailPrice} images=${(p.images || []).length}`);
    });

    if (dryRun) {
      console.log('[import-from-sneaks] dry-run enabled, not writing to DB. To write, pass --confirm or set IMPORT_SNEAKS_CONFIRM=yes');
      return process.exit(0);
    }

    console.log('[import-from-sneaks] writing products to DB...');
    let created = 0;
    for (let i = 0; i < normalized.length; i++) {
      const p = normalized[i];
      // build insert shape compatible with InsertSneaker
      const insert: any = {
        name: p.name || 'Unknown',
        slug: p.slug,
        sku: p.sku || undefined,
        brandId: undefined,
        description: p.colorway || undefined,
        images: Array.isArray(p.images) ? p.images : (p.images ? [p.images] : []),
        retailPrice: (typeof p.retailPrice === 'number') ? p.retailPrice : (p.retailPrice ? Number(p.retailPrice) : null),
        releaseDate: safeDate(p.releaseDate),
        categories: [],
        sizes: getSizesForSneaker(p.name, p.categories || []),
        materials: undefined,
        colorway: p.colorway || undefined
      };

      try {
        const row = await storage.createSneaker(insert);
        created++;
        if (i % 50 === 0) console.log(`[import-from-sneaks] inserted ${i + 1}/${products.length} -> id=${row.id} slug=${row.slug}`);
      } catch (err) {
        const e: any = err;
        console.error('[import-from-sneaks] error inserting', p.slug || p.id, e && (e.message || e));
      }
    }

    console.log('[import-from-sneaks] finished. created:', created);
    process.exit(0);

  } catch (err) {
    const e: any = err;
    console.error('[import-from-sneaks] unexpected error:', e && (e.message || e));
    process.exit(2);
  }
})();
