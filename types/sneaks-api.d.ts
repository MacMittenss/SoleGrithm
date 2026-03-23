declare module 'sneaks-api' {
  interface Sneaks {
    getProducts(keyword: string, limit: number, cb: (err: any, products: any[]) => void): void;
    getProductPrices(styleId: string, cb: (err: any, product: any) => void): void;
    getMostPopular(limit: number, cb: (err: any, products: any[]) => void): void;
  }
  const Sneaks: { new(): Sneaks };
  export = Sneaks;
}
