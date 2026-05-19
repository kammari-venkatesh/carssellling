import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useCountUp(target: number, duration = 2000, suffix = '') {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return { ref, display: `${count.toLocaleString()}${suffix}` }
}
