import { useLocation } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, DataRow, IconCircle, MemberBanner } from '../../../ui'
import { a } from '../accountStrings'
import { formatMoney, formatDate, PROTOTYPE_ID } from '../cart'
import { useClubLinked } from '../checkout'
import { sampleHistory, useClubBalance, useClubPoints } from '../club'
import { k } from '../clubStrings'
import { cp } from '../couponStrings'
import { useCouponWallet } from '../coupons'
import { AccountShell, useAccountIdentity } from './AccountShell'
import { ClubLinkForm } from './ClubParts'
import { CouponGrid } from './CouponParts'

const tiers = [
  { name: k.tierSilver, perks: k.perksSilver },
  { name: k.tierGold, perks: k.perksGold },
  { name: k.tierPlatinum, perks: k.perksPlatinum },
]
const currentTier = 1

// The club page: member card, tier perks, points history and coupons bought with points.
export function ClubPage() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const { dataset } = useDataset()
  const { account } = dataset.ecommerce
  const who = useAccountIdentity()
  const [, setLinked] = useClubLinked()
  const { linked, balance } = useClubBalance()
  const { log, add } = useClubPoints()
  const { entryOf, claim, restore } = useCouponWallet()
  const base = `/${PROTOTYPE_ID}`
  const total = account.spent + account.toNext
  const history = [...log, ...sampleHistory]
  const redeemable = dataset.ecommerce.checkout.coupons.filter((c) => c.redeemCost)

  const redeem = (c: (typeof redeemable)[number]) => {
    const cost = c.redeemCost ?? 0
    if (balance < cost) return
    add({ th: `${t(k.redeemNote)} ${c.title.th}`, en: `${k.redeemNote.en} ${c.title.en}` }, -cost)
    if (entryOf(c.id)) restore(c.id)
    else claim(c.id)
  }

  const tierCards = (
    <div className="stat-grid">
      {tiers.map((x, i) => (
        <Card key={i}>
          <div className="row"><h3 className="row__grow">{t(x.name)}</h3>{linked && i === currentTier && <Badge tone="success">{t(k.yourTier)}</Badge>}</div>
          <span className="muted">{t(x.perks)}</span>
        </Card>
      ))}
    </div>
  )

  return (
    <AccountShell active="club">
      <div className="stack">
        <h1>{t(k.title)}</h1>
        <span className="muted">{t(k.sub)}</span>
      </div>
      {!linked ? (
        <>
          <Card>
            <div className="row"><IconCircle size="md" icon="crown" /><h3 className="row__grow">{t(k.linkTitle)}</h3></div>
            <span className="muted">{t(k.linkSub)}</span>
            <ClubLinkForm idPrefix="club-page" />
            <span className="muted">{t(k.linkDemo)}</span>
          </Card>
          <h3>{t(k.tiersTitle)}</h3>
          {tierCards}
        </>
      ) : (
        <>
          <MemberBanner
            tier={who.tier}
            points={balance.toLocaleString()}
            pointsLabel={t(a.statPoints)}
            progress={(account.spent / total) * 100}
            progressText={`${t(a.untilNext)} ${formatMoney(account.toNext, lang)} ${t(a.toTier)} ${t(account.nextTier)}`}
            progressLabel={t(a.statPoints)}
            perksLabel={t(a.perks)}
            action={<Button size="sm" to={`${base}/account/coupons${search}`}>{t(k.myCoupons)}</Button>}
          />
          <Card>
            <div className="row"><IconCircle size="md" icon="crown" /><h3 className="row__grow">{t(k.cardTitle)}</h3><Badge tone="success">{who.tier}</Badge></div>
            <DataRow muted label={t(k.memberNo)} value={account.memberNo} />
            <DataRow muted label={t(a.profileName)} value={who.name} />
            <div><Button variant="ghost" size="sm" onClick={() => setLinked(false)}>{t(k.unlink)}</Button></div>
          </Card>
          <h3>{t(k.tiersTitle)}</h3>
          {tierCards}
          <Card>
            <h3>{t(k.historyTitle)}</h3>
            {history.length === 0 && <span className="muted">{t(k.historyEmpty)}</span>}
            {history.map((e, i) => (
              <DataRow key={i} label={<span className="stack"><strong>{t(e.note)}</strong><span className="muted">{formatDate(e.at, lang)}</span></span>} value={<strong>{e.delta > 0 ? '+' : ''}{e.delta} {t(cp.pointsUnit)}</strong>} />
            ))}
          </Card>
          <div className="stack">
            <h3>{t(k.redeemTitle)}</h3>
            <span className="muted">{t(k.redeemSub)}</span>
          </div>
          <CouponGrid coupons={redeemable} mode="redeem" redeem={{ balance, onRedeem: redeem }} />
        </>
      )}
    </AccountShell>
  )
}
