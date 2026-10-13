import { useLocation, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Accordion, Breadcrumb, Button, Card, CategoryPills, Col, Grid, Notice } from '../../../ui'
import { PROTOTYPE_ID } from '../cart'
import { infoBySlug, infoPages } from '../info'
import { g } from '../listingStrings'
import { s } from '../strings'

// One text page: title, sample sections and links to the other pages in its group.
export function InfoPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { slug } = useParams()
  const page = infoBySlug(slug)
  const base = `/${PROTOTYPE_ID}`

  if (!page) {
    return (
      <Grid>
        <Col>
          <Card>
            <h3>{t(g.notFound)}</h3>
            <div><Button to={`${base}${search}`}>{t(g.backHome)}</Button></div>
          </Card>
        </Col>
      </Grid>
    )
  }
  const siblings = infoPages.filter((x) => x.group === page.group)
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search}` }, { label: t(page.title) }]} />
          <h1>{t(page.title)}</h1>
          <CategoryPills label={t(s.infoTopics)} items={siblings.map((x) => ({ label: t(x.title), to: `${base}/info/${x.slug}${search}`, active: x.slug === page.slug }))} />
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <div className="stack">
          <Notice tone="info">{t(s.sampleText)}</Notice>
          <Card>
            {page.sections.map((sec, i) => (
              <div key={i} className="stack">
                {sec.heading && <h2>{t(sec.heading)}</h2>}
                {sec.paragraphs?.map((para, j) => <p key={j}>{t(para)}</p>)}
                {sec.faq && <Accordion items={sec.faq.map((x) => ({ title: t(x.q), body: <p>{t(x.a)}</p> }))} />}
              </div>
            ))}
          </Card>
        </div>
      </Col>
    </Grid>
  )
}
