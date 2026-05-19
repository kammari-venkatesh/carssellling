import { useTranslation } from 'react-i18next'
import { TrustBanner } from '@/components/home/TrustBanner'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Shield, Eye, Zap, CreditCard, MapPin, Headphones } from 'lucide-react'

const whyIcons = [Shield, Eye, Zap, CreditCard, MapPin, Headphones]

export default function About() {
  const { t } = useTranslation('about')
  const milestones = t('story.milestones', { returnObjects: true }) as {
    year: string
    title: string
    desc: string
  }[]
  const whyItems = t('why.items', { returnObjects: true }) as { title: string; desc: string }[]
  const team = t('team.members', { returnObjects: true }) as { name: string; role: string }[]

  return (
    <>
      <section className="bg-text-dark py-16 text-white">
        <div className="container-main text-center">
          <SectionLabel className="border-white/30 text-white/80">About</SectionLabel>
          <h1 className="mt-4 font-heading text-3xl font-bold md:text-4xl">{t('hero.title')}</h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">{t('hero.subtitle')}</p>
        </div>
      </section>

      <section className="container-main py-16">
        <h2 className="font-heading text-2xl font-bold">{t('story.title')}</h2>
        <div className="relative mt-10">
          <span className="absolute start-4 top-0 hidden h-full w-0.5 bg-border md:block" aria-hidden />
          <div className="space-y-8">
            {milestones.map((m) => (
              <div key={m.year} className="relative flex gap-6 md:ps-12">
                <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-red text-xs font-bold text-white md:absolute md:start-0 md:flex">
                  {m.year.slice(2)}
                </span>
                <div className="rounded-2xl bg-white p-6 shadow-card">
                  <p className="text-sm font-bold text-accent-red">{m.year}</p>
                  <h3 className="mt-1 font-heading text-lg font-semibold">{m.title}</h3>
                  <p className="mt-2 text-sm text-text-light">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-main">
          <h2 className="text-center font-heading text-2xl font-bold">{t('why.title')}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item, i) => {
              const Icon = whyIcons[i] ?? Shield
              return (
                <div key={item.title} className="rounded-2xl border border-border p-6">
                  <Icon className="text-accent-red" size={24} />
                  <h3 className="mt-3 font-heading font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-light">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <TrustBanner />

      <section className="container-main py-16">
        <h2 className="text-center font-heading text-2xl font-bold">{t('team.title')}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="rounded-2xl bg-white p-6 text-center shadow-card">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-number-bg font-heading text-2xl font-bold text-accent-red">
                {member.name.charAt(0)}
              </div>
              <h3 className="mt-4 font-heading font-semibold">{member.name}</h3>
              <p className="text-sm text-text-light">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
