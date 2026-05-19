import { cn } from '@/lib/utils'

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-block rounded-full border border-border px-4 py-1 text-[13px] font-medium uppercase tracking-wide text-text-light',
        className,
      )}
    >
      {children}
    </span>
  )
}
