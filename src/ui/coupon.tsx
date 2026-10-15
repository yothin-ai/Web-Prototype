import type { ReactNode } from 'react'
import { Badge } from './index'
import type { IconName } from './icon'
import { IconCircle } from './storefront'
import './ui.css'

export type CouponCardState = 'ready' | 'used' | 'expired' | 'full'

// A coupon drawn as a ticket: a notch on each side, an icon block on the left, the value and its terms on the right.
// The whole ticket opens the details (`onOpen`); `status` is the small text or button at the bottom right.
export function CouponCard({ icon, iconLabel, title, condition, validity, badge, status, state = 'ready', onOpen }: {
  icon: IconName
  iconLabel: string
  title: string
  condition: string
  validity: string
  badge?: string
  status?: ReactNode
  state?: CouponCardState
  onOpen: () => void
}) {
  return (
    <div className={`coupon-card${state === 'ready' ? '' : ` coupon-card--${state}`}`}>
      <span className="coupon-card__badge">
        <IconCircle size="md" icon={icon} />
        <span>{iconLabel}</span>
      </span>
      <div className="coupon-card__main">
        <div className="coupon-card__top">
          <button type="button" className="coupon-card__open" onClick={onOpen}>{title}</button>
          {badge && <Badge>{badge}</Badge>}
        </div>
        <span className="muted">{condition}</span>
        <div className="coupon-card__foot">
          <span className="muted coupon-card__validity">{validity}</span>
          {status && <span className="coupon-card__status">{status}</span>}
        </div>
      </div>
    </div>
  )
}
