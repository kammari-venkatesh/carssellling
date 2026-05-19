import type { Car, CarFilters, SortOption } from '@/types/car'

export function filterCars(cars: Car[], filters: CarFilters): Car[] {
  return cars.filter((car) => {
    if (filters.keyword) {
      const q = filters.keyword.toLowerCase()
      const haystack = `${car.make} ${car.model} ${car.variant}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    if (filters.makes?.length && !filters.makes.includes(car.make)) return false
    if (filters.model && car.model !== filters.model) return false
    if (filters.yearMin && car.year < filters.yearMin) return false
    if (filters.yearMax && car.year > filters.yearMax) return false
    if (filters.priceMin && car.price < filters.priceMin) return false
    if (filters.priceMax && car.price > filters.priceMax) return false
    if (filters.kmMin && car.km < filters.kmMin) return false
    if (filters.kmMax && car.km > filters.kmMax) return false
    if (filters.bodyTypes?.length && !filters.bodyTypes.includes(car.bodyType)) return false
    if (filters.fuels?.length && !filters.fuels.includes(car.fuel)) return false
    if (filters.transmissions?.length && !filters.transmissions.includes(car.transmission)) return false
    if (filters.conditions?.length && !filters.conditions.includes(car.condition)) return false
    if (filters.statuses?.length && !filters.statuses.includes(car.status)) return false
    if (filters.colors?.length && !filters.colors.includes(car.color)) return false
    return true
  })
}

export function sortCars(cars: Car[], sort: SortOption): Car[] {
  const sorted = [...cars]
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'mileage':
      return sorted.sort((a, b) => a.km - b.km)
    case 'newest':
    default:
      return sorted.sort((a, b) => new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime())
  }
}
