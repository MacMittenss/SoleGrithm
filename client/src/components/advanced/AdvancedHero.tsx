import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function AdvancedHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Simple fade-in animation for hero content
        const elements = heroRef.current?.querySelectorAll('.hero-content > *');
        if (elements) {
          gsap.fromTo(elements, {
            opacity: 0,
            y: 30,
          }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
          });
        }
      });
      
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-white flex items-center justify-center px-4"
      data-testid="hero-section"
    >
      {/* Clean grid background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Hero Content */}
      <div className="hero-content template-container text-center space-y-8 relative z-10">
        {/* Welcome Text */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 tracking-wider uppercase">
            Welcome
          </p>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black leading-none tracking-tight">
            SOLEGRITHM
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover, Collect, and Connect Through AI-Powered Sneaker Intelligence
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Link href="/live-market">
            <button className="group inline-flex items-center justify-center w-16 h-16 bg-black rounded-full hover:bg-gray-800 transition-colors">
              <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
        </div>
      </div>

      {/* Minimal decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-black rounded-full opacity-20"></div>
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-gray-400 rounded-full opacity-30"></div>
      <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-black rounded-full opacity-15"></div>
    </section>
  );
}