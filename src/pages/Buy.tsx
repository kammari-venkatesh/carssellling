import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, List } from 'lucide-react'
import { mockCars } from '@/data/mockCars'
import { filterCars, sortCars } from '@/utils/filterCars'
import type { CarFilters as Filters, SortOption } from '@/types/car'
import { useCar } from '@/context/CarContext'
import { CarCard } from '@/components/car/CarCard'
import { CarFilters } from '@/components/car/CarFilters'
import { CarGridSkeleton } from '@/components/shared/LoadingSkeleton'
import { cn } from '@/lib/utils'

const PER_PAGE = 12

export default function Buy() {
  const { t } = useTranslation('buy')
  const { filters: ctxFilters, setFilters, resetFilters } = useCar()
  const [localFilters, setLocalFilters] = useState<Filters>(ctxFilters)
  const [sort, setSort] = useState<SortOption>('newest')
  const [page, setPage] = useState(1)
  const [listView, setListView] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mobileFilters, setMobileFilters] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(
    () => sortCars(filterCars(mockCars, ctxFilters), sort),
    [ctxFilters, sort],
  )

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const apply = () => {
    setFilters(localFilters)
    setPage(1)
    setMobileFilters(false)
  }

  return (
    <div className="container-main section-y">
      <h1 className="text-section-heading font-semibold">{t('title')}</h1>
      <p className="mt-2 text-text-mid">{t('subtitle')}</p>

      <div className="mt-10 flex gap-8">
        <aside className="hidden w-72 shrink-0 lg:sticky lg:top-24 lg:self-start lg:block">
          <CarFilters filters={localFilters} onChange={setLocalFilters} onApply={apply} onReset={() => { resetFilters(); setLocalFilters({}) }} />
        </aside>

        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-card">
            <p className="text-sm text-text-mid">{t('showing', { count: filtered.length })}</p>
            <div className="flex items-center gap-3">
              <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="rounded-xl border border-border px-3 py-1.5 text-sm">
                <option value="price-asc">{t('sort.priceAsc')}</option>
                <option value="price-desc">{t('sort.priceDesc')}</option>
                <option value="newest">{t('sort.newest')}</option>
                <option value="mileage">{t('sort.mileage')}</option>
              </select>
              <div className="flex rounded-xl border border-border">
                <button onClick={() => setListView(false)} className={cn('p-2', !listView && 'bg-number-bg')} aria-label={t('view.grid')}><Grid size={18} /></button>
                <button onClick={() => setListView(true)} className={cn('p-2', listView && 'bg-number-bg')} aria-label={t('view.list')}><List size={18} /></button>
              </div>
              <button onClick={() => setMobileFilters(true)} className="rounded-xl border border-border px-3 py-1.5 text-sm lg:hidden">{t('filters.title')}</button>
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <CarGridSkeleton count={6} />
            ) : (
              <div className={cn(listView ? 'space-y-4' : 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3')}>
                {paginated.map((car) => (
                  <CarCard key={car.id} car={car} listView={listView} />
                ))}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-sm font-medium',
                    page === i + 1 ? 'bg-text-dark text-white' : 'border border-border bg-white',
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-50 bg-white p-6 lg:hidden overflow-y-auto">
          <div className="flex justify-between mb-4">
            <h3 className="font-heading text-lg font-semibold">{t('filters.title')}</h3>
            <button onClick={() => setMobileFilters(false)}>✕</button>
          </div>
          <CarFilters filters={localFilters} onChange={setLocalFilters} onApply={apply} onReset={() => { resetFilters(); setLocalFilters({}) }} />
        </div>
      )}
    </div>
  )
}
