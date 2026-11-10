import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { useSearchLabels } from '../../../i18n/searchLabels'
import { useProducts } from '../../../products/useProducts'
import { useCoupons } from '../../../promotions/useCoupons'
import { useSettings } from '../../../settings/useSettings'
import { readDemoState } from '../../../state/demoState'
import { useStock } from '../../../stock/useStock'
import { Badge, Breadcrumb, Button, Card, CardGrid, Col, DataRow, DataTable, Field, Grid, Notice, QuantityStepper, SearchSelect, Select, Switch, type DataColumn } from '../../../ui'
import { PROTOTYPE_ID as SHOP, formatMoney, skuOf, useEcommerce, useOrders, type Order } from '../../ecommerce/cart'
import { couponDiscount } from '../../ecommerce/checkout'
import { PageHead } from '../PageHead'
import { locationName, PROTOTYPE_ID, useSearch } from '../data'
import { b } from '../strings'
import { po_ } from '../posStrings'
import { CENTRAL, locationIds } from '../../../stock/stock'

type Line = { productId: string; qty: number }
type Mode = 'counter' | 'phone'
type Pay = 'branch' | 'transfer' | 'card'

// Makes an order from the Back Office: a counter sale that is paid and handed over at once, or an order taken by phone that waits to be packed.
export function NewOrder() {
  const { t, lang } = useLang()
  const sl = useSearchLabels()
  const navigate = useNavigate()
  const base = `/${PROTOTYPE_ID}`
  const search = useSearch()
  const { shop } = useProducts()
  const { shippingMethods } = useEcommerce()
  const { shop: coupons } = useCoupons()
  const { vatNow } = useSettings()
  const book = useStock()
  const [, setOrders] = useOrders()
  const [mode, setMode] = useState<Mode>('counter')
  const [lines, setLines] = useState<Line[]>([])
  const [pick, setPick] = useState('')
  const [branch, setBranch] = useState('b1')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [fulfil, setFulfil] = useState<'pickup' | 'parcel'>('pickup')
  const parcelMethods = shippingMethods.filter((m) => m.id !== 'pickup')
  const [shippingId, setShippingId] = useState(parcelMethods[0]?.id ?? 'standard')
  const [address, setAddress] = useState('')
  const [pay, setPay] = useState<Pay>('branch')
  const [member, setMember] = useState(false)
  const [couponId, setCouponId] = useState('')
  const [tax, setTax] = useState(false)
  const [taxName, setTaxName] = useState('')
  const [taxId, setTaxId] = useState('')
  const [tried, setTried] = useState(false)

  const parcel = mode === 'phone' && fulfil === 'parcel'
  const loc = parcel ? CENTRAL : branch
  const productOf = (id: string) => shop.find((p) => p.id === id)
  const availableOf = (id: string) => Math.max(0, book.cell(id, loc).available)
  const subtotal = lines.reduce((n, l) => n + (productOf(l.productId)?.price ?? 0) * l.qty, 0)
  const shippingPrice = parcel ? (parcelMethods.find((m) => m.id === shippingId)?.price ?? 0) : 0
  const usable = coupons.filter((c) => c.channel === 'store' && !c.expired && !c.redeemCost && (!c.memberOnly || member))
  const coupon = usable.find((c) => c.id === couponId && subtotal >= c.minSpend && !c.full)
  const cut = couponDiscount(coupon, subtotal, shippingPrice, parcel ? 'parcel' : 'pickup')
  const discount = cut.items + cut.shipping
  const total = Math.max(0, subtotal + shippingPrice - discount)

  const add = () => {
    if (!pick) return
    setLines((cur) => (cur.some((l) => l.productId === pick) ? cur.map((l) => (l.productId === pick ? { ...l, qty: l.qty + 1 } : l)) : [...cur, { productId: pick, qty: 1 }]))
    setPick('')
  }
  const setQty = (id: string, qty: number) => setLines((cur) => cur.map((l) => (l.productId === id ? { ...l, qty } : l)))

  const overStock = lines.some((l) => l.qty > availableOf(l.productId))
  const nameOk = mode === 'counter' || name.trim() !== ''
  const phoneOk = mode === 'counter' || phone.trim() !== ''
  const addressOk = !parcel || address.trim() !== ''
  const taxOn = tax && vatNow.registered
  const taxNameOk = !taxOn || taxName.trim() !== ''
  const taxIdOk = !taxOn || /^\d{13}$/.test(taxId.trim())
  const ok = lines.length > 0 && !overStock && nameOk && phoneOk && addressOk && taxNameOk && taxIdOk

  const submit = () => {
    setTried(true)
    if (!ok) return
    const current = readDemoState<Order[]>(SHOP, 'orders', [])
    const own = current.filter((o) => !o.sample).length
    const now = new Date().toISOString()
    const counter = mode === 'counter'
    const order: Order = {
      id: `ORD-${1001 + own}`,
      placedAt: now,
      customer: { name: name.trim() || t(po_.walkIn), phone: phone.trim(), address: parcel ? address.trim() : '' },
      shippingId: parcel ? shippingId : 'pickup',
      paymentId: counter ? pay : parcel ? 'cod' : 'branch',
      lines: lines.map((l) => ({ productId: l.productId, name: productOf(l.productId)!.name, price: productOf(l.productId)!.price, qty: l.qty })),
      subtotal,
      shippingPrice,
      total,
      fulfilment: parcel ? 'parcel' : 'pickup',
      pickupMode: parcel ? undefined : 'counter',
      discount: discount > 0 ? discount : undefined,
      couponTitle: coupon && discount > 0 ? coupon.title : undefined,
      couponId: coupon && discount > 0 ? coupon.id : undefined,
      status: counter ? 'delivered' : 'preparing',
      stockLoc: loc,
      packed: counter ? true : undefined,
      packedAt: counter ? now : undefined,
      paidAt: counter ? now : undefined,
      etax: taxOn ? true : undefined,
      taxBuyer: taxOn ? { id: taxId.trim(), name: taxName.trim() } : undefined,
      origin: mode,
    }
    setOrders([order, ...current])
    navigate(`${base}/orders/${order.id}${search}`)
  }

  const columns: DataColumn<Line>[] = [
    { key: 'product', wrap: true, header: t(po_.colProduct), render: (l) => <span className="stack"><strong>{t(productOf(l.productId)!.name)}</strong><span className="muted">{skuOf(productOf(l.productId)!)}</span></span> },
    { key: 'price', header: t(po_.colPrice), end: true, render: (l) => formatMoney(productOf(l.productId)!.price, lang) },
    { key: 'qty', header: t(po_.colQty), render: (l) => <QuantityStepper value={l.qty} onChange={(v) => setQty(l.productId, v)} min={1} max={Math.max(1, availableOf(l.productId))} label={`${t(po_.qtyOf)} ${t(productOf(l.productId)!.name)}`} decreaseLabel={t(po_.less)} increaseLabel={t(po_.more)} /> },
    { key: 'avail', header: t(po_.colAvail), end: true, render: (l) => <Badge tone={l.qty > availableOf(l.productId) ? 'danger' : undefined}>{availableOf(l.productId)}</Badge> },
    { key: 'sum', header: t(po_.colTotal), end: true, render: (l) => formatMoney(productOf(l.productId)!.price * l.qty, lang) },
    { key: 'act', pin: true, header: '', render: (l) => <Button size="sm" variant="ghost" onClick={() => setLines(lines.filter((x) => x.productId !== l.productId))}>{t(po_.remove)}</Button> },
  ]
  const err = (bad: boolean, message: string) => (tried && bad ? message : undefined)
  const placeOptions = locationIds.filter((id) => id !== CENTRAL).map((id) => ({ value: id, label: t(locationName(id)) }))

  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(po_.breadcrumb)} items={[{ label: t(b.navOrders), to: `${base}/orders${search}` }, { label: t(po_.title) }]} />
          <PageHead title={t(po_.title)} text={t(po_.text)} />
        </div>
      </Col>
      <Col>
        <div className="row" role="group" aria-label={t(po_.modeLabel)}>
          <Button variant={mode === 'counter' ? 'primary' : 'secondary'} aria-pressed={mode === 'counter'} onClick={() => setMode('counter')}>{t(po_.modeCounter)}</Button>
          <Button variant={mode === 'phone' ? 'primary' : 'secondary'} aria-pressed={mode === 'phone'} onClick={() => setMode('phone')}>{t(po_.modePhone)}</Button>
        </div>
        <p className="muted">{t(mode === 'counter' ? po_.counterNote : po_.phoneNote)}</p>
      </Col>
      <Col>
        <CardGrid size="large">
          <Card>
            <div className="stack">
              <h3>{t(po_.itemsTitle)}</h3>
              <div className="row">
                <div style={{ flex: 1, minWidth: 0 }}><SearchSelect {...sl} label={t(po_.addProduct)} id="no-product" value={pick} placeholder={t(po_.pickProduct)} onChange={(v) => setPick(v)} options={shop.map((p) => ({ value: p.id, keywords: skuOf(p), label: `${t(p.name)} · ${formatMoney(p.price, lang)}` }))} /></div>
                <Button variant="secondary" disabled={!pick} onClick={add}>{t(po_.addBtn)}</Button>
              </div>
              {lines.length === 0 ? <p className="muted">{t(tried ? po_.errNoItems : po_.noItems)}</p> : <DataTable label={t(po_.linesLabel)} columns={columns} rows={lines} rowKey={(l) => l.productId} empty="" />}
              {tried && overStock && <Notice tone="error">{t(po_.errStock)}</Notice>}
            </div>
          </Card>
          <Card>
            <div className="stack">
              <h3>{t(po_.detailsTitle)}</h3>
              {!parcel && <SearchSelect {...sl} label={t(po_.from)} id="no-branch" value={branch} onChange={(v) => setBranch(v)} options={placeOptions} />}
              <Field label={t(po_.customerName)} id="no-name" value={name} onChange={(e) => setName(e.target.value)} hint={err(!nameOk, t(po_.errName)) ?? (mode === 'counter' ? t(po_.customerNameHint) : undefined)} />
              <Field label={t(po_.customerPhone)} id="no-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} hint={err(!phoneOk, t(po_.errPhone))} />
              {mode === 'phone' && <Select label={t(po_.handover)} id="no-fulfil" value={fulfil} onChange={(e) => setFulfil(e.target.value as 'pickup' | 'parcel')} options={[{ value: 'pickup', label: t(po_.pickup) }, { value: 'parcel', label: t(po_.parcel) }]} />}
              {parcel && (
                <>
                  <Select label={t(po_.shippingMethod)} id="no-ship" value={shippingId} onChange={(e) => setShippingId(e.target.value)} options={parcelMethods.map((m) => ({ value: m.id, label: `${t(m.name)} · ${formatMoney(m.price ?? 0, lang)}` }))} />
                  <Field label={t(po_.address)} id="no-address" value={address} onChange={(e) => setAddress(e.target.value)} hint={err(!addressOk, t(po_.errAddress))} />
                </>
              )}
              {mode === 'counter' ? (
                <Select label={t(po_.payment)} id="no-pay" value={pay} onChange={(e) => setPay(e.target.value as Pay)} options={[{ value: 'branch', label: t(po_.payCash) }, { value: 'transfer', label: t(po_.payTransfer) }, { value: 'card', label: t(po_.payCard) }]} />
              ) : (
                <DataRow label={t(po_.payment)} value={t(parcel ? po_.payPhoneParcel : po_.payPhonePickup)} />
              )}
              <Switch checked={member} onChange={setMember} label={t(po_.member)} />
              <Select label={t(po_.coupon)} id="no-coupon" value={coupon ? coupon.id : ''} onChange={(e) => setCouponId(e.target.value)} options={[{ value: '', label: t(po_.noCoupon) }, ...usable.filter((c) => subtotal >= c.minSpend && !c.full).map((c) => ({ value: c.id, label: `${t(c.title)}${c.minSpend ? ` (${t(po_.couponMin)} ${formatMoney(c.minSpend, lang)})` : ''}` }))]} />
              {vatNow.registered && <Switch checked={tax} onChange={setTax} label={t(po_.taxSwitch)} />}
              {taxOn && (
                <>
                  <Field label={t(po_.taxName)} id="no-tax-name" value={taxName} onChange={(e) => setTaxName(e.target.value)} hint={err(!taxNameOk, t(po_.errTaxName))} />
                  <Field label={t(po_.taxId)} id="no-tax-id" inputMode="numeric" value={taxId} onChange={(e) => setTaxId(e.target.value)} hint={err(!taxIdOk, t(po_.errTaxId))} />
                </>
              )}
              <DataRow label={t(po_.subtotal)} value={formatMoney(subtotal, lang)} />
              {discount > 0 && <DataRow label={t(po_.discount)} value={`-${formatMoney(discount, lang)}`} />}
              {parcel && <DataRow label={t(po_.shipping)} value={formatMoney(shippingPrice, lang)} />}
              <DataRow strong label={t(po_.total)} value={formatMoney(total, lang)} />
              <span className="muted">{t(po_.vatNote)}</span>
              {tried && !ok && <Notice tone="error">{t(po_.errSummary)}</Notice>}
              <div className="row"><Button onClick={submit}>{t(mode === 'counter' ? po_.confirmCounter : po_.confirmPhone)}</Button><Button variant="ghost" to={`${base}/orders${search}`}>{t(po_.cancel)}</Button></div>
            </div>
          </Card>
        </CardGrid>
      </Col>
    </Grid>
  )
}

