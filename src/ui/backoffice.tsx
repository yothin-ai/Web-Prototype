import { Children, useState, type ReactNode } from 'react'
import { Icon } from './icon'
import './backoffice.css'

// Blocks for a shop's back office. Like everything in src/ui they read tokens only.

export type DataColumn<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  // Give a comparer to let the column be sorted from the header.
  sort?: (a: T, b: T) => number
  // Numbers and amounts line up to the right of the column.
  end?: boolean
  // Long text (a name, an address, a note) may break into lines; every other column stays on one line.
  wrap?: boolean
}

const cellClass = (c: { end?: boolean; wrap?: boolean }) => [c.end && 'data-table__end', c.wrap && 'data-table__wrap'].filter(Boolean).join(' ') || undefined

// A table of records. It always keeps every column: on a narrow screen the table scrolls sideways inside its frame, with the first column held in place.
export function DataTable<T>({ label, columns, rows, rowKey, empty }: { label: string; columns: DataColumn<T>[]; rows: T[]; rowKey: (row: T) => string; empty: string }) {
  const [sortKey, setSortKey] = useState('')
  const [descending, setDescending] = useState(false)
  const sorter = columns.find((c) => c.key === sortKey)?.sort
  const shown = sorter ? [...rows].sort((a, b) => (descending ? sorter(b, a) : sorter(a, b))) : rows
  const toggle = (key: string) => {
    if (key === sortKey) setDescending(!descending)
    else {
      setSortKey(key)
      setDescending(false)
    }
  }
  return (
    <div className="data-table">
      <div className="data-table__scroll" role="region" aria-label={label} tabIndex={0}>
      <table role="table">
        <caption className="visually-hidden">{label}</caption>
        <thead role="rowgroup">
          <tr role="row">
            {columns.map((c) => (
              <th key={c.key} role="columnheader" scope="col" className={cellClass(c)} aria-sort={c.sort ? (c.key === sortKey ? (descending ? 'descending' : 'ascending') : 'none') : undefined}>
                {c.sort ? (
                  <button type="button" className="data-table__sort" onClick={() => toggle(c.key)}>
                    {c.header}
                    {c.key === sortKey && <Icon name={descending ? 'down' : 'up'} size="sm" />}
                  </button>
                ) : c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {shown.map((row) => (
            <tr key={rowKey(row)} role="row">
              {columns.map((c) => (
                <td key={c.key} role="cell" className={cellClass(c)}>{c.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {shown.length === 0 && <p className="data-table__empty muted">{empty}</p>}
    </div>
  )
}

// Bars side by side, each as tall as its value against the largest one, with the value above and the name below.
export function BarChart({ label, items }: { label: string; items: { label: string; value: number; text: string }[] }) {
  const top = Math.max(1, ...items.map((i) => i.value))
  return (
    <figure className="bar-chart" aria-label={label}>
      <ul className="bar-chart__bars">
        {items.map((item) => (
          <li key={item.label} className="bar-chart__item">
            <span className="bar-chart__value">{item.text}</span>
            <span className="bar-chart__track" aria-hidden="true">
              <span className="bar-chart__bar" style={{ height: `${Math.max(2, Math.round((item.value / top) * 100))}%` }} />
            </span>
            <span className="bar-chart__label">{item.label}</span>
          </li>
        ))}
      </ul>
    </figure>
  )
}

// Cards in a row. The number of columns follows the width of the space the grid sits in (not the window), cards in a row are as tall as the tallest, and a count that would leave one card alone on the last row (4 cards in 3 columns) drops to a count that fills it.
// size is the narrowest a card may get: small for numbers, medium for lists, large for forms and tables.
export function CardGrid({ size = 'medium', children }: { size?: 'small' | 'medium' | 'large'; children: ReactNode }) {
  const count = Children.toArray(children).length
  return (
    <div className={`card-grid card-grid--${size}`}>
      <div className="card-grid__list" data-count={count > 40 ? "many" : count}>{children}</div>
    </div>
  )
}
