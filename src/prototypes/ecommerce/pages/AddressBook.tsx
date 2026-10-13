import { useState } from 'react'
import { useLang, type Localized } from '../../../i18n'
import { provinces } from '../../../data/provinces'
import { Badge, Button, Checkbox, Col, Field, Grid, IconCircle, Select } from '../../../ui'
import { districtsOf, localizeParts, subsOf, useAddressData, zipsOf } from '../../../data/address'
import { a } from '../accountStrings'
import { useAddresses, type Address, type SavedAddress } from '../checkout'
import { c } from '../checkoutStrings'
import '../checkout.css'

const EMPTY: Address = { name: '', phone: '', line: '', province: '', district: '', subdistrict: '', postcode: '' }
const PHONE = /^0\d{9}$/

export function placeOf(t: (v: Localized) => string, x: Address) {
  const p = localizeParts(x.province, x.district, x.subdistrict)
  return `${x.line} ${t(p.subdistrict)} ${t(p.district)} ${t(p.province)} ${x.postcode}`
}

type Props = {
  // When given, each address can be picked for this order (checkout); otherwise the list is only managed.
  selectedId?: string
  onSelect?: (id: string) => void
  emptyHint?: string
}

// Saved delivery addresses: add as many as you like, edit, delete and tick which one is the main address.
export function AddressBook({ selectedId, onSelect, emptyHint }: Props) {
  const { t } = useLang()
  const [list, setList] = useAddresses()
  const [editingId, setEditingId] = useState<string | null>(null) // 'new' while adding
  const [form, setForm] = useState<Address>(EMPTY)
  const [main, setMain] = useState(false)
  const [tried, setTried] = useState(false)
  const geo = useAddressData()

  const open = (id: string, from: Address, isMain: boolean) => { setForm(from); setMain(isMain); setTried(false); setEditingId(id) }
  const otherMain = (id: string) => list.some((x) => x.id !== id && x.main)
  const zipOk = (zip: string) => /^\d{5}$/.test(zip) && zipsOf(geo, form.province).has(zip)
  const setProvince = (province: string) => setForm({ ...form, province, district: '', subdistrict: '', postcode: '' })
  const setDistrict = (district: string) => setForm({ ...form, district, subdistrict: '', postcode: '' })
  const setSub = (subdistrict: string) => setForm({ ...form, subdistrict, postcode: subsOf(geo, form.province, form.district).find((s) => s.name.th === subdistrict)?.zip ?? form.postcode })
  const bad = (cond: boolean) => (tried && cond ? t(c.errRequired) : undefined)

  const save = () => {
    setTried(true)
    if (!form.name.trim() || !PHONE.test(form.phone) || !form.line.trim() || !form.province || !form.district || !form.subdistrict || !zipOk(form.postcode)) return
    const id = editingId === 'new' ? `ad-${Date.now()}` : editingId!
    // The first address, or one with no other main, must be the main address.
    const makeMain = main || !otherMain(id)
    const entry: SavedAddress = { ...form, id, main: makeMain }
    const rest = list.map((x) => (makeMain && x.id !== id ? { ...x, main: false } : x))
    setList(editingId === 'new' ? [...rest, entry] : rest.map((x) => (x.id === id ? entry : x)))
    setEditingId(null)
    if (editingId === 'new') onSelect?.(id)
  }
  const remove = (id: string) => {
    const rest = list.filter((x) => x.id !== id)
    setList(rest.length > 0 && !rest.some((x) => x.main) ? rest.map((x, i) => (i === 0 ? { ...x, main: true } : x)) : rest)
  }
  const setAsMain = (id: string) => setList(list.map((x) => ({ ...x, main: x.id === id })))

  const form_ = (
    <div className="checkout-panel stack">
      <strong>{editingId === 'new' ? t(c.addAddress) : t(c.editAddress)}</strong>
      <Grid>
        <Col span={{ base: 4, sm: 4, md: 6 }}><Field label={t(c.fullName)} id="ab-name" placeholder={t(a.nameExample)} value={form.name} hint={bad(!form.name.trim())} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Col>
        <Col span={{ base: 4, sm: 4, md: 6 }}><Field label={t(c.phone)} id="ab-phone" type="tel" inputMode="tel" placeholder={t(a.phoneExample)} value={form.phone} hint={tried && !PHONE.test(form.phone) ? t(c.errPhone) : undefined} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} /></Col>
        <Col><Field label={t(c.addrLine)} id="ab-line" placeholder={t(a.lineExample)} value={form.line} hint={bad(!form.line.trim())} onChange={(e) => setForm({ ...form, line: e.target.value })} /></Col>
        <Col span={{ base: 4, sm: 4, md: 6 }}><Select label={t(c.province)} id="ab-province" value={form.province} placeholder={t(c.selectProvince)} hint={bad(!form.province)} options={provinces.map((p) => ({ value: p.th ?? '', label: t(p) }))} onChange={(e) => setProvince(e.target.value)} /></Col>
        <Col span={{ base: 4, sm: 4, md: 6 }}><Select label={t(c.district)} id="ab-district" value={form.district} disabled={!form.province} placeholder={t(a.selectDistrict)} hint={bad(!form.district)} options={districtsOf(geo, form.province).map((d) => ({ value: d.th ?? '', label: t(d) }))} onChange={(e) => setDistrict(e.target.value)} /></Col>
        <Col span={{ base: 4, sm: 4, md: 6 }}><Select label={t(c.subdistrict)} id="ab-sub" value={form.subdistrict} disabled={!form.district} placeholder={t(a.selectSub)} hint={bad(!form.subdistrict)} options={subsOf(geo, form.province, form.district).map((x) => ({ value: x.name.th ?? '', label: t(x.name) }))} onChange={(e) => setSub(e.target.value)} /></Col>
        <Col span={{ base: 4, sm: 4, md: 6 }}><Field label={t(c.postcode)} id="ab-post" inputMode="numeric" placeholder={t(a.zipExample)} value={form.postcode} hint={tried && !zipOk(form.postcode) ? (/^\d{5}$/.test(form.postcode) ? t(a.errZipProvince) : t(c.errRequired)) : undefined} onChange={(e) => setForm({ ...form, postcode: e.target.value.replace(/\D/g, '').slice(0, 5) })} /></Col>
      </Grid>
      <Checkbox label={t(a.makeMain)} checked={main || !otherMain(editingId ?? '')} disabled={!otherMain(editingId ?? '')} onChange={setMain} />
      <div className="row"><Button size="sm" onClick={save}>{t(a.save)}</Button><Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>{t(a.cancel)}</Button></div>
    </div>
  )

  return (
    <div className="stack">
      {list.map((x) => editingId === x.id ? <div key={x.id}>{form_}</div> : (
        <div key={x.id} className="branch-card">
          <IconCircle size="md" icon="pin" />
          <div className="branch-card__text">
            <strong>{x.name} · {x.phone}</strong>
            <span className="muted">{placeOf(t, x)}</span>
            <span className="row">{x.main && <Badge tone="success">{t(a.mainAddress)}</Badge>}{onSelect && selectedId === x.id && <Badge>{t(a.inUse)}</Badge>}</span>
          </div>
          {onSelect && selectedId !== x.id && <Button size="sm" onClick={() => onSelect(x.id)}>{t(a.useThis)}</Button>}
          {!x.main && <Button variant="ghost" size="sm" onClick={() => setAsMain(x.id)}>{t(a.makeMain)}</Button>}
          <Button variant="secondary" size="sm" onClick={() => open(x.id, x, x.main)}>{t(a.editAddress)}</Button>
          <Button variant="ghost" size="sm" onClick={() => remove(x.id)}>{t(a.deleteAddress)}</Button>
        </div>
      ))}
      {editingId === 'new' ? form_ : list.length === 0 ? (
        <div className="checkout-empty stack">
          <strong>{t(c.noAddress)}</strong>
          {emptyHint && <span className="muted">{emptyHint}</span>}
          <div><Button size="sm" onClick={() => open('new', EMPTY, true)}>+ {t(c.addAddress)}</Button></div>
        </div>
      ) : editingId === null && <div><Button variant="secondary" size="sm" onClick={() => open('new', EMPTY, false)}>+ {t(a.addAnother)}</Button></div>}
    </div>
  )
}
