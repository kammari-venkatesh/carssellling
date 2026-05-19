export type CarStatus = 'In Stock' | 'On Order' | 'On the Way'
export type CarCondition = 'New' | 'Used' | 'Certified Pre-Owned'

export interface Car {
  id: string
  make: string
  model: string
  year: number
  variant: string
  price: number
  originalPrice?: number
  km: number
  fuel: string
  transmission: string
  bodyType: string
  color: string
  condition: CarCondition
  status: CarStatus
  engine: string
  horsepower: number
  torque: string
  displacement?: string
  drivetrain?: string
  fuelEconomy?: string
  doors?: number
  cargoSpace?: string
  owners: number
  accidentFree: boolean
  serviceHistory: boolean
  seats: number
  rating: number
  images: string[]
  imageAlt?: string
  features: string[]
  safetyFeatures?: string[]
  description: string
  badges: string[]
  city: string
  listingDate: string
}

export interface CarFilters {
  keyword?: string
  makes?: string[]
  model?: string
  yearMin?: number
  yearMax?: number
  priceMin?: number
  priceMax?: number
  kmMin?: number
  kmMax?: number
  bodyTypes?: string[]
  fuels?: string[]
  transmissions?: string[]
  conditions?: string[]
  statuses?: string[]
  colors?: string[]
}

export type SortOption = 'price-asc' | 'price-desc' | 'newest' | 'mileage'
