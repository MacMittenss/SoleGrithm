interface Product {
  id: string;
  image: string;
  category: string;
  name: string;
  price: number;
  colors?: { color: string; count?: number }[];
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="w-full">
      <div className="aspect-[4/5] mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover border border-gray-300"
        />
      </div>
      <div className="space-y-1">
        <p className="text-black/60 font-beatrice-deck text-xs font-medium">
          {product.category}
        </p>
        {product.colors && (
          <div className="flex items-center gap-4">
            <div
              className="w-3 h-3 border border-gray-400"
              style={{ backgroundColor: product.colors[0]?.color }}
            />
            {product.colors[0]?.count && (
              <span className="text-black/60 font-beatrice-deck text-xs font-light">
                +{product.colors[0].count}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between">
          <h3 className="text-black font-beatrice-deck text-sm font-medium capitalize">
            {product.name}
          </h3>
          <span className="text-black font-beatrice-deck text-sm font-medium">
            $ {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProductGrid() {
  const products: Product[] = [
    {
      id: "1",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/7d8dc559134edd26ac8ddae6d3e090a9e73541e9?width=530",
      category: "Cotton T Shirt",
      name: "Basic Slim Fit T-Shirt",
      price: 199,
      colors: [{ color: "#ebe7db", count: 5 }]
    },
    {
      id: "2",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/48716fe81a2222f2ddffea06701e8de3f5dee786?width=530",
      category: "Crewneck T-Shirt",
      name: "Basic Heavy Weight T-shirt",
      price: 199
    },
    {
      id: "3",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/b3f3447fe56a1450f057189b0aaa75fc1eceff0a?width=530",
      category: "Cotton T Shirt",
      name: "Full Sleeve Zipper",
      price: 199,
      colors: [{ color: "#1d2122", count: 6 }]
    },
    {
      id: "4",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/fc3041edfab635dcc5d027e69d96d50a4c5f6a43?width=530",
      category: "Cotton T Shirt",
      name: "Full Sleeve Zipper",
      price: 199
    },
    {
      id: "5",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c92e43a12d9f3f52cbbb758831fc9b2ecca4ac60?width=530",
      category: "Cotton T Shirt",
      name: "Full Sleeve Zipper",
      price: 199
    },
    {
      id: "6",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/3b4ab86696f6aa5cfc6a080412f5896d432b3165?width=530",
      category: "Cotton T Shirt",
      name: "Full Sleeve Zipper",
      price: 199
    }
  ];

  const categories = [
    { name: "New", active: true },
    { name: "Shirts", active: false },
    { name: "Polo Shirts", active: false },
    { name: "Shorts", active: false },
    { name: "Suits", active: false },
    { name: "Best sellers", active: false },
    { name: "T-Shirts", active: false },
    { name: "Jeans", active: false },
    { name: "Jackets", active: false },
    { name: "Coats", active: false }
  ];

  return (
    <div className="flex-1">
      {/* Breadcrumbs */}
      <div className="mb-7">
        <p className="text-black font-beatrice-deck text-xs font-medium tracking-wider">
          <span className="text-black/60">Home</span> / Products
        </p>
      </div>

      {/* Page Title */}
      <h1 className="text-black font-beatrice-deck text-xl font-bold tracking-wider uppercase mb-10">
        Products
      </h1>

      {/* Search and Categories */}
      <div className="mb-10">
        {/* Search Bar */}
        <div className="relative w-[367px] h-12 bg-gray-300 rounded-sm mb-10 flex items-center">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 w-4 h-4"
          >
            <circle
              cx="7.80834"
              cy="7.80834"
              r="6.80834"
              stroke="black"
              strokeWidth="1.5"
            />
            <path
              d="M12.825 12.825L15.3333 15.3334"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute right-20 text-black/60 font-beatrice-deck text-xs tracking-wider">
            Search
          </span>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`w-[101px] h-6 border border-gray-400 flex items-center justify-center text-xs uppercase font-beatrice transition-colors hover:bg-gray-50 ${
                category.active ? 'text-black' : 'text-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
