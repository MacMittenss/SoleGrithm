import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Bookmark, Heart, Share, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SplitText from './SplitText';
import GradientText from './GradientText';

interface Collection {
  id: number;
  title: string;
  description: string;
  sneakerCount: number;
  image: string;
  gradient: string;
  creator: string;
}

export default function AdvancedCollections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const y = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [collections] = useState<Collection[]>([
    {
      id: 1,
      title: "Grail Collection",
      description: "Ultra-rare and highly coveted sneakers",
      sneakerCount: 24,
      image: "👑",
      gradient: "linear-gradient(135deg, #ff2900 0%, #fe7a60 61%, #581dff 100%)",
      creator: "SneakerKing"
    },
    {
      id: 2,
      title: "Daily Drivers",
      description: "Comfort meets style for everyday wear",
      sneakerCount: 18,
      image: "⚡",
      gradient: "linear-gradient(135deg, #581dff 0%, #8054ff 61%, #ff3812 100%)",
      creator: "ComfortFirst"
    },
    {
      id: 3,
      title: "Retro Vibes",
      description: "Classic silhouettes that never go out of style",
      sneakerCount: 32,
      image: "🎯",
      gradient: "linear-gradient(135deg, #ff3812 0%, #cd426d 61%, #311e6f 100%)",
      creator: "VintageCollector"
    },
    {
      id: 4,
      title: "Future Tech",
      description: "Innovation in design and technology",
      sneakerCount: 15,
      image: "🚀",
      gradient: "linear-gradient(135deg, #311e6f 0%, #cd426d 61%, #ff3812 100%)",
      creator: "TechAdvocate"
    }
  ]);

  // Stagger animation for collection cards
  useEffect(() => {
    if (!gridRef.current || !isInView) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.collection-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { 
            y: 100, 
            opacity: 0, 
            scale: 0.8, 
            rotateX: -30 
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.2,
            delay: 0.5
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <motion.section
      ref={containerRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(50, 50, 50, 0.98), rgba(20, 30, 50, 0.95))',
        y,
        opacity,
      }}
      data-testid="section-collections"
    >
      {/* Background effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(255, 41, 0, 0.06) 0%, rgba(88, 29, 255, 0.04) 35%, rgba(254, 122, 96, 0.06) 100%)',
        }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 border border-orange-500/30"
        animate={{ 
          rotate: [0, 180, 360], 
          scale: [1, 1.1, 1] 
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-16 h-16 rounded-full border border-purple-500/30"
        animate={{ 
          y: [0, -20, 0], 
          opacity: [0.3, 0.7, 0.3] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(255, 41, 0, 0.1)',
              border: '1px solid rgba(255, 41, 0, 0.2)',
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Bookmark className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">AI-POWERED COLLECTIONS</span>
          </motion.div>

          {/* Main Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <SplitText type="words" delay={0.3} staggerDelay={0.08}>
              Curated Collections
            </SplitText>
            <br />
            <GradientText className="block">
              by AI & Community
            </GradientText>
          </h2>
          
          <motion.p
            className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Discover handpicked collections by AI algorithms and passionate sneaker enthusiasts. 
            From grail hunting to daily wear, find your perfect curated selection.
          </motion.p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="collection-card relative group cursor-pointer"
              style={{ perspective: 1000 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
            >
              {/* Card container */}
              <div
                className="relative h-80 rounded-3xl p-6 backdrop-blur-xl border border-white/10 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                }}
              >
                {/* Gradient overlay */}
                <motion.div
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                  style={{ background: collection.gradient }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Top section */}
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{
                        background: collection.gradient,
                      }}
                    >
                      {collection.image}
                    </div>
                    <motion.button
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className="w-5 h-5 text-white/70" />
                    </motion.button>
                  </div>

                  {/* Main content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {collection.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="text-2xl font-bold mb-1">
                        <span
                          style={{
                            background: collection.gradient,
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                          }}
                        >
                          {collection.sneakerCount}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">
                        Sneakers
                      </div>
                    </div>
                  </div>

                  {/* Bottom section */}
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                      by {collection.creator}
                    </div>
                    <motion.div
                      className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm text-white">View</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${collection.gradient.replace('linear-gradient(135deg,', '').replace(')', '')}, transparent 70%)`,
                    opacity: 0,
                  }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Button
            className="group relative px-8 py-4 text-lg font-semibold text-white overflow-hidden"
            style={{
              background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
            }}
            data-testid="button-explore-collections"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Explore All Collections
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}