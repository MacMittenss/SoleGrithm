  // removed shebang for TypeScript checks; run with `tsx` or `ts-node` when executing
import { pool } from '../server/db';
import { slugify } from '../server/utils/slugify';

function deduceBrand(name: string): string | null {
  if (!name) return null;
  const s = name.toLowerCase();
  if (s.includes('jordan')) return 'Jordan';
  if (s.includes('the north face') || s.includes('north face') || s.includes('tnf')) return 'The North Face';
  if (s.includes('crocs')) return 'Crocs';
  if (s.includes('nike') || s.includes('air') || s.includes('force') || s.includes('af-')) return 'Nike';
  if (s.includes('adidas')) return 'Adidas';
  return null;
}

async function ensureBrandsTable() {
  const createSql = `
  CREATE TABLE IF NOT EXISTS public.brands (
    id serial PRIMARY KEY,
    name text NOT NULL UNIQUE,
    slug text NOT NULL UNIQUE,
    description text,
    logo text,
    website text,
    created_at timestamp default now()
  );
  `;
  await (pool as any).query(createSql);
}

async function main() {
  try {
    await ensureBrandsTable();
    const res = await (pool as any).query('SELECT id, name, slug, description, images FROM public.sneakers');
    const rows: any[] = res.rows || [];
    const brandMap = new Map<string, { name: string; slug: string; website: string; logo: string }>();

    for (const r of rows) {
      const brand = deduceBrand(r.name || '');
      if (!brand) continue;
      if (!brandMap.has(brand)) {
        // map brand to a website for clearbit
        let domain = '';
        switch (brand) {
          case 'Jordan': domain = 'jordan.com'; break;
          case 'The North Face': domain = 'thenorthface.com'; break;
          case 'Crocs': domain = 'crocs.com'; break;
          case 'Nike': domain = 'nike.com'; break;
          case 'Adidas': domain = 'adidas.com'; break;
          default: domain = '';
        }
        const slug = slugify(brand);
        const logo = domain ? `https://logo.clearbit.com/${domain}` : '';
        const website = domain ? `https://${domain}` : '';
        brandMap.set(brand, { name: brand, slug, website, logo });
      }
    }

    if (brandMap.size === 0) {
      console.log('No brands inferred from existing sneakers. Exiting.');
      process.exit(0);
    }

    // Insert brands
    const inserted: Array<{ id: number; name: string; slug: string; logo: string }> = [];
    for (const [name, info] of brandMap.entries()) {
      // upsert by name
      const insertSql = `INSERT INTO public.brands (name, slug, description, logo, website) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (name) DO UPDATE SET slug = EXCLUDED.slug, logo = EXCLUDED.logo RETURNING id, name, slug, logo`;
      const r = await (pool as any).query(insertSql, [info.name, info.slug, null, info.logo, info.website]);
      const row = r.rows && r.rows[0];
      if (row) inserted.push(row);
    }

    console.log('Inserted/updated brands:', inserted.length);
    inserted.forEach(b => console.log(`- id=${b.id} name=${b.name} slug=${b.slug} logo=${b.logo}`));

    // Update sneakers to link brand ids
    for (const r of rows) {
      const brand = deduceBrand(r.name || '');
      if (!brand) continue;
      const info = brandMap.get(brand)!;
      // find brand id
      const found = inserted.find(x => x.name === brand);
      if (!found) continue;
      await (pool as any).query('UPDATE public.sneakers SET brand_id = $1 WHERE id = $2', [found.id, r.id]);
      console.log(`Linked sneaker id=${r.id} -> brand_id=${found.id}`);
    }

    console.log('Done.');
    process.exit(0);
  } catch (err) {
    const e: any = err;
    console.error('error creating/linking brands:', e && (e.message || e));
    process.exit(2);
  }
}

main();
