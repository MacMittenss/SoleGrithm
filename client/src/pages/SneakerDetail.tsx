import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

interface Sneaker {
  id: number;
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

  const averageRating = reviews?.length > 0 
    ? reviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / reviews.length 
    : 0;

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
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/live-market">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Live Market
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-muted">
              <img
                src={sneaker.images[selectedImageIndex] || "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop"}
                alt={sneaker.name}
                className="w-full h-96 object-cover"
              />
              {sneaker.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setSelectedImageIndex(
                      selectedImageIndex === 0 ? sneaker.images.length - 1 : selectedImageIndex - 1
                    )}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setSelectedImageIndex(
                      selectedImageIndex === sneaker.images.length - 1 ? 0 : selectedImageIndex + 1
                    )}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            
            {sneaker.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {sneaker.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${sneaker.name} ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {sneaker.categories.map((category: string) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{sneaker.name}</h1>
              <p className="text-lg text-muted-foreground mb-1">{sneaker.colorway}</p>
              <p className="text-sm text-muted-foreground mb-4">SKU: {sneaker.sku}</p>
              
              {/* Pricing Section */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-3xl font-bold">{formatPrice(sneaker.retailPrice)}</span>
                    <p className="text-sm text-muted-foreground">Retail Price</p>
                  </div>
                  {reviews?.length > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= averageRating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                      </span>
                    </div>
                  )}
                </div>

                {/* Live Market Data */}
                {marketLoading ? (
                  <Card className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Loading live market data...</span>
                    </div>
                  </Card>
                ) : liveMarketData ? (
                  <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">Live Market Data</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {liveMarketData.marketData.trend === 'up' ? '📈' : 
                         liveMarketData.marketData.trend === 'down' ? '📉' : '➡️'} 
                        {liveMarketData.marketData.priceChange24h > 0 ? '+' : ''}{liveMarketData.marketData.priceChange24h.toFixed(1)}%
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Market Price</p>
                        <p className="font-bold text-lg">{formatPrice(liveMarketData.marketData.averagePrice || liveMarketData.marketData.lowestPrice)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Lowest Ask</p>
                        <p className="font-semibold">{formatPrice(liveMarketData.marketData.lowestPrice)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Sale</p>
                        <p className="font-semibold">{formatPrice(liveMarketData.sources.stockx?.lastSale || liveMarketData.sources.goat?.lastSale || 0)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Sales</p>
                        <p className="font-semibold">{liveMarketData.marketData.totalSales}</p>
                      </div>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Data from StockX, GOAT • Updated every 5 minutes</span>
                      <div className="flex gap-2">
                        {liveMarketData.sources.stockx && (
                          <Badge variant="outline" className="text-xs">StockX</Badge>
                        )}
                        {liveMarketData.sources.goat && (
                          <Badge variant="outline" className="text-xs">GOAT</Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-4 border-dashed">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">Live market data temporarily unavailable</span>
                    </div>
                  </Card>
                )}
              </div>
            </div>

            {/* Real-Time Size Availability */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Size Availability</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Live data</span>
                </div>
              </div>
              
              {liveMarketData?.sizes && liveMarketData.sizes.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {liveMarketData.sizes.map((sizeData: any) => (
                      <Button
                        key={sizeData.size}
                        variant={selectedSize === sizeData.size ? "default" : "outline"}
                        className={`h-14 flex flex-col p-2 ${
                          !sizeData.available ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => sizeData.available && setSelectedSize(sizeData.size)}
                        disabled={!sizeData.available}
                      >
                        <span className="font-semibold">{sizeData.size}</span>
                        <div className="flex items-center gap-1 text-xs">
                          {sizeData.available ? (
                            <>
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-green-600">{formatPrice(sizeData.price)}</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 text-red-500" />
                              <span className="text-red-600">N/A</span>
                            </>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {sizeData.source.toUpperCase()}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Available for purchase
                      </span>
                      <span className="flex items-center gap-1">
                        <XCircle className="h-3 w-3 text-red-500" />
                        Out of stock
                      </span>
                    </div>
                    <p>Prices and availability update every 5 minutes from StockX and GOAT</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {sneaker.sizes?.map((size: string) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        className="h-12"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    )) || (
                      <div className="col-span-full text-center text-muted-foreground">
                        <p>Size information not available</p>
                      </div>
                    )}
                  </div>
                  {!liveMarketData && (
                    <div className="text-xs text-muted-foreground">
                      <p>Real-time size availability will show when market data loads</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full h-12" 
                disabled={!selectedSize}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Collection
              </Button>
              
              <div className="flex gap-3">
                <Link href="/ar-tryon" className="flex-1">
                  <Button variant="secondary" className="w-full h-10">
                    <Eye className="h-4 w-4 mr-2" />
                    AR Try-On
                  </Button>
                </Link>
                <Button variant="outline" className="flex-1 h-10">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" className="flex-1 h-10">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
              
              {/* Live Market Purchase Links */}
              {liveMarketData?.sources && (
                <div className="pt-3 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Buy Now:</p>
                  <div className="flex gap-2">
                    {liveMarketData.sources.stockx && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={liveMarketData.sources.stockx.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          StockX - {formatPrice(liveMarketData.sources.stockx.lowestAsk)}
                        </a>
                      </Button>
                    )}
                    {liveMarketData.sources.goat && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={liveMarketData.sources.goat.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          GOAT - {formatPrice(liveMarketData.sources.goat.lowestPrice)}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Release Date</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(sneaker.releaseDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Materials</p>
                  <p className="text-xs text-muted-foreground">{sneaker.materials}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="care-tips">Care Tips</TabsTrigger>
            <TabsTrigger value="ai-summary">AI Summary</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews?.length || 0})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {sneaker.description}
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Product Details</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>SKU: {sneaker.sku}</li>
                      <li>Materials: {sneaker.materials}</li>
                      <li>Colorway: {sneaker.colorway}</li>
                      <li>Available Sizes: {sneaker.sizes.join(', ')}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {sneaker.categories.map((category: string) => (
                        <Badge key={category} variant="outline">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="care-tips">
            <SneakerCareTips 
              sneaker={{
                id: sneaker.id,
                name: sneaker.name,
                materials: sneaker.materials,
                colorway: sneaker.colorway,
                brandName: sneaker.brandName
              }}
            />
          </TabsContent>
          
          <TabsContent value="ai-summary">
            <ReviewSummary sneakerId={sneaker.id} sneakerName={sneaker.name} />
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
                          <AvatarFallback>
                            {review.user?.displayName?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{review.user?.displayName || 'Anonymous'}</h4>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                            </span>
                          </div>
                          {review.title && (
                            <h5 className="font-medium mb-2">{review.title}</h5>
                          )}
                          <p className="text-muted-foreground">{review.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No reviews yet. Be the first to review this sneaker!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="shipping">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Free Shipping</h4>
                      <p className="text-sm text-muted-foreground">
                        Free standard shipping on all orders. Expedited shipping available at checkout.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Returns & Exchanges</h4>
                      <p className="text-sm text-muted-foreground">
                        30-day return policy. Items must be in original condition with all tags attached.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Authenticity Guaranteed</h4>
                      <p className="text-sm text-muted-foreground">
                        All sneakers are verified for authenticity before shipping.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}