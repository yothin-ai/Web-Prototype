import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { socialIcons } from '../../../assets/brand'
import { ArticleBody, Badge, Breadcrumb, Button, Carousel, Checkbox, Col, Grid, Icon, Notice, ProductCard, ProductImage, SectionHeader, ShareBar } from '../../../ui'
import { articleContent as ac } from '../articleContent'
import { w } from '../articleStrings'
import { formatMoney, PROTOTYPE_ID, useAddToCart, useEcommerce } from '../cart'
import { productsFor } from '../category'
import { s } from '../strings'
import { NotFoundPage } from './NotFoundPage'

const shareNames = ['Facebook', 'Line', 'X']

// One article: cover, sample text in the shape of the original, share buttons and related products.
export function ArticlePage() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const { index = '' } = useParams()
  const { dataset } = useDataset()
  const { products } = useEcommerce()
  const add = useAddToCart()
  const home = dataset.ecommerce.home
  const article = home.articles[Number(index)]
  const base = `/${PROTOTYPE_ID}`
  const [note, setNote] = useState<'' | 'copied' | 'failed'>('')
  useEffect(() => {
    if (!note) return
    const id = window.setTimeout(() => setNote(''), 3000)
    return () => window.clearTimeout(id)
  }, [note])

  if (!article) return <NotFoundPage />

  const cat = t(article.category)
  const title = t(article.title)
  const fill = (text: { th?: string; en?: string }) => t(text).replaceAll('{cat}', cat).replaceAll('{title}', title)
  const share = async () => {
    const link = window.location.href
    try {
      await navigator.clipboard.writeText(link)
      setNote('copied')
    } catch {
      // Some embedded views refuse the clipboard API; fall back to the older copy command.
      const box = document.createElement('textarea')
      box.value = link
      document.body.appendChild(box)
      box.select()
      const ok = document.execCommand('copy')
      box.remove()
      setNote(ok ? 'copied' : 'failed')
    }
  }
  const shareItems = socialIcons.filter((i) => shareNames.includes(i.label)).map((i) => ({ name: i.label, src: i.src }))
  const related = productsFor(products, [93, Number(index)]).slice(0, 10)
  const detail = (id: string) => `${base}/product/${id}${search}`

  return (
    <Grid>
      <Col>
        <div className="article-layout">
          <div className="article-main stack">
            <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search}` }, { label: t(home.ideasTitle), to: `${base}/ideas${search}` }, { label: title }]} />
            <figure className="stack">
              <ProductImage label={title} wide />
              <figcaption className="muted">{title}</figcaption>
            </figure>
            <div className="stack">
              <h1>{title}</h1>
              <span className="row">
                <Badge>{cat}</Badge>
                <span className="article-card__views" title={t(s.articleViews)}>{article.views}<Icon name="view" size="sm" /></span>
              </span>
              <div className="article-share-inline"><ShareBar label={t(w.share)} items={shareItems} onShare={share} /></div>
            </div>
            <Notice tone="info">{t(w.sampleNote)}</Notice>
            {note && <Notice tone={note === 'copied' ? 'success' : 'error'}>{t(note === 'copied' ? w.copied : w.copyFailed)}</Notice>}
            <ArticleBody>
              {ac.intro.map((x, i) => <p key={i}>{fill(x)}</p>)}
              {ac.sections.map((sec, i) => (
                <div key={i} className="stack">
                  <h3>{i + 1}. {fill(sec.title)}</h3>
                  {sec.body.map((x, j) => <p key={j}>{fill(x)}</p>)}
                  {i === 1 && (
                    <figure className="stack">
                      <ProductImage label={fill(sec.title)} wide />
                      <figcaption className="muted">{t(ac.figure)}</figcaption>
                    </figure>
                  )}
                </div>
              ))}
              <p><strong>{t(ac.listIntro)}</strong></p>
              <ul>{ac.bullets.map((x, i) => <li key={i}>{t(x)}</li>)}</ul>
              <h2>{t(ac.checkTitle)}</h2>
              <div className="article-body__checks">
                {ac.checks.map((x, i) => <Checkbox key={i} checked disabled onChange={() => {}} label={t(x)} />)}
              </div>
              <h2>{t(ac.summaryTitle)}</h2>
              {ac.summary.map((x, i) => <p key={i}>{fill(x)}</p>)}
              <h2>{t(ac.faqTitle)}</h2>
              {ac.faq.map((x, i) => (
                <div key={i} className="stack">
                  <h3>{t(x.q)}</h3>
                  <p>{t(x.a)}</p>
                </div>
              ))}
              {ac.closing.map((x, i) => <p key={i}>{fill(x)} <Link to={`${base}/products${search}`}>{t(ac.shop)}</Link></p>)}
              <p className="article-body__note">{t(ac.hotline)}</p>
            </ArticleBody>
          </div>
          <div className="article-share"><ShareBar label={t(w.share)} items={shareItems} onShare={share} /></div>
        </div>
      </Col>
      {related.length > 0 && (
        <Col>
          <div className="storefront-section">
            <SectionHeader title={t(w.relatedTitle)} />
            <p className="muted">{t(w.relatedSub)}</p>
            <Carousel label={t(w.relatedRow)} count={5} minItem="176px" prevLabel={t(s.scrollPrev)} nextLabel={t(s.scrollNext)}>
              {related.map((p) => (
                <ProductCard key={p.id} to={detail(p.id)} imageLabel={t(p.name)} badges={<Badge>{t(p.brand ?? p.category)}</Badge>} name={t(p.name)} price={formatMoney(p.price, lang)} action={<Button size="sm" icon="cart" onClick={() => add(p.id)}>{t(s.add)}</Button>} />
              ))}
            </Carousel>
          </div>
        </Col>
      )}
    </Grid>
  )
}
