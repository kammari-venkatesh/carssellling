import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle } from 'lucide-react'
import { getUniqueMakes, getModelsByMake } from '@/data/mockCars'
import { PillButton } from '@/components/shared/PillButton'
import { cn } from '@/lib/utils'

const STEPS = 3

export default function Inspect() {
  const { t } = useTranslation('inspect')
  const [step, setStep] = useState(0)
  const [confirmed, setConfirmed] = useState(false)
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    city: '',
    address: '',
    date: '',
    time: '',
  })

  const makes = getUniqueMakes()
  const models = form.make ? getModelsByMake(form.make) : []
  const ref = `AX-${Date.now().toString(36).toUpperCase()}`

  if (confirmed) {
    return (
      <div className="container-main py-16 text-center">
        <CheckCircle className="mx-auto text-green" size={56} />
        <h1 className="mt-4 font-heading text-3xl font-bold">{t('confirm.title')}</h1>
        <p className="mt-2 text-text-mid">
          {t('confirm.ref')}: <strong>{ref}</strong>
        </p>
        <div className="mx-auto mt-8 max-w-md rounded-2xl bg-white p-6 text-start shadow-card">
          <p className="font-medium">{t('confirm.summary')}</p>
          <ul className="mt-3 space-y-1 text-sm text-text-light">
            <li>
              {form.make} {form.model} {form.year}
            </li>
            <li>{form.city}</li>
            <li>
              {form.date} · {form.time}
            </li>
          </ul>
        </div>
        <PillButton to="/" className="mt-8">
          Home
        </PillButton>
      </div>
    )
  }

  return (
    <div className="container-main py-8">
      <h1 className="font-heading text-3xl font-bold">{t('title')}</h1>
      <p className="mt-1 text-text-mid">{t('subtitle')}</p>

      <div className="mx-auto mt-8 max-w-xl">
        <div className="flex gap-2">
          {Array.from({ length: STEPS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full',
                i <= step ? 'bg-accent-red' : 'bg-border',
              )}
            />
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-card">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-heading font-semibold">{t('steps.car')}</h2>
              <label className="block text-sm">
                {t('car.make')}
                <select
                  value={form.make}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, make: e.target.value, model: '' }))
                  }
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2"
                >
                  <option value="">—</option>
                  {makes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                {t('car.model')}
                <select
                  value={form.model}
                  onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2"
                  disabled={!form.make}
                >
                  <option value="">—</option>
                  {models.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                {t('car.year')}
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2"
                />
              </label>
              <label className="block text-sm">
                {t('car.vin')}
                <input
                  value={form.vin}
                  onChange={(e) => setForm((f) => ({ ...f, vin: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2"
                />
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-heading font-semibold">
                {t('steps.location')} & {t('steps.schedule')}
              </h2>
              <label className="block text-sm">
                {t('location.city')}
                <input
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2"
                />
              </label>
              <label className="block text-sm">
                {t('location.address')}
                <textarea
                  rows={3}
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2"
                />
              </label>
              <label className="block text-sm">
                Date
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2"
                />
              </label>
              <label className="block text-sm">
                Time
                <select
                  value={form.time}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-border px-4 py-2"
                >
                  <option value="">—</option>
                  <option value="9-12">9 AM – 12 PM</option>
                  <option value="12-4">12 PM – 4 PM</option>
                  <option value="4-7">4 PM – 7 PM</option>
                </select>
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 text-sm">
              <h2 className="font-heading font-semibold">{t('steps.confirm')}</h2>
              <p>
                <span className="text-text-light">Car:</span> {form.make} {form.model}{' '}
                {form.year}
              </p>
              <p>
                <span className="text-text-light">Location:</span> {form.city}
              </p>
              <p>
                <span className="text-text-light">Address:</span> {form.address}
              </p>
              <p>
                <span className="text-text-light">When:</span> {form.date} · {form.time}
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 0 ? (
              <PillButton variant="outline" onClick={() => setStep((s) => s - 1)}>
                {t('back')}
              </PillButton>
            ) : (
              <span />
            )}
            {step < STEPS - 1 ? (
              <PillButton onClick={() => setStep((s) => s + 1)}>{t('next')}</PillButton>
            ) : (
              <PillButton onClick={() => setConfirmed(true)}>{t('submit')}</PillButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
