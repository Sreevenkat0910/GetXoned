import { Skeleton } from './ui/skeleton';

export function ProductSkeleton() {
  return (
    <div className="frosted-glass border border-white/30 rounded-sm overflow-hidden h-full">
      {/* Image skeleton */}
      <Skeleton className="aspect-[3/4] w-full" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
