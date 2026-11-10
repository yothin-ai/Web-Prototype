import { useState } from 'react'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Badge, Card, Button, Col, DataTable, Field, Grid, Notice, Switch, type DataColumn } from '../../../ui'
import { useSettings, type VatStep } from '../../../settings/useSettings'
import { paymentOptions } from '../../ecommerce/checkout'
import { formatMoney } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { st } from '../settingStrings'

export function Settings() {
  const { t, lang } = useLang()
  const { dataset } = useDataset()
  const { shop, steps, vatNow, setShop, setVat, shippingOff, paymentOff, setShippingOff, setPaymentOff } = useSettings()
  const [name, setName] = useState(shop.name)
  const [address, setAddress] = useState(shop.address)
  const [phone, setPhone] = useState(shop.phone)
  const [taxId, setTaxId] = useState(shop.taxId)
  const [branch, setBranch] = useState(shop.branch)
  const [shopTried, setShopTried] = useState(false)
  const [shopSaved, setShopSaved] = useState(false)
  const [registered, setRegistered] = useState(vatNow.registered)
  const [rate, setRate] = useState(String(Math.round(vatNow.rate * 10000) / 100))
  const [vatTried, setVatTried] = useState(false)
  const [vatSaved, setVatSaved] = useState(false)

  const taxOk = taxId.trim() === '' || /^\d{13}$/.test(taxId.trim())
  const rateNum = Number(rate)
  const rateOk = rate.trim() !== '' && Number.isFinite(rateNum) && rateNum >= 0 && rateNum <= 30

  const saveShop = () => {
    setShopTried(true)
    setShopSaved(false)
    if (!taxOk) return
    setShop({ name: name.trim(), address: address.trim(), phone: phone.trim(), taxId: taxId.trim(), branch: branch.trim() })
    setShopSaved(true)
  }
  const saveVat = () => {
    setVatTried(true)
    setVatSaved(false)
    if (registered && !rateOk) return
    setVat(registered ? rateNum / 100 : vatNow.rate, registered)
    setVatSaved(true)
  }

  const shipping = dataset.ecommerce.shippingMethods.filter((m) => m.id !== 'pickup')
  const toggle = (list: string[], id: string, on: boolean) => (on ? list.filter((x) => x !== id) : [...list, id])
  const shippingOnCount = shipping.filter((m) => !shippingOff.includes(m.id)).length
  const payOn = (mode: 'parcel' | 'pickup') => paymentOptions.filter((p) => p.modes.includes(mode) && !paymentOff.includes(p.id))

  const dateText = (iso: string) => (iso.startsWith('1970') ? t(st.beginning) : new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso)))
  const columns: DataColumn<VatStep>[] = [
    { key: 'from', header: t(st.colFrom), render: (x) => dateText(x.from) },
    { key: 'rate', header: t(st.colRate), end: true, render: (x) => (x.registered ? `${Math.round(x.rate * 10000) / 100}%` : '0%') },
    { key: 'status', header: t(st.colStatus), render: (x) => <Badge tone={x.registered ? 'success' : undefined}>{t(x.registered ? st.registeredYes : st.registeredNo)}</Badge> },
  ]

  return (
    <Grid>
      <Col><PageHead title={t(st.title)} text={t(st.text)} /></Col>
      <Col>
        <Card>
          <div className="stack">
            <h3>{t(st.shopTitle)}</h3>
            <p className="muted">{t(st.shopText)}</p>
            <Field label={t(st.shopName)} id="set-name" value={name} onChange={(e) => setName(e.target.value)} />
            <Field label={t(st.shopAddress)} id="set-address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <Field label={t(st.shopPhone)} id="set-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Field label={t(st.shopTaxId)} id="set-taxid" inputMode="numeric" value={taxId} onChange={(e) => setTaxId(e.target.value)} hint={shopTried && !taxOk ? t(st.errTaxId) : undefined} />
            <Field label={t(st.shopBranch)} id="set-branch" value={branch} onChange={(e) => setBranch(e.target.value)} hint={t(st.shopBranchHint)} />
            {shopSaved && <Notice tone="success">{t(st.shopSaved)}</Notice>}
            <div><Button onClick={saveShop}>{t(st.saveShop)}</Button></div>
          </div>
        </Card>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <h3>{t(st.vatTitle)}</h3>
            <p className="muted">{t(st.vatText)}</p>
            <span>{t(st.vatNow)}: <strong>{vatNow.registered ? `${Math.round(vatNow.rate * 10000) / 100}%` : t(st.vatNone)}</strong></span>
            <Switch checked={registered} onChange={setRegistered} label={t(st.vatRegistered)} description={t(st.vatRegisteredDesc)} />
            {registered && <Field label={t(st.vatRate)} id="set-rate" type="number" min={0} max={30} step="0.01" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} hint={vatTried && !rateOk ? t(st.errRate) : undefined} />}
            {vatSaved && <Notice tone="success">{t(st.vatSaved)}</Notice>}
            <div><Button onClick={saveVat}>{t(st.saveVat)}</Button></div>
            <h3>{t(st.vatHistory)}</h3>
            <DataTable label={t(st.historyLabel)} columns={columns} rows={[...steps].reverse()} rowKey={(x) => x.from} empty="" />
          </div>
        </Card>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <h3>{t(st.methodsTitle)}</h3>
            <p className="muted">{t(st.methodsText)}</p>
            <h3>{t(st.shippingTitle)}</h3>
            {shipping.map((m) => {
              const on = !shippingOff.includes(m.id)
              return <Switch key={m.id} checked={on} onChange={(v) => { if (!v && shippingOnCount <= 1) return; setShippingOff(toggle(shippingOff, m.id, v)) }} label={`${t(m.name)}${m.price ? ` · ${formatMoney(m.price, lang)}` : ''}`} description={on && shippingOnCount <= 1 ? t(st.lastOn) : t(m.detail)} />
            })}
            {(['parcel', 'pickup'] as const).map((mode) => (
              <div key={mode} className="stack">
                <h3>{t(mode === 'parcel' ? st.paymentParcel : st.paymentPickup)}</h3>
                {paymentOptions.filter((p) => p.modes.includes(mode)).map((p) => {
                  const on = !paymentOff.includes(p.id)
                  const last = on && p.modes.some((m) => payOn(m).filter((x) => x.id !== p.id).length === 0)
                  return <Switch key={`${mode}-${p.id}`} checked={on} onChange={(v) => { if (!v && p.modes.some((m) => payOn(m).filter((x) => x.id !== p.id).length === 0)) return; setPaymentOff(toggle(paymentOff, p.id, v)) }} label={t(p.name)} description={last ? t(st.lastOn) : t(p.detail)} />
                })}
              </div>
            ))}
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
