import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCar } from '@/context/CarContext'
import type { Language } from '@/i18n'
import { PillButton } from '@/components/shared/PillButton'
import { mockCars } from '@/data/mockCars'

const LANGS: Language[] = ['en', 'ar', 'ru']

export function Navbar() {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const { language, setLanguage, wishlist } = useCar()
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const navLinks = [
    { to: '/buy', label: t('nav.buy') },
    { to: '/sell', label: t('nav.sellExchange') },
    { to: '/financing', label: t('nav.financing') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ]

  const categories = [
    { to: '/buy?body=Sedan', label: t('catalogCategories.sedans') },
    { to: '/buy?body=SUV', label: t('catalogCategories.suvs') },
    { to: '/buy?body=Hatchback', label: t('catalogCategories.hatchbacks') },
    { to: '/buy?body=Luxury', label: t('catalogCategories.luxury') },
    { to: '/buy?body=Electric', label: t('catalogCategories.electric') },
    { to: '/buy?budget=1', label: t('catalogCategories.budget') },
  ]

  const searchResults = search.length > 1
    ? mockCars.filter((c) =>
        `${c.make} ${c.model}`.toLowerCase().includes(search.toLowerCase()),
      ).slice(0, 5)
    : []

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      <div className="container-main flex h-20 items-center justify-between gap-4">
        <Link to="/" className="shrink-0">
          <div className="font-heading text-lg font-bold leading-tight text-text-dark">
            Auto<span className="text-accent-red">X</span>change
          </div>
          <div className="text-[10px] text-text-light">{t('tagline')}</div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <div className="relative">
            <button
              onClick={() => setCatalogOpen(!catalogOpen)}
              className="flex items-center gap-1 text-sm font-medium text-text-mid transition-colors hover:text-text-dark"
            >
              {t('nav.catalog')}
              <ChevronDown size={14} className={cn('transition-transform', catalogOpen && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {catalogOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute start-0 top-full mt-2 grid w-[480px] grid-cols-2 gap-1 rounded-2xl border border-border bg-white p-4 shadow-hover"
                >
                  {categories.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      onClick={() => setCatalogOpen(false)}
                      className="rounded-xl px-3 py-2 text-sm text-text-mid hover:bg-number-bg hover:text-text-dark"
                    >
                      {c.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-text-mid transition-colors hover:text-text-dark">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative hidden xl:block">
            <input
              type="search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setSearchOpen(true) }}
              onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
              placeholder={t('search.placeholder')}
              className="input-field w-44 lg:w-52"
            />
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute end-0 top-full mt-1 w-64 rounded-xl border border-border bg-white py-2 shadow-hover">
                {searchResults.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => { navigate(`/car/${car.id}`); setSearch(''); setSearchOpen(false) }}
                    className="block w-full px-4 py-2 text-start text-sm hover:bg-number-bg"
                  >
                    {car.make} {car.model} {car.year}
                  </button>
                ))}
                <button
                  onClick={() => { navigate(`/buy?keyword=${search}`); setSearchOpen(false) }}
                  className="block w-full border-t border-border px-4 py-2 text-start text-sm text-accent-red"
                >
                  {t('search.viewAll')} "{search}"
                </button>
              </div>
            )}
          </div>

          <div className="hidden items-center gap-0.5 rounded-full border border-border bg-number-bg/50 p-0.5 sm:flex">
            {LANGS.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={cn(
                  'rounded-full px-2 py-1 text-[10px] font-semibold uppercase transition-all',
                  language === lang ? 'bg-text-dark text-white' : 'text-text-light hover:text-text-dark',
                )}
              >
                {lang}
              </button>
            ))}
          </div>

          <Link to="/wishlist" className="relative hidden sm:block" aria-label={t('nav.wishlist')}>
            <Heart size={20} className="text-text-mid" />
            {wishlist.length > 0 && (
              <span className="absolute -end-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-red text-[10px] text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          <PillButton to="/contact" variant="dark" size="sm" className="hidden min-w-[130px] sm:inline-flex">
            {t('nav.contactUs')} <ChevronDown size={14} />
          </PillButton>

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: language === 'ar' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: language === 'ar' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed end-0 top-0 z-50 flex h-full w-[85%] max-w-sm flex-col bg-white p-6 shadow-hover lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-heading text-lg font-bold">Auto<span className="text-accent-red">X</span>change</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close"><X size={24} /></button>
              </div>
              <div className="mb-4 flex gap-1">
                {LANGS.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs uppercase',
                      language === lang ? 'bg-text-dark text-white' : 'border-border text-text-light',
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <nav className="flex flex-col gap-4">
                <Link to="/buy" onClick={() => setMobileOpen(false)} className="text-lg font-medium">{t('nav.catalog')}</Link>
                {navLinks.map((l) => (
                  <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="text-lg font-medium">{l.label}</Link>
                ))}
                <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="text-lg font-medium">{t('nav.wishlist')}</Link>
                <Link to="/compare" onClick={() => setMobileOpen(false)} className="text-lg font-medium">{t('nav.compare')}</Link>
              </nav>
              <div className="mt-auto">
                <PillButton to="/contact" variant="dark" className="w-full justify-center">{t('nav.contactUs')}</PillButton>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
