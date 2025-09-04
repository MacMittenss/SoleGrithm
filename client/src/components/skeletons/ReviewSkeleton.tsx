import { Skeleton } from '@/components/ui/skeleton';

export default function ReviewSkeleton() {
  return (
    <div className="space-y-4 p-4 border rounded-lg" data-testid="review-skeleton">
      {/* Header with avatar and rating */}
      <div className="flex items-center space-x-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded-full" />
            ))}
          </div>
        </div>
      </div>
      
      {/* Review title */}
      <Skeleton className="h-5 w-48" />
      
      {/* Review content */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      
      {/* Date */}
      <Skeleton className="h-3 w-24" />
    </div>
  );
}