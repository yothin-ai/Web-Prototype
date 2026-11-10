import { useState, type ReactNode } from 'react'
import { Icon } from './icon'
import './backoffice.css'

// Blocks for a shop's back office. Like everything in src/ui they read tokens only.

export type DataColumn<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  // Give a comparer to let the column be sorted from the header.
  sort?: (a: T, b: T) => number
  // Numbers and amounts line up to the right of the column on a wide screen.
  end?: boolean
}

// A table of records. Below the md breakpoint each row becomes a card, with the column name before each value.
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
      <table role="table">
        <caption className="visually-hidden">{label}</caption>
        <thead role="rowgroup">
          <tr role="row">
            {columns.map((c) => (
              <th key={c.key} role="columnheader" scope="col" className={c.end ? 'data-table__end' : undefined} aria-sort={c.sort ? (c.key === sortKey ? (descending ? 'descending' : 'ascending') : 'none') : undefined}>
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
                <td key={c.key} role="cell" data-label={c.header} className={c.end ? 'data-table__end' : undefined}>{c.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
