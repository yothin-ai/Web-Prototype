import { useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import type { Choice } from '../../../datasets/types'
import { useLang } from '../../../i18n'
import { Button, Card, ChoiceCard, ChoiceGroup, Col, DataRow, Field, Grid } from '../../../ui'
import {
  cartSubtotal, formatMoney, PROTOTYPE_ID, useCart, useEcommerce, useOrders, type Order,
} from '../cart'
import { s } from '../strings'

export function Checkout() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const navigate = useNavigate()
  const { paymentMethods, productById, shippingMethods } = useEcommerce()
  const [cart, setCart] = useCart()
  const [orders, setOrders] = useOrders()
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [shippingId, setShippingId] = useState(shippingMethods[0].id)
  const [paymentId, setPaymentId] = useState(paymentMethods[0].id)
  const [touched, setTouched] = useState(false)
  const placed = useRef(false)
  const base = `/${PROTOTYPE_ID}`

  // An empty cart sends the Viewer back, except right after placing the order.
  if (cart.length === 0 && !placed.current) return <Navigate to={`${base}/cart${search}`} replace />

  const subtotal = cartSubtotal(cart, productById)
  const shippingPrice = shippingMethods.find((m) => m.id === shippingId)?.price ?? 0
  const valid = form.name.trim() && form.phone.trim() && form.address.trim()
  const missing = (value: string) => (touched && !value.trim() ? t(s.required) : undefined)

  const placeOrder = () => {
    setTouched(true)
    if (!valid) return
    const order: Order = {
      id: `ORD-${1001 + orders.length}`,
      placedAt: new Date().toISOString(),
      customer: form,
      shippingId,
      paymentId,
      lines: cart.flatMap((l) => {
        const p = productById(l.productId)
        return p ? [{ productId: p.id, name: p.name, price: p.price, qty: l.qty }] : []
      }),
      subtotal,
      shippingPrice,
      total: subtotal + shippingPrice,
    }
    placed.current = true
    setOrders([order, ...orders])
    setCart([])
    navigate(`${base}/done/${order.id}${search}`)
  }

  const choice = (label: string, items: Choice[], selected: string, pick: (id: string) => void) => (
    <ChoiceGroup label={label}>
      {items.map((m) => (
        <ChoiceCard
          key={m.id}
          title={t(m.name)}
          detail={t(m.detail)}
          price={m.price !== undefined ? formatMoney(m.price, lang) : undefined}
          selected={m.id === selected}
          onSelect={() => pick(m.id)}
        />
      ))}
    </ChoiceGroup>
  )

  return (
    <Grid>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <div className="stack">
          <Card>
            <h3>{t(s.contact)}</h3>
            <Field label={t(s.name)} id="co-name" value={form.name} hint={missing(form.name)} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Field label={t(s.phone)} id="co-phone" type="tel" value={form.phone} hint={missing(form.phone)} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Field label={t(s.address)} id="co-address" value={form.address} hint={missing(form.address)} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </Card>
          <Card>
            <h3>{t(s.shippingMethod)}</h3>
            {choice(t(s.shippingMethod), shippingMethods, shippingId, setShippingId)}
          </Card>
          <Card>
            <h3>{t(s.paymentMethod)}</h3>
            {choice(t(s.paymentMethod), paymentMethods, paymentId, setPaymentId)}
          </Card>
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Card>
          <h3>{t(s.summary)}</h3>
          {cart.map((l) => {
            const p = productById(l.productId)
            return p ? (
              <DataRow key={l.productId} label={`${t(p.name)} × ${l.qty}`} value={formatMoney(p.price * l.qty, lang)} />
            ) : null
          })}
          <DataRow muted label={t(s.shipping)} value={formatMoney(shippingPrice, lang)} />
          <DataRow strong label={t(s.total)} value={formatMoney(subtotal + shippingPrice, lang)} />
          <Button onClick={placeOrder}>{t(s.placeOrder)}</Button>
        </Card>
      </Col>
    </Grid>
  )
}
