import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Button, Card, Col, DataRow, Grid, QuantityStepper, StepPill } from '../../../ui'
import { cartSubtotal, formatMoney, PROTOTYPE_ID, useCart, useEcommerce } from '../cart'
import { c } from '../checkoutStrings'
import { s } from '../strings'

export function CartPage() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const { productById } = useEcommerce()
  const [cart, setCart] = useCart()
  const base = `/${PROTOTYPE_ID}`

  if (cart.length === 0) {
    return (
      <Grid>
        <Col>
          <Card>
            <h3>{t(s.cartEmpty)}</h3>
            <div><Button to={`${base}${search}`}>{t(s.continueShopping)}</Button></div>
          </Card>
        </Col>
      </Grid>
    )
  }

  const setQty = (productId: string, qty: number) =>
    setCart(cart.map((l) => (l.productId === productId ? { ...l, qty: Math.min(99, Math.max(1, qty || 1)) } : l)))

  return (
    <Grid>
      <Col><StepPill step={1} label={t(c.stepCart)} progress={`${t(c.stepWord)} 1 ${t(c.ofThree)}`} /></Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <div className="stack">
          {cart.map((line) => {
            const product = productById(line.productId)
            if (!product) return null
            return (
              <Card key={line.productId}>
                <DataRow label={<Link to={`${base}/product/${product.id}${search}`} className="card-link"><h3>{t(product.name)}</h3></Link>} value={<strong>{formatMoney(product.price * line.qty, lang)}</strong>} />
                <p className="muted">{formatMoney(product.price, lang)}</p>
                <div className="row">
                  <QuantityStepper
                    value={line.qty}
                    label={t(s.quantity)}
                    decreaseLabel={t(s.decrease)}
                    increaseLabel={t(s.increase)}
                    onChange={(qty) => setQty(line.productId, qty)}
                  />
                  <Button variant="ghost" size="sm" onClick={() => setCart(cart.filter((l) => l !== line))}>{t(s.remove)}</Button>
                </div>
              </Card>
            )
          })}
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Card>
          <h3>{t(s.summary)}</h3>
          <DataRow muted label={t(s.subtotal)} value={formatMoney(cartSubtotal(cart, productById), lang)} />
          <Button to={`${base}/checkout${search}`}>{t(s.checkout)}</Button>
          <Button to={`${base}${search}`} variant="ghost">{t(s.continueShopping)}</Button>
        </Card>
      </Col>
    </Grid>
  )
}
