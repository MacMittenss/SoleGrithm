import React, { useState, useRef } from 'react';
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import Hero from "@/components/Hero";
import HotRightNowSlider from "@/components/HotRightNowSlider";
import SneakerCard from "@/components/SneakerCard";
import VisualSearchDemo from "@/components/VisualSearchDemo";
import CollectionsDemo from "@/components/CollectionsDemo";
import ARDemo from "@/components/ARDemo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Star, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  Heart,
  ShoppingBag,
  Zap,
  ChevronDown,
  Play,
  Search
} from "lucide-react";
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const { user, isAuthenticated } = useAuth();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform values for parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Animation variants for mobile-first design
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const { data: featuredSneakers, isLoading: sneakersLoading } = useQuery({
    queryKey: ['/api/sneakers/featured'],
    queryFn: async () => {
      const response = await fetch('/api/sneakers/featured');
      if (!response.ok) throw new Error('Failed to fetch featured sneakers');
      return response.json();
    }
  });

  const { data: brands } = useQuery({
    queryKey: ['/api/brands'],
    queryFn: async () => {
      const response = await fetch('/api/brands');
      if (!response.ok) throw new Error('Failed to fetch brands');
      return response.json();
    }
  });

  // Filter sneakers based on selected brand
  const filteredSneakers = featuredSneakers?.filter((sneaker: any) => {
    if (selectedBrand === 'All') return true;
    return sneaker.brandName === selectedBrand;
  });

  const { data: blogPosts, isLoading: blogLoading } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: async () => {
      const response = await fetch('/api/blog');
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json();
    }
  });

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section with Parallax */}
      <motion.div style={{ y, opacity }}>
        <Hero />
      </motion.div>

      {/* What's Hot Right Now Slider */}
      <motion.div variants={itemVariants}>
        <HotRightNowSlider />
      </motion.div>

      {/* Quick Stats with Animated Counters */}
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-background via-muted/30 to-background"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={containerVariants}
          >
            {[
              { value: "50K+", label: "Sneakers Cataloged", delay: 0 },
              { value: "15K+", label: "Active Collectors", delay: 0.1 },
              { value: "25K+", label: "Community Reviews", delay: 0.2 },
              { value: "98%", label: "Satisfaction Rate", delay: 0.3 }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      delay: stat.delay,
                      ease: "easeOut"
                    }
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Mobile-First Quick Actions */}
      {!isAuthenticated && (
        <motion.section 
          className="py-12 sm:py-16 px-4"
          variants={itemVariants}
        >
          <div className="max-w-sm mx-auto space-y-4">
            <motion.div
              className="text-center mb-6"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold mb-2">Join SoleGrithm</h3>
              <p className="text-sm text-muted-foreground">Start your sneaker journey today</p>
            </motion.div>
            
            <motion.div
              className="space-y-3"
              variants={containerVariants}
            >
              <Link href="/auth">
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button 
                    className="w-full h-12 text-base font-medium"
                    data-testid="button-get-started"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </Link>
              
              <Link href="/visual-search">
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button 
                    variant="outline" 
                    className="w-full h-12 text-base"
                    data-testid="button-try-search"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Try Visual Search
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Personalized Quick Stats for Authenticated Users */}
      {isAuthenticated && (
        <motion.section 
          className="py-12 sm:py-16 px-4"
          variants={itemVariants}
        >
          <div className="max-w-md mx-auto">
            <motion.div
              className="bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-2xl p-6 border border-primary/10"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Welcome back, {user?.displayName || 'Sneakerhead'}!</h3>
                <p className="text-sm text-muted-foreground">Your sneaker stats</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">42</div>
                  <div className="text-xs text-muted-foreground">Sneakers Owned</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-orange-500">18</div>
                  <div className="text-xs text-muted-foreground">On Wishlist</div>
                </div>
              </div>
              
              <Link href="/profile">
                <Button variant="outline" className="w-full mt-4" data-testid="button-view-profile">
                  View Profile
                  <ChevronDown className="w-4 h-4 ml-2 rotate-[-90deg]" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Featured Sneakers with Mobile-First Design */}
      <motion.section 
        className="py-16 sm:py-24"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Featured Sneakers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the latest drops and timeless classics in our curated collection
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <Button 
                variant={selectedBrand === 'All' ? 'secondary' : 'ghost'} 
                size="sm" 
                className={selectedBrand === 'All' ? 'bg-background shadow-sm' : ''}
                onClick={() => setSelectedBrand('All')}
              >
                All
              </Button>
              {brands?.map((brand: any) => (
                <Button 
                  key={brand.id}
                  variant={selectedBrand === brand.name ? 'secondary' : 'ghost'} 
                  size="sm"
                  className={selectedBrand === brand.name ? 'bg-background shadow-sm' : ''}
                  onClick={() => setSelectedBrand(brand.name)}
                >
                  {brand.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile-First Sneaker Grid with Animations */}
          {sneakersLoading ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              variants={containerVariants}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="animate-pulse"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="bg-muted rounded-xl sm:rounded-2xl h-48 sm:h-64 mb-4" />
                  <div className="space-y-2 px-2">
                    <div className="h-3 sm:h-4 bg-muted rounded w-1/3" />
                    <div className="h-4 sm:h-5 bg-muted rounded w-2/3" />
                    <div className="h-5 sm:h-6 bg-muted rounded w-1/2" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              variants={containerVariants}
            >
              {filteredSneakers?.slice(0, 8).map((sneaker: any, index: number) => (
                <motion.div
                  key={sneaker.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }
                    }
                  }}
                  whileHover={{
                    scale: 1.03,
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <SneakerCard 
                    sneaker={{
                      id: sneaker.id,
                      name: sneaker.name,
                      brand: sneaker.brandName || 'Unknown Brand',
                      price: new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(sneaker.retailPrice),
                      imageUrl: sneaker.images?.[0] || "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
                      slug: sneaker.slug,
                      isNew: new Date(sneaker.releaseDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                      rating: 4.5,
                      reviewCount: Math.floor(Math.random() * 50) + 10,
                      brandName: sneaker.brandName,
                      description: sneaker.description,
                      images: sneaker.images,
                      retailPrice: sneaker.retailPrice,
                      categories: sneaker.categories,
                      sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
                      materials: 'Premium materials and construction',
                      colorway: sneaker.colorway,
                      releaseDate: sneaker.releaseDate,
                      sku: `SKU-${sneaker.id}`
                    }}
                    enableHoverPreview={true}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div 
            className="text-center mt-8 sm:mt-12"
            variants={itemVariants}
          >
            <Link href="/live-market">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button size="lg" className="h-12 px-8 text-base" data-testid="button-view-all-sneakers">
                  View All Sneakers
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Mobile-First Feature Sections */}
      <motion.div variants={itemVariants}>
        <VisualSearchDemo />
      </motion.div>

      <motion.div variants={itemVariants}>
        <CollectionsDemo />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ARDemo />
      </motion.div>

      {/* Mobile-First Blog Section */}
      <motion.section 
        className="py-16 sm:py-24 bg-gradient-to-br from-muted/30 to-background"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Latest Stories
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Dive deep into sneaker culture with our community-driven blog
            </p>
          </motion.div>

          {blogLoading ? (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={containerVariants}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div key={i} className="animate-pulse" variants={itemVariants}>
                  <div className="bg-muted rounded-xl sm:rounded-2xl h-48 sm:h-64 mb-4 sm:mb-6" />
                  <div className="space-y-2 px-2">
                    <div className="h-3 sm:h-4 bg-muted rounded w-1/4" />
                    <div className="h-5 sm:h-6 bg-muted rounded w-3/4" />
                    <div className="h-3 sm:h-4 bg-muted rounded w-full" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={containerVariants}
            >
              {blogPosts?.slice(0, 3).map((post: any, index: number) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.95 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          delay: index * 0.15,
                          ease: "easeOut"
                        }
                      }
                    }}
                    whileHover={{
                      scale: 1.03,
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl">
                      <div className="relative overflow-hidden">
                        <img
                          src={post.featuredImage || "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"}
                          alt={post.title}
                          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                          <Badge variant="secondary" className="mb-2 text-xs">Featured</Badge>
                          <h3 className="text-white font-semibold text-sm sm:text-lg group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-4 sm:p-6">
                        <p className="text-muted-foreground text-sm sm:text-base line-clamp-3">
                          {post.excerpt || "Exploring the latest trends and stories in sneaker culture..."}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          )}

          <motion.div className="text-center mt-8 sm:mt-12" variants={itemVariants}>
            <Link href="/blog">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button variant="outline" size="lg" className="h-12 px-8" data-testid="button-view-all-stories">
                  View All Stories
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Mobile-First Features Section */}
      <motion.section 
        className="py-16 sm:py-24"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              Why SoleGrithm?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              The most comprehensive platform for sneaker enthusiasts
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={containerVariants}
          >
            {[
              {
                icon: TrendingUp,
                title: "Real-Time Pricing",
                description: "Track market prices across all major platforms in real-time",
                delay: 0
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Connect with collectors and enthusiasts worldwide",
                delay: 0.1
              },
              {
                icon: MessageSquare,
                title: "AI Assistant",
                description: "Get personalized recommendations from our AI sneaker expert",
                delay: 0.2
              },
              {
                icon: Star,
                title: "Authentic Reviews",
                description: "Read verified reviews from real sneaker owners",
                delay: 0.3
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      delay: feature.delay,
                      ease: "easeOut"
                    }
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="p-4 sm:p-6 text-center border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow group">
                  <motion.div 
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-orange-500 transition-colors" />
                  </motion.div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm group-hover:text-foreground transition-colors">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
