export function MovieCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-muted/20 shadow animate-pulse">
      {/* Image placeholder */}
      <div className="relative">
        <div className="aspect-[2/3] w-full bg-gray-500" />
      </div>
      {/* Content placeholder */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded-md bg-muted/40" />
          <div className="h-3 w-1/2 rounded-md bg-muted/40" />
        </div>
        <div className="h-8 w-full rounded-md bg-muted/40" />
      </div>
    </div>
  );
}

export function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
