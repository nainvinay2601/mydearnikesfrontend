import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="aspect-square">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2 mb-3" />
        <Skeleton className="h-6 w-1/3 " />
      </CardContent>
    </Card>
  );
}
