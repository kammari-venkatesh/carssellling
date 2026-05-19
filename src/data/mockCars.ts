import type { Car, CarStatus } from '@/types/car'
import { getCarImages, getCarImageAlt } from '@/data/carImages'

const MAKES_MODELS: { make: string; models: string[]; bodyTypes: string[] }[] = [
  { make: 'BMW', models: ['3 Series', '5 Series', 'X5', 'X3'], bodyTypes: ['Sedan', 'SUV'] },
  { make: 'Mercedes', models: ['C-Class', 'E-Class', 'GLC', 'GLE'], bodyTypes: ['Sedan', 'SUV'] },
  { make: 'Audi', models: ['A4', 'A6', 'Q5', 'Q7'], bodyTypes: ['Sedan', 'SUV'] },
  { make: 'Toyota', models: ['Camry', 'Fortuner', 'Innova', 'Corolla'], bodyTypes: ['Sedan', 'SUV', 'Hatchback'] },
  { make: 'Honda', models: ['City', 'Civic', 'CR-V', 'Amaze'], bodyTypes: ['Sedan', 'SUV', 'Hatchback'] },
  { make: 'Hyundai', models: ['Creta', 'Verna', 'Tucson', 'i20'], bodyTypes: ['SUV', 'Sedan', 'Hatchback'] },
  { make: 'Kia', models: ['Seltos', 'Sonet', 'Carnival', 'EV6'], bodyTypes: ['SUV', 'Hatchback', 'Electric'] },
  { make: 'Volkswagen', models: ['Virtus', 'Taigun', 'Tiguan', 'Polo'], bodyTypes: ['Sedan', 'SUV', 'Hatchback'] },
  { make: 'Volvo', models: ['XC60', 'XC90', 'S60'], bodyTypes: ['SUV', 'Sedan'] },
  { make: 'Lexus', models: ['ES', 'RX', 'NX'], bodyTypes: ['Sedan', 'SUV'] },
  { make: 'Ford', models: ['Mustang', 'Endeavour', 'EcoSport'], bodyTypes: ['Sedan', 'SUV'] },
  { make: 'Jeep', models: ['Compass', 'Meridian', 'Wrangler'], bodyTypes: ['SUV'] },
  { make: 'Porsche', models: ['911', 'Cayenne', 'Macan'], bodyTypes: ['Sedan', 'SUV'] },
  { make: 'Land Rover', models: ['Defender', 'Range Rover Sport', 'Discovery'], bodyTypes: ['SUV'] },
]

const STATUSES: CarStatus[] = ['In Stock', 'On Order', 'On the Way']
const FUELS = ['Petrol', 'Diesel', 'Hybrid', 'Electric']
const COLORS = ['Black', 'White', 'Silver', 'Blue', 'Red', 'Grey']
const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune']
const FEATURES_POOL = [
  'Sunroof', 'Heated Seats', 'Navigation', 'Backup Camera', 'Parking Sensors',
  'Leather Seats', 'Cruise Control', 'Apple CarPlay', 'Android Auto', 'Blind Spot Monitor',
  'Lane Assist', 'Wireless Charging', 'Ventilated Seats', '360 Camera', 'Keyless Entry',
]

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length]
}

function generateCars(): Car[] {
  const cars: Car[] = []
  let idx = 0
  for (const { make, models, bodyTypes } of MAKES_MODELS) {
    for (const model of models) {
      if (idx >= 50) break
      const year = 2019 + (idx % 6)
      const price = 800000 + idx * 175000 + (idx % 7) * 50000
      const status = pick(STATUSES, idx)
      const bodyType = pick(bodyTypes, idx)
      const fuel = bodyType === 'Electric' ? 'Electric' : pick(FUELS, idx)
      cars.push({
        id: `car_${String(idx + 1).padStart(3, '0')}`,
        make,
        model,
        year,
        variant: `${model} ${pick(['Base', 'Premium', 'Sport', 'M Sport', 'Luxury'], idx)}`,
        price,
        originalPrice: idx % 3 === 0 ? Math.round(price * 1.12) : undefined,
        km: 5000 + idx * 3200,
        fuel,
        transmission: idx % 4 === 0 ? 'Manual' : 'Automatic',
        bodyType,
        color: pick(COLORS, idx),
        condition: idx % 5 === 0 ? 'New' : idx % 3 === 0 ? 'Certified Pre-Owned' : 'Used',
        status,
        engine: fuel === 'Electric' ? 'Electric Motor' : `${(1.5 + (idx % 4) * 0.5).toFixed(1)}L Turbo`,
        horsepower: 120 + (idx % 10) * 25,
        torque: `${250 + (idx % 8) * 30} Nm`,
        displacement: fuel === 'Electric' ? undefined : `${(1.5 + (idx % 4) * 0.5).toFixed(1)}L`,
        drivetrain: pick(['FWD', 'RWD', 'AWD', '4WD'], idx),
        fuelEconomy: fuel === 'Electric' ? '450 km range' : `${12 + (idx % 6)} km/l`,
        doors: bodyType === 'SUV' ? 5 : 4,
        cargoSpace: bodyType === 'SUV' ? '550 L' : '450 L',
        owners: (idx % 3) + 1,
        accidentFree: idx % 7 !== 0,
        serviceHistory: idx % 5 !== 0,
        seats: bodyType === 'SUV' ? 7 : 5,
        rating: 4.2 + (idx % 8) * 0.1,
        images: getCarImages(make, idx),
        imageAlt: getCarImageAlt(make, model, year),
        features: FEATURES_POOL.slice(idx % 5, (idx % 5) + 6),
        safetyFeatures: ['ABS', 'Airbags', 'ESP', 'Traction Control', 'ISOFIX'],
        description: `Well-maintained ${make} ${model} ${year} with full service history. Ideal for daily driving with premium comfort and safety features.`,
        badges: idx % 4 === 0 ? ['Verified', 'Top Pick'] : idx % 3 === 0 ? ['Verified'] : [],
        city: pick(CITIES, idx),
        listingDate: `2024-${String((idx % 12) + 1).padStart(2, '0')}-${String((idx % 28) + 1).padStart(2, '0')}`,
      })
      idx++
    }
    if (idx >= 50) break
  }
  return cars.slice(0, 50)
}

export const mockCars: Car[] = generateCars()

export function getCarById(id: string): Car | undefined {
  return mockCars.find((c) => c.id === id)
}

export function getCarsByStatus(status: CarStatus): Car[] {
  return mockCars.filter((c) => c.status === status)
}

export function getSimilarCars(id: string, limit = 4): Car[] {
  const car = getCarById(id)
  if (!car) return mockCars.slice(0, limit)
  return mockCars
    .filter((c) => c.id !== id && (c.make === car.make || c.bodyType === car.bodyType))
    .slice(0, limit)
}

export function getUniqueMakes(): string[] {
  return [...new Set(mockCars.map((c) => c.make))].sort()
}

export function getModelsByMake(make: string): string[] {
  return [...new Set(mockCars.filter((c) => c.make === make).map((c) => c.model))].sort()
}

export const ALL_FEATURES = [...new Set(mockCars.flatMap((c) => c.features))].sort()
