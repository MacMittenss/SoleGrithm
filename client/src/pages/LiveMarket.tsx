import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import LiveMarketOverview from '@/components/LiveMarketOverview';

export default function LiveMarket() {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <LiveMarketOverview />
      </div>
    </div>
  );
}
