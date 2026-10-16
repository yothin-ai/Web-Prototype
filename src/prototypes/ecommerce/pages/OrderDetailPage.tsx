import { Link, useLocation, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, DataRow, Icon, OrderTimeline, StatusHeader, type IconName, type TimelineStep } from '../../../ui'
import { formatDate, formatMoney, PROTOTYPE_ID, useEcommerce } from '../cart'
import { findPayment } from '../checkout'
import { c } from '../checkoutStrings'
import { o } from '../orderStrings'
import { customerText, paysOnDelivery, statusOf, stepsDone, useOrderBook, type StepKey } from '../orders'
import { reviewKey, useReviews } from '../reviews'
import { rv } from '../reviewStrings'
import { s } from '../strings'
import { wl } from '../walletStrings'
import { withQuery } from '../Storefront'
import { AccountShell } from './AccountShell'

const headerIcon = { pending: 'clock', preparing: 'package', ready: 'truck', delivered: 'check', cancelled: 'close' } as const
const copy = {
  pending: [o.kickerPending, o.titlePending, o.textPending],
  preparing: [o.kickerPreparing, o.titlePreparing, o.textPreparing],
  ready: [o.kickerReady, o.titleReady, o.textReady],
  delivered: [o.kickerDelivered, o.titleDelivered, o.textDelivered],
  cancelled: [o.kickerCancelled, o.titleCancelled, o.textCancelled],
} as const

// One order: where it stands, its steps, what was in it and what it cost, and where it goes.
export function OrderDetailPage() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const { orderId } = useParams()
  const { shippingMethods } = useEcommerce()
  const [orders] = useOrderBook()
  const { pending } = useReviews()
  const pendingKeys = new Set(pending.map((x) => x.key))
  const order = orders.find((x) => x.id === orderId)
  const base = `/${PROTOTYPE_ID}`

  if (!order) {
    return (
      <AccountShell active="orders">
        <Card>
          <h3>{t(o.notFound)}</h3>
          <div><Button to={`${base}/orders${search}`}>{t(o.allOrders)}</Button></div>
        </Card>
      </AccountShell>
    )
  }

  const st = statusOf(order)
  const pickup = order.fulfilment === 'pickup'
  const onDelivery = paysOnDelivery(order)
  const money = (n: number) => formatMoney(n, lang)
  const shipping = shippingMethods.find((m) => m.id === order.shippingId)
  const payment = findPayment(order.paymentId)
  const done = stepsDone(order)
  const labels: Record<StepKey, string> = {
    placed: t(o.stepPlaced),
    paid: onDelivery ? t(o.stepPaidOnDelivery) : `${t(o.stepPaid)} (${money(order.total)})`,
    preparing: t(o.stepPreparing),
    ready: pickup ? t(o.stepCollect) : t(o.stepShipping),
    delivered: t(o.stepDelivered),
  }
  const icons: Record<StepKey, IconName> = { placed: 'cart', paid: 'card', preparing: 'package', ready: pickup ? 'store' : 'truck', delivered: 'check' }
  const keys = Object.keys(labels) as StepKey[]
  // Paying on receipt is not a step to wait for, so it is never the current one.
  const firstTodo = keys.find((k) => !done[k] && !(onDelivery && k === 'paid'))
  const steps: TimelineStep[] = keys.map((k) => ({ label: labels[k], icon: icons[k], state: done[k] ? 'done' : st !== 'cancelled' && k === firstTodo ? 'current' : 'todo' }))
  if (st === 'cancelled') steps.push({ label: t(o.stepCancelled), icon: 'close', state: 'cancelled' })
  const [kicker, title, text] = copy[st]
  const pieces = order.lines.reduce((n, l) => n + l.qty, 0)
  const payState = st === 'cancelled' ? o.cancelledState : st === 'pending' ? o.unpaidState : onDelivery && st !== 'delivered' ? o.onDeliveryState : o.paidState

  return (
    <AccountShell active="orders">
      <StatusHeader
        icon={headerIcon[st]}
        kicker={t(kicker)}
        title={t(title)}
        text={t(text)}
        orderLabel={t(o.orderNo)}
        orderId={order.id}
        date={formatDate(order.placedAt, lang)}
        tone={st === 'delivered' ? 'done' : st === 'cancelled' ? 'danger' : 'progress'}
      />
      {order.sample && <Badge>{t(o.sample)}</Badge>}
      {st === 'pending' && <div><Button icon="card" to={`${base}/pay/${order.id}${search}`}>{t(o.payAgain)}</Button></div>}
      <div className="account-split">
        <div className="stack">
          <Card>
            <h3>{t(o.stepsTitle)}</h3>
            <OrderTimeline label={t(o.stepsTitle)} steps={steps} />
          </Card>
          <Card>
            <h3>{t(o.itemsTitle)} · {order.id}</h3>
            <span className="muted">{t(o.total)} {pieces} {t(c.piecesWord)} · {order.lines.length} {t(c.itemsWord)}</span>
            <DataRow muted label={t(o.orderDate)} value={formatDate(order.placedAt, lang)} />
            <DataRow muted label={t(o.delivery)} value={pickup ? t(c.pickupAtBranch) : shipping ? t(shipping.name) : '-'} />
            {order.lines.map((l, i) => (
              <DataRow
                key={i}
                label={<span className="stack">{l.productId ? <Link to={`${base}/product/${l.productId}${search}`} className="card-link"><strong>{t(l.name)}</strong></Link> : <strong>{t(l.name)}</strong>}<span className="muted">{t(o.qty)}: {l.qty}</span>{l.productId && pendingKeys.has(reviewKey(order.id, l.productId)) && <Link to={`${base}/account/reviews${withQuery(search, 'write', reviewKey(order.id, l.productId))}`}>{t(rv.write)}</Link>}</span>}
                value={money(l.price * l.qty)}
              />
            ))}
            <DataRow muted label={t(o.itemsTotal)} value={money(order.subtotal)} />
            <DataRow muted label={t(o.discount)} value={`−${money(order.discount ?? 0)}`} />
            {!!order.walletUsed && <DataRow muted label={t(wl.summaryLine)} value={`−${money(order.walletUsed)}`} />}
            <DataRow muted label={t(o.deliveryFee)} value={order.shippingPrice === 0 ? t(s.free) : money(order.shippingPrice)} />
            <DataRow strong label={<span className="stack"><span>{t(o.netTotal)}</span><span className="muted">{t(o.vat)}</span></span>} value={<span className="checkout-total">{money(order.total)}</span>} />
            <DataRow muted label={t(o.paymentTitle)} value={<span className="row">{payment ? t(payment.name) : order.paymentId}<Badge tone={st === 'pending' ? 'warning' : st === 'cancelled' ? undefined : 'success'}>{t(payState)}</Badge></span>} />
          </Card>
          <Card>
            <h3>{t(o.taxTitle)}</h3>
            <strong>{order.etax ? t(o.taxRequested) : t(o.taxNone)}</strong>
            <span className="muted">{t(o.taxNote)}</span>
          </Card>
        </div>
        <div className="stack">
          <Card>
            <h3>{t(o.actionsTitle)}</h3>
            <DataRow label={<Link to={`${base}/orders${search}`} className="card-link"><strong>{t(o.allOrders)}</strong></Link>} value={<Icon name="right" size="sm" />} />
            <span className="muted">{t(o.allOrdersSub)}</span>
            <DataRow label={<strong>{t(o.taxTitle)}</strong>} value={<Badge>{order.etax ? t(o.taxSubRequested) : t(o.taxSubNone)}</Badge>} />
          </Card>
          <Card>
            <h3>{pickup ? t(o.pickupTitle) : t(o.addressTitle)}</h3>
            <span>{customerText(order.customer.name, lang)}</span>
            <span className="muted">{customerText(order.customer.address, lang)}</span>
            {pickup && order.pickupMode && <span className="muted">{t(order.pickupMode === 'locker' ? c.locker : c.counter)}</span>}
            <span className="muted">{order.customer.phone}</span>
          </Card>
          <div className="order-help">
            <span className="status-header__kicker">{t(o.helpKicker)}</span>
            <h3>{t(o.helpTitle)}</h3>
            <span className="muted">{t(o.helpText)}</span>
            <div><Button href="tel:0000000000" icon="phone" variant="secondary">{t(o.call)}</Button></div>
          </div>
          <Link to={`${base}/orders${search}`}>{t(o.otherOrders)} →</Link>
          <span className="muted row"><Icon name="lock" size="sm" />{t(o.secure)} · <Icon name="shield" size="sm" />{t(o.refund)}</span>
        </div>
      </div>
    </AccountShell>
  )
}
