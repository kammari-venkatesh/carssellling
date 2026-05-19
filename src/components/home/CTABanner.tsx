import { useTranslation } from 'react-i18next'
import { PillButton } from '@/components/shared/PillButton'

export function CTABanner() {
  const { t } = useTranslation(['home', 'common'])

  return (
    <section className="section-y pb-20 md:pb-24">
      <div className="container-main">
        <div className="pro-card border-text-dark/10 bg-text-dark px-8 py-14 text-center md:px-16 md:py-16">
          <p className="mx-auto max-w-2xl font-heading text-2xl font-semibold leading-snug text-white md:text-3xl">
            {t('home:cta.text')}
          </p>
          <PillButton to="/contact" variant="crimson" size="lg" className="mt-8 bg-white text-text-dark hover:bg-bg-elevated">
            {t('common:buttons.contactUs')}
          </PillButton>
        </div>
      </div>
    </section>
  )
}
