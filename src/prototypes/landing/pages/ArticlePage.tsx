import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Col, Grid, Notice, ProductImage } from '../../../ui'
import { PROTOTYPE_ID, signupPath, useLanding } from '../lead'
import { s } from '../strings'

// One article of the home page's list, with its sample summary and a way into the form.
export function ArticlePage() {
  const { t } = useLang()
  const content = useLanding()
  const { search } = useLocation()
  const { index = '' } = useParams()
  const article = content.articles.items[Number(index)]
  const base = `/${PROTOTYPE_ID}`
  if (!article) return <Navigate to={`${base}${search}`} replace />

  return (
    <div className="section">
      <Grid>
        <Col span={{ base: 4, sm: 8, md: 8 }}>
          <div className="stack">
            <div><Button to={`${base}${search}`} variant="ghost" size="sm">← {t(s.backHome)}</Button></div>
            <div><Badge>{t(article.category)}</Badge></div>
            <h1>{t(article.title)}</h1>
            <ProductImage label={t(article.title)} wide />
            <p>{t(article.summary)}</p>
            <Notice tone="info">{t(s.articleNote)}</Notice>
            <div><Button to={signupPath(search, 'journey')}>{t(content.hero.cta)}</Button></div>
          </div>
        </Col>
      </Grid>
    </div>
  )
}
