import { useLang } from '../../../i18n'
import { DataRow } from '../../../ui'
import { formatMoney, useEcommerce, type Order } from '../cart'
import { s } from '../strings'

export function OrderSummary({ order }: { order: Order }) {
  const { t, lang } = useLang()
  const { paymentMethods, shippingMethods } = useEcommerce()
  const shipping = shippingMethods.find((m) => m.id === order.shippingId)
  const payment = paymentMethods.find((m) => m.id === order.paymentId)
  return (
    <>
      <p className="muted">{t(s.items)}</p>
      {order.lines.map((l, i) => (
        <DataRow key={i} label={`${t(l.name)} × ${l.qty}`} value={formatMoney(l.price * l.qty, lang)} />
      ))}
      <DataRow muted label={`${t(s.shipping)}${shipping ? ` · ${t(shipping.name)}` : ''}`} value={formatMoney(order.shippingPrice, lang)} />
      {payment && <p className="muted">{t(s.paymentMethod)}: {t(payment.name)}</p>}
      <DataRow strong label={t(s.total)} value={formatMoney(order.total, lang)} />
    </>
  )
}
