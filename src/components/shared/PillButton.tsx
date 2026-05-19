import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'crimson' | 'dark' | 'outline' | 'ghost' | 'white'
type Size = 'sm' | 'md' | 'lg'

interface PillButtonProps {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  disabled?: boolean
  ariaLabel?: string
}

const variants: Record<Variant, string> = {
  crimson: 'bg-accent-red text-white hover:bg-accent-red-dark',
  dark: 'bg-text-dark text-white hover:bg-accent-red-dark',
  outline: 'bg-transparent border-2 border-text-dark text-text-dark hover:bg-text-dark hover:text-white',
  ghost: 'bg-transparent text-text-mid hover:text-text-dark hover:bg-number-bg',
  white: 'bg-white text-text-dark border border-border hover:shadow-card',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

const motionProps = {
  whileTap: { scale: 0.97 },
  whileHover: { y: -1 },
}

export function PillButton({
  children,
  variant = 'crimson',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  className,
  disabled,
  ariaLabel,
}: PillButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-250',
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 pointer-events-none',
    className,
  )

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link to={to} className={classes} aria-label={ariaLabel}>
          {children}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.a {...motionProps} href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
}
