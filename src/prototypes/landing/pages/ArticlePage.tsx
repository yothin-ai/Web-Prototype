import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { articleImages } from '../../../assets/landing'
import { socialIcons } from '../../../assets/brand'
import { useLang } from '../../../i18n'
import { ArticleBody, ArticleCard, Badge, Breadcrumb, Button, Checkbox, Col, Grid, Notice, ProductImage, ShareBar } from '../../../ui'
import { articleTexts, type ArticleBlock } from '../articleTexts'
import { PROTOTYPE_ID, signupPath, useLanding } from '../lead'
import { s } from '../strings'

const shareNames = ['Facebook', 'Line', 'X']

// One article of the home page's list: cover, the sample author line, the text, its sources, share buttons and three more to read.
export function ArticlePage() {
  const { t, lang } = useLang()
  const content = useLanding()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { index = '' } = useParams()
  const at = Number(index)
  const article = content.articles.items[at]
  const text = articleTexts[at]
  const base = `/${PROTOTYPE_ID}`
  const [note, setNote] = useState<'' | 'copied' | 'failed'>('')
  useEffect(() => {
    if (!note) return
    const id = window.setTimeout(() => setNote(''), 3000)
    return () => window.clearTimeout(id)
  }, [note])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [index])
  if (!article || !text) return <Navigate to={`${base}${search}`} replace />

  const title = t(article.title)
  const date = new Date(text.date).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
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
  const others = content.articles.items.map((a, i) => ({ a, i })).filter(({ i }) => i !== at && articleTexts[i])

  const block = (b: ArticleBlock, i: number) => {
    switch (b.kind) {
      case 'p': return <p key={i}>{t(b.text)}</p>
      case 'h': return <h2 key={i}>{t(b.text)}</h2>
      case 'list': return <ul key={i}>{b.items.map((x, j) => <li key={j}>{t(x)}</li>)}</ul>
      case 'checks': return <div key={i} className="article-body__checks">{b.items.map((x, j) => <Checkbox key={j} checked disabled onChange={() => {}} label={t(x)} />)}</div>
      case 'qa': return <div key={i} className="stack"><h3>{t(b.q)}</h3><p>{t(b.a)}</p></div>
      case 'note': return <p key={i} className="article-body__note">{t(b.text)}</p>
    }
  }

  return (
    <div className="section">
      <Grid>
        <Col>
          <div className="article-layout">
            <div className="article-main stack">
              <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search}` }, { label: t(s.navArticles), to: `${base}${search}` }, { label: title }]} />
              <figure className="stack article-cover">
                <ProductImage label={title} wide src={articleImages[at]} alt={title} />
              </figure>
              <div className="stack">
                <h1>{title}</h1>
                <span className="row">
                  <Badge>{t(article.category)}</Badge>
                  <span className="muted">{t(s.articleAuthor)} · {date} · {t(s.articleMinutes).replace('{n}', String(text.minutes))}</span>
                </span>
                <div className="article-share-inline"><ShareBar label={t(s.share)} items={shareItems} onShare={share} /></div>
              </div>
              {note && <Notice tone={note === 'copied' ? 'success' : 'error'}>{t(note === 'copied' ? s.copied : s.copyFailed)}</Notice>}
              <ArticleBody>
                {text.blocks.map(block)}
                <h2>{t(s.articleSources)}</h2>
                <ul>
                  {text.sources.map((src) => (
                    <li key={src.url}><a href={src.url} target="_blank" rel="noopener noreferrer">{src.label}<span className="visually-hidden"> {t(s.newTab)}</span></a></li>
                  ))}
                </ul>
                <p className="muted">{t(s.articleSample)}</p>
                <div><Button to={signupPath(search, 'journey')}>{t(content.hero.cta)}</Button></div>
              </ArticleBody>
            </div>
            <div className="article-share"><ShareBar label={t(s.share)} items={shareItems} onShare={share} /></div>
          </div>
        </Col>
        <Col>
          <div className="stack">
            <h2>{t(s.moreArticles)}</h2>
            <div className="article-grid">
              {others.map(({ a, i }) => (
                <ArticleCard plain key={i} image={articleImages[i]} category={t(a.category)} title={t(a.title)} readLabel={t(s.readMore)} onRead={() => navigate(`${base}/article/${i}${search}`)} />
              ))}
            </div>
          </div>
        </Col>
      </Grid>
    </div>
  )
}
