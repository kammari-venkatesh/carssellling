import { cn } from '@/lib/utils'

export function CarCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-2xl bg-white shadow-card', className)}>
      <div className="skeleton h-48 w-full" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-1/3 rounded" />
        <div className="skeleton h-5 w-2/3 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-8 w-1/3 rounded-full" />
      </div>
    </div>
  )
}

export function CarGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CarCardSkeleton key={i} />
      ))}
    </div>
  )
}
