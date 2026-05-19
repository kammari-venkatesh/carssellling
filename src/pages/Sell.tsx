import { useTranslation } from 'react-i18next'
import { InstantValuation } from '@/components/sell/InstantValuation'
import { SellSteps } from '@/components/sell/SellSteps'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Shield, Banknote, Truck, FileCheck } from 'lucide-react'

const benefitIcons = [Truck, Banknote, Shield, FileCheck]

export default function Sell() {
  const { t } = useTranslation('sell')
  const benefits = t('benefits.items', { returnObjects: true }) as { title: string; desc: string }[]

  return (
    <>
      <section className="bg-text-dark py-16 text-white">
        <div className="container-main text-center">
          <SectionLabel className="border-white/30 text-white/80">{t('valuation.title')}</SectionLabel>
          <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">{t('hero.title')}</h1>
          <p className="mx-auto mt-3 max-w-xl text-white/70">{t('hero.subtitle')}</p>
        </div>
      </section>

      <section className="container-main -mt-8 relative z-10 pb-12">
        <InstantValuation />
      </section>

      <SellSteps />

      <section className="bg-white py-16">
        <div className="container-main">
          <h2 className="text-center font-heading text-2xl font-bold">{t('benefits.title')}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => {
              const Icon = benefitIcons[i] ?? Shield
              return (
                <div key={b.title} className="rounded-2xl border border-border p-6">
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
