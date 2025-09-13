import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, TrendingUp, Users, Zap } from 'lucide-react';

interface CityData {
  name: string;
  coordinate: [number, number];
  trend: string;
  sales: string;
  popular: string;
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function AdvancedSoleMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

  // Template-inspired GSAP animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation on scroll trigger
      let headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      });
      
      // Animate elements sequentially like in templates
      headerTl
        .from(".geo-badge", {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "expo.out"
        })
        .from(".geo-title", {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "expo.out"
        }, "-=0.2")
        .from(".geo-description", {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "expo.out"
        }, "-=0.3")
        .from(".map-container", {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "expo.out"
        }, "-=0.4")
        .from(".map-point", {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: "back.out(1.2)",
          stagger: 0.1
        }, "-=0.2")
        .from(".stats-item", {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "expo.out",
          stagger: 0.05
        }, "-=0.3")
        // Feature items will be visible immediately
        // .from(".feature-item", {
        //   opacity: 0,
        //   y: 30,
        //   duration: 0.5,
        //   ease: "expo.out",
        //   stagger: 0.1
        // }, "-=0.2")
        .from(".map-line", {
          opacity: 0,
          strokeDashoffset: "100%",
          duration: 1,
          ease: "power2.out",
          stagger: 0.2
        }, "-=0.8");
      
      // Continuous pulse animation for map points
      gsap.to(".map-pulse", {
        scale: 2,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: 'power2.out',
        stagger: 0.3
      });
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
      data-testid="section-sole-map"
    >
      {/* Template-style container */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 2rem'
      }}>
        
        {/* Header Section - Template Style */}
        <div style={{ 
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <div 
            className="geo-badge"
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#999999',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50px',
              marginBottom: '1.5rem',
              fontFamily: '"Work Sans", "Inter", "-apple-system", "BlinkMacSystemFont", sans-serif'
            }}
          >
            <MapPin style={{ width: '0.875rem', height: '0.875rem' }} />
            Geographic Insights
          </div>
          
          <h2 
            className="geo-title"
            style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              fontFamily: '"Work Sans", "Inter", "-apple-system", "BlinkMacSystemFont", sans-serif'
            }}
          >
            Sneaker Culture
            <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              Worldwide
            </span>
          </h2>
          
          <p 
            className="geo-description"
            style={{ 
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: '#cccccc',
              maxWidth: '600px',
              margin: '0 auto',
              fontWeight: 300,
              fontFamily: '"Work Sans", "Inter", "-apple-system", "BlinkMacSystemFont", sans-serif'
            }}
          >
            Explore real-time sneaker trends across major cities and discover 
            emerging markets in the global sneaker ecosystem.
          </p>
        </div>

        {/* Map Section */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          
          {/* Interactive Map */}
          <div
            ref={mapRef}
            className="map-container"
            style={{
              position: 'relative',
              aspectRatio: '4/3',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.02)'
            }}
          >
            {/* Simplified US map outline */}
            <svg 
              viewBox="0 0 100 100" 
              style={{ 
                width: '100%', 
                height: '100%', 
                opacity: 0.15
              }}
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5"
            >
              <path d="M 20 20 Q 50 15 80 25 L 85 40 Q 80 60 75 75 L 45 80 Q 25 75 15 60 L 20 20 Z" />
              <path d="M 15 75 Q 20 85 35 82 L 40 90 Q 25 95 15 85 Z" />
              <path d="M 75 15 Q 85 12 90 20 L 88 25 Q 82 22 75 15 Z" />
            </svg>

            {/* Connecting lines between cities */}
            <svg 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                pointerEvents: 'none' 
              }}
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              
              {cityData.slice(0, -1).map((city, index) => (
                <line
                  key={`line-${index}`}
                  x1={`${city.coordinate[1]}%`}
                  y1={`${city.coordinate[0]}%`}
                  x2={`${cityData[index + 1].coordinate[1]}%`}
                  y2={`${cityData[index + 1].coordinate[0]}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  className="map-line"
                />
              ))}
            </svg>

            {/* Animated city points */}
            {cityData.map((city, index) => (
              <div
                key={city.name}
                style={{
                  position: 'absolute',
                  left: `${city.coordinate[1]}%`,
                  top: `${city.coordinate[0]}%`,
                }}
              >
                {/* Pulsing background */}
                <div
                  className="map-pulse"
                  style={{
                    position: 'absolute',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    opacity: 0.3
                  }}
                />
                
                {/* Main point */}
                <div
                  className="map-point"
                  style={{
                    position: 'relative',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  title={`${city.name}: ${city.trend} • ${city.sales} sales • Popular: ${city.popular}`}
                />
              </div>
            ))}

          </div>
          
          {/* Stats Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: Users, value: '2.3M', label: 'Community Members' },
              { icon: TrendingUp, value: '127%', label: 'Growth Rate' },
              { icon: Zap, value: '50+', label: 'Cities Tracked' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="stats-item"
                style={{
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <stat.icon style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                  <span
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      fontFamily: '"Work Sans", "Inter", "-apple-system", "BlinkMacSystemFont", sans-serif'
                    }}
                  >
                    {stat.value}
                  </span>
                </div>
                <div 
                  style={{ 
                    fontSize: '0.875rem', 
                    color: '#999999',
                    fontFamily: '"Work Sans", "Inter", "-apple-system", "BlinkMacSystemFont", sans-serif'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Information Section */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '4rem'
        }}>
          {[
            { 
              icon: TrendingUp, 
              title: 'Real-time Trends', 
              desc: 'Live data from major sneaker hubs worldwide with up-to-the-minute pricing and popularity metrics.' 
            },
            { 
              icon: Zap, 
              title: 'Market Intelligence', 
              desc: 'AI-powered regional insights that analyze buying patterns and predict emerging trends.' 
            },
            { 
              icon: Users, 
              title: 'Community Heatmaps', 
              desc: 'Interactive visualizations showing where sneakerheads gather and what drives local culture.' 
            }
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="feature-item"
              style={{
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '1rem' 
              }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <feature.icon style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
                </div>
                <h4 
                  style={{ 
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    margin: 0,
                    fontFamily: '"Work Sans", "Inter", "-apple-system", "BlinkMacSystemFont", sans-serif'
                  }}
                >
                  {feature.title}
                </h4>
              </div>
              <p 
                style={{ 
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#cccccc',
                  margin: 0,
                  fontFamily: '"Work Sans", "Inter", "-apple-system", "BlinkMacSystemFont", sans-serif'
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}