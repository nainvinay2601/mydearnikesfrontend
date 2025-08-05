export function PageLoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-background/80 background-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-sm text-muted-foreground">Loading ...</p>
      </div>
    </div>
  );
}
