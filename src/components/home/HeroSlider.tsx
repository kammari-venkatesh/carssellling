import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { PillButton } from '@/components/shared/PillButton'
import { SectionLabel } from '@/components/shared/SectionLabel'
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
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [paused, next])

  const slide = SLIDES[current]

  return (
    <section
      className="pb-2 pt-6 md:pt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-main">
        <div className="pro-card overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-b from-bg-elevated to-white px-6 pb-10 pt-12 md:px-14 md:pb-12 md:pt-16"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center text-center"
              >
                <SectionLabel className="text-accent-red/80">{t('hero.eyebrow')}</SectionLabel>
                <h1 className="text-display mt-4">{t(slide.keys.title)}</h1>
                <p className="text-lead mt-4 max-w-xl">{t(slide.keys.sub)}</p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {slide.type === 'dual' ? (
                    <>
                      <PillButton to="/about" variant="white" size="md">{t(slide.keys.btn1!)}</PillButton>
                      <PillButton to="/buy" size="md">{t(slide.keys.btn2!)}</PillButton>
                    </>
                  ) : (
                    <PillButton to={slide.link} size="md">{t(slide.keys.btn!)}</PillButton>
                  )}
                </div>

                <motion.div className="mt-10 w-full max-w-4xl rounded-xl border border-border-subtle bg-number-bg/40 p-3 md:p-4">
                  <CarImage
                    src={slide.image}
                    alt={slide.imageAlt}
                    aspect={false}
                    className="aspect-[21/9] max-h-[260px] w-full md:max-h-[320px]"
                    imgClassName="object-contain object-center"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === current}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-7 bg-accent-red' : 'w-1.5 bg-border hover:bg-text-light'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
