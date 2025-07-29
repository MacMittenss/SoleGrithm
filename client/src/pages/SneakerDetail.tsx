import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, Heart, Plus, Share2, Star, Calendar, 
  Package, Truck, Shield, ChevronLeft, ChevronRight 
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
          <Link href="/catalog">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Catalog
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
        <Link href="/catalog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Catalog
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
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold">{formatPrice(sneaker.retailPrice)}</span>
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
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold">Select Size</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {sneaker.sizes.map((size: string) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className="h-12"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
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
                <Button variant="outline" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
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