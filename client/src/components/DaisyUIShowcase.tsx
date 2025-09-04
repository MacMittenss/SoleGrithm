import { useState } from "react";
import { motion } from "framer-motion";
import EnhancedProductCard from "./EnhancedProductCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Sparkles, TrendingUp } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High",
    brand: "Nike",
    price: 170,
    originalPrice: 200,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 1247,
    isNew: true,
    isSale: true,
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"]
  },
  {
    id: 2,
    name: "Yeezy Boost 350 V2",
    brand: "Adidas",
    price: 220,
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 892,
    sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: 3,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 65,
    originalPrice: 85,
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    rating: 4.4,
    reviewCount: 2156,
    isSale: true,
    sizes: ["6", "7", "8", "9", "10", "11"]
  }
];

export default function DaisyUIShowcase() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cartItems, setCartItems] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const addToCart = (id: number) => {
    setCartItems(prev => new Set([...Array.from(prev), id]));
    // Show toast notification (DaisyUI style)
    const toast = document.createElement('div');
    toast.className = 'daisy-toast daisy-toast-top daisy-toast-end';
    toast.innerHTML = `
      <div class="daisy-alert daisy-alert-success">
        <span>Added to cart successfully!</span>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            Enhanced with DaisyUI
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Premium Product Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive product cards with advanced animations, quick actions, and seamless shopping experience
          </p>
        </motion.div>

        {/* Stats Bar with DaisyUI */}
        <motion.div 
          className="daisy-stats shadow-lg bg-white dark:bg-base-200 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="daisy-stat">
            <div className="daisy-stat-figure text-primary">
              <ShoppingBag size={32} />
            </div>
            <div className="daisy-stat-title">Products</div>
            <div className="daisy-stat-value text-primary">2.6K</div>
            <div className="daisy-stat-desc">21% more than last month</div>
          </div>
          
          <div className="daisy-stat">
            <div className="daisy-stat-figure text-secondary">
              <TrendingUp size={32} />
            </div>
            <div className="daisy-stat-title">Sales</div>
            <div className="daisy-stat-value text-secondary">$89.4K</div>
            <div className="daisy-stat-desc">14% increase</div>
          </div>
          
          <div className="daisy-stat">
            <div className="daisy-stat-figure text-accent">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="daisy-stat-title">Satisfaction</div>
            <div className="daisy-stat-value">98%</div>
            <div className="daisy-stat-desc">Customer rating</div>
          </div>
        </motion.div>

        {/* Enhanced Product Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <EnhancedProductCard
                {...product}
                isFavorite={favorites.has(product.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="daisy-btn daisy-btn-primary"
              data-testid="button-view-all-products"
            >
              View All Products
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="daisy-btn daisy-btn-outline"
              data-testid="button-view-cart"
            >
              View Cart ({cartItems.size})
            </Button>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
        >
          {[
            {
              title: "Interactive Animations",
              description: "Smooth hover effects and micro-interactions",
              icon: "✨"
            },
            {
              title: "Quick Actions",
              description: "Add to favorites and cart without page reload",
              icon: "⚡"
            },
            {
              title: "Size Selection",
              description: "Instant size picking with visual feedback",
              icon: "👟"
            }
          ].map((feature, index) => (
            <div 
              key={feature.title}
              className="daisy-card bg-white dark:bg-base-200 shadow-lg p-6 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}