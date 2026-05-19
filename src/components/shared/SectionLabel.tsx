import { cn } from '@/lib/utils'

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('text-eyebrow inline-block', className)}>
      {children}
    </span>
  )
}
