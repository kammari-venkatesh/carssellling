import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { CarCard } from '@/components/car/CarCard'
import { mockCars } from '@/data/mockCars'
import type { CarStatus } from '@/types/car'
import { cn } from '@/lib/utils'

export function FeaturedInventory() {
  const { t } = useTranslation('home')
  const [tab, setTab] = useState<'all' | CarStatus>('all')

  const tabs = [
    { key: 'all' as const, label: t('featured.tabs.all') },
    { key: 'In Stock' as const, label: t('featured.tabs.inStock') },
    { key: 'On Order' as const, label: t('featured.tabs.onOrder') },
    { key: 'On the Way' as const, label: t('featured.tabs.onTheWay') },
  ]

  const filtered = tab === 'all' ? mockCars : mockCars.filter((c) => c.status === tab)
  const display = filtered.slice(0, 6)

  return (
    <section className="section-y bg-bg-primary">
      <div className="container-main text-center">
        <SectionLabel>{t('featured.label')}</SectionLabel>
        <h2 className="text-section-heading mt-4">{t('featured.heading')}</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                tab === key ? 'bg-text-dark text-white shadow-sm' : 'border border-border-subtle bg-white text-text-mid hover:border-text-mid hover:text-text-dark',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="container-main mt-10 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
        {display.map((car) => (
          <CarCard key={car.id} car={car} showCompare={false} />
        ))}
      </div>

      <div className="container-main mt-8 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:hidden">
        {display.map((car) => (
          <div key={car.id} className="w-[min(85vw,300px)] shrink-0 snap-center">
            <CarCard car={car} showCompare={false} />
          </div>
        ))}
      </div>
    </section>
  )
}
