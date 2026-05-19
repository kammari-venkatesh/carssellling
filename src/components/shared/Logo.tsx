import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showTagline?: boolean
  tagline?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { name: 'text-base', tag: 'text-[9px]' },
  md: { name: 'text-lg', tag: 'text-[10px]' },
  lg: { name: 'text-xl', tag: 'text-xs' },
}

export function Logo({ className, showTagline = true, tagline, size = 'md' }: LogoProps) {
  const s = sizes[size]
  return (
    <Link to="/" className={cn('inline-block shrink-0', className)}>
      <div className={cn('font-heading font-bold tracking-tight text-text-dark', s.name)}>
        Auto<span className="text-accent-red">X</span>change
      </div>
      {showTagline && tagline && (
        <div className={cn('mt-0.5 font-medium tracking-wide text-text-light', s.tag)}>
          {tagline}
        </div>
      )}
    </Link>
  )
}
