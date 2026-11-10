import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'

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
      <div className="field__select-wrap">
        <select id={selectId} className="field__input field__select" {...rest}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  )
}

export type SearchOption = { value: string; label: string; // Extra words that also match what is typed, such as a product code.
  keywords?: string }

type SearchSelectProps = {
  label: string
  options: SearchOption[]
  value: string
  onChange: (value: string) => void
  id?: string
  placeholder?: string
  hint?: string
  invalid?: boolean
  disabled?: boolean
  // The words around the search: the hint inside the search box, the line when nothing matches, and the count read out after each search.
  searchPlaceholder: string
  emptyText: string
  countText: (count: number) => string
}

// A choice from a long list: it opens a list with a search box on top, and what is typed narrows the list. Same look as Select.
// Arrow keys move, Enter picks, Escape closes; it reads out as a combobox with a listbox.
export function SearchSelect({ label, options, value, onChange, id, placeholder, hint, invalid, disabled, searchPlaceholder, emptyText, countText }: SearchSelectProps) {
  const auto = useId()
  const triggerId = id ?? `ss-${auto}`
  const listId = `${triggerId}-list`
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const search = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)

  // With a placeholder the first row clears the choice, so the field can be emptied again.
  const all = useMemo(() => (placeholder ? [{ value: '', label: placeholder } as SearchOption, ...options.filter((o) => o.value !== '')] : options), [options, placeholder])
  const needle = query.trim().toLowerCase()
  const shown = useMemo(() => (needle ? all.filter((o) => `${o.label} ${o.keywords ?? ''}`.toLowerCase().includes(needle)) : all), [all, needle])
  const chosen = all.find((o) => o.value === value)

  const openList = () => {
    setQuery('')
    setActive(Math.max(0, all.findIndex((o) => o.value === value)))
    setOpen(true)
  }
  const close = (refocus: boolean) => {
    setOpen(false)
    if (refocus) trigger.current?.focus()
  }
  const pick = (o: SearchOption) => {
    onChange(o.value)
    close(true)
  }

  useEffect(() => {
    if (open) search.current?.focus()
  }, [open])
  useEffect(() => {
    if (!open) return
    const outside = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', outside)
    return () => document.removeEventListener('mousedown', outside)
  }, [open])
  // Keep the active row in view while the arrow keys move.
  useEffect(() => {
    if (open) list.current?.querySelector('[aria-selected="true"][data-active="true"], [data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active, open, shown])

  const move = (to: number) => setActive(shown.length === 0 ? 0 : Math.min(shown.length - 1, Math.max(0, to)))
  const onSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(active + 1) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(active - 1) }
    else if (e.key === 'Home') { e.preventDefault(); move(0) }
    else if (e.key === 'End') { e.preventDefault(); move(shown.length - 1) }
    else if (e.key === 'Enter') { e.preventDefault(); if (shown[active]) pick(shown[active]) }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true) }
    else if (e.key === 'Tab') setOpen(false)
  }
  const onTriggerKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); openList() }
  }
  const optionId = (i: number) => `${listId}-${i}`

  return (
    <div className="field">
      <label className="field__label" htmlFor={triggerId}>{label}</label>
      <div className="search-select" ref={root}>
        <button
          type="button"
          id={triggerId}
          ref={trigger}
          className="field__input search-select__trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-invalid={invalid || undefined}
          disabled={disabled}
          onClick={() => (open ? close(false) : openList())}
          onKeyDown={onTriggerKey}
        >
          <span className={chosen && chosen.value !== '' ? undefined : 'search-select__placeholder'}>{chosen ? chosen.label : (placeholder ?? '')}</span>
        </button>
        {open && (
          <div className="search-select__panel">
            <input
              ref={search}
              type="search"
              role="combobox"
              className="field__input search-select__search"
              aria-label={label}
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={shown[active] ? optionId(active) : undefined}
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActive(0) }}
              onKeyDown={onSearchKey}
            />
            <ul id={listId} ref={list} role="listbox" aria-label={label} className="search-select__list">
              {shown.map((o, i) => (
                <li key={o.value} id={optionId(i)} role="option" aria-selected={o.value === value} data-active={i === active} className="search-select__option" onMouseEnter={() => setActive(i)} onClick={() => pick(o)}>{o.label}</li>
              ))}
            </ul>
            {shown.length === 0 && <p className="search-select__empty muted">{emptyText}</p>}
            <div className="visually-hidden" role="status">{countText(shown.length)}</div>
          </div>
        )}
      </div>
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  )
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string }

// A labelled box for text that runs over several lines (a review, a note). Same look as Field; it grows taller by dragging.
export function Textarea({ label, hint, id, rows = 4, ...rest }: TextareaProps) {
  const areaId = id ?? `textarea-${label}`
  return (
    <div className="field">
      <label className="field__label" htmlFor={areaId}>{label}</label>
      <textarea id={areaId} className="field__input field__textarea" rows={rows} {...rest} />
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

// A tick box with a label, for a yes/no choice inside a form. `bare` keeps the label for screen readers only.
export function Checkbox({ checked, onChange, label, disabled, bare }: { checked: boolean; onChange: (checked: boolean) => void; label: string; disabled?: boolean; bare?: boolean }) {
  return (
    <label className={`checkbox${bare ? ' checkbox--bare' : ''}`}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  )
}
