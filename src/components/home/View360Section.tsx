import { motion } from 'framer-motion'
import { Eye, Scan, FileCheck, RotateCw } from 'lucide-react'
import { FadeInView } from '@/components/ui/FadeInView'

const FEATURES = [
  { icon: Eye, title: 'Interior Preview', desc: 'Explore cabin details in high resolution' },
  { icon: Scan, title: 'Exterior Preview', desc: '360° walkaround from every angle' },
  { icon: FileCheck, title: 'Damage Check', desc: 'AI-detected panel and paint analysis' },
  { icon: FileCheck, title: 'Inspection Report', desc: 'Full 300-point PDF report included' },
]

const CAR_PREVIEW =
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=85'

export function View360Section() {
  return (
    <section className="section-pad bg-surface/60">
      <div className="container-main">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeInView direction="right">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-64 w-64 rounded-full bg-accent/30 blur-[80px]" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="relative flex h-72 w-72 items-center justify-center rounded-full border border-dashed border-accent/40 md:h-80 md:w-80"
              >
                <img
                  src={CAR_PREVIEW}
                  alt="360 car preview"
                  className="h-48 w-auto object-contain md:h-56"
                />
              </motion.div>
              <motion.div
                className="absolute end-4 top-4 flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent backdrop-blur-sm"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <RotateCw size={14} />
                360° View
              </motion.div>
            </div>
          </FadeInView>

          <FadeInView delay={0.15}>
            <p className="text-eyebrow">Virtual Experience</p>
            <h2 className="text-section mt-3">Inspect Every Detail Before You Buy</h2>
            <p className="mt-4 text-text-muted">
              Our immersive 360° inspection technology lets you examine every angle — from paint finish to interior trim — before you commit.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex gap-4 rounded-2xl border border-border bg-card/80 p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                    <f.icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{f.title}</h4>
                    <p className="mt-0.5 text-sm text-text-muted">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}
