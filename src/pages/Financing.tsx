import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
import { EMICalculator } from '@/components/financing/EMICalculator'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { cn } from '@/lib/utils'

const PARTNERS = ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak', 'Bajaj Finserv', 'Tata Capital']

export default function Financing() {
  const { t } = useTranslation('financing')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const options = [
    t('options.newCar', { returnObjects: true }),
    t('options.usedCar', { returnObjects: true }),
    t('options.againstCar', { returnObjects: true }),
  ] as { title: string; desc: string }[]

  const faqItems = t('faq.items', { returnObjects: true }) as { q: string; a: string }[]
  const applySteps = t('apply.steps', { returnObjects: true }) as string[]

  return (
    <>
      <section className="bg-text-dark py-16 text-white">
        <div className="container-main text-center">
          <SectionLabel className="border-white/30 text-white/80">Financing</SectionLabel>
          <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">{t('hero.title')}</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/70">{t('hero.subtitle')}</p>
        </div>
      </section>

      <section className="container-main py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <EMICalculator />
          <div>
            <h2 className="font-heading text-xl font-semibold">{t('apply.title')}</h2>
            <ol className="mt-6 space-y-4">
              {applySteps.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-red text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-text-mid">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-main">
          <h2 className="text-center font-heading text-2xl font-bold">{t('options.title')}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {options.map((opt) => (
              <div key={opt.title} className="rounded-2xl border border-border p-6">
                <h3 className="font-heading font-semibold">{opt.title}</h3>
                <p className="mt-2 text-sm text-text-light">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-main py-16">
        <h2 className="font-heading text-2xl font-bold">{t('faq.title')}</h2>
        <div className="mt-6 space-y-3">
          {faqItems.map((item, i) => (
            <div key={item.q} className="overflow-hidden rounded-2xl border border-border bg-white">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-4 text-start font-medium"
              >
                {item.q}
                <ChevronDown
                  size={20}
                  className={cn('shrink-0 transition-transform', openFaq === i && 'rotate-180')}
                />
              </button>
              {openFaq === i && (
                <div className="border-t border-border px-4 pb-4 pt-2 text-sm text-text-light">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-number-bg py-12">
        <div className="container-main text-center">
          <h2 className="font-heading text-lg font-semibold">{t('partners.title')}</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {PARTNERS.map((name) => (
              <span
                key={name}
                className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-text-mid shadow-card"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
