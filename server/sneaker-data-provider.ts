// Common sneaker data interface
export interface SneakerData {
  id: string;
  name: string;
  brand: string;
  description?: string;
  imageUrl?: string;
  retailPrice?: number;
  releaseDate?: string;
  sku?: string;
  colorway?: string;
  sizes?: string[];
  materials?: string;
}

// Abstract provider interface
export interface SneakerDataProvider {
  getSneakersByBrand(brand: string, limit?: number): Promise<SneakerData[]>;
}

// Example: KicksAPI provider implementation
export class KicksAPIProvider implements SneakerDataProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getSneakersByBrand(brand: string, limit = 100): Promise<SneakerData[]> {
    const url = `https://api.kicks.dev/v1/sneakers?brand=${encodeURIComponent(brand)}&limit=${limit}`;
    // Simple retry loop for transient errors
    let attempts = 0;
    const maxAttempts = 3;
    while (attempts < maxAttempts) {
      attempts++;
      try {
  const response = await fetch(url, { headers: { 'Authorization': `Bearer ${this.apiKey}` } });
        const data = await response.json();
        console.log('[KicksAPIProvider] Raw API response:', data);
        if (!data || !Array.isArray(data.sneakers)) {
          throw new Error('KicksAPI response does not contain a sneakers array. Response: ' + JSON.stringify(data));
        }
        // Map KicksAPI response to SneakerData[]
        return data.sneakers.map((item: any) => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          description: item.description,
          imageUrl: item.image_url,
          retailPrice: item.retail_price,
          releaseDate: item.release_date,
          sku: item.sku,
          colorway: item.colorway,
          sizes: item.sizes,
          materials: item.materials
        }));
      } catch (err) {
        const e: any = err;
        console.warn(`[KicksAPIProvider] Attempt ${attempts} failed for ${brand}:`, e && (e.message || e));
        if (attempts >= maxAttempts) throw err;
        // backoff
        await new Promise((res) => setTimeout(res, attempts * 500));
      }
    }
    return [];
  }
}

// Usage example:
// const provider = new KicksAPIProvider(process.env.KICKSAPI_KEY!);
// const sneakers = await provider.getSneakersByBrand('Nike', 50);
