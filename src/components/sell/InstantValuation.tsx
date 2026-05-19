import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CheckCircle } from 'lucide-react'
import { getUniqueMakes, getModelsByMake } from '@/data/mockCars'
import { formatCurrency } from '@/utils/formatCurrency'
import { PillButton } from '@/components/shared/PillButton'
import { cn } from '@/lib/utils'

const STEPS = 4

interface FormData {
  make: string
  model: string
  year: string
  variant: string
  km: string
  condition: string
  exterior: string
  interior: string
  accident: string
  service: string
  owners: string
  city: string
  date: string
  time: string
  name: string
  phone: string
  email: string
}

const initial: FormData = {
  make: '',
  model: '',
  year: '',
  variant: '',
  km: '',
  condition: 'good',
  exterior: 'good',
  interior: 'good',
  accident: 'no',
  service: 'yes',
  owners: '1',
  city: '',
  date: '',
  time: '',
  name: '',
  phone: '',
  email: '',
}

const inputClass =
  'mt-1 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-accent-red'

export function InstantValuation() {
  const { t } = useTranslation('sell')
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState<FormData>(initial)

  const makes = getUniqueMakes()
  const models = form.make ? getModelsByMake(form.make) : []

  const update = (key: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const estimatedValue =
    500000 +
    (form.year ? +form.year : 2020) * 1000 +
    (form.km ? Math.max(0, 800000 - +form.km * 2) : 400000)

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-card">
        <CheckCircle className="mx-auto text-green" size={48} />
        <h3 className="mt-4 font-heading text-2xl font-bold">{t('valuation.resultTitle')}</h3>
        <p className="mt-1 text-text-light">{t('valuation.resultSub')}</p>
        <p className="mt-6 font-heading text-4xl font-bold text-accent-red">
          {formatCurrency(estimatedValue)}
        </p>
        <p className="mt-4 text-sm text-text-mid">{t('valuation.nextSteps')}</p>
        <PillButton
          className="mt-6"
          onClick={() => {
            setDone(false)
            setStep(0)
            setForm(initial)
          }}
        >
          {t('hero.cta')}
        </PillButton>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card md:p-8">
      <h3 className="font-heading text-xl font-semibold">{t('valuation.title')}</h3>

      <div className="mt-6 flex gap-2">
        {Array.from({ length: STEPS }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              i <= step ? 'bg-accent-red' : 'bg-border',
            )}
          />
        ))}
      </div>

      <div className="mt-8">
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t('valuation.make')}>
              <select
                value={form.make}
                onChange={(e) => {
                  update('make', e.target.value)
                  update('model', '')
                }}
                className={inputClass}
              >
                <option value="">—</option>
                {makes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('valuation.model')}>
              <select
                value={form.model}
                onChange={(e) => update('model', e.target.value)}
                className={inputClass}
                disabled={!form.make}
              >
                <option value="">—</option>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('valuation.year')}>
              <input
                type="number"
                value={form.year}
                onChange={(e) => update('year', e.target.value)}
                className={inputClass}
                min={2000}
                max={2025}
              />
            </Field>
            <Field label={t('valuation.variant')}>
              <input
                value={form.variant}
                onChange={(e) => update('variant', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label={t('valuation.km')}>
              <input
                type="number"
                value={form.km}
                onChange={(e) => update('km', e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label={t('valuation.condition')}
              value={form.condition}
              onChange={(v) => update('condition', v)}
              options={['excellent', 'good', 'fair', 'needsWork']}
              t={t}
            />
            <SelectField
              label={t('valuation.exterior')}
              value={form.exterior}
              onChange={(v) => update('exterior', v)}
              options={['excellent', 'good', 'fair']}
              t={t}
            />
            <SelectField
              label={t('valuation.interior')}
              value={form.interior}
              onChange={(v) => update('interior', v)}
              options={['excellent', 'good', 'fair']}
              t={t}
            />
            <Field label={t('valuation.accident')}>
              <div className="mt-2 flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={form.accident === 'yes'}
                    onChange={() => update('accident', 'yes')}
                  />
                  {t('valuation.yes')}
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={form.accident === 'no'}
                    onChange={() => update('accident', 'no')}
                  />
                  {t('valuation.no')}
                </label>
              </div>
            </Field>
            <Field label={t('valuation.service')}>
              <div className="mt-2 flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={form.service === 'yes'}
                    onChange={() => update('service', 'yes')}
                  />
                  {t('valuation.yes')}
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={form.service === 'no'}
                    onChange={() => update('service', 'no')}
                  />
                  {t('valuation.no')}
                </label>
              </div>
            </Field>
            <Field label={t('valuation.owners')}>
              <input
                type="number"
                min={1}
                max={5}
                value={form.owners}
                onChange={(e) => update('owners', e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t('valuation.city')}>
              <input
                value={form.city}
                onChange={(e) => update('city', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label={t('valuation.date')}>
              <input
                type="date"
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label={t('valuation.time')}>
              <select
                value={form.time}
                onChange={(e) => update('time', e.target.value)}
                className={inputClass}
              >
                <option value="">—</option>
                <option value="morning">9 AM – 12 PM</option>
                <option value="afternoon">12 PM – 4 PM</option>
                <option value="evening">4 PM – 7 PM</option>
              </select>
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t('valuation.name')}>
              <input
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label={t('valuation.phone')}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label={t('valuation.email')}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between gap-4">
        {step > 0 ? (
          <PillButton variant="outline" onClick={() => setStep((s) => s - 1)}>
            Back
          </PillButton>
        ) : (
          <span />
        )}
        {step < STEPS - 1 ? (
          <PillButton onClick={() => setStep((s) => s + 1)}>Next</PillButton>
        ) : (
          <PillButton onClick={() => setDone(true)}>{t('hero.cta')}</PillButton>
        )}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-text-mid">{label}</span>
      {children}
    </label>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
  t,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  t: (key: string) => string
}) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {options.map((o) => (
          <option key={o} value={o}>
            {t(`valuation.${o}`)}
          </option>
        ))}
      </select>
    </Field>
  )
}
