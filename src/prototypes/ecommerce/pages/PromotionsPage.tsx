import { useLocation } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Badge, Breadcrumb, Card, Col, Grid, ShortcutCard } from '../../../ui'
import { PROTOTYPE_ID } from '../cart'
import { cp } from '../couponStrings'
import { pm } from '../miscStrings'
import { sv } from '../serviceStrings'
import { s } from '../strings'

// Every promotion in one place: the campaigns of the home page slides and shortcut circles, and the perks that sit elsewhere.
export function PromotionsPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { dataset } = useDataset()
  const { home } = dataset.ecommerce
  const base = `/${PROTOTYPE_ID}`
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search}` }, { label: t(pm.title) }]} />
          <h1>{t(pm.title)}</h1>
          <span className="muted">{t(pm.sub)}</span>
          <h2>{t(pm.perks)}</h2>
        </div>
      </Col>
      <Col span={{ base: 4, sm: 4, md: 4 }}><ShortcutCard icon="ticket" tag="HOT" to={`${base}/coupons${search}`} title={t(cp.pageTitle)} text={t(pm.couponsText)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 4 }}><ShortcutCard icon="crown" tag="FREE" to={`${base}/account/club${search}`} title={t(pm.menuClub)} text={t(pm.clubText)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 4 }}><ShortcutCard icon="hammer" tag="PRO" to={`${base}/services${search}`} title={t(sv.title)} text={t(pm.servicesText)} /></Col>
      <Col><h2>{t(pm.campaigns)}</h2></Col>
      {home.slides.map((slide, i) => (
        <Col key={`slide-${i}`} span={{ base: 4, sm: 4, md: 6 }}>
          <Card to={`${base}/campaign/slide-${i}${search}`}>
            <h3>{t(slide.title)}</h3>
            <span className="muted">{t(slide.text)}</span>
            <div><Badge>{t(pm.open)} ›</Badge></div>
          </Card>
        </Col>
      ))}
      <Col><h2>{t(pm.quick)}</h2></Col>
      {home.circles.map((c, i) => (
        <Col key={`circle-${i}`} span={{ base: 2, sm: 2, md: 3 }}>
          <Card to={`${base}/campaign/circle-${i}${search}`}><strong>{t(c)}</strong></Card>
        </Col>
      ))}
    </Grid>
  )
}
