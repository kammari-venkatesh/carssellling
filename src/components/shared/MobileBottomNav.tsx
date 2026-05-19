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
    <nav className="fixed bottom-0 start-0 end-0 z-40 border-t border-border bg-white md:hidden">
      <div className="flex justify-around py-2">
        {links.map(({ to, icon: Icon, labelKey }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              'flex flex-col items-center gap-0.5 px-2 py-1 text-[10px]',
              location.pathname === to ? 'text-accent-red' : 'text-text-light',
            )}
          >
            <Icon size={20} />
            <span>{t(labelKey)}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
