import { useState } from 'react'
import { useProducts } from '../../../products/useProducts'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { purchaseTotal, type PurchaseOrder, type PurchaseStatus } from '../../../stock/stock'
import { Badge, Button, Card, Col, DataTable, Field, Grid, Select, type DataColumn } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { PROTOTYPE_ID, usePurchaseBook, useSearch } from '../data'
import { suppliers } from '../suppliers'
import { b, supplierNames } from '../strings'

export const poStatuses: PurchaseStatus[] = ['draft', 'ordered', 'partial', 'received', 'cancelled']
export const poStatusLabel = (s: PurchaseStatus) => ({ draft: b.poDraft, ordered: b.poOrdered, partial: b.poPartial, received: b.poReceived, cancelled: b.poCancelled })[s]
export const poStatusTone = (s: PurchaseStatus) => ({ draft: undefined, ordered: 'info', partial: 'warning', received: 'success', cancelled: 'danger' })[s] as 'info' | 'warning' | 'success' | 'danger' | undefined

export function PurchaseOrders() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const products = useProducts().all
  const [purchases] = usePurchaseBook()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [supplier, setSupplier] = useState(new URLSearchParams(useLocation().search).get('supplier') ?? '')
  const needle = q.trim().toLowerCase()
  const date = (iso?: string) => (iso ? new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium' }).format(new Date(iso)) : '-')
  const rows = purchases.filter((po) => (!status || po.status === status) && (!supplier || po.supplierId === supplier) && (!needle || po.id.toLowerCase().includes(needle) || t(supplierNames[po.supplierId]).toLowerCase().includes(needle)))
  const columns: DataColumn<PurchaseOrder>[] = [
    { key: 'id', header: t(b.colPoNo), sort: (x, y) => x.id.localeCompare(y.id), render: (po) => <span className="row"><Link to={`${base}/purchase-orders/${po.id}${search}`}>{po.id}</Link>{po.sample && <Badge>{t(b.sampleBadge)}</Badge>}</span> },
    { key: 'supplier', wrap: true, header: t(b.colSupplier), render: (po) => t(supplierNames[po.supplierId]) },
    { key: 'at', header: t(b.colOrdered), sort: (x, y) => x.at.localeCompare(y.at), render: (po) => date(po.at) },
    { key: 'expected', header: t(b.colExpected), render: (po) => date(po.expectedAt) },
    { key: 'items', header: t(b.colItems), end: true, render: (po) => po.lines.length },
    { key: 'amount', header: t(b.colAmount), end: true, sort: (x, y) => purchaseTotal(x, products) - purchaseTotal(y, products), render: (po) => formatMoney(purchaseTotal(po, products), lang) },
    { key: 'status', header: t(b.colStatus), render: (po) => <Badge tone={poStatusTone(po.status)}>{t(poStatusLabel(po.status))}</Badge> },
  ]
  return (
    <Grid>
      <Col>
        <PageHead title={t(b.poTitle)} text={`${t(b.poText)} (${purchases.length} ${t(b.records)}) ${t(b.sample)}`} actions={<Button to={`${base}/purchase-orders/new${search}`} icon="plus">{t(b.poNew)}</Button>} />
      </Col>
      <Col span={{ base: 4, sm: 8, md: 5 }}><Field label={t(b.poSearch)} id="po-q" type="search" placeholder={t(b.poSearchHint)} value={q} onChange={(e) => setQ(e.target.value)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 4 }}>
        <Select label={t(b.colSupplier)} value={supplier} onChange={(e) => setSupplier(e.target.value)} options={[{ value: '', label: t(b.allStatuses) }, ...suppliers.map((s) => ({ value: s.id, label: t(s.name) }))]} />
      </Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}>
        <Select label={t(b.statusFilter)} value={status} onChange={(e) => setStatus(e.target.value)} options={[{ value: '', label: t(b.allStatuses) }, ...poStatuses.map((s) => ({ value: s, label: t(poStatusLabel(s)) }))]} />
      </Col>
      <Col>
        <Card>
          <DataTable label={t(b.poLabel)} columns={columns} rows={rows} rowKey={(po) => po.id} empty={t(b.poEmpty)} />
        </Card>
      </Col>
    </Grid>
  )
}
