import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cms-cdn.flightclub.com/3000/8b0f7895ebbf-b709-0f11-6485-004b0029.jpg?w=3840"
          alt="Levi's x Air Max 95 OG 'Black Anthracite'"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
        <Badge variant="secondary" className="mb-8 bg-white/10 text-white border-white/20">
          Premium Sneaker Community
        </Badge>
        
        <h1 className="text-hero hero-text mb-8 animate-fade-in">
          SoleGrid
        </h1>
        
        <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up">
          Discover, collect, and trade the world's most coveted sneakers with our AI-powered platform
        </p>

        {/* Minimalistic stats - no buttons as requested */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center animate-fade-in">
            <div className="text-2xl md:text-3xl font-bold mb-2">50K+</div>
            <div className="text-sm text-white/80">Sneakers</div>
          </div>
          <div className="text-center animate-fade-in">
            <div className="text-2xl md:text-3xl font-bold mb-2">15K+</div>
            <div className="text-sm text-white/80">Collectors</div>
          </div>
          <div className="text-center animate-fade-in">
            <div className="text-2xl md:text-3xl font-bold mb-2">25K+</div>
            <div className="text-sm text-white/80">Reviews</div>
          </div>
          <div className="text-center animate-fade-in">
            <div className="text-2xl md:text-3xl font-bold mb-2">500+</div>
            <div className="text-sm text-white/80">Brands</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}