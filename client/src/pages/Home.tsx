import React from 'react';
import AdvancedHero from "@/components/advanced/AdvancedHero";

export default function Home() {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 30, 0.98))',
    }}>
      {/* Hero Section only - testing one component at a time */}
      <AdvancedHero />
      
      {/* Test message to verify this works */}
      <div className="text-center p-8">
        <p className="text-white text-xl">Testing: Hero component loaded</p>
      </div>
    </div>
  );
}