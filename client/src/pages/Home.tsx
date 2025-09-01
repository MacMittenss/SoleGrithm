import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import { Lenis } from '@/components/Lenis';
import { useStore } from '@/libs/store';

// Navigation Component with Lenis-driven collapse behavior
const Navigation = () => {
  const headerInnerEl = useRef<HTMLDivElement>(null);
  const collapsed = useStore((state) => state.isNavigationCollapsed);
  const [path, setPath] = useState('');

  useLayoutEffect(() => {
    if (!headerInnerEl.current) return;

    const tl = gsap.timeline();

    if (collapsed) {
      tl.to(headerInnerEl.current, {
        yPercent: -175,
        duration: 0.4,
        ease: 'power2.in',
        overwrite: 'auto',
      });
    } else {
      tl.to(headerInnerEl.current, {
        yPercent: 0,
        duration: 1,
        ease: 'expo.out',
        overwrite: 'auto',
      });
    }

    if (window?.location) {
      setPath(window.location.pathname);
    }

    return () => {
      tl.kill();
    };
  }, [collapsed]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div 
        ref={headerInnerEl}
        className="flex items-center justify-between bg-black/80 backdrop-blur-md rounded-full px-8 py-4 border border-white/10"
      >
        <div className="flex items-center">
          <a href="https://www.viture.com" className="text-2xl font-bold text-white">
            VITURE
          </a>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-4 relative">
              <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-sm opacity-80" />
            </div>
            <div className="text-gray-400 text-sm">
              From <strong className="text-white">$399</strong>
            </div>
          </div>
          <a
            href={`https://www.viture.com/product/viture-luma-xr-glasses${path !== '/' ? `?discount=${path.replaceAll('/', '')}` : ''}`}
            className="relative px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:scale-105 transition-transform overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10">Order Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const setIsLoading = useStore((state) => state.setIsLoading);

  useLayoutEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    // Set loading to false once component mounts
    setIsLoading(false);

    if (!heroRef.current) return;

    const tl = gsap.timeline();
    
    // Animate hero content on load
    tl.fromTo(heroRef.current.children, 
      { opacity: 0, y: 100 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.2, 
        ease: 'expo.out' 
      }
    );

    return () => {
      tl.kill();
    };
  }, [setIsLoading]);

  return (
    <Lenis 
      options={{
        lerp: 0.125,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      <div className="w-full bg-black text-white">
        {/* Navigation */}
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.08) 35%, rgba(0, 0, 0, 0.9) 100%)',
              }}
            />
            {/* Animated particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Hero Content */}
          <div ref={heroRef} className="relative z-10 text-center max-w-5xl mx-auto px-6">
            {/* Current Time Display */}
            <div className="mb-8">
              <div className="text-sm text-blue-400 font-mono tracking-wider">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block text-white">VITURE</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                XR GLASSES
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of augmented reality with our revolutionary XR glasses. 
              Smooth scrolling meets immersive technology.
            </p>

            {/* Product Showcase */}
            <div className="mb-12">
              <div className="relative w-80 h-20 mx-auto mb-8">
                {/* 3D Glasses Visualization */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
                <div className="relative flex items-center justify-center h-full">
                  <div className="w-64 h-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full border border-white/20 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <div className="w-12 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg opacity-80" />
                      <div className="w-6 h-2 bg-gray-600 rounded-full mt-3" />
                      <div className="w-12 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg opacity-80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-12">
              <div className="text-4xl font-bold text-white mb-2">
                From <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">$399</span>
              </div>
              <p className="text-gray-400">Free shipping worldwide</p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://www.viture.com/product/viture-luma-xr-glasses"
                className="group relative px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-full hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-3">
                  Order Now
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </span>
              </a>
              
              <a
                href="#features"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                Learn More
                <div className="w-4 h-4">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Smooth Scroll Demonstration Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Buttery Smooth
              </span>
              <span className="block text-white">Scroll Experience</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-16">
              Powered by Lenis smooth scrolling with advanced navigation management. 
              Scroll up and down to see the navigation intelligently collapse and expand.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Scroll Direction Detection',
                  description: 'Navigation automatically hides when scrolling down and shows when scrolling up',
                  icon: '⬇️'
                },
                {
                  title: 'Smooth Interpolation',
                  description: 'Buttery smooth scrolling with customizable lerp and easing functions',
                  icon: '🌊'
                },
                {
                  title: 'Snap Scrolling',
                  description: 'Intelligent snap points with bezier easing for enhanced UX',
                  icon: '🎯'
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Revolutionary
                </span>
                <span className="block text-white">XR Experience</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Breakthrough technology that transforms how you work, play, and connect
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: '4K OLED Display',
                  description: 'Crystal clear visuals with true-to-life colors and infinite contrast',
                  icon: '👁️'
                },
                {
                  title: 'Ultra-Light Design', 
                  description: 'Comfortable all-day wear at just 78 grams',
                  icon: '🪶'
                },
                {
                  title: '6DOF Tracking',
                  description: 'Precise head and hand tracking for immersive interaction',
                  icon: '🎯'
                },
                {
                  title: 'All-Day Battery',
                  description: 'Up to 8 hours of continuous use on a single charge',
                  icon: '🔋'
                },
                {
                  title: 'Universal Compatibility',
                  description: 'Works seamlessly with your existing devices',
                  icon: '🔗'
                },
                {
                  title: 'Privacy Shield',
                  description: 'Built-in privacy features to keep your data secure',
                  icon: '🛡️'
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Large Spacer Section for Scroll Testing */}
        <section className="py-64 relative">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Keep Scrolling
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Notice how the navigation intelligently hides and shows based on your scroll direction. 
              This creates a more immersive browsing experience.
            </p>
          </div>
        </section>

        {/* Product Lineup Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Choose Your XR Journey
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                From entertainment to professional use, find the perfect VITURE glasses for you
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'VITURE One',
                  price: '$399',
                  description: 'Perfect for entertainment and casual use',
                  features: ['1080p Display', '4 Hour Battery', 'Basic Tracking']
                },
                {
                  name: 'VITURE Pro',
                  price: '$599', 
                  description: 'Advanced features for power users',
                  features: ['4K OLED Display', '8 Hour Battery', '6DOF Tracking'],
                  featured: true
                },
                {
                  name: 'VITURE Enterprise',
                  price: '$899',
                  description: 'Professional-grade for business applications', 
                  features: ['4K+ Display', '12 Hour Battery', 'Enterprise Security']
                }
              ].map((product, index) => (
                <div
                  key={product.name}
                  className={clsx(
                    "relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105",
                    product.featured 
                      ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50 shadow-2xl shadow-blue-500/20" 
                      : "bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-white/10 hover:border-blue-500/30"
                  )}
                >
                  {product.featured && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                    <div className="text-4xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        {product.price}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-8">{product.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <a
                      href={`https://www.viture.com/product/viture-luma-xr-glasses?model=${product.name.toLowerCase().replace(' ', '-')}`}
                      className={clsx(
                        "block w-full py-3 rounded-full font-semibold transition-all duration-300",
                        product.featured
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-105"
                          : "border border-white/20 text-white hover:bg-white/10"
                      )}
                    >
                      Order Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="text-2xl font-bold text-white mb-4">VITURE</div>
            <p className="text-gray-400 mb-8">Redefining reality, one smooth scroll at a time</p>
            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <a href="https://www.viture.com/about" className="hover:text-white transition-colors">About</a>
              <a href="https://www.viture.com/support" className="hover:text-white transition-colors">Support</a>
              <a href="https://www.viture.com/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="https://www.viture.com/terms" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </Lenis>
  );
}