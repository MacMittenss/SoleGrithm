import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';

// Advanced components with VITURE-style animations
import AdvancedHero from "@/components/advanced/AdvancedHero";
import AdvancedLiveMarket from "@/components/advanced/AdvancedLiveMarket";
import AdvancedSoleMap from "@/components/advanced/AdvancedSoleMap";
import AdvancedVisualSearch from "@/components/advanced/AdvancedVisualSearch";
import AdvancedCollections from "@/components/advanced/AdvancedCollections";
import AdvancedPreloader from "@/components/advanced/AdvancedPreloader";
import Minimap from "@/components/advanced/Minimap";
import SectionWrapper from "@/components/SectionWrapper";

// Legacy components (will be gradually replaced)
import HotRightNowSlider from "@/components/HotRightNowSlider";
import PinterestSneakerCard from "@/components/PinterestSneakerCard";
import { useAuth } from "@/hooks/useAuth";
import { BlogPost, Sneaker } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Heart, 
  TrendingUp, 
  Camera, 
  Shuffle, 
  Users,
  MapPin,
  Calendar,
  Search,
  Filter,
  Eye,
  DollarSign,
  BarChart3,
  Zap,
  Sparkles,
  ArrowRight,
  PlayCircle,
  Globe,
  Layers,
  Target,
  ShoppingBag,
  Lightbulb,
  Bot,
  ChevronRight,
  CheckCircle,
  ArrowUpRight,
  ExternalLink,
  Plus,
  X,
  Upload,
  Mic
} from 'lucide-react';
import { Link } from 'wouter';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import womenSneakersImage from "@assets/generated_images/Woman_in_stylish_sneakers_90ff70fb.png";
import arTryonImage from "@assets/generated_images/AR_sneaker_try-on_technology_732da862.png";

export default function Home() {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const containerRef = useRef(null);

  // Initialize smooth scrolling
  useSmoothScroll();

  // Section variants for orchestrated animations
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const heroVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        duration: 0.1
      }
    }
  };

  // API Data fetching
  const { data: sneakers, isLoading: sneakersLoading } = useQuery({
    queryKey: ["/api/sneakers/trending"],
  });

  const { data: featuredSneakers, isLoading: featuredLoading } = useQuery({
    queryKey: ["/api/sneakers/featured"],
  });

  const { data: brands } = useQuery({
    queryKey: ["/api/brands"],
  });

  // Filter trending sneakers based on selected brand
  const filteredSneakers = Array.isArray(sneakers) ? sneakers.filter((sneaker: any) => {
    if (selectedBrand === 'All') return true;
    return sneaker.brandName === selectedBrand;
  }) : [];

  const { data: blogPosts, isLoading: blogLoading, error: blogError } = useQuery({
    queryKey: ["/api/blog"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Minimap sections configuration
  const minimapSections = [
    { id: 'hero', title: 'Hero', progress: 0 },
    { id: 'trending', title: 'Trending', progress: 0 },
    { id: 'blog', title: 'Stories', progress: 0 },
    { id: 'visual-search', title: 'Visual Search', progress: 0 },
    { id: 'collections', title: 'Collections', progress: 0 },
    { id: 'live-market', title: 'Live Market', progress: 0 },
    { id: 'discover', title: 'Discover', progress: 0 }
  ];

  return (
    <>
      {/* Advanced Preloader */}
      <AdvancedPreloader
        onComplete={() => setIsLoading(false)}
        duration={2800}
        brandText="SoleGrithm"
      />

      {/* Minimap Navigation */}
      {!isLoading && (
        <Minimap
          sections={minimapSections}
          className="hidden lg:block"
        />
      )}

      <motion.div 
        ref={containerRef}
        className="min-h-screen bg-black overflow-x-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
          minHeight: '100vh',
        }}
      >
      {/* Hero Section - Advanced VITURE-style */}
      <SectionWrapper
        id="hero"
        sticky={true}
        maskTransition={true}
        className="relative"
        height="100vh"
      >
        <AdvancedHero />
      </SectionWrapper>

      {/* Nike-Style Split Hero Sections - Full Width Connected */}
      <section className="bg-white dark:bg-background">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            {/* Women in Sneakers Hero - Full Width Left */}
            <div 
              className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden group cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${womenSneakersImage})`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent lg:bg-gradient-to-t lg:from-black/80 lg:via-black/20 lg:to-transparent" />
              
              {/* Content overlay */}
              <div className="relative h-full flex items-end justify-start p-8 lg:p-12">
                <motion.div 
                  className="text-left max-w-lg"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
                    Women in Sneakers
                  </h2>
                  <p className="text-lg lg:text-xl text-white/90 mb-6 max-w-md leading-relaxed">
                    Celebrating the powerful voices and unique styles that shape sneaker culture
                  </p>
                  <Link href="/blog">
                    <Button 
                      size="lg" 
                      className="bg-white text-black hover:bg-white/90 transition-all duration-300 font-semibold"
                    >
                      Read Stories
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* AR Try-On Hero - Full Width Right */}
            <div 
              className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden group cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${arTryonImage})`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/20 to-transparent lg:bg-gradient-to-t lg:from-black/80 lg:via-black/20 lg:to-transparent" />
              
              {/* Content overlay */}
              <div className="relative h-full flex items-end justify-end p-8 lg:p-12">
                <motion.div 
                  className="text-right lg:text-left max-w-lg"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
                    AR Try-On
                  </h2>
                  <p className="text-lg lg:text-xl text-white/90 mb-6 max-w-md leading-relaxed">
                    Experience sneakers in augmented reality. See how they look before you buy.
                  </p>
                  <Link href="/ar-tryon">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 font-semibold"
                    >
                      Try AR Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trending Section */}
      <SectionWrapper
        id="trending"
        maskTransition={true}
        className="bg-background"
      >
        <motion.section 
          className="py-24 md:py-36"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Hot Right Now
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover what's trending in the sneaker world right now
              </p>
            </motion.div>

            {/* Brand Filter Tabs */}
            <motion.div 
              className="mb-12 flex justify-center"
              variants={itemVariants}
            >
              <Tabs value={selectedBrand} onValueChange={setSelectedBrand} className="w-full max-w-4xl">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                  <TabsTrigger value="All" className="text-sm">All Brands</TabsTrigger>
                  {Array.isArray(brands) && brands.slice(0, 4).map((brand: any) => (
                    <TabsTrigger key={brand.id} value={brand.name} className="text-sm">
                      {brand.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </motion.div>

            {/* Trending Sneakers Grid */}
            <motion.div 
              className="mb-16"
              variants={itemVariants}
            >
              {sneakersLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-muted rounded-lg h-64 mb-4"></div>
                      <div className="space-y-2">
                        <div className="bg-muted rounded h-4 w-3/4"></div>
                        <div className="bg-muted rounded h-4 w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <HotRightNowSlider 
                  sneakers={filteredSneakers} 
                  title="Trending Now"
                />
              )}
            </motion.div>
          </div>
        </motion.section>
      </SectionWrapper>

      {/* Blog Section */}
      <SectionWrapper
        id="blog"
        maskTransition={true}
        className="bg-muted/50"
      >
        <motion.section 
          className="py-24 md:py-36"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              variants={itemVariants}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Latest Stories
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Dive deep into sneaker culture, trends, and community insights
              </p>
            </motion.div>

            {blogLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-muted rounded-lg h-48 mb-4"></div>
                    <div className="space-y-2">
                      <div className="bg-muted rounded h-4 w-3/4"></div>
                      <div className="bg-muted rounded h-4 w-1/2"></div>
                      <div className="bg-muted rounded h-4 w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={itemVariants}
              >
                {Array.isArray(blogPosts) && blogPosts.slice(0, 6).map((post: BlogPost) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        {post.featured_image ? (
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                            <Bot className="w-12 h-12 text-primary/60" />
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <CardTitle className="line-clamp-2 text-lg">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Link href={`/blog/${post.slug}`}>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full justify-between group"
                          >
                            Read More
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.section>
      </SectionWrapper>

      {/* Visual Search Section - Advanced */}
      <SectionWrapper
        id="visual-search"
        maskTransition={true}
        className="bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10"
      >
        <AdvancedVisualSearch />
      </SectionWrapper>

      {/* Collections Section - Advanced */}
      <SectionWrapper
        id="collections"
        maskTransition={true}
        className="bg-background"
      >
        <AdvancedCollections />
      </SectionWrapper>

      {/* Live Market Section - Advanced */}
      <SectionWrapper
        id="live-market"
        maskTransition={true}
        className="bg-muted/30"
      >
        <AdvancedLiveMarket />
      </SectionWrapper>

      {/* Discover Section with SoleMap - Advanced */}
      <SectionWrapper
        id="discover"
        maskTransition={true}
        className="bg-gradient-to-t from-background to-muted/50"
      >
        <AdvancedSoleMap />
      </SectionWrapper>

      {/* AI Reviews Section - Minimalistic Design */}
      <motion.section 
        className="py-24 md:py-36 bg-muted/30"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center px-6">
          {/* Left Col - Interactive Review Dashboard */}
          <motion.div 
            className="flex flex-col w-full lg:w-1/2 justify-center items-start text-center md:text-left mb-16 md:mb-0"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              AI-Powered Reviews
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Get intelligent insights and personalized recommendations from our advanced AI system.
            </p>
            
            {/* Interactive AI Features */}
            <div className="w-full max-w-md space-y-4">
              <motion.div 
                className="flex items-center justify-between p-4 bg-card rounded-lg border"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Smart Analysis</p>
                    <p className="text-xs text-muted-foreground">AI-driven insights</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-between p-4 bg-card rounded-lg border"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Personalized Recs</p>
                    <p className="text-xs text-muted-foreground">Tailored for you</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-between p-4 bg-card rounded-lg border"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Market Trends</p>
                    <p className="text-xs text-muted-foreground">Real-time data</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </motion.div>
            </div>
            
            <div className="pt-8">
              <Link href="/ai-reviews">
                <Button size="lg" className="group">
                  Experience AI Reviews
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Col - Visual Representation */}
          <motion.div 
            className="w-full lg:w-1/2 lg:pl-16"
            variants={itemVariants}
          >
            <div className="relative">
              {/* AI Review Cards */}
              <motion.div 
                className="grid gap-4"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {Array.from({ length: 3 }).map((_, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 bg-card rounded-xl border shadow-lg ${
                      index === 1 ? 'transform scale-105 z-10 relative' : ''
                    }`}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -5, 
                      scale: index === 1 ? 1.08 : 1.03,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">AI Assistant</p>
                          <p className="text-xs text-muted-foreground">Verified Review</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {index === 0 && "Perfect for streetwear enthusiasts. The colorway and silhouette align perfectly with current trends."}
                      {index === 1 && "Outstanding comfort and durability. These sneakers exceeded expectations in both style and performance."}
                      {index === 2 && "Great value proposition. Quality materials and construction make this a smart choice for any collection."}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      </motion.div>
    </>
  );
}