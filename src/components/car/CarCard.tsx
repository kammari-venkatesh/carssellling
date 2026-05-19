import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Car } from '@/types/car'
import { formatCurrency } from '@/utils/formatCurrency'
import { useCar } from '@/context/CarContext'
import { useToast } from '@/components/shared/ToastProvider'
import { CarImage } from '@/components/shared/CarImage'
import { cn } from '@/lib/utils'
import { PillButton } from '@/components/shared/PillButton'

interface CarCardProps {
  car: Car
  listView?: boolean
  showCompare?: boolean
}

const statusClass: Record<string, string> = {
  'In Stock': 'status-in-stock',
  'On Order': 'status-on-order',
  'On the Way': 'status-on-the-way',
}

function CarCardComponent({ car, listView, showCompare = true }: CarCardProps) {
  const { t } = useTranslation(['common', 'buy'])
  const { toggleWishlist, isInWishlist, addToCompare, isInCompare, removeFromCompare } = useCar()
  const { toast } = useToast()
  const wished = isInWishlist(car.id)
  const compared = isInCompare(car.id)
  const alt = car.imageAlt ?? `${car.make} ${car.model} ${car.year}`

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(car.id)
    toast(wished ? t('common:toast.wishlistRemove') : t('common:toast.wishlistAdd'))
  }

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (compared) {
      removeFromCompare(car.id)
      toast(t('common:toast.compareRemove'))
    } else {
      const ok = addToCompare(car.id)
      toast(ok ? t('common:toast.compareAdd') : t('common:toast.compareMax'), ok ? 'success' : 'error')
    }
  }

  if (listView) {
    return (
      <motion.article
        whileHover={{ y: -2 }}
        className="flex gap-5 overflow-hidden rounded-2xl bg-white p-4 shadow-card transition-shadow hover:shadow-hover"
      >
        <Link to={`/car/${car.id}`} className="w-48 shrink-0 overflow-hidden rounded-xl">
          <CarImage src={car.images[0]} alt={alt} />
        </Link>
        <div className="flex flex-1 flex-col justify-between py-1">
          <div>
            <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', statusClass[car.status])}>{car.status}</span>
            <Link to={`/car/${car.id}`}>
              <h3 className="mt-2 font-heading text-lg font-semibold text-text-dark hover:text-accent-red">{car.make} {car.model}</h3>
            </Link>
            <p className="mt-1 text-sm text-text-light">{car.year} · {car.km.toLocaleString()} km · {car.fuel}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-accent-red">{formatCurrency(car.price)}</span>
            <div className="flex gap-2">
              <button type="button" onClick={handleWishlist} aria-label="Wishlist">
                <Heart size={20} className={wished ? 'fill-accent-red text-accent-red' : 'text-text-light'} />
              </button>
              <PillButton to={`/car/${car.id}`} size="sm">{t('common:buttons.viewDetails')}</PillButton>
            </div>
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-hover"
    >
      <Link to={`/car/${car.id}`} className="relative block">
        <CarImage src={car.images[0]} alt={alt} className="rounded-t-2xl" />
        <span className="absolute start-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold text-text-dark shadow-sm">
          {car.make}
        </span>
        {showCompare && (
          <button
            type="button"
            onClick={handleCompare}
            className={cn(
              'absolute end-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm transition',
              compared ? 'bg-accent-red text-white' : 'bg-white/95 text-text-mid',
            )}
          >
            {t('buy:compare')}
          </button>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <span className={cn('w-fit rounded-full px-2.5 py-0.5 text-xs font-medium', statusClass[car.status])}>{car.status}</span>
        <Link to={`/car/${car.id}`}>
          <h3 className="mt-2 font-heading text-base font-semibold text-text-dark hover:text-accent-red">{car.make} {car.model}</h3>
        </Link>
        <p className="mt-1 text-sm text-text-light">{car.year} · {car.km.toLocaleString()} km · {car.fuel}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-semibold text-accent-red">{formatCurrency(car.price)}</span>
          <button type="button" onClick={handleWishlist} aria-label="Wishlist">
            <Heart size={20} className={wished ? 'fill-accent-red text-accent-red' : 'text-text-light'} />
          </button>
        </div>
        <PillButton to={`/car/${car.id}`} size="sm" className="mt-4 w-full justify-center">
          {t('common:buttons.viewDetails')}
        </PillButton>
      </div>
    </motion.article>
  )
}

export const CarCard = memo(CarCardComponent)
