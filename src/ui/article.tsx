import type { ReactNode } from 'react'

// The reading column of an article: a comfortable width, with styles for paragraphs, numbered
// headings, links, bullet lists, read-only tick lists and question-and-answer blocks.
export function ArticleBody({ children }: { children: ReactNode }) {
  return <div className="article-body">{children}</div>
}

// A column of round share buttons (or a row on a phone), each a picture of the network.
export function ShareBar({ label, items, onShare }: { label: string; items: { name: string; src: string }[]; onShare: (name: string) => void }) {
  return (
    <div className="share-bar">
      <span className="share-bar__label">{label}</span>
      {items.map((item) => (
        <button key={item.name} type="button" className="share-bar__button" aria-label={`${label} ${item.name}`} onClick={() => onShare(item.name)}>
          <img src={item.src} alt="" />
        </button>
      ))}
    </div>
  )
}
