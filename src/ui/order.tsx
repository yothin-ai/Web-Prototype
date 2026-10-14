import type { ReactNode } from 'react'
import { Badge, Icon, IconCircle, type IconName } from './index'

// A short order in the list: number and status, date, size, total, a row of pictures and the actions.
export function OrderCard({ id, status, statusTone, sampleLabel, date, size, totalLabel, total, thumbs, actions }: {
  id: string
  status: string
  statusTone?: 'success' | 'warning'
  sampleLabel?: string
  date: string
  size: string
  totalLabel: string
  total: string
  thumbs: ReactNode
  actions: ReactNode
}) {
  return (
    <div className="order-card">
      <div className="order-card__head">
        <div className="order-card__title">
          <div className="row"><strong>{id}</strong><Badge tone={statusTone}>{status}</Badge>{sampleLabel && <Badge>{sampleLabel}</Badge>}</div>
          <span className="muted"><Icon name="clock" size="sm" /> {date} · {size}</span>
        </div>
        <div className="order-card__total"><span className="muted">{totalLabel}</span><strong>{total}</strong></div>
      </div>
      <div className="order-card__thumbs">{thumbs}</div>
      <div className="order-card__actions">{actions}</div>
    </div>
  )
}

export type TimelineStep = { label: string; state: 'done' | 'current' | 'todo' | 'cancelled'; icon: IconName }

// The steps of an order down a line: finished ones are filled, the current one is ringed.
export function OrderTimeline({ label, steps }: { label: string; steps: TimelineStep[] }) {
  return (
    <ol className="order-timeline" aria-label={label}>
      {steps.map((step, i) => (
        <li key={i} className={`order-timeline__step order-timeline__step--${step.state}`} aria-current={step.state === 'current' ? 'step' : undefined}>
          <span className="order-timeline__dot"><Icon name={step.icon} /></span>
          <span className="order-timeline__label">{step.label}</span>
        </li>
      ))}
    </ol>
  )
}

// The band that tops an order page: where it stands, in words, with its number and date.
export function StatusHeader({ icon, kicker, title, text, orderLabel, orderId, date, tone = 'progress' }: {
  icon: IconName
  kicker: string
  title: string
  text: string
  orderLabel: string
  orderId: string
  date: string
  tone?: 'progress' | 'done' | 'danger'
}) {
  return (
    <div className={`status-header status-header--${tone}`}>
      <IconCircle size="lg" icon={icon} />
      <div className="status-header__text">
        <span className="status-header__kicker">{kicker}</span>
        <h2>{title}</h2>
        <span className="muted">{text}</span>
      </div>
      <div className="status-header__order">
        <span className="muted">{orderLabel}</span>
        <strong>{orderId}</strong>
        <span className="muted">{date}</span>
      </div>
    </div>
  )
}
