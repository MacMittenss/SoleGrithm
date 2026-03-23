import fetch from 'node-fetch';

const DEFAULT_BASE = process.env.SNEAKS_API_BASE || 'https://sneaks-api.druv5319.workers.dev';

type Sneak = Record<string, any>;

// Simple in-memory cache
const cache: Record<string, { ts: number; ttl: number; data: any }> = {};

function setCache(key: string, data: any, ttl = 30_000) {
  cache[key] = { ts: Date.now(), ttl, data };
}

function getCache(key: string) {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.ts > entry.ttl) {
    delete cache[key];
    return null;
  }
  return entry.data;
}

export class SneaksAPI {
  static base = process.env.SNEAKS_API_BASE || DEFAULT_BASE;

  static async listAll(): Promise<Sneak[]> {
    const cacheKey = 'sneaks:listAll';
    const cached = getCache(cacheKey);
    if (cached) return cached;

    const url = `${this.base}/sneakers`;
    const res = await fetch(url, { timeout: 10_000 });
    if (!res.ok) throw new Error(`Sneaks API list failed: ${res.status}`);
    const data = await res.json();
    try {
      const mapper = require('./sneaks-mapper').mapSneaksProduct;
      const list = Array.isArray(data) ? data.map((p: any) => mapper(p, { source: 'sneaks-http' })) : [];
      setCache(cacheKey, list, 30_000);
      return list;
    } catch (e) {
      setCache(cacheKey, data, 30_000);
      return data;
    }
  }

  static async getBySlug(slug: string): Promise<Sneak | null> {
    const cacheKey = `sneaks:slug:${slug}`;
    const cached = getCache(cacheKey);
    if (cached) return cached;

    const url = `${this.base}/sneakers/${encodeURIComponent(slug)}`;
    const res = await fetch(url, { timeout: 10_000 });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Sneaks API get failed: ${res.status}`);
    const data = await res.json();
    try {
      const mapper = require('./sneaks-mapper').mapSneaksProduct;
      const mapped = data ? mapper(data, { source: 'sneaks-http' }) : null;
      setCache(cacheKey, mapped, 30_000);
      return mapped;
    } catch (e) {
      setCache(cacheKey, data, 30_000);
      return data;
    }
  }

  static async search(q: string): Promise<Sneak[]> {
    if (!q) return this.listAll();
    const cacheKey = `sneaks:search:${q}`;
    const cached = getCache(cacheKey);
    if (cached) return cached;

    const url = `${this.base}/search?q=${encodeURIComponent(q)}`;
    const res = await fetch(url, { timeout: 10_000 });
    if (!res.ok) throw new Error(`Sneaks API search failed: ${res.status}`);
    const data = await res.json();
    try {
      const mapper = require('./sneaks-mapper').mapSneaksProduct;
      const list = Array.isArray(data) ? data.map((p: any) => mapper(p, { source: 'sneaks-http' })) : [];
      setCache(cacheKey, list, 15_000);
      return list;
    } catch (e) {
      setCache(cacheKey, data, 15_000);
      return data;
    }
  }
}

export default SneaksAPI;
