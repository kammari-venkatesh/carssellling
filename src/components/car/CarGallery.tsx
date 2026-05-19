import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Car } from '@/types/car'
import { cn } from '@/lib/utils'

interface CarGalleryProps {
  car: Car
}

export function CarGallery({ car }: CarGalleryProps) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = useCallback(() => {
    setActive((i) => (i === 0 ? car.images.length - 1 : i - 1))
  }, [car.images.length])

  const next = useCallback(() => {
    setActive((i) => (i === car.images.length - 1 ? 0 : i + 1))
  }, [car.images.length])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, prev, next])

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="group relative block w-full overflow-hidden rounded-2xl"
          aria-label="Open gallery"
        >
          <img
            src={car.images[active]}
            alt={`${car.make} ${car.model}`}
            className="aspect-[16/10] w-full object-cover transition-transform group-hover:scale-[1.02]"
          />
        </button>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {car.images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'shrink-0 overflow-hidden rounded-xl border-2 transition-colors',
                active === i ? 'border-accent-red' : 'border-transparent opacity-70 hover:opacity-100',
              )}
            >
              <img src={src} alt="" className="h-16 w-24 object-cover" />
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute end-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute start-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft size={28} />
          </button>
          <img
            src={car.images[active]}
            alt={`${car.make} ${car.model}`}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute end-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 md:end-16"
            aria-label="Next"
          >
            <ChevronRight size={28} />
          </button>
          <p className="absolute bottom-4 text-sm text-white/80">
            {active + 1} / {car.images.length}
          </p>
        </div>
      )}
    </>
  )
}
