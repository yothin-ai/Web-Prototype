import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { costOf, purchaseTotal, receivedQtyOf, remainingQtyOf, type PurchaseOrder } from '../../../stock/stock'
import { Badge, Breadcrumb, Button, Card, Col, DataRow, DataTable, Field, Grid, Modal, Notice, type DataColumn } from '../../../ui'
import { formatMoney, skuOf } from '../../ecommerce/cart'
import { locationName, PROTOTYPE_ID, usePurchaseBook, useSearch } from '../data'
import { b, supplierNames } from '../strings'
import { poStatusLabel, poStatusTone } from './PurchaseOrders'

type Line = PurchaseOrder['lines'][number]

export function PurchaseOrderDetail() {
  const { t, lang } = useLang()
  const search = useSearch()
  const { poId = '' } = useParams()
  const base = `/${PROTOTYPE_ID}`
  const products = useDataset().dataset.ecommerce.products
  const [purchases, setPurchases] = usePurchaseBook()
  const [receiving, setReceiving] = useState(false)
  const po = purchases.find((x) => x.id === poId)
  if (!po) {
    return (
      <Card>
        <div className="stack">
          <p>{t(b.notFound)}</p>
          <div><Button to={`${base}/purchase-orders${search}`} variant="secondary">{t(b.poBack)}</Button></div>
        </div>
      </Card>
    )
  }
  const update = (patch: Partial<PurchaseOrder>) => setPurchases(purchases.map((x) => (x.id === po.id ? { ...x, ...patch } : x)))
  const date = (iso?: string) => (iso ? new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium' }).format(new Date(iso)) : '-')
  const productOf = (id: string) => products.find((p) => p.id === id)
  const columns: DataColumn<Line>[] = [
    { key: 'product', header: t(b.colProduct), render: (l) => { const p = productOf(l.productId); return p ? <span className="stack"><Link to={`${base}/stock/${p.id}${search}`}>{t(p.name)}</Link><span className="muted">{skuOf(p)}</span></span> : l.productId } },
    { key: 'qty', header: t(b.colOrderedQty), end: true, render: (l) => l.qty },
    { key: 'got', header: t(b.colReceivedQty), end: true, render: (l) => receivedQtyOf(po, l.productId) },
    { key: 'left', header: t(b.colRemainingQty), end: true, render: (l) => remainingQtyOf(po, l.productId) },
    { key: 'cost', header: t(b.colUnitCost), end: true, render: (l) => { const p = productOf(l.productId); return p ? formatMoney(costOf(p), lang) : '-' } },
    { key: 'total', header: t(b.colLineTotal), end: true, render: (l) => { const p = productOf(l.productId); return p ? formatMoney(costOf(p) * l.qty, lang) : '-' } },
  ]
  const note = { draft: b.poDraftNote, ordered: b.poOrderedNote, partial: b.poPartialNote, received: b.poReceivedNote, cancelled: b.poCancelledNote }[po.status]
  const receive = (qtys: Record<string, number>) => {
    const at = new Date().toISOString()
    const lines = po.lines.map((l) => ({ productId: l.productId, qty: qtys[l.productId] ?? 0 })).filter((l) => l.qty > 0)
    const receipts = [...(po.receipts ?? (po.receivedAt ? [{ at: po.receivedAt, lines: po.lines }] : [])), { at, lines }]
    const done = po.lines.every((l) => receipts.reduce((n, r) => n + (r.lines.find((x) => x.productId === l.productId)?.qty ?? 0), 0) >= l.qty)
    update({ receipts, status: done ? 'received' : 'partial', receivedAt: done ? at : po.receivedAt })
    setReceiving(false)
  }
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(b.breadcrumb)} items={[{ label: t(b.navPurchaseOrders), to: `${base}/purchase-orders${search}` }, { label: po.id }]} />
          <div className="row">
            <h1>{po.id}</h1>
            <Badge tone={poStatusTone(po.status)}>{t(poStatusLabel(po.status))}</Badge>
            {po.sample && <Badge>{t(b.sampleBadge)}</Badge>}
          </div>
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <div className="stack">
          <Card>
            <div className="stack">
              <h3>{t(b.poLines)}</h3>
              <DataTable label={t(b.poLinesLabel)} columns={columns} rows={po.lines} rowKey={(l) => l.productId} empty="" />
              <span className="muted">{t(b.poCostNote)}</span>
            </div>
          </Card>
          <Notice tone={po.status === 'received' ? 'success' : 'info'}>{t(note)}</Notice>
          <div className="row">
            {po.status === 'draft' && <Button onClick={() => update({ status: 'ordered' })}>{t(b.poPlaceOrder)}</Button>}
            {po.status === 'draft' && <Button to={`${base}/purchase-orders/${po.id}/edit${search}`} variant="secondary" icon="edit">{t(b.poEdit)}</Button>}
            {(po.status === 'ordered' || po.status === 'partial') && <Button onClick={() => setReceiving(true)}>{t(b.poReceiveGoods)}</Button>}
            {(po.status === 'draft' || po.status === 'ordered') && <Button variant="secondary" onClick={() => update({ status: 'cancelled' })}>{t(b.poCancel)}</Button>}
          </div>
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Card>
          <div className="stack">
            <DataRow label={t(b.colSupplier)} value={t(supplierNames[po.supplierId])} />
            <DataRow label={t(b.colOrdered)} value={date(po.at)} />
            <DataRow label={t(b.colExpected)} value={date(po.expectedAt)} />
            <DataRow label={t(b.poPlace)} value={t(locationName(po.loc))} />
            {po.note && <DataRow label={t(b.colNote)} value={po.note} />}
            <DataRow strong label={t(b.poTotal)} value={formatMoney(purchaseTotal(po, products), lang)} />
          </div>
        </Card>
      </Col>
      {receiving && <ReceiveDialog po={po} nameOf={(id) => t(productOf(id)?.name ?? {})} onClose={() => setReceiving(false)} onSave={receive} />}
    </Grid>
  )
}

// Takes in some or all of what is still to come on an order. Each save is one receipt, so the stock and the books follow it.
function ReceiveDialog({ po, nameOf, onClose, onSave }: { po: PurchaseOrder; nameOf: (id: string) => string; onClose: () => void; onSave: (qtys: Record<string, number>) => void }) {
  const { t } = useLang()
  const open = po.lines.filter((l) => remainingQtyOf(po, l.productId) > 0)
  const [qtys, setQtys] = useState<Record<string, string>>(Object.fromEntries(open.map((l) => [l.productId, String(remainingQtyOf(po, l.productId))])))
  const [tried, setTried] = useState(false)
  const parsed = open.map((l) => ({ id: l.productId, left: remainingQtyOf(po, l.productId), n: Number(qtys[l.productId]), raw: qtys[l.productId] }))
  const valid = parsed.every((x) => x.raw.trim() !== '' && Number.isInteger(x.n) && x.n >= 0 && x.n <= x.left) && parsed.some((x) => x.n > 0)
  return (
    <Modal open onClose={onClose} label={t(b.poReceiveTitle)} closeLabel={t(b.poReceiveClose)}>
      <div className="stack">
        <h2>{t(b.poReceiveTitle)}</h2>
        {parsed.map((x) => (
          <Field key={x.id} label={`${nameOf(x.id)} (${t(b.colRemainingQty)}: ${x.left})`} id={`rcv-${x.id}`} type="number" min={0} max={x.left} inputMode="numeric" value={qtys[x.id]} onChange={(e) => setQtys({ ...qtys, [x.id]: e.target.value })} />
        ))}
        {tried && !valid && <Notice tone="error">{t(b.poReceiveErr)}</Notice>}
        <div className="row">
          <Button onClick={() => { setTried(true); if (valid) onSave(Object.fromEntries(parsed.map((x) => [x.id, x.n]))) }}>{t(b.poReceiveSave)}</Button>
          <Button variant="ghost" onClick={onClose}>{t(b.poReceiveClose)}</Button>
        </div>
      </div>
    </Modal>
  )
}
