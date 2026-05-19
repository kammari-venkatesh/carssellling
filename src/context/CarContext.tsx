import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useTranslation } from 'react-i18next'
import type { CarFilters } from '@/types/car'
import type { Language } from '@/i18n'
import { setDocumentLanguage } from '@/i18n'
import i18n from '@/i18n'

interface CarContextValue {
  wishlist: string[]
  compareList: string[]
  filters: CarFilters
  language: Language
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  toggleWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  addToCompare: (id: string) => boolean
  removeFromCompare: (id: string) => void
  clearCompare: () => void
  isInCompare: (id: string) => boolean
  setFilters: (filters: CarFilters) => void
  resetFilters: () => void
  setLanguage: (lang: Language) => void
}

const CarContext = createContext<CarContextValue | null>(null)

const WISHLIST_KEY = 'autoxchange_wishlist'
const COMPARE_KEY = 'autoxchange_compare'

function loadStorage(key: string): string[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CarProvider({ children }: { children: ReactNode }) {
  const { i18n: i18nInstance } = useTranslation()
  const [wishlist, setWishlist] = useState<string[]>(() => loadStorage(WISHLIST_KEY))
  const [compareList, setCompareList] = useState<string[]>(() => loadStorage(COMPARE_KEY))
  const [filters, setFiltersState] = useState<CarFilters>({})
  const [language, setLanguageState] = useState<Language>(
    () => (i18nInstance.language as Language) || 'en',
  )

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList))
  }, [compareList])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    i18n.changeLanguage(lang)
    setDocumentLanguage(lang)
    localStorage.setItem('autoxchange_lang', lang)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('autoxchange_lang') as Language | null
    if (saved && ['en', 'ar', 'ru'].includes(saved)) {
      setLanguage(saved)
    } else {
      setDocumentLanguage(language)
    }
  }, [language, setLanguage])

  const addToWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((x) => x !== id))
  }, [])

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const isInWishlist = useCallback((id: string) => wishlist.includes(id), [wishlist])

  const addToCompare = useCallback((id: string): boolean => {
    if (compareList.includes(id)) return true
    if (compareList.length >= 3) return false
    setCompareList((prev) => [...prev, id])
    return true
  }, [compareList])

  const removeFromCompare = useCallback((id: string) => {
    setCompareList((prev) => prev.filter((x) => x !== id))
  }, [])

  const clearCompare = useCallback(() => setCompareList([]), [])

  const isInCompare = useCallback((id: string) => compareList.includes(id), [compareList])

  const setFilters = useCallback((f: CarFilters) => setFiltersState(f), [])
  const resetFilters = useCallback(() => setFiltersState({}), [])

  const value = useMemo(
    () => ({
      wishlist,
      compareList,
      filters,
      language,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
      setFilters,
      resetFilters,
      setLanguage,
    }),
    [
      wishlist,
      compareList,
      filters,
      language,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      isInWishlist,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
      setFilters,
      resetFilters,
      setLanguage,
    ],
  )

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>
}

export function useCar() {
  const ctx = useContext(CarContext)
  if (!ctx) throw new Error('useCar must be used within CarProvider')
  return ctx
}
