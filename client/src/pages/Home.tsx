import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Footprints, Sparkles, TrendingUp, Users, Star, Search, Eye, Heart, Zap } from 'lucide-react';
import { Link } from 'wouter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Import our existing components for brand data
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  const [splineApp, setSplineApp] = useState<any>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number>();
  const flagshipRef = useRef<HTMLElement>(null);
  const flagshipHeaderRef = useRef<HTMLDivElement>(null);

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

  // Flagship Features GSAP ScrollTrigger Animation
  useEffect(() => {
    if (!flagshipRef.current || !flagshipHeaderRef.current) return;

    const ctx = gsap.context(() => {
      // ScrollTrigger for animations - triggers when section enters viewport
      ScrollTrigger.create({
        trigger: flagshipRef.current,
        start: "top 80%",
        onEnter: () => {
          // Animate header when section is pinned to viewport
          gsap.fromTo(flagshipHeaderRef.current, {
            y: 50,
            opacity: 0,
            scale: 0.9
          }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "expo.out"
          });

          // Animate feature cards
          gsap.fromTo(".flagship-feature-card", {
            y: 60,
            opacity: 0,
            scale: 0.95
          }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)",
            delay: 0.3
          });
        }
      });
    }, flagshipRef);

    return () => ctx.revert();
  }, []);

  // Flagship Section Pin and Animation Sequence
  useEffect(() => {
    if (!flagshipRef.current) return;

    const ctx = gsap.context(() => {
      // Initially hide all elements
      gsap.set(".hero__text-cont h5, .hero__text-cont h2", {
        clipPath: "inset(0 0 100% 0)"
      });
      gsap.set(".flagship-grid .flagship-item", {
        y: 50,
        opacity: 0
      });

      // Create pinned timeline that controls entire homepage during flagship section
      let pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: flagshipRef.current,
          start: "top top", 
          end: "+=200%",
          pin: flagshipRef.current, // Pin the flagship section
          pinSpacing: true,
          scrub: 1
        }
      });

      // Add header animation first (0% - 50% of scroll progress)
      pinTl.to(".hero__text-cont h5, .hero__text-cont h2", {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.5,
        stagger: {
          from: "random", 
          each: 0.1
        },
        ease: "sine.out"
      }, 0)

      // Add component animation second (50% - 100% of scroll progress) - AFTER header completes
      .to(".flagship-grid .flagship-item", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: {
          from: "start",
          each: 0.05
        },
        ease: "back.out(1.2)"
      }, 0.5);
    }, flagshipRef);

    return () => ctx.revert();
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

      {/* Our Flagship Features Section */}
      <section ref={flagshipRef} className="template-section flagship-section">
        <div className="template-container padding-4-5rem">
          <div className="flagship-wrapper">
            <div ref={flagshipHeaderRef} className="flagship-header">
              <div className="hero__text-cont">
                <h5 className="heading">Innovation at Its Core</h5>
                <div className="flagship-anim-swipe"></div>
              </div>
              <div className="hero__text-cont">
                <h2 className="flagship-title">OUR FLAGSHIP FEATURES</h2>
                <div className="flagship-anim-swipe"></div>
              </div>
              <p className="flagship-subtitle">
                Discover the cutting-edge technology and AI-powered features that make SoleGrithm 
                the ultimate destination for sneaker enthusiasts worldwide.
              </p>
            </div>
            
            <div className="flagship-features-grid">
              <div className="flagship-feature-card">
                <div className="feature-icon-wrapper">
                  <Search size={32} color="var(--color-orange)" />
                </div>
                <h4 className="feature-title">Visual AI Search</h4>
                <p className="feature-description">
                  Upload any sneaker photo and instantly discover similar styles, colorways, 
                  and matching options using advanced computer vision technology.
                </p>
              </div>
              
              <div className="flagship-feature-card">
                <div className="feature-icon-wrapper">
                  <Zap size={32} color="var(--color-purple)" />
                </div>
                <h4 className="feature-title">Smart Recommendations</h4>
                <p className="feature-description">
                  Our AI analyzes your style preferences, browsing history, and trending data 
                  to deliver personalized sneaker recommendations tailored just for you.
                </p>
              </div>
              
              <div className="flagship-feature-card">
                <div className="feature-icon-wrapper">
                  <TrendingUp size={32} color="var(--color-gold)" />
                </div>
                <h4 className="feature-title">Live Market Data</h4>
                <p className="feature-description">
                  Real-time price tracking, market trends, and investment insights help you 
                  make informed decisions in the ever-changing sneaker marketplace.
                </p>
              </div>
              
              <div className="flagship-feature-card">
                <div className="feature-icon-wrapper">
                  <Eye size={32} color="var(--color-green)" />
                </div>
                <h4 className="feature-title">AR Try-On</h4>
                <p className="feature-description">
                  Experience sneakers in augmented reality before you buy. See how they look 
                  and fit using your smartphone camera for the perfect purchase decision.
                </p>
              </div>
              
              <div className="flagship-feature-card">
                <div className="feature-icon-wrapper">
                  <Users size={32} color="var(--color-blue)" />
                </div>
                <h4 className="feature-title">Community Hub</h4>
                <p className="feature-description">
                  Connect with fellow sneakerheads, share your collection, discuss latest drops, 
                  and discover exclusive releases through our vibrant community platform.
                </p>
              </div>
              
              <div className="flagship-feature-card">
                <div className="feature-icon-wrapper">
                  <Heart size={32} color="var(--color-red)" />
                </div>
                <h4 className="feature-title">Collection Tracker</h4>
                <p className="feature-description">
                  Build and showcase your digital sneaker collection, track market values, 
                  set price alerts, and manage your sneaker portfolio like a pro.
                </p>
              </div>
            </div>
          </div>
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