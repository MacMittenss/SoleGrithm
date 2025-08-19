import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  MapPin, 
  Zap, 
  Eye, 
  Target, 
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'wouter';

export default function AdvancedSubHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftSectionRef = useRef<HTMLDivElement>(null);
  const rightSectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // VITURE-style entrance animations
  useEffect(() => {
    if (!containerRef.current || !isInView) return;

    const ctx = gsap.context(() => {
      // Staggered entrance animation
      gsap.fromTo(
        [leftSectionRef.current, rightSectionRef.current],
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out"
        }
      );

      // Floating animation for cards
      gsap.to(leftSectionRef.current, {
        y: -8,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      gsap.to(rightSectionRef.current, {
        y: 8,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <motion.div 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24 overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Section - AI Visual Search */}
          <motion.div
            ref={leftSectionRef}
            className="relative group"
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "5%"]) }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 p-8">
              <CardContent className="space-y-6">
                {/* Icon and Badge */}
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                    AI Powered
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 
                    className="text-3xl font-normal text-white leading-tight"
                    style={{ 
                      fontFamily: '"SF Pro Display", "Helvetica Neue", "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontWeight: 450,
                      letterSpacing: '0.02em'
                    }}
                  >
                    Visual Search Revolution
                  </h3>
                  <p 
                    className="text-white/80 text-lg leading-relaxed"
                    style={{ 
                      fontFamily: '"SF Pro Text", "Helvetica Neue", "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontWeight: 400,
                      letterSpacing: '0.01em'
                    }}
                  >
                    Upload any sneaker image and discover similar styles, find exact matches, or explore variations. Our AI understands every detail from colorways to silhouettes.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-cyan-400">99.2%</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-orange-400">50K+</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">Sneakers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-purple-400">&lt;0.3s</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">Response</div>
                  </div>
                </div>

                {/* CTA */}
                <Link href="/visual-search">
                  <Button 
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
                    style={{ fontWeight: 450 }}
                  >
                    Try Visual Search
                    <Search className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Section - Geographic Insights */}
          <motion.div
            ref={rightSectionRef}
            className="relative group"
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]) }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 p-8">
              <CardContent className="space-y-6">
                {/* Icon and Badge */}
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                  <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                    Live Data
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 
                    className="text-3xl font-normal text-white leading-tight"
                    style={{ 
                      fontFamily: '"SF Pro Display", "Helvetica Neue", "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontWeight: 450,
                      letterSpacing: '0.02em'
                    }}
                  >
                    Geographic Insights
                  </h3>
                  <p 
                    className="text-white/80 text-lg leading-relaxed"
                    style={{ 
                      fontFamily: '"SF Pro Text", "Helvetica Neue", "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                      fontWeight: 400,
                      letterSpacing: '0.01em'
                    }}
                  >
                    Explore real-time sneaker trends across major cities. Track price movements, discover regional preferences, and identify emerging hotspots in the sneaker market.
                  </p>
                </div>

                {/* Live Cities */}
                <div className="space-y-3">
                  <div className="text-sm text-white/60 uppercase tracking-wider mb-3">Trending Cities</div>
                  <div className="space-y-2">
                    {[
                      { city: "New York", trend: "+23%", color: "text-green-400" },
                      { city: "Los Angeles", trend: "+18%", color: "text-orange-400" },
                      { city: "Atlanta", trend: "+12%", color: "text-cyan-400" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-3 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse" />
                          <span className="text-white/90 font-medium">{item.city}</span>
                        </div>
                        <span className={`text-sm font-semibold ${item.color}`}>{item.trend}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link href="/discover">
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
                    style={{ fontWeight: 450 }}
                  >
                    Explore SoleRadar
                    <Target className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}