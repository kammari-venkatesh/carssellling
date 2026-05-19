import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getUniqueMakes, getModelsByMake } from '@/data/mockCars'
import { useCar } from '@/context/CarContext'
import { PillButton } from '@/components/shared/PillButton'
import { cn } from '@/lib/utils'

const BODY_TYPES = ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Electric']

export function QuickSearch() {
  const { t } = useTranslation('home')
  const navigate = useNavigate()
  const { setFilters } = useCar()
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [bodyType, setBodyType] = useState('')
  const makes = getUniqueMakes()
  const models = make ? getModelsByMake(make) : []

  const handleSearch = () => {
    setFilters({
      makes: make ? [make] : undefined,
      model: model || undefined,
      bodyTypes: bodyType ? [bodyType] : undefined,
    })
    navigate('/buy')
  }

  return (
    <section className="container-main relative z-10 -mt-8 pb-4 md:-mt-12">
      <div className="rounded-3xl bg-white p-5 shadow-hover md:p-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          <select
            value={make}
            onChange={(e) => { setMake(e.target.value); setModel('') }}
            className="input-field"
            aria-label={t('search.make')}
          >
            <option value="">{t('search.make')}</option>
            {makes.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="input-field"
            disabled={!make}
            aria-label={t('search.model')}
          >
            <option value="">{t('search.model')}</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select className="input-field" aria-label={t('search.year')}>
            <option value="">{t('search.year')}</option>
            {[2024, 2023, 2022, 2021, 2020].map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <select className="input-field" aria-label={t('search.price')}>
            <option value="">{t('search.price')}</option>
            <option>Under ₹10L</option>
            <option>₹10L – ₹25L</option>
            <option>₹25L+</option>
          </select>
          <PillButton onClick={handleSearch} className="h-12 w-full justify-center sm:col-span-2 lg:col-span-1">
            {t('search.searchBtn')} →
          </PillButton>
        </div>

        <div className="mt-5 border-t border-border pt-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-text-light">{t('search.bodyType')}</p>
          <div className="flex flex-wrap gap-2">
            {BODY_TYPES.map((bt) => (
              <button
                key={bt}
                type="button"
                onClick={() => setBodyType(bodyType === bt ? '' : bt)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-all',
                  bodyType === bt
                    ? 'border-accent-red bg-accent-red text-white'
                    : 'border-border bg-white text-text-mid hover:border-text-mid',
                )}
              >
                {bt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
