import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './icon'

// Page-level blocks for a storefront. Like everything in src/ui they read tokens only.
// Icon slots are IconCircles; pass `icon` to draw a Lucide icon inside, or leave it empty where the meaning is not settled.

type Tone = 'accent' | 'muted'

export function IconCircle({ size = 'md', tone = 'accent', icon, children }: { size?: 'sm' | 'md' | 'lg'; tone?: Tone; icon?: IconName; children?: ReactNode }) {
  return <span className={`icon-circle icon-circle--${size} icon-circle--${tone}`} aria-hidden="true">{children ?? (icon && <Icon name={icon} size={size === 'lg' ? 'md' : 'sm'} />)}</span>
}

// A placeholder frame where an advertising banner will go.
// With `image` the strip is a picture that already carries its text; `children` then becomes its text alternative.
export function PromoStrip({ children, image }: { children: ReactNode; image?: string }) {
  if (image) return <div className="promo-strip promo-strip--image"><img src={image} alt={typeof children === 'string' ? children : ''} /></div>
  return <div className="promo-strip"><span className="promo-strip__text">{children}</span></div>
}

export function UtilityBar({ items, end }: { items: ReactNode[]; end?: ReactNode }) {
  return (
    <div className="utility-bar">
      <div className="utility-bar__inner">
        <ul className="utility-bar__list">
          {items.map((item, i) => (
            <li key={i} className="utility-bar__item">{typeof item === 'string' ? <><IconCircle size="sm" tone="muted" />{item}</> : item}</li>
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
        <button type="button" className="btn btn--secondary btn--sm site-header__categories" aria-expanded={menu ? menu.open : undefined} aria-controls={menu?.id} onClick={menu?.onToggle}><IconCircle size="sm" icon="grid" />{categoriesLabel}</button>
        <form className="site-header__search" role="search" onSubmit={submit}>
          <input className="field__input" type="search" value={query} placeholder={searchPlaceholder} aria-label={searchPlaceholder} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit" className="btn btn--primary btn--sm">{searchLabel}</button>
        </form>
        <div className="site-header__actions">
          <Link to={account.to} className="site-header__action">
            <Icon name="user" />
            <strong>{account.label}</strong>
            <small>{account.sub}</small>
          </Link>
          <Link to={cart.to} className="site-header__action">
            <span className="site-header__icon">
              <Icon name="cart" />
              {cart.count > 0 && <span className="count-badge" aria-label={String(cart.count)}>{cart.count}</span>}
            </span>
            <strong>{cart.label}</strong>
            <small>{cart.sub}</small>
          </Link>
        </div>
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
// With `image` the banner is a picture that already carries its headline; the title and text stay in the page for screen readers.
export function BannerSlide({ title, text, to, image }: { title: string; text?: string; to?: string; image?: string }) {
  const body = image ? (
    <>
      <img className="banner-slide__image" src={image} alt="" />
      <span className="visually-hidden">{title}{text ? `. ${text}` : ''}</span>
    </>
  ) : (
    <>
      <strong className="banner-slide__title">{title}</strong>
      {text && <span className="banner-slide__text">{text}</span>}
    </>
  )
  const cls = `banner-slide${image ? ' banner-slide--image' : ''}`
  return to ? <Link to={to} className={`${cls} banner-slide--link`}>{body}</Link> : <div className={cls}>{body}</div>
}

// The category strip: each item is a link; the one for the page you are in is marked.
type CategoryNavProps = ScrollerProps & { label: string; items: { label: string; to: string; active?: boolean }[]; end?: ReactNode }

export function CategoryNav({ label, items, end, prevLabel, nextLabel }: CategoryNavProps) {
  const { ref, page, pages, measure, by } = useScroller()
  return (
    <nav className="category-nav" aria-label={label}>
      <div className="category-nav__inner">
        {pages > 1 && <button type="button" className="category-nav__arrow" aria-label={prevLabel} disabled={page === 0} onClick={() => by(-1)}>‹</button>}
        <div ref={ref} className="category-nav__track" onScroll={measure}>
          {items.map((item, i) => (
            <Link key={`${item.to}-${i}`} to={item.to} className="category-nav__link" aria-current={item.active ? 'page' : undefined}>{item.label}</Link>
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

export function ShortcutCard({ title, text, tag, to, icon }: { title: string; text: string; tag?: string; to?: string; icon?: IconName }) {
  const body = (
    <>
      <div className="shortcut__head">
        <IconCircle size="lg" icon={icon} />
        {tag && <span className="badge">{tag}</span>}
      </div>
      <h3>{title}</h3>
      <p className="muted">{text}</p>
    </>
  )
  return to ? <Link to={to} className="shortcut shortcut--link">{body}</Link> : <div className="shortcut">{body}</div>
}

// A store badge picture (App Store, Google Play) with the name used as its text alternative.
export type StoreBadge = { label: string; src: string }

type AppPromoCardProps = {
  title: string
  subtitle: string
  couponIntro: string
  couponValue: string
  couponTitle: string
  couponNote: string
  stores: StoreBadge[]
  clubTitle: string
  clubBadge: string
  earnText: ReactNode
  joinLabel: string
  // Where the button goes; without it the button is only a picture of one (as on the Moodboard).
  joinTo?: string
}

export function AppPromoCard(p: AppPromoCardProps) {
  return (
    <div className="app-card">
      <div className="app-card__top">
        <IconCircle size="lg" icon="phoneApp" />
        <div>
          <h3>{p.title}</h3>
          <p className="muted">{p.subtitle}</p>
        </div>
      </div>
      <div className="app-card__perks">
        <div className="app-card__perk"><IconCircle size="md" icon="ticket" /><span>{p.couponIntro} <strong className="app-card__value">{p.couponValue}.-</strong></span></div>
        <div className="app-card__perk"><IconCircle size="md" icon="gift" /><span>{p.couponTitle} <strong>{p.couponNote}</strong></span></div>
      </div>
      <div className="app-card__stores">
        {p.stores.map((store) => (
          <img key={store.label} className="store-badge" src={store.src} alt={store.label} />
        ))}
      </div>
      <div className="app-card__club">
        <div className="app-card__club-head">
          <IconCircle size="lg" icon="crown" />
          <div className="stack">
            <div className="row"><h3>{p.clubTitle}</h3><span className="badge">{p.clubBadge}</span></div>
            <p className="muted">{p.earnText}</p>
          </div>
        </div>
        {p.joinTo ? (
          <Link to={p.joinTo} className="btn btn--primary">{p.joinLabel}<Icon name="right" size="sm" /></Link>
        ) : (
          <button type="button" className="btn btn--primary">{p.joinLabel}<Icon name="right" size="sm" /></button>
        )}
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
  image?: string
}

export function FlashSaleCard(p: FlashSaleCardProps) {
  const progressLabel = `${p.soldText} · ${p.stockText}`
  const flashPicture = p.image ? (
    <div className="product-image"><img src={p.image} alt="" /></div>
  ) : (
    <div className="product-image" role="img" aria-label={p.imageLabel}><span aria-hidden="true">{Array.from(p.imageLabel).find((c) => /\p{L}/u.test(c) && !'เแโใไ'.includes(c)) ?? ''}</span></div>
  )
  return (
    <article className="flash-card">
      <span className="flash-card__tag">{p.flashLabel}</span>
      {p.to ? (
        <Link to={p.to} className="card-link">
          {flashPicture}
          <h3 className="flash-card__name">{p.name}</h3>
        </Link>
      ) : (
        <>
          {flashPicture}
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

// One page of tiles: the first is large, the rest fill in around it. A tile with a `src` shows that picture with its label on a dark band.
export function TileMosaic({ tiles, onSelect }: { tiles: { label: string; src?: string }[]; onSelect: (tile: string) => void }) {
  return (
    <div className="tile-mosaic">
      <div className="tile-mosaic__grid">
        {tiles.map(({ label, src }) => (
          <button key={label} type="button" className={`tile${src ? ' tile--picture' : ''}`} onClick={() => onSelect(label)}>
            {src ? (
              <img className="tile__picture" src={src} alt="" />
            ) : (
              <span className="tile__image" aria-hidden="true">{Array.from(label).find((c) => /\p{L}/u.test(c) && !'เแโใไ'.includes(c)) ?? ''}</span>
            )}
            <span className="tile__label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// A logo placeholder: the brand's name in a frame.
// A brand tile: its logo when there is one (the name is then the picture's text), else the name.
export function BrandChip({ name, logo, onSelect }: { name: string; logo?: string; onSelect: () => void }) {
  return (
    <button type="button" className={`brand-chip${logo ? ' brand-chip--logo' : ''}`} onClick={onSelect}>
      {logo ? <img className="brand-chip__logo" src={logo} alt={name} /> : name}
    </button>
  )
}

export function ArticleCard({ category, views, viewsLabel, title, readLabel, onRead, image }: { category: string; views: string; viewsLabel: string; title: string; readLabel: string; onRead: () => void; image?: string }) {
  return (
    <article className={`article-card${image ? ' article-card--picture' : ''}`}>
      {image ? (
        <div className="product-image"><img src={image} alt="" /></div>
      ) : (
        <div className="product-image" role="img" aria-label={title}><span aria-hidden="true">{Array.from(title).find((c) => /\p{L}/u.test(c) && !'เแโใไ'.includes(c)) ?? ''}</span></div>
      )}
      <div className="article-card__meta"><span className="badge">{category}</span><span className="article-card__views" title={viewsLabel} aria-label={`${views} ${viewsLabel}`}>{views}<Icon name="view" size="sm" /></span></div>
      <h3 className="article-card__title">{title}</h3>
      <button type="button" className="article-card__read" onClick={onRead}>{readLabel} →</button>
    </article>
  )
}

export function BenefitBar({ title, text, items }: { title: string; text: string; items: { title: string; text: string; icon?: IconName }[] }) {
  return (
    <section className="benefit-bar">
      <div className="benefit-bar__intro">
        <h2>{title}</h2>
        <p className="muted">{text}</p>
      </div>
      <ul className="benefit-bar__list">
        {items.map((item, i) => (
          <li key={`${item.title}-${i}`} className="benefit-bar__item">
            <IconCircle size="lg" icon={item.icon} />
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
  contact: { text: string; icon?: IconName }[]
  socials: StoreBadge[]
  stores: StoreBadge[]
  perks: { title: string; text: string; icon?: IconName }[]
  columns: { title: string; links: FooterLink[] }[]
  certTitle: string
  hoursNote: string
  complaint: FooterLink
  copyright: string
  legal: FooterLink[]
  payments: { src: string; alt: string }
}

export function SiteFooter(p: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner site-footer__perks">
        {p.perks.map((perk, i) => (
          <div key={`${perk.title}-${i}`} className="site-footer__perk"><IconCircle size="md" icon={perk.icon} /><span><strong>{perk.title}</strong><small>{perk.text}</small></span></div>
        ))}
      </div>
      <div className="site-footer__inner site-footer__main">
        <div className="site-footer__brand">
          {p.logo}
          {p.contact.map((line, i) => <p key={`${line.text}-${i}`} className="site-footer__contact">{line.icon && <Icon name={line.icon} size="sm" />}<span>{line.text}</span></p>)}
          <div className="site-footer__socials">{p.socials.map((s) => <img key={s.label} className="social-icon" src={s.src} alt={s.label} title={s.label} />)}</div>
          <div className="row">{p.stores.map((s) => <img key={s.label} className="store-badge" src={s.src} alt={s.label} />)}</div>
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
          <IconCircle size="lg" tone="muted" icon="shield" />
        </div>
      </div>
      <div className="site-footer__inner site-footer__bottom">
        <span>{p.hoursNote}</span>
        {p.complaint.to ? <Link to={p.complaint.to}>{p.complaint.label}</Link> : <span>{p.complaint.label}</span>}
        <span className="site-footer__payments"><img className="payment-strip" src={p.payments.src} alt={p.payments.alt} /></span>
        <span>{p.copyright}</span>
        <span className="site-footer__legal">{p.legal.map((l, i) => (l.to ? <Link key={`${l.label}-${i}`} to={l.to}>{l.label}</Link> : <span key={`${l.label}-${i}`}>{l.label}</span>))}</span>
      </div>
    </footer>
  )
}
