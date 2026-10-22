import { useLocation, useNavigate } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Accordion, ArticleCard, Button, Carousel, Col, CourseCard, FeatureShowcase, Grid, Hero, LogoWall, ProductImage } from '../../../ui'
import type { IconName } from '../../../ui'
import { PROTOTYPE_ID, scrollToSection, signupPath, useLanding } from '../lead'
import { s } from '../strings'

// The icons of the three points of each product, in order.
const featureIcons: IconName[][] = [['package', 'idea', 'wrench'], ['globe', 'shield', 'wallet']]

export function Home() {
  const { t } = useLang()
  const { dataset } = useDataset()
  const content = useLanding()
  const { search } = useLocation()
  const navigate = useNavigate()
  const base = `/${PROTOTYPE_ID}`
  const to = (interest: string) => signupPath(search, interest)

  return (
    <>
      <Hero
        tone="on-dark"
        lead={t(content.hero.lead)}
        title={t(content.hero.title)}
        subtitle={t(content.hero.text)}
        actions={
          <>
            <Button to={to('journey')}>{t(content.hero.cta)}</Button>
            <Button variant="secondary" onClick={() => scrollToSection('solutions')}>{t(content.hero.more)}</Button>
          </>
        }
        media={<ProductImage label={t(dataset.brandName)} wide />}
      />

      <div className="section reveal">
        <Grid>
          <Col>
            <LogoWall title={t(content.clients.title)} groups={content.clients.groups.map((g) => ({ label: t(g.label), names: g.names }))} />
          </Col>
        </Grid>
      </div>

      <div className="section landing-anchor" id="solutions">
        <Grid>
          <Col>
            <div className="landing-heading reveal">
              <h2>{t(content.solutions.title)}</h2>
              <p>{t(content.solutions.text)}</p>
            </div>
          </Col>
          {content.solutions.products.map((p, i) => (
            <Col key={i}>
              <div className="reveal">
                <FeatureShowcase
                  reverse={i % 2 === 1}
                  headline={t(p.headline)}
                  name={t(p.name)}
                  tagline={t(p.tagline)}
                  imageLabel={t(p.name)}
                  features={p.features.map((f, j) => ({ icon: featureIcons[i]?.[j], title: t(f.title), text: t(f.body) }))}
                  action={<Button to={to(`product${i + 1}`)}>{t(p.cta)}</Button>}
                />
              </div>
            </Col>
          ))}
        </Grid>
      </div>

      <div className="section landing-anchor" id="courses">
        <Grid>
          <Col>
            <div className="landing-heading reveal">
              <h2>{t(content.academy.title)}</h2>
              <p>{t(content.academy.text)}</p>
            </div>
          </Col>
          <Col>
            <div className="reveal">
              <Carousel label={t(s.coursesRow)} count={3} minItem="240px" prevLabel={t(s.scrollPrev)} nextLabel={t(s.scrollNext)}>
                {content.academy.courses.map((c, i) => (
                  <CourseCard key={i} to={to('course')} imageLabel={t(c.title)} tag={t(c.tag)} title={t(c.title)} meta={t(c.meta)} />
                ))}
              </Carousel>
            </div>
          </Col>
          <Col>
            <div className="landing-heading"><div><Button to={to('course')} variant="secondary">{t(content.academy.viewAll)}</Button></div></div>
          </Col>
        </Grid>
      </div>

      <div className="section reveal">
        <Grid>
          <Col>
            <div className="landing-heading">
              <h2>{t(content.partners.title)}</h2>
              <p>{t(content.partners.text)}</p>
            </div>
          </Col>
          <Col>
            <LogoWall groups={[{ names: content.partners.names }]} />
          </Col>
        </Grid>
      </div>

      <div className="section landing-anchor" id="articles">
        <Grid>
          <Col>
            <div className="landing-heading reveal">
              <h2>{t(content.articles.title)}</h2>
              <p>{t(content.articles.text)}</p>
            </div>
          </Col>
          <Col>
            <div className="article-grid reveal">
              {content.articles.items.map((a, i) => (
                <ArticleCard key={i} category={t(a.category)} title={t(a.title)} readLabel={t(s.readMore)} onRead={() => navigate(`${base}/article/${i}${search}`)} />
              ))}
            </div>
          </Col>
        </Grid>
      </div>

      <div className="section landing-anchor" id="faq">
        <Grid>
          <Col span={{ base: 4, sm: 8, md: 4 }}>
            <div className="stack reveal">
              <h2>{t(content.faq.title)}</h2>
              <p className="muted">{t(content.faq.text)}</p>
            </div>
          </Col>
          <Col span={{ base: 4, sm: 8, md: 8 }}>
            <div className="reveal">
              <Accordion items={content.faq.items.map((f) => ({ title: t(f.question), body: t(f.answer) }))} />
            </div>
          </Col>
        </Grid>
      </div>
    </>
  )
}
