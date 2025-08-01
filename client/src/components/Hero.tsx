import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
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
      <div className="relative z-10 text-white pl-20 sm:pl-24 lg:pl-32 xl:pl-40 pt-20">
        <div className="max-w-2xl">
          <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20 text-xs">
            AI-Powered Sneaker Intelligence
          </Badge>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight" style={{fontFamily: 'Staatliches, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '1px'}}>
            WELCOME TO SOLEGRITHM
          </h1>
          
          <div className="max-w-md">
            <p className="text-xs sm:text-sm md:text-base font-light leading-relaxed mb-6 text-white/90">
              Step into a world where style meets sole, and algorithms decode the culture. 
              Our AI doesn't just predict trends—it discovers the stories behind every drop, 
              every collab, and every grail. Whether you're hunting the latest heat or 
              building your collection, let intelligent curation guide your sneaker journey.  
              <span className="font-medium text-white">Feed the sole, fuel the algorithm.</span>
            </p>
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