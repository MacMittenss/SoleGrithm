import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { TrendingUp, ArrowRight, Zap } from 'lucide-react';

const LiveMarketSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for scroll animations
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const translateY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  
  // Individual element animations
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const contentTranslateY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -80]);
  const visualOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const visualTranslateY = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [120, 0, 0, -120]);
  
  // useInView for additional control
  const isInView = useInView(sectionRef, { 
    once: false, 
    margin: "-20% 0px -20% 0px" 
  });
  
  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const priceRowVariants = {
    hidden: { 
      opacity: 0, 
      x: -30 
    },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{
        opacity,
        scale,
        y: translateY,
      }}
      data-testid="section-live-market"
    >
      {/* Background gradient with scroll animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/3 to-orange-500/5"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 0])
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Content Section */}
          <motion.div 
            ref={contentRef}
            className="space-y-6"
            style={{
              opacity: contentOpacity,
              y: contentTranslateY,
            }}
            variants={itemVariants}
          >
            {/* Header with icon */}
            <motion.div 
              className="flex items-center gap-3 mb-6"
              variants={itemVariants}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -5, 5, 0],
                  background: "linear-gradient(135deg, rgba(251, 146, 60, 0.3), rgba(239, 68, 68, 0.3))"
                }}
                transition={{ duration: 0.5 }}
              >
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Live Market
                </h2>
                <p className="text-muted-foreground">Real-time pricing and market data</p>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              Track sneaker prices across all major platforms in real-time. Get alerts for 
              price drops, monitor market trends, and make informed decisions with our 
              comprehensive market analytics.
            </motion.p>

            {/* Feature Cards */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              <motion.div 
                className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 backdrop-blur-sm"
                variants={cardVariants}
                whileHover="hover"
                data-testid="feature-live-prices"
              >
                <div className="flex items-center gap-2 mb-2">
                  <motion.div 
                    className="w-2 h-2 bg-green-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">Live Prices</span>
                </div>
                <p className="text-xs text-muted-foreground">Real-time updates from StockX, GOAT, and more</p>
              </motion.div>

              <motion.div 
                className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
                variants={cardVariants}
                whileHover="hover"
                data-testid="feature-price-alerts"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Price Alerts</span>
                </div>
                <p className="text-xs text-muted-foreground">Get notified when prices drop</p>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <Link href="/live-market">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-shadow" 
                    data-testid="button-explore-live-market"
                  >
                    Explore Live Market
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Live Market Visual */}
          <motion.div 
            ref={visualRef}
            style={{
              opacity: visualOpacity,
              y: visualTranslateY,
            }}
            variants={itemVariants}
          >
            <motion.div
              variants={cardVariants}
              whileHover="hover"
            >
              <Card className="p-6 sm:p-8 border-0 shadow-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm">
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {/* Price Rows */}
                  {[
                    { name: "Nike Air Jordan 1", price: "$420", color: "text-green-600", trend: "up" },
                    { name: "Yeezy Boost 350", price: "$280", color: "text-red-600", trend: "down" },
                    { name: "Nike Dunk Low", price: "$150", color: "text-blue-600", trend: "stable" }
                  ].map((item, index) => (
                    <motion.div 
                      key={item.name}
                      className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                      variants={priceRowVariants}
                      custom={index}
                      whileHover={{ 
                        scale: 1.02,
                        x: 5,
                        transition: { duration: 0.2 }
                      }}
                      data-testid={`price-row-${index}`}
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      <motion.span 
                        className={`font-bold ${item.color}`}
                        initial={{ scale: 1 }}
                        animate={{ 
                          scale: item.trend === "up" ? [1, 1.1, 1] : item.trend === "down" ? [1, 0.9, 1] : 1
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      >
                        {item.price}
                      </motion.span>
                    </motion.div>
                  ))}

                  {/* Last Updated */}
                  <motion.div 
                    className="text-center pt-4"
                    variants={itemVariants}
                  >
                    <motion.div 
                      className="inline-flex items-center gap-2 text-xs text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.5, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      Last updated: 2 minutes ago
                    </motion.div>
                  </motion.div>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LiveMarketSection;