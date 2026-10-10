import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Badge, Breadcrumb, Button, Card, Field, SettingRow } from '../../../ui'
import { a } from '../accountStrings'
import { useProfile } from '../account'
import { PROTOTYPE_ID } from '../cart'
import { useClubLinked } from '../checkout'
import { c } from '../checkoutStrings'
import { s } from '../strings'
import { AccountShell } from './AccountShell'
import { AddressBook } from './AddressBook'
import '../checkout.css'

const PHONE = /^0\d{9}$/
const EMAIL = /^\S+@\S+\.\S+$/

export function AccountPage({ focus }: { focus?: 'address' }) {
  const { t } = useLang()
  const { search } = useLocation()
  const { dataset } = useDataset()
  const { account } = dataset.ecommerce
  const [profile, setProfile] = useProfile()
  const [linked, setLinked] = useClubLinked()
  const [tab, setTab] = useState<'phone' | 'id'>('phone')
  const [clubValue, setClubValue] = useState('')
  const base = `/${PROTOTYPE_ID}`
  useEffect(() => {
    if (focus === 'address') document.getElementById('account-address')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [focus])
  const rowText = { saveLabel: t(a.save), cancelLabel: t(a.cancel), emptyText: t(a.notAdded) }
  const name = profile.name || t(account.name)
  const email = profile.email || account.email

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
            <SettingRow {...rowText} label={t(a.phone)} value={profile.phone} actionLabel={profile.phone ? t(a.change) : t(a.add)} inputType="tel" inputMode="tel" placeholder={t(a.phoneExample)} validate={(v) => (PHONE.test(v.trim()) ? undefined : t(a.errPhone))} onSave={(v) => setProfile({ ...profile, phone: v })} />
            <SettingRow {...rowText} label={t(a.email)} value={email} actionLabel={t(a.change)} inputType="email" inputMode="email" validate={(v) => (EMAIL.test(v.trim()) ? undefined : t(a.errEmail))} onSave={(v) => setProfile({ ...profile, email: v })} />
          </Card>

          <Card>
            <h2 id="account-address">{t(a.addressTitle)}</h2>
            <span className="muted">{t(a.addressSub)}</span>
            <AddressBook />
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
