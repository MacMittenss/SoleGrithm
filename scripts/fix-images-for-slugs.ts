import 'dotenv/config';
import { db } from '../server/db';
import { sneakers } from '../shared/schema';
import { sql } from 'drizzle-orm';
import { collectImageCandidates, isImageUrlAlive } from '../server/utils/image';

// dynamic import wrappers
async function trySneaksNpmSearch(slug: string) {
  try {
    const mod = await import('../server/services/sneaks-npm');
    const svc = mod.default || mod.SneaksNpmService;
    if (!svc) return null;
    // the npm wrapper expects keywords, try slug and brand parts
    const parts = slug.split('-');
    const keyword = parts.slice(0, 3).join(' ');
    const res = await svc.searchProducts(keyword, 10);
    return Array.isArray(res) ? res : null;
  } catch (e) {
    return null;
  }
}

async function trySneaksHttpSearch(slug: string) {
  try {
    const mod = await import('../server/services/sneaks-api');
    const svc = mod.default || mod.SneaksAPI;
    if (!svc) return null;
    const q = slug.replace(/-/g, ' ');
  const res = await svc.search(q);
    return Array.isArray(res) ? res : null;
  } catch (e) {
    return null;
  }
}

async function updateSneakerImages(id: number, images: string[]) {
  const mod = await import('../server/storage');
  const storage = mod.storage;
  await storage.updateSneaker(id, { images });
}

async function findAndFixForSlug(slug: string) {
  const [row] = await db.select({ id: sneakers.id, slug: sneakers.slug, name: sneakers.name }).from(sneakers as any).where(sql`${sneakers.slug} = ${slug}`);
  if (!row) {
    console.log('No row for slug', slug);
    return;
  }
  console.log('Processing', slug, 'id=', row.id, 'name=', row.name);

  // Try npm wrapper
  let candidates: string[] = [];
  const npmRes = await trySneaksNpmSearch(slug);
  if (npmRes) {
    for (const p of npmRes) {
      candidates.push(...collectImageCandidates(p));
    }
  }

  // Try HTTP sneaks API if no results yet
  if (candidates.length === 0) {
    const httpRes = await trySneaksHttpSearch(slug);
    if (httpRes) for (const p of httpRes) candidates.push(...collectImageCandidates(p));
  }

  candidates = Array.from(new Set(candidates)).slice(0, 20);
  console.log('Candidates found:', candidates.length);

  for (const c of candidates) {
    try {
      if (await isImageUrlAlive(c)) {
        console.log('Valid image found for', slug, ':', c);
        await updateSneakerImages(row.id, [c]);
        return;
      }
    } catch (e) {
      // ignore
    }
  }

  console.log('No valid images found for', slug);
}

async function main() {
  const slugs = [
    'nike-air-force-3-low-sp-nigo-x-levis-olive-grey-hq0262-001',
    'crocs-classic-clog-marvel-spider-man-neo-211489-90h',
    'the-north-face-1996-retro-nuptse-700-fill-packable-jacket-recycled-tnf-black-nf0a3c8dle41nf0a3c8djk3nfoa3c8dle4-mnf0a3c8d4g3nf0a3c8dgoe1nf0a3c8dgoe',
    'jordan-4-retro-white-cement-2025-fv5029-100'
  ];

  for (const s of slugs) {
    // eslint-disable-next-line no-await-in-loop
    await findAndFixForSlug(s);
  }

  console.log('done');
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
