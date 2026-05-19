import { MessageCircle } from 'lucide-react'

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-24 end-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-hover transition-transform hover:scale-105 md:bottom-6"
    >
      <MessageCircle size={28} />
    </a>
  )
}
