import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { useCar } from '@/context/CarContext'
import { getCarById } from '@/data/mockCars'
import { formatCurrency } from '@/utils/formatCurrency'

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
          className="fixed bottom-0 start-0 end-0 z-40 border-t border-border bg-card/95 p-4 backdrop-blur-xl md:bottom-0"
        >
          <div className="container-main flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {cars.map((car) => car && (
                <div key={car.id} className="flex items-center gap-2 rounded-xl border border-border bg-surface p-2">
                  <img src={car.images[0]} alt={car.imageAlt ?? `${car.make} ${car.model}`} className="h-12 w-16 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs font-semibold text-white">{car.make} {car.model}</p>
                    <p className="text-xs text-accent">{formatCurrency(car.price)}</p>
                  </div>
                  <button type="button" onClick={() => removeFromCompare(car.id)} aria-label={t('buttons.remove')}>
                    <X size={14} className="text-text-muted hover:text-white" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={clearCompare} className="text-sm text-text-muted hover:text-white">
                {t('buttons.clearAll')}
              </button>
              <Link to="/compare" className="btn-primary !py-2 !px-4 text-sm">
                {t('buttons.compareNow')}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
