import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';
import { Lenis } from '@/components/Lenis';
import { useStore } from '@/libs/store';

gsap.registerPlugin(ScrollTrigger);

// Preloader Component
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'fadeIn' | 'hold' | 'fadeOut' | 'slideOut'>('fadeIn');
  const preloaderRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (hasCompletedRef.current) return;
    
    console.log('Starting preloader phases');
    
    const sequence = async () => {
      // Phase 1: Fade in (800ms)
      setPhase('fadeIn');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Phase 2: Hold (600ms)
      setPhase('hold');
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Phase 3: Fade out (600ms)
      setPhase('fadeOut');
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Phase 4: Slide out (800ms)
      setPhase('slideOut');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Complete
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        console.log('Preloader complete');
        onComplete();
      }
    };

    sequence();

    // Fallback timeout
    const fallback = setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        console.log('Preloader fallback triggered');
        onComplete();
      }
    }, 3500);

    return () => {
      clearTimeout(fallback);
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef}
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-transform duration-800 ease-in-out ${
        phase === 'slideOut' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="relative">
        <span 
          className={`text-6xl font-bold text-white tracking-wider transition-all duration-800 ease-out ${
            phase === 'fadeIn' ? 'opacity-100 translate-y-0 scale-100' :
            phase === 'hold' ? 'opacity-100 translate-y-0 scale-100' :
            phase === 'fadeOut' ? 'opacity-0 -translate-y-8 scale-110' :
            'opacity-0 -translate-y-8 scale-110'
          } ${
            phase === 'fadeIn' ? '' : phase === 'hold' ? '' : 'ease-in'
          }`}
          style={{ 
            fontFamily: 'seasonSans, seasonSans Fallback, Manrope, Inter, sans-serif',
            transform: phase === 'fadeIn' ? 'translateY(50px) scale(0.8)' : undefined
          }}
        >
          VITURE
        </span>
        <div className={`absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transition-opacity duration-800 ${
          phase === 'fadeIn' || phase === 'hold' ? 'opacity-50' : 'opacity-0'
        }`} />
      </div>
    </div>
  );
};

// Split Text Component for Animations
const SplitText = ({ children, className, delay = 0 }: { children: string; className?: string; delay?: number }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const words = children.split(' ');
    textRef.current.innerHTML = words
      .map(word => `<span class="inline-block">${word}</span>`)
      .join(' ');

    const spans = textRef.current.querySelectorAll('span');
    
    gsap.fromTo(spans, 
      {
        opacity: 0,
        y: 100,
        rotationX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.1,
        delay,
        ease: "expo.out"
      }
    );

    return () => {
      gsap.killTweensOf(spans);
    };
  }, [children, delay]);

  return <div ref={textRef} className={className} />;
};

// Gradient Text Component
const GradientText = ({ children, className }: { children: string; className?: string }) => {
  return (
    <span className={clsx(
      "bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 bg-clip-text text-transparent",
      className
    )}>
      {children}
    </span>
  );
};

// Navigation Component with VITURE-style collapse behavior
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
        className="flex items-center justify-between glass-dark rounded-full px-8 py-4"
      >
        <div className="flex items-center">
          <a href="https://www.viture.com" className="text-2xl font-bold text-white" style={{ fontFamily: 'seasonSans, seasonSans Fallback, Manrope, Inter, sans-serif' }}>
            VITURE
          </a>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#products" className="hover:text-white transition-colors">Products</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <a
            href="https://www.viture.com/product/viture-luma-xr-glasses"
            className="relative px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-semibold text-sm hover:scale-105 transition-transform overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10">Order Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const dotGridRef = useRef<HTMLDivElement>(null);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const preloaderCompleteRef = useRef(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const setIsLoading = useStore((state) => state.setIsLoading);

  useLayoutEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    if (!isPreloaderComplete) return;
    
    // Set loading to false once preloader completes
    setIsLoading(false);

    if (!heroRef.current) return;

    // Animate dot grid
    if (dotGridRef.current) {
      const dots = dotGridRef.current.querySelectorAll('.dot');
      gsap.fromTo(dots, 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 2, 
          stagger: {
            amount: 3,
            from: "center",
            grid: "auto"
          },
          ease: "expo.out",
          delay: 0.5
        }
      );
    }

    return () => {
      gsap.killTweensOf(heroRef.current);
    };
  }, [isPreloaderComplete, setIsLoading]);

  const handlePreloaderComplete = () => {
    console.log('Preloader complete callback triggered');
    if (!preloaderCompleteRef.current) {
      preloaderCompleteRef.current = true;
      setIsPreloaderComplete(true);
    }
  };

  // Debug: Add effect to log state changes
  useEffect(() => {
    console.log('isPreloaderComplete:', isPreloaderComplete);
  }, [isPreloaderComplete]);

  if (!isPreloaderComplete) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <Lenis 
      options={{
        lerp: 0.125,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      <div className="w-full bg-black text-white overflow-hidden">
        {/* Navigation */}
        <Navigation />
        
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Dot Grid Background */}
          <div 
            ref={dotGridRef}
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, transparent 80%)'
            }}
          >
            {[...Array(200)].map((_, i) => (
              <div
                key={i}
                className="dot absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${(i % 20) * 5}%`,
                  top: `${Math.floor(i / 20) * 10}%`,
                }}
              />
            ))}
          </div>

          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 41, 0, 0.1) 0%, rgba(88, 29, 255, 0.05) 35%, rgba(0, 0, 0, 0.9) 100%)',
            }}
          />

          {/* Hero Content */}
          <div ref={heroRef} className="relative z-10 text-center max-w-6xl mx-auto px-6">
            {/* Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-white/20">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-sm text-white/80">Experience the Future</span>
              </div>
            </div>

            {/* Main Headline with VITURE-style typography */}
            <div className="mb-8">
              <SplitText 
                className="text-7xl sm:text-8xl lg:text-9xl font-bold leading-none tracking-tight mb-4" 
                delay={0.2}
              >
                VITURE
              </SplitText>
              <div className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-none tracking-tight">
                <GradientText className="font-bold">
                  Luma
                </GradientText>
              </div>
            </div>

            {/* Subtitle */}
            <div className="mb-12">
              <SplitText 
                className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed" 
                delay={1}
              >
                The future of augmented reality is here. Experience unparalleled clarity, comfort, and innovation with our revolutionary XR glasses.
              </SplitText>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <a
                href="https://www.viture.com/product/viture-luma-xr-glasses"
                className="group relative px-12 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-semibold text-lg rounded-full hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-3">
                  Experience Luma
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </span>
              </a>
              
              <a
                href="#about"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-lg"
              >
                Discover More
                <div className="w-4 h-4">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { label: 'Weight', value: '78g', description: 'Ultra-lightweight design' },
                { label: 'Battery', value: '8hrs', description: 'All-day performance' },
                { label: 'Display', value: '4K', description: 'Crystal clear OLED' }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold gradient-text-primary mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-400">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-6">
                  <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase">About VITURE</span>
                </div>
                <h2 className="text-5xl font-bold mb-8 leading-tight">
                  <span className="text-white">Redefining</span>
                  <br />
                  <GradientText>Reality</GradientText>
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  VITURE is pioneering the future of augmented reality with our groundbreaking XR glasses. 
                  We believe technology should enhance human experience, not replace it.
                </p>
                <p className="text-lg text-gray-400 mb-12 leading-relaxed">
                  Our mission is to create seamless digital experiences that blend effortlessly with the physical world, 
                  empowering users to interact with information in ways never before possible.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#products"
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-semibold rounded-full hover:scale-105 transition-transform text-center"
                  >
                    Explore Products
                  </a>
                  <a
                    href="#features"
                    className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-center"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl glass-light p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-6">👓</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Innovation</h3>
                    <p className="text-gray-300">Cutting-edge technology meets elegant design</p>
                  </div>
                </div>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-pink-500/20 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <div className="mb-6">
                <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase">Features</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold mb-8">
                <span className="text-white">Advanced</span>
                <br />
                <GradientText>Technology</GradientText>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Experience breakthrough innovations that push the boundaries of what's possible in augmented reality
              </p>
            </div>

            {/* Main Feature */}
            <div className="mb-20">
              <div className="glass-dark rounded-3xl p-12 text-center">
                <div className="text-8xl mb-8">🔬</div>
                <h3 className="text-4xl font-bold text-white mb-6">Spatial Computing</h3>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                  Revolutionary spatial computing technology that understands your environment and seamlessly blends digital content with the physical world.
                </p>
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text-primary mb-2">120°</div>
                    <div className="text-sm text-gray-400">Field of View</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text-primary mb-2">60Hz</div>
                    <div className="text-sm text-gray-400">Refresh Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text-primary mb-2">0.1ms</div>
                    <div className="text-sm text-gray-400">Latency</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: '4K Micro-OLED',
                  description: 'Stunning visual clarity with 4K resolution per eye and true HDR support',
                  icon: '📺',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Ultra-Lightweight',
                  description: 'Just 78 grams of premium materials for all-day comfort',
                  icon: '🪶',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  title: 'Spatial Tracking',
                  description: 'Advanced 6DOF tracking with sub-millimeter precision',
                  icon: '🎯',
                  color: 'from-orange-500 to-red-500'
                },
                {
                  title: 'All-Day Battery',
                  description: 'Up to 8 hours of continuous use with fast charging',
                  icon: '⚡',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  title: 'Universal Connect',
                  description: 'Compatible with all your devices via USB-C or wireless',
                  icon: '🔗',
                  color: 'from-indigo-500 to-purple-500'
                },
                {
                  title: 'Privacy First',
                  description: 'On-device processing with encrypted data transmission',
                  icon: '🔒',
                  color: 'from-gray-500 to-slate-500'
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative p-8 rounded-2xl glass-light border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105"
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="text-5xl mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-white mb-8">
                Experience the <GradientText>Future</GradientText>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Step into a world where digital and physical reality seamlessly blend together
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                {[
                  {
                    title: 'Immersive Gaming',
                    description: 'Transform any space into your gaming arena with room-scale VR experiences',
                    icon: '🎮'
                  },
                  {
                    title: 'Productive Workspace',
                    description: 'Create unlimited virtual monitors and collaborate in shared digital spaces',
                    icon: '💼'
                  },
                  {
                    title: 'Social Connection',
                    description: 'Meet friends and family in virtual environments that feel truly real',
                    icon: '👥'
                  }
                ].map((item, index) => (
                  <div key={item.title} className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full glass-light flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="relative">
                <div className="aspect-video rounded-2xl glass-dark flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🌐</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Endless Possibilities</h3>
                    <p className="text-gray-300">Your imagination is the only limit</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-500/30 to-purple-500/30 rounded-full blur-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Product Lineup Section */}
        <section id="products" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <div className="mb-6">
                <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase">Products</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-bold mb-8">
                <span className="text-white">Choose Your</span>
                <br />
                <GradientText>Adventure</GradientText>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                From entertainment to professional applications, discover the perfect VITURE experience for your needs
              </p>
            </div>

            {/* Featured Product */}
            <div className="mb-20">
              <div className="relative glass-dark rounded-3xl p-12 border border-orange-500/30">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                    ✨ NEW RELEASE
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-4xl font-bold text-white mb-4">VITURE Luma</h3>
                    <p className="text-xl text-gray-300 mb-8">
                      The ultimate XR glasses combining cutting-edge technology with unparalleled comfort. 
                      Experience the future of augmented reality.
                    </p>
                    <div className="flex items-center gap-8 mb-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold gradient-text-primary mb-1">4K</div>
                        <div className="text-sm text-gray-400">OLED Display</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold gradient-text-primary mb-1">78g</div>
                        <div className="text-sm text-gray-400">Ultra Light</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold gradient-text-primary mb-1">8hrs</div>
                        <div className="text-sm text-gray-400">Battery Life</div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="https://www.viture.com/product/viture-luma-xr-glasses"
                        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold rounded-full hover:scale-105 transition-transform text-center"
                      >
                        Pre-order Now - $599
                      </a>
                      <a
                        href="#features"
                        className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-center"
                      >
                        Learn More
                      </a>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-square rounded-2xl glass-light flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl mb-4">👓</div>
                        <div className="text-xl font-bold text-white">VITURE Luma</div>
                      </div>
                    </div>
                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-orange-500/30 to-purple-500/30 rounded-full blur-2xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'VITURE One',
                  price: '$399',
                  originalPrice: '$499',
                  description: 'Perfect entry point into XR with essential features for entertainment',
                  features: ['2K Display', '5 Hour Battery', 'Basic Tracking', 'USB-C Connection'],
                  badge: 'Best Value'
                },
                {
                  name: 'VITURE Pro',
                  price: '$799', 
                  description: 'Advanced features for power users and content creators',
                  features: ['4K OLED Display', '10 Hour Battery', 'Advanced Tracking', 'Wireless & USB-C'],
                  featured: true,
                  badge: 'Most Popular'
                },
                {
                  name: 'VITURE Enterprise',
                  price: '$1,299',
                  description: 'Professional-grade solution for business and enterprise applications', 
                  features: ['4K+ Display', '12 Hour Battery', 'Enterprise Security', 'Cloud Integration'],
                  badge: 'Enterprise'
                }
              ].map((product, index) => (
                <div
                  key={product.name}
                  className={clsx(
                    "relative p-8 rounded-2xl border transition-all duration-500 hover:scale-105 group",
                    product.featured 
                      ? "glass-dark border-orange-500/50 shadow-2xl shadow-orange-500/20" 
                      : "glass-light border-white/10 hover:border-white/30"
                  )}
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={clsx(
                      "px-4 py-1 rounded-full text-xs font-bold",
                      product.featured 
                        ? "bg-gradient-to-r from-orange-500 to-purple-600 text-white"
                        : "bg-white/10 text-white border border-white/20"
                    )}>
                      {product.badge}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                    
                    <div className="mb-4">
                      <div className="text-4xl font-bold gradient-text-primary">
                        {product.price}
                      </div>
                      {product.originalPrice && (
                        <div className="text-lg text-gray-500 line-through">{product.originalPrice}</div>
                      )}
                    </div>
                    
                    <p className="text-gray-300 mb-8 leading-relaxed">{product.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-500" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <a
                      href={`https://www.viture.com/product/viture-luma-xr-glasses?model=${product.name.toLowerCase().replace(' ', '-')}`}
                      className={clsx(
                        "block w-full py-4 rounded-full font-bold transition-all duration-300",
                        product.featured
                          ? "bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:scale-105"
                          : "border border-white/20 text-white hover:bg-white/10"
                      )}
                    >
                      {product.featured ? 'Choose Pro' : 'Select Model'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Comparison CTA */}
            <div className="text-center mt-16">
              <p className="text-gray-400 mb-6">Need help choosing the right model?</p>
              <a
                href="https://www.viture.com/compare"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Compare All Models
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 relative">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="mb-12">
              <h2 className="text-5xl font-bold mb-8">
                <span className="text-white">Ready to Experience</span>
                <br />
                <GradientText>the Future?</GradientText>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Join thousands of early adopters who are already living in the future with VITURE XR glasses
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: '📧',
                  title: 'Get Updates',
                  description: 'Be the first to know about new releases and features'
                },
                {
                  icon: '📞',
                  title: 'Expert Support',
                  description: '24/7 technical support from our XR specialists'
                },
                {
                  icon: '🌐',
                  title: 'Global Community',
                  description: 'Join our worldwide community of XR enthusiasts'
                }
              ].map((item, index) => (
                <div key={item.title} className="glass-light rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://www.viture.com/product/viture-luma-xr-glasses"
                className="px-12 py-4 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold text-lg rounded-full hover:scale-105 transition-transform"
              >
                Order Now
              </a>
              <a
                href="https://www.viture.com/try"
                className="px-12 py-4 border border-white/20 text-white font-semibold text-lg rounded-full hover:bg-white/10 transition-colors"
              >
                Try Before You Buy
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-2">
                <div className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'seasonSans, seasonSans Fallback, Manrope, Inter, sans-serif' }}>VITURE</div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Pioneering the future of augmented reality with revolutionary XR glasses that seamlessly blend digital and physical worlds.
                </p>
                <div className="flex gap-4">
                  {[
                    { name: 'Twitter', icon: '🐦', href: 'https://twitter.com/viture' },
                    { name: 'YouTube', icon: '📺', href: 'https://youtube.com/viture' },
                    { name: 'Instagram', icon: '📷', href: 'https://instagram.com/viture' },
                    { name: 'Discord', icon: '🎮', href: 'https://discord.com/viture' }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-12 h-12 rounded-full glass-light flex items-center justify-center text-xl hover:scale-110 transition-transform"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-white mb-4">Products</h3>
                <ul className="space-y-3">
                  {['VITURE Luma', 'VITURE One', 'VITURE Pro', 'VITURE Enterprise', 'Accessories'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-white mb-4">Support</h3>
                <ul className="space-y-3">
                  {['Help Center', 'Contact Us', 'Warranty', 'Shipping', 'Returns'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-400 text-sm">
                  © 2025 VITURE. All rights reserved. Experience the future responsibly.
                </div>
                <div className="flex gap-6 text-sm text-gray-400">
                  <a href="https://www.viture.com/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="https://www.viture.com/terms" className="hover:text-white transition-colors">Terms of Service</a>
                  <a href="https://www.viture.com/cookies" className="hover:text-white transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Lenis>
  );
}