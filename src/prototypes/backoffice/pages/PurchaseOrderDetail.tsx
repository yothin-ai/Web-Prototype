import { Link, useParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { costOf, purchaseTotal, type PurchaseOrder } from '../../../stock/stock'
import { Badge, Breadcrumb, Button, Card, Col, DataRow, DataTable, Grid, Notice, type DataColumn } from '../../../ui'
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
    { key: 'qty', header: t(b.colQty), end: true, render: (l) => l.qty },
    { key: 'cost', header: t(b.colUnitCost), end: true, render: (l) => { const p = productOf(l.productId); return p ? formatMoney(costOf(p), lang) : '-' } },
    { key: 'total', header: t(b.colLineTotal), end: true, render: (l) => { const p = productOf(l.productId); return p ? formatMoney(costOf(p) * l.qty, lang) : '-' } },
  ]
  const note = { draft: b.poDraftNote, ordered: b.poOrderedNote, received: b.poReceivedNote, cancelled: b.poCancelledNote }[po.status]
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
            {po.status === 'ordered' && <Button onClick={() => update({ status: 'received', receivedAt: new Date().toISOString() })}>{t(b.poReceiveGoods)}</Button>}
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
    </Grid>
  )
}
