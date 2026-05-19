import { useTranslation } from 'react-i18next'
import type { CarFilters as Filters } from '@/types/car'
import { getUniqueMakes, getModelsByMake } from '@/data/mockCars'
import { cn } from '@/lib/utils'

interface CarFiltersProps {
  filters: Filters
  onChange: (f: Filters) => void
  onApply: () => void
  onReset: () => void
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
        active
          ? 'border-accent bg-accent/20 text-white'
          : 'border-border text-text-muted hover:border-border-hover hover:text-white',
      )}
    >
      {children}
    </button>
  )
}

export function CarFilters({ filters, onChange, onApply, onReset }: CarFiltersProps) {
  const { t } = useTranslation(['buy', 'common'])
  const makes = getUniqueMakes()
  const selectedMake = filters.makes?.[0] || ''
  const models = selectedMake ? getModelsByMake(selectedMake) : []
  const bodyTypes = t('bodyTypes', { returnObjects: true }) as string[]
  const fuels = t('fuels', { returnObjects: true }) as string[]

  const toggleArray = (key: keyof Filters, value: string) => {
    const arr = (filters[key] as string[] | undefined) || []
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
    onChange({ ...filters, [key]: next.length ? next : undefined })
  }

  return (
    <div className="panel space-y-5 p-5">
      <h3 className="text-base font-semibold text-white">{t('filters.title')}</h3>

      <div>
        <label className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {t('filters.keyword')}
        </label>
        <input
          type="text"
          value={filters.keyword || ''}
          onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
          className="input-dark mt-2"
        />
      </div>

      <div>
        <label className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {t('filters.make')}
        </label>
        <div className="mt-2 max-h-36 space-y-0.5 overflow-y-auto">
          {makes.map((m) => (
            <label
              key={m}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-text-muted hover:bg-white/5 hover:text-white"
            >
              <input
                type="checkbox"
                checked={!!filters.makes?.includes(m)}
                onChange={() => toggleArray('makes', m)}
                className="accent-[#e63946]"
              />
              {m}
            </label>
          ))}
        </div>
      </div>

      {selectedMake && (
        <div>
          <label className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {t('filters.model')}
          </label>
          <select
            value={filters.model || ''}
            onChange={(e) => onChange({ ...filters, model: e.target.value || undefined })}
            className="select-dark input-dark mt-2"
          >
            <option value="">All</option>
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {t('filters.bodyType')}
        </label>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {bodyTypes.map((bt) => (
            <Chip
              key={bt}
              active={!!filters.bodyTypes?.includes(bt)}
              onClick={() => toggleArray('bodyTypes', bt)}
            >
              {bt}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {t('filters.fuel')}
        </label>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {fuels.map((f) => (
            <Chip
              key={f}
              active={!!filters.fuels?.includes(f)}
              onClick={() => toggleArray('fuels', f)}
            >
              {f}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex gap-2 border-t border-border pt-4">
        <button type="button" onClick={onApply} className="btn-primary flex-1 justify-center !py-2.5 text-sm">
          {t('common:buttons.applyFilters')}
        </button>
        <button type="button" onClick={onReset} className="btn-secondary !px-4 !py-2.5 text-sm">
          {t('reset')}
        </button>
      </div>
    </div>
  )
}
