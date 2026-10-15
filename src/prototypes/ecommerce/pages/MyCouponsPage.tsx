import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Button, Card } from '../../../ui'
import { PROTOTYPE_ID } from '../cart'
import { cp } from '../couponStrings'
import { useCouponWallet, walletState } from '../coupons'
import { AccountShell } from './AccountShell'
import { CouponGrid } from './CouponParts'

type Tab = 'all' | 'ready' | 'done'

// The shopper's coupon wallet: every coupon collected, split into usable and used-up or expired.
export function MyCouponsPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { dataset } = useDataset()
  const { wallet } = useCouponWallet()
  const [tab, setTab] = useState<Tab>('all')
  const base = `/${PROTOTYPE_ID}`
  const held = wallet.flatMap((w) => {
    const coupon = dataset.ecommerce.checkout.coupons.find((c) => c.id === w.id)
    return coupon ? [{ coupon, ready: walletState(coupon, w) === 'ready' }] : []
  })
  const shown = held.filter((h) => tab === 'all' || (tab === 'ready' ? h.ready : !h.ready)).map((h) => h.coupon)
  const count = (f: (r: boolean) => boolean) => held.filter((h) => f(h.ready)).length
  const tabs: { id: Tab; label: string; n: number }[] = [
    { id: 'all', label: t(cp.tabAll), n: held.length },
    { id: 'ready', label: t(cp.tabReady), n: count((r) => r) },
    { id: 'done', label: t(cp.tabDone), n: count((r) => !r) },
  ]

  return (
    <AccountShell active="coupons">
      <div className="stack">
        <h1>{t(cp.myTitle)}</h1>
        <span className="muted">{t(cp.mySub)}</span>
        <div className="coupon-tabs" role="group" aria-label={t(cp.myTitle)}>
          {tabs.map((x) => (
            <Button key={x.id} size="sm" variant={tab === x.id ? 'primary' : 'secondary'} aria-pressed={tab === x.id} onClick={() => setTab(x.id)}>{x.label} ({x.n})</Button>
          ))}
          <Button to={`${base}/coupons${search}`} size="sm" variant="ghost">{t(cp.viewAll)}</Button>
        </div>
        {shown.length === 0 ? (
          <Card>
            <strong>{tab === 'done' ? t(cp.emptyDone) : t(cp.empty)}</strong>
            <div><Button to={`${base}/coupons${search}`} variant="secondary" size="sm">{t(cp.allPromos)}</Button></div>
          </Card>
        ) : (
          <CouponGrid coupons={shown} mode="wallet" />
        )}
      </div>
    </AccountShell>
  )
}
