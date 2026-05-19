import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
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
    <section className="container-main relative z-10 -mt-6 pb-6 md:-mt-10">
      <div className="pro-card p-6 md:p-8">
        <h2 className="font-heading text-lg font-semibold text-text-dark">{t('search.title')}</h2>
        <p className="mt-1 text-sm text-text-light">{t('search.subtitle')}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          <select
            value={make}
            onChange={(e) => { setMake(e.target.value); setModel('') }}
            className="select-field"
            aria-label={t('search.make')}
          >
            <option value="">{t('search.make')}</option>
            {makes.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="select-field"
            disabled={!make}
            aria-label={t('search.model')}
          >
            <option value="">{t('search.model')}</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select className="select-field" aria-label={t('search.year')}>
            <option value="">{t('search.year')}</option>
            {[2024, 2023, 2022, 2021, 2020].map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <select className="select-field" aria-label={t('search.price')}>
            <option value="">{t('search.price')}</option>
            <option>Under ₹10L</option>
            <option>₹10L – ₹25L</option>
            <option>₹25L+</option>
          </select>
          <PillButton onClick={handleSearch} className="h-11 w-full justify-center gap-2 sm:col-span-2 lg:col-span-1">
            <Search size={16} />
            {t('search.searchBtn')}
          </PillButton>
        </div>

        <div className="mt-6 border-t border-border-subtle pt-6">
          <p className="text-eyebrow mb-3">{t('search.bodyType')}</p>
          <div className="flex flex-wrap gap-2">
            {BODY_TYPES.map((bt) => (
              <button
                key={bt}
                type="button"
                onClick={() => setBodyType(bodyType === bt ? '' : bt)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  bodyType === bt
                    ? 'border-accent-red bg-accent-red text-white'
                    : 'border-border bg-white text-text-mid hover:border-text-mid hover:text-text-dark',
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
