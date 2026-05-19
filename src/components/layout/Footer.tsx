import { Link } from 'react-router-dom'
import { Share2, Mail, Phone, MapPin } from 'lucide-react'

const COMPANY = [
  { to: '/about', label: 'About Us' },
  { to: '/about', label: 'Careers' },
  { to: '/contact', label: 'Press' },
  { to: '/contact', label: 'Blog' },
]

const SERVICES = [
  { to: '/buy', label: 'Buy Cars' },
  { to: '/sell', label: 'Sell Car' },
  { to: '/exchange', label: 'Exchange' },
  { to: '/financing', label: 'Financing' },
  { to: '/inspect', label: 'Inspection' },
]

const LEGAL = [
  { to: '#', label: 'Privacy Policy' },
  { to: '#', label: 'Terms of Service' },
  { to: '#', label: 'Cookie Policy' },
]

const SOCIAL = ['Instagram', 'Facebook', 'LinkedIn', 'Twitter']

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-main py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold text-white">
              Auto<span className="text-accent">X</span>change
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
              India&apos;s trusted premium car marketplace. Buy, sell, and exchange verified vehicles with confidence.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIAL.map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-muted transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <Share2 size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
            <ul className="mt-4 space-y-2.5">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-text-muted hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-text-muted hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Legal</h4>
            <ul className="mt-4 space-y-2.5">
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-text-muted hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-12 lg:grid-cols-2">
          <div className="space-y-3 text-sm text-text-muted">
            <p className="flex items-center gap-2"><MapPin size={16} className="text-accent" /> Mumbai, Delhi, Bangalore & 40+ cities</p>
            <p className="flex items-center gap-2"><Phone size={16} className="text-accent" /> +91 1800-XXX-XXXX</p>
            <p className="flex items-center gap-2"><Mail size={16} className="text-accent" /> hello@autoxchange.in</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Stay in the loop</p>
            <p className="mt-1 text-sm text-text-muted">Get deals, new arrivals, and market insights.</p>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="input-dark flex-1"
              />
              <button type="submit" className="btn-primary shrink-0 !px-5">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <div className="container-main flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted">
          <span>© {new Date().getFullYear()} AutoXchange. All rights reserved.</span>
          <span>Made for premium automotive experiences</span>
        </div>
      </div>
    </footer>
  )
}
