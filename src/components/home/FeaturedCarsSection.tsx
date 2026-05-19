import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules'
import { ArrowRight } from 'lucide-react'
import { mockCars } from '@/data/mockCars'
import { PremiumCarCard } from '@/components/car/PremiumCarCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import 'swiper/css'
import 'swiper/css/pagination'

type Tab = 'SUV' | 'Sedan' | 'Luxury' | 'Sports' | 'EV'

const TABS: { key: Tab; label: string }[] = [
  { key: 'SUV', label: 'SUV' },
  { key: 'Sedan', label: 'Sedan' },
  { key: 'Luxury', label: 'Luxury' },
  { key: 'Sports', label: 'Sports' },
  { key: 'EV', label: 'EV' },
]

function filterByTab(cars: typeof mockCars, tab: Tab) {
  switch (tab) {
    case 'SUV':
      return cars.filter((c) => c.bodyType === 'SUV')
    case 'Sedan':
      return cars.filter((c) => c.bodyType === 'Sedan')
    case 'Luxury':
      return cars.filter((c) => ['BMW', 'Mercedes', 'Audi', 'Porsche', 'Lexus', 'Land Rover', 'Volvo'].includes(c.make))
    case 'Sports':
      return cars.filter((c) => c.make === 'Porsche' || c.model.includes('Mustang') || c.horsepower >= 200)
    case 'EV':
      return cars.filter((c) => c.fuel === 'Electric' || c.bodyType === 'Electric')
    default:
      return cars
  }
}

export function FeaturedCarsSection() {
  const [tab, setTab] = useState<Tab>('SUV')
  const filtered = useMemo(() => filterByTab(mockCars, tab).slice(0, 6), [tab])

  return (
    <section className="section-pad bg-surface/50">
      <div className="container-main">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            align="left"
            eyebrow="Inventory"
            title="Featured Vehicles"
            subtitle="Hand-picked premium cars inspected and ready to drive."
          />
          <Link to="/buy" className="btn-secondary shrink-0">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                tab === t.key ? 'text-white' : 'text-text-muted hover:text-white'
              }`}
            >
              {tab === t.key && (
                <motion.div
                  layoutId="featured-tab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Desktop grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mt-10 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((car) => (
              <PremiumCarCard key={car.id} car={car} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Mobile swiper */}
        <div className="mt-8 md:hidden">
          <Swiper
            modules={[FreeMode, Pagination]}
            spaceBetween={16}
            slidesPerView={1.15}
            freeMode
            pagination={{ clickable: true }}
            className="!pb-12"
          >
            {filtered.map((car) => (
              <SwiperSlide key={car.id}>
                <PremiumCarCard car={car} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
