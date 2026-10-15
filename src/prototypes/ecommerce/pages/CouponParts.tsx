import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../../../i18n'
import type { IconName } from '../../../ui'
import { Button, Col, CouponCard, Grid, Icon, Modal, Notice } from '../../../ui'
import type { Coupon } from '../../../datasets/types'
import { useSignedIn } from '../account'
import { formatMoney, PROTOTYPE_ID } from '../cart'
import { cp } from '../couponStrings'
import { shortDate, useCouponWallet, walletState } from '../coupons'
import { withQuery } from '../Storefront'
import type { CouponCardState } from '../../../ui'

const iconOf = (c: Coupon): IconName => (c.kind === 'percent' ? 'percent' : c.kind === 'freeship' ? 'truck' : 'ticket')

// A grid of coupon tickets and the details window that opens from one. `shop` shows what can be collected;
// `wallet` shows what the shopper holds and whether it can still be used.
export function CouponGrid({ coupons, mode }: { coupons: Coupon[]; mode: 'shop' | 'wallet' }) {
  const { t, lang } = useLang()
  const { entryOf, claim } = useCouponWallet()
  const [signedIn] = useSignedIn()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [openId, setOpenId] = useState<string | null>(null)
  const base = `/${PROTOTYPE_ID}`
  const open = coupons.find((c) => c.id === openId)

  const doClaim = (c: Coupon) => (signedIn ? claim(c.id) : navigate(`${pathname}${withQuery(search, 'auth', 'login')}`))
  // The state of the ticket, the small status at its corner and the main action of the details window.
  const view = (c: Coupon): { state: CouponCardState; status: React.ReactNode; action?: React.ReactNode } => {
    const e = entryOf(c.id)
    if (e && mode === 'wallet') {
      const state = walletState(c, e)
      if (state === 'ready') {
        const use = c.channel === 'online' ? <Button size="sm" to={`${base}/cart${search}`}>{t(cp.useNow)}</Button> : undefined
        return { state, status: use ?? t(cp.useInStore), action: use }
      }
      return { state, status: t(state === 'used' ? cp.used : cp.expired) }
    }
    if (c.expired) return { state: 'expired', status: t(cp.expired) }
    if (e) return { state: e.used ? 'used' : 'ready', status: t(e.used ? cp.used : cp.claimed) }
    if (c.full) return { state: 'full', status: t(cp.full) }
    return { state: 'ready', status: <Button size="sm" onClick={() => doClaim(c)}>{t(cp.claim)}</Button>, action: <Button onClick={() => doClaim(c)}>{t(cp.claim)}</Button> }
  }

  return (
    <>
      <Grid>
        {coupons.map((c) => {
          const v = view(c)
          return (
            <Col key={c.id} span={{ base: 4, sm: 4, md: 4 }}>
              <CouponCard
                icon={iconOf(c)}
                iconLabel={t(cp.iconLabel)}
                title={t(c.title)}
                condition={`${t(cp.minSpend)} ${formatMoney(c.minSpend, lang)}`}
                validity={`${t(cp.validUntil)} ${shortDate(c.expires, lang)}`}
                badge={c.memberOnly ? t(cp.member) : undefined}
                state={v.state}
                status={v.status}
                onOpen={() => setOpenId(c.id)}
              />
            </Col>
          )
        })}
      </Grid>
      <Modal open={!!open} onClose={() => setOpenId(null)} label={t(cp.detailTitle)} closeLabel={t(cp.closeDetail)}>
        {open && (
          <div className="stack">
            <h2>{t(cp.detailTitle)}</h2>
            <div className="coupon-hero">
              <Icon name={iconOf(open)} size="lg" />
              <span className="coupon-hero__value">{t(open.title)}</span>
              <span className="muted">{t(cp.minSpend)} {formatMoney(open.minSpend, lang)}</span>
            </div>
            <div className="stack">
              <h3>{t(cp.secDetail)}</h3>
              <p>{t(open.detail)}</p>
              <h3>{t(cp.secPeriod)}</h3>
              <p>{shortDate(open.starts, lang)} – {shortDate(open.expires, lang)}</p>
              <h3>{t(cp.secPayment)}</h3>
              <p>{t(cp.payAny)}</p>
              <h3>{t(cp.secTerms)}</h3>
              <ul className="coupon-terms">
                <li>{t(open.channel === 'online' ? cp.termOnline : cp.termStore)}</li>
                <li>{t(cp.termOne)}</li>
                {open.kind === 'freeship' && <li>{t(cp.termParcel)}</li>}
              </ul>
            </div>
            {open.memberOnly && (
              <Notice tone="info">
                {t(cp.memberNote)} <Link to={`${base}/account/club${search}`} onClick={() => setOpenId(null)}>{t(cp.linkClub)}</Link>
              </Notice>
            )}
            {view(open).action}
          </div>
        )}
      </Modal>
    </>
  )
}
