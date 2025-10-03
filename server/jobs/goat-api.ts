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

export const goatBrands = [
  "Nike", "Adidas", "Jordan", "New Balance", "Puma", "Reebok", "Converse", "Vans", "Asics", "Saucony", "Under Armour", "Fila", "Yeezy", "Balenciaga", "Off-White", "Gucci", "Prada", "Versace", "Bape", "K-Swiss", "Diadora", "Hoka", "On Running", "Salomon", "Brooks", "Merrell", "Timberland", "Skechers", "Lacoste", "Cole Haan", "Common Projects", "Golden Goose", "Veja", "Ewing", "Li-Ning", "Anta", "Peak", "361 Degrees", "Le Coq Sportif", "Umbro", "Mizuno", "PONY", "DC Shoes", "Supra", "Osiris", "Globe", "Emerica", "etnies", "Element", "Vans Vault", "Nike SB", "Adidas Skateboarding", "Jordan Brand", "Y-3", "Rick Owens", "Maison Margiela", "Fear of God", "A Bathing Ape", "Neighborhood", "WTAPS", "CLOT", "Alyx", "Ambush", "Sacai", "Fragment Design", "Stussy", "Noah", "Palace", "Patta", "Carhartt WIP", "Stone Island", "Arc'teryx", "The North Face", "Columbia", "Canada Goose", "Moncler", "Champion", "Russell Athletic", "Starter", "Mitchell & Ness", "New Era", "Nike ACG", "Adidas Consortium", "NikeLab", "Nike Sportswear", "Nike Air Max", "Nike Air Force 1", "Nike Air Jordan", "Nike Air Presto", "Nike Air Huarache", "Nike Air More Uptempo", "Nike Blazer", "Nike Cortez", "Nike Dunk", "Nike Foamposite", "Nike LeBron", "Nike KD", "Nike Kyrie", "Nike PG", "Nike Zoom", "Nike React", "Nike Vapormax", "Nike Shox", "Nike Roshe", "Nike Free", "Nike Lunar", "Nike SB Dunk", "Nike SB Blazer", "Nike SB Stefan Janoski", "Nike SB P-Rod", "Nike SB Eric Koston", "Nike SB Nyjah Huston", "Nike SB Ishod Wair", "Nike SB Bruin", "Nike SB Gato", "Nike SB Zoom", "Nike SB Zoom Blazer", "Nike SB Zoom Stefan Janoski", "Nike SB Zoom P-Rod", "Nike SB Zoom Eric Koston", "Nike SB Zoom Nyjah Huston", "Nike SB Zoom Ishod Wair", "Nike SB Zoom Bruin", "Nike SB Zoom Gato", "Nike SB Zoom Blazer Low", "Nike SB Zoom Blazer Mid", "Nike SB Zoom Stefan Janoski RM", "Nike SB Zoom P-Rod 6", "Nike SB Zoom Eric Koston 2", "Nike SB Zoom Nyjah Free", "Nike SB Zoom Ishod Wair Pro", "Nike SB Zoom Bruin React", "Nike SB Zoom Gato Pro", "Nike SB Zoom Blazer Low Pro GT", "Nike SB Zoom Blazer Mid Pro GT"
];

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
