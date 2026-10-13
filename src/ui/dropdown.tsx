import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button, IconCircle } from './index'
import { Icon, type IconName } from './icon'

export type DropdownItem = { id: string; label: string; detail?: string; active?: boolean; to?: string; onSelect?: () => void }

// A button that opens a small panel of choices or links under it; closes on a pick, outside click or Escape.
export function DropdownMenu({ trigger, items, footer, variant = 'bar', label, icon }: { trigger: ReactNode; items: DropdownItem[]; footer?: ReactNode; variant?: 'bar' | 'button'; label?: string; icon?: IconName }) {
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
