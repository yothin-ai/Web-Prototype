import { useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Breadcrumb, Button, Checkbox, Col, Field, Grid, Notice } from '../../../ui'
import { safeNext, useProfile, useSignedIn } from '../account'
import { PROTOTYPE_ID } from '../cart'
import { u } from '../authStrings'
import { s } from '../strings'
import { AuthCard, GoogleButton } from './AuthShared'

const PHONE = /^0\d{9}$/
const EMAIL = /^\S+@\S+\.\S+$/

// Register, simulated: the name, phone and email become the shopper's profile; no password is kept.
export function RegisterPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [, setSignedIn] = useSignedIn()
  const [profile, setProfile] = useProfile()
  const base = `/${PROTOTYPE_ID}`
  const next = safeNext(params.get('next'), `${base}/account`)
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

  const submit = () => {
    setTried(true)
    if (Object.values(errors).some(Boolean) || !accepted) return
    setProfile({ ...profile, name: form.name.trim(), phone: form.phone, email: form.email.trim() })
    setSignedIn(true)
    navigate(next, { replace: true })
  }
  const google = () => {
    setSignedIn(true)
    navigate(next, { replace: true })
  }

  return (
    <Grid>
      <Col>
        <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search.replace(/[?&]next=[^&]*/, '')}` }, { label: t(u.registerTitle) }]} />
      </Col>
      <Col>
        <AuthCard>
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
            <span className="muted"><Link to={`${base}/info/terms${search}`}>{t(u.terms)}</Link> · <Link to={`${base}/info/privacy${search}`}>{t(u.privacy)}</Link></span>
            {tried && !accepted && <Notice tone="error">{t(u.errAccept)}</Notice>}
            <Button onClick={submit}>{t(u.register)}</Button>
            <span className="muted">{t(u.demoNote)}</span>
            <span>{t(u.haveAccount)} <Link to={`${base}/login${search}`}>{t(u.signIn)}</Link></span>
          </div>
        </AuthCard>
      </Col>
    </Grid>
  )
}
