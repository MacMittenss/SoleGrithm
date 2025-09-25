// Stub for StockX API integration
export interface StockxProductStub {
  id: number;
  name: string;
  brand: string;
  market?: {
    salesThisPeriod?: number;
    priceChange?: number;
  };
  media?: {
    imageUrl?: string;
  };
}

export const stockxAPI = {
  getTrendingSneakers: async (category: string): Promise<StockxProductStub[]> => {
    // Return an array of fake sneaker products for testing
    const brands = ["Nike", "Adidas", "New Balance", "Puma", "Reebok", "Converse", "Vans", "Asics", "Jordan"];
    const products: StockxProductStub[] = [];
    for (let i = 1; i <= 1000; i++) {
      const brand = brands[i % brands.length];
      products.push({
        id: 10000 + i,
        name: `${brand} StockX Sneaker ${i}`,
        brand: brand,
        market: {
          salesThisPeriod: Math.floor(Math.random() * 1000),
          priceChange: Math.floor(Math.random() * 100) - 50
        },
        media: {
          imageUrl: `https://example.com/stockx-${brand.toLowerCase()}-sneaker-${i}.jpg`
        }
      });
    }
    return products;
  }
};
