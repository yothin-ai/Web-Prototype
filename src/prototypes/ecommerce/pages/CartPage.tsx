import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Breadcrumb, Button, Card, CartItem, Carousel, Checkbox, Col, DataRow, Grid, Notice, ProductCard, ProductImage, QuantityStepper, SectionHeader, StepPill, StickyActionBar } from '../../../ui'
import { cartCount, formatMoney, isTicked, PROTOTYPE_ID, skuOf, useAddToCart, useCart, useChosenCart, useEcommerce, useSuggestions } from '../cart'
import { k } from '../cartStrings'
import { c } from '../checkoutStrings'
import { s } from '../strings'
import { useNarrow } from '../useNarrow'

export function CartPage() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const { productById } = useEcommerce()
  const { cart, chosen, stockOf, available } = useChosenCart()
  const [, setCart] = useCart()
  const narrow = useNarrow()
  const add = useAddToCart()
  const suggestions = useSuggestions(5)
  const base = `/${PROTOTYPE_ID}`
  const detail = (id: string) => `${base}/product/${id}${search}`

  const subtotal = chosen.reduce((sum, l) => sum + (productById(l.productId)?.price ?? 0) * l.qty, 0)
  const chosenPieces = cartCount(chosen)
  const buyable = cart.filter(available)
  const allTicked = buyable.length > 0 && chosen.length === buyable.length
  const setQty = (productId: string, qty: number) =>
    setCart(cart.map((l) => (l.productId === productId ? { ...l, qty: Math.min(99, Math.max(1, qty || 1)) } : l)))
  const tick = (productId: string, selected: boolean) => setCart(cart.map((l) => (l.productId === productId ? { ...l, selected } : l)))
  const tickAll = (selected: boolean) => setCart(cart.map((l) => ({ ...l, selected })))

  const suggestionsBlock = suggestions.length > 0 && (
    <div className="storefront-section">
      <SectionHeader title={t(k.mayLike)} action={<Button to={`${base}/products${search}`} size="sm" variant="secondary">{t(s.viewAll)}</Button>} />
      <Carousel label={t(k.mayLikeRow)} count={5} minItem="180px" prevLabel={t(s.scrollPrev)} nextLabel={t(s.scrollNext)}>
        {suggestions.map((p) => (
          <ProductCard key={p.id} to={detail(p.id)} imageLabel={t(p.name)} badges={<Badge>{t(p.brand ?? p.category)}</Badge>} name={t(p.name)} price={formatMoney(p.price, lang)} action={<Button size="sm" onClick={() => add(p.id)}>{t(s.add)}</Button>} />
        ))}
      </Carousel>
    </div>
  )

  if (cart.length === 0) {
    return (
      <Grid>
        <Col>
          <Card>
            <h3>{t(s.cartEmpty)}</h3>
            <div><Button to={`${base}${search}`}>{t(s.continueShopping)}</Button></div>
          </Card>
        </Col>
        <Col>{suggestionsBlock}</Col>
      </Grid>
    )
  }

  const proceed = chosen.length === 0 ? (
    <Button disabled>{t(k.proceed)}</Button>
  ) : (
    <Button to={`${base}/checkout${search}`}>{t(k.proceed)} · {formatMoney(subtotal, lang)} →</Button>
  )

  return (
    <Grid>
      <Col>
        <div className="stack">
          <StepPill step={1} label={t(c.stepCart)} progress={`${t(c.stepWord)} 1 ${t(c.ofThree)}`} />
          <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search}` }, { label: t(c.stepCart) }]} />
          <div className="row">
            <div className="row__grow stack">
              <h1>{t(k.title)}</h1>
              <span className="muted">{cart.length} {t(c.itemsWord)} · {cartCount(cart)} {t(c.piecesWord)} · {t(k.chosenWord)} {chosen.length} {t(c.itemsWord)}</span>
            </div>
            <Button to={`${base}${search}`} variant="secondary" size="sm">{t(k.continue)}</Button>
          </div>
        </div>
      </Col>

      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <div className="stack">
          <Card>
            <div className="row">
              <Checkbox checked={allTicked} disabled={buyable.length === 0} onChange={tickAll} label={t(k.selectAll)} />
              <span className="muted">{t(k.selectedOf)} {chosen.length}/{cart.length} {t(c.itemsWord)}</span>
            </div>
          </Card>
          <h2>{t(k.listTitle)} ({cart.length})</h2>
          {cart.map((line) => {
            const p = productById(line.productId)
            if (!p) return null
            const out = !available(line)
            return (
              <CartItem
                key={line.productId}
                checked={isTicked(line)}
                onCheck={(v) => tick(line.productId, v)}
                checkLabel={t(k.selectItem)}
                disabled={out}
                thumb={<ProductImage label={t(p.name)} />}
                skuLabel={t(k.sku)}
                sku={skuOf(p)}
                name={<Link to={detail(p.id)} className="card-link"><strong>{t(p.name)}</strong></Link>}
                status={out ? t(k.soldOut) : t(k.ready)}
                statusTone={out ? 'danger' : 'success'}
                price={formatMoney(p.price * line.qty, lang)}
                quantity={
                  <QuantityStepper value={line.qty} max={Math.max(1, Math.min(99, stockOf(p.id)))} label={t(s.quantity)} decreaseLabel={t(s.decrease)} increaseLabel={t(s.increase)} onChange={(qty) => setQty(line.productId, qty)} />
                }
                removeLabel={t(s.remove)}
                onRemove={() => setCart(cart.filter((l) => l !== line))}
              />
            )
          })}
        </div>
      </Col>

      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <div className="checkout-aside">
          <Card>
            <div className="cart-summary">
              <h3>{t(k.summaryTitle)}</h3>
              <DataRow muted label={`${t(k.priceOf)} (${chosen.length} ${t(c.itemsWord)} · ${chosenPieces} ${t(c.piecesWord)})`} value={formatMoney(subtotal, lang)} />
              <DataRow muted label={t(k.shipping)} value={t(k.shipLater)} />
              <DataRow strong label={<span className="stack"><span>{t(k.grand)}</span><span className="muted">{t(k.vat)}</span></span>} value={<span className="checkout-total">{formatMoney(subtotal, lang)}</span>} />
              {chosen.length === 0 && <Notice tone="error">{t(k.noneChosen)}</Notice>}
              {proceed}
              <Button to={`${base}${search}`} variant="secondary">{t(k.continue)}</Button>
              <span className="muted checkout-legal">{t(k.secure)}</span>
            </div>
          </Card>
        </div>
      </Col>

      <Col>{suggestionsBlock}</Col>

      <StickyActionBar
        thumb={false}
        visible={narrow}
        name={`${chosen.length} ${t(c.itemsWord)}`}
        price={formatMoney(subtotal, lang)}
        actions={chosen.length === 0 ? <Button size="sm" disabled>{t(k.proceed)}</Button> : <Button size="sm" to={`${base}/checkout${search}`}>{t(k.proceed)}</Button>}
      />
    </Grid>
  )
}
