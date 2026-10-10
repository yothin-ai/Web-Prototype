import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { tokens } from '../tokens/tokens'

export type MegaNode = { label: string; children?: MegaNode[] }

type MegaMenuProps = {
  id?: string
  nodes: MegaNode[]
  title: string
  viewAllLabel: string
  backLabel: string
  emptyText: string
  // `path` holds the picked item's position at each level, e.g. [2, 0, 5] for the sixth item of the first subcategory of the third category.
  onSelect: (label: string, path: number[]) => void
  onClose?: () => void
}

const initial = (label: string) => Array.from(label).find((c) => /\p{L}/u.test(c) && !'เแโใไ'.includes(c)) ?? ''

// A three-level category panel. Wide: three columns that follow the pointer or keyboard focus.
// Narrow: one column at a time, drilling in with a back button.
export function MegaMenu({ id, nodes, title, viewAllLabel, backLabel, emptyText, onSelect, onClose }: MegaMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [a1, setA1] = useState(0)
  const [a2, setA2] = useState(0)
  const [level, setLevel] = useState(0)
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.innerWidth < tokens.breakpoint.sm)

  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => {
      const next = el.clientWidth < tokens.breakpoint.sm
      setNarrow((prev) => {
        if (prev !== next) setLevel(0)
        return next
      })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const cat = nodes[a1]
  const sub = cat?.children?.[a2]
  const leaves = sub?.children ?? []

  const preview1 = (i: number) => {
    if (narrow || i === a1) return
    setA1(i)
    setA2(0)
  }
  const preview2 = (j: number) => {
    if (!narrow) setA2(j)
  }

  const pick1 = (i: number) => {
    const node = nodes[i]
    if (narrow && node.children?.length) {
      setA1(i)
      setA2(0)
      setLevel(1)
    } else onSelect(node.label, [i])
  }
  const pick2 = (j: number) => {
    const node = cat.children?.[j]
    if (!node) return
    if (narrow && node.children?.length) {
      setA2(j)
      setLevel(2)
    } else onSelect(node.label, [a1, j])
  }

  // Arrow keys move within a column; right and left move between columns.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose?.()
      return
    }
    const target = e.target as HTMLElement
    const col = target.closest<HTMLElement>('[data-col]')
    if (!col || !['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return
    const colIndex = Number(col.dataset.col)
    const items = Array.from(col.querySelectorAll<HTMLElement>('[data-item]'))
    const at = items.indexOf(target)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      items[(at + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length]?.focus()
    } else if (e.key === 'ArrowRight' && !narrow) {
      e.preventDefault()
      rootRef.current?.querySelector<HTMLElement>(`[data-col="${colIndex + 1}"] [data-item]`)?.focus()
    } else if (e.key === 'ArrowLeft' && !narrow && colIndex > 0) {
      e.preventDefault()
      rootRef.current?.querySelector<HTMLElement>(`[data-col="${colIndex - 1}"] [data-item].is-active`)?.focus()
    }
  }

  if (!cat) return null

  return (
    <div ref={rootRef} id={id} className="mega-menu" data-narrow={narrow ? 'true' : undefined} data-level={level} onKeyDown={onKeyDown}>
      <div className="mega-menu__col" data-col="0">
        <p className="mega-menu__title">{title}</p>
        <ul className="mega-menu__list">
          {nodes.map((n, i) => (
            <li key={n.label}>
              <button
                type="button"
                data-item
                className={`mega-menu__item${i === a1 ? ' is-active' : ''}`}
                onMouseEnter={() => preview1(i)}
                onFocus={() => preview1(i)}
                onClick={() => pick1(i)}
              >
                <span>{n.label}</span>
                {n.children?.length ? <span aria-hidden="true">›</span> : null}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mega-menu__col" data-col="1">
        <button type="button" className="mega-menu__back" onClick={() => setLevel(0)}>← {backLabel}</button>
        <div className="mega-menu__head">
          <strong>{cat.label}</strong>
          <button type="button" className="mega-menu__all" onClick={() => onSelect(cat.label, [a1])}>{viewAllLabel} →</button>
        </div>
        <ul className="mega-menu__list">
          {(cat.children ?? []).map((n, j) => (
            <li key={n.label}>
              <button
                type="button"
                data-item
                className={`mega-menu__item${j === a2 ? ' is-active' : ''}`}
                onMouseEnter={() => preview2(j)}
                onFocus={() => preview2(j)}
                onClick={() => pick2(j)}
              >
                <span>{n.label}</span>
                {n.children?.length ? <span aria-hidden="true">›</span> : null}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mega-menu__col" data-col="2">
        <button type="button" className="mega-menu__back" onClick={() => setLevel(1)}>← {backLabel}</button>
        {sub && (
          <div className="mega-menu__head">
            <strong>{sub.label}</strong>
            <button type="button" className="mega-menu__all" onClick={() => onSelect(sub.label, [a1, a2])}>{viewAllLabel} →</button>
          </div>
        )}
        {leaves.length > 0 ? (
          <div className="mega-menu__leaves">
            {leaves.map((leaf, k) => (
              <button key={leaf.label} type="button" data-item className="mega-menu__leaf" onClick={() => onSelect(leaf.label, [a1, a2, k])}>
                <span className="mega-menu__circle" aria-hidden="true">{initial(leaf.label)}</span>
                <span>{leaf.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="mega-menu__empty">{emptyText}</p>
        )}
      </div>
    </div>
  )
}
