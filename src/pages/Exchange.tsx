import { useTranslation } from 'react-i18next'
import { ExchangeCalculator } from '@/components/exchange/ExchangeCalculator'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { RefreshCw, Scale, CreditCard } from 'lucide-react'

const icons = [RefreshCw, Scale, CreditCard]

export default function Exchange() {
  const { t } = useTranslation('exchange')
  const processSteps = t('process.steps', { returnObjects: true }) as string[]
  const benefits = t('benefits.items', { returnObjects: true }) as { title: string; desc: string }[]

  return (
    <>
      <section className="bg-text-dark py-16 text-white">
        <div className="container-main text-center">
          <SectionLabel className="border-white/30 text-white/80">Exchange</SectionLabel>
          <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">{t('hero.title')}</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/70">{t('hero.subtitle')}</p>
        </div>
      </section>

      <section className="container-main py-12">
        <ExchangeCalculator />
      </section>

      <section className="bg-white py-16">
        <div className="container-main">
          <h2 className="text-center font-heading text-2xl font-bold">{t('process.title')}</h2>
          <ol className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            {processSteps.map((step, i) => (
              <li key={step} className="flex gap-3 rounded-2xl border border-border p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-red text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm text-text-mid">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16">
        <div className="container-main">
          <h2 className="text-center font-heading text-2xl font-bold">{t('benefits.title')}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => {
              const Icon = icons[i] ?? RefreshCw
              return (
                <div key={b.title} className="rounded-2xl bg-white p-6 shadow-card">
                  <Icon className="text-accent-red" size={28} />
                  <h3 className="mt-4 font-heading font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-text-light">{b.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
