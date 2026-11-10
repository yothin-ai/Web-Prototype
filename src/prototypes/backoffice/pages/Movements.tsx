import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { historyOf, type HistoryEntry } from '../../../stock/stock'
import { useMovements, usePurchases, useTransfers } from '../../../stock/useStock'
import { Badge, Button, Card, CardGrid, Col, DataTable, Field, Grid, Select, StatCard, type DataColumn } from '../../../ui'
import { formatDate } from '../../ecommerce/cart'
import { reasonLabel } from '../AdjustModal'
import { downloadCsv } from '../csv'
import { PageHead } from '../PageHead'
import { locationName, PROTOTYPE_ID, useBackOrders, useSearch } from '../data'
import { b, supplierNames } from '../strings'

const kinds: HistoryEntry['kind'][] = ['in', 'order', 'sale', 'adjust', 'transferOut', 'transferIn']
const kindLabel = (k: HistoryEntry['kind']) => ({ in: b.typeIn, adjust: b.typeAdjust, sale: b.typeSale, order: b.typeOrder, transferOut: b.typeTransferOut, transferIn: b.typeTransferIn })[k]
const isoDay = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function Movements() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const products = useDataset().dataset.ecommerce.products
  const orders = useBackOrders()
  const [movements] = useMovements()
  const [transfers] = useTransfers()
  const [purchases] = usePurchases()
  const today = new Date()
  const monthAgo = new Date(today)
  monthAgo.setDate(monthAgo.getDate() - 30)
  const [from, setFrom] = useState(isoDay(monthAgo))
  const [to, setTo] = useState(isoDay(today))
  const [kind, setKind] = useState('')
  const all = useMemo(() => products.flatMap((p) => historyOf(p.id, orders, movements, transfers, purchases)), [products, orders, movements, transfers, purchases])
  const start = new Date(`${from}T00:00:00`).getTime()
  const end = new Date(`${to}T23:59:59`).getTime()
  const rows = all.filter((h) => { const at = new Date(h.at).getTime(); return at >= start && at <= end && (!kind || h.kind === kind) }).sort((a, c) => c.at.localeCompare(a.at))
  const nameOf = (id: string) => t(products.find((p) => p.id === id)?.name ?? {})
  const refText = (h: HistoryEntry) => h.ref ?? (h.supplierId ? t(supplierNames[h.supplierId]) : h.reason ? [t(reasonLabel(h.reason)), h.note].filter(Boolean).join(' · ') : (h.note ?? '-'))
  const columns: DataColumn<HistoryEntry>[] = [
    { key: 'date', header: t(b.colDate), sort: (x, y) => x.at.localeCompare(y.at), render: (h) => formatDate(h.at, lang) },
    { key: 'product', wrap: true, header: t(b.colProduct), render: (h) => <Link to={`${base}/stock/${h.productId}${search}`}>{nameOf(h.productId)}</Link> },
    { key: 'type', header: t(b.colType), render: (h) => <span className="row"><Badge tone={h.qty > 0 ? 'success' : undefined}>{t(kindLabel(h.kind))}</Badge>{h.sample && <Badge>{t(b.sampleBadge)}</Badge>}</span> },
    { key: 'place', header: t(b.place), render: (h) => t(locationName(h.loc)) },
    { key: 'qty', header: t(b.colQtyChange), end: true, sort: (x, y) => x.qty - y.qty, render: (h) => <strong>{h.qty > 0 ? `+${h.qty}` : h.qty}</strong> },
    { key: 'ref', header: t(b.colRef), render: (h) => refText(h) },
  ]
  const goodsIn = rows.filter((h) => h.qty > 0).reduce((n, h) => n + h.qty, 0)
  const goodsOut = rows.filter((h) => h.qty < 0).reduce((n, h) => n + h.qty, 0)
  const exportRows = () =>
    downloadCsv(`stock-movements-${from}-${to}.csv`, [
      [t(b.colDate), t(b.colProduct), t(b.colType), t(b.place), t(b.colQtyChange), t(b.colRef)],
      ...rows.map((h) => [new Date(h.at).toISOString(), nameOf(h.productId), t(kindLabel(h.kind)), t(locationName(h.loc)), h.qty, refText(h)]),
    ])
  return (
    <Grid>
      <Col>
        <PageHead title={t(b.movementsTitle)} text={`${t(b.movementsText)} (${rows.length} ${t(b.records)}) ${t(b.sample)}`} actions={<Button variant="secondary" icon="receipt" onClick={exportRows}>{t(b.exportCsv)}</Button>} />
      </Col>
      <Col>
        <CardGrid size="small">
          <StatCard icon="plus" label={t(b.mvIn)} value={`+${goodsIn}`} note={t(b.pieces)} />
          <StatCard icon="minus" label={t(b.mvOut)} value={String(goodsOut)} note={t(b.pieces)} />
          <StatCard icon="package" label={t(b.mvNet)} value={`${goodsIn + goodsOut > 0 ? '+' : ''}${goodsIn + goodsOut}`} note={t(b.pieces)} />
        </CardGrid>
      </Col>
      <Col span={{ base: 4, sm: 4, md: 4 }}><Field label={t(b.dateFrom)} id="mv-from" type="date" value={from} max={to} onChange={(e) => setFrom(e.target.value)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 4 }}><Field label={t(b.dateTo)} id="mv-to" type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} /></Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Select label={t(b.typeFilter)} value={kind} onChange={(e) => setKind(e.target.value)} options={[{ value: '', label: t(b.allTypes) }, ...kinds.map((k) => ({ value: k, label: t(kindLabel(k)) }))]} />
      </Col>
      <Col>
        <Card>
          <DataTable label={t(b.mvLabel)} columns={columns} rows={rows} rowKey={(h) => `${h.productId}:${h.id}`} empty={t(b.mvEmpty)} />
        </Card>
      </Col>
    </Grid>
  )
}
