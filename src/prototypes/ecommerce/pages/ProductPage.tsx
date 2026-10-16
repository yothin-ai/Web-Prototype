import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import type { Localized } from '../../../i18n'
import { useLang } from '../../../i18n'
import {
  Badge, Breadcrumb, Button, Card, Carousel, DataRow, IconCircle, ProductCard, ProductGallery, QuantityStepper, RatingStars, StickyActionBar, Tabs,
} from '../../../ui'
import { formatDate, formatMoney, PROTOTYPE_ID, skuOf, useAddToCart, useEcommerce } from '../cart'
import { averageRating, useReviews } from '../reviews'
import { rv } from '../reviewStrings'
import { s } from '../strings'
import { withQuery } from '../Storefront'
import { useNarrow } from '../useNarrow'

const FRAMES = 5
const DEFAULT_UNIT: Localized = { th: 'ชิ้น', en: 'piece' }

function List({ items }: { items: Localized[] }) {
  const { t } = useLang()
  return <ol className="product-list">{items.map((item, i) => <li key={i}>{t(item)}</li>)}</ol>
}

export function ProductPage() {
  const { t, lang } = useLang()
  const { productId = '' } = useParams()
  const { search } = useLocation()
  const navigate = useNavigate()
  const { dataset } = useDataset()
  const { products, productById } = useEcommerce()
  const { store, home } = dataset.ecommerce
  const add = useAddToCart()
  const narrow = useNarrow()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [pastBuy, setPastBuy] = useState(false)
  const buyRef = useRef<HTMLDivElement>(null)
  const base = `/${PROTOTYPE_ID}`
  const { forProduct, pending, mine } = useReviews()
  const reviews = forProduct(productId)
  const average = averageRating(reviews)
  const [reviewHint, setReviewHint] = useState('')
  // A review is written from the account page, and only for a product the shopper has received.
  const writeReview = () => {
    const ready = pending.find((x) => x.line.productId === productId)
    if (ready) navigate(`${base}/account/reviews${withQuery(search, 'write', ready.key)}`)
    else setReviewHint(t(mine.some((r) => r.productId === productId) ? rv.alreadyReviewed : rv.onlyAfterReceive))
  }
  const p = productById(productId)

  useEffect(() => {
    setQty(1)
    setAdded(false)
    window.scrollTo(0, 0)
  }, [productId])

  // The bar appears once the buy box has scrolled off the top of the screen.
  useEffect(() => {
    const check = () => {
      const el = buyRef.current
      setPastBuy(!!el && el.getBoundingClientRect().bottom < 0)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [productId, p])

  if (!p) {
    return (
      <div className="storefront-section">
        <Card>
          <h3>{t(s.productNotFound)}</h3>
          <div><Button to={`${base}${search}`}>{t(s.home)}</Button></div>
        </Card>
      </div>
    )
  }

  const d = p.detail
  const unit = d?.unit ?? DEFAULT_UNIT
  const sku = d?.sku ?? skuOf(p)
  const stock = p.stock ?? store.stockDefault
  const total = p.price * qty
  const points = Math.floor(total / home.app.earnBaht)
  const remaining = Math.max(0, store.installmentMin - total)
  const branch = t(home.utility[1] ?? home.utility[0])
  const goSearch = (label: string) => `${base}/products${withQuery(search, 'q', label)}`
  const detailPath = (id: string) => `${base}/product/${id}${search}`

  const crumbs = [
    { label: t(s.home), to: `${base}${search}` },
    ...(d?.path ?? [p.category]).map((l) => ({ label: t(l), to: goSearch(t(l)) })),
    { label: t(p.name) },
  ]

  // Explicit picks first, then the same category, then anything else so the row is never nearly empty.
  const relatedIds = [...(d?.related ?? []), ...products.filter((x) => x.category.th === p.category.th).map((x) => x.id), ...products.map((x) => x.id)]
  const related = [...new Set(relatedIds)].filter((id) => id !== p.id).map((id) => productById(id)).filter((x) => !!x).slice(0, 10)

  const specs = d?.specs
    ? d.specs.map((row) => ({ label: t(row.label), value: t(row.value) }))
    : [
        ...(p.brand ? [{ label: t(s.specBrand), value: t(p.brand) }] : []),
        { label: t(s.specCategory), value: t(p.category) },
        { label: t(s.specUnit), value: t(unit) },
        { label: t(s.specSku), value: sku },
      ]

  const addToCart = () => {
    add(p.id, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2500)
  }
  const buyNow = () => {
    add(p.id, qty)
    navigate(`${base}/checkout${search}`)
  }

  const detailsTab = (
    <div className="stack">
      <h2>{t(s.about)}</h2>
      {d ? (
        <>
          <div className="product-section"><h3>{t(s.highlights)}</h3><List items={d.highlights} /></div>
          <div className="product-section"><h3>{t(s.general)}</h3><List items={d.general} /></div>
          <div className="product-section"><h3>{t(s.detailsTitle)}</h3><List items={d.details} /></div>
          <div className="product-section"><h3>{t(s.installTitle2)}</h3><p>{t(d.install)}</p></div>
          <div className="product-section"><h3>{t(s.warrantyTitle)}</h3><p>{t(d.warranty)}</p></div>
          <div className="product-section"><h3>{t(s.cautionTitle)}</h3><p>{t(d.caution)}</p></div>
        </>
      ) : (
        <p>{t(p.description)}</p>
      )}
    </div>
  )

  const actions = (
    <>
      <Button variant="secondary" size="sm" icon="cart" onClick={addToCart}>{t(s.add)}</Button>
      <Button size="sm" onClick={buyNow}>{t(s.buyNow)}</Button>
    </>
  )

  return (
    <div className={`storefront-section product-page${narrow || pastBuy ? ' product-page--bar' : ''}`}>
      <div className="stack">
        <Breadcrumb label={t(s.breadcrumbLabel)} items={crumbs} />

        <div className="product-layout">
          <ProductGallery
            name={t(p.name)}
            frameLabels={Array.from({ length: FRAMES }, (_, i) => `${t(s.galleryLabel)} ${i + 1}`)}
            prevLabel={t(s.galleryPrev)}
            nextLabel={t(s.galleryNext)}
          />

          <div className="stack">
            <div className="row">
              {p.brand && <strong>{t(p.brand)}</strong>}
              <Badge tone="success">{t(s.authentic)}</Badge>
              <span className="muted">{t(s.skuLabel)}: {sku}</span>
            </div>
            <h1>{t(p.name)}</h1>
            <div className="row">
              {reviews.length > 0 ? (
                <><RatingStars value={average} label={t(rv.ratingLabel)} /><span className="muted">{average.toFixed(1)} · {reviews.length} {t(rv.reviewsWord)}</span></>
              ) : (
                <span className="muted">{t(s.noReviews)}</span>
              )}
              <Button variant="ghost" size="sm" onClick={writeReview}>{reviews.length > 0 ? t(rv.write) : t(s.writeFirstReview)}</Button>
            </div>
            {reviewHint && <span className="muted" role="status">{reviewHint}</span>}

            <Card>
              <div className="row">
                <strong className="product-price">{formatMoney(p.price, lang)}</strong>
                <span className="muted">{t(s.perUnitSep)} {t(unit)}</span>
                {p.originalPrice !== undefined && (
                  <>
                    <s className="muted">{formatMoney(p.originalPrice, lang)}</s>
                    <Badge tone="warning">-{Math.round((1 - p.price / p.originalPrice) * 100)}%</Badge>
                  </>
                )}
              </div>
              <div className="product-note">
                <strong>{t(s.installTitle)} {formatMoney(store.installmentMin, lang)}</strong>
                <span className="muted">
                  {remaining > 0
                    ? `${t(s.installMore)} ${formatMoney(remaining, lang)} ${t(s.installMoreTail)} ${store.installmentMonths} ${t(s.installMonths)}`
                    : `${t(s.installReached)} ${store.installmentMonths} ${t(s.installMonths)}`}
                </span>
                <span className="row">
                  <span className="muted row__grow">{t(s.installMinLabel)}: {formatMoney(store.installmentMin, lang)}</span>
                  <Button variant="ghost" size="sm">{t(s.installTerms)}</Button>
                </span>
              </div>
            </Card>

            <div className="row">
              <span className="muted">{t(s.share)}:</span>
              {['Facebook', 'Line', 'X', 'Link'].map((name) => (
                <span key={name} title={name}><IconCircle size="md" tone="muted" /></span>
              ))}
            </div>

            <Card>
              <DataRow label={<strong>{`${t(s.pointsBefore)} ${points} ${t(s.pointsAfter)}`}</strong>} />
              <span className="muted">{t(s.pointsRule)} {home.app.earnBaht} {t(s.pointsRuleTail)}</span>
            </Card>

            <Card>
              <DataRow muted label={t(s.deliveryLabel)} value={<span className="row"><strong>{t(store.delivery)}</strong><Badge tone="success">{t(s.readyToShip)}</Badge></span>} />
              <DataRow
                muted
                label={`${t(s.stockAt)} ${branch}`}
                value={<span><strong>{t(s.inStockBefore)} {stock} {t(unit)}</strong> · <span className="muted">{t(s.pickupWithin)} {store.pickupMinutes} {t(s.minutes)}</span></span>}
              />
              <DataRow muted label={t(s.shelfLabel)} value={t(store.shelf)} />
              <div><Button variant="ghost" size="sm">{t(s.changeBranch)}</Button></div>
            </Card>

            <div ref={buyRef} className="stack">
              <div className="row">
                <QuantityStepper
                  value={qty}
                  onChange={setQty}
                  min={1}
                  max={Math.max(1, Math.min(99, stock))}
                  label={t(s.quantity)}
                  decreaseLabel={t(s.decrease)}
                  increaseLabel={t(s.increase)}
                />
                <span className="muted">{t(s.unitLabel)}: {t(unit)}</span>
              </div>
              <div className="row">
                <Button variant="secondary" icon="cart" onClick={addToCart}>{t(s.add)}</Button>
                <Button onClick={buyNow}>{t(s.buyNow)}</Button>
                <span className="muted" aria-live="polite">{added ? t(s.addedToCart) : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {d?.standard && (
          <Card>
            <DataRow label={<strong>{t(s.standardTitle)}</strong>} value={<Badge>{t(d.standard)}</Badge>} />
          </Card>
        )}

        <Tabs
          label={t(s.tabsLabel)}
          tabs={[
            { id: 'details', label: t(s.tabDetails), content: detailsTab },
            {
              id: 'specs',
              label: t(s.tabSpecs),
              content: (
                <Card>
                  <h3>{t(s.specsTitle)}</h3>
                  {specs.map((row, i) => <DataRow key={`${row.label}-${i}`} muted label={row.label} value={row.value} />)}
                </Card>
              ),
            },
            {
              id: 'reviews',
              label: `${t(s.tabReviews)} ${reviews.length}`,
              content: (
                <Card>
                  {reviews.length === 0 ? <p>{t(s.reviewsEmpty)}</p> : (
                    <>
                      <div className="row"><strong>{t(rv.productReviews)}</strong><RatingStars value={average} label={t(rv.ratingLabel)} /><span className="muted">{average.toFixed(1)} {t(rv.outOf)}</span></div>
                      {reviews.map((r) => (
                        <div key={r.id} className="stack">
                          <div className="row"><strong>{r.mine ? t(rv.mine) : r.author}</strong><RatingStars value={r.rating} label={t(rv.ratingLabel)} /><Badge tone="success">{t(rv.verified)}</Badge></div>
                          <p>{typeof r.text === 'string' ? r.text : t(r.text)}</p>
                          <span className="muted">{formatDate(r.at, lang)}</span>
                        </div>
                      ))}
                    </>
                  )}
                  <div><Button variant="secondary" size="sm" onClick={writeReview}>{reviews.length > 0 ? t(rv.write) : t(s.writeFirstReview)}</Button></div>
                </Card>
              ),
            },
          ]}
        />

        {related.length > 0 && (
          <div className="stack">
            <h2>{t(s.relatedTitle)}</h2>
            <Carousel label={t(s.relatedRow)} count={5} minItem="176px" prevLabel={t(s.scrollPrev)} nextLabel={t(s.scrollNext)}>
              {related.map((r) => (
                <ProductCard
                  key={r!.id}
                  to={detailPath(r!.id)}
                  imageLabel={t(r!.name)}
                  badges={<Badge>{t(r!.brand ?? r!.category)}</Badge>}
                  name={t(r!.name)}
                  price={formatMoney(r!.price, lang)}
                  action={<Button size="sm" icon="cart" onClick={() => add(r!.id)}>{t(s.add)}</Button>}
                />
              ))}
            </Carousel>
          </div>
        )}
      </div>

      <StickyActionBar visible={narrow || pastBuy} name={t(p.name)} price={formatMoney(total, lang)} actions={actions} />
    </div>
  )
}
