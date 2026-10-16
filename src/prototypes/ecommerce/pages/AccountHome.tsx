import { Link, useLocation } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, DataRow, ShortcutCard, StatCard, MemberBanner } from '../../../ui'
import { a } from '../accountStrings'
import { formatDate, formatMoney, PROTOTYPE_ID } from '../cart'
import { isUsable, useCouponWallet } from '../coupons'
import { useOrderBook } from '../orders'
import { useClubLinked } from '../checkout'
import { useClubBalance } from '../club'
import { AccountShell, useAccountIdentity } from './AccountShell'

export function AccountHome() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const { dataset } = useDataset()
  const { account, checkout } = dataset.ecommerce
  const [orders] = useOrderBook()
  const [linked, setLinked] = useClubLinked()
  const who = useAccountIdentity()
  const base = `/${PROTOTYPE_ID}`
  const first = who.name.split(' ')[0]
  const { balance } = useClubBalance()
  const points = balance
  const total = account.spent + account.toNext
  const remaining = linked ? account.toNext : total
  const progress = linked ? (account.spent / total) * 100 : 0
  const latest = orders.slice(0, 2)
  const { wallet } = useCouponWallet()
  const coupons = checkout.coupons.filter((x) => isUsable(x, wallet.find((w) => w.id === x.id)))

  return (
    <AccountShell active="home">
      <div className="stack">
        <h1>{t(a.hello)} {first}</h1>
        <span className="muted">{t(a.thanksMember)} · {who.email}</span>
      </div>
      <MemberBanner
        tier={linked ? who.tier : t(a.tierNotLinked)}
        points={points.toLocaleString()}
        pointsLabel={t(a.statPoints)}
        progress={progress}
        progressText={`${t(a.untilNext)} ${formatMoney(remaining, lang)} ${t(a.toTier)} ${t(account.nextTier)}`}
        progressLabel={t(a.statPoints)}
        perksLabel={t(a.perks)}
        action={linked ? <Button size="sm">{t(a.redeem)}</Button> : <Button size="sm" onClick={() => setLinked(true)}>{t(a.linkNow)}</Button>}
      />
      <div className="account-split">
        <Card>
          <div className="row"><h3 className="row__grow">{t(a.latestOrders)}</h3><Button to={`${base}/orders${search}`} variant="ghost" size="sm">{t(a.viewAll)}</Button></div>
          {latest.length === 0 ? (
            <div className="checkout-empty stack">
              <strong>{t(a.noOrdersPeriod)}</strong>
              <div><Button to={`${base}${search}`} variant="ghost" size="sm">{t(a.startShopping)}</Button></div>
            </div>
          ) : latest.map((o) => (
            <DataRow key={o.id} label={<span className="stack"><Link to={`${base}/orders/${o.id}${search}`} className="card-link"><strong>{o.id}</strong></Link><span className="muted">{formatDate(o.placedAt, lang)}</span></span>} value={formatMoney(o.total, lang)} />
          ))}
        </Card>
        <Card>
          <div className="row"><h3 className="row__grow">{t(a.expiringCoupons)}</h3><Button to={`${base}/account/coupons${search}`} variant="ghost" size="sm">{t(a.viewAll)}</Button></div>
          {coupons.length === 0 ? <span className="muted">{t(a.noCoupons)}</span> : coupons.slice(0, 2).map((cp) => (
            <DataRow key={cp.id} label={<span className="stack"><strong>{t(cp.title)}</strong><span className="muted">{t(cp.detail)}</span></span>} value={<Badge>{formatMoney(cp.minSpend, lang)}</Badge>} />
          ))}
        </Card>
      </div>
      <div className="stat-grid">
        <StatCard icon="star" label={t(a.statPoints)} value={points.toLocaleString()} note={t(a.statPointsNote)} />
        <StatCard icon="ticket" label={t(a.statCoupons)} value={String(coupons.length)} note={t(a.statCouponsNote)} />
        <StatCard icon="orders" label={t(a.statOrders)} value={String(orders.length)} note={t(a.statOrdersNote)} />
      </div>
      <h3>{t(a.shortcuts)}</h3>
      <div className="stat-grid">
        <ShortcutCard to={`${base}/account/addresses${search}`} title={t(a.scAddress)} text={t(a.scAddressText)} />
        <ShortcutCard to={`${base}/account/reviews${search}`} title={t(a.scReview)} text={t(a.scReviewText)} />
        <ShortcutCard to={`${base}/info/faq${search}`} title={t(a.scHelp)} text={t(a.scHelpText)} />
      </div>
    </AccountShell>
  )
}
