import { Children, useEffect, useState, type ReactNode } from 'react'
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
  // Holds the column at the right edge while the table scrolls sideways (for the ⋯ menu column).
  pin?: boolean
}

const cellClass = (c: { end?: boolean; wrap?: boolean; pin?: boolean }) => [c.end && 'data-table__end', c.wrap && 'data-table__wrap', c.pin && 'data-table__pin'].filter(Boolean).join(' ') || undefined

// The words of the page bar under a table; the table holds no text of its own.
export type PagingLabels = {
  nav: string
  prev: string
  next: string
  perPage: string
  page: (n: number) => string
  summary: (from: number, to: number, total: number) => string
}

const ROW_CHOICES = [10, 25, 50]

// The page numbers to show: the first, the last and the ones around the current page, with a gap (null) where numbers are left out.
function pageList(current: number, count: number): (number | null)[] {
  const keep = new Set([1, count, current - 1, current, current + 1].filter((n) => n >= 1 && n <= count))
  const out: (number | null)[] = []
  let last = 0
  for (const n of [...keep].sort((a, b) => a - b)) {
    if (n - last > 1) out.push(null)
    out.push(n)
    last = n
  }
  return out
}

// A table of records. It always keeps every column: on a narrow screen the table scrolls sideways inside its frame, with the first column held in place.
// Give `pageSize` and `paging` to split a long table into pages: the rows are sorted first and then cut, and the table goes back to page 1 when its rows change.
export function DataTable<T>({ label, columns, rows, rowKey, empty, pageSize, paging }: { label: string; columns: DataColumn<T>[]; rows: T[]; rowKey: (row: T) => string; empty: string; pageSize?: number; paging?: PagingLabels }) {
  const [sortKey, setSortKey] = useState('')
  const [descending, setDescending] = useState(false)
  const [size, setSize] = useState(pageSize ?? 0)
  const [page, setPage] = useState(1)
  const sorter = columns.find((c) => c.key === sortKey)?.sort
  const shown = sorter ? [...rows].sort((a, b) => (descending ? sorter(b, a) : sorter(a, b))) : rows
  const paged = !!pageSize && !!paging && size > 0
  const count = paged ? Math.max(1, Math.ceil(shown.length / size)) : 1
  const current = Math.min(page, count)
  const visible = paged ? shown.slice((current - 1) * size, current * size) : shown
  const firstKey = rows.length ? rowKey(rows[0]) : ''
  useEffect(() => setPage(1), [rows.length, firstKey])
  const toggle = (key: string) => {
    setPage(1)
    if (key === sortKey) setDescending(!descending)
    else {
      setSortKey(key)
      setDescending(false)
    }
  }
  const choices = [...new Set([...ROW_CHOICES, pageSize ?? 0])].filter((n) => n > 0).sort((a, b) => a - b)
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
          {visible.map((row) => (
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
      {paged && paging && shown.length > 0 && (
        <div className="data-table__pager">
          <p className="muted" role="status">{paging.summary((current - 1) * size + 1, Math.min(current * size, shown.length), shown.length)}</p>
          <label className="data-table__size">
            <span className="muted">{paging.perPage}</span>
            <select className="field__input field__select" value={size} onChange={(e) => { setSize(Number(e.target.value)); setPage(1) }}>
              {choices.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          {count > 1 && (
            <nav aria-label={paging.nav} className="data-table__pages">
              <button type="button" className="data-table__page" disabled={current === 1} onClick={() => setPage(current - 1)}>{paging.prev}</button>
              {pageList(current, count).map((n, i) => (n === null ? <span key={`gap-${i}`} className="data-table__gap" aria-hidden="true">…</span> : <button key={n} type="button" className="data-table__page" aria-label={paging.page(n)} aria-current={n === current ? 'page' : undefined} onClick={() => setPage(n)}>{n}</button>))}
              <button type="button" className="data-table__page" disabled={current === count} onClick={() => setPage(current + 1)}>{paging.next}</button>
            </nav>
          )}
        </div>
      )}
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
