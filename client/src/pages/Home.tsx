import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Footprints, Sparkles, TrendingUp, Users, Star } from 'lucide-react';
import { Link } from 'wouter';

// Import our existing components for brand data
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  const [splineApp, setSplineApp] = useState<any>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number>();

  // Get brand data for the brands section
  const { data: brands } = useQuery({
    queryKey: ["/api/brands"],
    staleTime: 1000 * 60 * 5,
  });

  // Initialize Spline 3D Robot
  useEffect(() => {
    const initSpline = async () => {
      if (!splineRef.current) return;
      
      try {
        // @ts-ignore - Spline runtime types not available
        const { Application } = await import('https://unpkg.com/@splinetool/runtime@1.6.8/build/runtime.js');
        
        const canvas = splineRef.current.querySelector('canvas');
        if (canvas) {
          const app = new Application(canvas);
          await app.load('https://prod.spline.design/fP0LH65i8bXQDQjZ/scene.splinecode');
          
          // Fade in the robot after loading
          if (splineRef.current) {
            splineRef.current.style.opacity = '1';
            splineRef.current.style.transition = 'opacity 1s ease-in-out';
          }
          
          setSplineApp(app);
        }
      } catch (error) {
        console.log('Spline loading fallback - using placeholder animation');
        // Fallback: show the container with reduced opacity
        if (splineRef.current) {
          splineRef.current.style.opacity = '0.5';
        }
      }
    };

    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(initSpline, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Smooth animation loop for robot movement
  useEffect(() => {
    if (!splineApp) return;

    const animate = () => {
      if (splineApp && splineApp.findObjectByName) {
        try {
          // Find robot parts with multiple fallback names
          const robotHead = splineApp.findObjectByName('Head') || 
                           splineApp.findObjectByName('Robot') || 
                           splineApp.findObjectByName('robot') ||
                           splineApp.findObjectByName('head') ||
                           splineApp.findObjectByName('RobotHead');
          
          if (robotHead) {
            // Smooth interpolation for more natural movement
            const lerpFactor = 0.1; // Adjust for smoothness (0.1 = smooth, 1.0 = instant)
            
            const currentRotY = robotHead.rotation.y || 0;
            const currentRotX = robotHead.rotation.x || 0;
            
            // Interpolate towards target rotation
            robotHead.rotation.y = currentRotY + (targetRotation.y - currentRotY) * lerpFactor;
            robotHead.rotation.x = currentRotX + (targetRotation.x - currentRotX) * lerpFactor;
          }
          
          // Try to find and smoothly rotate the body/torso
          const robotBody = splineApp.findObjectByName('Body') || 
                           splineApp.findObjectByName('Torso') ||
                           splineApp.findObjectByName('body') ||
                           splineApp.findObjectByName('RobotBody');
          
          if (robotBody) {
            const currentBodyRotY = robotBody.rotation.y || 0;
            const targetBodyRotY = targetRotation.y * 0.3; // Subtle body movement
            robotBody.rotation.y = currentBodyRotY + (targetBodyRotY - currentBodyRotY) * 0.05;
          }
        } catch (error) {
          // Silently handle any Spline interaction errors
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [splineApp, targetRotation]);

  // Mouse tracking for robot animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;

      // More accurate mouse position calculation relative to hero section
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // Fixed: removed negative sign
      
      setMousePos({ x, y });
      
      // Set target rotation with increased sensitivity and range
      setTargetRotation({
        x: y * 0.4,  // Fixed: removed negative sign for natural vertical movement
        y: x * 0.8   // Horizontal look range (increased for better tracking)
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-up-animation');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.slide-up-animation, .slide-from-left-animation, .slide-from-right-animation');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Template Navbar */}
      <nav className="template-navbar">
        <div className="nav-container">
          <Link href="/" className="logo-link-wrapper">
            SoleGrithm
          </Link>
          <div className="nav-menu">
            <Link href="/discover" className="template-nav-link">Discover</Link>
            <Link href="/market" className="template-nav-link">Market</Link>
            <Link href="/community" className="template-nav-link">Community</Link>
            <Link href="/profile" className="template-nav-link">Profile</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Animation */}
      <section ref={heroRef} className="hero-section">
        <div className="fingerprint"></div>
        <div className="circle"></div>
        <div className="template-container">
          <div className="hero-wrapper">
            <h5 className="heading">Welcome to</h5>
            <h1 className="hero-text">SOLEGRITHM</h1>
          </div>
          <div className="hero-overlay"></div>
        </div>
        
        {/* 3D Spline Robot Animation - Interactive robot that follows cursor */}
        <div 
          ref={splineRef}
          className="spline"
          style={{ opacity: 0 }}
          data-animation-type="spline"
          data-spline-url="https://prod.spline.design/fP0LH65i8bXQDQjZ/scene.splinecode"
        >
          <canvas id="spline-canvas"></canvas>
        </div>
      </section>

      {/* Brands Section */}
      <section id="brands" className="template-section">
        <div className="template-container padding-4-5rem">
          <div className="space-7rem"></div>
          <div className="brands-wrapper">
            <div className="brands-grid slide-up-animation">
              {(brands && Array.isArray(brands) ? brands.slice(0, 4) : []).map((brand: any) => (
                <div key={brand.id} className="logos-wrapper">
                  <h3 style={{ color: 'var(--white)', fontSize: '1.2rem' }}>{brand.name}</h3>
                </div>
              ))}
            </div>
            <div className="brands-grid slide-up-animation">
              <div className="logos-wrapper">
                <TrendingUp size={40} color="var(--color-orange)" />
              </div>
              <div className="logos-wrapper">
                <Sparkles size={40} color="var(--color-purple)" />
              </div>
              <div className="logos-wrapper">
                <Users size={40} color="var(--color-gold)" />
              </div>
              <div className="logos-wrapper">
                <Star size={40} color="var(--white)" />
              </div>
            </div>
          </div>
          <div className="space-7rem"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="template-section">
        <div className="template-container padding-4-5rem">
          <div className="services-flex">
            <div className="services-wrapper slide-from-left-animation">
              <div className="services-card">
                <div className="services-title-flex">
                  <div className="services-icon">
                    <Sparkles size={30} color="white" />
                  </div>
                  <h4 className="caps">AI Discovery</h4>
                </div>
                <div className="services-text-block">
                  <p className="self-align-left">
                    Intelligent sneaker recommendations powered by advanced AI algorithms. 
                    Discover your perfect pair based on style preferences and trends.
                  </p>
                </div>
              </div>
              <div className="services-card">
                <div className="services-title-flex">
                  <div className="services-icon">
                    <TrendingUp size={30} color="white" />
                  </div>
                  <h4 className="caps">Market Analytics</h4>
                </div>
                <div className="services-text-block">
                  <p className="self-align-left">
                    Real-time market data and price tracking for informed sneaker investments. 
                    Stay ahead with comprehensive market insights.
                  </p>
                </div>
              </div>
              <p className="max-width-30rem">
                Experience the future of sneaker culture with our AI-powered platform 
                that connects enthusiasts worldwide.
              </p>
            </div>
            <div className="services-wrapper slide-from-right-animation">
              <h5>Sneaker Innovation</h5>
              <h2 className="services-title">FEATURES</h2>
              <div className="services-card">
                <div className="services-title-flex">
                  <div className="services-icon">
                    <Users size={30} color="white" />
                  </div>
                  <h4 className="caps">Community</h4>
                </div>
                <div className="services-text-block">
                  <p className="self-align-left">
                    Connect with fellow sneakerheads, share collections, and discover 
                    the latest drops in our vibrant community platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="template-section">
        <div className="template-container padding-4-5rem">
          <div className="services-flex">
            <div className="services-wrapper slide-from-left-animation">
              <h5>Premium Experience</h5>
              <h2 className="services-title">EXPLORE</h2>
              <p className="max-width-30rem">
                Dive into the world of sneakers with our curated collections, 
                exclusive drops, and personalized recommendations tailored to your style.
              </p>
              <Link href="/discover" style={{ 
                display: 'inline-block',
                marginTop: '2rem',
                padding: '1rem 2rem',
                background: 'var(--color-orange)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: 'var(--border-radius)',
                transition: 'all 0.3s ease'
              }}>
                Start Discovering
              </Link>
            </div>
            <div className="services-wrapper slide-from-right-animation">
              <div className="services-card">
                <div className="services-title-flex">
                  <div className="services-icon">
                    <Star size={30} color="white" />
                  </div>
                  <h4 className="caps">Collections</h4>
                </div>
                <div className="services-text-block">
                  <p className="self-align-left">
                    Build and showcase your digital sneaker collection. Track your favorites, 
                    share with friends, and discover new releases.
                  </p>
                </div>
              </div>
              <div className="services-card">
                <div className="services-title-flex">
                  <div className="services-icon">
                    <Footprints size={30} color="white" />
                  </div>
                  <h4 className="caps">AR Try-On</h4>
                </div>
                <div className="services-text-block">
                  <p className="self-align-left">
                    Revolutionary augmented reality technology lets you try on sneakers 
                    virtually before making your purchase decision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}