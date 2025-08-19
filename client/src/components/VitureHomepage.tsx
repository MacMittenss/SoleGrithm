import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Sparkles, Zap } from 'lucide-react';
import { Link } from 'wouter';

// Advanced animation components
import SplitText from './advanced/SplitText';
import GradientText from './advanced/GradientText';
import BlurryGradient from './advanced/BlurryGradient';
import MarqueeText from './advanced/MarqueeText';
import AdvancedPreloader from './advanced/AdvancedPreloader';
import Minimap from './advanced/Minimap';

// Assets
import futuristicSneakerImage from '@assets/transparent-Photoroom_1755556579483.png';
import womenSneakersImage from "@assets/generated_images/Woman_in_stylish_sneakers_90ff70fb.png";
import arTryonImage from "@assets/generated_images/AR_sneaker_try-on_technology_732da862.png";

gsap.registerPlugin(ScrollTrigger);

export default function VitureHomepage() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Minimap sections configuration
  const minimapSections = [
    { id: 'hero', title: 'Hero', progress: 0 },
    { id: 'features', title: 'Features', progress: 0 },
    { id: 'discover', title: 'Discover', progress: 0 },
    { id: 'collections', title: 'Collections', progress: 0 },
    { id: 'community', title: 'Community', progress: 0 }
  ];

  // VITURE-style advanced scroll animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero parallax and scale effects
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(heroRef.current, {
            scale: 1 + progress * 0.1,
            y: progress * 50,
            duration: 0.3,
            ease: "none"
          });
        }
      });

      // Advanced section transitions
      const sections = containerRef.current?.querySelectorAll('[data-section]');
      sections?.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
          onEnter: () => {
            gsap.fromTo(section.querySelectorAll('[data-animate]'), 
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" }
            );
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Advanced Preloader */}
      <AdvancedPreloader
        onComplete={() => setIsLoading(false)}
        duration={2800}
        brandText="SoleGrithm"
      />

      {/* Minimap Navigation */}
      {!isLoading && (
        <Minimap
          sections={minimapSections}
          className="hidden lg:block"
        />
      )}

      <div 
        ref={containerRef}
        className="relative min-h-screen bg-black text-white overflow-hidden"
        style={{
          fontFamily: '"SF Pro Display", "Helvetica Neue", "Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
          fontWeight: 450,
          letterSpacing: '0.02em'
        }}
      >
        {/* Announcement Banner - VITURE Style */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
          <div className="relative h-12 overflow-hidden">
            <MarqueeText
              text="Leading the Way in Sneaker Discovery • Best AI, Best Features • Revolutionary Visual Search • Personalized Collections"
              className="text-sm text-white/80 uppercase tracking-wider"
              speed={0.5}
              direction="left"
            />
          </div>
        </div>

        {/* Hero Section - VITURE Layout */}
        <section 
          ref={heroRef}
          id="hero"
          data-section
          className="relative min-h-screen flex items-center justify-center pt-16"
        >
          {/* Background Gradients */}
          <BlurryGradient
            position="center"
            size="xl"
            colors={['rgba(255, 41, 0, 0.3)', 'rgba(254, 122, 96, 0.2)', 'rgba(88, 29, 255, 0.3)']}
            intensity={150}
            animated={true}
          />

          {/* Main Content Container */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
              
              {/* Left Column - Text Content */}
              <div className="space-y-8" data-animate>
                {/* Main Heading */}
                <div className="space-y-4">
                  <SplitText
                    className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.85] text-white"
                    type="chars"
                    stagger={0.05}
                    delay={0.5}
                  >
                    Next Gen
                  </SplitText>
                  
                  <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.85]">
                    <GradientText
                      gradientFrom="#ff2900"
                      gradientTo="#581dff"
                      illuminateEffect={true}
                      blurIntensity={25}
                      className="inline-block"
                    >
                      Sole
                    </GradientText>
                    <SplitText
                      className="text-white inline-block ml-4"
                      type="chars"
                      stagger={0.03}
                      delay={1.2}
                    >
                      Discovery
                    </SplitText>
                  </div>
                </div>

                {/* Subheading */}
                <div className="pt-8">
                  <SplitText
                    className="text-xl md:text-2xl text-white/80 max-w-lg leading-relaxed"
                    type="words"
                    stagger={0.08}
                    delay={2.0}
                  >
                    Meet the AI-powered sneaker discovery engine. Feed the Sole. Fuel the Algorithm.
                  </SplitText>
                </div>

                {/* Call to Action */}
                <motion.div 
                  className="pt-8 flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 0.8 }}
                >
                  <Link href="/discovery">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-[#ff2900] to-[#581dff] hover:opacity-90 transition-all duration-300 text-white border-0 px-8 py-4 text-lg font-semibold"
                    >
                      Start Discovery
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  
                  <Link href="/visual-search">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                    >
                      Visual Search
                    </Button>
                  </Link>
                </motion.div>

                {/* Features Preview */}
                <motion.div 
                  className="pt-12 grid grid-cols-3 gap-6 max-w-md"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.0, duration: 0.8 }}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Sparkles className="w-6 h-6 text-[#ff2900]" />
                    </div>
                    <p className="text-xs text-white/60 font-medium">AI Matching</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star className="w-6 h-6 text-[#fe7a60]" />
                    </div>
                    <p className="text-xs text-white/60 font-medium">Visual Search</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Zap className="w-6 h-6 text-[#581dff]" />
                    </div>
                    <p className="text-xs text-white/60 font-medium">Live Market</p>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Hero Image */}
              <div className="relative" data-animate>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 1.5, duration: 1.2, ease: "power3.out" }}
                >
                  <img
                    src={futuristicSneakerImage}
                    alt="Next Gen Sneaker Discovery"
                    className="w-full h-auto max-w-lg mx-auto"
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(255, 41, 0, 0.3))' }}
                  />
                  
                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-r from-[#ff2900]/20 to-[#581dff]/20 backdrop-blur-sm"
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-r from-[#581dff]/30 to-[#fe7a60]/30 backdrop-blur-sm"
                    animate={{
                      y: [0, 15, 0],
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <p className="text-xs text-white/60 uppercase tracking-wider">Scroll to explore</p>
              <motion.div
                className="w-6 h-10 border border-white/30 rounded-full flex justify-center"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-3 bg-white/60 rounded-full mt-2"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Features Section - VITURE Style */}
        <section 
          id="features"
          data-section
          className="relative py-32 bg-gradient-to-b from-black to-gray-900"
        >
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <div className="text-center mb-20" data-animate>
              <SplitText
                className="text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-6"
                type="chars"
                stagger={0.03}
              >
                Revolutionary Features
              </SplitText>
              
              <SplitText
                className="text-xl text-white/70 max-w-2xl mx-auto"
                type="words"
                stagger={0.05}
                delay={0.5}
              >
                Experience the future of sneaker discovery with our AI-powered platform
              </SplitText>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 - Visual Search */}
              <motion.div 
                className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#ff2900]/30 transition-all duration-500"
                data-animate
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff2900]/10 to-[#581dff]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#ff2900] to-[#fe7a60] rounded-2xl flex items-center justify-center mb-6">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Visual Search</h3>
                  <p className="text-white/70 mb-6">Upload any sneaker image and find similar styles instantly using our advanced AI recognition.</p>
                  <Link href="/visual-search">
                    <Button variant="ghost" className="text-[#ff2900] hover:bg-[#ff2900]/10 p-0">
                      Try Visual Search <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Feature 2 - AI Collections */}
              <motion.div 
                className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#fe7a60]/30 transition-all duration-500"
                data-animate
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#fe7a60]/10 to-[#581dff]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#fe7a60] to-[#581dff] rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">AI Collections</h3>
                  <p className="text-white/70 mb-6">Curated collections powered by machine learning that adapt to your style preferences.</p>
                  <Link href="/collections">
                    <Button variant="ghost" className="text-[#fe7a60] hover:bg-[#fe7a60]/10 p-0">
                      Explore Collections <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Feature 3 - Live Market */}
              <motion.div 
                className="group relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#581dff]/30 transition-all duration-500"
                data-animate
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#581dff]/10 to-[#ff2900]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#581dff] to-[#ff2900] rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Live Market</h3>
                  <p className="text-white/70 mb-6">Real-time pricing data and market trends from StockX, GOAT, and other major platforms.</p>
                  <Link href="/market">
                    <Button variant="ghost" className="text-[#581dff] hover:bg-[#581dff]/10 p-0">
                      View Market <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Split Hero Sections - Nike Style */}
        <section 
          id="discover"
          data-section
          className="relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            {/* Women in Sneakers */}
            <div className="relative group overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${womenSneakersImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 h-full flex items-end p-12 lg:p-16">
                <div className="space-y-6" data-animate>
                  <SplitText
                    className="text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight"
                    type="chars"
                    stagger={0.03}
                  >
                    Women in Sneakers
                  </SplitText>
                  <SplitText
                    className="text-lg text-white/80 max-w-md"
                    type="words"
                    stagger={0.05}
                    delay={0.5}
                  >
                    Celebrating the powerful voices and unique styles that shape sneaker culture
                  </SplitText>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                  >
                    <Button 
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 transition-all duration-300"
                    >
                      Explore Stories
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* AR Try-On */}
            <div className="relative group overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${arTryonImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 h-full flex items-end p-12 lg:p-16">
                <div className="space-y-6" data-animate>
                  <SplitText
                    className="text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight"
                    type="chars"
                    stagger={0.03}
                  >
                    AR Try-On
                  </SplitText>
                  <SplitText
                    className="text-lg text-white/80 max-w-md"
                    type="words"
                    stagger={0.05}
                    delay={0.5}
                  >
                    Experience sneakers in augmented reality before you buy. See how they look on you.
                  </SplitText>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                  >
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-[#ff2900] to-[#581dff] text-white hover:opacity-90"
                    >
                      Try AR Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Marquee */}
        <div className="py-8 border-t border-white/10">
          <MarqueeText
            text="DISCOVER • COLLECT • ANALYZE • TRADE • AI-POWERED • VISUAL SEARCH • LIVE MARKET • COMMUNITY"
            className="text-sm text-white/40 uppercase tracking-wider"
            speed={0.6}
            direction="right"
          />
        </div>
      </div>
    </>
  );
}