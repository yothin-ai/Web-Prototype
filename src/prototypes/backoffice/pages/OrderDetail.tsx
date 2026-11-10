import { Link, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { orderLocation } from '../../../stock/stock'
import { useStock } from '../../../stock/useStock'
import { Badge, Breadcrumb, Button, Card, CardGrid, Col, DataRow, DataTable, Grid, Notice, type DataColumn } from '../../../ui'
import { formatDate, formatMoney, skuOf } from '../../ecommerce/cart'
import { findPayment } from '../../ecommerce/checkout'
import { customerText, statusOf } from '../../ecommerce/orders'
import { statusLabel, statusTone } from '../../ecommerce/pages/OrdersPage'
import { useEcommerce } from '../../ecommerce/cart'
import { locationName, PROTOTYPE_ID, useBackOrders, useUpdateOrder, useSearch } from '../data'
import { b } from '../strings'
import { po_ } from '../posStrings'

type Line = { productId?: string; name: { th?: string; en?: string }; price: number; qty: number }

export function OrderDetail() {
  const { t, lang } = useLang()
  const search = useSearch()
  const { orderId = '' } = useParams()
  const base = `/${PROTOTYPE_ID}`
  const order = useBackOrders().find((o) => o.id === orderId)
  const update = useUpdateOrder()
  const book = useStock()
  const { productById } = useEcommerce()
  if (!order) {
    return (
      <Card>
        <div className="stack">
          <p>{t(b.notFound)}</p>
          <div><Button to={`${base}/orders${search}`} variant="secondary">{t(b.backToOrders)}</Button></div>
        </div>
      </Card>
    )
  }
  const st = statusOf(order)
  const loc = orderLocation(order)
  const short = order.lines.filter((l) => l.productId && book.cell(l.productId, loc).onHand < l.qty)
  const packedHistory = st === 'ready' || st === 'delivered'
  const columns: DataColumn<Line>[] = [
    { key: 'product', wrap: true, header: t(b.colProduct), render: (l) => (l.productId && productById(l.productId) ? <span className="stack"><Link to={`${base}/stock/${l.productId}${search}`}>{t(l.name)}</Link><span className="muted">{skuOf(productById(l.productId)!)}</span></span> : t(l.name)) },
    { key: 'qty', header: t(b.colQty), end: true, render: (l) => l.qty },
    { key: 'price', header: t(b.colPrice), end: true, render: (l) => formatMoney(l.price, lang) },
    { key: 'here', header: t(b.colOnHandHere), end: true, render: (l) => (l.productId ? book.cell(l.productId, loc).onHand : '-') },
  ]
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(b.breadcrumb)} items={[{ label: t(b.navOrders), to: `${base}/orders${search}` }, { label: order.id }]} />
          <div className="row">
            <h1>{t(b.orderTitle)} {order.id}</h1>
            <Badge tone={statusTone(st)}>{t(statusLabel(st))}</Badge>
            {order.sample && <Badge>{t(b.sampleBadge)}</Badge>}
            {order.origin && <Badge tone="info">{t(order.origin === 'counter' ? po_.originCounter : po_.originPhone)}</Badge>}
          </div>
        </div>
      </Col>
      <Col>
        <CardGrid size="large">
          <div className="stack">
            <Card>
              <DataTable label={t(b.linesLabel)} columns={columns} rows={order.lines} rowKey={(l) => `${l.productId ?? ''}-${t(l.name)}`} empty="" />
            </Card>
            {st === 'preparing' && short.length > 0 && (
              <Notice tone="error" title={t(b.shortTitle)}>
                {t(b.shortText)} <Link to={`${base}/receive${search}${search ? '&' : '?'}product=${short[0].productId}`}>{t(b.receiveFor)}</Link>
              </Notice>
            )}
            {st === 'pending' && <Notice tone="info">{t(b.waitingPayment)}</Notice>}
            {packedHistory && <Notice tone="success">{t(b.packedNote)}</Notice>}
            {st === 'cancelled' && <Notice tone="info">{t(b.cancelledNote)}</Notice>}
            <div className="row">
              {st === 'preparing' && <Button disabled={short.length > 0} onClick={() => update(order.id, { status: 'ready', packed: true, packedAt: new Date().toISOString(), stockLoc: loc })}>{t(b.pack)}</Button>}
              {st === 'ready' && <Button onClick={() => update(order.id, { status: 'delivered' })}>{t(b.handOver)}</Button>}
              {(st === 'pending' || st === 'preparing') && <Button variant="secondary" onClick={() => update(order.id, { status: 'cancelled' })}>{t(b.cancelOrder)}</Button>}
            </div>
          </div>
          <Card>
            <div className="stack">
              <DataRow label={t(b.placedAt)} value={formatDate(order.placedAt, lang)} />
              <DataRow label={t(b.customerLabel)} value={customerText(order.customer.name, lang)} />
              <DataRow label={t(b.colHandover)} value={t(order.fulfilment === 'pickup' ? b.pickup : b.parcel)} />
              <DataRow label={t(b.takenFrom)} value={t(locationName(loc))} />
              <DataRow label={t(b.paymentLabel)} value={findPayment(order.paymentId) ? t(findPayment(order.paymentId)!.name) : order.paymentId} />
              <DataRow strong label={t(b.totalLabel)} value={formatMoney(order.total, lang)} />
            </div>
          </Card>
        </CardGrid>
      </Col>
    </Grid>
  )
}
