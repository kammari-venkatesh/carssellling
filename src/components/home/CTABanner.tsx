import { useTranslation } from 'react-i18next'
import { PillButton } from '@/components/shared/PillButton'

export function CTABanner() {
  const { t } = useTranslation(['home', 'common'])

  return (
    <section className="section-y pb-20 md:pb-24">
      <div className="container-main text-center">
        <p className="text-section-heading mx-auto max-w-2xl font-normal leading-snug text-text-dark">
          {t('home:cta.text')}
        </p>
        <PillButton to="/contact" size="lg" className="mt-10">
          {t('common:buttons.contactUs')}
        </PillButton>
      </div>
    </section>
  )
}
