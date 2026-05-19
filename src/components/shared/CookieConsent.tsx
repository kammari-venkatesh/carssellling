import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

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
          className="fixed bottom-0 start-0 end-0 z-50 border-t border-border bg-card/95 p-4 backdrop-blur-xl md:bottom-14"
        >
          <div className="container-main flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-text-muted">{t('cookie.message')}</p>
            <div className="flex gap-2">
              <button type="button" onClick={accept} className="btn-primary !py-2 !px-4 text-sm">
                {t('cookie.accept')}
              </button>
              <button type="button" onClick={() => setVisible(false)} className="btn-secondary !py-2 !px-4 text-sm">
                {t('buttons.declineCookies')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
