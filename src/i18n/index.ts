import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enBuy from './locales/en/buy.json'
import enCarDetail from './locales/en/carDetail.json'
import enSell from './locales/en/sell.json'
import enExchange from './locales/en/exchange.json'
import enFinancing from './locales/en/financing.json'
import enAbout from './locales/en/about.json'
import enContact from './locales/en/contact.json'
import enInspect from './locales/en/inspect.json'
import enCompare from './locales/en/compare.json'
import enWishlist from './locales/en/wishlist.json'
import enTestimonials from './locales/en/testimonials.json'

import arCommon from './locales/ar/common.json'
import arHome from './locales/ar/home.json'
import arBuy from './locales/ar/buy.json'
import arCarDetail from './locales/ar/carDetail.json'
import arSell from './locales/ar/sell.json'
import arExchange from './locales/ar/exchange.json'
import arFinancing from './locales/ar/financing.json'
import arAbout from './locales/ar/about.json'
import arContact from './locales/ar/contact.json'
import arInspect from './locales/ar/inspect.json'
import arCompare from './locales/ar/compare.json'
import arWishlist from './locales/ar/wishlist.json'
import arTestimonials from './locales/ar/testimonials.json'

import ruCommon from './locales/ru/common.json'
import ruHome from './locales/ru/home.json'
import ruBuy from './locales/ru/buy.json'
import ruCarDetail from './locales/ru/carDetail.json'
import ruSell from './locales/ru/sell.json'
import ruExchange from './locales/ru/exchange.json'
import ruFinancing from './locales/ru/financing.json'
import ruAbout from './locales/ru/about.json'
import ruContact from './locales/ru/contact.json'
import ruInspect from './locales/ru/inspect.json'
import ruCompare from './locales/ru/compare.json'
import ruWishlist from './locales/ru/wishlist.json'
import ruTestimonials from './locales/ru/testimonials.json'

export const namespaces = [
  'common', 'home', 'buy', 'carDetail', 'sell', 'exchange',
  'financing', 'about', 'contact', 'inspect', 'compare', 'wishlist', 'testimonials',
] as const

const resources = {
  en: {
    common: enCommon, home: enHome, buy: enBuy, carDetail: enCarDetail,
    sell: enSell, exchange: enExchange, financing: enFinancing, about: enAbout,
    contact: enContact, inspect: enInspect, compare: enCompare, wishlist: enWishlist,
    testimonials: enTestimonials,
  },
  ar: {
    common: arCommon, home: arHome, buy: arBuy, carDetail: arCarDetail,
    sell: arSell, exchange: arExchange, financing: arFinancing, about: arAbout,
    contact: arContact, inspect: arInspect, compare: arCompare, wishlist: arWishlist,
    testimonials: arTestimonials,
  },
  ru: {
    common: ruCommon, home: ruHome, buy: ruBuy, carDetail: ruCarDetail,
    sell: ruSell, exchange: ruExchange, financing: ruFinancing, about: ruAbout,
    contact: ruContact, inspect: ruInspect, compare: ruCompare, wishlist: ruWishlist,
    testimonials: ruTestimonials,
  },
}

export type Language = 'en' | 'ar' | 'ru'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: [...namespaces],
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
  })

export function setDocumentLanguage(lang: Language) {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
}

export default i18n
