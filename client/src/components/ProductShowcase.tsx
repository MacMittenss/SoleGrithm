export default function ProductShowcase() {
  const products = [
    {
      id: 'pro',
      name: 'SoleGrithm Pro',
      category: 'All-Around Excellence',
      description: 'The complete professional experience with advanced display technology and premium features.',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      gradient: 'gradient-start'
    },
    {
      id: 'ultra',
      name: 'SoleGrithm Ultra',
      category: "Power User's Choice",
      description: 'Designed for intensive daily use with cutting-edge display technology and premium comfort.',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      gradient: 'gradient-mid'
    },
    {
      id: 'essential',
      name: 'SoleGrithm Essential',
      category: 'Accessible Innovation',
      description: 'Essential features and premium quality at an accessible price point.',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      gradient: 'gradient-end'
    }
  ];

  return (
    <section className="relative py-32" id="products">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text" data-text="YOUR DISPLAY,">YOUR DISPLAY,</span>
            <br />
            <span className="text-white">YOUR WAY.</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the SoleGrithm ecosystem designed for every use case, from immersive gaming to professional productivity.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {products.map((product) => (
            <div 
              key={product.id}
              className="group relative bg-secondary-dark rounded-3xl p-8 hover:bg-gray-800 transition-all duration-500 transform hover:scale-105"
              data-testid={`card-product-${product.id}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500"></div>
              <div className="relative z-10">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover rounded-xl mb-6" 
                />
                <h3 className="text-2xl font-bold mb-2 gradient-text" data-text={product.name}>
                  {product.name}
                </h3>
                <p className={`text-lg mb-4 text-${product.gradient}`}>
                  {product.category}
                </p>
                <p className="text-gray-300 mb-6">
                  {product.description}
                </p>
                <button 
                  className="w-full gradient-bg text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                  data-testid={`button-explore-${product.id}`}
                >
                  Explore {product.name.split(' ')[1]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
