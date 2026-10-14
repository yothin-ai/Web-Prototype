import { useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ProductImage } from './index'

const initial = (label: string) => Array.from(label).find((c) => /\p{L}/u.test(c) && !'เแโใไ'.includes(c)) ?? ''

export function Breadcrumb({ label, items }: { label: string; items: { label: string; to?: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label={label}>
      <ol className="breadcrumb__list">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="breadcrumb__item">
            {item.to && i < items.length - 1 ? <Link to={item.to}>{item.label}</Link> : <span aria-current={i === items.length - 1 ? 'page' : undefined}>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

type GalleryProps = { name: string; frameLabels: string[]; prevLabel: string; nextLabel: string }

// A main picture frame with thumbnails: beside it on a wide column, below it on a narrow one.
export function ProductGallery({ name, frameLabels, prevLabel, nextLabel }: GalleryProps) {
  const [index, setIndex] = useState(0)
  const count = frameLabels.length
  const go = (i: number) => setIndex((i + count) % count)
  const letter = initial(name)
  const onThumbKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      go(index + 1)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      go(index - 1)
    }
  }
  return (
    <div className="gallery">
      <div className="gallery__layout">
        <div className="gallery__thumbs" role="tablist" aria-orientation="vertical" onKeyDown={onThumbKey}>
          {frameLabels.map((frame, i) => (
            <button key={frame} type="button" role="tab" aria-selected={i === index} aria-label={frame} tabIndex={i === index ? 0 : -1} className="gallery__thumb" onClick={() => setIndex(i)}>
              <span aria-hidden="true">{letter}</span>
            </button>
          ))}
        </div>
        <div className="gallery__main" role="img" aria-label={`${name} · ${frameLabels[index]}`}>
          <span className="gallery__letter" aria-hidden="true">{letter}</span>
          <span className="gallery__frame-name">{frameLabels[index]}</span>
          <button type="button" className="carousel__arrow carousel__arrow--prev" aria-label={prevLabel} onClick={() => go(index - 1)}>‹</button>
          <button type="button" className="carousel__arrow carousel__arrow--next" aria-label={nextLabel} onClick={() => go(index + 1)}>›</button>
          <span className="gallery__counter">{index + 1} / {count}</span>
        </div>
      </div>
    </div>
  )
}

type TabsProps = { label: string; tabs: { id: string; label: string; content: ReactNode }[]; initial?: number }

export function Tabs({ label, tabs, initial: start = 0 }: TabsProps) {
  const [active, setActive] = useState(start)
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (active + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length
    setActive(next)
    document.getElementById(`tab-${tabs[next].id}`)?.focus()
  }
  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label={label} onKeyDown={onKey}>
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`panel-${tab.id}`}
            tabIndex={i === active ? 0 : -1}
            className="tabs__tab"
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div key={tab.id} id={`panel-${tab.id}`} role="tabpanel" aria-labelledby={`tab-${tab.id}`} hidden={i !== active} className="tabs__panel">
          {tab.content}
        </div>
      ))}
    </div>
  )
}

type StickyBarProps = { visible: boolean; name: string; price: string; actions: ReactNode; inline?: boolean; thumb?: boolean }

// A bar pinned to the bottom of the screen with the product, its price and the buy actions.
// `inline` draws it in the page flow instead, for showing it on the Moodboard.
export function StickyActionBar({ visible, name, price, actions, inline, thumb = true }: StickyBarProps) {
  if (!visible && !inline) return null
  return (
    <div className={`sticky-bar${inline ? ' sticky-bar--inline' : ''}`} role="region" aria-label={name}>
      <div className="sticky-bar__inner">
        {thumb && <div className="sticky-bar__thumb" aria-hidden="true">{initial(name)}</div>}
        <div className="sticky-bar__text">
          <span className="sticky-bar__name">{name}</span>
          <strong className="sticky-bar__price">{price}</strong>
        </div>
        <div className="sticky-bar__actions">{actions}</div>
      </div>
    </div>
  )
}

// A product in a grid: picture, badges, name, then price and action pinned to the bottom edge,
// so prices and buttons line up across a row however long the names are.
export function ProductCard({ to, imageLabel, badges, name, price, action }: { to: string; imageLabel: string; badges: ReactNode; name: string; price: string; action: ReactNode }) {
  return (
    <div className="card product-card">
      <Link to={to} className="card-link"><ProductImage label={imageLabel} square /></Link>
      <span className="row">{badges}</span>
      <Link to={to} className="card-link"><h3 className="article-card__title">{name}</h3></Link>
      <div className="product-card__foot">
        <strong>{price}</strong>
        {action}
      </div>
    </div>
  )
}
