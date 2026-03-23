// Maps various Sneaks API product shapes to the internal Sneaker schema used by the app.
// The goal is a consistent shape with the following fields (minimal):
// {
//   id: string,        // unique id (styleID or sku)
//   slug: string,      // url-friendly slug
//   name: string,      // title/name
//   brand: string,     // brand name
//   retailPrice: number | null,
//   images: string[],
//   colorway?: string,
//   releaseDate?: string | null,
//   sku?: string,
//   source?: string,   // e.g. 'sneaks-npm' or 'sneaks-http'
// }

import { slugify } from '../utils/slugify';

function asNumber(val: any): number | null {
  if (val === null || val === undefined || val === '') return null;
  const n = Number(val);
  return Number.isFinite(n) ? n : null;
}

function ensureArray(val: any): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val.filter(Boolean).map(String);
  if (typeof val === 'string') return [val];
  return [];
}

export function mapSneaksProduct(raw: Record<string, any>, opts?: { source?: string }) {
  const source = opts?.source || 'sneaks';

  // Common fields across different sneaks providers
  const styleID = raw.styleID || raw.style_id || raw.sku || raw.id || raw.style || raw.productId || raw.product_id;
  const title = raw.title || raw.name || raw.shoeName || raw.productName || raw.name_full || raw.nameFull || raw.title_full || raw.product;
  const brand = raw.brand || (raw.brandName ? raw.brandName : (raw.manufacturer || raw.make)) || 'Unknown';

  // retail price may be nested or named differently
  const retailCandidates = [raw.retailPrice, raw.retail_price, raw.retail, raw.price, raw.msrp].filter(Boolean);
  // fallback: sometimes prices come inside `market` or `prices`
  if (retailCandidates.length === 0) {
    if (raw.market && raw.market.retail) retailCandidates.push(raw.market.retail);
    if (raw.prices && raw.prices.retail) retailCandidates.push(raw.prices.retail);
  }

  // pick first candidate and coerce to number
  let retailPrice: number | null = null;
  if (retailCandidates.length > 0) retailPrice = asNumber(retailCandidates[0]);

  // Images
  const images = ensureArray(raw.image || raw.images || raw.imageLinks || raw.imageUrls || raw.image_url || raw.thumbnail || raw.media || raw.assets).map((i) => String(i));

  // Colorway / release
  const colorway = raw.colorway || raw.color || raw.color_name || raw.colourway;
  const releaseDate = raw.releaseDate || raw.release_date || raw.launchDate || raw.release;

  const id = styleID ? String(styleID) : (raw.slug ? String(raw.slug) : (raw.id ? String(raw.id) : undefined));
  const name = title ? String(title) : (raw.name ? String(raw.name) : 'Unknown Sneaker');
  const slug = slugify(name + (id ? `-${id}` : ''));

  return {
    id: id || slug,
    slug,
    name,
    brand: String(brand),
    retailPrice,
    images,
    colorway: colorway || undefined,
    releaseDate: releaseDate || null,
    sku: raw.sku || styleID || undefined,
    source
  } as const;
}

export default mapSneaksProduct;
