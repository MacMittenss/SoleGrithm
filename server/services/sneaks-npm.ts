// Lightweight wrapper around the `sneaks-api` npm package.
// Uses callbacks API from the package and exposes Promise-based methods.
type Product = Record<string, any>;
let SneaksLib: any = null;
let sneaksInstance: any = null;

async function ensureSneaks(): Promise<any> {
  if (sneaksInstance) return sneaksInstance;
  try {
    // Use dynamic import which works in ESM contexts
    let mod: any;
    try {
      // cast to any to avoid missing type declarations
      mod = await import('sneaks-api');
    } catch (err) {
      // fallback: attempt to import from project's node_modules absolute path
      const path = require('path').resolve(__dirname, '..', '..', 'node_modules', 'sneaks-api', 'index.js');
      mod = await import(path);
    }

    const Lib: any = mod && (mod.default || mod);
    const inst = new Lib();
    sneaksInstance = inst;
    return sneaksInstance;
  } catch (err) {
    const e: any = err;
    console.error('ensureSneaks import error:', e && (e.message || e));
    throw new Error('sneaks-api not available');
  }
}

export class SneaksNpmService {
  static async getMostPopular(limit = 50): Promise<Product[]> {
    const inst = await ensureSneaks();
    return new Promise((resolve, reject) => {
      inst.getMostPopular(limit, (err: any, products: any) => {
        if (err) return reject(err);
        // Normalize products to internal schema
        try {
          const mapper = require('./sneaks-mapper').mapSneaksProduct;
          const list = Array.isArray(products) ? products.map((p: any) => mapper(p, { source: 'sneaks-npm' })) : [];
          resolve(list);
        } catch (e) {
          // if mapping fails, return raw
          resolve(products || []);
        }
      });
    });
  }

  static async searchProducts(keyword: string, limit = 50): Promise<Product[]> {
    const inst = await ensureSneaks();
    return new Promise((resolve, reject) => {
      inst.getProducts(keyword || '', limit, (err: any, products: any) => {
        if (err) return reject(err);
        try {
          const mapper = require('./sneaks-mapper').mapSneaksProduct;
          const list = Array.isArray(products) ? products.map((p: any) => mapper(p, { source: 'sneaks-npm' })) : [];
          resolve(list);
        } catch (e) {
          resolve(products || []);
        }
      });
    });
  }

  static async getProductPrices(styleID: string): Promise<Product | null> {
    const inst = await ensureSneaks();
    return new Promise((resolve, reject) => {
      inst.getProductPrices(styleID, (err: any, product: any) => {
        if (err) return reject(err);
        try {
          const mapper = require('./sneaks-mapper').mapSneaksProduct;
          resolve(product ? mapper(product, { source: 'sneaks-npm' }) : null);
        } catch (e) {
          resolve(product || null);
        }
      });
    });
  }
}

export default SneaksNpmService;
