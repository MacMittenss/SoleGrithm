import React from 'react';
import SoleRadarSection from '@/components/advanced/SoleRadarSection';

export default function CurtainTest() {
  return (
    <div className="min-h-screen">
      {/* Simple content to scroll through */}
      <section className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Scroll Down to Test Curtain</h1>
          <p className="text-xl">This section comes before Sole Radar</p>
        </div>
      </section>

      {/* Sole Radar Section with Curtain Animation */}
      <SoleRadarSection />

      {/* Content after curtain */}
      <section className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Style Quiz Section</h2>
          <p className="text-xl">This content appears after the curtain covers the screen</p>
        </div>
      </section>
    </div>
  );
}