import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Fuel, Gauge, Settings2, Sparkles } from 'lucide-react'
import type { Car } from '@/types/car'
import { formatCurrency, formatPriceShort } from '@/utils/formatCurrency'
import { estimateMonthlyEMI } from '@/utils/calculateEMI'
import { useCar } from '@/context/CarContext'
import { cn } from '@/lib/utils'

interface PremiumCarCardProps {
  car: Car
}

function PremiumCarCardComponent({ car }: PremiumCarCardProps) {
  const { toggleWishlist, isInWishlist } = useCar()
  const wished = isInWishlist(car.id)
  const emi = estimateMonthlyEMI(car.price)
  const alt = car.imageAlt ?? `${car.make} ${car.model}`

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group premium-card overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={car.images[0]}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />

        <button
          type="button"
          onClick={(e) => { e.preventDefault(); toggleWishlist(car.id) }}
          className="absolute end-3 top-3 flex h-10 w-10 items-center justify-center rounded-full glass transition-colors hover:bg-accent/20"
          aria-label="Wishlist"
        >
          <Heart size={18} className={cn(wished ? 'fill-accent text-accent' : 'text-white')} />
        </button>

        {car.condition === 'Certified Pre-Owned' && (
          <span className="absolute start-3 top-3 flex items-center gap-1 rounded-full bg-accent/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            <Sparkles size={12} />
            Certified
          </span>
        )}

        {car.badges.includes('Top Pick') && (
          <span className="absolute start-3 bottom-3 flex items-center gap-1 rounded-full border border-accent-2/50 bg-accent-2/20 px-2.5 py-1 text-[10px] font-semibold text-accent-2 backdrop-blur-sm">
            <Sparkles size={10} />
            AI Priced
          </span>
        )}
      </div>

      <div className="p-5">
        <Link to={`/car/${car.id}`}>
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-accent">
            {car.make} {car.model}
          </h3>
        </Link>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-bold text-white">{formatPriceShort(car.price)}</span>
          {car.originalPrice && (
            <span className="text-sm text-text-muted line-through">{formatPriceShort(car.originalPrice)}</span>
          )}
        </div>
        <p className="mt-1 text-sm text-accent-2">EMI from {formatCurrency(emi)}/mo</p>

        <div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-4 text-xs text-text-muted">
          <span className="flex items-center gap-1"><Fuel size={14} /> {car.fuel}</span>
          <span className="flex items-center gap-1"><Settings2 size={14} /> {car.transmission}</span>
          <span className="flex items-center gap-1"><Gauge size={14} /> {(car.km / 1000).toFixed(0)}k km</span>
        </div>

        <Link
          to={`/car/${car.id}`}
          className="mt-4 flex w-full items-center justify-center rounded-xl border border-border bg-white/5 py-3 text-sm font-semibold text-white transition-all group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  )
}

export const PremiumCarCard = memo(PremiumCarCardComponent)
