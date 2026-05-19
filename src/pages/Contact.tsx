import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useToast } from '@/components/shared/ToastProvider'
import { PillButton } from '@/components/shared/PillButton'

const inputClass = 'input-field mt-1 rounded-2xl'

export default function Contact() {
  const { t } = useTranslation(['contact', 'common'])
  const { toast } = useToast()
  const inquiryTypes = t('contact:form.inquiryTypes', { returnObjects: true }) as string[]

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: inquiryTypes[0] ?? '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast(t('contact:form.success'))
    setForm({ name: '', email: '', phone: '', inquiry: inquiryTypes[0] ?? '', message: '' })
  }

  return (
    <div className="container-main section-y">
      <h1 className="text-section-heading font-semibold">{t('contact:title')}</h1>
      <p className="mt-2 text-text-mid">{t('contact:subtitle')}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          {[
            { icon: Phone, label: t('contact:info.phone'), value: t('common:footer.phone') },
            { icon: Mail, label: t('contact:info.email'), value: t('common:footer.email') },
            { icon: MapPin, label: t('contact:info.address'), value: t('common:footer.address') },
            { icon: Clock, label: t('contact:info.hours'), value: t('common:footer.hours') },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4 rounded-2xl bg-white p-4 shadow-card">
              <Icon className="shrink-0 text-accent-red" size={22} />
              <div>
                <p className="text-sm font-medium text-text-light">{label}</p>
                <p className="text-text-dark">{value}</p>
              </div>
            </div>
          ))}
          <div className="flex h-48 items-center justify-center rounded-2xl bg-number-bg text-sm text-text-light">
            {t('contact:map')}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-card">
          <label className="block">
            <span className="text-sm font-medium">{t('contact:form.name')}</span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-medium">{t('contact:form.email')}</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-medium">{t('contact:form.phone')}</span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-medium">{t('contact:form.inquiry')}</span>
            <select
              value={form.inquiry}
              onChange={(e) => setForm((f) => ({ ...f, inquiry: e.target.value }))}
              className={inputClass}
            >
              {inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-medium">{t('contact:form.message')}</span>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className={inputClass}
            />
          </label>
          <PillButton type="submit" className="mt-6 w-full justify-center">
            {t('common:buttons.sendMessage')}
          </PillButton>
        </form>
      </div>
    </div>
  )
}
