import type { ReactNode } from 'react'

// The top of every back office page: the title, a line under it (with how many records, where that helps) and the page's buttons.
export function PageHead({ title, text, actions }: { title: string; text: string; actions?: ReactNode }) {
  return (
    <div className="row">
      <div className="stack row__grow">
        <h1>{title}</h1>
        <p className="muted">{text}</p>
      </div>
      {actions && <div className="row">{actions}</div>}
    </div>
  )
}
