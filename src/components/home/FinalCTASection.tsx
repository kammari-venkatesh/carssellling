import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const BG =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=85'

export function FinalCTASection() {
  return (
    <section className="relative mx-4 mb-8 overflow-hidden rounded-[24px] md:mx-8 lg:mx-auto lg:max-w-[calc(1280px+64px)]">
      <img src={BG} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/50" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative px-8 py-20 text-center md:px-16 md:py-28 md:text-start"
      >
        <h2 className="text-display max-w-xl text-3xl md:text-4xl">
          Ready to Find Your Dream Car?
        </h2>
        <p className="mt-4 max-w-md text-text-muted">
          Join 50,000+ happy customers who chose AutoXchange for their next vehicle.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
          <Link to="/buy" className="btn-primary">Browse Inventory</Link>
          <Link to="/sell" className="btn-secondary">Sell Your Car</Link>
        </div>
      </motion.div>
    </section>
  )
}
