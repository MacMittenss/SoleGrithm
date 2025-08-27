import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Compass, Target, Zap, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import SplitText from "./SplitText";
import GradientText from "./GradientText";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function SoleRadarSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Split title into words for word-by-word reveal
      const title = titleRef.current;
      if (title && title.innerText) {
        const words = title.innerText.split(" ");
        // Clear existing content safely
        title.innerHTML = '';
        // Add new word spans
        title.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(" ");
      }

      // Extended pinning like trending section for natural flow
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%", // Extended scroll distance like trending section
        pin: true,
        pinSpacing: true, // Enable pin spacing to maintain document flow
        anticipatePin: 1,
      });

      // Set initial hidden states for title words
      gsap.set(".sole-radar .word", { 
        opacity: 0, 
        y: 150, 
        scale: 0.9,
        transformOrigin: "center bottom"
      });
      gsap.set(subtitleRef.current, { 
        opacity: 0, 
        y: 80,
        transformOrigin: "center bottom"
      });
      gsap.set(badgeRef.current, { 
        opacity: 0, 
        y: 60,
        transformOrigin: "center bottom"
      });
      gsap.set(featuresRef.current, {
        y: 100,
        scale: 0,
        transformOrigin: "center bottom"
      });
      gsap.set(buttonRef.current, {
        y: 100,
        scale: 0,
        transformOrigin: "center bottom"
      });
      gsap.set(gridRef.current, {
        y: 100,
        scale: 0,
        transformOrigin: "center bottom"
      });

      // Header animation timeline - animate while pinned (like trending section)
      let headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Animate when section is pinned to viewport
          end: "+=150%", // Same extended range as pinning
          scrub: 1, // Scroll-tied animation like trending section
        }
      });

      // Header animation sequence - much faster timing
      headerTl
        // Badge first - much faster
        .to(badgeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.2, // Much faster
          ease: "expo.out"
        })
        // Animate title words one by one with faster spacing
        .to(".sole-radar .word", {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.03, // Much faster stagger
          duration: 0.3, // Much faster
          ease: "expo.out"
        }, "+=0.05") // Minimal pause
        // Then animate subtitle faster
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3, // Much faster
          ease: "expo.out"
        }, "+=0.05") // Minimal pause
        // Then animate features list faster
        .to(featuresRef.current, {
          y: 0,
          scale: 1,
          duration: 0.4, // Much faster
          ease: "back.out(1.2)" // Slight bounce effect for growth
        }, "+=0.05") // Minimal pause
        // Then animate button faster
        .to(buttonRef.current, {
          y: 0,
          scale: 1,
          duration: 0.4, // Much faster
          ease: "back.out(1.2)"
        }, "+=0.03") // Minimal delay
        // Finally animate grid faster
        .to(gridRef.current, {
          y: 0,
          scale: 1,
          duration: 0.4, // Much faster
          ease: "back.out(1.2)" // Slight bounce effect for growth
        }, "+=0.03"); // Minimal delay

      // Curtain overlay animation - rises from bottom with clockwise rotation
      if (curtainRef.current) {
        // Set initial state - curtain as horizontal bar at bottom
        gsap.set(curtainRef.current, {
          scaleY: 0, // Start as flat horizontal line
          rotation: 0, // Start horizontal 
          transformOrigin: "33.33% 100%", // Rotate from a point that ensures full coverage
          opacity: 1,
        });

        // Section blur effect synced with curtain overlay
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "bottom 95%", // Start blurring as soon as scrolling away begins
          end: "bottom 30%", // End when curtain completes
          scrub: true, // Smooth blur progression
          animation: gsap.to(sectionRef.current, {
            filter: "blur(20px)", // Maximum blur of 20px
            ease: "none",
          }),
        });

        // Curtain grows and rotates as soon as scrolling away begins
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "bottom 95%", // Start immediately when scrolling away begins
          end: "bottom 30%", // End when section is pushed away
          scrub: true, // Perfectly synchronized with scroll speed
          animation: gsap.to(curtainRef.current, {
            scaleY: 1, // Grow to full height to cover screen
            rotation: 90, // Rotate 90 degrees clockwise to vertical
            ease: "none", // Linear movement to match scroll
          }),
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []); 

  return (
    <div
      ref={sectionRef}
      className="sole-radar relative py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 1), rgba(20, 20, 30, 1))', // Same as discover culture section
        minHeight: '100vh', // Ensure full viewport coverage
      }}
      data-testid="section-sole-radar"
    >
      {/* Background gradient effects - Same as discover culture section */}
      <div className="absolute top-16 bottom-0 left-0 right-0 overflow-hidden">
        {/* Purple/Pink/Blue gradient orbs like discover culture section */}
        <div 
          className="absolute top-32 left-1/4 w-80 h-80 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(to right, #8B5CF6 0%, #EC4899 61%, #06B6D4 100%)',
            filter: 'blur(100px)',
          }}
        />
        <div 
          className="absolute bottom-20 right-1/4 w-60 h-60 rounded-full opacity-15"
          style={{
            background: 'linear-gradient(to right, #06B6D4 0%, #8B5CF6 61%, #EC4899 100%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 rounded-full border border-green-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 rotate-45 border border-orange-500/20"
        animate={{ rotate: [45, 135, 45] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(0, 255, 150, 0.1)',
                border: '1px solid rgba(0, 255, 150, 0.2)',
              }}
            >
              <Compass className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-white">SOLE RADAR AI</span>
            </div>

            {/* Main Title */}
            <div>
              <h2 
                ref={titleRef}
                className="font-bold leading-tight mb-6 text-white"
                style={{ 
                  fontFamily: '"seasonSans", "seasonSans Fallback", "Manrope", "Inter", sans-serif',
                  fontSize: 'calc(4rem * 1.4)', // 1.4 times bigger
                }}
              >
                Smart Style Discovery
              </h2>
              
              <p
                ref={subtitleRef}
                className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl"
              >
                AI-powered personalized sneaker discovery. Advanced algorithms analyze your style,
                preferences, and trends to deliver perfectly curated recommendations.
              </p>
            </div>

            {/* Feature list */}
            <div ref={featuresRef} className="space-y-4">
              {[
                { icon: Compass, title: 'AI Style Matching', desc: 'Advanced analysis of your unique style preferences' },
                { icon: Target, title: 'Smart Recommendations', desc: 'Personalized suggestions based on your history' },
                { icon: Zap, title: 'Instant Discovery', desc: 'Lightning-fast results in under 1 second' }
              ].map((feature, index) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mt-1"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 255, 150, 0.1), rgba(50, 255, 100, 0.1))',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <feature.icon className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1 text-white">{feature.title}</h4>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div ref={buttonRef}>
              <Link href="/discover">
                <button
                  className="group relative px-8 py-4 text-lg font-semibold text-white overflow-hidden rounded-full"
                  style={{
                    background: 'linear-gradient(to right, #00ff96 0%, #32ff64 61%, #ff9650 100%)',
                  }}
                  data-testid="button-start-discovery"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Discovery
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Features Grid Column */}
          <div ref={gridRef} className="relative">
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-8">
              {[
                {
                  icon: Compass,
                  title: "AI Style Matching",
                  description: "Our AI analyzes your preferences and suggests sneakers that match your unique style perfectly."
                },
                {
                  icon: Target,
                  title: "Smart Recommendations",
                  description: "Get personalized sneaker suggestions based on your browsing history and style preferences."
                },
                {
                  icon: Zap,
                  title: "Instant Discovery",
                  description: "Find your perfect sneakers in seconds with our lightning-fast AI algorithm and search."
                },
                {
                  icon: Heart,
                  title: "Style Evolution",
                  description: "Track your style journey and discover new trends that align with your evolving taste."
                }
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="text-center space-y-4"
                  data-testid={`feature-${feature.title.toLowerCase().replace(' ', '-')}`}
                >
                  <div 
                    className="flex items-center justify-center w-16 h-16 mx-auto rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 255, 150, 0.1), rgba(50, 255, 100, 0.1))',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <feature.icon className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Curtain Overlay - Style Quiz background that starts as horizontal bar at bottom */}
      <div
        ref={curtainRef}
        className="fixed pointer-events-none"
        style={{
          backgroundColor: '#000000',
          zIndex: 1000,
          width: '300vw', // Much wider to ensure full coverage when upright
          height: '600vh', // Back to reasonable thickness
          bottom: '0%', // Start at bottom of viewport
          left: '-100vw', // Position further left to cover gaps when vertical
        }}
      />
    </div>
  );
}