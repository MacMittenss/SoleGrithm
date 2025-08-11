import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  Play,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredSneakers = [
  {
    id: 1,
    name: "Air Jordan 1 Retro High",
    brand: "Nike",
    price: 170,
    originalPrice: 200,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    rating: 4.8,
    reviews: 247,
    isNew: true,
    badge: "LIMITED"
  },
  {
    id: 2,
    name: "Yeezy Boost 350 V2",
    brand: "Adidas", 
    price: 220,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&h=600&fit=crop",
    rating: 4.6,
    reviews: 189,
    badge: "TRENDING"
  },
  {
    id: 3,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 65,
    originalPrice: 85,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
    rating: 4.4,
    reviews: 156,
    badge: "SALE"
  }
];

export default function DaisyUIHomepage() {
  const [activeTab, setActiveTab] = useState("trending");

  return (
    <div className="min-h-screen">
      {/* DaisyUI Hero Section */}
      <div className="daisy-hero bg-gradient-to-br from-primary/10 via-accent/5 to-background min-h-screen">
        <div className="daisy-hero-content text-center max-w-6xl">
          <div className="max-w-4xl">
            {/* Hero Badge */}
            <motion.div 
              className="daisy-badge daisy-badge-lg daisy-badge-primary mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              ✨ AI-Powered Sneaker Discovery
            </motion.div>
            
            {/* Hero Title */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              SoleGrithm
            </motion.h1>
            
            {/* Hero Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-base-content/70 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover, collect, and trade sneakers with the power of AI. 
              Connect with a community that shares your passion for exceptional footwear.
            </motion.p>
            
            {/* Hero Actions */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button className="daisy-btn daisy-btn-primary daisy-btn-lg px-8">
                <Search className="w-5 h-5 mr-2" />
                Start Discovering
              </button>
              <button className="daisy-btn daisy-btn-outline daisy-btn-lg px-8">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section with DaisyUI */}
      <div className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="daisy-stats shadow-xl bg-base-200 w-full">
            <div className="daisy-stat place-items-center">
              <div className="daisy-stat-title">Sneakers</div>
              <div className="daisy-stat-value text-primary">50K+</div>
              <div className="daisy-stat-desc">In our catalog</div>
            </div>
            <div className="daisy-stat place-items-center">
              <div className="daisy-stat-title">Users</div>
              <div className="daisy-stat-value text-secondary">15K+</div>
              <div className="daisy-stat-desc">Active collectors</div>
            </div>
            <div className="daisy-stat place-items-center">
              <div className="daisy-stat-title">Reviews</div>
              <div className="daisy-stat-value text-accent">25K+</div>
              <div className="daisy-stat-desc">Community reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products with DaisyUI Cards */}
      <div className="py-24 bg-base-200/50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Sneakers</h2>
            <p className="text-xl text-base-content/60 max-w-2xl mx-auto">
              Curated by our AI and community experts
            </p>
          </div>

          {/* Tabs for Categories */}
          <div className="daisy-tabs daisy-tabs-boxed justify-center mb-12">
            <button 
              className={`daisy-tab daisy-tab-lg ${activeTab === 'trending' ? 'daisy-tab-active' : ''}`}
              onClick={() => setActiveTab('trending')}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </button>
            <button 
              className={`daisy-tab daisy-tab-lg ${activeTab === 'new' ? 'daisy-tab-active' : ''}`}
              onClick={() => setActiveTab('new')}
            >
              <Star className="w-4 h-4 mr-2" />
              New Arrivals
            </button>
            <button 
              className={`daisy-tab daisy-tab-lg ${activeTab === 'popular' ? 'daisy-tab-active' : ''}`}
              onClick={() => setActiveTab('popular')}
            >
              <Users className="w-4 h-4 mr-2" />
              Popular
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSneakers.map((sneaker, index) => (
              <motion.div
                key={sneaker.id}
                className="daisy-card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <figure className="relative overflow-hidden">
                  <img
                    src={sneaker.image}
                    alt={sneaker.name}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`daisy-badge ${
                      sneaker.badge === 'LIMITED' ? 'daisy-badge-error' :
                      sneaker.badge === 'TRENDING' ? 'daisy-badge-warning' :
                      'daisy-badge-success'
                    } daisy-badge-lg`}>
                      {sneaker.badge}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex flex-col gap-2">
                      <button className="daisy-btn daisy-btn-circle daisy-btn-sm bg-base-100/90">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="daisy-btn daisy-btn-circle daisy-btn-sm bg-base-100/90">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </figure>

                <div className="daisy-card-body">
                  <h2 className="daisy-card-title">
                    {sneaker.name}
                    {sneaker.isNew && (
                      <div className="daisy-badge daisy-badge-secondary">NEW</div>
                    )}
                  </h2>
                  <p className="text-base-content/60">{sneaker.brand}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 my-2">
                    <div className="daisy-rating daisy-rating-sm">
                      {[...Array(5)].map((_, i) => (
                        <input
                          key={i}
                          type="radio"
                          className={`daisy-mask daisy-mask-star-2 ${
                            i < Math.floor(sneaker.rating) ? 'bg-orange-400' : 'bg-gray-300'
                          }`}
                          disabled
                        />
                      ))}
                    </div>
                    <span className="text-sm text-base-content/60">
                      {sneaker.rating} ({sneaker.reviews} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold">${sneaker.price}</span>
                    {sneaker.originalPrice && (
                      <span className="text-base-content/40 line-through">
                        ${sneaker.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="daisy-card-actions justify-end">
                    <button className="daisy-btn daisy-btn-primary">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link href="/catalog">
              <button className="daisy-btn daisy-btn-outline daisy-btn-lg">
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Why Choose SoleGrithm?</h2>
            <p className="text-xl text-base-content/60">
              Experience the future of sneaker discovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI-Powered Recommendations",
                description: "Get personalized sneaker suggestions based on your style and preferences"
              },
              {
                icon: "👥", 
                title: "Community Driven",
                description: "Connect with fellow sneakerheads and discover trending styles"
              },
              {
                icon: "📱",
                title: "AR Try-On",
                description: "See how sneakers look on your feet before you buy"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="daisy-card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="daisy-card-body items-center text-center">
                  <div className="text-6xl mb-4">{feature.icon}</div>
                  <h3 className="daisy-card-title text-xl mb-2">{feature.title}</h3>
                  <p className="text-base-content/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Pair?
          </h2>
          <p className="text-xl text-base-content/60 mb-8">
            Join thousands of sneaker enthusiasts discovering their next favorite kicks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="daisy-btn daisy-btn-primary daisy-btn-lg px-8">
              Get Started Free
            </button>
            <button className="daisy-btn daisy-btn-outline daisy-btn-lg px-8">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}