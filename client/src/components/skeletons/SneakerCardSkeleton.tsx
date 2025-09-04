import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function SneakerCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg" data-testid="sneaker-card-skeleton">
      <CardContent className="p-0">
        {/* Image skeleton */}
        <div className="relative aspect-square overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
        
        {/* Content skeleton */}
        <div className="p-4 space-y-3">
          {/* Brand name */}
          <Skeleton className="h-3 w-16" />
          
          {/* Sneaker name */}
          <Skeleton className="h-5 w-32" />
          
          {/* Price and rating */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <div className="flex items-center space-x-1">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}