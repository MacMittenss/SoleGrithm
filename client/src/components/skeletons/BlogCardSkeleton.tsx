import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogCardSkeleton() {
  return (
    <Card className="overflow-hidden" data-testid="blog-card-skeleton">
      <CardContent className="p-0">
        {/* Featured image skeleton */}
        <div className="relative aspect-video overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
        
        {/* Content skeleton */}
        <div className="p-6 space-y-4">
          {/* Category and date */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-24" />
          </div>
          
          {/* Title */}
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          
          {/* Excerpt */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          
          {/* Author and read time */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}