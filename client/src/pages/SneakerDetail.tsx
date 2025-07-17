import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, Share2, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import ReviewForm from "@/components/ReviewForm";
import PriceChart from "@/components/PriceChart";

export default function SneakerDetail() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSize, setSelectedSize] = useState<string>("");

  const { data: sneaker, isLoading } = useQuery({
    queryKey: [`/api/sneakers/${slug}`],
    queryFn: async () => {
      const response = await fetch(`/api/sneakers/${slug}`);
      if (!response.ok) throw new Error('Sneaker not found');
      return response.json();
    }
  });

  const { data: reviews } = useQuery({
    queryKey: [`/api/sneakers/${sneaker?.id}/reviews`],
    queryFn: async () => {
      const response = await fetch(`/api/sneakers/${sneaker.id}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return response.json();
    },
    enabled: !!sneaker
  });

  const { data: priceHistory } = useQuery({
    queryKey: [`/api/sneakers/${sneaker?.id}/prices`, selectedSize],
    queryFn: async () => {
      const params = selectedSize ? `?size=${selectedSize}` : '';
      const response = await fetch(`/api/sneakers/${sneaker.id}/prices${params}`);
      if (!response.ok) throw new Error('Failed to fetch price history');
      return response.json();
    },
    enabled: !!sneaker
  });

  const addToCollectionMutation = useMutation({
    mutationFn: async ({ isWishlist }: { isWishlist: boolean }) => {
      const response = await fetch('/api/user/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user?.getIdToken()}`
        },
        body: JSON.stringify({
          sneakerId: sneaker.id,
          size: selectedSize,
          isWishlist
        })
      });
      if (!response.ok) throw new Error('Failed to add to collection');
      return response.json();
    },
    onSuccess: (_, { isWishlist }) => {
      toast({
        title: "Success",
        description: `Added to ${isWishlist ? 'wishlist' : 'collection'}!`
      });
      queryClient.invalidateQueries({ queryKey: ['/api/user/collections'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add to collection",
        variant: "destructive"
      });
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-muted rounded-2xl h-96"></div>
              <div className="space-y-6">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-12 bg-muted rounded w-full"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sneaker) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sneaker Not Found</h1>
          <p className="text-muted-foreground">The sneaker you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const averageRating = reviews?.length > 0 
    ? reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / reviews.length 
    : 0;

  const currentPrice = priceHistory?.[0]?.price || sneaker.retailPrice;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="bg-muted rounded-2xl p-8">
              <img
                src={sneaker.images?.[0] || "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"}
                alt={sneaker.name}
                className="w-full h-96 object-cover object-center rounded-xl"
              />
            </div>
            {sneaker.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {sneaker.images.slice(1, 5).map((image: string, index: number) => (
                  <div key={index} className="bg-muted rounded-lg p-2">
                    <img
                      src={image}
                      alt={`${sneaker.name} view ${index + 2}`}
                      className="w-full h-20 object-cover object-center rounded"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {sneaker.brand?.name || 'Unknown Brand'}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{sneaker.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{averageRating.toFixed(1)}</span>
                  <span className="text-muted-foreground">({reviews?.length || 0} reviews)</span>
                </div>
              </div>
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-bold text-primary">${currentPrice}</span>
                {sneaker.retailPrice && parseFloat(currentPrice) !== parseFloat(sneaker.retailPrice) && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${sneaker.retailPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            {sneaker.sizes?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {sneaker.sizes.map((size: string) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="h-12"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {user && (
                <>
                  <Button
                    onClick={() => addToCollectionMutation.mutate({ isWishlist: false })}
                    disabled={addToCollectionMutation.isPending || !selectedSize}
                    className="w-full"
                    size="lg"
                  >
                    Add to Collection
                  </Button>
                  <Button
                    onClick={() => addToCollectionMutation.mutate({ isWishlist: true })}
                    disabled={addToCollectionMutation.isPending}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Wishlist
                  </Button>
                </>
              )}
              <Button variant="outline" className="w-full" size="lg">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Release Date</div>
                  <div className="font-semibold">
                    {sneaker.releaseDate 
                      ? new Date(sneaker.releaseDate).toLocaleDateString() 
                      : 'TBA'
                    }
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm text-muted-foreground">Retail Price</div>
                  <div className="font-semibold">${sneaker.retailPrice || 'N/A'}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews?.length || 0})</TabsTrigger>
            <TabsTrigger value="prices">Price History</TabsTrigger>
            <TabsTrigger value="similar">Similar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {sneaker.description || 'No description available for this sneaker.'}
                </p>
              </CardContent>
            </Card>

            {sneaker.materials && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Materials</h3>
                  <p className="text-muted-foreground">{sneaker.materials}</p>
                </CardContent>
              </Card>
            )}

            {sneaker.categories?.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {sneaker.categories.map((category: string) => (
                      <Badge key={category} variant="secondary">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            {user && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Write a Review</h3>
                  <ReviewForm sneakerId={sneaker.id} />
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {reviews?.length > 0 ? (
                reviews.map((review: any) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold">{review.user?.displayName || 'Anonymous'}</span>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      {review.title && (
                        <h4 className="font-semibold mb-2">{review.title}</h4>
                      )}
                      <p className="text-muted-foreground">{review.content}</p>
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

          <TabsContent value="prices" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Price History</h3>
                {priceHistory?.length > 0 ? (
                  <PriceChart data={priceHistory} />
                ) : (
                  <p className="text-muted-foreground">No price history available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="similar" className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Similar sneakers feature coming soon!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
