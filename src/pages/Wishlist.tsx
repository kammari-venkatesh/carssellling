import { useTranslation } from 'react-i18next'
import { Heart } from 'lucide-react'
import { useCar } from '@/context/CarContext'
import { getCarById } from '@/data/mockCars'
import { CarCard } from '@/components/car/CarCard'
import { PillButton } from '@/components/shared/PillButton'

export default function Wishlist() {
  const { t } = useTranslation(['wishlist', 'common'])
  const { wishlist } = useCar()
  const cars = wishlist.map(getCarById).filter((c): c is NonNullable<typeof c> => !!c)

  return (
    <div className="container-main section-y">
      <h1 className="text-section-heading font-semibold">{t('wishlist:title')}</h1>
      <p className="mt-2 text-text-mid">{t('wishlist:subtitle', { count: cars.length })}</p>

      {cars.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <Heart size={48} className="text-border" />
          <p className="mt-4 text-lg font-medium text-text-dark">{t('wishlist:empty')}</p>
          <p className="mt-1 text-text-light">{t('common:empty.wishlistDesc')}</p>
          <PillButton to="/buy" className="mt-6">
            {t('common:buttons.browseCars')}
          </PillButton>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  )
}
