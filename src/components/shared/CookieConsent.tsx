import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PillButton } from './PillButton'

export function CookieConsent() {
  const { t } = useTranslation('common')
  const [visible, setVisible] = useState(() => !localStorage.getItem('cookies_accepted'))

  const accept = () => {
    localStorage.setItem('cookies_accepted', '1')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          className="fixed bottom-0 start-0 end-0 z-50 border-t border-border bg-white p-4 shadow-hover md:bottom-0"
        >
          <div className="container-main flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-text-mid">{t('cookie.message')}</p>
            <motion.div className="flex gap-2">
              <PillButton variant="crimson" onClick={accept}>{t('cookie.accept')}</PillButton>
              <PillButton variant="ghost" onClick={() => setVisible(false)}>{t('buttons.declineCookies')}</PillButton>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
