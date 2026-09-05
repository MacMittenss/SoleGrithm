import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SneakerCard from '@/components/SneakerCard';
import {
  TrendingUp,
  TrendingDown,
  Search,
  ArrowRight,
  Database,
  Activity,
  CheckCircle2,
  RefreshCw,
  BarChart3,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';

gsap.registerPlugin(ScrollTrigger);

// Type definitions
interface MarketOverview {
  totalItems: number;
  topGainers: Array<{
    id: number;
    name: string;
    currentPrice: number;
    priceChange24h: number;
  }>;
  avgPrice: number;
  priceRange: { min: number; max: number };
  topLosers: Array<{
    id: number;
    name: string;
    currentPrice: number;
    priceChange24h: number;
  }>;
  lastUpdated: string;
}

interface TrendingSneaker {
  id: number;
  name: string;
  currentPrice: number;
  priceChange24h: number;
  trend: 'up' | 'down';
  slug?: string;
}

interface Sneaker {
  id: number;
  name: string;
  slug: string;
  retailPrice: number;
  colorway?: string;
  images?: string[];
  brandName?: string;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

const formatChange = (change: number) => `${change > 0 ? '+' : ''}${formatPrice(change)}`;

function DeltaPill({ change }: { change: number }) {
  const up = change >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
        up ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
      }`}
    >
      {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {formatChange(change)}
    </span>
  );
}

const LiveMarketOverview: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const { data: sneakers, isLoading: sneakersLoading } = useQuery<Sneaker[]>({
    queryKey: ['/api/sneakers'],
    queryFn: () => fetch('/api/sneakers').then((res) => res.json()),
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [showFullCatalog, setShowFullCatalog] = useState(false);

  const brands: Array<{ id: number; name: string; slug: string }> = [];

  const { data: overview } = useQuery<MarketOverview>({
    queryKey: ['/api/market/overview'],
    queryFn: () => fetch('/api/market/overview').then((res) => res.json()),
    refetchInterval: 60000,
  });

  const { data: trending } = useQuery<TrendingSneaker[]>({
    queryKey: ['/api/market/trending'],
    queryFn: () => fetch('/api/market/trending?limit=10').then((res) => res.json()),
    refetchInterval: 30000,
  });

  const getTrendColor = (change: number) => (change > 0 ? 'text-green-400' : 'text-red-400');

  // Resolve a real thumbnail/slug for trending entries by cross-referencing the full catalog
  const resolveSneaker = (trendingSneaker: TrendingSneaker) =>
    Array.isArray(sneakers)
      ? sneakers.find((s) => s.id === trendingSneaker.id || s.name === trendingSneaker.name)
      : undefined;

  const stats = [
    {
      label: 'Sneakers Tracked',
      value: sneakers && Array.isArray(sneakers) ? sneakers.length.toLocaleString() : '--',
      icon: Database,
    },
    { label: 'Data Sources', value: '15+', icon: Activity },
    { label: 'Accuracy Rate', value: '99%', icon: CheckCircle2 },
    { label: 'Live Updates', value: '24/7', icon: RefreshCw },
    {
      label: 'Price Range',
      value:
        sneakersLoading || !Array.isArray(sneakers) || sneakers.length === 0
          ? '--'
          : (() => {
              const prices = sneakers.map((s) => s.retailPrice).filter((p) => typeof p === 'number' && p > 0);
              if (prices.length === 0) return '--';
              return `${formatPrice(Math.min(...prices))} - ${formatPrice(Math.max(...prices))}`;
            })(),
      icon: BarChart3,
    },
    {
      label: 'Sentiment',
      value: sneakers && sneakers.length > 0 ? 'Live' : 'Neutral',
      icon: TrendingUp,
    },
  ];

  // Ready flag flips false -> true exactly once real data has loaded, so the
  // scroll-reveal entrance only plays once instead of replaying on every
  // background refetch (trending refetches every 30s, overview every 60s).
  const ready = !!sneakers && !!overview && !!trending;

  useEffect(() => {
    if (!headerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
      });
    }, headerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!ready || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const reveal = (selector: string, vars: gsap.TweenVars = {}) => {
        const el = rootRef.current?.querySelector(selector);
        if (!el) return;
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
          ...vars,
        });
      };

      const staggerReveal = (containerSelector: string, itemSelector: string) => {
        const container = rootRef.current?.querySelector(containerSelector);
        const items = container?.querySelectorAll(itemSelector);
        if (!container || !items || items.length === 0) return;
        gsap.from(items, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: container, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      };

      staggerReveal('.stats-strip', '.stat-tile');
      reveal('.movers-panel-gainers');
      reveal('.movers-panel-losers', { delay: 0.1 });
      staggerReveal('.trending-grid', '.trending-card');
      reveal('.catalog-panel');
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <div ref={rootRef} className="space-y-16 sm:space-y-20">
      {/* Header */}
      <div ref={headerRef} className="space-y-4 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Live Market Intelligence
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
          Real-time sneaker <span className="gradient-text-primary">market data</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-400">
          Live pricing, trends, and catalog data pulled from every major sneaker marketplace.
        </p>
      </div>

      {/* Stats strip */}
      <div className="stats-strip grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="stat-tile glass-dark rounded-xl p-4 sm:p-5">
              <Icon className="w-4 h-4 text-gray-400 mb-3" />
              <div className="text-xl sm:text-2xl font-bold leading-tight">{stat.value}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Market Movers */}
      {overview && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Top Movers (24H)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="movers-panel-gainers glass-dark rounded-xl p-6">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">Top Gainers</h3>
              <div className="space-y-1">
                {overview.topGainers.slice(0, 5).map((gainer, index) => (
                  <div
                    key={gainer.id}
                    className="flex items-center justify-between py-3 border-b border-white/5 last:border-b-0"
                    data-testid={`gainer-${index}`}
                  >
                    <div className="min-w-0 pr-3">
                      <p className="font-medium text-sm truncate">{gainer.name}</p>
                      <p className="text-xs text-gray-400">{formatPrice(gainer.currentPrice)}</p>
                    </div>
                    <DeltaPill change={Math.abs(gainer.priceChange24h)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="movers-panel-losers glass-dark rounded-xl p-6">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">Top Losers</h3>
              <div className="space-y-1">
                {overview.topLosers.slice(0, 5).map((loser, index) => (
                  <div
                    key={loser.id}
                    className="flex items-center justify-between py-3 border-b border-white/5 last:border-b-0"
                    data-testid={`loser-${index}`}
                  >
                    <div className="min-w-0 pr-3">
                      <p className="font-medium text-sm truncate">{loser.name}</p>
                      <p className="text-xs text-gray-400">{formatPrice(loser.currentPrice)}</p>
                    </div>
                    <DeltaPill change={-Math.abs(loser.priceChange24h)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trending */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Trending Now</h2>

        {trending && trending.length > 0 ? (
          <div className="trending-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trending.slice(0, 6).map((sneaker, index) => {
              const resolved = resolveSneaker(sneaker);
              const thumb = resolved?.images?.[0];
              const href = resolved?.slug ?? sneaker.slug ?? String(sneaker.id);
              return (
                <Link key={sneaker.id} href={`/sneakers/${href}`}>
                  <div
                    className="trending-card glass-dark rounded-xl p-4 flex items-center gap-4 group cursor-pointer hover:border-white/20 transition-colors"
                    data-testid={`trending-sneaker-${index}`}
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt={sneaker.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          #{index + 1}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        #{index + 1} Trending
                      </p>
                      <h4 className="font-medium truncate">{sneaker.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold">{formatPrice(sneaker.currentPrice)}</span>
                        <span className={`text-xs font-medium ${getTrendColor(sneaker.priceChange24h)}`}>
                          {formatChange(sneaker.priceChange24h)}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">No trending data available</div>
        )}
      </div>

      {/* Catalog */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Explore Catalog</h2>

        <div className="catalog-panel glass-dark rounded-xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search sneakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black border-white/10 placeholder:text-gray-500"
                data-testid="catalog-search"
              />
            </div>

            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="bg-black border-white/10" data-testid="brand-filter">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands?.map((brand) => (
                  <SelectItem key={brand.id} value={brand.slug}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={() => setShowFullCatalog(!showFullCatalog)}
              className="bg-white text-black hover:bg-gray-200 font-medium uppercase tracking-wider"
              data-testid="browse-catalog"
            >
              {showFullCatalog ? 'Hide Catalog' : 'Browse Catalog'}
            </Button>
          </div>

          {!showFullCatalog && Array.isArray(sneakers) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {sneakers.slice(0, 4).map((sneaker) => (
                <SneakerCard
                  key={sneaker.id}
                  sneaker={{
                    id: sneaker.id,
                    name: sneaker.name,
                    brand: sneaker.brandName || 'Unknown',
                    price: formatPrice(sneaker.retailPrice),
                    imageUrl: sneaker.images?.[0] || 'https://images.unsplash.com/photo-1551107696-a4b537c892cc',
                    slug: sneaker.slug,
                    brandName: sneaker.brandName,
                    images: sneaker.images,
                    retailPrice: sneaker.retailPrice,
                    colorway: sneaker.colorway,
                  }}
                />
              ))}
            </div>
          )}

          {showFullCatalog && (
            <div className="space-y-6">
              {sneakersLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-48 bg-white/5 rounded-xl mb-4" />
                      <div className="h-4 bg-white/5 rounded mb-2" />
                      <div className="h-3 bg-white/5 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sneakers?.map((sneaker) => (
                    <SneakerCard
                      key={sneaker.id}
                      sneaker={{
                        id: sneaker.id,
                        name: sneaker.name,
                        brand: sneaker.brandName || 'Unknown',
                        price: formatPrice(sneaker.retailPrice),
                        imageUrl: sneaker.images?.[0] || 'https://images.unsplash.com/photo-1551107696-a4b537c892cc',
                        slug: sneaker.slug,
                        brandName: sneaker.brandName,
                        images: sneaker.images,
                        retailPrice: sneaker.retailPrice,
                        colorway: sneaker.colorway,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer note */}
      {overview && (
        <div className="text-center text-sm text-gray-400">
          Last updated: {new Date(overview.lastUpdated).toLocaleTimeString()} • Data refreshes automatically
        </div>
      )}
    </div>
  );
};

export default LiveMarketOverview;
