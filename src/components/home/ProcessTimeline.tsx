import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Car, Truck, Calculator, ClipboardCheck, Banknote } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { LucideIcon } from 'lucide-react'

const BUY_STEPS: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  { num: '01', title: 'Browse Inventory', desc: 'Explore 50+ verified premium vehicles with AI-powered recommendations.', icon: Search },
  { num: '02', title: 'Book Test Drive', desc: 'Schedule a test drive at our hub or request doorstep experience.', icon: Car },
  { num: '03', title: 'Doorstep Delivery', desc: 'Complete paperwork online and receive your car at your doorstep.', icon: Truck },
]

const SELL_STEPS: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  { num: '01', title: 'Get Car Valuation', desc: 'AI-powered instant valuation based on 10,000+ market data points.', icon: Calculator },
  { num: '02', title: 'Book Inspection', desc: 'Free 200-point inspection at your home by certified experts.', icon: ClipboardCheck },
  { num: '03', title: 'Instant Payment', desc: 'Receive payment within 24 hours directly to your bank account.', icon: Banknote },
]

export function ProcessTimeline() {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy')
  const steps = mode === 'buy' ? BUY_STEPS : SELL_STEPS

  return (
    <section className="section-pad bg-surface/80">
      <div className="container-main">
        <SectionHeader
          eyebrow="How It Works"
          title="Simple. Fast. Premium."
          subtitle="Whether buying or selling, we handle the complexity so you don't have to."
        />

        <div className="mx-auto mt-10 flex w-fit gap-1 rounded-full border border-border bg-card p-1">
          {(['buy', 'sell'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`relative rounded-full px-8 py-2.5 text-sm font-semibold capitalize ${
                mode === m ? 'text-white' : 'text-text-muted'
              }`}
            >
              {mode === m && (
                <motion.div layoutId="process-tab" className="absolute inset-0 rounded-full bg-accent" />
              )}
              <span className="relative z-10">{m === 'buy' ? 'Buy a Car' : 'Sell a Car'}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative mt-14 grid gap-6 md:grid-cols-3"
          >
            <div className="pointer-events-none absolute top-16 hidden h-px bg-gradient-to-r from-accent/60 via-accent-2/40 to-transparent md:block md:w-[calc(100%-8rem)] md:start-16" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden rounded-[24px] border border-border bg-gradient-to-b from-card to-surface p-8"
              >
                <span className="text-4xl font-black text-white/10">{step.num}</span>
                <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2">
                  <step.icon size={26} className="text-white" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
