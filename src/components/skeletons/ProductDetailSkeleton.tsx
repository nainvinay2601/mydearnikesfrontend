import { Skeleton } from "../ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
      {/* Image gallery  */}

      <div className="space-y-4">
        <div className="aspect-square">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>

        <div className="grid grid-cols-4  gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square">
              <Skeleton className="h-full  w-full rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* product info  */}
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-3/4  mb-2" />
          <Skeleton className="h-4 w-1/2  mb-2" />
          <Skeleton className="h-6 w-1/3  mb-4" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="space-y-4">
          <div>
            <Skeleton className=" h-4 w-16 mb-2" />
            <div className="flex space-x-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-10 rounded-md" />
              ))}
            </div>
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
