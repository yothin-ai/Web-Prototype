import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './icon'
import { IconCircle, Logo, ProductImage } from './index'
import './landing.css'

// Blocks for a company landing page. Like everything in src/ui they read tokens only.

type NavLink = { label: string; onSelect: () => void }

// The bar at the top of the page, with the menu behind a button on a phone. With `overlay` it floats over the
// opening band and is see-through until the page scrolls; without it the bar is solid from the start.
export function SiteNav({ brand, label, links, action, menuLabel, overlay }: { brand: string; label: string; links: NavLink[]; action: ReactNode; menuLabel: string; overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const solid = !overlay || scrolled || open
  const pick = (link: NavLink) => {
    setOpen(false)
    link.onSelect()
  }
  return (
    <nav className={`site-nav${overlay ? ' site-nav--overlay' : ''}${solid ? ' site-nav--solid' : ''}`} aria-label={label}>
      <div className="site-nav__inner">
        <span className="site-nav__brand"><Logo name={brand} tone={solid ? 'default' : 'on-dark'} /></span>
        <ul className="site-nav__links">
          {links.map((l) => <li key={l.label}><button type="button" className="site-nav__link" onClick={() => pick(l)}>{l.label}</button></li>)}
        </ul>
        <div className="site-nav__action">{action}</div>
        <button type="button" className="site-nav__toggle" aria-expanded={open} aria-label={menuLabel} onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? 'close' : 'menu'} size="md" />
        </button>
      </div>
      {open && (
        <div className="site-nav__panel">
          <ul className="site-nav__panel-links">
            {links.map((l) => <li key={l.label}><button type="button" className="site-nav__link" onClick={() => pick(l)}>{l.label}</button></li>)}
          </ul>
          <div className="site-nav__panel-action">{action}</div>
        </div>
      )}
    </nav>
  )
}

// A title and groups of client names, shown as plain tiles (not real logos).
export function LogoWall({ title, groups }: { title?: string; groups: { label?: string; names: string[] }[] }) {
  return (
    <section className="logo-wall">
      {title && <p className="logo-wall__title">{title}</p>}
      <div className="logo-wall__groups">
        {groups.map((g, i) => (
          <div key={i} className="logo-wall__group">
            {g.label && <span className="logo-wall__label">{g.label}</span>}
            <ul className="logo-wall__list">
              {g.names.map((n) => <li key={n} className="logo-wall__item">{n}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

// A product, picture on one side and the pitch on the other (the picture moves to the right with `reverse`).
export function FeatureShowcase({ headline, name, tagline, features, action, image, imageLabel, reverse }: {
  headline: string
  name: string
  tagline: string
  features: { icon?: IconName; title: string; text: string }[]
  action: ReactNode
  image?: string
  imageLabel: string
  reverse?: boolean
}) {
  return (
    <article className={`feature-showcase${reverse ? ' feature-showcase--reverse' : ''}`}>
      <div className="feature-showcase__media"><ProductImage label={imageLabel} src={image} alt={imageLabel} /></div>
      <div className="feature-showcase__body">
        <h3 className="feature-showcase__headline">{headline}</h3>
        <div className="feature-showcase__product">
          <strong className="feature-showcase__name">{name}</strong>
          <span className="feature-showcase__tagline">{tagline}</span>
        </div>
        <ul className="feature-showcase__features">
          {features.map((f) => (
            <li key={f.title} className="feature-showcase__feature">
              <IconCircle size="md" icon={f.icon} />
              <span><strong>{f.title}</strong><small>{f.text}</small></span>
            </li>
          ))}
        </ul>
        <div>{action}</div>
      </div>
    </article>
  )
}

// A course in a row of courses. The whole card is the link.
export function CourseCard({ to, image, imageLabel, tag, title, meta }: { to: string; image?: string; imageLabel: string; tag: string; title: string; meta: string }) {
  return (
    <article className="course-card">
      <ProductImage label={imageLabel} src={image} wide />
      <span className="badge">{tag}</span>
      <h3 className="course-card__title"><Link to={to}>{title}</Link></h3>
      <span className="course-card__meta"><Icon name="clock" size="sm" />{meta}</span>
    </article>
  )
}

// The foot of a company page: who they are, how to reach them, and the page's own links.
export function ContactFooter({ brand, company, address, contacts, columns, copyright }: {
  brand: string
  company: string
  address: string
  contacts: { icon: IconName; label: string; href: string }[]
  columns: { title: string; links: NavLink[] }[]
  copyright: string
}) {
  return (
    <footer className="contact-footer">
      <div className="contact-footer__inner">
        <div className="contact-footer__about">
          <Logo name={brand} tone="on-dark" />
          <strong>{company}</strong>
          <p>{address}</p>
          <ul className="contact-footer__contacts">
            {contacts.map((c) => (
              <li key={c.href}><a href={c.href}><Icon name={c.icon} size="sm" />{c.label}</a></li>
            ))}
          </ul>
        </div>
        {columns.map((col) => (
          <div key={col.title} className="contact-footer__column">
            <strong>{col.title}</strong>
            <ul>
              {col.links.map((l) => <li key={l.label}><button type="button" onClick={l.onSelect}>{l.label}</button></li>)}
            </ul>
          </div>
        ))}
      </div>
      <p className="contact-footer__copy">{copyright}</p>
    </footer>
  )
}
