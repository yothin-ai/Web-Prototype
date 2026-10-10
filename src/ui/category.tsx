import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button, Checkbox, IconCircle } from './index'

// A wide card for a subcategory: picture, name, a line of what is inside and a "shop now" button.
export function CategoryCard({ title, text, actionLabel, to, thumb }: { title: string; text: string; actionLabel: string; to: string; thumb: ReactNode }) {
  return (
    <div className="category-card">
      <div className="category-card__media">{thumb}</div>
      <div className="category-card__body">
        <h3>{title}</h3>
        {text && <p className="muted">{text}</p>}
        <div className="category-card__action"><Button to={to} size="sm">{actionLabel} ›</Button></div>
      </div>
    </div>
  )
}

// A small card for one item inside a subcategory: picture above, name below.
export function CategoryTile({ title, to, thumb }: { title: string; to: string; thumb: ReactNode }) {
  return (
    <Link to={to} className="category-tile-link">
      {thumb}
      <strong>{title}</strong>
    </Link>
  )
}

// A row of rounded links to the other items at the same level; the active one is filled.
export function CategoryPills({ label, items }: { label: string; items: { label: string; to: string; active: boolean }[] }) {
  return (
    <nav className="category-pills" aria-label={label}>
      {items.map((item) => (
        <Link key={item.to} to={item.to} className="category-pills__link" aria-current={item.active ? 'page' : undefined}>
          <IconCircle size="sm" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}

// A filter group that folds open and shut: a title and a tick box for each option, with its count.
export function FilterGroup({ title, options, onToggle }: { title: string; options: { id: string; label: string; count: number; checked: boolean }[]; onToggle: (id: string) => void }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="filter-group">
      <button type="button" className="filter-group__head" aria-expanded={open} onClick={() => setOpen(!open)}>
        <strong>{title}</strong>
        <span aria-hidden="true">{open ? '⌃' : '⌄'}</span>
      </button>
      {open && (
        <div className="filter-group__body">
          {options.map((o) => <Checkbox key={o.id} checked={o.checked} onChange={() => onToggle(o.id)} label={`${o.label} (${o.count})`} />)}
        </div>
      )}
    </div>
  )
}
