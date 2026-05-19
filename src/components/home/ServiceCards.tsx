import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { PillButton } from '@/components/shared/PillButton'
import { CarImage } from '@/components/shared/CarImage'
import { SERVICE_IMAGES } from '@/data/carImages'
import { useInViewAnimation } from '@/hooks/useInViewAnimation'

export function ServiceCards() {
  const { t } = useTranslation('home')
  const { ref, isInView } = useInViewAnimation()

  const cards = [
    { num: 1, title: t('services.orderTitle'), desc: t('services.orderDesc'), to: '/buy' },
    { num: 2, title: t('services.stockTitle'), desc: t('services.stockDesc'), to: '/buy?status=In Stock' },
    { num: 3, title: t('services.wayTitle'), desc: t('services.wayDesc'), to: '/buy?status=On the Way' },
  ]

  return (
    <section className="section-y" ref={ref}>
      <div className="container-main text-center">
        <SectionLabel>{t('catalog.label')}</SectionLabel>
        <h2 className="text-section-heading mx-auto mt-5 max-w-3xl font-medium">
          {t('catalog.heading')}
        </h2>
      </div>

      <div className="container-main mt-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2"
        >
          <ServiceCard num={cards[0].num} title={cards[0].title} desc={cards[0].desc} to={cards[0].to} />
          <ServiceCard num={cards[1].num} title={cards[1].title} desc={cards[1].desc} to={cards[1].to} />
          <ImageCell src={SERVICE_IMAGES.tailLight} alt="Car detail" className="md:row-span-1" />
          <ImageCell src={SERVICE_IMAGES.headlight} alt="Car headlight" className="hidden md:block" />
          <ServiceCard num={cards[2].num} title={cards[2].title} desc={cards[2].desc} to={cards[2].to} />
          <ImageCell src={SERVICE_IMAGES.silhouette} alt="Car silhouette" className="hidden md:block" />
        </motion.div>

        {/* Mobile: show images between cards */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:hidden">
          <ImageCell src={SERVICE_IMAGES.headlight} alt="Car headlight" />
          <ImageCell src={SERVICE_IMAGES.silhouette} alt="Car silhouette" />
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ num, title, desc, to }: { num: number; title: string; desc: string; to: string }) {
  const { t } = useTranslation('common')
  return (
    <div className="relative flex h-[220px] flex-col rounded-2xl bg-white p-6 shadow-card">
      <span className="absolute -start-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent-red bg-white text-sm font-semibold text-accent-red">
        {num}
      </span>
      <h3 className="mt-1 font-heading text-lg font-semibold text-text-dark">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-mid line-clamp-4">{desc}</p>
      <Link to={to} className="mt-4">
        <PillButton size="sm">{t('buttons.readMore')} →</PillButton>
      </Link>
    </div>
  )
}

function ImageCell({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className={`h-[220px] overflow-hidden rounded-2xl ${className ?? ''}`}>
      <CarImage src={src} alt={alt} dark aspect={false} className="h-full w-full" imgClassName="h-full w-full object-cover" />
    </motion.div>
  )
}
