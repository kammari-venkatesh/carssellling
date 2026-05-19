import { motion } from 'framer-motion'
import { useInViewAnimation } from '@/hooks/useInViewAnimation'

interface StatCounterProps {
  value: string
  label: string
}

export function StatCounter({ value, label }: StatCounterProps) {
  const { ref, isInView } = useInViewAnimation()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-1 px-4 py-2 text-center"
    >
      <span className="font-heading text-3xl font-semibold text-text-dark md:text-4xl">{value}</span>
      <span className="text-sm text-text-light">{label}</span>
    </motion.div>
  )
}
