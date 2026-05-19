import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Smartphone, Bell, MapPin, CreditCard, QrCode } from 'lucide-react'
import { FadeInView } from '@/components/ui/FadeInView'

const FEATURES = [
  { icon: Bell, text: 'Real-time price alerts' },
  { icon: MapPin, text: 'Track your delivery live' },
  { icon: CreditCard, text: 'Manage EMI & documents' },
]

export function AppPromoSection() {
  return (
    <section className="section-pad relative overflow-hidden bg-gradient-to-b from-surface to-bg">
      <div className="pointer-events-none absolute end-1/4 top-0 h-[300px] w-[300px] rounded-full bg-accent/15 blur-[100px]" />
      <div className="container-main">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeInView direction="right">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="relative mx-auto max-w-xs"
            >
              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-accent/30 to-accent-2/20 blur-2xl" />
              <div className="relative rounded-[32px] border-4 border-white/10 bg-card p-3 shadow-2xl">
                <div className="overflow-hidden rounded-[24px] bg-surface">
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <span className="text-sm font-bold text-white">AutoXchange</span>
                    <Smartphone size={16} className="text-accent" />
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80"
                    alt="App preview"
                    className="aspect-[9/14] w-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </FadeInView>

          <FadeInView delay={0.15}>
            <p className="text-eyebrow">Mobile App</p>
            <h2 className="text-section mt-3">Your Garage in Your Pocket</h2>
            <p className="mt-4 text-text-muted">
              Browse, compare, finance, and track deliveries — all from our award-winning mobile app.
            </p>

            <ul className="mt-8 space-y-4">
              {FEATURES.map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-white">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                    <f.icon size={18} className="text-accent" />
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn-primary">Download App</Link>
              <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-border bg-white/5">
                <QrCode size={40} className="text-text-muted" />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {['App Store', 'Google Play'].map((store) => (
                <button
                  key={store}
                  type="button"
                  className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-accent/40"
                >
                  {store}
                </button>
              ))}
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}
