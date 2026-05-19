import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
    <section className="section-y bg-bg-elevated/50">
      <div className="container-main text-center">
        <SectionLabel>{t('howItWorks.label')}</SectionLabel>
        <h2 className="text-section-heading mt-4">{t('howItWorks.heading')}</h2>

        <div className="mx-auto mt-8 inline-flex max-w-full gap-0.5 rounded-full border border-border-subtle bg-white p-1 shadow-xs">
          {(['buy', 'sell'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                'min-w-[120px] whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-colors',
                mode === m ? 'bg-text-dark text-white' : 'text-text-mid hover:text-text-dark',
              )}
            >
              {t(`howItWorks.${m === 'buy' ? 'buying' : 'selling'}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="container-main mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((step, i) => {
          const Icon = icons[i] || Search
          return (
            <div key={`${mode}-${step.title}`} className="pro-card p-8">
              <span className="text-eyebrow text-accent-red">{String(i + 1).padStart(2, '0')}</span>
              <div className="mt-6 flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated">
                  <Icon className="text-accent-red" size={22} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-text-dark">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-mid">{step.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
