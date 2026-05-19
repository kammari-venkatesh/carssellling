import { HeroSection } from '@/components/home/HeroSection'
import { TrustSection } from '@/components/home/TrustSection'
import { FeaturedCarsSection } from '@/components/home/FeaturedCarsSection'
import { AdvancedSearchSection } from '@/components/home/AdvancedSearchSection'
import { ProcessTimeline } from '@/components/home/ProcessTimeline'
import { FinancingSection } from '@/components/home/FinancingSection'
import { View360Section } from '@/components/home/View360Section'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { AppPromoSection } from '@/components/home/AppPromoSection'
import { FAQSection } from '@/components/home/FAQSection'
import { FinalCTASection } from '@/components/home/FinalCTASection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <FeaturedCarsSection />
      <AdvancedSearchSection />
      <ProcessTimeline />
      <FinancingSection />
      <View360Section />
      <TestimonialsSection />
      <AppPromoSection />
      <FAQSection />
      <FinalCTASection />
    </>
  )
}
