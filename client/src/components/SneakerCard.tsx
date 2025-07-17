import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star } from 'lucide-react';
import { Link } from 'wouter';

interface SneakerCardProps {
  sneaker: {
    id: number;
    name: string;
    slug: string;
    brand?: {
      name: string;
    };
    images?: string[];
    retailPrice?: string;
    colorway?: string;
  };
  showWishlist?: boolean;
  onWishlistToggle?: (sneakerId: number) => void;
}

export default function SneakerCard({ 
  sneaker, 
  showWishlist = true, 
  onWishlistToggle 
}: SneakerCardProps) {
  const imageUrl = sneaker.images?.[0] || '/api/placeholder/300/300';
  
  return (
    <Card className="sneaker-card card-hover group overflow-hidden">
      <div className="relative aspect-sneaker overflow-hidden">
        <img 
          src={imageUrl} 
          alt={sneaker.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {showWishlist && (
          <button
            onClick={() => onWishlistToggle?.(sneaker.id)}
            className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-black/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="w-4 h-4" />
          </button>
        )}
        
        {sneaker.retailPrice && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            ${sneaker.retailPrice}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {sneaker.brand?.name || 'Unknown'}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs text-muted-foreground">4.5</span>
            </div>
          </div>
          
          <Link href={`/sneakers/${sneaker.slug}`}>
            <h3 className="font-semibold text-sm hover:text-primary transition-colors cursor-pointer line-clamp-2">
              {sneaker.name}
            </h3>
          </Link>
          
          {sneaker.colorway && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {sneaker.colorway}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}