import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SlidersHorizontal, Search } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeInView } from '@/components/ui/FadeInView'
import { useCar } from '@/context/CarContext'
import { getUniqueMakes } from '@/data/mockCars'

const BODY_TYPES = ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Electric']
const FUELS = ['Petrol', 'Diesel', 'Electric', 'Hybrid']
const TRANSMISSIONS = ['Automatic', 'Manual']

export function AdvancedSearchSection() {
  const navigate = useNavigate()
  const { setFilters } = useCar()
  const [budget, setBudget] = useState(2500000)
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [bodyTypes, setBodyTypes] = useState<string[]>([])
  const [fuels, setFuels] = useState<string[]>([])
  const [transmissions, setTransmissions] = useState<string[]>([])
  const [yearMin, setYearMin] = useState(2019)
  const makes = getUniqueMakes()

  const toggle = <T,>(arr: T[], item: T, set: (v: T[]) => void) => {
    set(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item])
  }

  const handleSearch = () => {
    setFilters({
      makes: selectedMakes.length ? selectedMakes : undefined,
      bodyTypes: bodyTypes.length ? bodyTypes : undefined,
      fuels: fuels.length ? fuels : undefined,
      transmissions: transmissions.length ? transmissions : undefined,
      priceMax: budget,
      yearMin,
    })
    navigate('/buy')
  }

  const maxBudget = 10000000

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute end-0 top-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />
      <div className="container-main relative">
        <SectionHeader
          eyebrow="Smart Search"
          title="Find Your Perfect Match"
          subtitle="Refine by budget, brand, fuel type, and more with our intelligent filters."
        />

        <FadeInView delay={0.15} className="mt-12">
          <div className="glass rounded-[24px] p-6 md:p-10">
            <div className="mb-8 flex items-center gap-2 text-white">
              <SlidersHorizontal size={20} className="text-accent" />
              <span className="font-semibold">Advanced Filters</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-2">
              {/* Budget slider */}
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Max Budget</span>
                  <span className="font-bold text-white">₹ {(budget / 100000).toFixed(1)} L</span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={maxBudget}
                  step={100000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent"
                />
                <div className="mt-1 flex justify-between text-xs text-text-muted">
                  <span>₹5L</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              {/* Year */}
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Year From</span>
                  <span className="font-bold text-white">{yearMin}</span>
                </div>
                <input
                  type="range"
                  min={2015}
                  max={2024}
                  value={yearMin}
                  onChange={(e) => setYearMin(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent"
                />
              </div>
            </div>

            {/* Brand chips */}
            <div className="mt-10">
              <p className="mb-3 text-sm font-medium text-text-muted">Brand</p>
              <div className="flex flex-wrap gap-2">
                {makes.slice(0, 12).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => toggle(selectedMakes, m, setSelectedMakes)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      selectedMakes.includes(m)
                        ? 'border-accent bg-accent/20 text-white'
                        : 'border-border text-text-muted hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Body & fuel & transmission */}
            {[
              { label: 'Body Type', items: BODY_TYPES, state: bodyTypes, set: setBodyTypes },
              { label: 'Fuel', items: FUELS, state: fuels, set: setFuels },
              { label: 'Transmission', items: TRANSMISSIONS, state: transmissions, set: setTransmissions },
            ].map(({ label, items, state, set }) => (
              <div key={label} className="mt-8">
                <p className="mb-3 text-sm font-medium text-text-muted">{label}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggle(state, item, set)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                        state.includes(item)
                          ? 'border-accent-2 bg-accent-2/15 text-white'
                          : 'border-border text-text-muted hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button type="button" onClick={handleSearch} className="btn-primary mt-10 w-full md:w-auto">
              <Search size={18} />
              Search {selectedMakes.length || bodyTypes.length ? 'Filtered' : 'All'} Cars
            </button>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}
