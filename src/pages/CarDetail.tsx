import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Heart, Share2, MessageCircle } from 'lucide-react'
import { getCarById, getSimilarCars } from '@/data/mockCars'
import { formatCurrency } from '@/utils/formatCurrency'
import { useCar } from '@/context/CarContext'
import { useToast } from '@/components/shared/ToastProvider'
import { CarGallery } from '@/components/car/CarGallery'
import { CarSpecs } from '@/components/car/CarSpecs'
import { CarCard } from '@/components/car/CarCard'
import { EMICalculator } from '@/components/financing/EMICalculator'
import { PillButton } from '@/components/shared/PillButton'
import { cn } from '@/lib/utils'

type Tab = 'overview' | 'specs' | 'features' | 'history' | 'finance'

export default function CarDetail() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation(['carDetail', 'common'])
  const { toggleWishlist, isInWishlist, addToCompare, isInCompare } = useCar()
  const { toast } = useToast()
  const [tab, setTab] = useState<Tab>('overview')

  const car = id ? getCarById(id) : undefined
  const similar = id ? getSimilarCars(id) : []

  if (!car) {
    return (
      <div className="container-main py-16 text-center">
        <p className="text-lg text-text-mid">Car not found</p>
        <PillButton to="/buy" className="mt-4">
          {t('common:buttons.browseCars')}
        </PillButton>
      </div>
    )
  }

  const wished = isInWishlist(car.id)
  const compared = isInCompare(car.id)

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: t('carDetail:tabs.overview') },
    { id: 'specs', label: t('carDetail:tabs.specs') },
    { id: 'features', label: t('carDetail:tabs.features') },
    { id: 'history', label: t('carDetail:tabs.history') },
    { id: 'finance', label: t('carDetail:tabs.finance') },
  ]

  return (
    <div className="container-main section-y pb-24">
      <nav className="mb-6 text-sm text-text-light">
        <Link to="/" className="hover:text-accent-red">
          {t('carDetail:breadcrumb.home')}
        </Link>
        {' / '}
        <Link to="/buy" className="hover:text-accent-red">
          {t('carDetail:breadcrumb.buy')}
        </Link>
        {' / '}
        <span className="text-text-dark">
          {car.make} {car.model}
        </span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <CarGallery car={car} />

        <div>
          <div className="flex flex-wrap gap-2">
            {car.badges.map((b) => (
              <span
                key={b}
                className="rounded-full bg-accent-red/10 px-2 py-0.5 text-xs font-medium text-accent-red"
              >
                {b}
              </span>
            ))}
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold">
            {car.make} {car.model} {car.year}
          </h1>
          <p className="text-text-light">
            {car.variant} · {car.city}
          </p>
          <p className="mt-4 font-heading text-3xl font-bold text-accent-red">
            {formatCurrency(car.price)}
            {car.originalPrice && (
              <span className="ms-2 text-lg font-normal text-text-light line-through">
                {formatCurrency(car.originalPrice)}
              </span>
            )}
          </p>
          <p className="mt-1 text-sm text-text-light">
            {car.km.toLocaleString()} km · {car.fuel} · {car.transmission}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <PillButton>{t('carDetail:bookTestDrive')}</PillButton>
            <PillButton variant="outline" to="/financing">
              {t('carDetail:getFinancing')}
            </PillButton>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              type="button"
              onClick={() => {
                toggleWishlist(car.id)
                toast(
                  wished
                    ? t('common:toast.wishlistRemove')
                    : t('common:toast.wishlistAdd'),
                )
              }}
              className="flex items-center gap-2 text-sm text-text-mid hover:text-accent-red"
            >
              <Heart
                size={18}
                className={wished ? 'fill-accent-red text-accent-red' : ''}
              />
              {wished ? t('carDetail:removeWishlist') : t('carDetail:addWishlist')}
            </button>
            <button
              type="button"
              onClick={() => {
                const ok = addToCompare(car.id)
                toast(
                  ok ? t('common:toast.compareAdd') : t('common:toast.compareMax'),
                  ok ? 'success' : 'error',
                )
              }}
              className={cn(
                'text-sm',
                compared ? 'text-accent-red' : 'text-text-mid hover:text-accent-red',
              )}
            >
              {t('carDetail:compare')}
            </button>
            <button type="button" className="flex items-center gap-2 text-sm text-text-mid">
              <Share2 size={18} /> Share
            </button>
            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(`${car.make} ${car.model}`)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-green"
            >
              <MessageCircle size={18} />
              {t('carDetail:whatsapp')}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-b border-border">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(({ id: tabId, label }) => (
            <button
              key={tabId}
              type="button"
              onClick={() => setTab(tabId)}
              className={cn(
                'shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                tab === tabId
                  ? 'border-accent-red text-accent-red'
                  : 'border-transparent text-text-light hover:text-text-dark',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {tab === 'overview' && (
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-lg font-semibold">
                {t('carDetail:overview.highlights')}
              </h2>
              <p className="mt-3 text-text-mid">{car.description}</p>
              <h3 className="mt-6 font-heading font-semibold">
                {t('carDetail:overview.condition')}
              </h3>
              <ul className="mt-2 space-y-2 text-sm text-text-mid">
                <li>Condition: {car.condition}</li>
                <li>Status: {car.status}</li>
                <li>Color: {car.color}</li>
                <li>Rating: {car.rating}/5</li>
              </ul>
            </div>
            <CarSpecs car={car} />
          </div>
        )}

        {tab === 'specs' && <CarSpecs car={car} />}

        {tab === 'features' && (
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-heading font-semibold">Features</h3>
              <ul className="mt-3 space-y-2">
                {car.features.map((f) => (
                  <li key={f} className="text-sm text-text-mid">
                    ✓ {f}
                  </li>
                ))}
              </ul>
            </div>
            {car.safetyFeatures && (
              <div>
                <h3 className="font-heading font-semibold">Safety</h3>
                <ul className="mt-3 space-y-2">
                  {car.safetyFeatures.map((f) => (
                    <li key={f} className="text-sm text-text-mid">
                      ✓ {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {tab === 'history' && (
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                label: t('carDetail:history.owners'),
                value: car.owners,
                ok: true,
              },
              {
                label: t('carDetail:history.service'),
                value: car.serviceHistory ? t('carDetail:history.verified') : '—',
                ok: car.serviceHistory,
              },
              {
                label: t('carDetail:history.accident'),
                value: car.accidentFree ? 'None' : 'Reported',
                ok: car.accidentFree,
              },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white p-6 shadow-card">
                <p className="text-sm text-text-light">{item.label}</p>
                <p className="mt-2 font-heading text-xl font-semibold">{item.value}</p>
                {item.ok && (
                  <span className="mt-2 inline-block text-xs text-green">
                    {t('carDetail:history.verified')}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'finance' && <EMICalculator defaultPrice={car.price} />}
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold">{t('carDetail:similar')}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
