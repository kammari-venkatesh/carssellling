import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function StickyMobileCTA() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 start-0 end-0 z-30 flex gap-2 border-t border-border bg-bg/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
    >
      <Link to="/buy" className="btn-primary flex-1 justify-center !py-3 text-sm">
        Browse Cars
      </Link>
      <Link to="/sell" className="btn-secondary flex-1 justify-center !py-3 text-sm">
        Sell Car
      </Link>
    </motion.div>
  )
}
