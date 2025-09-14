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
      className="section background-black"
      style={{ y, opacity }}
      data-testid="section-collections"
    >
      <div className="w-layout-blockcontainer container padding-4-5rem w-container">
        <div className="space-7rem"></div>
        {/* Header - Template Layout */}
        <div className="utilities-wrapper-title" style={{ 
          width: '100%',
          textAlign: 'center',
          alignItems: 'center',
          marginBottom: '2.2vw'
        }}>
          <h5 className="heading">
            AI-POWERED COLLECTIONS
          </h5>
          <h2 style={{ 
            color: 'var(--white)',
            letterSpacing: '-.07vw',
            textTransform: 'capitalize',
            marginTop: 0,
            marginBottom: 0,
            fontSize: '4.44vw',
            fontWeight: 500,
            lineHeight: '5vw'
          }}>
            Curated Collections
          </h2>
        </div>

        {/* Description */}
        <div className="utilities-wrapper-paragraph" style={{ 
          width: '100%',
          textAlign: 'center',
          alignItems: 'center',
          marginBottom: '3vw'
        }}>
          <p style={{ 
            color: 'var(--white)',
            letterSpacing: '.07vw',
            marginBottom: 0,
            fontSize: '1.11vw',
            fontWeight: 300,
            lineHeight: '1.89vw',
            maxWidth: '42.22vw',
            margin: '0 auto'
          }}>
            Discover handpicked collections by AI algorithms and passionate sneaker enthusiasts. 
            From grail hunting to daily wear, find your perfect curated selection.
          </p>
        </div>

        {/* Collections Grid */}
        <motion.div
          ref={gridRef}
          className="utilities-grid-thirds"
          style={{ 
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: '2rem',
            marginBottom: '4.4vw'
          }}
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
              {/* Card container - Black & White Template Style */}
              <div
                className="relative rounded-2xl p-6 border border-white/20 overflow-hidden transition-all duration-300 group-hover:border-white/40"
                style={{
                  backgroundColor: 'var(--secondary)',
                  height: '22vw',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Top section */}
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white text-black"
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
                    <h3 style={{ 
                      color: 'var(--white)',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      lineHeight: '1.4'
                    }}>
                      {collection.title}
                    </h3>
                    <p style={{ 
                      color: '#a0a0a0',
                      fontSize: '0.95rem',
                      fontWeight: 300,
                      marginBottom: '1rem',
                      lineHeight: '1.6'
                    }}>
                      {collection.description}
                    </p>
                    
                    <div className="mb-4">
                      <div style={{ 
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        marginBottom: '0.25rem',
                        color: 'var(--white)'
                      }}>
                        {collection.sneakerCount}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem',
                        color: '#a0a0a0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05rem'
                      }}>
                        Sneakers
                      </div>
                    </div>
                  </div>

                  {/* Bottom section */}
                  <div className="flex justify-between items-center">
                    <div style={{ 
                      fontSize: '0.75rem',
                      color: '#a0a0a0'
                    }}>
                      by {collection.creator}
                    </div>
                    <motion.div
                      className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 5 }}
                    >
                      <span style={{ 
                        fontSize: '0.875rem',
                        color: 'var(--white)'
                      }}>View</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action - Visible Template Button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          width: '100%',
          marginTop: '4vw'
        }}>
          <button
            className="button-with-circle-icon"
            style={{
              cursor: 'pointer',
              backgroundColor: 'transparent'
            }}
            data-testid="button-explore-collections"
          >
            <div className="button-text" style={{ color: 'var(--white)' }}>Explore All Collections</div>
            <div className="button-arrow-wrapper">
              <ArrowRight className="arrow" />
            </div>
          </button>
        </div>
        <div className="space-7rem"></div>
      </div>
    </motion.section>
  );
}