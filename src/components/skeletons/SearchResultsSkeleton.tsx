import { Skeleton } from "../ui/skeleton";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center  justify-between">
        <Skeleton className="w-48  h-6 " />
        <Skeleton className="w-24  h-4 " />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3  gap-6 ">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
