import { Skeleton } from "../ui/skeleton";

export function CardItemSkeleton() {
  return (
    <div className="flex item-center space-x-4 py-4">
      <Skeleton className="h-16  w-16  rounded-md" />

      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}
