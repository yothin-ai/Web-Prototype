import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

// Page-level blocks for a storefront. Like everything in src/ui they read tokens only.
// Icons are not drawn yet: every icon slot is an IconCircle.

type Tone = 'accent' | 'muted'

export function IconCircle({ size = 'md', tone = 'accent', children }: { size?: 'sm' | 'md' | 'lg'; tone?: Tone; children?: ReactNode }) {
  return <span className={`icon-circle icon-circle--${size} icon-circle--${tone}`} aria-hidden="true">{children}</span>
}

// A placeholder frame where an advertising banner will go.
export function PromoStrip({ children }: { children: ReactNode }) {
  return <div className="promo-strip"><span className="promo-strip__text">{children}</span></div>
}

export function UtilityBar({ items, end }: { items: string[]; end?: ReactNode }) {
  return (
    <div className="utility-bar">
      <div className="utility-bar__inner">
        <ul className="utility-bar__list">
          {items.map((label) => (
            <li key={label} className="utility-bar__item"><IconCircle size="sm" tone="muted" />{label}</li>
          ))}
        </ul>
        <div className="utility-bar__end">{end}</div>
      </div>
    </div>
  )
}

type SiteHeaderProps = {
  logo: ReactNode
  categoriesLabel: string
  searchPlaceholder: string
  searchLabel: string
  initialQuery?: string
  onSearch: (query: string) => void
  account: { label: string; sub: string; to: string }
  cart: { label: string; sub: string; to: string; count: number }
  menu?: { open: boolean; onToggle: () => void; id: string; panel: ReactNode }
}

export function SiteHeader({ logo, categoriesLabel, searchPlaceholder, searchLabel, initialQuery = '', onSearch, account, cart, menu }: SiteHeaderProps) {
  const [query, setQuery] = useState(initialQuery)
  useEffect(() => setQuery(initialQuery), [initialQuery])
  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(query.trim())
  }
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__logo">{logo}</div>
        <button type="button" className="btn btn--secondary btn--sm site-header__categories" aria-expanded={menu ? menu.open : undefined} aria-controls={menu?.id} onClick={menu?.onToggle}><IconCircle size="sm" />{categoriesLabel}</button>
        <form className="site-header__search" role="search" onSubmit={submit}>
          <input className="field__input" type="search" value={query} placeholder={searchPlaceholder} aria-label={searchPlaceholder} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit" className="btn btn--primary btn--sm">{searchLabel}</button>
        </form>
        <Link to={account.to} className="site-header__action"><IconCircle size="md" /><span><strong>{account.label}</strong><small>{account.sub}</small></span></Link>
        <Link to={cart.to} className="site-header__action"><IconCircle size="md">{cart.count > 0 ? cart.count : null}</IconCircle><span><strong>{cart.label}</strong><small>{cart.sub}</small></span></Link>
      </div>
      {menu?.open && <div className="mega-menu-wrap">{menu.panel}</div>}
    </header>
  )
}

type ScrollerProps = { prevLabel: string; nextLabel: string }

// Shared by Carousel and CategoryNav: tracks how far a scrolling row has moved.
function useScroller() {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({ page: 0, pages: 1 })
  const measure = useCallback(() => {
    const el = ref.current
    if (!el || el.clientWidth === 0) return
    setState({ pages: Math.max(1, Math.round(el.scrollWidth / el.clientWidth)), page: Math.round(el.scrollLeft / el.clientWidth) })
  }, [])
  useEffect(() => {
    measure()
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [measure])
  const by = (direction: 1 | -1) => ref.current?.scrollBy({ left: direction * (ref.current?.clientWidth ?? 0), behavior: 'smooth' })
  const to = (page: number) => ref.current?.scrollTo({ left: page * (ref.current?.clientWidth ?? 0), behavior: 'smooth' })
  return { ref, ...state, measure, by, to }
}

type CarouselProps = ScrollerProps & {
  children: ReactNode
  label: string
  // Items per view on a wide screen; narrower screens fit fewer because each item keeps `minItem`.
  count?: number
  minItem?: string
  dots?: boolean
  arrows?: boolean
  // Lay items out in this many rows that scroll together, so each row lines up whatever the text length.
  rows?: number
}

export function Carousel({ children, label, count = 1, minItem = '160px', dots = false, arrows = true, rows, prevLabel, nextLabel }: CarouselProps) {
  const { ref, page, pages, measure, by, to } = useScroller()
  return (
    <div className="carousel" role="region" aria-label={label}>
      <div className="carousel__stage">
        <div
          ref={ref}
          className={`carousel__track${rows ? ' carousel__track--rows' : ''}`}
          style={{ '--carousel-count': count, '--carousel-min': minItem, ...(rows ? { '--carousel-rows': rows } : {}) } as CSSProperties}
          onScroll={measure}
        >
          {children}
        </div>
        {arrows && pages > 1 && (
          <>
            <button type="button" className="carousel__arrow carousel__arrow--prev" aria-label={prevLabel} disabled={page === 0} onClick={() => by(-1)}>‹</button>
            <button type="button" className="carousel__arrow carousel__arrow--next" aria-label={nextLabel} disabled={page >= pages - 1} onClick={() => by(1)}>›</button>
          </>
        )}
      </div>
      {dots && pages > 1 && (
        <div className="carousel__dots">
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} type="button" className="carousel__dot" aria-label={`${i + 1} / ${pages}`} aria-current={i === page ? 'true' : undefined} onClick={() => to(i)} />
          ))}
        </div>
      )}
    </div>
  )
}

// A banner placeholder: a frame with the promotion's headline, standing in for the real artwork.
export function BannerSlide({ title, text }: { title: string; text?: string }) {
  return (
    <div className="banner-slide">
      <strong className="banner-slide__title">{title}</strong>
      {text && <span className="banner-slide__text">{text}</span>}
    </div>
  )
}

type CategoryNavProps = ScrollerProps & { label: string; items: string[]; onSelect: (item: string) => void; end?: ReactNode }

export function CategoryNav({ label, items, onSelect, end, prevLabel, nextLabel }: CategoryNavProps) {
  const { ref, page, pages, measure, by } = useScroller()
  return (
    <nav className="category-nav" aria-label={label}>
      <div className="category-nav__inner">
        {pages > 1 && <button type="button" className="category-nav__arrow" aria-label={prevLabel} disabled={page === 0} onClick={() => by(-1)}>‹</button>}
        <div ref={ref} className="category-nav__track" onScroll={measure}>
          {items.map((item) => (
            <button key={item} type="button" className="category-nav__link" onClick={() => onSelect(item)}>{item}</button>
          ))}
        </div>
        {pages > 1 && <button type="button" className="category-nav__arrow" aria-label={nextLabel} disabled={page >= pages - 1} onClick={() => by(1)}>›</button>}
        {end}
      </div>
    </nav>
  )
}

// Lay several ShortcutCards out side by side; they wrap onto new rows when space runs out.
export function ShortcutRow({ children }: { children: ReactNode }) {
  return <div className="shortcut-row">{children}</div>
}

export function ShortcutCard({ title, text, tag }: { title: string; text: string; tag: string }) {
  return (
    <div className="shortcut">
      <div className="shortcut__head">
        <IconCircle size="lg" />
        <span className="badge">{tag}</span>
      </div>
      <h3>{title}</h3>
      <p className="muted">{text}</p>
    </div>
  )
}

type AppPromoCardProps = {
  title: string
  subtitle: string
  couponIntro: string
  couponValue: string
  couponTitle: string
  couponNote: string
  stores: [string, string]
  clubTitle: string
  clubBadge: string
  earnText: ReactNode
  joinLabel: string
}

export function AppPromoCard(p: AppPromoCardProps) {
  return (
    <div className="app-card">
      <div className="app-card__top">
        <IconCircle size="lg" />
        <div>
          <h3>{p.title}</h3>
          <p className="muted">{p.subtitle}</p>
        </div>
      </div>
      <div className="app-card__perks">
        <div className="app-card__perk"><span className="muted">{p.couponIntro}</span><strong className="app-card__value">{p.couponValue}</strong></div>
        <div className="app-card__perk"><span className="muted">{p.couponTitle}</span><strong>{p.couponNote}</strong></div>
      </div>
      <div className="row">
        {p.stores.map((store) => (
          <button key={store} type="button" className="btn btn--secondary btn--sm"><IconCircle size="sm" tone="muted" />{store}</button>
        ))}
      </div>
      <div className="app-card__club">
        <div className="row"><h3 className="row__grow">{p.clubTitle}</h3><span className="badge">{p.clubBadge}</span></div>
        <p className="muted">{p.earnText}</p>
        <button type="button" className="btn btn--primary">{p.joinLabel}</button>
      </div>
    </div>
  )
}

// A page section's title row, with an optional aside (such as a Countdown) and action button.
export function SectionHeader({ title, aside, action, tone = 'default' }: { title: string; aside?: ReactNode; action?: ReactNode; tone?: 'default' | 'sale' }) {
  return (
    <div className={`section-header${tone === 'sale' ? ' section-header--sale' : ''}`}>
      <h2 className="section-header__title">{title}</h2>
      {aside && <div className="section-header__aside">{aside}</div>}
      {action && <div className="section-header__action">{action}</div>}
    </div>
  )
}

const pad = (n: number) => String(n).padStart(2, '0')

// Counts down from `startSeconds` once a second and starts over at zero.
export function Countdown({ startSeconds, label }: { startSeconds: number; label: string }) {
  const [left, setLeft] = useState(startSeconds)
  useEffect(() => {
    const id = window.setInterval(() => setLeft((l) => (l <= 1 ? startSeconds : l - 1)), 1000)
    return () => window.clearInterval(id)
  }, [startSeconds])
  return (
    <span className="countdown">
      <span>{label}</span>
      <strong className="countdown__time">{pad(Math.floor(left / 3600))}:{pad(Math.floor((left % 3600) / 60))}:{pad(left % 60)}</strong>
    </span>
  )
}

type FlashSaleCardProps = {
  flashLabel: string
  imageLabel: string
  name: string
  price: string
  originalPrice: string
  discount: string
  soldText: string
  stockText: string
  progress: number
  buyLabel: string
  onBuy: () => void
  to?: string
}

export function FlashSaleCard(p: FlashSaleCardProps) {
  const progressLabel = `${p.soldText} · ${p.stockText}`
  return (
    <article className="flash-card">
      <span className="flash-card__tag">{p.flashLabel}</span>
      {p.to ? (
        <Link to={p.to} className="card-link">
          <div className="product-image" role="img" aria-label={p.imageLabel}><span aria-hidden="true">{Array.from(p.imageLabel).find((c) => /\p{L}/u.test(c) && !'เแโใไ'.includes(c)) ?? ''}</span></div>
          <h3 className="flash-card__name">{p.name}</h3>
        </Link>
      ) : (
        <>
          <div className="product-image" role="img" aria-label={p.imageLabel}><span aria-hidden="true">{Array.from(p.imageLabel).find((c) => /\p{L}/u.test(c) && !'เแโใไ'.includes(c)) ?? ''}</span></div>
          <h3 className="flash-card__name">{p.name}</h3>
        </>
      )}
      <div className="flash-card__prices">
        <strong className="flash-card__price">{p.price}</strong>
        <s className="flash-card__old">{p.originalPrice}</s>
        <span className="flash-card__discount">{p.discount}</span>
      </div>
      <div className="progress progress--danger" role="progressbar" aria-label={progressLabel} aria-valuemin={0} aria-valuemax={100} aria-valuenow={p.progress}>
        <div className="progress__fill" style={{ '--progress': `${p.progress}%` } as CSSProperties} />
      </div>
      <div className="flash-card__stock"><span>{p.soldText}</span><span>{p.stockText}</span></div>
      <button type="button" className="btn btn--danger btn--sm" onClick={p.onBuy}>{p.buyLabel}</button>
    </article>
  )
}

// One page of tiles: the first is large, the rest fill in around it.
export function TileMosaic({ tiles, onSelect }: { tiles: string[]; onSelect: (tile: string) => void }) {
  return (
    <div className="tile-mosaic">
      <div className="tile-mosaic__grid">
        {tiles.map((label) => (
          <button key={label} type="button" className="tile" onClick={() => onSelect(label)}>
            <span className="tile__image" aria-hidden="true">{Array.from(label).find((c) => /\p{L}/u.test(c) && !'เแโใไ'.includes(c)) ?? ''}</span>
            <span className="tile__label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// A logo placeholder: the brand's name in a frame.
export function BrandChip({ name, onSelect }: { name: string; onSelect: () => void }) {
  return <button type="button" className="brand-chip" onClick={onSelect}>{name}</button>
}

export function ArticleCard({ category, views, title, readLabel, onRead }: { category: string; views: string; title: string; readLabel: string; onRead: () => void }) {
  return (
    <article className="article-card">
      <div className="product-image" role="img" aria-label={title}><span aria-hidden="true">{Array.from(title).find((c) => /\p{L}/u.test(c) && !'เแโใไ'.includes(c)) ?? ''}</span></div>
      <div className="article-card__meta"><span className="badge">{category}</span><span className="muted">{views}</span></div>
      <h3 className="article-card__title">{title}</h3>
      <button type="button" className="article-card__read" onClick={onRead}>{readLabel} →</button>
    </article>
  )
}

export function BenefitBar({ title, text, items }: { title: string; text: string; items: { title: string; text: string }[] }) {
  return (
    <section className="benefit-bar">
      <div className="benefit-bar__intro">
        <h2>{title}</h2>
        <p className="muted">{text}</p>
      </div>
      <ul className="benefit-bar__list">
        {items.map((item, i) => (
          <li key={`${item.title}-${i}`} className="benefit-bar__item">
            <IconCircle size="lg" />
            <strong>{item.title}</strong>
            <span className="muted">{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

type FooterLink = { label: string; to?: string }

type SiteFooterProps = {
  logo: ReactNode
  contact: string[]
  socials: string[]
  stores: string[]
  perks: { title: string; text: string }[]
  columns: { title: string; links: FooterLink[] }[]
  certTitle: string
  hoursNote: string
  complaint: string
  copyright: string
  legal: string[]
  payments: string[]
}

export function SiteFooter(p: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner site-footer__perks">
        {p.perks.map((perk, i) => (
          <div key={`${perk.title}-${i}`} className="site-footer__perk"><IconCircle size="md" /><span><strong>{perk.title}</strong><small>{perk.text}</small></span></div>
        ))}
      </div>
      <div className="site-footer__inner site-footer__main">
        <div className="site-footer__brand">
          {p.logo}
          {p.contact.map((line, i) => <p key={`${line}-${i}`}>{line}</p>)}
          <div className="row">{p.socials.map((s, i) => <span key={`${s}-${i}`} title={s}><IconCircle size="md" tone="muted" /></span>)}</div>
          <div className="row">{p.stores.map((s, i) => <button key={`${s}-${i}`} type="button" className="btn btn--secondary btn--sm"><IconCircle size="sm" tone="muted" />{s}</button>)}</div>
        </div>
        {p.columns.map((col, i) => (
          <div key={`${col.title}-${i}`} className="site-footer__column">
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((link, i) => (
                <li key={`${link.label}-${i}`}>{link.to ? <Link to={link.to}>{link.label}</Link> : <span>{link.label}</span>}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="site-footer__column">
          <h3>{p.certTitle}</h3>
          <IconCircle size="lg" tone="muted" />
        </div>
      </div>
      <div className="site-footer__inner site-footer__bottom">
        <span>{p.hoursNote}</span>
        <span>{p.complaint}</span>
        <span className="site-footer__payments">{p.payments.map((m, i) => <span key={`${m}-${i}`} title={m}><IconCircle size="sm" tone="muted" /></span>)}</span>
        <span>{p.copyright}</span>
        <span className="site-footer__legal">{p.legal.map((l, i) => <span key={`${l}-${i}`}>{l}</span>)}</span>
      </div>
    </footer>
  )
}
