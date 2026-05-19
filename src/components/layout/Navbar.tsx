import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, User, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCar } from '@/context/CarContext'
import { mockCars } from '@/data/mockCars'

const NAV = [
  { to: '/buy', label: 'Buy Cars' },
  { to: '/sell', label: 'Sell Car' },
  { to: '/exchange', label: 'Exchange' },
  { to: '/financing', label: 'Financing' },
  { to: '/inspect', label: 'Inspect' },
  { to: '/about', label: 'About' },
]

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { wishlist } = useCar()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  const results = query.length > 1
    ? mockCars
        .filter((c) => `${c.make} ${c.model}`.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    : []

  const solid = scrolled || !isHome

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          solid
            ? 'border-b border-border bg-bg/90 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.4)] backdrop-blur-xl'
            : 'bg-transparent py-4',
        )}
      >
        <div className="container-main flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0 text-lg font-bold tracking-tight text-white">
            Auto<span className="text-accent">X</span>change
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.to + item.label}
                to={item.to}
                className={cn(
                  'nav-link-premium text-sm font-medium',
                  location.pathname === item.to && 'active',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setSearchOpen((o) => !o)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-border-hover hover:text-white"
                aria-label="Search"
                aria-expanded={searchOpen}
              >
                <Search size={17} />
              </button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="glass absolute end-0 top-full z-50 mt-2 w-72 rounded-xl p-3 shadow-xl"
                  >
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search make or model..."
                      className="input-dark w-full"
                      autoFocus
                    />
                    {results.length > 0 && (
                      <div className="mt-2 max-h-48 overflow-y-auto">
                        {results.map((car) => (
                          <button
                            key={car.id}
                            type="button"
                            onClick={() => {
                              navigate(`/car/${car.id}`)
                              setSearchOpen(false)
                              setQuery('')
                            }}
                            className="block w-full rounded-lg px-3 py-2 text-start text-sm text-text-muted transition-colors hover:bg-white/5 hover:text-white"
                          >
                            {car.make} {car.model} · {car.year}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/wishlist"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:text-white"
              aria-label="Wishlist"
            >
              <Heart size={17} />
              {wishlist.length > 0 && (
                <span className="absolute -end-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/contact"
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:text-white sm:flex"
              aria-label="Account"
            >
              <User size={17} />
            </Link>

            <Link to="/buy" className="btn-primary hidden !px-4 !py-2 text-sm sm:inline-flex">
              Get Started
            </Link>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-white lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.22 }}
              className="fixed end-0 top-0 z-[70] flex h-full w-[min(100%,300px)] flex-col bg-card lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="font-semibold text-white">Menu</span>
                <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={20} className="text-white" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-3">
                {NAV.map((item) => (
                  <Link
                    key={item.to + item.label}
                    to={item.to}
                    className={cn(
                      'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      location.pathname === item.to
                        ? 'bg-accent/15 text-white'
                        : 'text-text-muted hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-border p-4">
                <Link to="/buy" className="btn-primary w-full justify-center">
                  Get Started
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
