import { HeroSlider } from '@/components/home/HeroSlider'
import { QuickSearch } from '@/components/home/QuickSearch'
import { ServiceCards } from '@/components/home/ServiceCards'
import { FeaturedInventory } from '@/components/home/FeaturedInventory'
import { HowItWorks } from '@/components/home/HowItWorks'
import { TrustBanner } from '@/components/home/TrustBanner'
import { Testimonials } from '@/components/home/Testimonials'
import { CTABanner } from '@/components/home/CTABanner'

export default function Home() {
  return (
    <>
      <HeroSlider />
      <QuickSearch />
      <ServiceCards />
      <FeaturedInventory />
      <HowItWorks />
      <TrustBanner />
      <Testimonials />
      <CTABanner />
    </>
  )
}
