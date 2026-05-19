import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Share2 } from 'lucide-react'

export function Footer() {
  const { t } = useTranslation('common')

  const quickLinks = [
    { to: '/buy', label: t('nav.buy') },
    { to: '/sell', label: t('nav.sellExchange') },
    { to: '/exchange', label: t('nav.sellExchange') },
    { to: '/financing', label: t('nav.financing') },
    { to: '/inspect', label: t('nav.inspect') },
    { to: '/compare', label: t('nav.compare') },
  ]

  const services = [
    { to: '/buy', label: t('footer.orderCar') },
    { to: '/buy?status=In Stock', label: t('footer.carsInStock') },
    { to: '/buy?status=On the Way', label: t('footer.carsOnWay') },
    { to: '/financing', label: t('footer.warranties') },
    { to: '/exchange', label: t('footer.tradeIn') },
  ]

  return (
    <footer className="mt-8 border-t border-border bg-white pb-24 md:pb-10">
      <div className="container-main grid grid-cols-1 gap-12 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        <div>
          <div className="font-heading text-xl font-bold text-text-dark">
            Auto<span className="text-accent-red">X</span>change
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-light">{t('footer.tagline')}</p>
          <div className="mt-5 flex gap-2">
            {['Instagram', 'Facebook', 'LinkedIn'].map((label) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-mid transition hover:border-accent-red hover:text-accent-red"
              >
                <Share2 size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-text-dark">{t('footer.quickLinks')}</h4>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.to + l.label}>
                <Link to={l.to} className="text-sm text-text-mid transition hover:text-accent-red">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-text-dark">{t('footer.services')}</h4>
          <ul className="mt-4 space-y-2.5">
            {services.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-text-mid transition hover:text-accent-red">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold uppercase tracking-wide text-text-dark">{t('footer.contact')}</h4>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-text-mid">
            <li>{t('footer.address')}</li>
            <li>{t('footer.phone')}</li>
            <li>{t('footer.email')}</li>
            <li>{t('footer.hours')}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5">
        <div className="container-main flex flex-wrap items-center justify-between gap-3 text-xs text-text-light">
          <span>{t('footer.copyright')}</span>
          <div className="flex gap-5">
            <Link to="#" className="hover:text-text-dark">{t('footer.privacy')}</Link>
            <Link to="#" className="hover:text-text-dark">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
