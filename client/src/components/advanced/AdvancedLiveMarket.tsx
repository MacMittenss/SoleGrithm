import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

gsap.registerPlugin(ScrollTrigger);

interface MarketData {
  name: string;
  price: string;
  change: string;
  trend: 'up' | 'down';
  volume: string;
}

export default function AdvancedLiveMarket() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  
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

  // GSAP animations
  useEffect(() => {
    if (!sectionRef.current || !chartRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      let headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });

      headerTl
        .from(".live-market-badge", { opacity: 0, y: 20, duration: 0.4, ease: "expo.out" })
        .from(".live-market-title", { opacity: 0, y: 30, duration: 0.4, ease: "expo.out" }, "-=0.2")
        .from(".live-market-description", { opacity: 0, y: 20, duration: 0.4, ease: "expo.out" }, "-=0.2")
        .from(".live-market-stats", { opacity: 0, y: 20, duration: 0.4, ease: "expo.out", stagger: 0.1 }, "-=0.2")
        .from(".live-market-cta", { opacity: 0, y: 20, duration: 0.4, ease: "expo.out" }, "-=0.2");

      // Chart container animation
      gsap.from(".chart-container", {
        scrollTrigger: {
          trigger: ".chart-container",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "back.out(1.2)"
      });

      // Chart lines animate from left to right
      const lines = chartRef.current?.querySelectorAll('.chart-line');
      if (lines && lines.length > 0) {
        gsap.fromTo(lines, 
          { scaleX: 0, opacity: 0 },
          { 
            scrollTrigger: {
              trigger: chartRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            scaleX: 1, 
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            stagger: 0.2,
            delay: 0.3
          }
        );
      }

      // Chart points appear after lines
      const points = chartRef.current?.querySelectorAll('.chart-point');
      if (points && points.length > 0) {
        gsap.fromTo(points,
          { scale: 0, opacity: 0 },
          {
            scrollTrigger: {
              trigger: chartRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.1,
            delay: 1.2
          }
        );
      }

      // Market data cards animate from left to right
      gsap.from(".market-item", {
        scrollTrigger: {
          trigger: ".market-data-list",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.1,
        delay: 0.5
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section"
      style={{ backgroundColor: '#050505', color: 'whitesmoke', minHeight: '100vh' }}
      data-testid="section-live-market"
    >
      <div className="w-layout-blockcontainer container w-container">
        <div style={{ minHeight: '11.11vw' }}></div>
        
        {/* Header Section */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          width: '100%',
          marginBottom: '2.2vw'
        }}>
          <h5 
            className="live-market-badge"
            style={{ 
              color: 'whitesmoke',
              letterSpacing: '.14vw',
              textTransform: 'uppercase',
              marginTop: 0,
              marginBottom: 0,
              fontSize: '.89vw',
              fontWeight: 400,
              lineHeight: '1.44vw'
            }}
          >
            LIVE MARKET DATA
          </h5>
          <h2 
            className="live-market-title"
            style={{ 
              color: 'whitesmoke',
              letterSpacing: '-.07vw',
              textTransform: 'capitalize',
              marginTop: 0,
              marginBottom: 0,
              fontSize: '4.44vw',
              fontWeight: 500,
              lineHeight: '5vw'
            }}
          >
            Real-time Market Intelligence
          </h2>
        </div>

        {/* Description */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          width: '60%',
          marginBottom: '4.4vw'
        }}>
          <p 
            className="live-market-description"
            style={{ 
              color: 'whitesmoke',
              letterSpacing: '.07vw',
              marginBottom: 0,
              fontSize: '1.11vw',
              fontWeight: 300,
              lineHeight: '1.89vw',
              maxWidth: '50vw'
            }}
          >
            Advanced pricing analytics and market intelligence powered by real-time data 
            from all major sneaker platforms worldwide.
          </p>
        </div>

        {/* Two Column Layout */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'start',
          width: '100%'
        }}>
          
          {/* Left Column - Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {/* Stats Grid */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '2rem'
            }}>
              {[
                { number: '50K+', label: 'Sneakers Tracked' },
                { number: '15+', label: 'Data Sources' }, 
                { number: '99%', label: 'Accuracy Rate' }
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="live-market-stats"
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ 
                    fontSize: '2.2vw',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                    lineHeight: '1.2',
                    color: 'whitesmoke'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{ 
                    fontSize: '0.89vw',
                    fontWeight: 300,
                    color: '#a0a0a0',
                    letterSpacing: '.07vw'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Market Data List */}
            <div className="market-data-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {marketData.slice(0, 3).map((item, index) => (
                <div
                  key={item.name}
                  className="market-item"
                  style={{ 
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ 
                      fontSize: '0.89vw',
                      fontWeight: 500,
                      color: 'whitesmoke'
                    }}>
                      {item.name}
                    </span>
                    <span style={{ 
                      fontSize: '1.11vw',
                      fontWeight: 600,
                      color: 'whitesmoke'
                    }}>
                      {item.price}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ 
                      fontSize: '0.78vw',
                      color: '#a0a0a0'
                    }}>
                      {item.volume}
                    </span>
                    <span style={{ 
                      fontSize: '0.78vw',
                      fontWeight: 500,
                      color: item.trend === 'up' ? '#10b981' : '#ef4444'
                    }}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="live-market-cta">
              <Link href="/live-market">
                <button
                  style={{
                    padding: '1rem 2.5rem',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#050505',
                    backgroundColor: 'whitesmoke',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                  data-testid="button-explore-live-market"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(245, 245, 245, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Explore Live Market
                  <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column - Chart Component (Bottom Right positioned) */}
          <div style={{ 
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            height: '100%',
            minHeight: '400px'
          }}>
            <div
              className="chart-container"
              style={{ 
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                padding: '2rem',
                borderRadius: '1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)'
              }}
            >
              {/* Chart Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <BarChart3 style={{ width: '1.5rem', height: '1.5rem', color: 'whitesmoke' }} />
                  <h3 style={{ 
                    fontSize: '1.11vw',
                    fontWeight: 600,
                    margin: 0,
                    color: 'whitesmoke'
                  }}>
                    Live Dashboard
                  </h3>
                </div>
                <div
                  style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '50%',
                    backgroundColor: '#10b981'
                  }}
                />
              </div>

              {/* Chart Visualization */}
              <div ref={chartRef} style={{ position: 'relative', height: '8rem', marginBottom: '1.5rem' }}>
                <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 300 120">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="whitesmoke" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="whitesmoke" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="whitesmoke" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <path
                    className="chart-line"
                    d="M 20 80 Q 80 40 140 60 T 280 30"
                    fill="none"
                    stroke="url(#chartGradient)"
                    strokeWidth="2"
                    style={{ transformOrigin: 'left center', opacity: 0.8 }}
                  />
                  <circle className="chart-point" cx="20" cy="80" r="3" fill="whitesmoke" opacity="0.8" />
                  <circle className="chart-point" cx="80" cy="40" r="3" fill="whitesmoke" opacity="0.8" />
                  <circle className="chart-point" cx="140" cy="60" r="3" fill="whitesmoke" opacity="0.8" />
                  <circle className="chart-point" cx="200" cy="45" r="3" fill="whitesmoke" opacity="0.8" />
                  <circle className="chart-point" cx="280" cy="30" r="3" fill="whitesmoke" opacity="0.8" />
                </svg>
              </div>

              {/* Live Status */}
              <div style={{ 
                textAlign: 'center', 
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  fontSize: '0.78vw',
                  color: '#a0a0a0'
                }}>
                  <div
                    style={{
                      width: '0.4rem',
                      height: '0.4rem',
                      borderRadius: '50%',
                      backgroundColor: '#10b981'
                    }}
                  />
                  Real-time updates • Last sync: 30s ago
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ minHeight: '7.8vw' }}></div>
      </div>
    </section>
  );
}