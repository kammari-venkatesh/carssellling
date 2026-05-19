import { useInViewAnimation } from '@/hooks/useInViewAnimation'

interface StatCounterProps {
  value: string
  label: string
  dark?: boolean
}

export function StatCounter({ value, label, dark }: StatCounterProps) {
  const { ref, isInView } = useInViewAnimation()

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-1 px-4 py-8 text-center transition-opacity duration-500 md:py-10 ${
        isInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className={`font-heading text-3xl font-semibold tracking-tight md:text-4xl ${dark ? 'text-white' : 'text-text-dark'}`}>
        {value}
      </span>
      <span className={`text-sm ${dark ? 'text-white/65' : 'text-text-light'}`}>{label}</span>
    </div>
  )
}
