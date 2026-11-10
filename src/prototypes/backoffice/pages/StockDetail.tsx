import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { historyOf, locationIds, reorderPoint, type HistoryEntry } from '../../../stock/stock'
import { useMovements, usePurchases, useStock, useTransfers } from '../../../stock/useStock'
import { Badge, Breadcrumb, Button, Card, Col, DataRow, DataTable, Grid, Notice, type DataColumn } from '../../../ui'
import { formatDate, formatMoney, skuOf } from '../../ecommerce/cart'
import { AdjustModal, reasonLabel } from '../AdjustModal'
import { locationName, PROTOTYPE_ID, useBackOrders, useSearch } from '../data'
import { b, supplierNames } from '../strings'
import { levelLabel } from './StockList'

const typeLabel = (k: HistoryEntry['kind']) => ({ in: b.typeIn, adjust: b.typeAdjust, sale: b.typeSale, order: b.typeOrder, transferOut: b.typeTransferOut, transferIn: b.typeTransferIn })[k]

export function StockDetail() {
  const { t, lang } = useLang()
  const search = useSearch()
  const { productId = '' } = useParams()
  const base = `/${PROTOTYPE_ID}`
  const product = useDataset().dataset.ecommerce.products.find((p) => p.id === productId)
  const book = useStock()
  const orders = useBackOrders()
  const [movements] = useMovements()
  const [transfers] = useTransfers()
  const [purchases] = usePurchases()
  const [adjusting, setAdjusting] = useState(false)
  const [saved, setSaved] = useState(false)
  if (!product) {
    return (
      <Card>
        <div className="stack">
          <p>{t(b.notFound)}</p>
          <div><Button to={`${base}/stock${search}`} variant="secondary">{t(b.navStock)}</Button></div>
        </div>
      </Card>
    )
  }
  const total = book.total(product.id)
  const status = book.status(product.id)
  const places = locationIds.map((id) => ({ id, ...book.cell(product.id, id) }))
  const history = historyOf(product.id, orders, movements, transfers, purchases)
  const placeColumns: DataColumn<(typeof places)[number]>[] = [
    { key: 'place', header: t(b.place), render: (p) => t(locationName(p.id)) },
    { key: 'onhand', header: t(b.colOnHand), end: true, render: (p) => p.onHand },
    { key: 'reserved', header: t(b.colReserved), end: true, render: (p) => p.reserved },
    { key: 'avail', header: t(b.colAvailable), end: true, render: (p) => <strong>{p.available}</strong> },
  ]
  const historyColumns: DataColumn<HistoryEntry>[] = [
    { key: 'date', header: t(b.colDate), render: (h) => formatDate(h.at, lang) },
    { key: 'type', header: t(b.colType), render: (h) => <span className="row"><Badge tone={h.qty > 0 ? 'success' : undefined}>{t(typeLabel(h.kind))}</Badge>{h.sample && <Badge>{t(b.sampleBadge)}</Badge>}</span> },
    { key: 'place', header: t(b.place), render: (h) => t(locationName(h.loc)) },
    { key: 'qty', header: t(b.colQtyChange), end: true, render: (h) => <strong>{h.qty > 0 ? `+${h.qty}` : h.qty}</strong> },
    { key: 'ref', header: t(b.colRef), render: (h) => (h.ref ? <Link to={(h.ref.startsWith('TRF-') ? `${base}/transfers${search}` : `${base}/${h.ref.startsWith('PO-') ? 'purchase-orders' : 'orders'}/${h.ref}${search}`)}>{h.ref}</Link> : h.supplierId ? t(supplierNames[h.supplierId]) : h.reason ? [t(reasonLabel(h.reason)), h.note].filter(Boolean).join(' · ') : (h.note ?? '-')) },
  ]
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(b.breadcrumb)} items={[{ label: t(b.navStock), to: `${base}/stock${search}` }, { label: t(product.name) }]} />
          <div className="row">
            <h1>{t(product.name)}</h1>
            <Badge tone={status === 'ok' ? 'success' : status === 'out' ? 'danger' : 'warning'}>{t(levelLabel(status))}</Badge>
          </div>
          <div className="row">
            <Button to={`${base}/receive${search}${search ? '&' : '?'}product=${product.id}`}>{t(b.receive)}</Button>
            <Button variant="secondary" onClick={() => { setSaved(false); setAdjusting(true) }}>{t(b.adjust)}</Button>
          </div>
          {saved && <Notice tone="success">{t(b.adjusted)}</Notice>}
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Card>
          <div className="stack">
            <DataRow label={t(b.sku)} value={skuOf(product)} />
            <DataRow label={t(b.colCategory)} value={t(product.category)} />
            <DataRow label={t(b.price)} value={formatMoney(product.price, lang)} />
            <DataRow label={t(b.colReorder)} value={`${reorderPoint(product.id)} ${t(b.pieces)}`} />
            <DataRow label={`${t(b.total)}: ${t(b.colOnHand)}`} value={total.onHand} />
            <DataRow label={`${t(b.total)}: ${t(b.colReserved)}`} value={total.reserved} />
            <DataRow strong label={`${t(b.total)}: ${t(b.colAvailable)}`} value={total.available} />
          </div>
        </Card>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <Card>
          <div className="stack">
            <h3>{t(b.detailPlaces)}</h3>
            <DataTable label={t(b.detailPlacesLabel)} columns={placeColumns} rows={places} rowKey={(p) => p.id} empty="" />
          </div>
        </Card>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <h3>{t(b.detailHistory)}</h3>
            <DataTable label={t(b.detailHistoryLabel)} columns={historyColumns} rows={history} rowKey={(h) => h.id} empty={t(b.historyEmpty)} />
          </div>
        </Card>
      </Col>
      {adjusting && <AdjustModal product={product} open onClose={() => setAdjusting(false)} initialLoc="central" onSaved={() => setSaved(true)} />}
    </Grid>
  )
}
