import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  id?: string
  panel?: boolean
}

export function Section({ children, className, containerClassName, id, panel }: SectionProps) {
  return (
    <section id={id} className={cn('section-y', className)}>
      <div className={cn('container-main', containerClassName)}>
        {panel ? (
          <div className="rounded-3xl bg-white p-6 shadow-card md:p-10">{children}</div>
        ) : (
          children
        )}
      </div>
    </section>
  )
}
