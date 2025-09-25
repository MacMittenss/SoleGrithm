import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { TrendingUp, ArrowRight, Zap } from 'lucide-react';
import MarqueeText from '@/components/advanced/MarqueeText';

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
      className="relative py-20 sm:py-32 overflow-hidden"
      style={{
        opacity,
        scale,
        y: translateY,
        background: "linear-gradient(135deg, rgba(0, 0, 0, 0.02), rgba(255, 255, 255, 0.05))"
      }}
      data-testid="section-live-market"
    >
      {/* Background gradient effects from uploaded file */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 41, 0, 0.1) 0%, rgba(254, 122, 96, 0.05) 35%, rgba(88, 29, 255, 0.1) 100%)",
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }}
      />
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-10"
        style={{
          background: "linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)",
          filter: "blur(60px)"
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full opacity-10"
        style={{
          background: "linear-gradient(to right, #581dff 0%, #fe7a60 61%, #ff2900 100%)",
          filter: "blur(40px)"
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
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
            {/* Moving Market Insights Header */}
            <div className="mb-8 sm:mb-12">
              <MarqueeText
                text="Market Insights"
                className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-none mb-4 bg-gradient-to-r from-[#ff2900] via-[#fe7a60] to-[#581dff] bg-clip-text text-transparent uppercase"
                speed={0.7}
                direction="left"
              />
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mt-4">
                Advanced pricing analytics and market intelligence powered by real-time data 
                from all major sneaker platforms worldwide.
              </p>
            </div>

            {/* Description */}
            <motion.p 
              className="text-lg text-muted-foreground leading-relaxed"
              variants={itemVariants}
            >
              Track sneaker prices across all major platforms in real-time. Get alerts for 
              price drops, monitor market trends, and make informed decisions with our 
              comprehensive market analytics.
            </motion.p>

            {/* Feature Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 sm:gap-8 mb-8"
              variants={containerVariants}
            >
              <motion.div 
                className="text-center"
                variants={cardVariants}
                whileHover="hover"
                data-testid="stat-platforms"
              >
                <motion.div 
                  className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{
                    background: "linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  15+
                </motion.div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Platforms</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                variants={cardVariants}
                whileHover="hover"
                data-testid="stat-updates"
              >
                <motion.div 
                  className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{
                    background: "linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  24/7
                </motion.div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Live Updates</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                variants={cardVariants}
                whileHover="hover"
                data-testid="stat-accuracy"
              >
                <motion.div 
                  className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{
                    background: "linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  99%
                </motion.div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Accuracy</p>
              </motion.div>
            </motion.div>

            {/* CTA Button with gradient styling */}
            <motion.div variants={itemVariants}>
              <Link href="/live-market">
                <motion.button
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)",
                    border: "none"
                  }}
                  whileHover={{ 
                    boxShadow: "0 20px 40px rgba(255, 41, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="button-explore-live-market"
                >
                  <span className="mr-2">Explore Live Market</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Live Market Visual - Modern Dashboard */}
          <motion.div 
            ref={visualRef}
            style={{
              opacity: visualOpacity,
              y: visualTranslateY,
            }}
            variants={itemVariants}
            className="relative"
          >
            {/* Background blur effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 rounded-3xl backdrop-blur-3xl border border-white/10"
              variants={cardVariants}
              whileHover="hover"
            />
            
            {/* Main content */}
            <motion.div
              className="relative p-8 sm:p-12 rounded-3xl"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Header */}
              <motion.div 
                className="mb-8 text-center"
                variants={itemVariants}
              >
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  style={{
                    background: "linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)",
                    opacity: 0.1
                  }}
                >
                  <motion.div 
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: "linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)"
                    }}
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
                  <span className="text-xs font-medium">LIVE DATA</span>
                </motion.div>
                <h3 className="text-xl font-semibold">Market Dashboard</h3>
              </motion.div>

              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {/* Price Grid */}
                <motion.div className="grid grid-cols-1 gap-4">
                  {[
                    { 
                      name: "Air Jordan 1 Retro High", 
                      price: "$420", 
                      change: "+12.5%", 
                      trend: "up",
                      volume: "2.1K sales"
                    },
                    { 
                      name: "Yeezy Boost 350 V2", 
                      price: "$280", 
                      change: "-8.2%", 
                      trend: "down",
                      volume: "1.8K sales"
                    },
                    { 
                      name: "Nike Dunk Low Panda", 
                      price: "$150", 
                      change: "+2.1%", 
                      trend: "up",
                      volume: "3.2K sales"
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={item.name}
                      className="p-4 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all group"
                      style={{
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))"
                      }}
                      variants={priceRowVariants}
                      custom={index}
                      whileHover={{ 
                        scale: 1.02,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                      data-testid={`price-row-${index}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground truncate">{item.name}</span>
                        <motion.span 
                          className="text-lg font-bold"
                          style={{
                            background: "linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent"
                          }}
                          initial={{ scale: 1 }}
                          animate={{ 
                            scale: item.trend === "up" ? [1, 1.05, 1] : [1, 0.95, 1]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                        >
                          {item.price}
                        </motion.span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{item.volume}</span>
                        <span className={`font-medium ${
                          item.trend === "up" ? "text-green-500" : "text-red-500"
                        }`}>
                          {item.change}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Live Status */}
                <motion.div 
                  className="text-center pt-4 border-t border-white/10"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="inline-flex items-center gap-2 text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.div 
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: "linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)"
                      }}
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
                    Real-time updates • Last sync: 30s ago
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LiveMarketSection;