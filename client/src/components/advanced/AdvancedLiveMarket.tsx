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

  // GSAP animations following template patterns
  useEffect(() => {
    if (!sectionRef.current || !chartRef.current) return;

    const ctx = gsap.context(() => {
      // Template-style entrance animation
      const mainTitle = sectionRef.current?.querySelector('.main-title');
      const subTitle = sectionRef.current?.querySelector('.sub-title');
      const description = sectionRef.current?.querySelector('.description');
      const statsItems = sectionRef.current?.querySelectorAll('.stat-item');
      const marketItems = sectionRef.current?.querySelectorAll('.market-item');
      const ctaButton = sectionRef.current?.querySelector('.cta-button');

      // Main animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });

      // Staggered entrance following template patterns
      if (subTitle) {
        tl.from(subTitle, { 
          y: 30, 
          opacity: 0, 
          duration: 0.8, 
          ease: "expo.out" 
        });
      }
      
      if (mainTitle) {
        tl.from(mainTitle, { 
          y: 50, 
          opacity: 0, 
          duration: 1.2, 
          ease: "expo.out" 
        }, "-=0.6");
      }
      
      if (description) {
        tl.from(description, { 
          y: 30, 
          opacity: 0, 
          duration: 0.8, 
          ease: "expo.out" 
        }, "-=0.8");
      }
      
      if (statsItems && statsItems.length > 0) {
        tl.from(statsItems, { 
          y: 40, 
          opacity: 0, 
          duration: 0.8, 
          ease: "expo.out",
          stagger: 0.1 
        }, "-=0.4");
      }
      
      if (marketItems && marketItems.length > 0) {
        tl.from(marketItems, { 
          x: -30, 
          opacity: 0, 
          duration: 0.6, 
          ease: "expo.out",
          stagger: 0.08 
        }, "-=0.4");
      }
      
      if (ctaButton) {
        tl.from(ctaButton, { 
          y: 20, 
          opacity: 0, 
          duration: 0.8, 
          ease: "expo.out" 
        }, "-=0.2");
      }

      // Chart container animation
      gsap.from(".chart-container", {
        scrollTrigger: {
          trigger: ".chart-container",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.3
      });

      // Chart lines animate from left to right (template style)
      const lines = chartRef.current?.querySelectorAll('.chart-line');
      if (lines && lines.length > 0) {
        gsap.fromTo(lines, 
          { scaleX: 0, opacity: 0, transformOrigin: "left center" },
          { 
            scrollTrigger: {
              trigger: chartRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            scaleX: 1, 
            opacity: 0.8,
            duration: 1.5,
            ease: 'expo.out',
            stagger: 0.15,
            delay: 0.8
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
            opacity: 0.9,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.1,
            delay: 1.5
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{ 
        backgroundColor: '#000000',
        color: '#ffffff',
        minHeight: '100vh',
        padding: '8rem 0',
        position: 'relative'
      }}
      data-testid="section-live-market"
    >
      {/* Template-style container - Single Column Layout */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '4rem'
      }}>
        
        {/* Left Content Column - Rearranged Layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Header Section - Template Typography */}
          <div style={{ marginBottom: '1rem' }}>
            <div 
              className="sub-title"
              style={{ 
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#999999',
                marginBottom: '1rem',
                fontFamily: '"Work Sans", "Inter", "-apple-system", "BlinkMacSystemFont", sans-serif'
              }}
            >
              Live Market Intelligence
            </div>
            <h1 
              className="main-title"
              style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                fontFamily: '"Work Sans", "Inter", "-apple-system", "BlinkMacSystemFont", sans-serif'
              }}
            >
              Real-time Market
              <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                Analytics
              </span>
            </h1>
            <p 
              className="description"
              style={{ 
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#cccccc',
                maxWidth: '32rem',
                fontWeight: 300,
                fontFamily: '"Work Sans", "Inter", "-apple-system", "BlinkMacSystemFont", sans-serif'
              }}
            >
              Advanced pricing analytics and market intelligence powered by real-time data 
              from all major sneaker platforms worldwide.
            </p>
          </div>

          {/* CTA Button Moved Up - Template Style */}
          <div className="cta-button">
            <Link href="/live-market">
              <button
                style={{
                  padding: '1rem 2.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.025em',
                  alignSelf: 'flex-start',
                  fontFamily: '"Work Sans", "Inter", "-apple-system", "BlinkMacSystemFont", sans-serif'
                }}
                data-testid="button-explore-live-market"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Explore Live Market
                <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </button>
            </Link>
          </div>

          {/* Stats Grid - Rearranged with 2x2 Layout */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            marginBottom: '1rem'
          }}>
            {[
              { number: '50K+', label: 'Sneakers Tracked', icon: '📊' },
              { number: '15+', label: 'Data Sources', icon: '🔗' }, 
              { number: '99%', label: 'Accuracy Rate', icon: '✅' },
              { number: '24/7', label: 'Live Updates', icon: '🔄' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="stat-item"
                style={{ 
                  textAlign: 'left',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ 
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem'
                }}>
                  {stat.icon}
                </div>
                <div style={{ 
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: '#ffffff',
                  lineHeight: 1
                }}>
                  {stat.number}
                </div>
                <div style={{ 
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: '#999999',
                  letterSpacing: '0.025em'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Market Data - Rearranged as Horizontal Cards */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem'
          }}>
            {marketData.slice(0, 4).map((item, index) => (
              <div
                key={item.name}
                className="market-item"
                style={{ 
                  padding: '1.25rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ 
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {item.name}
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ 
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#ffffff'
                  }}>
                    {item.price}
                  </span>
                  <span style={{ 
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: item.trend === 'up' ? '#22c55e' : '#ef4444',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: item.trend === 'up' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                  }}>
                    {item.change}
                  </span>
                </div>
                <div style={{ 
                  fontSize: '0.75rem',
                  color: '#999999'
                }}>
                  {item.volume}
                </div>
              </div>
            ))}
          </div>

          {/* Chart Component - Moved Next to Other Elements */}
          <div
            className="chart-container"
            style={{ 
              position: 'relative',
              width: '100%',
              maxWidth: '600px',
              padding: '2rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              alignSelf: 'center'
            }}
          >
            {/* Chart Header - Template Style */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <BarChart3 style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                <h3 style={{ 
                  fontSize: '1rem',
                  fontWeight: 600,
                  margin: 0,
                  color: '#ffffff'
                }}>
                  Live Dashboard
                </h3>
              </div>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e'
                }}
              />
            </div>

            {/* Chart Visualization - Template Style */}
            <div ref={chartRef} style={{ position: 'relative', height: '8rem', marginBottom: '1.5rem' }}>
              <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 300 120">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
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
                <circle className="chart-point" cx="20" cy="80" r="3" fill="#ffffff" opacity="0.9" />
                <circle className="chart-point" cx="80" cy="40" r="3" fill="#ffffff" opacity="0.9" />
                <circle className="chart-point" cx="140" cy="60" r="3" fill="#ffffff" opacity="0.9" />
                <circle className="chart-point" cx="200" cy="45" r="3" fill="#ffffff" opacity="0.9" />
                <circle className="chart-point" cx="280" cy="30" r="3" fill="#ffffff" opacity="0.9" />
              </svg>
            </div>

            {/* Live Status - Template Style */}
            <div style={{ 
              textAlign: 'center', 
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: '#999999'
              }}>
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#22c55e'
                  }}
                />
                Real-time updates • Last sync: 30s ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}