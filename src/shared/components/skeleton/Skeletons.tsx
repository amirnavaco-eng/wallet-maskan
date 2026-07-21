export function CardSkeleton() {
  return (
    <div className="skeleton h-48 w-full rounded-xl3" role="status" aria-label="در حال بارگذاری کارت" />
  );
}

export function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="skeleton h-10 w-10 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3 w-2/3 rounded-full" />
        <div className="skeleton h-3 w-1/3 rounded-full" />
      </div>
      <div className="skeleton h-4 w-16 rounded-full" />
    </div>
  );
}

export function BlockSkeleton({ className = "h-24" }: { className?: string }) {
  return <div className={`skeleton w-full rounded-xl2 ${className}`} role="status" />;
}
