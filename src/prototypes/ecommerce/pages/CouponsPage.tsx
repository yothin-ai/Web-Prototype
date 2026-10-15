import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Breadcrumb, Button, Col, Grid } from '../../../ui'
import { PROTOTYPE_ID } from '../cart'
import { cp } from '../couponStrings'
import { s } from '../strings'
import { CouponGrid } from './CouponParts'

// The coupons anyone can collect, split into those spent on the web shop and those spent at a store till.
export function CouponsPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { dataset } = useDataset()
  const [channel, setChannel] = useState<'online' | 'store'>('online')
  const base = `/${PROTOTYPE_ID}`
  const coupons = dataset.ecommerce.checkout.coupons.filter((c) => c.channel === channel && !c.expired)

  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search}` }, { label: t(cp.pageTitle) }]} />
          <h1>{t(cp.pageTitle)}</h1>
          <span className="muted">{t(cp.pageSub)}</span>
          <div className="coupon-tabs" role="group" aria-label={t(cp.pageTitle)}>
            <Button icon="cart" variant={channel === 'online' ? 'primary' : 'secondary'} aria-pressed={channel === 'online'} onClick={() => setChannel('online')}>{t(cp.tabOnline)}</Button>
            <Button icon="store" variant={channel === 'store' ? 'primary' : 'secondary'} aria-pressed={channel === 'store'} onClick={() => setChannel('store')}>{t(cp.tabStore)}</Button>
          </div>
          <h2>{t(cp.sectionTitle)}</h2>
        </div>
      </Col>
      <Col>
        <CouponGrid coupons={coupons} mode="shop" />
      </Col>
    </Grid>
  )
}
