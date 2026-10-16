import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { DataRow } from '../../../ui'
import { formatMoney, PROTOTYPE_ID, useEcommerce, type Order } from '../cart'
import { findPayment } from '../checkout'
import { c } from '../checkoutStrings'
import { s } from '../strings'
import { wl } from '../walletStrings'

export function OrderSummary({ order }: { order: Order }) {
  const { t, lang } = useLang()
  const { paymentMethods, shippingMethods } = useEcommerce()
  const { search } = useLocation()
  const shipping = shippingMethods.find((m) => m.id === order.shippingId)
  const payment = findPayment(order.paymentId) ?? paymentMethods.find((m) => m.id === order.paymentId)
  const shippingName = order.shippingId === 'pickup' ? c.pickupAtBranch : shipping?.name
  return (
    <>
      <p className="muted">{t(s.items)}</p>
      {order.lines.map((l, i) => (
        <DataRow key={i} label={l.productId ? <Link to={`/${PROTOTYPE_ID}/product/${l.productId}${search}`} className="card-link">{`${t(l.name)} × ${l.qty}`}</Link> : `${t(l.name)} × ${l.qty}`} value={formatMoney(l.price * l.qty, lang)} />
      ))}
      <DataRow muted label={`${t(s.shipping)}${shippingName ? ` · ${t(shippingName)}` : ''}`} value={formatMoney(order.shippingPrice, lang)} />
      {!!order.discount && <DataRow muted label={`${t(c.discountLabel)}${order.couponTitle ? ` · ${t(order.couponTitle)}` : ''}`} value={`-${formatMoney(order.discount, lang)}`} />}
      {!!order.walletUsed && <DataRow muted label={t(wl.summaryLine)} value={`-${formatMoney(order.walletUsed, lang)}`} />}
      {payment && <p className="muted">{t(s.paymentMethod)}: {t(payment.name)}</p>}
      {order.installment && <p className="muted">{t(c.installLine)} · {order.installment.months} {t(c.monthsWord)} · {formatMoney(order.installment.monthly, lang)} {t(c.perMonth)}</p>}
      <DataRow strong label={t(s.total)} value={formatMoney(order.total, lang)} />
    </>
  )
}
