import { useLocation, useSearchParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Button, Card, CategoryPills, OrderCard, ProductImage } from '../../../ui'
import { formatDate, formatMoney, PROTOTYPE_ID, type OrderStatus } from '../cart'
import { c } from '../checkoutStrings'
import { o } from '../orderStrings'
import { statusOf, statusOrder, useOrderBook } from '../orders'
import { s } from '../strings'
import { withQuery } from '../Storefront'
import { AccountShell } from './AccountShell'
import { useProductPicture } from '../productPicture'

export const statusLabel = (status: OrderStatus) => ({ pending: o.pending, preparing: o.preparing, ready: o.ready, delivered: o.delivered, cancelled: o.cancelled })[status]
export const statusTone = (status: OrderStatus) => (status === 'pending' || status === 'preparing' ? 'warning' : status === 'cancelled' ? undefined : 'success') as 'warning' | 'success' | undefined

const MAX_PICTURES = 5

// Every order as a card, with chips to narrow the list to one status.
export function OrdersPage() {
  const { t, lang } = useLang()
  const picture = useProductPicture()
  const { search } = useLocation()
  const [params] = useSearchParams()
  const [orders] = useOrderBook()
  const base = `/${PROTOTYPE_ID}`
  const chosen = (params.get('status') ?? '') as OrderStatus | ''
  const shown = orders.filter((x) => !chosen || statusOf(x) === chosen)
  const chip = (label: string, value: string) => ({ label, to: `${base}/orders${withQuery(search, 'status', value)}`, active: chosen === value })

  return (
    <AccountShell active="orders">
      <div className="stack">
        <span className="status-header__kicker">{t(o.kicker)}</span>
        <h1>{t(o.title)}</h1>
        <span className="muted">{t(o.subtitle)}</span>
      </div>
      <CategoryPills
        label={t(o.filtersLabel)}
        items={[chip(t(o.all), ''), ...statusOrder.map((st) => chip(st === 'pending' ? t(o.filterPending) : t(statusLabel(st)), st))]}
      />
      {orders.length === 0 && (
        <Card>
          <h3>{t(s.ordersEmpty)}</h3>
          <div><Button to={`${base}${search}`}>{t(s.continueShopping)}</Button></div>
        </Card>
      )}
      {orders.length > 0 && shown.length === 0 && <Card><p>{t(o.emptyFilter)}</p></Card>}
      {shown.map((order) => {
        const st = statusOf(order)
        const pieces = order.lines.reduce((n, l) => n + l.qty, 0)
        const extra = order.lines.length - MAX_PICTURES
        return (
          <OrderCard
            key={order.id}
            id={order.id}
            status={t(statusLabel(st))}
            statusTone={statusTone(st)}
            sampleLabel={order.sample ? t(o.sample) : undefined}
            date={formatDate(order.placedAt, lang)}
            size={`${pieces} ${t(c.piecesWord)} · ${order.lines.length} ${t(c.itemsWord)}`}
            totalLabel={t(o.netTotal)}
            total={formatMoney(order.total, lang)}
            thumbs={
              <>
                {order.lines.slice(0, MAX_PICTURES).map((l, i) => <ProductImage key={i} label={t(l.name)} src={picture} square />)}
                {extra > 0 && <span className="muted">+{extra} {t(o.more)}</span>}
              </>
            }
            actions={
              <>
                {st === 'pending' && <Button size="sm" icon="card" to={`${base}/pay/${order.id}${search}`}>{t(o.payAgain)}</Button>}
                <Button size="sm" variant="secondary" icon="view" to={`${base}/orders/${order.id}${search}`}>{t(o.viewDetail)}</Button>
              </>
            }
          />
        )
      })}
      {shown.length > 0 && <p className="muted" style={{ textAlign: 'center' }}>{t(o.allLoaded)}</p>}
    </AccountShell>
  )
}
