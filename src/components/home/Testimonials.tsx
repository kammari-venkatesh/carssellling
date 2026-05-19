import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'

export function Testimonials() {
  const { t } = useTranslation(['home', 'testimonials'])
  const items = t('testimonials:items', { returnObjects: true }) as { name: string; quote: string; type: string }[]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000)
    return () => clearInterval(timer)
  }, [items.length])

  const item = items[index]

  return (
    <section className="section-y">
      <div className="container-main text-center">
        <SectionLabel>{t('home:testimonials.label')}</SectionLabel>
        <h2 className="text-section-heading mt-5 font-medium">{t('home:testimonials.heading')}</h2>
      </div>

      <div className="container-main relative mx-auto mt-10 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl bg-white px-8 py-10 shadow-card md:px-12 md:py-12"
          >
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-6 text-lg italic leading-relaxed text-text-mid">"{item.quote}"</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-red text-sm font-bold text-white">
                {item.name.split(' ').map((n) => n[0]).join('')}
              </span>
              <div className="text-start">
                <p className="font-semibold text-text-dark">{item.name}</p>
                <span className="rounded-full bg-number-bg px-2.5 py-0.5 text-xs text-text-light">
                  {item.type === 'bought' ? t('home:testimonials.bought') : t('home:testimonials.sold')}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
            aria-label="Previous"
            className="rounded-full border border-border bg-white p-2.5 shadow-card transition hover:shadow-hover"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % items.length)}
            aria-label="Next"
            className="rounded-full border border-border bg-white p-2.5 shadow-card transition hover:shadow-hover"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
