import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Accordion, ArticleCard, BannerSlide, Button, Carousel, Col, CourseCard, FeatureShowcase, Grid, Hero, Icon, LogoWall } from '../../../ui'
import type { IconName } from '../../../ui'
import { PROTOTYPE_ID, scrollToSection, signupPath, useLanding } from '../lead'
import { s } from '../strings'

// The icons of the three points of each product, in order.
const featureIcons: IconName[][] = [['package', 'idea', 'wrench'], ['globe', 'shield', 'wallet']]

export function Home() {
  const { t } = useLang()
  const content = useLanding()
  const { search } = useLocation()
  const navigate = useNavigate()
  const base = `/${PROTOTYPE_ID}`
  const to = (interest: string) => signupPath(search, interest)
  const clientNames = content.clients.groups.flatMap((g) => g.names)

  return (
    <>
      <Hero
        tone="on-dark"
        lead={t(content.hero.lead)}
        title={t(content.hero.title)}
        emphasis={t(content.hero.emphasis)}
        highlight={t(content.hero.highlight)}
        subtitle={t(content.hero.text)}
        actions={
          <>
            <Button to={to('journey')}>{t(content.hero.cta)}</Button>
            <Button variant="secondary" onClick={() => scrollToSection('solutions')}>{t(content.hero.more)}</Button>
          </>
        }
      />

      <div className="landing-block reveal">
        <Grid>
          <Col>
            <LogoWall title={t(content.clients.title)} groups={[{ names: clientNames }]} />
          </Col>
        </Grid>
      </div>

      <div className="landing-block landing-anchor" id="solutions">
        <Grid>
          <Col>
            <div className="landing-heading landing-heading--end reveal">
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
                  action={<Button to={to(`product${i + 1}`)}>{t(p.cta)}<Icon name="external" size="sm" /></Button>}
                />
              </div>
            </Col>
          ))}
        </Grid>
      </div>

      <div className="landing-block landing-anchor landing-sky" id="courses">
        <Grid>
          <Col>
            <div className="landing-heading landing-heading--start reveal">
              <h2>{t(content.academy.title)}</h2>
              <p>{t(content.academy.text)}</p>
            </div>
          </Col>
          <Col span={{ base: 4, sm: 8, md: 8 }}>
            <div className="reveal landing-gallery">
              <Carousel label={t(s.coursesRow)} count={1} dots prevLabel={t(s.scrollPrev)} nextLabel={t(s.scrollNext)}>
                {content.academy.gallery.map((caption, i) => <BannerSlide key={i} title={t(caption)} />)}
              </Carousel>
            </div>
          </Col>
          <Col span={{ base: 4, sm: 8, md: 4 }}>
            <div className="landing-stack reveal">
              {content.academy.courses.map((c, i) => (
                <CourseCard key={i} to={to('course')} imageLabel={t(c.title)} tag={t(c.tag)} title={t(c.title)} meta={t(c.meta)} />
              ))}
            </div>
          </Col>
          <Col>
            <div className="landing-actions"><Button to={to('course')} className="btn--soft">{t(content.academy.viewAll)}<Icon name="right" size="sm" /></Button></div>
          </Col>
        </Grid>
      </div>

      <div className="landing-block reveal">
        <Grid>
          <Col>
            <div className="landing-heading">
              <h2>{t(content.partners.title)}</h2>
              <p>{t(content.partners.text)}</p>
            </div>
          </Col>
          <Col>
            <LogoWall large groups={[{ names: content.partners.names }]} />
          </Col>
        </Grid>
      </div>

      <div className="landing-block landing-anchor" id="articles">
        <Grid>
          <Col>
            <div className="landing-heading landing-heading--start reveal">
              <h2>{t(content.articles.title)}</h2>
              <p>{t(content.articles.text)}</p>
            </div>
          </Col>
          <Col>
            <div className="article-grid reveal">
              {content.articles.items.map((a, i) => (
                <ArticleCard plain key={i} category={t(a.category)} title={t(a.title)} readLabel={t(s.readMore)} onRead={() => navigate(`${base}/article/${i}${search}`)} />
              ))}
            </div>
          </Col>
        </Grid>
      </div>

      <div className="landing-block landing-anchor landing-faq" id="faq">
        <Grid>
          <Col span={{ base: 4, sm: 8, md: 5 }}>
            <div className="landing-stack reveal">
              <h2 className="landing-title">{t(content.faq.title)}</h2>
              <p className="muted">{t(content.faq.text)}</p>
            </div>
          </Col>
          <Col span={{ base: 4, sm: 8, md: 7 }}>
            <div className="reveal">
              <Accordion items={content.faq.items.map((f) => ({ title: t(f.question), body: t(f.answer) }))} />
            </div>
          </Col>
        </Grid>
      </div>
    </>
  )
}
