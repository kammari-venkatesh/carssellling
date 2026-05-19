import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'

export function SellSteps() {
  const { t } = useTranslation('sell')
  const items = t('steps.items', { returnObjects: true }) as string[]

  return (
    <section className="py-12">
      <div className="container-main">
        <h2 className="text-center font-heading text-2xl font-bold">{t('steps.title')}</h2>
        <ol className="relative mx-auto mt-10 max-w-2xl">
          {items.map((item, i) => (
            <li key={item} className="relative flex gap-4 pb-10 last:pb-0">
              {i < items.length - 1 && (
                <span className="absolute start-[15px] top-8 h-full w-0.5 bg-border" aria-hidden />
              )}
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-red text-white">
                <Check size={16} />
              </span>
              <div className="pt-1">
                <p className="text-xs font-medium uppercase text-text-light">Step {i + 1}</p>
                <p className="mt-0.5 font-medium text-text-dark">{item}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
