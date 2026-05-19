import { FadeInView } from './FadeInView'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <FadeInView className="mb-10 md:mb-12">
      {eyebrow && <p className="text-eyebrow mb-2">{eyebrow}</p>}
      <h1 className="text-section">{title}</h1>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-muted">{subtitle}</p>
      )}
    </FadeInView>
  )
}
