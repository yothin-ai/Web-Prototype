import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Breadcrumb, Button, Card, CategoryPills, Col, Grid, IconCircle, Modal, Notice, ProductImage, PromoStrip } from '../../../ui'
import { useSignedIn } from '../account'
import { formatMoney, PROTOTYPE_ID } from '../cart'
import { portfolios, serviceById, serviceTypes, type Portfolio } from '../services'
import { sv } from '../serviceStrings'
import { s } from '../strings'
import { withQuery } from '../Storefront'

// The technician services: what is offered, examples of finished work, and where we go.
export function ServicesPage() {
  const { t, lang } = useLang()
  const { search, pathname } = useLocation()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [signedIn] = useSignedIn()
  const [open, setOpen] = useState<Portfolio | null>(null)
  const base = `/${PROTOTYPE_ID}`
  const type = params.get('type') ?? ''
  const shown = portfolios.filter((x) => !type || x.type === type)

  // Booking needs an account: a shopper who is signed out gets the sign-in window first.
  const book = (id: string) => {
    setOpen(null)
    if (signedIn) navigate(`${base}/services/book${withQuery(search, 'type', id)}`)
    else navigate(`${pathname}${withQuery(search, 'auth', 'login')}`)
  }
  const pill = (value: string, label: string) => ({ label, to: `${base}/services${withQuery(search, 'type', value)}`, active: type === value })

  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search}` }, { label: t(sv.title) }]} />
          <h1>{t(sv.title)}</h1>
          <span className="muted">{t(sv.sub)}</span>
          <Notice tone="info">{t(s.sampleText)}</Notice>
          <h2>{t(sv.promoTitle)}</h2>
          <PromoStrip>{t(sv.promo)}</PromoStrip>
          <h2>{t(sv.typesTitle)}</h2>
        </div>
      </Col>
      {serviceTypes.map((x) => (
        <Col key={x.id} span={{ base: 4, sm: 4, md: 4 }}>
          <Card>
            <div className="row"><IconCircle size="lg" icon={x.icon} /><Badge>{t(sv.from)} {formatMoney(x.from, lang)}</Badge></div>
            <h3>{t(x.name)}</h3>
            <span className="muted">{t(x.desc)}</span>
            <div><Button size="sm" onClick={() => book(x.id)}>{t(sv.book)}</Button></div>
          </Card>
        </Col>
      ))}
      <Col>
        <div className="stack">
          <h2>{t(sv.portfolioTitle)}</h2>
          <CategoryPills label={t(sv.filterLabel)} items={[pill('', t(sv.all)), ...serviceTypes.map((x) => pill(x.id, t(x.name)))]} />
        </div>
      </Col>
      {shown.map((x) => (
        <Col key={x.id} span={{ base: 4, sm: 4, md: 4 }}>
          <Card>
            <ProductImage label={t(x.title)} />
            <h3>{t(x.title)}</h3>
            <span className="muted">{t(sv.jobType)}: {t(serviceById(x.type)!.name)}</span>
            <span className="muted">{t(sv.branchWork)}: {t(x.branch)} · {t(x.place)}</span>
            <div><Button size="sm" variant="secondary" onClick={() => setOpen(x)}>{t(sv.details)}</Button></div>
          </Card>
        </Col>
      ))}
      <Col>
        <Card>
          <h2>{t(sv.areaTitle)}</h2>
          <p>{t(sv.areaText)}</p>
          <span className="muted">{t(sv.areaList)}</span>
        </Card>
      </Col>
      <Modal open={!!open} onClose={() => setOpen(null)} label={t(sv.detailTitle)} closeLabel={t(sv.closeDetail)}>
        {open && (
          <div className="stack">
            <h2>{t(sv.detailTitle)}</h2>
            <ProductImage label={t(open.title)} />
            <h3>{t(open.title)}</h3>
            <span className="muted">{t(sv.jobType)}: {t(serviceById(open.type)!.name)}</span>
            <span className="muted">{t(sv.branchWork)}: {t(open.branch)} · {t(open.place)}</span>
            <h3>{t(sv.whatWeDid)}</h3>
            <p>{t(open.did)}</p>
            <Button onClick={() => book(open.type)}>{t(sv.bookThis)}</Button>
          </div>
        )}
      </Modal>
    </Grid>
  )
}
