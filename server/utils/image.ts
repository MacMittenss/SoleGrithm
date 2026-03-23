export async function isImageUrlAlive(url: string, timeout = 2000): Promise<boolean> {
  if (!url || typeof url !== 'string') return false;
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) return false;
    const ct = res.headers.get('content-type') || '';
    return ct.startsWith('image/');
  } catch (err) {
    return false;
  }
}

export function collectImageCandidates(product: any): string[] {
  if (!product) return [];
  const candidates: Array<string|undefined> = [];
  // Common fields used across providers
  if (product.images && Array.isArray(product.images)) candidates.push(...product.images);
  candidates.push(product.imageUrl || product.image_url || product.image || product.url || product.thumbnail || product.main_picture_url);
  // nested possibilities
  if (product.media && product.media.imageUrl) candidates.push(product.media.imageUrl);
  if (product.assets && Array.isArray(product.assets)) candidates.push(...product.assets.map((a: any) => a.url || a.image || a.src).filter(Boolean));
  if (product.imageLinks && Array.isArray(product.imageLinks)) candidates.push(...product.imageLinks);
  // sanitize and dedupe
  return Array.from(new Set(candidates.filter(Boolean).map(String)));
}
