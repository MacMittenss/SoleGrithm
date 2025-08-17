import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { TrendingUp, Zap, ArrowRight, BarChart3 } from 'lucide-react';
import { Link } from 'wouter';
import SplitText from './SplitText';
import GradientText from './GradientText';

interface MarketData {
  name: string;
  price: string;
  change: string;
  trend: 'up' | 'down';
  volume: string;
  image?: string;
}

export default function AdvancedLiveMarket() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  // Parallax and scroll effects
  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);

  const [marketData] = useState<MarketData[]>([
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
      change: "+5.7%",
      trend: "up",
      volume: "3.2K sales"
    },
    {
      name: "Travis Scott x Fragment",
      price: "$1,250",
      change: "+24.1%",
      trend: "up",
      volume: "892 sales"
    }
  ]);

  // Animated chart lines
  useEffect(() => {
    if (!chartRef.current || !isInView) return;

    const ctx = gsap.context(() => {
      // Animate chart lines
      const lines = chartRef.current?.querySelectorAll('.chart-line');
      if (lines) {
        gsap.fromTo(lines, 
          { scaleX: 0, opacity: 0 },
          { 
            scaleX: 1, 
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            stagger: 0.2,
            delay: 0.5
          }
        );
      }

      // Animate chart points
      const points = chartRef.current?.querySelectorAll('.chart-point');
      if (points) {
        gsap.fromTo(points,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.1,
            delay: 1
          }
        );
      }
    }, chartRef);

    return () => ctx.revert();
  }, [isInView]);

  // Number counter animation
  useEffect(() => {
    if (!numbersRef.current || !isInView) return;

    const ctx = gsap.context(() => {
      const numbers = numbersRef.current?.querySelectorAll('[data-number]');
      if (numbers) {
        numbers.forEach((number) => {
          const target = parseInt(number.getAttribute('data-number') || '0');
          const counter = { value: 0 };
          
          gsap.to(counter, {
            value: target,
            duration: 2,
            ease: 'power3.out',
            onUpdate: () => {
              number.textContent = Math.round(counter.value).toLocaleString();
            },
            delay: 0.5
          });
        });
      }
    }, numbersRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <motion.section
      ref={containerRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(30, 30, 30, 0.95))',
        y,
        opacity,
      }}
      data-testid="section-live-market"
    >
      {/* Background gradient effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(255, 41, 0, 0.08) 0%, rgba(254, 122, 96, 0.04) 35%, rgba(88, 29, 255, 0.08) 100%)',
          scale,
        }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 rounded-full border border-orange-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 rotate-45 border border-purple-500/20"
        animate={{ rotate: [45, 135, 45] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(255, 41, 0, 0.1)',
                border: '1px solid rgba(255, 41, 0, 0.2)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{
                  background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium">LIVE MARKET DATA</span>
            </motion.div>

            {/* Main Title */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <SplitText type="words" delay={0.3} staggerDelay={0.08}>
                  Real-time Market
                </SplitText>
                <br />
                <GradientText className="block">
                  Intelligence
                </GradientText>
              </h2>
              
              <motion.p
                className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Advanced pricing analytics and market intelligence powered by real-time data 
                from all major sneaker platforms worldwide.
              </motion.p>
            </div>

            {/* Stats Grid */}
            <motion.div
              ref={numbersRef}
              className="grid grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { number: 50000, label: 'Sneakers Tracked', suffix: '+' },
                { number: 15, label: 'Data Sources', suffix: '+' },
                { number: 99, label: 'Accuracy Rate', suffix: '%' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold mb-2">
                    <span
                      data-number={stat.number}
                      style={{
                        background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      0
                    </span>
                    <span
                      style={{
                        background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Link href="/live-market">
                <motion.button
                  className="group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden"
                  style={{
                    background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="button-explore-live-market"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Live Market
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive Chart/Dashboard Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Glassmorphism container */}
            <div
              className="relative p-8 rounded-3xl backdrop-blur-xl border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-orange-500" />
                  <h3 className="text-xl font-semibold">Live Dashboard</h3>
                </div>
                <motion.div
                  className="w-3 h-3 rounded-full bg-green-500"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Market data list */}
              <div className="space-y-4 mb-6">
                {marketData.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm truncate">{item.name}</span>
                      <motion.span
                        className="text-lg font-bold"
                        style={{
                          background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }}
                        animate={
                          item.trend === 'up'
                            ? { scale: [1, 1.05, 1] }
                            : { scale: [1, 0.95, 1] }
                        }
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        {item.price}
                      </motion.span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">{item.volume}</span>
                      <span
                        className={`font-medium ${
                          item.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {item.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chart visualization */}
              <div ref={chartRef} className="relative h-32 mb-4">
                {/* Simple animated chart lines */}
                <svg className="w-full h-full" viewBox="0 0 300 120">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff2900" />
                      <stop offset="61%" stopColor="#fe7a60" />
                      <stop offset="100%" stopColor="#581dff" />
                    </linearGradient>
                  </defs>
                  <path
                    className="chart-line"
                    d="M 20 80 Q 80 40 140 60 T 280 30"
                    fill="none"
                    stroke="url(#chartGradient)"
                    strokeWidth="2"
                    style={{ transformOrigin: 'left center' }}
                  />
                  <circle className="chart-point" cx="20" cy="80" r="3" fill="#ff2900" />
                  <circle className="chart-point" cx="80" cy="40" r="3" fill="#fe7a60" />
                  <circle className="chart-point" cx="140" cy="60" r="3" fill="#fe7a60" />
                  <circle className="chart-point" cx="200" cy="45" r="3" fill="#581dff" />
                  <circle className="chart-point" cx="280" cy="30" r="3" fill="#581dff" />
                </svg>
              </div>

              {/* Live status */}
              <div className="text-center pt-4 border-t border-white/10">
                <div className="inline-flex items-center gap-2 text-xs text-gray-400">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: 'linear-gradient(to right, #ff2900 0%, #fe7a60 61%, #581dff 100%)',
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Real-time updates • Last sync: 30s ago
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}