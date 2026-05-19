import { motion } from 'framer-motion'
import { TRUST_FEATURES } from '@/data/homeContent'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeInView } from '@/components/ui/FadeInView'

export function TrustSection() {
  return (
    <section className="section-pad relative">
      <div className="glow-gradient pointer-events-none absolute inset-0" />
      <div className="container-main relative">
        <SectionHeader
          eyebrow="Why AutoXchange"
          title="Built on Trust, Backed by Technology"
          subtitle="Every vehicle meets our premium standards before it reaches you."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_FEATURES.map((f, i) => (
            <FadeInView key={f.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-[24px] border border-border bg-card p-6"
              >
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-accent/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute -end-8 -top-8 h-24 w-24 rounded-full bg-accent/20 blur-2xl transition-opacity group-hover:opacity-100 opacity-0" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 shadow-lg shadow-accent/25">
                  <f.icon size={22} className="text-white" />
                </div>
                <h3 className="relative mt-5 text-lg font-bold text-white">{f.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-text-muted">{f.description}</p>
              </motion.div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  )
}
