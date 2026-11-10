import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { useSearchLabels } from '../../../i18n/searchLabels'
import { isClosed } from '../../../accounting/accounting'
import { returnedQty, useReturns, type RefundMethod, type Return, type ReturnReason } from '../../../returns/useReturns'
import { locationIds } from '../../../stock/stock'
import { useMovements } from '../../../stock/useStock'
import { Badge, Breadcrumb, Button, Card, CardGrid, Col, DataRow, DataTable, Field, Grid, Notice, QuantityStepper, SearchSelect, Select, type DataColumn } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { statusOf } from '../../ecommerce/orders'
import { useWallet } from '../../ecommerce/wallet'
import { PageHead } from '../PageHead'
import { PROTOTYPE_ID, useBackOrders, useCloses, useReopened, useSearch, locationName } from '../data'
import { b } from '../strings'
import { rt } from '../returnStrings'

const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
const round2 = (n: number) => Math.round(n * 100) / 100

export function ReturnForm() {
  const { t, lang } = useLang()
  const sl = useSearchLabels()
  const navigate = useNavigate()
  const { orderId } = useParams()
  const base = `/${PROTOTYPE_ID}`
  const search = useSearch()
  const order = useBackOrders().find((o) => o.id === orderId)
  const [returns, setReturns] = useReturns()
  const [movements, setMovements] = useMovements()
  const [closes] = useCloses()
  const [reopened] = useReopened()
  const wallet = useWallet()
  const [picks, setPicks] = useState<Record<number, number>>({})
  const [reason, setReason] = useState<ReturnReason>('defective')
  const [note, setNote] = useState('')
  const [destination, setDestination] = useState<'restock' | 'discard'>('discard')
  const [place, setPlace] = useState('central')
  const [method, setMethod] = useState<RefundMethod>('transfer')
  const [tried, setTried] = useState(false)

  if (!order) return <Grid><Col><Card><p>{t(rt.notFound)}</p><div><Button to={`${base}/orders${search}`}>{t(rt.backToOrders)}</Button></div></Card></Col></Grid>
  const returnable = statusOf(order) === 'delivered' && !order.sample
  const left = (i: number) => order.lines[i].qty - returnedQty(returns, order.id, i)
  const anyLeft = order.lines.some((_, i) => left(i) > 0)
  // The share of an order's discount that each piece carries, so the refund is what was really paid for it.
  const share = order.subtotal > 0 ? 1 - (order.discount ?? 0) / order.subtotal : 1
  const picked = order.lines.flatMap((l, i) => ((picks[i] ?? 0) > 0 ? [{ lineIndex: i, productId: l.productId, name: l.name, price: l.price, qty: picks[i] }] : []))
  const amount = round2(picked.reduce((n, l) => n + l.price * l.qty * share, 0))
  const closed = isClosed(today(), closes, reopened)
  const ok = picked.length > 0 && !closed

  const submit = () => {
    setTried(true)
    if (!ok || !returnable) return
    const own = returns.length
    const id = `RET-${1001 + own}`
    const at = new Date().toISOString()
    const row: Return = { id, creditNo: `CN-${new Date().getFullYear()}-${String(1001 + own)}`, orderId: order.id, at, lines: picked, reason, note: note.trim() || undefined, destination, restockLoc: place, method, amount }
    setReturns([...returns, row])
    if (destination === 'restock') {
      const back = picked.filter((l) => l.productId).map((l, i) => ({ id: `mv-${Date.now()}-${i}`, at, productId: l.productId!, loc: place, kind: 'in' as const, qty: l.qty, note: `${t(rt.restockNote)} ${id}` }))
      if (back.length) setMovements([...movements, ...back])
    }
    if (method === 'wallet') wallet.credit(amount, { th: `${rt.walletTitle.th} ${order.id}`, en: `${rt.walletTitle.en} ${order.id}` })
    navigate(`${base}/returns/${id}${search}`, { state: { notice: t(rt.done) } })
  }

  const columns: DataColumn<(typeof order.lines)[number] & { i: number }>[] = [
    { key: 'product', wrap: true, header: t(rt.colProduct), render: (l) => t(l.name) },
    { key: 'paid', header: t(rt.colPaid), end: true, render: (l) => formatMoney(l.price, lang) },
    { key: 'bought', header: t(rt.colBought), end: true, render: (l) => l.qty },
    { key: 'back', header: t(rt.colBack), end: true, render: (l) => returnedQty(returns, order.id, l.i) },
    { key: 'ret', header: t(rt.colReturn), render: (l) => (left(l.i) > 0 ? <QuantityStepper value={picks[l.i] ?? 0} min={0} max={left(l.i)} onChange={(v) => setPicks({ ...picks, [l.i]: v })} label={`${t(rt.qtyOf)} ${t(l.name)}`} decreaseLabel={t(rt.less)} increaseLabel={t(rt.more)} /> : <Badge>{t(rt.colBack)}</Badge>) },
  ]
  const reasons: ReturnReason[] = ['defective', 'changed', 'wrong', 'other']
  const reasonLabel = { defective: rt.reasonDefective, changed: rt.reasonChanged, wrong: rt.reasonWrong, other: rt.reasonOther }
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(rt.breadcrumb)} items={[{ label: t(b.navOrders), to: `${base}/orders${search}` }, { label: order.id, to: `${base}/orders/${order.id}${search}` }, { label: t(rt.formTitle) }]} />
          <PageHead title={`${t(rt.formTitle)} · ${order.id}`} text={t(rt.formText)} />
        </div>
      </Col>
      {!returnable && <Col><Notice tone="info">{t(rt.notReturnable)}</Notice></Col>}
      {returnable && !anyLeft && <Col><Notice tone="info">{t(rt.nothingLeft)}</Notice></Col>}
      {returnable && anyLeft && (
        <Col>
          <CardGrid size="large">
            <Card>
              <div className="stack">
                <h3>{t(rt.linesTitle)}</h3>
                <DataTable label={t(rt.linesLabel)} columns={columns} rows={order.lines.map((l, i) => ({ ...l, i }))} rowKey={(l) => String(l.i)} empty="" />
                {tried && picked.length === 0 && <Notice tone="error">{t(rt.errNone)}</Notice>}
              </div>
            </Card>
            <Card>
              <div className="stack">
                <h3>{t(rt.detailsTitle)}</h3>
                <Select label={t(rt.reason)} id="rt-reason" value={reason} onChange={(e) => { const r = e.target.value as ReturnReason; setReason(r); setDestination(r === 'defective' ? 'discard' : 'restock') }} options={reasons.map((r) => ({ value: r, label: t(reasonLabel[r]) }))} />
                <Field label={t(rt.note)} id="rt-note" value={note} onChange={(e) => setNote(e.target.value)} />
                <Select label={t(rt.destination)} id="rt-dest" value={destination} onChange={(e) => setDestination(e.target.value as 'restock' | 'discard')} options={[{ value: 'restock', label: t(rt.destRestock) }, { value: 'discard', label: t(rt.destDiscard) }]} />
                {destination === 'restock' && <SearchSelect {...sl} label={t(rt.restockTo)} id="rt-place" value={place} onChange={(v) => setPlace(v)} options={locationIds.map((id) => ({ value: id, label: t(locationName(id)) }))} />}
                <Select label={t(rt.method)} id="rt-method" value={method} onChange={(e) => setMethod(e.target.value as RefundMethod)} options={[{ value: 'cash', label: t(rt.methodCash) }, { value: 'transfer', label: t(rt.methodTransfer) }, { value: 'wallet', label: t(rt.methodWallet) }]} />
                <DataRow strong label={t(rt.refund)} value={`${formatMoney(amount, lang)}`} />
                <span className="muted">{t(rt.vatIn)}</span>
                {closed && <Notice tone="error">{t(rt.errClosed)}</Notice>}
                <div className="row"><Button disabled={closed} onClick={submit}>{t(rt.confirm)}</Button><Button variant="ghost" to={`${base}/orders/${order.id}${search}`}>{t(rt.cancel)}</Button></div>
              </div>
            </Card>
          </CardGrid>
        </Col>
      )}
    </Grid>
  )
}

