import { useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Breadcrumb, Button, Col, Field, Grid, Notice, Tabs } from '../../../ui'
import { safeNext, useSignedIn } from '../account'
import { PROTOTYPE_ID } from '../cart'
import { u } from '../authStrings'
import { s } from '../strings'
import { AuthCard, GoogleButton } from './AuthShared'
import { withQuery } from '../Storefront'

const PHONE = /^0\d{9}$/
const EMAIL = /^\S+@\S+\.\S+$/

// Sign in, simulated: Google, a phone number with a sample OTP, or email and password.
export function LoginPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [, setSignedIn] = useSignedIn()
  const base = `/${PROTOTYPE_ID}`
  const next = safeNext(params.get('next'), `${base}/account`)
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tried, setTried] = useState(false)
  const [forgot, setForgot] = useState(false)

  const enter = () => {
    setSignedIn(true)
    navigate(next, { replace: true })
  }
  const bad = (cond: boolean, message: string) => (tried && cond ? message : undefined)
  const submitPhone = () => {
    setTried(true)
    if (!PHONE.test(phone)) return
    if (!otpSent) { setOtpSent(true); setTried(false); return }
    if (!/^\d{6}$/.test(otp)) return
    enter()
  }
  const submitEmail = () => {
    setTried(true)
    if (!EMAIL.test(email) || password.length < 6) return
    enter()
  }

  return (
    <Grid>
      <Col>
        <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search.replace(/[?&]next=[^&]*/, '')}` }, { label: t(u.loginTitle) }]} />
      </Col>
      <Col>
        <AuthCard>
          <div className="stack">
            <h1>{t(u.loginTitle)}</h1>
            {params.get('next') && <Notice tone="info">{t(u.signedOutNote)}</Notice>}
            <span className="muted">{t(u.loginSub)}</span>
            <GoogleButton label={t(u.google)} onClick={enter} />
            <span className="muted">{t(u.googleNote)}</span>
            <span className="muted auth-or">{t(u.or)}</span>
            <Tabs
              label={t(u.tabsLabel)}
              tabs={[
                {
                  id: 'auth-phone',
                  label: t(u.tabPhone),
                  content: (
                    <div className="stack">
                      <Field label={t(u.phone)} id="login-phone" type="tel" inputMode="tel" placeholder="0812345678" value={phone} hint={bad(!PHONE.test(phone), t(u.errPhone))} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} />
                      {otpSent && (
                        <>
                          <Notice tone="info">{t(u.otpSent)}</Notice>
                          <Field label={t(u.otp)} id="login-otp" inputMode="numeric" placeholder="123456" value={otp} hint={bad(!/^\d{6}$/.test(otp), t(u.errOtp))} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} />
                        </>
                      )}
                      <Button onClick={submitPhone}>{otpSent ? t(u.signIn) : t(u.getOtp)}</Button>
                    </div>
                  ),
                },
                {
                  id: 'auth-email',
                  label: t(u.tabEmail),
                  content: (
                    <div className="stack">
                      <Field label={t(u.email)} id="login-email" type="email" inputMode="email" placeholder="name@example.com" value={email} hint={bad(!EMAIL.test(email), t(u.errEmail))} onChange={(e) => setEmail(e.target.value)} />
                      <Field label={t(u.password)} id="login-password" type="password" value={password} hint={bad(password.length < 6, t(u.errPassword))} onChange={(e) => setPassword(e.target.value)} />
                      <Button onClick={submitEmail}>{t(u.signIn)}</Button>
                      <div><Button variant="ghost" size="sm" aria-expanded={forgot} onClick={() => setForgot(!forgot)}>{t(u.forgot)}</Button></div>
                      {forgot && <Notice tone="info">{t(u.forgotNote)}</Notice>}
                    </div>
                  ),
                },
              ]}
            />
            <span className="muted">{t(u.demoNote)}</span>
            <span>{t(u.noAccount)} <Link to={`${base}/register${withQuery(search, 'q', '')}`}>{t(u.goRegister)}</Link></span>
          </div>
        </AuthCard>
      </Col>
    </Grid>
  )
}
