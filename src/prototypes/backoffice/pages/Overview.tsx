import { Link } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { reorderPoint } from '../../../stock/stock'
import { useStock } from '../../../stock/useStock'
import { BarChart, Button, Card, Col, DataRow, DataTable, Grid, StatCard } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { customerText, statusOf } from '../../ecommerce/orders'
import { statusLabel, statusTone } from '../../ecommerce/pages/OrdersPage'
import { Badge } from '../../../ui'
import { PageHead } from '../PageHead'
import { PROTOTYPE_ID, useBackOrders, useBestSellers, useSales, useSearch } from '../data'
import { b } from '../strings'

export function Overview() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const { dataset } = useDataset()
  const products = dataset.ecommerce.products
  const orders = useBackOrders()
  const book = useStock()
  const sales = useSales(7)
  const locale = lang === 'th' ? 'th-TH' : 'en-US'
  const compact = new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 })
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const waiting = orders.filter((o) => ['pending', 'preparing'].includes(statusOf(o)))
  const low = products.filter((p) => book.status(p.id) === 'low')
  const out = products.filter((p) => book.status(p.id) === 'out')
  const reorder = [...out, ...low].slice(0, 6)
  const best = useBestSellers(5)
  const recent = orders.slice(0, 5)
  return (
    <Grid>
      <Col>
        <div className="stack">
          <PageHead title={t(b.overviewTitle)} text={`${t(b.overviewText)} ${t(b.sample)}`} />
          <Card>
            <div className="stack">
              <h3>{t(b.quickTitle)}</h3>
              <div className="row">
                <Button to={`${base}/orders${search}`} variant="secondary" icon="orders">{t(b.quickOrders)}</Button>
                <Button to={`${base}/receive${search}`} variant="secondary" icon="plus">{t(b.quickReceive)}</Button>
                <Button to={`${base}/adjustments${search}`} variant="secondary" icon="edit">{t(b.quickAdjust)}</Button>
                <Button to={`${base}/purchase-orders/new${search}`} variant="secondary" icon="receipt">{t(b.poNew)}</Button>
                <Button to={`${base}/transfers${search}`} variant="secondary" icon="truck">{t(b.trfNew)}</Button>
              </div>
            </div>
          </Card>
        </div>
      </Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}><StatCard icon="cash" label={t(b.salesToday)} value={formatMoney(sales[sales.length - 1].value, lang)} note={t(b.salesTodayNote)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}><StatCard icon="package" label={t(b.toPack)} value={String(waiting.length)} note={t(b.toPackNote)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}><StatCard icon="warning" label={t(b.lowStock)} value={String(low.length)} note={t(b.lowStockNote)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}><StatCard icon="bell" label={t(b.outOfStock)} value={String(out.length)} note={t(b.outOfStockNote)} /></Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <Card>
          <div className="stack">
            <h3>{t(b.salesChart)}</h3>
            <BarChart label={t(b.salesChartLabel)} items={sales.map((s) => ({ label: weekday.format(s.day), value: s.value, text: compact.format(s.value) }))} />
          </div>
        </Card>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Card>
          <div className="stack">
            <h3>{t(b.waitingTitle)}</h3>
            {waiting.length === 0 && <p className="muted">{t(b.waitingEmpty)}</p>}
            {waiting.slice(0, 5).map((o) => (
              <DataRow key={o.id} label={<span className="stack"><Link to={`${base}/orders/${o.id}${search}`}>{o.id}</Link><span className="muted">{customerText(o.customer.name, lang)}</span></span>} value={<span className="stack"><strong>{formatMoney(o.total, lang)}</strong><Badge tone="warning">{t(statusLabel(statusOf(o)))}</Badge></span>} />
            ))}
            <div><Button to={`${base}/orders${search}`} variant="ghost" size="sm">{t(b.seeAll)}</Button></div>
          </div>
        </Card>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <h3>{t(b.reorderTitle)}</h3>
            {reorder.length === 0 && <p className="muted">{t(b.reorderEmpty)}</p>}
            {reorder.map((p) => {
              const have = Math.max(0, book.total(p.id).available)
              return (
                <DataRow
                  key={p.id}
                  label={<Link to={`${base}/stock/${p.id}${search}`}>{t(p.name)}</Link>}
                  value={<span className="row"><span>{t(b.available)} {have} {t(b.pieces)} ({t(b.colReorder)} {reorderPoint(p.id)})</span><Badge tone={have === 0 ? 'danger' : 'warning'}>{t(have === 0 ? b.levelOut : b.levelLow)}</Badge></span>}
                />
              )
            })}
            <div className="row"><Button to={`${base}/receive${search}`} size="sm">{t(b.receive)}</Button><Button to={`${base}/stock${search}`} variant="ghost" size="sm">{t(b.seeAll)}</Button></div>
          </div>
        </Card>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 5 }}>
        <Card>
          <div className="stack">
            <h3>{t(b.topSellers)}</h3>
            {best.length === 0 && <p className="muted">{t(b.topSellersEmpty)}</p>}
            {best.map(([id, qty]) => {
              const p = products.find((x) => x.id === id)
              return p ? <DataRow key={id} label={<Link to={`${base}/stock/${id}${search}`}>{t(p.name)}</Link>} value={`${qty} ${t(b.sold)}`} /> : null
            })}
          </div>
        </Card>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 7 }}>
        <Card>
          <div className="stack">
            <h3>{t(b.recentOrders)}</h3>
            <DataTable
              label={t(b.recentOrdersLabel)}
              rows={recent}
              rowKey={(o) => o.id}
              empty={t(b.ordersEmpty)}
              columns={[
                { key: 'id', header: t(b.colOrder), render: (o) => <Link to={`${base}/orders/${o.id}${search}`}>{o.id}</Link> },
                { key: 'total', header: t(b.colTotal), end: true, render: (o) => formatMoney(o.total, lang) },
                { key: 'status', header: t(b.colStatus), render: (o) => <Badge tone={statusTone(statusOf(o))}>{t(statusLabel(statusOf(o)))}</Badge> },
              ]}
            />
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
