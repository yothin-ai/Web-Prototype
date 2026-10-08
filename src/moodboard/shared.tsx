import type { ReactNode } from 'react'
import { Badge } from '../ui'

export function Chapter({ id, number, title, tag, children }: { id: string; number: string; title: string; tag?: string; children: ReactNode }) {
  return (
    <section id={id} className="mb-chapter">
      <header className="mb-chapter__head">
        <span className="mb-chapter__kicker">CHAPTER {number}</span>
        <h2>{title}</h2>
        {tag && <span className="mb-chapter__tag">{tag}</span>}
      </header>
      <div className="mb-chapter__body">{children}</div>
    </section>
  )
}

export function Block({ number, title, tag, note, children }: { number: string; title: string; tag?: string; note?: string; children: ReactNode }) {
  return (
    <div className="mb-block">
      <div className="mb-block__head">
        <h3><span className="mb-block__number">{number}</span> {title}</h3>
        {tag && <Badge>{tag}</Badge>}
      </div>
      {note && <p className="muted">{note}</p>}
      {children}
    </div>
  )
}

export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="mb-table-wrap"><table className="mb-table">{children}</table></div>
}
