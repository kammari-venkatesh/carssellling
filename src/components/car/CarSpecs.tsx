import { useTranslation } from 'react-i18next'
import type { Car } from '@/types/car'
import { formatCurrency } from '@/utils/formatCurrency'

interface CarSpecsProps {
  car: Car
}

export function CarSpecs({ car }: CarSpecsProps) {
  const { t } = useTranslation('compare')

  const rows: { label: string; value: string | number }[] = [
    { label: t('specs.price'), value: formatCurrency(car.price) },
    { label: t('specs.year'), value: car.year },
    { label: t('specs.km'), value: `${car.km.toLocaleString()} km` },
    { label: t('specs.engine'), value: car.engine },
    { label: t('specs.hp'), value: `${car.horsepower} HP` },
    { label: t('specs.fuel'), value: car.fuel },
    { label: t('specs.transmission'), value: car.transmission },
    { label: t('specs.bodyType'), value: car.bodyType },
    { label: t('specs.seats'), value: car.seats },
    { label: t('specs.rating'), value: car.rating.toFixed(1) },
    ...(car.displacement ? [{ label: 'Displacement', value: car.displacement }] : []),
    ...(car.drivetrain ? [{ label: 'Drivetrain', value: car.drivetrain }] : []),
    ...(car.fuelEconomy ? [{ label: 'Fuel Economy', value: car.fuelEconomy }] : []),
    ...(car.doors ? [{ label: 'Doors', value: car.doors }] : []),
    ...(car.cargoSpace ? [{ label: 'Cargo', value: car.cargoSpace }] : []),
    { label: 'Color', value: car.color },
    { label: 'Condition', value: car.condition },
    { label: 'Torque', value: car.torque },
  ]

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-text-light">{row.label}</span>
          <span className="mt-1 font-medium text-text-dark sm:mt-0">{row.value}</span>
        </div>
      ))}
    </div>
  )
}
