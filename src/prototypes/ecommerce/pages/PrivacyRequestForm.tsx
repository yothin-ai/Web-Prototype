import { useState } from 'react'
import { useLang } from '../../../i18n'
import { Button, Card, Field, Notice, Select, Textarea } from '../../../ui'
import { lg } from '../legalStrings'

const EMAIL = /^\S+@\S+\.\S+$/

// A simulated data rights request: nothing is sent, a reference number is shown on the page.
export function PrivacyRequestForm() {
  const { t } = useLang()
  const [form, setForm] = useState({ type: '', name: '', email: '', details: '' })
  const [tried, setTried] = useState(false)
  const [ref, setRef] = useState<string | null>(null)
  const set = (key: keyof typeof form, value: string) => setForm({ ...form, [key]: value })
  const errors = {
    type: !form.type ? t(lg.errType) : undefined,
    name: !form.name.trim() ? t(lg.errName) : undefined,
    email: !EMAIL.test(form.email) ? t(lg.errEmail) : undefined,
    details: !form.details.trim() ? t(lg.errDetails) : undefined,
  }
  const shown = (key: keyof typeof errors) => (tried ? errors[key] : undefined)
  const submit = () => {
    setTried(true)
    if (Object.values(errors).some(Boolean)) return
    setRef(`DSR-${String(Math.floor(Math.random() * 900000) + 100000)}`)
  }
  const reset = () => { setForm({ type: '', name: '', email: '', details: '' }); setTried(false); setRef(null) }

  if (ref) {
    return (
      <Card>
        <div className="stack">
          <h2>{t(lg.doneTitle)}</h2>
          <p><strong>{t(lg.doneRef)}:</strong> {ref}</p>
          <Notice tone="info">{t(lg.doneNote)}</Notice>
          <div><Button variant="secondary" onClick={reset}>{t(lg.another)}</Button></div>
        </div>
      </Card>
    )
  }
  return (
    <Card>
      <div className="stack">
        <h2>{t(lg.formTitle)}</h2>
        <Select
          label={t(lg.formType)}
          id="dsr-type"
          placeholder={t(lg.formTypePlaceholder)}
          value={form.type}
          hint={shown('type')}
          onChange={(e) => set('type', e.target.value)}
          options={[
            { value: 'access', label: t(lg.typeAccess) },
            { value: 'correct', label: t(lg.typeCorrect) },
            { value: 'delete', label: t(lg.typeDelete) },
            { value: 'restrict', label: t(lg.typeRestrict) },
          ]}
        />
        <Field label={t(lg.formName)} id="dsr-name" placeholder="สมชาย ตัวอย่าง" value={form.name} hint={shown('name')} onChange={(e) => set('name', e.target.value)} />
        <Field label={t(lg.formEmail)} id="dsr-email" type="email" inputMode="email" placeholder="name@example.com" value={form.email} hint={shown('email')} onChange={(e) => set('email', e.target.value)} />
        <Textarea label={t(lg.formDetails)} id="dsr-details" placeholder={t(lg.formDetailsPlaceholder)} value={form.details} hint={shown('details')} onChange={(e) => set('details', e.target.value)} />
        <Button onClick={submit}>{t(lg.formSubmit)}</Button>
      </div>
    </Card>
  )
}
