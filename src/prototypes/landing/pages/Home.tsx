import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Accordion, Badge, Button, Card, Col, Grid, Hero, Quote } from '../../../ui'
import { PROTOTYPE_ID, useLanding } from '../lead'
import { s } from '../strings'

export function Home() {
  const { t } = useLang()
  const content = useLanding()
  const { search } = useLocation()
  const featuresRef = useRef<HTMLDivElement>(null)
  const signup = `/${PROTOTYPE_ID}/signup${search}`

  return (
    <>
      <div className="section">
        <Grid>
          <Col span={{ base: 4, sm: 8, md: 8 }}>
            <Hero
              badge={<Badge>{t(content.badge)}</Badge>}
              title={t(content.headline)}
              subtitle={t(content.subheadline)}
              actions={
                <>
                  <Button to={signup}>{t(content.cta)}</Button>
                  <Button variant="secondary" onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                    {t(s.seeHow)}
                  </Button>
                </>
              }
            />
          </Col>
        </Grid>
      </div>

      <div className="section" ref={featuresRef}>
        <Grid>
          <Col><h2>{t(content.featuresTitle)}</h2></Col>
          {content.features.map((f, i) => (
            <Col key={i} span={{ base: 4, sm: 8, md: 4 }}>
              <Card>
                <h3>{t(f.title)}</h3>
                <p className="muted">{t(f.body)}</p>
              </Card>
            </Col>
          ))}
        </Grid>
      </div>

      <div className="section">
        <Grid>
          <Col><h2>{t(s.stepsTitle)}</h2></Col>
          {content.steps.map((step, i) => (
            <Col key={i} span={{ base: 4, sm: 8, md: 4 }}>
              <Card>
                <Badge>{t(s.step)} {i + 1}</Badge>
                <h3>{t(step.title)}</h3>
                <p className="muted">{t(step.body)}</p>
              </Card>
            </Col>
          ))}
        </Grid>
      </div>

      <div className="section">
        <Grid>
          <Col><h2>{t(s.testimonialsTitle)}</h2></Col>
          {content.testimonials.map((q, i) => (
            <Col key={i} span={{ base: 4, sm: 8, md: 6 }}>
              <Quote text={t(q.quote)} author={t(q.author)} />
            </Col>
          ))}
        </Grid>
      </div>

      <div className="section">
        <Grid>
          <Col><h2>{t(s.faqTitle)}</h2></Col>
          <Col>
            <Accordion items={content.faqs.map((f) => ({ title: t(f.question), body: t(f.answer) }))} />
          </Col>
        </Grid>
      </div>

      <div className="section">
        <Grid>
          <Col>
            <Card>
              <h2>{t(content.finalTitle)}</h2>
              <div><Button to={signup}>{t(content.cta)}</Button></div>
            </Card>
          </Col>
        </Grid>
      </div>
    </>
  )
}
