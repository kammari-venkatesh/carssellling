import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, Search, Tag, RefreshCw, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', icon: Home, labelKey: 'mobileNav.home' },
  { to: '/buy', icon: Search, labelKey: 'mobileNav.browse' },
  { to: '/sell', icon: Tag, labelKey: 'mobileNav.sell' },
  { to: '/exchange', icon: RefreshCw, labelKey: 'mobileNav.exchange' },
  { to: '/contact', icon: User, labelKey: 'mobileNav.account' },
]

export function MobileBottomNav() {
  const { t } = useTranslation('common')
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 start-0 end-0 z-40 border-t border-border-subtle bg-white/98 backdrop-blur-sm md:hidden">
      <div className="flex justify-around py-2.5">
        {links.map(({ to, icon: Icon, labelKey }) => {
          const active = location.pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex flex-col items-center gap-0.5 px-2 py-0.5 text-[10px] font-medium transition-colors',
                active ? 'text-accent-red' : 'text-text-light',
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.25 : 1.75} />
              <span>{t(labelKey)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
