import { FadeInView } from './FadeInView'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeader({ eyebrow, title, subtitle, align = 'center' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-start'

  return (
    <FadeInView className={`max-w-2xl ${alignClass}`}>
      {eyebrow && <p className="text-eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-section">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">{subtitle}</p>
      )}
    </FadeInView>
  )
}
