import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCar } from '@/context/CarContext'
import { getCarById } from '@/data/mockCars'
import { formatCurrency } from '@/utils/formatCurrency'
import { PillButton } from '@/components/shared/PillButton'
import { CarCard } from '@/components/car/CarCard'
import { mockCars } from '@/data/mockCars'
import { cn } from '@/lib/utils'

export default function Compare() {
  const { t } = useTranslation(['compare', 'common'])
  const { compareList, removeFromCompare } = useCar()
  const cars = compareList.map(getCarById).filter((c): c is NonNullable<typeof c> => !!c)

  const specKeys = [
    { key: 'price', get: (c: (typeof cars)[0]) => formatCurrency(c.price) },
    { key: 'year', get: (c: (typeof cars)[0]) => c.year },
    { key: 'km', get: (c: (typeof cars)[0]) => `${c.km.toLocaleString()} km` },
    { key: 'engine', get: (c: (typeof cars)[0]) => c.engine },
    { key: 'hp', get: (c: (typeof cars)[0]) => `${c.horsepower} HP` },
    { key: 'fuel', get: (c: (typeof cars)[0]) => c.fuel },
    { key: 'transmission', get: (c: (typeof cars)[0]) => c.transmission },
    { key: 'bodyType', get: (c: (typeof cars)[0]) => c.bodyType },
    { key: 'seats', get: (c: (typeof cars)[0]) => c.seats },
    { key: 'rating', get: (c: (typeof cars)[0]) => c.rating.toFixed(1) },
  ] as const

  if (cars.length === 0) {
    return (
      <div className="container-main py-16 text-center">
        <h1 className="font-heading text-3xl font-bold">{t('compare:title')}</h1>
        <p className="mt-2 text-text-mid">{t('common:empty.compareDesc')}</p>
        <PillButton to="/buy" className="mt-6">
          {t('common:buttons.browseCars')}
        </PillButton>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {mockCars.slice(0, 3).map((car) => (
            <CarCard key={car.id} car={car} showCompare />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container-main py-8">
      <h1 className="font-heading text-3xl font-bold">{t('compare:title')}</h1>
      <p className="mt-1 text-text-mid">{t('compare:subtitle')}</p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr>
              <th className="p-3 text-start text-sm text-text-light" />
              {cars.map((car) => (
                <th key={car.id} className="p-3 align-top">
                  <img src={car.images[0]} alt="" className="mx-auto h-24 w-36 rounded-xl object-cover" />
                  <p className="mt-2 font-heading font-semibold">
                    {car.make} {car.model}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFromCompare(car.id)}
                    className="mt-1 text-xs text-accent-red"
                  >
                    {t('common:buttons.remove')}
                  </button>
                  <PillButton to={`/car/${car.id}`} className="mt-2 !px-3 !py-1 text-xs">
                    {t('common:buttons.viewDetails')}
                  </PillButton>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specKeys.map(({ key, get }) => (
              <tr key={key} className="border-t border-border">
                <td className="p-3 text-sm font-medium text-text-light">
                  {t(`compare:specs.${key}`)}
                </td>
                {cars.map((car) => (
                  <td key={car.id} className={cn('p-3 text-center text-sm')}>
                    {get(car)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-12">
        <h2 className="font-heading text-xl font-semibold">{t('compare:features')}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {cars.map((car) => (
            <div key={car.id} className="rounded-2xl bg-white p-4 shadow-card">
              <p className="font-medium">
                {car.make} {car.model}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-text-light">
                {car.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {compareList.length < 3 && (
        <p className="mt-8 text-center text-sm text-text-light">
          <Link to="/buy" className="text-accent-red hover:underline">
            {t('common:buttons.addCar')}
          </Link>
        </p>
      )}
    </div>
  )
}
