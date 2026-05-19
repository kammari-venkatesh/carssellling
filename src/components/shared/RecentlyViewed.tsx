import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { mockCars } from '@/data/mockCars'

const STORAGE_KEY = 'ax_recently_viewed'

export function RecentlyViewed() {
  const [ids, setIds] = useState<string[]>([])
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setIds(JSON.parse(raw).slice(0, 3))
    } catch { /* ignore */ }
  }, [])

  const cars = ids.map((id) => mockCars.find((c) => c.id === id)).filter(Boolean)

  if (cars.length === 0 || collapsed) {
    if (cars.length === 0) return null
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        className="fixed bottom-24 end-4 z-30 hidden rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-white shadow-lg md:block"
      >
        Recently Viewed
      </button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed bottom-24 end-4 z-30 hidden w-56 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl md:block"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="text-xs font-semibold text-white">Recently Viewed</span>
          <button type="button" onClick={() => setCollapsed(true)} aria-label="Close">
            <X size={14} className="text-text-muted" />
          </button>
        </div>
        <div className="p-2">
          {cars.map((car) => car && (
            <Link
              key={car.id}
              to={`/car/${car.id}`}
              className="flex items-center gap-2 rounded-xl p-2 transition-colors hover:bg-white/5"
            >
              <img src={car.images[0]} alt="" className="h-10 w-14 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-white">{car.make} {car.model}</p>
                <p className="text-[10px] text-text-muted">{car.year}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export function trackRecentlyViewed(carId: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const list: string[] = raw ? JSON.parse(raw) : []
    const next = [carId, ...list.filter((id) => id !== carId)].slice(0, 5)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch { /* ignore */ }
}
