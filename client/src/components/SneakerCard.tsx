import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, TrendingUp, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Sneaker {
  id: number;
  name: string;
  slug: string;
  brand?: {
    id: number;
    name: string;
  };
  images: string[];
  retailPrice?: string;
  currentPrice?: string;
  categories?: string[];
  rating?: number;
  reviewCount?: number;
  isWishlisted?: boolean;
}

interface SneakerCardProps {
  sneaker: Sneaker;
  showQuickActions?: boolean;
}

export default function SneakerCard({ sneaker, showQuickActions = true }: SneakerCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(sneaker.isWishlisted || false);

  const addToWishlistMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/user/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user?.getIdToken()}`
        },
        body: JSON.stringify({
          sneakerId: sneaker.id,
          isWishlist: true
        })
      });
      if (!response.ok) throw new Error('Failed to add to wishlist');
      return response.json();
    },
    onSuccess: () => {
      setIsWishlisted(true);
      toast({
        title: "Added to Wishlist",
        description: `${sneaker.name} has been added to your wishlist`
      });
      queryClient.invalidateQueries({ queryKey: ['/api/user/collections'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add to wishlist",
        variant: "destructive"
      });
    }
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/user/collections/${sneaker.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${await user?.getIdToken()}`
        }
      });
      if (!response.ok) throw new Error('Failed to remove from wishlist');
    },
    onSuccess: () => {
      setIsWishlisted(false);
      toast({
        title: "Removed from Wishlist",
        description: `${sneaker.name} has been removed from your wishlist`
      });
      queryClient.invalidateQueries({ queryKey: ['/api/user/collections'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove from wishlist",
        variant: "destructive"
      });
    }
  });

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive"
      });
      return;
    }

    if (isWishlisted) {
      removeFromWishlistMutation.mutate();
    } else {
      addToWishlistMutation.mutate();
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to add items to your collection",
        variant: "destructive"
      });
      return;
    }

    // Quick add to collection logic would go here
    toast({
      title: "Quick Add",
      description: "Feature coming soon!",
    });
  };

  const currentPrice = sneaker.currentPrice || sneaker.retailPrice || '0';
  const retailPrice = sneaker.retailPrice;
  const priceChange = retailPrice && currentPrice 
    ? ((parseFloat(currentPrice) - parseFloat(retailPrice)) / parseFloat(retailPrice)) * 100 
    : 0;

  const imageUrl = sneaker.images?.[0] || "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/sneakers/${sneaker.slug}`}>
        <div className="relative">
          {/* Sneaker Image */}
          <div className="bg-muted/50 rounded-t-lg p-6 aspect-square">
            <img
              src={imageUrl}
              alt={sneaker.name}
              className="w-full h-full object-cover object-center rounded-lg transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Quick Actions Overlay */}
          {showQuickActions && (
            <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={handleWishlistToggle}
                disabled={addToWishlistMutation.isPending || removeFromWishlistMutation.isPending}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={handleQuickAdd}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {/* Price Change Indicator */}
          {priceChange !== 0 && (
            <div className="absolute top-4 left-4">
              <Badge variant={priceChange > 0 ? "default" : "secondary"} className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                {priceChange > 0 ? '+' : ''}{priceChange.toFixed(1)}%
              </Badge>
            </div>
          )}

          {/* New Release Badge */}
          {sneaker.categories?.includes('new-release') && (
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-green-500">New</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          {/* Brand and Rating */}
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {sneaker.brand?.name || 'Unknown Brand'}
            </Badge>
            {sneaker.rating && (
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {sneaker.rating.toFixed(1)}
                  {sneaker.reviewCount && ` (${sneaker.reviewCount})`}
                </span>
              </div>
            )}
          </div>

          {/* Sneaker Name */}
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {sneaker.name}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-lg font-bold text-primary">
                ${currentPrice}
              </span>
              {retailPrice && parseFloat(currentPrice) !== parseFloat(retailPrice) && (
                <span className="text-sm text-muted-foreground line-through">
                  ${retailPrice}
                </span>
              )}
            </div>
          </div>

          {/* Categories */}
          {sneaker.categories && sneaker.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {sneaker.categories.slice(0, 2).map((category) => (
                <Badge key={category} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
              {sneaker.categories.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{sneaker.categories.length - 2}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
