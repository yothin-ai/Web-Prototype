import { useState, type ReactNode } from 'react'
import { useLang } from '../../../i18n'
import { Button, Checkbox, Field, Notice } from '../../../ui'
import { useProfile, useSignedIn } from '../account'
import { PROTOTYPE_ID } from '../cart'
import { u } from '../authStrings'
import { GoogleButton } from './AuthShared'

const PHONE = /^0\d{9}$/
const EMAIL = /^\S+@\S+\.\S+$/

// The register form shared by the /register page and the register modal, simulated: the name, phone and
// email become the shopper's profile; no password is kept. `onDone` runs after the shopper is signed in.
export function RegisterForm({ onDone, switchLink }: { onDone: () => void; switchLink: ReactNode }) {
  const { t } = useLang()
  const [, setSignedIn] = useSignedIn()
  const [profile, setProfile] = useProfile()
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirm: '' })
  const [accepted, setAccepted] = useState(false)
  const [tried, setTried] = useState(false)
  const set = (key: keyof typeof form, value: string) => setForm({ ...form, [key]: value })
  const errors = {
    name: !form.name.trim() ? t(u.errName) : undefined,
    phone: !PHONE.test(form.phone) ? t(u.errPhone) : undefined,
    email: !EMAIL.test(form.email) ? t(u.errEmail) : undefined,
    password: form.password.length < 6 ? t(u.errPassword) : undefined,
    confirm: form.confirm !== form.password || !form.confirm ? t(u.errConfirm) : undefined,
  }
  const shown = (key: keyof typeof errors) => (tried ? errors[key] : undefined)
  // The terms open in a new tab so the half-filled form is not lost.
  const info = (slug: string) => `#/${PROTOTYPE_ID}/info/${slug}`

  const submit = () => {
    setTried(true)
    if (Object.values(errors).some(Boolean) || !accepted) return
    setProfile({ ...profile, name: form.name.trim(), phone: form.phone, email: form.email.trim() })
    setSignedIn(true)
    onDone()
  }
  const google = () => {
    setSignedIn(true)
    onDone()
  }

  return (
    <div className="stack">
      <h1>{t(u.registerTitle)}</h1>
      <span className="muted">{t(u.registerSub)}</span>
      <GoogleButton label={t(u.google)} onClick={google} />
      <span className="muted auth-or">{t(u.or)}</span>
      <Field label={t(u.name)} id="reg-name" placeholder="สมชาย ตัวอย่าง" value={form.name} hint={shown('name')} onChange={(e) => set('name', e.target.value)} />
      <Field label={t(u.phone)} id="reg-phone" type="tel" inputMode="tel" placeholder="0812345678" value={form.phone} hint={shown('phone')} onChange={(e) => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} />
      <Field label={t(u.email)} id="reg-email" type="email" inputMode="email" placeholder="name@example.com" value={form.email} hint={shown('email')} onChange={(e) => set('email', e.target.value)} />
      <Field label={t(u.password)} id="reg-password" type="password" value={form.password} hint={shown('password')} onChange={(e) => set('password', e.target.value)} />
      <Field label={t(u.confirm)} id="reg-confirm" type="password" value={form.confirm} hint={shown('confirm')} onChange={(e) => set('confirm', e.target.value)} />
      <Checkbox checked={accepted} onChange={setAccepted} label={t(u.accept)} />
      <span className="muted"><a href={info('terms')} target="_blank" rel="noreferrer">{t(u.terms)}</a> · <a href={info('privacy')} target="_blank" rel="noreferrer">{t(u.privacy)}</a></span>
      {tried && !accepted && <Notice tone="error">{t(u.errAccept)}</Notice>}
      <Button onClick={submit}>{t(u.register)}</Button>
      <span className="muted">{t(u.demoNote)}</span>
      <span>{t(u.haveAccount)} {switchLink}</span>
    </div>
  )
}
