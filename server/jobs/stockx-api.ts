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

export const stockxBrands = [
  "Nike", "Adidas", "Jordan", "New Balance", "Puma", "Reebok", "Converse", "Vans", "Asics", "Saucony", "Under Armour", "Fila", "Yeezy", "Balenciaga", "Off-White", "Gucci", "Prada", "Versace", "Bape", "K-Swiss", "Diadora", "Hoka", "On Running", "Salomon", "Brooks", "Merrell", "Timberland", "Skechers", "Lacoste", "Cole Haan", "Common Projects", "Golden Goose", "Veja", "Ewing", "Li-Ning", "Anta", "Peak", "361 Degrees", "Le Coq Sportif", "Umbro", "Mizuno", "PONY", "DC Shoes", "Supra", "Osiris", "Globe", "Emerica", "etnies", "Element", "Vans Vault", "Nike SB", "Adidas Skateboarding", "Jordan Brand", "Y-3", "Rick Owens", "Maison Margiela", "Fear of God", "A Bathing Ape", "Neighborhood", "WTAPS", "CLOT", "Alyx", "Ambush", "Sacai", "Fragment Design", "Stussy", "Noah", "Palace", "Patta", "Carhartt WIP", "Stone Island", "Arc'teryx", "The North Face", "Columbia", "Canada Goose", "Moncler", "Champion", "Russell Athletic", "Starter", "Mitchell & Ness", "New Era"
];

export const stockxAPI = {
  getTrendingSneakers: async (category: string, brand?: string, limit: number = 1000): Promise<StockxProductStub[]> => {
    // Return an array of fake sneaker products for testing
    const products: StockxProductStub[] = [];
    for (let i = 1; i <= limit; i++) {
      products.push({
        id: 10000 + i,
        name: `${brand} StockX Sneaker ${i}`,
        brand: brand || "Unknown",
        market: {
          salesThisPeriod: Math.floor(Math.random() * 1000),
          priceChange: Math.floor(Math.random() * 100) - 50
        },
        media: {
          imageUrl: `https://example.com/stockx-${(brand || "unknown").toLowerCase()}-sneaker-${i}.jpg`
        }
      });
    }
    return products;
  }
};
