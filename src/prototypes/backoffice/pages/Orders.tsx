import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, Col, DataTable, Grid, Select, type DataColumn } from '../../../ui'
import { formatDate, formatMoney, type Order } from '../../ecommerce/cart'
import { customerText, statusOf, statusOrder } from '../../ecommerce/orders'
import { statusLabel, statusTone } from '../../ecommerce/pages/OrdersPage'
import { downloadCsv } from '../csv'
import { PageHead } from '../PageHead'
import { PROTOTYPE_ID, useBackOrders, useSearch } from '../data'
import { b } from '../strings'

export function Orders() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const orders = useBackOrders()
  const [status, setStatus] = useState('')
  const rows = orders.filter((o) => !status || statusOf(o) === status)
  const columns: DataColumn<Order>[] = [
    { key: 'id', header: t(b.colOrder), sort: (x, y) => x.id.localeCompare(y.id), render: (o) => <span className="row"><Link to={`${base}/orders/${o.id}${search}`}>{o.id}</Link>{o.sample && <Badge>{t(b.sampleBadge)}</Badge>}</span> },
    { key: 'date', header: t(b.colDate), sort: (x, y) => x.placedAt.localeCompare(y.placedAt), render: (o) => formatDate(o.placedAt, lang) },
    { key: 'customer', header: t(b.colCustomer), render: (o) => customerText(o.customer.name, lang) },
    { key: 'handover', header: t(b.colHandover), render: (o) => t(o.fulfilment === 'pickup' ? b.pickup : b.parcel) },
    { key: 'items', header: t(b.colItems), end: true, sort: (x, y) => x.lines.length - y.lines.length, render: (o) => o.lines.reduce((n, l) => n + l.qty, 0) },
    { key: 'total', header: t(b.colTotal), end: true, sort: (x, y) => x.total - y.total, render: (o) => formatMoney(o.total, lang) },
    { key: 'status', header: t(b.colStatus), render: (o) => <Badge tone={statusTone(statusOf(o))}>{t(statusLabel(statusOf(o)))}</Badge> },
  ]
  return (
    <Grid>
      <Col>
        <PageHead title={t(b.ordersTitle)} text={`${t(b.ordersText)} (${orders.length} ${t(b.records)})`} actions={<Button variant="secondary" icon="receipt" onClick={() => downloadCsv('orders.csv', [[t(b.colOrder), t(b.colDate), t(b.colCustomer), t(b.colHandover), t(b.colItems), t(b.colTotal), t(b.colStatus)], ...rows.map((o) => [o.id, new Date(o.placedAt).toISOString(), customerText(o.customer.name, lang), t(o.fulfilment === 'pickup' ? b.pickup : b.parcel), o.lines.reduce((n, l) => n + l.qty, 0), o.total, t(statusLabel(statusOf(o)))])])}>{t(b.exportCsv)}</Button>} />
      </Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}>
        <Select label={t(b.statusFilter)} value={status} onChange={(e) => setStatus(e.target.value)} options={[{ value: '', label: t(b.allStatuses) }, ...statusOrder.map((s) => ({ value: s, label: t(statusLabel(s)) }))]} />
      </Col>
      <Col>
        <Card>
          <DataTable label={t(b.ordersLabel)} columns={columns} rows={rows} rowKey={(o) => o.id} empty={t(b.ordersEmpty)} />
        </Card>
      </Col>
    </Grid>
  )
}
