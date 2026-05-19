import { useState } from 'react'
import { Car } from 'lucide-react'
import { cn } from '@/lib/utils'

const PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect fill="#e8e8e8" width="800" height="500"/><text x="400" y="260" text-anchor="middle" fill="#999" font-family="sans-serif" font-size="24">AutoXchange</text></svg>`,
  )

interface CarImageProps {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  dark?: boolean
  aspect?: boolean
}

export function CarImage({
  src,
  alt,
  className,
  imgClassName,
  dark = false,
  aspect = true,
}: CarImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    if (!failed) {
      setFailed(true)
      setCurrentSrc(PLACEHOLDER)
    }
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-number-bg',
        aspect && 'aspect-[16/10]',
        className,
      )}
    >
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center text-text-light">
          <Car size={48} strokeWidth={1} />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onError={handleError}
        className={cn(
          'h-full w-full object-cover',
          dark && 'brightness-[0.55] contrast-110',
          imgClassName,
        )}
      />
    </div>
  )
}
