import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { useProducts } from '../../../products/useProducts'
import { usePricePromos, type PricePromo } from '../../../promotions/usePricePromos'
import { Breadcrumb, Button, Card, Col, Field, Grid, Select } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { PROTOTYPE_ID, useSearch } from '../data'
import { pm } from '../promoStrings'

// A local date and time in the form a datetime-local field takes.
const local = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`

export function PricePromoForm() {
  const { t } = useLang()
  const { promoId } = useParams()
  const [promos] = usePricePromos()
  const base = `/${PROTOTYPE_ID}`
  const search = useSearch()
  const promo = promoId ? promos.find((p) => p.id === promoId) : undefined
  if (promoId && !promo) {
    return <Grid><Col><Card><p>{t(pm.pNotFound)}</p><div><Button to={`${base}/promotions/prices${search}`}>{t(pm.backToPrices)}</Button></div></Card></Col></Grid>
  }
  return <Form key={promo?.id ?? 'new'} promo={promo} />
}

function Form({ promo }: { promo?: PricePromo }) {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const { all, regularPriceOf } = useProducts()
  const [promos, setPromos] = usePricePromos()
  const base = `/${PROTOTYPE_ID}`
  const search = useSearch()
  const [productId, setProductId] = useState(promo?.productId ?? '')
  const [kind, setKind] = useState<PricePromo['kind']>(promo?.kind ?? 'discount')
  const [price, setPrice] = useState(promo ? String(promo.price) : '')
  const [starts, setStarts] = useState(promo ? local(new Date(promo.starts)) : local(new Date()))
  const [ends, setEnds] = useState(promo ? local(new Date(promo.ends)) : local(new Date(Date.now() + 7 * 86_400_000)))
  const [qty, setQty] = useState(promo?.qty !== undefined ? String(promo.qty) : '')
  const [tried, setTried] = useState(false)

  const regular = productId ? regularPriceOf(productId) : undefined
  const priceNum = Number(price)
  const priceOk = price.trim() !== '' && Number.isFinite(priceNum) && priceNum > 0 && (regular === undefined || priceNum < regular)
  const startIso = starts ? new Date(starts).toISOString() : ''
  const endIso = ends ? new Date(ends).toISOString() : ''
  const timeOk = !!startIso && !!endIso && endIso > startIso
  const overlap = timeOk && promos.some((p) => p.id !== promo?.id && p.productId === productId && p.kind === kind && p.starts < endIso && p.ends > startIso)
  const qtyOk = kind === 'discount' || /^[1-9]\d*$/.test(qty.trim())
  const ok = !!productId && priceOk && timeOk && !overlap && qtyOk

  const save = () => {
    setTried(true)
    if (!ok) return
    const row: PricePromo = { id: promo?.id ?? `pp-${Date.now()}`, productId, kind, price: Math.round(priceNum * 100) / 100, starts: startIso, ends: endIso, qty: kind === 'flash' ? Number(qty) : undefined }
    setPromos(promo ? promos.map((p) => (p.id === promo.id ? row : p)) : [...promos, row])
    navigate(`${base}/promotions/prices${search}`, { state: { notice: t(pm.pSaved) } })
  }
  const title = t(promo ? pm.pEditTitle : pm.pNewTitle)
  const err = (bad: boolean, message: string) => (tried && bad ? message : undefined)
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(pm.breadcrumb)} items={[{ label: t(pm.pTitle), to: `${base}/promotions/prices${search}` }, { label: title }]} />
          <PageHead title={title} text={t(pm.pFormText)} />
        </div>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <Select label={t(pm.fProduct)} id="pp-product" value={productId} placeholder={t(pm.fPickProduct)} onChange={(e) => setProductId(e.target.value)} options={all.map((p) => ({ value: p.id, label: t(p.name) }))} hint={err(!productId, t(pm.ePProduct)) ?? (regular !== undefined ? `${t(pm.regularNow)}: ${formatMoney(regular, lang)}` : undefined)} />
            <Select label={t(pm.fPKind)} id="pp-kind-f" value={kind} onChange={(e) => setKind(e.target.value as PricePromo['kind'])} options={[{ value: 'discount', label: t(pm.kindDiscount) }, { value: 'flash', label: t(pm.kindFlash) }]} />
            <Field label={t(pm.fPrice)} id="pp-price" type="number" min={0} step="0.01" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} hint={err(!priceOk, t(pm.ePPrice))} />
            <Field label={t(pm.fPStarts)} id="pp-starts" type="datetime-local" value={starts} onChange={(e) => setStarts(e.target.value)} />
            <Field label={t(pm.fPEnds)} id="pp-ends" type="datetime-local" value={ends} onChange={(e) => setEnds(e.target.value)} hint={err(!timeOk, t(pm.ePTime)) ?? err(overlap, t(pm.ePOverlap))} />
            {kind === 'flash' && <Field label={t(pm.fQty)} id="pp-qty" type="number" min={1} inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value)} hint={err(!qtyOk, t(pm.ePQty)) ?? t(pm.fQtyHint)} />}
            <div className="row"><Button onClick={save}>{t(pm.pSave)}</Button><Button variant="ghost" to={`${base}/promotions/prices${search}`}>{t(pm.cancel)}</Button></div>
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
