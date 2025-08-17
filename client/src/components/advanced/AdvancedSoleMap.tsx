import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { MapPin, TrendingUp, Users, Zap } from 'lucide-react';
import SplitText from './SplitText';
import GradientText from './GradientText';

interface CityData {
  name: string;
  coordinate: [number, number];
  trend: string;
  sales: string;
  popular: string;
}

export default function AdvancedSoleMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [cityData] = useState<CityData[]>([
    {
      name: "New York",
      coordinate: [25, 30],
      trend: "+24%",
      sales: "8.2K",
      popular: "Jordan 1"
    },
    {
      name: "Los Angeles", 
      coordinate: [15, 60],
      trend: "+18%",
      sales: "6.7K",
      popular: "Yeezy 350"
    },
    {
      name: "Chicago",
      coordinate: [35, 45],
      trend: "+31%",
      sales: "5.1K", 
      popular: "Air Force 1"
    },
    {
      name: "Miami",
      coordinate: [45, 75],
      trend: "+15%",
      sales: "4.3K",
      popular: "Dunk Low"
    },
    {
      name: "Atlanta",
      coordinate: [40, 65],
      trend: "+22%",
      sales: "3.8K",
      popular: "Travis Scott"
    }
  ]);

  // Animate map points when in view
  useEffect(() => {
    if (!mapRef.current || !isInView) return;

    const ctx = gsap.context(() => {
      const points = mapRef.current?.querySelectorAll('.map-point');
      const pulses = mapRef.current?.querySelectorAll('.map-pulse');
      
      if (points && points.length > 0) {
        gsap.fromTo(points,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.2,
            delay: 0.5
          }
        );
      }

      if (pulses && pulses.length > 0) {
        gsap.to(pulses, {
          scale: 2,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: 'power2.out',
          stagger: 0.3
        });
      }
    }, mapRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <motion.section
      ref={containerRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.98), rgba(10, 10, 30, 0.95))',
        y,
        opacity,
      }}
      data-testid="section-sole-map"
    >
      {/* Background effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 70%, rgba(88, 29, 255, 0.08) 0%, rgba(254, 122, 96, 0.04) 35%, rgba(255, 41, 0, 0.06) 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Map Column */}
          <motion.div
            ref={mapRef}
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Map container with glassmorphism */}
            <div
              className="relative aspect-square rounded-3xl p-8 backdrop-blur-xl border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
              }}
            >
              {/* Simplified US map outline */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full opacity-20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              >
                <path d="M 20 20 Q 50 15 80 25 L 85 40 Q 80 60 75 75 L 45 80 Q 25 75 15 60 L 20 20 Z" />
                <path d="M 15 75 Q 20 85 35 82 L 40 90 Q 25 95 15 85 Z" />
                <path d="M 75 15 Q 85 12 90 20 L 88 25 Q 82 22 75 15 Z" />
              </svg>

              {/* Animated city points */}
              {cityData.map((city, index) => (
                <motion.div
                  key={city.name}
                  className="absolute"
                  style={{
                    left: `${city.coordinate[1]}%`,
                    top: `${city.coordinate[0]}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  {/* Pulsing background */}
                  <motion.div
                    className="map-pulse absolute inset-0 w-4 h-4 rounded-full"
                    style={{
                      background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                      opacity: 0.6,
                    }}
                  />
                  
                  {/* Main point */}
                  <motion.div
                    className="map-point relative w-4 h-4 rounded-full cursor-pointer"
                    style={{
                      background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                    }}
                    whileHover={{ 
                      scale: 1.5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Tooltip on hover */}
                    <motion.div
                      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none opacity-0 hover:opacity-100 transition-opacity"
                      style={{
                        background: 'rgba(0, 0, 0, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="text-white font-semibold">{city.name}</div>
                      <div className="text-green-400">{city.trend} • {city.sales} sales</div>
                      <div className="text-gray-300">Popular: {city.popular}</div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Connecting lines animation */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff2900" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#fe7a60" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#581dff" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                
                {cityData.slice(0, -1).map((city, index) => (
                  <motion.line
                    key={`line-${index}`}
                    x1={`${city.coordinate[1]}%`}
                    y1={`${city.coordinate[0]}%`}
                    x2={`${cityData[index + 1].coordinate[1]}%`}
                    y2={`${cityData[index + 1].coordinate[0]}%`}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.5, delay: 1.5 + index * 0.3 }}
                  />
                ))}
              </svg>
            </div>

            {/* Stats cards below map */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              {[
                { icon: Users, value: '2.3M', label: 'Community Members' },
                { icon: TrendingUp, value: '127%', label: 'Growth Rate' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="p-4 rounded-2xl backdrop-blur-sm border border-white/10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon className="w-5 h-5 text-orange-500" />
                    <span
                      className="text-xl font-bold"
                      style={{
                        background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            className="space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(88, 29, 255, 0.1)',
                border: '1px solid rgba(88, 29, 255, 0.2)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <MapPin className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">GEOGRAPHIC INSIGHTS</span>
            </motion.div>

            {/* Main Title */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <SplitText type="words" delay={0.3} staggerDelay={0.08}>
                  Sneaker Culture
                </SplitText>
                <br />
                <GradientText className="block">
                  Worldwide
                </GradientText>
              </h2>
              
              <motion.p
                className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Explore real-time sneaker trends across major cities. See what's hot, 
                what's not, and discover emerging markets in the global sneaker ecosystem.
              </motion.p>
            </div>

            {/* Feature list */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { icon: TrendingUp, title: 'Real-time Trends', desc: 'Live data from major sneaker hubs' },
                { icon: Zap, title: 'Market Intelligence', desc: 'AI-powered regional insights' },
                { icon: Users, title: 'Community Heatmaps', desc: 'See where sneakerheads gather' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mt-1"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 41, 0, 0.1), rgba(88, 29, 255, 0.1))',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <feature.icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{feature.title}</h4>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}