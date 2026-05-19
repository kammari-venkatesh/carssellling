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
  crimson:
    'bg-accent-red text-white shadow-sm hover:bg-accent-red-dark active:bg-accent-red-dark',
  dark: 'bg-text-dark text-white shadow-sm hover:bg-accent-red-dark active:bg-accent-red-dark',
  outline:
    'border border-text-dark bg-transparent text-text-dark hover:bg-text-dark hover:text-white',
  ghost: 'bg-transparent text-text-mid hover:bg-number-bg hover:text-text-dark',
  white:
    'border border-border bg-white text-text-dark shadow-xs hover:border-text-mid hover:shadow-card',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-xs font-semibold',
  md: 'h-11 px-6 text-sm font-semibold',
  lg: 'h-12 px-8 text-sm font-semibold tracking-wide',
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
    'inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200',
    variants[variant],
    sizes[size],
    disabled && 'pointer-events-none opacity-50',
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
