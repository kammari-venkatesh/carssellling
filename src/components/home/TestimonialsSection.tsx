import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/data/homeContent'
import { SectionHeader } from '@/components/ui/SectionHeader'
import 'swiper/css'
import 'swiper/css/pagination'

export function TestimonialsSection() {
  return (
    <section className="section-pad">
      <div className="container-main">
        <SectionHeader
          eyebrow="Testimonials"
          title="Trusted by Thousands"
          subtitle="Real stories from buyers and sellers across India."
        />

        <div className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-14"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.name}>
                <div className="premium-card h-full p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-text-muted">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                    <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-accent/30" />
                    <div>
                      <p className="font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-accent">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
