import { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, List } from 'lucide-react'
import { mockCars } from '@/data/mockCars'
import { filterCars, sortCars } from '@/utils/filterCars'
import type { CarFilters as Filters, SortOption } from '@/types/car'
import { useCar } from '@/context/CarContext'
import { PremiumCarCard } from '@/components/car/PremiumCarCard'
import { CarFilters } from '@/components/car/CarFilters'
import { CarGridSkeleton } from '@/components/shared/LoadingSkeleton'
import { PageHeader } from '@/components/ui/PageHeader'
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
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
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
    <div className="page-pad">
      <div className="container-main">
        <PageHeader title={t('title')} subtitle={t('subtitle')} eyebrow="Inventory" />

        <div className="flex gap-8">
          <aside className="hidden w-72 shrink-0 lg:sticky lg:top-24 lg:block lg:self-start">
            <CarFilters
              filters={localFilters}
              onChange={setLocalFilters}
              onApply={apply}
              onReset={() => {
                resetFilters()
                setLocalFilters({})
              }}
            />
          </aside>

          <div className="min-w-0 flex-1">
            <div className="panel flex flex-wrap items-center justify-between gap-4 p-4">
              <p className="text-sm text-text-muted">
                {t('showing', { count: filtered.length })}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="input-dark !w-auto min-w-[140px]"
                >
                  <option value="price-asc">{t('sort.priceAsc')}</option>
                  <option value="price-desc">{t('sort.priceDesc')}</option>
                  <option value="newest">{t('sort.newest')}</option>
                  <option value="mileage">{t('sort.mileage')}</option>
                </select>
                <div className="flex overflow-hidden rounded-lg border border-border">
                  <button
                    type="button"
                    onClick={() => setListView(false)}
                    className={cn('p-2 transition-colors', !listView ? 'bg-accent/20 text-white' : 'text-text-muted hover:text-white')}
                    aria-label={t('view.grid')}
                  >
                    <Grid size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setListView(true)}
                    className={cn('p-2 transition-colors', listView ? 'bg-accent/20 text-white' : 'text-text-muted hover:text-white')}
                    aria-label={t('view.list')}
                  >
                    <List size={17} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFilters(true)}
                  className="btn-secondary !py-2 !px-3 text-sm lg:hidden"
                >
                  {t('filters.title')}
                </button>
              </div>
            </div>

            <div className="mt-6">
              {loading ? (
                <CarGridSkeleton count={6} />
              ) : paginated.length === 0 ? (
                <div className="panel py-16 text-center text-text-muted">
                  No vehicles match your filters.
                </div>
              ) : listView ? (
                <div className="space-y-4">
                  {paginated.map((car) => (
                    <PremiumCarCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {paginated.map((car) => (
                    <PremiumCarCard key={car.id} car={car} />
                  ))}
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={cn(
                      'flex h-9 min-w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors',
                      page === p
                        ? 'border-accent bg-accent text-white'
                        : 'border-border text-text-muted hover:border-border-hover hover:text-white',
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileFilters(false)} />
          <aside className="absolute end-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="font-semibold text-white">{t('filters.title')}</span>
              <button type="button" onClick={() => setMobileFilters(false)} className="text-text-muted hover:text-white">
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <CarFilters
                filters={localFilters}
                onChange={setLocalFilters}
                onApply={apply}
                onReset={() => {
                  resetFilters()
                  setLocalFilters({})
                }}
              />
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
