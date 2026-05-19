import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { InstantValuation } from './InstantValuation'

export function FloatingValuation() {
  const { t } = useTranslation('sell')
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed end-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-s-xl bg-accent-red px-2 py-6 text-xs font-semibold text-white shadow-hover [writing-mode:vertical-rl] lg:block"
        aria-label={t('hero.cta')}
      >
        {t('hero.cta')}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed end-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-bg-primary p-4 shadow-hover"
            >
              <div className="mb-4 flex justify-end">
                <button onClick={() => setOpen(false)} aria-label="Close">
                  <X size={24} />
                </button>
              </div>
              <InstantValuation />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
