import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent as ReactKeyEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button, IconCircle } from './index'
import { Icon, type IconName } from './icon'

export type DropdownItem = {
  id: string
  label: string
  detail?: string
  active?: boolean
  to?: string
  onSelect?: () => void
  // For the 'actions' menu: an icon before the label, a red look for a risky action, and a line drawn above the item.
  icon?: IconName
  danger?: boolean
  separator?: boolean
}

// The small panel of actions that opens from a ⋯ button at the end of a table row. It is placed with fixed coordinates taken from the button when it opens,
// so a table that scrolls sideways does not cut it off; it opens upward when there is no room below and closes when the page scrolls.
function ActionMenu({ items, label }: { items: DropdownItem[]; label: string }) {
  const [open, setOpen] = useState(false)
  const [place, setPlace] = useState<{ top?: number; bottom?: number; right: number } | null>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const panelId = useId()

  const show = () => {
    const r = trigger.current?.getBoundingClientRect()
    if (!r) return
    const right = Math.max(8, document.documentElement.clientWidth - r.right)
    // The panel is not measured yet; a menu needs about this much room, so a button near the bottom edge opens it upward.
    const room = window.innerHeight - r.bottom
    setPlace(room < items.length * 48 + 24 ? { bottom: window.innerHeight - r.top + 4, right } : { top: r.bottom + 4, right })
    setOpen(true)
  }
  const close = useCallback((refocus: boolean) => {
    setOpen(false)
    if (refocus) trigger.current?.focus()
  }, [])

  useEffect(() => {
    if (open) panel.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
  }, [open])
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!panel.current?.contains(e.target as Node) && !trigger.current?.contains(e.target as Node)) setOpen(false)
    }
    const away = () => setOpen(false)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('scroll', away, true)
    window.addEventListener('resize', away)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('scroll', away, true)
      window.removeEventListener('resize', away)
    }
  }, [open])

  const onKey = (e: ReactKeyEvent<HTMLDivElement>) => {
    const nodes = [...(panel.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])]
    const at = nodes.indexOf(document.activeElement as HTMLElement)
    const go = (i: number) => { e.preventDefault(); nodes[(i + nodes.length) % nodes.length]?.focus() }
    if (e.key === 'ArrowDown') go(at + 1)
    else if (e.key === 'ArrowUp') go(at - 1)
    else if (e.key === 'Home') go(0)
    else if (e.key === 'End') go(nodes.length - 1)
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true) }
    else if (e.key === 'Tab') close(false)
  }
  const onTriggerKey = (e: ReactKeyEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); show() }
  }
  const pick = (item: DropdownItem) => {
    close(!item.to)
    item.onSelect?.()
  }

  return (
    <div className="row-menu">
      <button type="button" ref={trigger} className="row-menu__trigger" aria-label={label} aria-haspopup="menu" aria-expanded={open} aria-controls={open ? panelId : undefined} onClick={() => (open ? close(false) : show())} onKeyDown={onTriggerKey}>
        <Icon name="more" size="md" />
      </button>
      {open && place && (
        <div className="row-menu__panel" id={panelId} ref={panel} role="menu" aria-label={label} style={{ top: place.top, bottom: place.bottom, right: place.right }} onKeyDown={onKey}>
          {items.map((item) => {
            const body = (
              <>
                {item.icon && <Icon name={item.icon} size="sm" />}
                <span>{item.label}</span>
              </>
            )
            const cls = `row-menu__item${item.danger ? ' row-menu__item--danger' : ''}`
            return (
              <div key={item.id} role="none" className={item.separator ? 'row-menu__separator' : undefined}>
                {item.to ? (
                  <Link to={item.to} role="menuitem" className={cls} onClick={() => pick(item)}>{body}</Link>
                ) : (
                  <button type="button" role="menuitem" className={cls} onClick={() => pick(item)}>{body}</button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// A button that opens a small panel of choices or links under it; closes on a pick, outside click or Escape.
export function DropdownMenu({ trigger, items, footer, variant = 'bar', label, icon }: { trigger?: ReactNode; items: DropdownItem[]; footer?: ReactNode; variant?: 'bar' | 'button' | 'actions'; label?: string; icon?: IconName }) {
  if (variant === 'actions') return <ActionMenu items={items} label={label ?? ''} />
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const panel = useRef<HTMLDivElement>(null)
  const [shift, setShift] = useState(0)
  // Slide the panel back on screen when opening it would push it past the right edge.
  useLayoutEffect(() => {
    if (!open || !panel.current) return setShift(0)
    const edge = panel.current.getBoundingClientRect().right + shift
    const room = document.documentElement.clientWidth - 16
    setShift(edge > room ? edge - room : 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open])
  const pick = (item: DropdownItem) => { item.onSelect?.(); setOpen(false) }
  return (
    <div className="dropdown" ref={root}>
      {variant === 'button' ? (
        <Button variant="secondary" size="sm" aria-expanded={open} aria-controls={panelId} aria-label={label} onClick={() => setOpen(!open)}>{trigger}</Button>
      ) : (
        <button type="button" className="dropdown__trigger" aria-expanded={open} aria-controls={panelId} aria-label={label} onClick={() => setOpen(!open)}>
          <IconCircle size="sm" tone="muted" icon={icon} />{trigger}<Icon name="down" size="sm" />
        </button>
      )}
      {open && (
        <div className="dropdown__panel" id={panelId} ref={panel} style={shift ? { transform: `translateX(-${shift}px)` } : undefined}>
          {items.map((item) => {
            const body = (
              <>
                <strong>{item.label}</strong>
                {item.detail && <span className="muted">{item.detail}</span>}
              </>
            )
            return item.to ? (
              <Link key={item.id} to={item.to} className="dropdown__item" aria-current={item.active ? 'true' : undefined} onClick={() => pick(item)}>{body}</Link>
            ) : (
              <button key={item.id} type="button" className="dropdown__item" aria-current={item.active ? 'true' : undefined} onClick={() => pick(item)}>{body}</button>
            )
          })}
          {footer && <div className="dropdown__footer" onClick={() => setOpen(false)}>{footer}</div>}
        </div>
      )}
    </div>
  )
}

// One store in the store finder: name, address, opening hours and a button to choose it.
export function BranchCard({ name, address, hours, province, selected, selectedLabel, chooseLabel, onChoose }: { name: string; address: string; hours: string; province: string; selected: boolean; selectedLabel: string; chooseLabel: string; onChoose: () => void }) {
  return (
    <div className="store-card">
      <IconCircle size="lg" icon="store" />
      <div className="store-card__body">
        <strong>{name}</strong>
        <span className="muted">{address}</span>
        <span className="muted">{hours}</span>
        <span className="row"><span className="badge">{province}</span>{selected && <span className="badge badge--success">{selectedLabel}</span>}</span>
      </div>
      {!selected && <Button variant="secondary" size="sm" onClick={onChoose}>{chooseLabel}</Button>}
    </div>
  )
}
