import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, Field, IconCircle, ProgressBar } from './index'

type SettingRowProps = {
  label: string
  value?: string
  emptyText: string
  actionLabel: string
  saveLabel: string
  cancelLabel: string
  locked?: ReactNode
  inputType?: string
  inputMode?: 'text' | 'tel' | 'email' | 'numeric'
  validate?: (value: string) => string | undefined
  onSave?: (value: string) => void
}

// One line of account data: label, value and a button that turns the value into an input.
export function SettingRow({ label, value, emptyText, actionLabel, saveLabel, cancelLabel, locked, inputType, inputMode, validate, onSave }: SettingRowProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [tried, setTried] = useState(false)
  const problem = tried ? validate?.(draft) : undefined
  const open = () => { setDraft(value ?? ''); setTried(false); setEditing(true) }
  const save = () => {
    setTried(true)
    if (validate?.(draft)) return
    onSave?.(draft.trim())
    setEditing(false)
  }
  return (
    <div className="setting-row">
      <IconCircle size="md" />
      <div className="setting-row__body">
        <span className="muted">{label}</span>
        {editing ? (
          <div className="stack">
            <Field label={label} type={inputType} inputMode={inputMode} value={draft} hint={problem} aria-invalid={!!problem} onChange={(e) => setDraft(e.target.value)} />
            <div className="row"><Button size="sm" onClick={save}>{saveLabel}</Button><Button size="sm" variant="ghost" onClick={() => setEditing(false)}>{cancelLabel}</Button></div>
          </div>
        ) : value ? <strong>{value}</strong> : <strong className="setting-row__empty">{emptyText}</strong>}
      </div>
      {!editing && (locked ?? <Button size="sm" variant="secondary" onClick={open}>{actionLabel}</Button>)}
    </div>
  )
}

type NavItem = { to: string; label: string; active: boolean }

// The account menu: a profile summary on top, then links in titled groups.
export function AccountSidebar({ name, email, badge, groups, logoutLabel, onLogout, always }: {
  name: string
  email: string
  badge: string
  groups: { title: string; items: NavItem[] }[]
  logoutLabel: string
  onLogout: () => void
  always?: boolean
}) {
  return (
    <aside className={`account-sidebar${always ? ' account-sidebar--always' : ''}`}>
      <div className="account-sidebar__who">
        <span className="account-avatar" aria-hidden="true">{Array.from(name)[0]}</span>
        <strong>{name}</strong>
        <span className="muted">{email}</span>
        <Badge tone="warning">{badge}</Badge>
      </div>
      <nav className="account-sidebar__nav">
        {groups.map((g) => (
          <div key={g.title} className="account-sidebar__group">
            <span className="account-sidebar__title">{g.title}</span>
            {g.items.map((item) => (
              <Link key={item.to} to={item.to} className="account-sidebar__link" aria-current={item.active ? 'page' : undefined}>
                <IconCircle size="sm" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <button type="button" className="account-sidebar__logout" onClick={onLogout}>
        <IconCircle size="sm" tone="muted" />
        <span>{logoutLabel}</span>
      </button>
    </aside>
  )
}

// A membership banner: tier, points and how far the next tier is.
export function MemberBanner({ tier, points, pointsLabel, progress, progressText, progressLabel, perksLabel, action }: {
  tier: string
  points: string
  pointsLabel: string
  progress: number
  progressText: string
  progressLabel: string
  perksLabel: string
  action: ReactNode
}) {
  return (
    <div className="member-banner">
      <div className="member-banner__top">
        <span className="member-banner__tier">{tier}</span>
        <div className="member-banner__points"><strong>{points}</strong><span>{pointsLabel}</span></div>
        <div className="member-banner__progress">
          <div className="row"><span className="row__grow">{progressText}</span><strong>{Math.round(progress)}%</strong></div>
          <ProgressBar value={progress} label={progressLabel} />
        </div>
      </div>
      <div className="member-banner__foot"><strong className="row__grow">{perksLabel}</strong>{action}</div>
    </div>
  )
}

// One headline number with a caption and a note under it.
export function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="stat-card">
      <span className="stat-card__label"><IconCircle size="sm" />{label}</span>
      <strong className="stat-card__value">{value}</strong>
      <span className="muted">{note}</span>
    </div>
  )
}

// A phone-width tab bar fixed to the bottom edge; hidden from the md breakpoint up unless `inline` (for the Moodboard).
export function BottomTabBar({ label, items, inline }: { label: string; items: NavItem[]; inline?: boolean }) {
  return (
    <nav className={`bottom-tabs${inline ? ' bottom-tabs--inline' : ''}`} aria-label={label}>
      {items.map((item) => (
        <Link key={item.to + item.label} to={item.to} className="bottom-tabs__link" aria-current={item.active ? 'page' : undefined}>
          <IconCircle size="sm" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
