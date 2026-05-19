import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Percent, Calendar, IndianRupee } from 'lucide-react'
import { calculateEMI } from '@/utils/calculateEMI'
import { formatCurrency } from '@/utils/formatCurrency'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeInView } from '@/components/ui/FadeInView'

const FINANCE_IMAGE =
  'https://images.unsplash.com/photo-1617814076665-62c7b2ac1800?w=900&q=85'

export function FinancingSection() {
  const [loanAmount, setLoanAmount] = useState(2500000)
  const [interest, setInterest] = useState(9.5)
  const [tenure, setTenure] = useState(60)

  const emi = useMemo(
    () => Math.round(calculateEMI(loanAmount, interest, tenure)),
    [loanAmount, interest, tenure],
  )

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute start-0 bottom-0 h-[400px] w-[400px] rounded-full bg-accent-2/10 blur-[120px]" />
      <div className="container-main">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeInView>
            <SectionHeader
              align="left"
              eyebrow="Financing"
              title="Calculate Your EMI in Seconds"
              subtitle="Get instant pre-approval from India's top lending partners."
            />

            <div className="glass mt-8 space-y-8 rounded-[24px] p-6 md:p-8">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-text-muted">
                    <IndianRupee size={16} /> Loan Amount
                  </span>
                  <span className="font-bold text-white">{formatCurrency(loanAmount)}</span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={8000000}
                  step={100000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="mt-3 h-2 w-full appearance-none rounded-full bg-white/10 accent-accent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-text-muted">
                    <Percent size={16} /> Interest Rate
                  </span>
                  <span className="font-bold text-white">{interest}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={7}
                  max={18}
                  step={0.1}
                  value={interest}
                  onChange={(e) => setInterest(Number(e.target.value))}
                  className="mt-3 h-2 w-full appearance-none rounded-full bg-white/10 accent-accent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-text-muted">
                    <Calendar size={16} /> Tenure
                  </span>
                  <span className="font-bold text-white">{tenure} months</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={84}
                  step={6}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="mt-3 h-2 w-full appearance-none rounded-full bg-white/10 accent-accent"
                />
              </div>

              <motion.div
                key={emi}
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/20 to-transparent p-6 text-center"
              >
                <p className="text-sm text-text-muted">Estimated Monthly EMI</p>
                <p className="mt-1 text-4xl font-bold text-white">{formatCurrency(emi)}</p>
                <p className="mt-2 text-xs text-text-muted">*Indicative. Final rate subject to lender approval.</p>
              </motion.div>
            </div>
          </FadeInView>

          <FadeInView delay={0.2} direction="left">
            <div className="relative">
              <img
                src={FINANCE_IMAGE}
                alt="Luxury car financing"
                className="rounded-[24px] object-cover shadow-2xl"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="glass absolute -bottom-6 -start-4 rounded-2xl p-5 md:-start-8"
              >
                <p className="text-2xl font-bold text-white">8.5%</p>
                <p className="text-sm text-text-muted">Starting APR</p>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="glass absolute -end-4 top-8 rounded-2xl p-5 md:-end-8"
              >
                <p className="text-2xl font-bold text-accent">10 min</p>
                <p className="text-sm text-text-muted">Pre-approval</p>
              </motion.div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}
