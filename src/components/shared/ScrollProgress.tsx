import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed start-0 top-0 z-[100] h-[3px] w-full origin-left bg-gradient-to-r from-accent to-accent-2"
      style={{ scaleX }}
    />
  )
}
