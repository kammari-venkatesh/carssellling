import { useTranslation } from 'react-i18next'
import type { CarFilters as Filters } from '@/types/car'
import { getUniqueMakes, getModelsByMake } from '@/data/mockCars'
import { PillButton } from '@/components/shared/PillButton'

interface CarFiltersProps {
  filters: Filters
  onChange: (f: Filters) => void
  onApply: () => void
  onReset: () => void
}

export function CarFilters({ filters, onChange, onApply, onReset }: CarFiltersProps) {
  const { t } = useTranslation(['buy', 'common'])
  const makes = getUniqueMakes()
  const selectedMake = filters.makes?.[0] || ''
  const models = selectedMake ? getModelsByMake(selectedMake) : []

  const toggleArray = (key: keyof Filters, value: string) => {
    const arr = (filters[key] as string[] | undefined) || []
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
    onChange({ ...filters, [key]: next.length ? next : undefined })
  }

  return (
    <div className="space-y-6 rounded-2xl bg-white p-6 shadow-card">
      <h3 className="font-heading text-lg font-semibold">{t('filters.title')}</h3>

      <div>
        <label className="text-sm font-medium text-text-dark">{t('filters.keyword')}</label>
        <input
          type="text"
          value={filters.keyword || ''}
          onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
          className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium">{t('filters.make')}</label>
        <div className="mt-2 max-h-40 space-y-1 overflow-y-auto">
          {makes.map((m) => (
            <label key={m} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.makes?.includes(m)}
                onChange={() => toggleArray('makes', m)}
              />
              {m}
            </label>
          ))}
        </div>
      </div>

      {selectedMake && (
        <div>
          <label className="text-sm font-medium">{t('filters.model')}</label>
          <select
            value={filters.model || ''}
            onChange={(e) => onChange({ ...filters, model: e.target.value || undefined })}
            className="mt-1 w-full rounded-xl border border-border px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      )}

      <div>
        <label className="text-sm font-medium">{t('filters.bodyType')}</label>
        <div className="mt-2 flex flex-wrap gap-1">
          {(t('bodyTypes', { returnObjects: true }) as string[]).map((bt) => (
            <button
              key={bt}
              onClick={() => toggleArray('bodyTypes', bt)}
              className={`rounded-full border px-2 py-0.5 text-xs ${filters.bodyTypes?.includes(bt) ? 'border-accent-red bg-accent-red text-white' : 'border-border'}`}
            >
              {bt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">{t('filters.fuel')}</label>
        <div className="mt-2 flex flex-wrap gap-1">
          {(t('fuels', { returnObjects: true }) as string[]).map((f) => (
            <button key={f} onClick={() => toggleArray('fuels', f)} className={`rounded-full border px-2 py-0.5 text-xs ${filters.fuels?.includes(f) ? 'border-accent-red bg-accent-red text-white' : 'border-border'}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <PillButton onClick={onApply} className="flex-1 justify-center">{t('common:buttons.applyFilters')}</PillButton>
        <PillButton variant="ghost" onClick={onReset}>{t('reset')}</PillButton>
      </div>
    </div>
  )
}
