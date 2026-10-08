import { useLang } from '../../../i18n'
import { Badge, Button, Card, Col, Grid, ProductImage } from '../../../ui'
import { formatMoney, useCart, useEcommerce } from '../cart'
import { s } from '../strings'

export function Browse() {
  const { t, lang } = useLang()
  const { products } = useEcommerce()
  const [cart, setCart] = useCart()

  const add = (productId: string) => {
    const existing = cart.find((l) => l.productId === productId)
    setCart(existing ? cart.map((l) => (l === existing ? { ...l, qty: l.qty + 1 } : l)) : [...cart, { productId, qty: 1 }])
  }

  return (
    <Grid>
      {products.map((p) => {
        const qty = cart.find((l) => l.productId === p.id)?.qty ?? 0
        return (
          <Col key={p.id} span={{ base: 4, sm: 4, md: 4 }}>
            <Card>
              <ProductImage label={t(p.name)} />
              <Badge>{t(p.category)}</Badge>
              <h3>{t(p.name)}</h3>
              <p className="muted">{t(p.description)}</p>
              <div className="row">
                <strong className="row__grow">{formatMoney(p.price, lang)}</strong>
                {qty > 0 && <span className="muted">{t(s.inCart)}: {qty}</span>}
                <Button size="sm" onClick={() => add(p.id)}>{t(s.add)}</Button>
              </div>
            </Card>
          </Col>
        )
      })}
    </Grid>
  )
}
