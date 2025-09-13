import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, TrendingUp, Users, Zap } from 'lucide-react';

interface CityData {
  name: string;
  coordinate: [number, number]; // [lat, lng] for 3D positioning
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
      coordinate: [40.7128, -74.0060],
      trend: "+24%",
      sales: "8.2K",
      popular: "Jordan 1"
    },
    {
      name: "Los Angeles", 
      coordinate: [34.0522, -118.2437],
      trend: "+18%",
      sales: "6.7K",
      popular: "Yeezy 350"
    },
    {
      name: "Chicago",
      coordinate: [41.8781, -87.6298],
      trend: "+31%",
      sales: "5.1K", 
      popular: "Air Force 1"
    },
    {
      name: "Miami",
      coordinate: [25.7617, -80.1918],
      trend: "+15%",
      sales: "4.3K",
      popular: "Dunk Low"
    },
    {
      name: "Atlanta",
      coordinate: [33.7490, -84.3880],
      trend: "+22%",
      sales: "3.8K",
      popular: "Travis Scott"
    }
  ]);

  // State for globe rotation and interaction
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const animationRef = useRef<number>();
  const rotationRef = useRef(0);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  // Energy lines data - paths that shoot across the globe
  const energyLines = useMemo(() => [
    {
      id: 1,
      start: { lat: 40.7, lng: -74.0, name: "New York" }, // NYC
      end: { lat: 51.5, lng: -0.1, name: "London" },
      color: "#00ff88",
      delay: 0
    },
    {
      id: 2,
      start: { lat: 35.7, lng: 139.7, name: "Tokyo" },
      end: { lat: 34.0, lng: -118.2, name: "Los Angeles" },
      color: "#ff4444",
      delay: 1.5
    },
    {
      id: 3,
      start: { lat: 48.9, lng: 2.3, name: "Paris" },
      end: { lat: -33.9, lng: 151.2, name: "Sydney" },
      color: "#4488ff",
      delay: 3.0
    },
    {
      id: 4,
      start: { lat: 1.3, lng: 103.8, name: "Singapore" },
      end: { lat: 55.8, lng: 37.6, name: "Moscow" },
      color: "#ffaa00",
      delay: 4.5
    }
  ], []);

  // 2.5D SVG Globe with orthographic projection
  const globeRadius = 160;
  const globeCenterX = 200;
  const globeCenterY = 200;

  // Utility function for orthographic projection
  const projectToGlobe = (lat: number, lng: number, rotationOffset: number = 0) => {
    const latRad = (lat * Math.PI) / 180;
    const lngRad = ((lng + rotationOffset) * Math.PI) / 180;
    
    const x = globeRadius * Math.cos(latRad) * Math.sin(lngRad);
    const y = -globeRadius * Math.sin(latRad);
    const z = globeRadius * Math.cos(latRad) * Math.cos(lngRad);
    
    return {
      x: globeCenterX + x,
      y: globeCenterY + y,
      z: z,
      visible: z > 0 // Only show points on the front face
    };
  };

  // Generate great circle arc between two points
  const generateArc = (city1: CityData, city2: CityData, rotationOffset: number) => {
    const segments = 20;
    const points = [];
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      // Simple interpolation for demonstration
      const lat = city1.coordinate[0] + t * (city2.coordinate[0] - city1.coordinate[0]);
      const lng = city1.coordinate[1] + t * (city2.coordinate[1] - city1.coordinate[1]);
      
      const projected = projectToGlobe(lat, lng, rotationOffset);
      if (projected.visible) {
        points.push(`${projected.x},${projected.y}`);
      }
    }
    
    return points.length > 1 ? `M ${points.join(' L ')}` : '';
  };

  // Memoize projected city positions
  const projectedCities = useMemo(() => 
    cityData.map(city => ({
      ...city,
      ...projectToGlobe(city.coordinate[0], city.coordinate[1], rotation)
    })), [cityData, rotation]
  );

  // Memoize arc paths
  const arcPaths = useMemo(() => 
    cityData.slice(0, -1).map((city, index) => 
      generateArc(city, cityData[index + 1], rotation)
    ), [cityData, rotation]
  );

  // Generate energy line paths
  const generateEnergyPath = useCallback((startPos: any, endPos: any, currentRotation: number) => {
    const points = [];
    const steps = 50;
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      
      // Interpolate latitude and longitude
      const lat = startPos.lat + (endPos.lat - startPos.lat) * t;
      const lng = startPos.lng + (endPos.lng - startPos.lng) * t;
      
      // Add curve height for great circle effect
      const height = Math.sin(t * Math.PI) * 15;
      
      // Convert to 3D position with curve
      const latRad = (lat * Math.PI) / 180;
      const lngRad = ((lng + currentRotation) * Math.PI) / 180;
      
      const x = (globeRadius + height) * Math.cos(latRad) * Math.sin(lngRad);
      const y = -(globeRadius + height) * Math.sin(latRad);
      const z = (globeRadius + height) * Math.cos(latRad) * Math.cos(lngRad);
      
      // Project to 2D
      if (z > 0) { // Only front-facing points
        points.push({
          x: globeCenterX + x,
          y: globeCenterY + y,
          visible: true
        });
      }
    }
    
    // Create SVG path
    if (points.length < 2) return "";
    
    const pathData = points.reduce((path, point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${path} ${command} ${point.x} ${point.y}`;
    }, "");
    
    return pathData.trim();
  }, []);

  // Energy line paths
  const energyPaths = useMemo(() => 
    energyLines.map(line => ({
      ...line,
      path: generateEnergyPath(line.start, line.end, rotation)
    })).filter(line => line.path !== ""), [energyLines, generateEnergyPath, rotation]
  );

  // Pointer interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastPointerRef.current.x;
    rotationRef.current += deltaX * 0.5;
    setRotation(rotationRef.current);
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Auto-rotation animation (pauses during interaction)
  useEffect(() => {
    const animate = () => {
      if (!isDragging) {
        rotationRef.current += 0.3;
        setRotation(rotationRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging]);

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
        .fromTo(".feature-item", {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "expo.out",
          stagger: 0.1
        }, "-=0.3");
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
          gridTemplateColumns: '1fr 350px',
          gap: '3rem',
          alignItems: 'start',
          marginBottom: '3rem'
        }}>
          
          {/* Interactive 2.5D SVG Globe */}
          <div
            ref={mapRef}
            className="map-container"
            style={{
              position: 'relative',
              aspectRatio: '4/3',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              style={{ maxWidth: '100%', maxHeight: '100%', cursor: isDragging ? 'grabbing' : 'grab' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <defs>
                <radialGradient id="globeGradient" cx="0.3" cy="0.3" r="0.7">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                  <stop offset="70%" stopColor="rgba(255, 255, 255, 0.05)" />
                  <stop offset="100%" stopColor="rgba(0, 0, 0, 0.3)" />
                </radialGradient>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.6)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                </linearGradient>
                
                {/* Energy line filters for glowing effect */}
                <filter id="energyGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                {/* Energy line gradients */}
                {energyLines.map(line => (
                  <linearGradient key={`gradient-${line.id}`} id={`energyGradient-${line.id}`}>
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="10%" stopColor="transparent" />
                    <stop offset="30%" stopColor={line.color} stopOpacity="0.8" />
                    <stop offset="70%" stopColor={line.color} stopOpacity="1" />
                    <stop offset="90%" stopColor="transparent" />
                    <stop offset="100%" stopColor="transparent" />
                    <animateTransform
                      attributeName="gradientTransform"
                      attributeType="XML"
                      type="translate"
                      values="0 0; 100 0; 200 0"
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${line.delay}s`}
                    />
                  </linearGradient>
                ))}
              </defs>

              {/* Globe sphere */}
              <circle
                cx={globeCenterX}
                cy={globeCenterY}
                r={globeRadius}
                fill="url(#globeGradient)"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />

              {/* Connection lines between cities */}
              {arcPaths.map((path, index) => (
                path && (
                  <path
                    key={`arc-${index}`}
                    d={path}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.6"
                    strokeDasharray="4,4"
                    className="globe-arc"
                  />
                )
              ))}

              {/* Animated Energy Lines */}
              {energyPaths.map((energyLine) => (
                energyLine.path && (
                  <g key={`energy-${energyLine.id}`}>
                    {/* Background path for subtle glow */}
                    <path
                      d={energyLine.path}
                      stroke={energyLine.color}
                      strokeWidth="6"
                      fill="none"
                      opacity="0.3"
                      filter="url(#energyGlow)"
                    />
                    {/* Main animated energy path */}
                    <path
                      d={energyLine.path}
                      stroke={`url(#energyGradient-${energyLine.id})`}
                      strokeWidth="3"
                      fill="none"
                      opacity="0.9"
                      filter="url(#energyGlow)"
                      data-testid={`energy-line-${energyLine.id}`}
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="100;0"
                        dur="3s"
                        repeatCount="indefinite"
                        begin={`${energyLine.delay}s`}
                      />
                    </path>
                    {/* Bright center line */}
                    <path
                      d={energyLine.path}
                      stroke={energyLine.color}
                      strokeWidth="1"
                      fill="none"
                      opacity="1"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.3;1;0.3"
                        dur="3s"
                        repeatCount="indefinite"
                        begin={`${energyLine.delay}s`}
                      />
                    </path>
                  </g>
                )
              ))}

              {/* City markers */}
              {projectedCities.map((city, index) => (
                city.visible && (
                  <g key={city.name}>
                    {/* Pulsing ring */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={hoveredCity === city.name ? "12" : "8"}
                      fill="none"
                      stroke={hoveredCity === city.name ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)"}
                      strokeWidth="1"
                      className="globe-pulse"
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    
                    {/* City point */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={hoveredCity === city.name ? "6" : "4"}
                      fill="#ffffff"
                      className="globe-point"
                      style={{ 
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      data-testid={`city-marker-${city.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onMouseEnter={() => setHoveredCity(city.name)}
                      onMouseLeave={() => setHoveredCity(null)}
                    />
                    
                    {/* City label */}
                    <text
                      x={city.x}
                      y={city.y - (hoveredCity === city.name ? 20 : 15)}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={hoveredCity === city.name ? "12" : "11"}
                      fontWeight="600"
                      style={{
                        textShadow: '0 0 3px rgba(0,0,0,0.8)',
                        fontFamily: '"Work Sans", sans-serif',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {city.name}
                    </text>

                    {/* Tooltip on hover */}
                    {hoveredCity === city.name && (
                      <g>
                        <rect
                          x={city.x - 50}
                          y={city.y + 15}
                          width="100"
                          height="50"
                          fill="rgba(0, 0, 0, 0.9)"
                          stroke="rgba(255, 255, 255, 0.2)"
                          strokeWidth="1"
                          rx="4"
                        />
                        <text
                          x={city.x}
                          y={city.y + 30}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="500"
                          style={{ fontFamily: '"Work Sans", sans-serif' }}
                        >
                          {city.trend} • {city.sales} sales
                        </text>
                        <text
                          x={city.x}
                          y={city.y + 45}
                          textAnchor="middle"
                          fill="#cccccc"
                          fontSize="9"
                          style={{ fontFamily: '"Work Sans", sans-serif' }}
                        >
                          Popular: {city.popular}
                        </text>
                      </g>
                    )}
                  </g>
                )
              ))}
            </svg>
          </div>
          
          {/* Feature Cards Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  transition: 'all 0.3s ease',
                  opacity: 1,
                  transform: 'translateY(0)'
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
                  gap: '0.75rem', 
                  marginBottom: '0.75rem' 
                }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <feature.icon style={{ width: '1.25rem', height: '1.25rem', color: '#ffffff' }} />
                  </div>
                  <h4 
                    style={{ 
                      fontSize: '1rem',
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
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
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

      </div>
    </section>
  );
}