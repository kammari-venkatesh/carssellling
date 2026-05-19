import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, Search, Star } from 'lucide-react'
import { HERO_POSTER, HERO_VIDEO } from '@/data/homeContent'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { getUniqueMakes, getModelsByMake } from '@/data/mockCars'
import { useCar } from '@/context/CarContext'

const STATS = [
  { value: 50000, suffix: '+', label: 'Cars Sold' },
  { value: 4.9, suffix: '', label: 'Rating', decimal: true },
  { value: 300, suffix: '+', label: 'Inspection Points' },
  { value: 0, suffix: '', label: 'Instant Loan Approval', text: 'Yes' },
]

const BUDGETS = ['Under ₹10L', '₹10L – ₹25L', '₹25L – ₹50L', '₹50L+']
const FUELS = ['Any', 'Petrol', 'Diesel', 'Electric', 'Hybrid']

export function HeroSection() {
  const navigate = useNavigate()
  const { setFilters } = useCar()
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [budget, setBudget] = useState('')
  const [fuel, setFuel] = useState('')
  const makes = getUniqueMakes()
  const models = make ? getModelsByMake(make) : []

  const handleSearch = () => {
    setFilters({
      makes: make ? [make] : undefined,
      model: model || undefined,
      fuels: fuel && fuel !== 'Any' ? [fuel] : undefined,
    })
    navigate('/buy')
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Video background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12, ease: 'easeOut' }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_POSTER}
          className="h-full w-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/92 to-bg/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/60" />
      </motion.div>

      {/* Floating glow */}
      <div className="pointer-events-none absolute start-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[120px]" />
      <motion.div
        className="pointer-events-none absolute end-0 top-1/4 h-[300px] w-[300px] rounded-full bg-accent-2/15 blur-[100px]"
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="container-main relative z-10 flex min-h-screen flex-col justify-center pb-32 pt-28 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              India&apos;s Trusted Premium Car Marketplace
            </span>

            <h1 className="text-display mt-6">
              Buy, Sell &amp; Exchange Cars{' '}
              <span className="bg-gradient-to-r from-white via-white to-text-muted bg-clip-text text-transparent">
                Without the Hassle
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-muted">
              Verified premium vehicles with instant financing, doorstep delivery, and AI-powered pricing.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/buy" className="btn-primary">
                Explore Cars
              </Link>
              <Link to="/sell" className="btn-secondary">
                Sell Your Car
              </Link>
            </div>
          </motion.div>

          {/* Glass search card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-[24px] p-6 shadow-2xl md:p-8"
          >
            <h3 className="text-lg font-semibold text-white">Find your dream car</h3>
            <p className="mt-1 text-sm text-text-muted">Search from 50+ verified premium vehicles</p>

            <motion.div
              className="mt-6 space-y-3"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {[
                <select key="make" value={make} onChange={(e) => { setMake(e.target.value); setModel('') }} className="input-dark select-dark" aria-label="Brand">
                  <option value="">Brand</option>
                  {makes.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>,
                <select key="model" value={model} onChange={(e) => setModel(e.target.value)} disabled={!make} className="input-dark select-dark" aria-label="Model">
                  <option value="">Model</option>
                  {models.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>,
                <select key="budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="input-dark select-dark" aria-label="Budget">
                  <option value="">Budget</option>
                  {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>,
                <select key="fuel" value={fuel} onChange={(e) => setFuel(e.target.value)} className="input-dark select-dark" aria-label="Fuel">
                  {FUELS.map((f) => <option key={f} value={f}>{f === 'Any' ? 'Fuel Type' : f}</option>)}
                </select>,
              ].map((el, i) => (
                <motion.div key={i} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                  {el}
                </motion.div>
              ))}
            </motion.div>

            <button type="button" onClick={handleSearch} className="btn-primary mt-5 w-full">
              <Search size={18} />
              Search Cars
            </button>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} whileHover={{ y: -2 }} className="text-center md:text-start">
              <div className="text-2xl font-bold text-white md:text-3xl">
                {s.text ? (
                  <span className="text-accent">{s.text}</span>
                ) : s.decimal ? (
                  <span className="flex items-center justify-center gap-1 md:justify-start">
                    {s.value}
                    <Star size={18} className="fill-accent text-accent" />
                  </span>
                ) : (
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                )}
              </div>
              <p className="mt-1 text-sm text-text-muted">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 start-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-text-muted" size={28} />
      </motion.div>
    </section>
  )
}
