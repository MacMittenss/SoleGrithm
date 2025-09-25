

import MarqueeText from '@/components/advanced/MarqueeText';
import LiveMarketOverview from '@/components/LiveMarketOverview';

export default function LiveMarket() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* GSAP Animated Market Insights Header */}
      <div className="w-full py-8">
        <MarqueeText
          text="Market Insights"
          className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-none bg-gradient-to-r from-[#ff2900] via-[#fe7a60] to-[#581dff] bg-clip-text text-transparent uppercase"
          speed={0.7}
          direction="right"
        />
      </div>

      {/* Market Overview Section (stats, movers, trending, catalog) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LiveMarketOverview />
      </div>
    </div>
  );
}