import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button, Field, IconCircle } from './index'

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

// The account menu: a column beside the page on wide screens, a scrolling row on narrow ones.
export function AccountNav({ label, items }: { label: string; items: { to: string; label: string; active: boolean }[] }) {
  return (
    <nav className="account-nav" aria-label={label}>
      {items.map((item) => (
        <Link key={item.to} to={item.to} className="account-nav__link" aria-current={item.active ? 'page' : undefined}>
          <IconCircle size="sm" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
