import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useInViewAnimation(margin = '-80px') {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: margin as `${number}px` })
  return { ref, isInView }
}
