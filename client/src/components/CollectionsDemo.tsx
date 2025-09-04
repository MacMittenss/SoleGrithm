import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  ArrowRight, 
  Star,
  TrendingUp,
  Users,
  Zap,
  Heart,
  Grid3X3,
  Layers3,
  Bot
} from 'lucide-react';

export default function CollectionsDemo() {
  const [activeCollection, setActiveCollection] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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
    hidden: { opacity: 0, y: 30 },
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

  const collections = [
    {
      id: 1,
      title: "Trending Hype",
      subtitle: "AI-Curated Hot Picks",
      icon: TrendingUp,
      gradient: "from-red-500 to-orange-500",
      count: 24,
      sneakers: [
        {
          name: "Air Jordan 4 Retro",
          brand: "Jordan",
          image: "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
        },
        {
          name: "Nike Dunk Low",
          brand: "Nike",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
        },
        {
          name: "Yeezy Boost 350",
          brand: "Adidas",
          image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
        }
      ]
    },
    {
      id: 2,
      title: "Retro Classics",
      subtitle: "Timeless Icons",
      icon: Star,
      gradient: "from-blue-500 to-purple-500",
      count: 18,
      sneakers: [
        {
          name: "Air Jordan 1 Retro",
          brand: "Jordan",
          image: "https://images.unsplash.com/photo-1551107696-a4b537c892cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
        },
        {
          name: "Nike Air Force 1",
          brand: "Nike",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
        },
        {
          name: "Converse Chuck Taylor",
          brand: "Converse",
          image: "https://images.unsplash.com/photo-1521774971864-62e842046145?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
        }
      ]
    },
    {
      id: 3,
      title: "Community Favorites",
      subtitle: "Crowd-Sourced Gems",
      icon: Users,
      gradient: "from-green-500 to-teal-500",
      count: 32,
      sneakers: [
        {
          name: "New Balance 990v5",
          brand: "New Balance",
          image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
        },
        {
          name: "Vans Old Skool",
          brand: "Vans",
          image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
        },
        {
          name: "Adidas Stan Smith",
          brand: "Adidas",
          image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
        }
      ]
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-gradient-to-br from-background via-muted/20 to-background"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12 sm:mb-16" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bot className="w-4 h-4" />
            AI Collections
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            Smart Collections
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI creates personalized collections based on trends, your preferences, and community favorites. 
            Discover new styles effortlessly.
          </p>
        </motion.div>

        {/* Collection Navigation */}
        <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12" variants={itemVariants}>
          {collections.map((collection, index) => (
            <motion.button
              key={collection.id}
              className={`p-4 rounded-xl border transition-all text-left ${
                activeCollection === index
                  ? 'border-primary bg-primary/5 shadow-lg'
                  : 'border-muted bg-card hover:border-primary/50'
              }`}
              onClick={() => setActiveCollection(index)}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              data-testid={`button-collection-${collection.id}`}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${collection.gradient} flex items-center justify-center`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <collection.icon className="w-5 h-5 text-white" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base">{collection.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{collection.subtitle}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {collection.count}
                </Badge>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Active Collection Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCollection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Collection Header */}
            <motion.div 
              className={`relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${collections[activeCollection].gradient} text-white overflow-hidden`}
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div
                className="absolute inset-0 bg-black/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {React.createElement(collections[activeCollection].icon, {
                      className: "w-6 h-6 sm:w-8 sm:h-8 text-white"
                    })}
                  </motion.div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold">
                      {collections[activeCollection].title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/80">
                      {collections[activeCollection].subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2">
                    <Grid3X3 className="w-4 h-4" />
                    {collections[activeCollection].count} Sneakers
                  </span>
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI Curated
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Sneaker Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              variants={containerVariants}
            >
              {collections[activeCollection].sneakers.map((sneaker, index) => (
                <motion.div
                  key={`${activeCollection}-${index}`}
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
                  <Card className="group overflow-hidden border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-shadow">
                    <div className="relative overflow-hidden">
                      <img
                        src={sneaker.image}
                        alt={sneaker.name}
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <motion.div 
                        className="absolute top-3 right-3"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button size="sm" variant="secondary" className="rounded-full w-8 h-8 p-0" data-testid={`button-favorite-${index}`}>
                          <Heart className="w-4 h-4" />
                        </Button>
                      </motion.div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge variant="secondary" className="text-xs mb-2">
                          {sneaker.brand}
                        </Badge>
                        <h4 className="text-white font-semibold text-sm group-hover:text-primary transition-colors">
                          {sneaker.name}
                        </h4>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Collection Actions */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4"
              variants={itemVariants}
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button size="lg" className="h-12 px-8 text-base" data-testid="button-view-collection">
                  <Layers3 className="w-5 h-5 mr-2" />
                  View Full Collection
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button variant="outline" size="lg" className="h-12 px-8 text-base" data-testid="button-create-collection">
                  <Zap className="w-5 h-5 mr-2" />
                  Create My Collection
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}