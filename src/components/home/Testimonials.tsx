import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'

export function Testimonials() {
  const { t } = useTranslation(['home', 'testimonials'])
  const items = t('testimonials:items', { returnObjects: true }) as { name: string; quote: string; type: string }[]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), 7000)
    return () => clearInterval(timer)
  }, [items.length])

  const item = items[index]

  return (
    <section className="section-y">
      <div className="container-main text-center">
        <SectionLabel>{t('home:testimonials.label')}</SectionLabel>
        <h2 className="text-section-heading mt-4">{t('home:testimonials.heading')}</h2>
      </div>

      <div className="container-main relative mx-auto mt-10 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pro-card px-8 py-10 md:px-12 md:py-12"
          >
            <div className="flex justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-6 text-lg leading-relaxed text-text-mid md:text-xl">"{item.quote}"</p>
            <div className="mt-8 flex items-center justify-center gap-3 border-t border-border-subtle pt-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-red text-sm font-semibold text-white">
                {item.name.split(' ').map((n) => n[0]).join('')}
              </span>
              <div className="text-start">
                <p className="font-semibold text-text-dark">{item.name}</p>
                <span className="text-xs text-text-light">
                  {item.type === 'bought' ? t('home:testimonials.bought') : t('home:testimonials.sold')}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
            aria-label="Previous"
            className="rounded-lg border border-border-subtle bg-white p-2.5 text-text-mid transition-colors hover:border-text-mid hover:text-text-dark"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % items.length)}
            aria-label="Next"
            className="rounded-lg border border-border-subtle bg-white p-2.5 text-text-mid transition-colors hover:border-text-mid hover:text-text-dark"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
