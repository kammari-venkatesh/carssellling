import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { PillButton } from '@/components/shared/PillButton'
import { CarImage } from '@/components/shared/CarImage'
import { HERO_IMAGES } from '@/data/carImages'

const SLIDES = [
  {
    image: HERO_IMAGES.main,
    imageAlt: 'Premium sports car',
    keys: { title: 'hero.slide1Title', sub: 'hero.slide1Sub', btn1: 'hero.slide1Btn1', btn2: 'hero.slide1Btn2' },
    type: 'dual' as const,
    link: '/buy',
  },
  {
    image: HERO_IMAGES.sell,
    imageAlt: 'Sell your car',
    keys: { title: 'hero.slide2Title', sub: 'hero.slide2Sub', btn: 'hero.slide2Btn' },
    type: 'single' as const,
    link: '/sell',
  },
  {
    image: HERO_IMAGES.exchange,
    imageAlt: 'Exchange your car',
    keys: { title: 'hero.slide3Title', sub: 'hero.slide3Sub', btn: 'hero.slide3Btn' },
    type: 'single' as const,
    link: '/exchange',
  },
]

export function HeroSlider() {
  const { t } = useTranslation('home')
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [paused, next])

  const slide = SLIDES[current]

  return (
    <section
      className="pb-4 pt-6 md:pt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-main">
        <div className="overflow-hidden rounded-3xl bg-white shadow-card">
          <div className="bg-gradient-to-b from-[#f5f5f5] to-white px-6 pb-8 pt-10 md:px-12 md:pt-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="flex flex-col items-center text-center"
              >
                <h1 className="text-display text-text-dark">{t(slide.keys.title)}</h1>
                <p className="mt-3 max-w-lg text-base text-text-mid md:text-lg">{t(slide.keys.sub)}</p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {slide.type === 'dual' ? (
                    <>
                      <PillButton variant="white" size="md">{t(slide.keys.btn1!)}</PillButton>
                      <PillButton to="/buy" size="md">{t(slide.keys.btn2!)} →</PillButton>
                    </>
                  ) : (
                    <PillButton to={slide.link} size="md">{t(slide.keys.btn!)} →</PillButton>
                  )}
                </div>

                <div className="mt-8 w-full max-w-4xl">
                  <CarImage
                    src={slide.image}
                    alt={slide.imageAlt}
                    aspect={false}
                    className="aspect-[21/9] max-h-[280px] w-full rounded-2xl md:max-h-[340px]"
                    imgClassName="object-contain object-center"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-accent-red' : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
