import { useSearchParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, Col, DataRow, Grid, ProductImage } from '../../../ui'
import { formatMoney, useCart, useEcommerce } from '../cart'
import { s } from '../strings'

// The product grid: every product, or the ones matching the `q` search term.
export function Browse() {
  const { t, lang } = useLang()
  const [params] = useSearchParams()
  const { products } = useEcommerce()
  const [cart, setCart] = useCart()
  const q = (params.get('q') ?? '').trim().toLowerCase()

  const matches = (text: string) => text.toLowerCase().includes(q)
  const shown = q
    ? products.filter((p) => matches(t(p.name)) || matches(t(p.category)) || (p.brand && matches(t(p.brand))))
    : products

  const add = (productId: string) => {
    const existing = cart.find((l) => l.productId === productId)
    setCart(existing ? cart.map((l) => (l === existing ? { ...l, qty: l.qty + 1 } : l)) : [...cart, { productId, qty: 1 }])
  }

  return (
    <div>
      <Grid>
        <Col>
          <h1>{q ? `${t(s.resultsTitle)}: ${params.get('q')}` : t(s.allProducts)}</h1>
        </Col>
        {shown.length === 0 && (
          <Col><Card><p>{t(s.resultsEmpty)}</p></Card></Col>
        )}
        {shown.map((p) => {
          const qty = cart.find((l) => l.productId === p.id)?.qty ?? 0
          return (
            <Col key={p.id} span={{ base: 4, sm: 4, md: 4 }}>
              <Card>
                <ProductImage label={t(p.name)} />
                <Badge>{t(p.category)}</Badge>
                <h3>{t(p.name)}</h3>
                <p className="muted">{t(p.description)}</p>
                <DataRow
                  label={<strong>{formatMoney(p.price, lang)}</strong>}
                  value={
                    <span className="row">
                      {qty > 0 && <span className="muted">{t(s.inCart)}: {qty}</span>}
                      <Button size="sm" onClick={() => add(p.id)}>{t(s.add)}</Button>
                    </span>
                  }
                />
              </Card>
            </Col>
          )
        })}
      </Grid>
    </div>
  )
}
