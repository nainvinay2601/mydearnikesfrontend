import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function CategoryCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="aspect-video">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-5 w-2/3 mb-2" />
        <Skeleton className="h-3 w-full" />
      </CardContent>
    </Card>
  );
}
