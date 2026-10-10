import type { ReactNode, SelectHTMLAttributes } from 'react'

// "Step 2 of 3": a small pill that tells a shopper where they are in a flow.
export function StepPill({ step, label, progress }: { step: number; label: string; progress: string }) {
  return (
    <span className="step-pill">
      <strong className="step-pill__num">{step}</strong>
      <span>{label}</span>
      <span className="step-pill__progress">{progress}</span>
    </span>
  )
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
  hint?: string
}

export function Select({ label, options, placeholder, hint, id, ...rest }: SelectProps) {
  const selectId = id ?? `select-${label}`
  return (
    <div className="field">
      <label className="field__label" htmlFor={selectId}>{label}</label>
      <select id={selectId} className="field__input field__select" {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  )
}

type SwitchProps = { checked: boolean; onChange: (checked: boolean) => void; label: string; description?: string }

// A labelled on/off switch with a description line.
export function Switch({ checked, onChange, label, description }: SwitchProps) {
  return (
    <div className="switch-row">
      <span className="switch-row__text">
        <strong>{label}</strong>
        {description && <span className="muted">{description}</span>}
      </span>
      <button type="button" role="switch" aria-checked={checked} aria-label={label} className="switch" onClick={() => onChange(!checked)}>
        <span className="switch__thumb" />
      </button>
    </div>
  )
}

type NoticeProps = { tone?: 'info' | 'success' | 'error'; title?: string; children?: ReactNode }

// A framed message: information, good news or an error that needs fixing.
export function Notice({ tone = 'info', title, children }: NoticeProps) {
  return (
    <div className={`notice notice--${tone}`} role={tone === 'error' ? 'alert' : undefined}>
      {title && <strong className="notice__title">{title}</strong>}
      {children && <div className="notice__body">{children}</div>}
    </div>
  )
}

// A tick box with a label, for a yes/no choice inside a form.
export function Checkbox({ checked, onChange, label, disabled }: { checked: boolean; onChange: (checked: boolean) => void; label: string; disabled?: boolean }) {
  return (
    <label className="checkbox">
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  )
}
