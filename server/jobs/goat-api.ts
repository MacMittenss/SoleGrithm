// Stub for GOAT API integration
export interface GoatProductStub {
  id: number;
  name: string;
  brand_name: string;
  market_data?: {
    number_of_sales?: number;
    price_premium?: number;
  };
  main_picture_url?: string;
}

export const goatAPI = {
  getProductsByBrand: async (brand: string, limit: number): Promise<GoatProductStub[]> => {
    // Return an array of fake sneaker products for testing
    const products: GoatProductStub[] = [];
    for (let i = 1; i <= limit; i++) {
      products.push({
        id: parseInt(`${brand.length}${i}`),
        name: `${brand} Sneaker ${i}`,
        brand_name: brand,
        market_data: {
          number_of_sales: Math.floor(Math.random() * 1000),
          price_premium: Math.floor(Math.random() * 100)
        },
        main_picture_url: `https://example.com/${brand.toLowerCase()}-sneaker-${i}.jpg`
      });
    }
    return products;
  }
};
