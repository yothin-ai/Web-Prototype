import { useState } from 'react'
import { Link, Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Breadcrumb, Button, Col, Field, Grid, Notice, Select } from '../../../ui'
import { useProfile, useSignedIn } from '../account'
import { PROTOTYPE_ID } from '../cart'
import { useAddresses } from '../checkout'
import { serviceById, serviceTypes, slots, useBookings, type Booking, type Slot } from '../services'
import { sv } from '../serviceStrings'
import { s } from '../strings'
import { AuthCard } from './AuthShared'
import { placeOf } from './AddressBook'
import { useAccountIdentity } from './AccountShell'

const PHONE = /^0\d{9}$/
const slotLabel = { morning: sv.slotMorning, afternoon: sv.slotAfternoon, evening: sv.slotEvening }

// Books a technician (simulated): the booking is kept in the browser and shown under "My bookings".
export function BookingPage() {
  const { t } = useLang()
  const { search, pathname } = useLocation()
  const [params] = useSearchParams()
  const [signedIn] = useSignedIn()
  const [profile] = useProfile()
  const who = useAccountIdentity()
  const [addresses] = useAddresses()
  const { add } = useBookings()
  const base = `/${PROTOTYPE_ID}`
  const today = new Date().toISOString().slice(0, 10)
  const [form, setForm] = useState({
    type: serviceById(params.get('type'))?.id ?? '',
    date: '',
    slot: '' as Slot | '',
    addressId: addresses.find((a) => a.main)?.id ?? addresses[0]?.id ?? '',
    addressText: '',
    name: profile.name || who.name,
    phone: profile.phone,
    note: '',
  })
  const [tried, setTried] = useState(false)
  const [done, setDone] = useState<Booking | null>(null)
  const set = (key: keyof typeof form, value: string) => setForm({ ...form, [key]: value })

  if (!signedIn) return <Navigate to={`${base}/login?next=${encodeURIComponent(pathname + search)}`} replace />

  const chosen = addresses.find((a) => a.id === form.addressId)
  const address = addresses.length > 0 ? (chosen ? placeOf(t, chosen) : '') : form.addressText.trim()
  const errors = {
    type: !form.type ? t(sv.errType) : undefined,
    date: !form.date ? t(sv.errDate) : undefined,
    slot: !form.slot ? t(sv.errSlot) : undefined,
    address: !address ? t(sv.errAddress) : undefined,
    name: !form.name.trim() ? t(sv.errName) : undefined,
    phone: !PHONE.test(form.phone) ? t(sv.errPhone) : undefined,
  }
  const shown = (key: keyof typeof errors) => (tried ? errors[key] : undefined)
  const submit = () => {
    setTried(true)
    if (Object.values(errors).some(Boolean)) return
    setDone(add({ serviceId: form.type, date: form.date, slot: form.slot as Slot, address, name: form.name.trim(), phone: form.phone, note: form.note.trim() }))
  }

  const crumbs = [{ label: t(s.home), to: `${base}${search}` }, { label: t(sv.title), to: `${base}/services${search}` }, { label: t(sv.bookTitle) }]
  return (
    <Grid>
      <Col>
        <Breadcrumb label={t(s.breadcrumbLabel)} items={crumbs} />
      </Col>
      <Col>
        <AuthCard>
          {done ? (
            <div className="stack">
              <h1>{t(sv.doneTitle)}</h1>
              <p><strong>{t(sv.doneRef)}:</strong> {done.id}</p>
              <Notice tone="info">{t(sv.doneNote)}</Notice>
              <Button to={`${base}/account/bookings${search}`}>{t(sv.toBookings)}</Button>
              <Button to={`${base}/services${search}`} variant="secondary">{t(sv.backServices)}</Button>
            </div>
          ) : (
            <div className="stack">
              <h1>{t(sv.bookTitle)}</h1>
              <span className="muted">{t(sv.bookSub)}</span>
              <Select label={t(sv.fType)} id="bk-type" placeholder={t(sv.fTypePh)} value={form.type} hint={shown('type')} onChange={(e) => set('type', e.target.value)} options={serviceTypes.map((x) => ({ value: x.id, label: t(x.name) }))} />
              <Field label={t(sv.fDate)} id="bk-date" type="date" min={today} value={form.date} hint={shown('date')} onChange={(e) => set('date', e.target.value)} />
              <Select label={t(sv.fSlot)} id="bk-slot" placeholder={t(sv.fSlotPh)} value={form.slot} hint={shown('slot')} onChange={(e) => set('slot', e.target.value)} options={slots.map((x) => ({ value: x, label: t(slotLabel[x]) }))} />
              {addresses.length > 0 ? (
                <Select label={t(sv.fAddress)} id="bk-address" placeholder={t(sv.fAddressPh)} value={form.addressId} hint={shown('address')} onChange={(e) => set('addressId', e.target.value)} options={addresses.map((a) => ({ value: a.id, label: `${a.name} · ${placeOf(t, a)}` }))} />
              ) : (
                <Field label={t(sv.fAddressText)} id="bk-address-text" value={form.addressText} hint={shown('address')} onChange={(e) => set('addressText', e.target.value)} />
              )}
              <Field label={t(sv.fName)} id="bk-name" value={form.name} hint={shown('name')} onChange={(e) => set('name', e.target.value)} />
              <Field label={t(sv.fPhone)} id="bk-phone" type="tel" inputMode="tel" placeholder="0812345678" value={form.phone} hint={shown('phone')} onChange={(e) => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} />
              <Field label={t(sv.fNote)} id="bk-note" placeholder={t(sv.fNotePh)} value={form.note} onChange={(e) => set('note', e.target.value)} />
              <Button onClick={submit}>{t(sv.submit)}</Button>
              <span className="muted">{t(sv.demo)}</span>
              <Link to={`${base}/services${search}`}>{t(sv.backServices)}</Link>
            </div>
          )}
        </AuthCard>
      </Col>
    </Grid>
  )
}
