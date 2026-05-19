import { useTranslation } from 'react-i18next'
import { StatCounter } from '@/components/shared/StatCounter'

export function TrustBanner() {
  const { t } = useTranslation('home')

  const stats = [
    { value: t('trust.carsSoldVal'), label: t('trust.carsSold') },
    { value: t('trust.satisfactionVal'), label: t('trust.satisfaction') },
    { value: t('trust.sellTimeVal'), label: t('trust.sellTime') },
    { value: t('trust.brandsVal'), label: t('trust.brands') },
  ]

  return (
    <section className="pb-10 pt-2">
      <div className="container-main">
        <div className="overflow-hidden rounded-[20px] border border-border-subtle bg-text-dark">
          <div className="grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
            {stats.map((s) => (
              <StatCounter key={s.label} value={s.value} label={s.label} dark />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
