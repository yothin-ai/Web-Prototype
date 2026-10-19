import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Button, Card, Modal, Notice, ProductImage, RatingStars, Textarea } from '../../../ui'
import { formatDate, PROTOTYPE_ID } from '../cart'
import { useEcommerce } from '../cart'
import { useReviews } from '../reviews'
import { rv } from '../reviewStrings'
import { withQuery } from '../Storefront'
import { AccountShell } from './AccountShell'
import { useProductPicture } from '../productPicture'

type Tab = 'pending' | 'done'

// The shopper's reviews: products of delivered orders waiting for one, and the reviews already written.
export function ReviewsPage() {
  const { t, lang } = useLang()
  const picture = useProductPicture()
  const { search, pathname } = useLocation()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { productById } = useEcommerce()
  const { mine, pending, add } = useReviews()
  const base = `/${PROTOTYPE_ID}`
  const [tab, setTab] = useState<Tab>('pending')
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const [tried, setTried] = useState(false)
  const [thanks, setThanks] = useState(false)

  // ?write=<order>:<product> opens the form for that product.
  const writeKey = params.get('write')
  const target = pending.find((x) => x.key === writeKey)
  useEffect(() => { setRating(0); setText(''); setTried(false) }, [writeKey])
  const closeForm = () => navigate(`${pathname}${withQuery(search, 'write', '')}`, { replace: true })

  const submit = () => {
    setTried(true)
    if (!target || rating < 1 || !text.trim()) return
    add({ productId: target.line.productId!, orderId: target.order.id, rating, text: text.trim() })
    closeForm()
    setTab('done')
    setThanks(true)
  }

  const tabs: { id: Tab; label: string; n: number }[] = [
    { id: 'pending', label: t(rv.tabPending), n: pending.length },
    { id: 'done', label: t(rv.tabDone), n: mine.length },
  ]

  return (
    <AccountShell active="reviews">
      <div className="stack">
        <h1>{t(rv.title)}</h1>
        <span className="muted">{t(rv.sub)}</span>
        <div className="coupon-tabs" role="group" aria-label={t(rv.title)}>
          {tabs.map((x) => (
            <Button key={x.id} size="sm" variant={tab === x.id ? 'primary' : 'secondary'} aria-pressed={tab === x.id} onClick={() => { setTab(x.id); setThanks(false) }}>{x.label} ({x.n})</Button>
          ))}
        </div>
        {thanks && <Notice tone="success">{t(rv.thanks)}</Notice>}
        {tab === 'pending' ? (
          pending.length === 0 ? (
            <Card><strong>{t(rv.emptyPendingTitle)}</strong><span className="muted">{t(rv.emptyPending)}</span></Card>
          ) : pending.map((x) => (
            <Card key={x.key}>
              <div className="review-item">
                <div className="review-item__thumb"><ProductImage label={t(x.line.name)} src={picture} square /></div>
                <div className="review-item__body">
                  <strong>{t(x.line.name)}</strong>
                  <span className="muted">{t(rv.order)} {x.order.id} · {t(rv.received)} {formatDate(x.order.placedAt, lang)}</span>
                  <div><Button size="sm" onClick={() => navigate(`${pathname}${withQuery(search, 'write', x.key)}`)}>{t(rv.write)}</Button></div>
                </div>
              </div>
            </Card>
          ))
        ) : mine.length === 0 ? (
          <Card><span className="muted">{t(rv.emptyDone)}</span></Card>
        ) : mine.map((r) => {
          const product = productById(r.productId)
          return (
            <Card key={r.id}>
              <div className="review-item">
                <div className="review-item__thumb"><ProductImage label={product ? t(product.name) : ''} src={picture} square /></div>
                <div className="review-item__body">
                  {product ? <Link to={`${base}/product/${product.id}${search}`} className="card-link"><strong>{t(product.name)}</strong></Link> : <strong>-</strong>}
                  <RatingStars value={r.rating} label={t(rv.ratingLabel)} />
                  <p className="keep-lines">{typeof r.text === 'string' ? r.text : t(r.text)}</p>
                  <span className="muted">{formatDate(r.at, lang)}{r.orderId ? ` · ${t(rv.order)} ${r.orderId}` : ''}</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
      <Modal open={!!target} onClose={closeForm} label={t(rv.formTitle)} closeLabel={t(rv.closeForm)}>
        {target && (
          <div className="stack">
            <h2>{t(rv.formTitle)}</h2>
            <div className="review-item">
              <div className="review-item__thumb"><ProductImage label={t(target.line.name)} src={picture} square /></div>
              <div className="review-item__body"><strong>{t(target.line.name)}</strong><span className="muted">{t(rv.order)} {target.order.id}</span></div>
            </div>
            <div className="stack">
              <strong>{t(rv.rate)}</strong>
              <RatingStars value={rating} onChange={setRating} label={t(rv.ratingLabel)} starLabel={(n) => `${n} ${t(rv.star)}`} />
              {tried && rating < 1 && <span className="field__hint">{t(rv.errRating)}</span>}
            </div>
            <Textarea label={t(rv.text)} id="review-text" maxLength={500} placeholder={t(rv.textHint)} value={text} hint={tried && !text.trim() ? t(rv.errText) : undefined} onChange={(e) => setText(e.target.value)} />
            <Button onClick={submit}>{t(rv.submit)}</Button>
          </div>
        )}
      </Modal>
    </AccountShell>
  )
}
