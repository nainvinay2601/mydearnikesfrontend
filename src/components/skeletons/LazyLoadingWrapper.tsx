import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
// This component is designed for the component that might take some time to load , providing a fallback and indicator while the user wait 
export function LazyLoadingWrapper({
  children,
  fallback,
  className,
}: {
  children: React.ReactNode; // element that will be rendered inside the LazyLoadingWrapper
  fallback?: React.ReactNode; // custom loading indicator or fallback content 
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-h-[200px] flex items-center justify-center",
        className
      )}
    >
      {fallback || (
        <div className="animate-pulse">
          <Skeleton className="h-32 w-full" />
        </div>
      )}
      {children}
    </div>
  );
}
