import { useSearchParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, DataRow, ProductImage } from '../../../ui'
import { formatMoney, useAddToCart, useCart, useEcommerce } from '../cart'
import { s } from '../strings'

// The product grid: every product, or the ones matching the `q` search term.
export function Browse() {
  const { t, lang } = useLang()
  const [params] = useSearchParams()
  const { products } = useEcommerce()
  const [cart] = useCart()
  const add = useAddToCart()
  const q = (params.get('q') ?? '').trim().toLowerCase()

  const matches = (text: string) => text.toLowerCase().includes(q)
  const shown = q
    ? products.filter((p) => matches(t(p.name)) || matches(t(p.category)) || (p.brand && matches(t(p.brand))))
    : products

  return (
    <div className="storefront-section">
      <div className="stack">
        <h1>{q ? `${t(s.resultsTitle)}: ${params.get('q')}` : t(s.allProducts)}</h1>
        {shown.length === 0 && <Card><p>{t(s.resultsEmpty)}</p></Card>}
        <div className="product-grid">
          {shown.map((p) => {
            const qty = cart.find((l) => l.productId === p.id)?.qty ?? 0
            return (
              <Card key={p.id}>
                <ProductImage label={t(p.name)} />
                {p.brand ? <Badge>{t(p.brand)}</Badge> : <Badge>{t(p.category)}</Badge>}
                <h3 className="article-card__title">{t(p.name)}</h3>
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
            )
          })}
        </div>
      </div>
    </div>
  )
}
