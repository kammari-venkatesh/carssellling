import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { useCar } from '@/context/CarContext'
import { getCarById } from '@/data/mockCars'
import { formatCurrency } from '@/utils/formatCurrency'
import { PillButton } from './PillButton'

export function CompareDrawer() {
  const { t } = useTranslation('common')
  const { compareList, removeFromCompare, clearCompare } = useCar()
  const cars = compareList.map(getCarById).filter(Boolean)

  return (
    <AnimatePresence>
      {compareList.length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 start-0 end-0 z-40 border-t border-border bg-white p-4 shadow-hover md:bottom-16"
        >
          <div className="container-main flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {cars.map((car) => car && (
                <div key={car.id} className="flex items-center gap-2 rounded-xl border border-border p-2">
                  <img src={car.images[0]} alt={car.imageAlt ?? `${car.make} ${car.model}`} className="h-12 w-16 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-semibold text-text-dark">{car.make} {car.model}</p>
                    <p className="text-xs text-accent-red">{formatCurrency(car.price)}</p>
                  </div>
                  <button type="button" onClick={() => removeFromCompare(car.id)} aria-label={t('buttons.remove')}>
                    <X size={14} className="text-text-light" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={clearCompare} className="text-sm text-text-light hover:text-text-dark">
                {t('buttons.clearAll')}
              </button>
              <PillButton to="/compare">{t('buttons.compareNow')} →</PillButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
