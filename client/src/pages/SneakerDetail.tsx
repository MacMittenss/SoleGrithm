 import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, Heart, Plus, Share2, Star, Calendar, 
  Package, Truck, Shield, ChevronLeft, ChevronRight,
  TrendingUp, DollarSign, Activity, ExternalLink,
  Clock, CheckCircle, XCircle, AlertCircle, Eye
} from "lucide-react";
import { format } from "date-fns";
import ReviewSummary from "@/components/ReviewSummary";
import SneakerCareTips from "@/components/SneakerCareTips";
import MarketDataCard from "@/components/MarketDataCard";
import ProductPriceChart from "@/components/ProductPriceChart";

interface Sneaker {
  name: string;
  slug: string;
  brandId: number;
  brandName?: string;
  description: string;
  images: string[];
  retailPrice: number;
  categories: string[];
  sizes: string[];
  materials: string;
  colorway: string;
  releaseDate: string;
  sku: string;
}

interface Review {
  id: number;
  userId: number;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  user?: {
    displayName: string;
    avatar?: string;
  };
}

interface LiveMarketData {
  id: string;
  name: string;
  brand: string;
  colorway: string;
  releaseDate: string;
  retailPrice: number;
  imageUrl: string;
  sources: {
    stockx?: {
      id: string;
      lowestAsk: number;
      highestBid: number;
      lastSale: number;
      salesCount: number;
      url: string;
    };
    goat?: {
      id: number;
      lowestPrice: number;
      highestOffer: number;
      lastSale: number;
      salesCount: number;
      url: string;
    };
  };
  marketData: {
    averagePrice: number;
    lowestPrice: number;
    highestPrice: number;
    totalSales: number;
    priceChange24h: number;
    trend: 'up' | 'down' | 'stable';
  };
  sizes?: Array<{
    size: string;
    price: number;
    available: boolean;
    source: 'stockx' | 'goat';
  }>;
}

export default function SneakerDetail() {
  const params = useParams();
  const slug = params.slug;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const { data: sneaker, isLoading } = useQuery({
    queryKey: ['/api/sneakers', slug],
    queryFn: async () => {
      const response = await fetch(`/api/sneakers/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch sneaker');
      return response.json();
    },
    enabled: !!slug
  });

  const { data: reviews } = useQuery({
    queryKey: ['/api/sneakers', sneaker?.id, 'reviews'],
    queryFn: async () => {
      const response = await fetch(`/api/sneakers/${sneaker.id}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return response.json();
    },
    enabled: !!sneaker?.id
  });

  // Fetch live market data for this sneaker
  const { data: liveMarketData, isLoading: marketLoading } = useQuery({
    queryKey: ['/api/market/sneaker', sneaker?.name, sneaker?.colorway],
    queryFn: async () => {
      if (!sneaker?.name) return null;
      const params = new URLSearchParams();
      params.append('q', `${sneaker.name} ${sneaker.colorway || ''}`.trim());
      params.append('limit', '1');
      
      const response = await fetch(`/api/market/search?${params}`);
      if (!response.ok) return null;
      const data = await response.json();
      return data.results?.[0] || null;
    },
    enabled: !!sneaker?.name,
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Kicks-like layout toggle: enable for specific slugs or via URL param ?layout=kicks
  // Add the four target slugs here to enable the Kicks-style page permanently for them.
  const KICKS_SLUGS: string[] = [
    'nike-air-force-3-low-sp-nigo-x-levis-olive-grey-hq0262-001',
    'crocs-classic-clog-marvel-spider-man-neo-211489-90h',
    'the-north-face-1996-retro-nuptse-700-fill-packable-jacket-recycled-tnf-black',
    'jordan-4-retro-white-cement-2025-fv5029-100',
  ];

  const urlSearch = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams('');
  const kicksQuery = urlSearch.get('layout') === 'kicks';
  const isKicksVariant = Boolean(sneaker && (kicksQuery || (sneaker.slug && KICKS_SLUGS.includes(sneaker.slug))));

  // Canonical marketplace overrides for specific slugs (useful when provider URLs are missing or incorrect)
  const canonicalMarketplaceUrls: Record<string, { stockx?: string; goat?: string }> = {
    'nike-air-force-3-low-sp-nigo-x-levis-olive-grey-hq0262-001': {
      stockx: 'https://stockx.com/nike-air-force-3-low-sp-nigo-olive-grey',
      goat: 'https://www.goat.com/sneakers/nigo-x-air-force-3-low-olive-grey-hq0262-001',
    },
    'crocs-classic-clog-marvel-spider-man-neo-211489-90h': {
      stockx: 'https://stockx.com/crocs-classic-clog-marvel-spider-man-neo',
      goat: 'https://www.goat.com/sneakers/marvel-x-crocs-classic-clog-spiderman-neo-211489-90h',
    },
    'the-north-face-1996-retro-nuptse-700-fill-packable-jacket-recycled-tnf-black-nf0a3c8dle41nf0a3c8djk3nfoa3c8dle4-mnf0a3c8d4g3nf0a3c8dgoe1nf0a3c8dgoe': {
      stockx: 'https://stockx.com/the-north-face-1996-retro-nuptse-700-fill-packable-jacket-recycled-tnf-black',
      goat: 'https://www.goat.com/apparel/the-north-face-1996-retro-nuptse-jacket-recycled-tnf-black-nf0a3c8d4g3',
    },
    'jordan-4-retro-white-cement-2025-fv5029-100': {
      stockx: 'https://stockx.com/air-jordan-4-retro-white-cement-2025',
      goat: 'https://www.goat.com/sneakers/air-jordan-4-retro-og-white-cement-2025-fv5029-100',
    },
  };

  // A compact Kicks-like detail presentation reusing existing components and typography
  const KicksDetail = () => (
    <div className="min-h-screen pt-20 pb-8 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/live-market">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">{sneaker.brandName}</div>
            <h1 className="text-4xl font-extrabold tracking-tight">{sneaker.name}</h1>
            <div className="text-sm text-muted-foreground">{sneaker.colorway}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Large gallery */}
          <div className="lg:col-span-2">
            <div className="flex gap-6">
              <div className="hidden md:flex flex-col gap-3 w-24">
                {sneaker.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`rounded-lg overflow-hidden border-2 ${selectedImageIndex === idx ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={img} alt={`${sneaker.name} ${idx + 1}`} className="w-24 h-24 object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex-1 rounded-2xl overflow-hidden bg-muted flex items-center justify-center">
                <img src={sneaker.images[selectedImageIndex] || ''} alt={sneaker.name} className="w-full h-[560px] object-contain" />
              </div>
            </div>
          </div>

          {/* Right column: price, buy actions, market card */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-muted rounded-lg">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-3xl font-extrabold">{formatPrice(sneaker.retailPrice)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Released</div>
                  <div className="font-medium">{sneaker.releaseDate ? format(new Date(sneaker.releaseDate), 'MMM dd, yyyy') : '—'}</div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex gap-2">
                  <Button className="flex-1 h-12" disabled={!selectedSize}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Collection
                  </Button>
                  <Button variant="outline" className="h-12">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Buy
                  </Button>
                </div>

                <div className="flex gap-2 relative z-10">
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 cursor-pointer"
                      onClick={() => {
                        const url = liveMarketData?.sources?.stockx?.url ||
                          (sneaker?.slug && canonicalMarketplaceUrls[sneaker.slug]?.stockx) ||
                          `https://stockx.com/search?s=${encodeURIComponent(((sneaker?.name || '') + ' ' + (sneaker?.colorway || '')).trim())}`;
                        console.log('Opening StockX URL:', url);
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      <ExternalLink className="h-3 w-3 mr-1.5" />
                      StockX
                    </button>

                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 cursor-pointer"
                      onClick={() => {
                        const url = liveMarketData?.sources?.goat?.url ||
                          (sneaker?.slug && canonicalMarketplaceUrls[sneaker.slug]?.goat) ||
                          `https://www.goat.com/search?query=${encodeURIComponent(((sneaker?.name || '') + ' ' + (sneaker?.colorway || '')).trim())}`;
                        console.log('Opening GOAT URL:', url);
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      <ExternalLink className="h-3 w-3 mr-1.5" />
                      GOAT
                    </button>
                </div>

                {/* Merged About section */}
                <div className="mt-4 border-t pt-4 text-sm text-muted-foreground space-y-3">
                  <h4 className="font-semibold">About this product</h4>
                  <p>{sneaker.description}</p>

                  <ul className="list-disc ml-5 space-y-1">
                    <li>Original silhouette updated with modern comfort and durable materials.</li>
                    <li>Premium leather and textile upper for a classic look and feel.</li>
                    <li>Comfortable foam midsole with reliable rubber outsole for everyday wear.</li>
                  </ul>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Colorway</p>
                      <div className="font-medium">{sneaker.colorway || '—'}</div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">SKU</p>
                      <div className="font-medium">{sneaker.sku || '—'}</div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Release Date</p>
                      <div className="font-medium">{sneaker.releaseDate ? format(new Date(sneaker.releaseDate), 'MMM dd, yyyy') : '—'}</div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Retail Price</p>
                      <div className="font-medium">{sneaker.retailPrice ? formatPrice(sneaker.retailPrice) : '—'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <MarketDataCard sneakerId={sneaker.id} sneakerName={sneaker.name} size={selectedSize} />
          </aside>
        </div>
      </div>
    </div>
  );

  const averageRating = reviews?.length > 0 
    ? reviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / reviews.length 
    : 0;

  // Previously had an alternate Kicks-style layout for specific slugs.
  // We now use the unified responsive 2x2 layout for all products.

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-muted rounded-lg" />
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-6 bg-muted rounded w-1/4" />
                <div className="h-20 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sneaker) {
    return (
      <div className="min-h-screen pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Sneaker not found</h1>
          <p className="text-muted-foreground mb-8">The sneaker you're looking for doesn't exist.</p>
          <Link href="/live-market">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Live Market
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/live-market">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">{sneaker.brandName}</div>
            <h1 className="text-3xl font-extrabold tracking-tight">{sneaker.name}</h1>
            <div className="text-sm text-muted-foreground">{sneaker.colorway}</div>
          </div>
        </div>

        {/* New 2x2 product layout: TL image, TR product details + external links, BL live market graphs, BR placeholder */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" style={{ gridAutoRows: '1fr' }}>
          {/* Top-left: main image + thumbnails */}
          <div className="h-full">
            <div className="rounded-2xl overflow-hidden bg-white h-full flex items-center justify-center p-8">
              <img
                src={sneaker.images && sneaker.images.length > 0 ? sneaker.images[selectedImageIndex] : 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&h=900&fit=crop'}
                alt={sneaker.name}
                className="w-full h-full object-contain"
              />
            </div>

            {sneaker.images && sneaker.images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {sneaker.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`h-20 w-20 rounded-lg overflow-hidden border-2 ${selectedImageIndex === idx ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={img} alt={`${sneaker.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Top-right: product description and external links */}
          <div className="h-full">
            <div className="p-6 bg-muted rounded-lg space-y-4 h-full flex flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold">{sneaker.name}</h2>
                  <div className="text-sm text-muted-foreground">{sneaker.brandName}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{formatPrice(sneaker.retailPrice)}</div>
                  <div className="text-xs text-muted-foreground">Retail</div>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                  href={
                    (sneaker?.slug && canonicalMarketplaceUrls[sneaker.slug]?.stockx) ||
                    liveMarketData?.sources?.stockx?.url ||
                    `https://stockx.com/search?s=${encodeURIComponent(((sneaker?.name || '') + ' ' + (sneaker?.colorway || '')).trim())}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    const url = e.currentTarget.href;
                    console.log('=== StockX Debug ===');
                    console.log('Full liveMarketData:', liveMarketData);
                    console.log('StockX URL from API:', liveMarketData?.sources?.stockx?.url);
                    console.log('Canonical URL:', canonicalMarketplaceUrls[sneaker.slug]?.stockx);
                    console.log('Sneaker slug:', sneaker.slug);
                    console.log('Final URL:', url);
                    // Force open in new window
                    e.preventDefault();
                    const win = window.open(url, '_blank');
                    if (!win) {
                      console.error('Popup blocked! Trying direct navigation...');
                      window.location.href = url;
                    }
                  }}
                >
                  <ExternalLink className="h-3 w-3 mr-1.5" />
                  StockX
                </a>

                <a
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                  href={
                    (sneaker?.slug && canonicalMarketplaceUrls[sneaker.slug]?.goat) ||
                    liveMarketData?.sources?.goat?.url ||
                    `https://www.goat.com/search?query=${encodeURIComponent(((sneaker?.name || '') + ' ' + (sneaker?.colorway || '')).trim())}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    const url = e.currentTarget.href;
                    console.log('=== GOAT Debug ===');
                    console.log('GOAT URL from API:', liveMarketData?.sources?.goat?.url);
                    console.log('Canonical URL:', canonicalMarketplaceUrls[sneaker.slug]?.goat);
                    console.log('Sneaker slug:', sneaker.slug);
                    console.log('Final URL:', url);
                    // Force open in new window
                    e.preventDefault();
                    const win = window.open(url, '_blank');
                    if (!win) {
                      console.error('Popup blocked! Trying direct navigation...');
                      window.location.href = url;
                    }
                  }}
                >
                  <ExternalLink className="h-3 w-3 mr-1.5" />
                  GOAT
                </a>

                <a
                  className={cn(buttonVariants({ size: 'default' }))}
                  style={{ pointerEvents: 'auto', zIndex: 40 }}
                  href={liveMarketData?.sources?.stockx?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy
                </a>
              </div>

              <div className="text-sm text-muted-foreground leading-relaxed">
                <p>{sneaker.description}</p>
              </div>

              {/* Available Sizes Section */}
              {sneaker.sizes && sneaker.sizes.length > 0 && (
                <div className="pt-3">
                  <p className="text-xs text-muted-foreground mb-2">Available Sizes</p>
                  <div className="flex flex-wrap gap-2">
                    {sneaker.sizes.map((size: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Colorway</p>
                  <div className="font-medium">{sneaker.colorway || '—'}</div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">SKU</p>
                  <div className="font-medium">{sneaker.sku || '—'}</div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Release Date</p>
                  <div className="font-medium">{sneaker.releaseDate ? format(new Date(sneaker.releaseDate), 'MMM dd, yyyy') : '—'}</div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <div className="font-medium">{sneaker.categories && sneaker.categories.length ? sneaker.categories.join(', ') : '—'}</div>
                </div>
              </div>
              {/* push remaining content to bottom if needed */}
              <div className="mt-auto" />
            </div>
          </div>

          {/* Bottom-left: live market data (average price chart) */}
          <div className="h-full">
            <div className="h-full flex flex-col">
              <div className="flex-1">
                <ProductPriceChart sneakerId={sneaker.id} sneakerName={sneaker.name} />
              </div>
            </div>
          </div>

          {/* Bottom-right: empty placeholder for future features */}
          <div className="h-full">
            <Card className="h-full">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-sm text-muted-foreground">Placeholder — additional features coming soon</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs for additional info (kept compact under the fold) */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="market">Live Market</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews?.length || 0})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Product description</h3>
                <div className="text-sm text-muted-foreground space-y-4">
                  <p>{sneaker.description}</p>

                  {/* Available Sizes Section */}
                  {sneaker.sizes && sneaker.sizes.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Available Sizes</h4>
                      <div className="flex flex-wrap gap-2">
                        {sneaker.sizes.map((size: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-primary"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {sneaker.sizes.length} sizes available
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Details</h4>
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        <li>Upper: {sneaker.materials || 'N/A'}</li>
                        <li>Colorway: {sneaker.colorway || 'N/A'}</li>
                        <li>Category: {sneaker.categories && sneaker.categories.length > 0 ? sneaker.categories.join(', ') : 'Footwear'}</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Specifications</h4>
                      <div className="text-sm">
                        <div className="flex justify-between py-1"><span className="text-muted-foreground">Brand</span><span className="font-medium">{sneaker.brandName || '—'}</span></div>
                        <div className="flex justify-between py-1"><span className="text-muted-foreground">SKU</span><span className="font-medium">{sneaker.sku || '—'}</span></div>
                        <div className="flex justify-between py-1"><span className="text-muted-foreground">Release</span><span className="font-medium">{sneaker.releaseDate ? format(new Date(sneaker.releaseDate), 'MMM dd, yyyy') : '—'}</span></div>
                        <div className="flex justify-between py-1"><span className="text-muted-foreground">Retail</span><span className="font-medium">{sneaker.retailPrice ? formatPrice(sneaker.retailPrice) : '—'}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market">
            <MarketDataCard sneakerId={sneaker.id} sneakerName={sneaker.name} size={selectedSize} />
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              {reviews?.length > 0 ? (
                reviews.map((review: Review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.user?.avatar} />
                          <AvatarFallback>{review.user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{review.user?.displayName || 'Anonymous'}</h4>
                            <span className="text-sm text-muted-foreground">{format(new Date(review.createdAt), 'MMM dd, yyyy')}</span>
                          </div>
                          <p className="text-muted-foreground">{review.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No reviews yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="shipping">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Free standard shipping. 30-day returns.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}