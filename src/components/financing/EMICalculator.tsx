import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '@/utils/formatCurrency'
import { PillButton } from '@/components/shared/PillButton'

interface EMICalculatorProps {
  defaultPrice?: number
  compact?: boolean
}

const TENURES = [6, 12, 24, 36, 48, 60]
const RATE = 8.5

export function EMICalculator({ defaultPrice = 2500000, compact }: EMICalculatorProps) {
  const { t } = useTranslation(['financing', 'common'])
  const [price, setPrice] = useState(defaultPrice)
  const [downPct, setDownPct] = useState(20)
  const [tenure, setTenure] = useState(36)

  const downAmount = (price * downPct) / 100
  const loanAmount = price - downAmount
  const monthlyRate = RATE / 12 / 100

  const emi = useMemo(() => {
    if (loanAmount <= 0) return 0
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1)
  }, [loanAmount, monthlyRate, tenure])

  const totalAmount = emi * tenure
  const totalInterest = totalAmount - loanAmount

  return (
    <div className={`rounded-3xl bg-white p-6 shadow-card ${compact ? '' : 'max-w-2xl'}`}>
      {!compact && <h3 className="font-heading text-xl font-semibold">{t('financing:emi.title')}</h3>}

      <div className="mt-6 space-y-6">
        <div>
          <label className="text-sm font-medium">{t('financing:emi.carPrice')}: {formatCurrency(price)}</label>
          <input type="range" min={500000} max={10000000} step={50000} value={price} onChange={(e) => setPrice(+e.target.value)} className="mt-2 w-full accent-accent-red" />
        </div>
        <div>
          <label className="text-sm font-medium">{t('financing:emi.downPayment')}: {downPct}% ({formatCurrency(downAmount)})</label>
          <input type="range" min={0} max={80} value={downPct} onChange={(e) => setDownPct(+e.target.value)} className="mt-2 w-full accent-accent-red" />
        </div>
        <div>
          <label className="text-sm font-medium">{t('financing:emi.tenure')}</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {TENURES.map((m) => (
              <button key={m} onClick={() => setTenure(m)} className={`rounded-full px-3 py-1 text-sm ${tenure === m ? 'bg-accent-red text-white' : 'border border-border'}`}>
                {m} {t('financing:emi.months')}
              </button>
            ))}
          </div>
        </div>
        <p className="text-sm text-text-light">{t('financing:emi.interestRate')}: {RATE}% p.a.</p>
      </div>

      <div className="mt-6 rounded-2xl bg-number-bg p-6">
        <p className="text-sm text-text-light">{t('financing:emi.monthlyEmi')}</p>
        <p className="font-heading text-4xl font-bold text-accent-red">{formatCurrency(Math.round(emi))}</p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-text-light">{t('financing:emi.totalInterest')}</span><p className="font-semibold">{formatCurrency(Math.round(totalInterest))}</p></div>
          <div><span className="text-text-light">{t('financing:emi.totalAmount')}</span><p className="font-semibold">{formatCurrency(Math.round(totalAmount))}</p></div>
        </div>
        {!compact && totalAmount > 0 && (
          <div className="mt-4 flex h-4 overflow-hidden rounded-full">
            <div className="bg-accent-red" style={{ width: `${(loanAmount / totalAmount) * 100}%` }} />
            <div className="flex-1 bg-accent-red-light" />
          </div>
        )}
      </div>

      {!compact && <PillButton className="mt-6">{t('common:buttons.applyFinance')}</PillButton>}
    </div>
  )
}
