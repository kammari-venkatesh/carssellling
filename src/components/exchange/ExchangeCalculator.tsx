import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { mockCars } from '@/data/mockCars'
import { formatCurrency } from '@/utils/formatCurrency'
import { PillButton } from '@/components/shared/PillButton'

export function ExchangeCalculator() {
  const { t } = useTranslation('exchange')
  const [yourMake, setYourMake] = useState('')
  const [yourYear, setYourYear] = useState('2020')
  const [yourKm, setYourKm] = useState('50000')
  const [wantCarId, setWantCarId] = useState(mockCars[0]?.id ?? '')

  const wantCar = mockCars.find((c) => c.id === wantCarId)

  const estimatedValue = useMemo(() => {
    const base = 600000
    const yearBonus = (+yourYear - 2015) * 50000
    const kmPenalty = (+yourKm || 0) * 3
    return Math.max(200000, base + yearBonus - kmPenalty)
  }, [yourYear, yourKm])

  const difference = wantCar ? wantCar.price - estimatedValue : 0

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr]">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <h3 className="font-heading text-lg font-semibold">{t('calculator.yourCar')}</h3>
        <div className="mt-4 space-y-4">
          <label className="block text-sm">
            <span className="text-text-light">Make</span>
            <input
              value={yourMake}
              onChange={(e) => setYourMake(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border px-4 py-2"
              placeholder="e.g. Honda"
            />
          </label>
          <label className="block text-sm">
            <span className="text-text-light">Year</span>
            <input
              type="number"
              value={yourYear}
              onChange={(e) => setYourYear(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border px-4 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="text-text-light">KM</span>
            <input
              type="number"
              value={yourKm}
              onChange={(e) => setYourKm(e.target.value)}
              className="mt-1 w-full rounded-xl border border-border px-4 py-2"
            />
          </label>
          <div className="rounded-2xl bg-number-bg p-4">
            <p className="text-sm text-text-light">{t('calculator.estimatedValue')}</p>
            <p className="font-heading text-2xl font-bold text-accent-red">
              {formatCurrency(estimatedValue)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <ArrowRight className="hidden text-accent-red lg:block" size={32} />
        <ArrowRight className="rotate-90 text-accent-red lg:hidden" size={32} />
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-card">
        <h3 className="font-heading text-lg font-semibold">{t('calculator.wantCar')}</h3>
        <div className="mt-4 space-y-4">
          <select
            value={wantCarId}
            onChange={(e) => setWantCarId(e.target.value)}
            className="w-full rounded-xl border border-border px-4 py-2 text-sm"
          >
            {mockCars.slice(0, 20).map((c) => (
              <option key={c.id} value={c.id}>
                {c.make} {c.model} {c.year}
              </option>
            ))}
          </select>
          {wantCar && (
            <>
              <img
                src={wantCar.images[0]}
                alt=""
                className="aspect-video w-full rounded-xl object-cover"
              />
              <div className="rounded-2xl bg-number-bg p-4">
                <p className="text-sm text-text-light">{t('calculator.carPrice')}</p>
                <p className="font-heading text-2xl font-bold">{formatCurrency(wantCar.price)}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="rounded-3xl bg-accent-red p-6 text-white lg:col-span-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-white/80">{t('calculator.difference')}</p>
            <p className="font-heading text-3xl font-bold">
              {formatCurrency(Math.abs(difference))}
              {difference > 0 ? ' to pay' : difference < 0 ? ' refund' : ''}
            </p>
            {difference > 0 && (
              <p className="mt-1 text-sm text-white/70">{t('calculator.financingNeeded')}</p>
            )}
          </div>
          <PillButton variant="white" to="/financing">
            Proceed to Exchange
          </PillButton>
        </div>
      </div>
    </div>
  )
}
