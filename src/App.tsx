import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CarProvider } from '@/context/CarContext'
import { ToastProvider } from '@/components/shared/ToastProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CompareDrawer } from '@/components/shared/CompareDrawer'
import { WhatsAppFab } from '@/components/shared/WhatsAppFab'
import { BackToTop } from '@/components/shared/BackToTop'
import { CookieConsent } from '@/components/shared/CookieConsent'
import { MobileBottomNav } from '@/components/shared/MobileBottomNav'
import { PageTransition } from '@/components/shared/PageTransition'
import Home from '@/pages/Home'
import Buy from '@/pages/Buy'
import CarDetail from '@/pages/CarDetail'
import Sell from '@/pages/Sell'
import Exchange from '@/pages/Exchange'
import Financing from '@/pages/Financing'
import Compare from '@/pages/Compare'
import Wishlist from '@/pages/Wishlist'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Inspect from '@/pages/Inspect'
import { FloatingValuation } from '@/components/sell/FloatingValuation'

function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <main className="min-h-[60vh] pb-20 lg:pb-0">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <CompareDrawer />
      <WhatsAppFab />
      <BackToTop />
      <CookieConsent />
      <MobileBottomNav />
      <FloatingValuation />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CarProvider>
        <ToastProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="buy" element={<Buy />} />
              <Route path="car/:id" element={<CarDetail />} />
              <Route path="sell" element={<Sell />} />
              <Route path="exchange" element={<Exchange />} />
              <Route path="financing" element={<Financing />} />
              <Route path="compare" element={<Compare />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="inspect" element={<Inspect />} />
            </Route>
          </Routes>
        </ToastProvider>
      </CarProvider>
    </BrowserRouter>
  )
}
