import { useLocation, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Accordion, Breadcrumb, Button, Card, CategoryPills, Col, Grid, Notice } from '../../../ui'
import { PROTOTYPE_ID } from '../cart'
import { infoBySlug, infoPages } from '../info'
import { s } from '../strings'
import { legalMeta } from '../legalContent'
import { lg } from '../legalStrings'
import { PrivacyRequestForm } from './PrivacyRequestForm'
import { NotFoundPage } from './NotFoundPage'

// One text page: title, sample sections and links to the other pages in its group.
export function InfoPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { slug } = useParams()
  const page = infoBySlug(slug)
  const base = `/${PROTOTYPE_ID}`

  if (!page) return <NotFoundPage />
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
      {page.legal && (
        <Col span={{ base: 4, sm: 8, md: 4 }}>
          <div className="legal-toc">
            <Card>
              <div className="stack">
                <h3>{t(lg.toc)}</h3>
                <nav className="stack" aria-label={t(lg.toc)}>
                  {page.sections.map((sec, i) => sec.heading && (
                    <Button key={i} variant="ghost" size="sm" className="legal-toc__link" onClick={() => document.getElementById(`legal-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                      {i + 1}. {t(sec.heading)}
                    </Button>
                  ))}
                </nav>
              </div>
            </Card>
          </div>
        </Col>
      )}
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <div className="stack">
          <Notice tone="info">{t(s.sampleText)}</Notice>
          {page.legal && <span className="muted">{t(lg.updated)}: {t(legalMeta.updated)} · {t(lg.version)} {legalMeta.version}</span>}
          <Card>
            {page.sections.map((sec, i) => (
              <div key={i} id={`legal-${i}`} className={`stack${page.legal ? ' legal-section' : ''}`}>
                {sec.heading && <h2>{page.legal ? `${i + 1}. ` : ''}{t(sec.heading)}</h2>}
                {sec.paragraphs?.map((para, j) => <p key={j}>{t(para)}</p>)}
                {sec.faq && <Accordion items={sec.faq.map((x) => ({ title: t(x.q), body: <p>{t(x.a)}</p> }))} />}
              </div>
            ))}
          </Card>
          {page.slug === 'privacy-request' && <PrivacyRequestForm />}
        </div>
      </Col>
    </Grid>
  )
}
