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
    // Replace with real KicksAPI endpoint and logic
    // Example endpoint: https://api.kicksapi.com/v1/sneakers?brand=BRAND&limit=LIMIT
    const response = await fetch(`https://api.kicks.dev/v1/sneakers?brand=${encodeURIComponent(brand)}&limit=${limit}`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
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
  }
}

// Usage example:
// const provider = new KicksAPIProvider(process.env.KICKSAPI_KEY!);
// const sneakers = await provider.getSneakersByBrand('Nike', 50);
