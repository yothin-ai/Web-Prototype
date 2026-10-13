import { useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import {
  Badge, Breadcrumb, Button, Card, ChoiceCard, Col, DataRow, DropdownMenu, Field, Grid, IconCircle, Notice, Select, StepPill, StickyActionBar, Switch,
} from '../../../ui'
import { cartCount, cartSubtotal, formatMoney, PROTOTYPE_ID, useChosenCart, useEcommerce, type Order } from '../cart'
import {
  couponDiscount, needsPaymentPage, paymentOptions, payTypeFromParam, useClubLinked, useCommitOrder, usePending, useAddresses, pickAddress,
  type Fulfilment, type PayId,
} from '../checkout'
import { a } from '../accountStrings'
import { c } from '../checkoutStrings'
import { s } from '../strings'
import { branchById, branches, useBranch } from '../branches'
import { AddressBook, placeOf } from './AddressBook'
import { useNarrow } from '../useNarrow'
import '../checkout.css'

const PHONE = /^0\d{9}$/

type Problem = { anchor: string; message: string }

export function Checkout() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { dataset } = useDataset()
  const { home, store, checkout } = dataset.ecommerce
  const { productById, shippingMethods } = useEcommerce()
  const { chosen: cart } = useChosenCart()
  const [, setPending] = usePending()
  const commit = useCommitOrder()
  const [addresses] = useAddresses()
  const [addressId, setAddressId] = useState('')
  const address = pickAddress(addresses, addressId)
  const [clubLinked, setClubLinked] = useClubLinked()
  const narrow = useNarrow()
  const placed = useRef(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const base = `/${PROTOTYPE_ID}`

  const [fulfil, setFulfil] = useState<Fulfilment>('pickup')
  const [pickupMode, setPickupMode] = useState<'counter' | 'locker'>('counter')
  const [contact, setContact] = useState({ name: '', phone: '' })
  const [contactSaved, setContactSaved] = useState(false)
  const [shippingId, setShippingId] = useState('')
  const [etax, setEtax] = useState(false)
  const [tax, setTax] = useState({ id: '', name: '' })
  const [payId, setPayId] = useState<PayId | ''>(payTypeFromParam(params.get('payType')))
  const [bank, setBank] = useState('')
  const [months, setMonths] = useState(0)
  const [clubTab, setClubTab] = useState<'phone' | 'id'>('phone')
  const [clubValue, setClubValue] = useState('')
  const [couponOpen, setCouponOpen] = useState(false)
  const [couponId, setCouponId] = useState('')
  const [attempted, setAttempted] = useState(false)

  if (cart.length === 0 && !placed.current) return <Navigate to={`${base}/cart${search}`} replace />

  const parcelMethods = shippingMethods.filter((m) => m.id !== 'pickup')
  const subtotal = cartSubtotal(cart, productById)
  const shippingPrice = fulfil === 'pickup' ? 0 : (parcelMethods.find((m) => m.id === shippingId)?.price ?? 0)
  const coupon = checkout.coupons.find((x) => x.id === couponId)
  const cut = couponDiscount(coupon, subtotal, shippingPrice, fulfil)
  const afterDiscount = subtotal - cut.items
  const net = afterDiscount + shippingPrice - cut.shipping
  const points = Math.floor(afterDiscount / home.app.earnBaht)
  const count = cartCount(cart)
  const club = t(home.app.club)
  const [branchId, setBranchId] = useBranch()
  const branch = t(branchById(branchId).name)
  const eligible = net >= store.installmentMin
  const modes = paymentOptions.filter((p) => p.modes.includes(fulfil))
  const activePay = payId && modes.some((p) => p.id === payId) ? payId : ''

  const problems: Problem[] = []
  if (fulfil === 'pickup') {
    if (!contact.name.trim()) problems.push({ anchor: 'co-contact-name', message: t(c.errName) })
    if (!PHONE.test(contact.phone)) problems.push({ anchor: 'co-contact-phone', message: t(c.errPhone) })
  } else {
    if (!address) problems.push({ anchor: 'co-address', message: t(c.errAddress) })
    if (!shippingId) problems.push({ anchor: 'co-shipping', message: t(c.errShipping) })
  }
  if (!activePay) problems.push({ anchor: 'co-payment', message: t(c.errPayment) })
  if (activePay === 'card' && months > 0 && !bank) problems.push({ anchor: 'co-bank', message: t(c.errBank) })

  const stepLabel = (n: number, name: string) => ({ step: n, label: name, progress: `${t(c.stepWord)} ${n} ${t(c.ofThree)}` })

  const confirm = () => {
    setAttempted(true)
    if (problems.length > 0) {
      document.getElementById(problems[0].anchor)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const lines = cart.flatMap((l) => {
      const p = productById(l.productId)
      return p ? [{ productId: p.id, name: p.name, price: p.price, qty: l.qty }] : []
    })
    const customer =
      fulfil === 'pickup'
        ? { name: contact.name, phone: contact.phone, address: branch }
        : { name: address!.name, phone: address!.phone, address: placeOf(t, address!) }
    const draft: Order = {
      id: '',
      placedAt: '',
      customer,
      shippingId: fulfil === 'pickup' ? 'pickup' : shippingId,
      paymentId: activePay,
      lines,
      subtotal,
      shippingPrice,
      total: net,
      fulfilment: fulfil,
      pickupMode: fulfil === 'pickup' ? pickupMode : undefined,
      discount: cut.items + cut.shipping,
      couponTitle: coupon && cut.items + cut.shipping > 0 ? coupon.title : undefined,
      points,
      installment: activePay === 'card' && months > 0 ? { months, monthly: Math.ceil(net / months) } : undefined,
    }
    if (needsPaymentPage(activePay as PayId)) {
      setPending(draft)
      navigate(`${base}/pay${search}`)
    } else {
      placed.current = true
      const order = commit(draft)
      navigate(`${base}/done/${order.id}${search}`)
    }
  }

  const err = (cond: boolean, message: string) => (attempted && cond ? message : undefined)
  const shown = (anchor: string) => attempted && problems.some((p) => p.anchor === anchor)

  const switchFulfil = (next: Fulfilment) => {
    setFulfil(next)
    setCouponOpen(false)
  }

  return (
    <Grid>
      <Col>
        <div className="stack">
          <StepPill {...stepLabel(2, t(c.stepPay))} />
          <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search}` }, { label: t(c.stepCart), to: `${base}/cart${search}` }, { label: t(c.title) }]} />
          <div className="row">
            <h1 className="row__grow">{t(c.title)}</h1>
            <span className="muted">{cart.length} {t(c.itemsWord)} · {count} {t(c.piecesWord)} · {t(c.willEarn)} +{points} {t(c.pointsUnit)}</span>
          </div>
          <Notice tone="success" title={`${t(c.bannerTitleBefore)} ${points} ${t(c.pointsUnit)}${club} ${t(c.bannerTitleAfter)}`}>{t(c.bannerBody)}</Notice>
        </div>
      </Col>

      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <div className="stack">
          {/* 1. How you get it */}
          <Card>
            <div className="checkout-head"><span className="checkout-num">1</span><h2 className="row__grow">{t(c.sec1)}</h2><span className="muted">{t(c.pickOne)}</span></div>
            <div className="choice-row" role="radiogroup" aria-label={t(c.sec1)}>
              <ChoiceCard title={t(c.pickup)} detail={t(c.pickupDetail)} price={t(c.pickupPrice)} selected={fulfil === 'pickup'} onSelect={() => switchFulfil('pickup')} />
              <ChoiceCard title={t(c.parcel)} detail={t(c.parcelDetail)} price={t(c.parcelPrice)} selected={fulfil === 'parcel'} onSelect={() => switchFulfil('parcel')} />
            </div>

            {fulfil === 'pickup' ? (
              <>
                <div className="branch-card">
                  <IconCircle size="md" icon="store" />
                  <div className="branch-card__text">
                    <strong>{branch}</strong>
                    <span className="row"><Badge tone="success">{t(c.open)}</Badge><Badge>{t(c.hasLocker)}</Badge></span>
                  </div>
                  <DropdownMenu variant="button" trigger={t(c.changeBranch)} items={branches.map((b) => ({ id: b.id, label: t(b.name), detail: t(b.province), active: b.id === branchId, onSelect: () => setBranchId(b.id) }))} />
                </div>
                <div className="choice-row" role="radiogroup" aria-label={t(c.pickup)}>
                  <ChoiceCard title={t(c.counter)} detail={t(c.counterDetail)} selected={pickupMode === 'counter'} onSelect={() => setPickupMode('counter')} />
                  <ChoiceCard title={t(c.locker)} detail={t(c.lockerDetail)} selected={pickupMode === 'locker'} onSelect={() => setPickupMode('locker')} />
                </div>
                <div className="checkout-panel stack">
                  <strong>{t(c.contactTitle)}</strong>
                  <Grid>
                    <Col span={{ base: 4, sm: 4, md: 6 }}>
                      <Field label={t(c.fullName)} id="co-contact-name" placeholder={t(a.nameExample)} value={contact.name} aria-invalid={shown('co-contact-name')} hint={err(!contact.name.trim(), t(c.errName))} onChange={(e) => { setContact({ ...contact, name: e.target.value }); setContactSaved(false) }} />
                    </Col>
                    <Col span={{ base: 4, sm: 4, md: 6 }}>
                      <Field label={t(c.phone)} id="co-contact-phone" type="tel" inputMode="tel" placeholder={t(a.phoneExample)} value={contact.phone} aria-invalid={shown('co-contact-phone')} hint={err(!PHONE.test(contact.phone), t(c.errPhone))} onChange={(e) => { setContact({ ...contact, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }); setContactSaved(false) }} />
                    </Col>
                  </Grid>
                  <div className="row">
                    <Button size="sm" onClick={() => { setAttempted(true); if (contact.name.trim() && PHONE.test(contact.phone)) setContactSaved(true) }}>{t(c.save)}</Button>
                    {contactSaved && <Badge tone="success">{t(c.saved)}</Badge>}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div id="co-address" className="stack">
                  <AddressBook selectedId={address?.id} onSelect={setAddressId} emptyHint={t(c.noAddressHint)} />
                  {shown('co-address') && <Notice tone="error">{t(c.errAddress)}</Notice>}
                </div>
                <div id="co-shipping" className="stack">
                  <strong>{t(c.shippingMethod)}</strong>
                  <div className="choice-row" role="radiogroup" aria-label={t(c.shippingMethod)}>
                    {parcelMethods.map((m) => (
                      <ChoiceCard key={m.id} title={t(m.name)} detail={t(m.detail)} price={m.price !== undefined ? formatMoney(m.price, lang) : undefined} selected={shippingId === m.id} onSelect={() => setShippingId(m.id)} />
                    ))}
                  </div>
                  {shown('co-shipping') && <Notice tone="error">{t(c.errShipping)}</Notice>}
                </div>
              </>
            )}

            <Switch checked={etax} onChange={setEtax} label={t(c.etaxTitle)} description={t(c.etaxDesc)} />
            {etax && (
              <div className="checkout-panel stack">
                <Grid>
                  <Col span={{ base: 4, sm: 4, md: 6 }}><Field label={t(c.taxId)} id="tx-id" inputMode="numeric" value={tax.id} onChange={(e) => setTax({ ...tax, id: e.target.value.replace(/\D/g, '').slice(0, 13) })} /></Col>
                  <Col span={{ base: 4, sm: 4, md: 6 }}><Field label={t(c.taxName)} id="tx-name" value={tax.name} onChange={(e) => setTax({ ...tax, name: e.target.value })} /></Col>
                </Grid>
                <span className="muted">{t(c.taxNote)}</span>
              </div>
            )}
          </Card>

          {/* 2. Items */}
          <Card>
            <div className="checkout-head"><span className="checkout-num">2</span><h2 className="row__grow">{t(c.sec2)}</h2><Link to={`${base}/cart${search}`}>{t(c.editInCart)}</Link></div>
            <Notice tone="success" title={`${t(c.readyList)} · ${cart.length} SKU · ${count} ${t(c.piecesWord)}`} />
            {cart.map((l) => {
              const p = productById(l.productId)
              if (!p) return null
              return (
                <div key={l.productId} className="checkout-item">
                  <div className="checkout-item__thumb" aria-hidden="true">{Array.from(t(p.name))[0]}</div>
                  <div className="checkout-item__text">
                    <Link to={`${base}/product/${p.id}${search}`} className="card-link"><strong>{t(p.name)}</strong></Link>
                    <Badge tone="warning">{t(c.readyReceive)}</Badge>
                    <span className="muted">× {l.qty} {t(c.piecesWord)}</span>
                  </div>
                  <strong>{formatMoney(p.price * l.qty, lang)}</strong>
                </div>
              )
            })}
          </Card>

          {/* 3. Payment */}
          <Card>
            <div id="co-payment" className="checkout-head"><span className="checkout-num">3</span><h2 className="row__grow">{t(c.sec3)}</h2><Badge>{t(c.pci)}</Badge></div>
            {shown('co-payment') && <Notice tone="error" title={t(c.errPayment)} />}
            <div className="choice-group" role="radiogroup" aria-label={t(c.sec3)}>
              {modes.map((m) => (
                <ChoiceCard key={m.id} title={t(m.name)} detail={t(m.detail)} selected={activePay === m.id} onSelect={() => setPayId(m.id)} />
              ))}
            </div>

            {activePay === 'card' && (
              <div className="checkout-panel stack">
                <Notice tone="info">{t(c.cardDemo)}</Notice>
                <Grid>
                  <Col><Field label={t(c.cardNumber)} id="cd-num" value="4242 4242 4242 4242" readOnly /></Col>
                  <Col span={{ base: 4, sm: 4, md: 6 }}><Field label={t(c.cardName)} id="cd-name" value="SAMPLE NAME" readOnly /></Col>
                  <Col span={{ base: 2, sm: 2, md: 3 }}><Field label={t(c.cardExpiry)} id="cd-exp" value="12/30" readOnly /></Col>
                  <Col span={{ base: 2, sm: 2, md: 3 }}><Field label={t(c.cardCvv)} id="cd-cvv" value="123" readOnly /></Col>
                </Grid>
                <strong>{t(c.installTitle)}</strong>
                {eligible ? (
                  <>
                    <div id="co-bank">
                      <Select
                        label={t(c.bank)}
                        id="cd-bank"
                        value={bank}
                        placeholder={t(c.selectBank)}
                        hint={err(months > 0 && !bank, t(c.errBank))}
                        options={checkout.banks.map((b, i) => ({ value: String(i), label: t(b) }))}
                        onChange={(e) => setBank(e.target.value)}
                      />
                    </div>
                    <div className="choice-row" role="radiogroup" aria-label={t(c.installTitle)}>
                      <ChoiceCard title={t(c.fullPay)} detail={formatMoney(net, lang)} selected={months === 0} onSelect={() => setMonths(0)} />
                      {checkout.installmentMonths.map((m) => (
                        <ChoiceCard key={m} title={`${m} ${t(c.monthsWord)}`} detail={`${formatMoney(Math.ceil(net / m), lang)} ${t(c.perMonth)}`} selected={months === m} onSelect={() => setMonths(m)} />
                      ))}
                    </div>
                  </>
                ) : (
                  <span className="muted">{t(c.installNeed)} {formatMoney(store.installmentMin - net, lang)} {t(c.installNeedTail)}</span>
                )}
              </div>
            )}
            <span className="muted">{t(c.gatewayNote)}</span>
          </Card>
        </div>
      </Col>

      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <div className="checkout-aside" ref={summaryRef}>
          <Card>
            <div className="row"><IconCircle size="sm" icon="crown" /><strong className="row__grow">{t(c.clubTitle)}{club}</strong>{clubLinked && <Badge tone="success">{t(c.connected)}</Badge>}</div>
            <span className="muted">{t(c.clubSub)}</span>
            {clubLinked ? (
              <div><Button variant="ghost" size="sm" onClick={() => setClubLinked(false)}>{t(c.disconnect)}</Button></div>
            ) : (
              <>
                <div className="row">
                  <Button size="sm" variant={clubTab === 'phone' ? 'primary' : 'secondary'} aria-pressed={clubTab === 'phone'} onClick={() => setClubTab('phone')}>{t(c.tabPhone)}</Button>
                  <Button size="sm" variant={clubTab === 'id' ? 'primary' : 'secondary'} aria-pressed={clubTab === 'id'} onClick={() => setClubTab('id')}>{t(c.tabNationalId)}</Button>
                </div>
                <Field label={clubTab === 'phone' ? t(c.tabPhone) : t(c.tabNationalId)} id="club-value" inputMode="numeric" placeholder={clubTab === 'phone' ? t(c.phonePlaceholder) : t(c.idPlaceholder)} value={clubValue} onChange={(e) => setClubValue(e.target.value.replace(/\D/g, '').slice(0, clubTab === 'phone' ? 10 : 13))} />
                <Button onClick={() => { setClubLinked(true); setClubValue('') }}>{t(c.connect)}</Button>
              </>
            )}
          </Card>

          <Card>
            <button type="button" className="coupon-row" aria-expanded={couponOpen} onClick={() => setCouponOpen((o) => !o)}>
              <IconCircle size="md" icon="ticket" />
              <span className="coupon-row__text"><strong>{coupon && cut.items + cut.shipping > 0 ? `${t(c.couponUsed)}: ${t(coupon.title)}` : t(c.couponTitle)}</strong><span className="muted">{t(c.couponSub)}</span></span>
              <span aria-hidden="true">{couponOpen ? '⌃' : '›'}</span>
            </button>
            {couponOpen && (
              <div className="choice-group" role="radiogroup" aria-label={t(c.couponTitle)}>
                <ChoiceCard title={t(c.couponNone)} selected={couponId === ''} onSelect={() => setCouponId('')} />
                {checkout.coupons.map((cp) => {
                  const blocked = subtotal < cp.minSpend || (cp.kind === 'freeship' && fulfil !== 'parcel')
                  const note = cp.kind === 'freeship' && fulfil !== 'parcel' ? t(c.couponNeedParcel) : subtotal < cp.minSpend ? `${t(c.minSpend)} ${formatMoney(cp.minSpend, lang)}` : t(cp.detail)
                  return <ChoiceCard key={cp.id} title={t(cp.title)} detail={note} selected={couponId === cp.id && !blocked} onSelect={() => !blocked && setCouponId(cp.id)} />
                })}
              </div>
            )}
          </Card>

          <Card>
            <h3>{t(c.summaryTitle)}</h3>
            <DataRow muted label={t(c.itemsTotal)} value={formatMoney(subtotal, lang)} />
            {cut.items + cut.shipping > 0 && <DataRow muted label={`${t(c.discountLabel)}${coupon ? ` · ${t(coupon.title)}` : ''}`} value={`-${formatMoney(cut.items + cut.shipping, lang)}`} />}
            <DataRow muted label={t(c.shippingLabel)} value={shippingPrice === 0 ? t(s.free) : formatMoney(shippingPrice, lang)} />
            <DataRow muted label={t(c.afterDiscount)} value={formatMoney(afterDiscount, lang)} />
            <DataRow muted label={t(c.pointsEarn)} value={`+${points} pts`} />
            <DataRow strong label={<span className="stack"><span>{t(c.netTotal)}</span><span className="muted">{t(c.vatNote)}</span></span>} value={<span className="checkout-total">{formatMoney(net, lang)}</span>} />
            {problems.length > 0 && attempted && <Notice tone="error" title={t(c.errFix)}>{problems.map((p) => p.message).join(' · ')}</Notice>}
            <Button onClick={confirm}>{t(c.confirm)} · {formatMoney(net, lang)}</Button>
            <span className="muted checkout-legal">{t(c.legalBefore)} <a href="#/ecommerce/checkout" onClick={(e) => e.preventDefault()}>{t(c.terms)}</a> {t(c.legalAnd)} <a href="#/ecommerce/checkout" onClick={(e) => e.preventDefault()}>{t(c.privacy)}</a></span>
            <div className="row"><Badge tone="success">✓ {t(c.genuine)}</Badge><Badge tone="success">✓ {t(c.returns)}</Badge></div>
          </Card>
        </div>
      </Col>

      <StickyActionBar
        thumb={false}
        visible={narrow}
        name={`${cart.length} ${t(c.itemsWord)}`}
        price={formatMoney(net, lang)}
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => summaryRef.current?.scrollIntoView({ behavior: 'smooth' })}>{t(c.viewSummary)}</Button>
            <Button size="sm" onClick={confirm}>{t(c.confirm)}</Button>
          </>
        }
      />
    </Grid>
  )
}
