import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { ArticleCard, Breadcrumb, CategoryPills, Col, Grid, Card } from '../../../ui'
import { w } from '../articleStrings'
import { PROTOTYPE_ID } from '../cart'
import { s } from '../strings'
import { withQuery } from '../Storefront'

// Every article, with pills to narrow the list to one group.
export function IdeasPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { dataset } = useDataset()
  const home = dataset.ecommerce.home
  const base = `/${PROTOTYPE_ID}`
  const groups = [...new Map(home.articles.map((a) => [a.category.th ?? '', a.category])).values()]
  const chosen = params.get('cat') ?? ''
  const shown = home.articles.map((a, index) => ({ a, index })).filter(({ a }) => !chosen || a.category.th === chosen)
  const pill = (label: string, value: string) => ({ label, to: `${base}/ideas${withQuery(search, 'cat', value)}`, active: chosen === value })

  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search}` }, { label: t(home.ideasTitle) }]} />
          <h1>{t(home.ideasTitle)}</h1>
          <span className="muted">{t(w.listIntro)}</span>
          <CategoryPills label={t(w.categoriesLabel)} items={[pill(t(w.allCategories), ''), ...groups.map((g) => pill(t(g), g.th ?? ''))]} />
        </div>
      </Col>
      <Col>
        {shown.length === 0 && <Card><p>{t(w.empty)}</p></Card>}
        <div className="article-grid" aria-label={t(s.articlesRow)}>
          {shown.map(({ a, index }) => (
            <ArticleCard key={index} category={t(a.category)} views={a.views} viewsLabel={t(s.articleViews)} title={t(a.title)} readLabel={t(s.readMore)} onRead={() => navigate(`${base}/idea/${index}${search}`)} />
          ))}
        </div>
      </Col>
    </Grid>
  )
}
