import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Search, ClipboardCheck, Car, Calculator, Banknote } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { cn } from '@/lib/utils'

const BUY_ICONS = [Search, ClipboardCheck, Car]
const SELL_ICONS = [Calculator, ClipboardCheck, Banknote]

export function HowItWorks() {
  const { t } = useTranslation('home')
  const [mode, setMode] = useState<'buy' | 'sell'>('buy')

  const buySteps = t('howItWorks.buySteps', { returnObjects: true }) as { title: string; desc: string }[]
  const sellSteps = t('howItWorks.sellSteps', { returnObjects: true }) as { title: string; desc: string }[]
  const steps = mode === 'buy' ? buySteps : sellSteps
  const icons = mode === 'buy' ? BUY_ICONS : SELL_ICONS

  return (
    <section className="section-y">
      <div className="container-main text-center">
        <SectionLabel>{t('howItWorks.label')}</SectionLabel>
        <h2 className="text-section-heading mt-5 font-medium">{t('howItWorks.heading')}</h2>

        <div className="mx-auto mt-8 inline-flex max-w-full gap-1 rounded-full border border-border bg-white p-1">
          {(['buy', 'sell'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                'min-w-[120px] whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-medium transition-all',
                mode === m ? 'bg-text-dark text-white' : 'text-text-mid hover:text-text-dark',
              )}
            >
              {t(`howItWorks.${m === 'buy' ? 'buying' : 'selling'}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="container-main mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = icons[i] || Search
          return (
            <motion.div
              key={`${mode}-${step.title}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-2xl bg-white p-8 shadow-card"
            >
              <span className="absolute start-6 top-6 text-5xl font-light text-accent-red/20">{i + 1}</span>
              <div className="relative flex flex-col items-center pt-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-number-bg">
                  <Icon className="text-accent-red" size={28} />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-text-dark">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-mid">{step.desc}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
