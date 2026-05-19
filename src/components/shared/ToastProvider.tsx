import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'info' | 'error'

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let toastId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
  }, [])

  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <motion.div className="fixed top-20 end-4 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white shadow-hover',
                t.type === 'success' && 'bg-accent-red',
                t.type === 'info' && 'bg-text-mid',
                t.type === 'error' && 'bg-accent-red-dark',
              )}
            >
              <span>{t.message}</span>
              <button onClick={() => remove(t.id)} aria-label="Close">
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
