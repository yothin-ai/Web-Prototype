import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { provinces } from '../../../data/provinces'
import { Badge, Breadcrumb, Button, Card, Col, Field, Grid, IconCircle, Select, SettingRow } from '../../../ui'
import { a } from '../accountStrings'
import { useProfile } from '../account'
import { PROTOTYPE_ID } from '../cart'
import { useClubLinked, useSavedAddress, type Address } from '../checkout'
import { c } from '../checkoutStrings'
import { s } from '../strings'
import { AccountShell } from './AccountShell'
import '../checkout.css'

const EMPTY: Address = { name: '', phone: '', line: '', province: '', district: '', subdistrict: '', postcode: '' }
const PHONE = /^0\d{9}$/
const EMAIL = /^\S+@\S+\.\S+$/

export function AccountPage({ focus }: { focus?: 'address' }) {
  const { t } = useLang()
  const { search } = useLocation()
  const { dataset } = useDataset()
  const { account } = dataset.ecommerce
  const [profile, setProfile] = useProfile()
  const [address, setAddress] = useSavedAddress()
  const [linked, setLinked] = useClubLinked()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<Address>(EMPTY)
  const [tried, setTried] = useState(false)
  const [tab, setTab] = useState<'phone' | 'id'>('phone')
  const [clubValue, setClubValue] = useState('')
  const base = `/${PROTOTYPE_ID}`
  useEffect(() => {
    if (focus === 'address') document.getElementById('account-address')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [focus])
  const rowText = { saveLabel: t(a.save), cancelLabel: t(a.cancel), emptyText: t(a.notAdded) }
  const name = profile.name || t(account.name)
  const email = profile.email || account.email
  const place = (x: Address) => `${x.line} ${x.subdistrict} ${x.district} ${t(provinces.find((p) => p.th === x.province) ?? { th: x.province })} ${x.postcode}`

  const saveAddress = () => {
    setTried(true)
    if (!form.name.trim() || !PHONE.test(form.phone) || !form.line.trim() || !form.province || !form.district.trim() || !form.subdistrict.trim() || !/^\d{5}$/.test(form.postcode)) return
    setAddress(form)
    setEditing(false)
  }
  const bad = (cond: boolean) => (tried && cond ? t(c.errRequired) : undefined)

  return (
    <AccountShell active={focus === 'address' ? 'addresses' : 'profile'}>
      <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search}` }, { label: t(a.crumbAccount), to: `${base}/account${search}` }, { label: t(a.title) }]} />
          <Card>
            <h2>{t(a.title)}</h2>
            <span className="muted">{t(a.subtitle)}</span>
            <SettingRow {...rowText} label={t(a.loginWith)} value={`${t(account.provider)} · ${account.email}`} actionLabel="" locked={<Badge>{t(a.locked)}</Badge>} />
            <SettingRow {...rowText} label={t(a.profileName)} value={name} actionLabel={t(a.change)} validate={(v) => (v.trim() ? undefined : t(a.errName))} onSave={(v) => setProfile({ ...profile, name: v })} />
          </Card>

          <Card>
            <h2>{t(a.contactTitle)}</h2>
            <span className="muted">{t(a.contactSub)}</span>
            <SettingRow {...rowText} label={t(a.phone)} value={profile.phone} actionLabel={profile.phone ? t(a.change) : t(a.add)} inputType="tel" inputMode="tel" validate={(v) => (PHONE.test(v.trim()) ? undefined : t(a.errPhone))} onSave={(v) => setProfile({ ...profile, phone: v })} />
            <SettingRow {...rowText} label={t(a.email)} value={email} actionLabel={t(a.change)} inputType="email" inputMode="email" validate={(v) => (EMAIL.test(v.trim()) ? undefined : t(a.errEmail))} onSave={(v) => setProfile({ ...profile, email: v })} />
          </Card>

          <Card>
            <h2 id="account-address">{t(a.addressTitle)}</h2>
            <span className="muted">{t(a.addressSub)}</span>
            {editing ? (
              <div className="checkout-panel stack">
                <Grid>
                  <Col span={{ base: 4, sm: 4, md: 6 }}><Field label={t(c.fullName)} id="ac-name" value={form.name} hint={bad(!form.name.trim())} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Col>
                  <Col span={{ base: 4, sm: 4, md: 6 }}><Field label={t(c.phone)} id="ac-phone" type="tel" value={form.phone} hint={tried && !PHONE.test(form.phone) ? t(c.errPhone) : undefined} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} /></Col>
                  <Col><Field label={t(c.addrLine)} id="ac-line" value={form.line} hint={bad(!form.line.trim())} onChange={(e) => setForm({ ...form, line: e.target.value })} /></Col>
                  <Col span={{ base: 4, sm: 4, md: 6 }}><Select label={t(c.province)} id="ac-province" value={form.province} placeholder={t(c.selectProvince)} hint={bad(!form.province)} options={provinces.map((p) => ({ value: p.th ?? '', label: t(p) }))} onChange={(e) => setForm({ ...form, province: e.target.value })} /></Col>
                  <Col span={{ base: 4, sm: 4, md: 6 }}><Field label={t(c.district)} id="ac-district" value={form.district} hint={bad(!form.district.trim())} onChange={(e) => setForm({ ...form, district: e.target.value })} /></Col>
                  <Col span={{ base: 4, sm: 4, md: 6 }}><Field label={t(c.subdistrict)} id="ac-sub" value={form.subdistrict} hint={bad(!form.subdistrict.trim())} onChange={(e) => setForm({ ...form, subdistrict: e.target.value })} /></Col>
                  <Col span={{ base: 4, sm: 4, md: 6 }}><Field label={t(c.postcode)} id="ac-post" inputMode="numeric" value={form.postcode} hint={bad(!/^\d{5}$/.test(form.postcode))} onChange={(e) => setForm({ ...form, postcode: e.target.value.replace(/\D/g, '').slice(0, 5) })} /></Col>
                </Grid>
                <div className="row"><Button size="sm" onClick={saveAddress}>{t(a.save)}</Button><Button size="sm" variant="ghost" onClick={() => setEditing(false)}>{t(a.cancel)}</Button></div>
              </div>
            ) : address ? (
              <div className="branch-card">
                <IconCircle size="md" />
                <div className="branch-card__text"><strong>{address.name} · {address.phone}</strong><span className="muted">{place(address)}</span></div>
                <Button variant="secondary" size="sm" onClick={() => { setForm(address); setTried(false); setEditing(true) }}>{t(a.editAddress)}</Button>
                <Button variant="ghost" size="sm" onClick={() => setAddress(null)}>{t(a.deleteAddress)}</Button>
              </div>
            ) : (
              <div className="checkout-empty stack">
                <strong>{t(a.noAddress)}</strong>
                <div><Button size="sm" onClick={() => { setForm(EMPTY); setTried(false); setEditing(true) }}>+ {t(a.addAddress)}</Button></div>
              </div>
            )}
          </Card>

          <Card>
            <h2>{t(a.clubTitle)} {t(dataset.ecommerce.home.app.club)}</h2>
            <span className="muted">{t(a.clubSub)}</span>
            {linked ? (
              <>
                <div className="member-card">
                  <strong>{name}</strong>
                  <span>{t(a.memberNo)} {account.memberNo} · {t(account.tier)}</span>
                  <span>{t(a.points)} {account.points.toLocaleString()}</span>
                </div>
                <div><Button variant="ghost" size="sm" onClick={() => setLinked(false)}>{t(a.disconnect)}</Button></div>
              </>
            ) : (
              <div className="stack">
                <strong>{t(a.clubNotLinked)}</strong>
                <div className="row">
                  <Button size="sm" variant={tab === 'phone' ? 'primary' : 'secondary'} aria-pressed={tab === 'phone'} onClick={() => setTab('phone')}>{t(a.tabPhone)}</Button>
                  <Button size="sm" variant={tab === 'id' ? 'primary' : 'secondary'} aria-pressed={tab === 'id'} onClick={() => setTab('id')}>{t(a.tabId)}</Button>
                </div>
                <Field label={tab === 'phone' ? t(a.tabPhone) : t(a.tabId)} id="ac-club" inputMode="numeric" placeholder={tab === 'phone' ? t(c.phonePlaceholder) : t(c.idPlaceholder)} value={clubValue} onChange={(e) => setClubValue(e.target.value.replace(/\D/g, '').slice(0, tab === 'phone' ? 10 : 13))} />
                <Button onClick={() => { setLinked(true); setClubValue('') }}>{t(a.connect)}</Button>
              </div>
            )}
          </Card>
          <span className="muted">{t(a.demoNote)}</span>
    </AccountShell>
  )
}
