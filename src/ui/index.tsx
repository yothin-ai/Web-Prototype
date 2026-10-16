import type { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './icon'
import './ui.css'
import './storefront.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'md' | 'sm'
  to?: string
  // A Lucide icon drawn before the label, in the label's colour.
  icon?: IconName
  // An address outside the app (tel:, mailto:); the button then renders as a link.
  href?: string
}

export function Button({ variant = 'primary', size = 'md', to, href, icon, className, children, ...rest }: ButtonProps) {
  const cls = `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''}${className ? ` ${className}` : ''}`
  const body = <>{icon && <Icon name={icon} size="sm" />}{children}</>
  if (href) return <a href={href} className={cls}>{body}</a>
  if (to) return <Link to={to} className={cls}>{body}</Link>
  return <button type="button" className={cls} {...rest}>{body}</button>
}

export function Card({ to, children }: { to?: string; children: ReactNode }) {
  if (to) return <Link to={to} className="card card--interactive">{children}</Link>
  return <div className="card">{children}</div>
}

export function Badge({ tone, children }: { tone?: 'success' | 'warning'; children: ReactNode }) {
  return <span className={`badge${tone ? ` badge--${tone}` : ''}`}>{children}</span>
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }

export function Field({ label, hint, id, ...rest }: FieldProps) {
  const inputId = id ?? `field-${label}`
  return (
    <div className="field">
      <label className="field__label" htmlFor={inputId}>{label}</label>
      <input id={inputId} className="field__input" {...rest} />
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  )
}

// Grid container: 4 columns on phones, 8 from the sm breakpoint, 12 from md.
export function Grid({ children }: { children: ReactNode }) {
  return <div className="grid">{children}</div>
}

type Spans = { base?: number; sm?: number | 'full'; md?: number | 'full' }

export function Col({ span = {}, className, children }: { span?: Spans; className?: string; children: ReactNode }) {
  const classes = ['col']
  if (className) classes.push(className)
  if (span.base) classes.push(`col-${span.base}`)
  if (span.sm) classes.push(span.sm === 'full' ? 'col-sm-full' : `col-sm-${span.sm}`)
  if (span.md) classes.push(span.md === 'full' ? 'col-md-full' : `col-md-${span.md}`)
  return <div className={classes.join(' ')}>{children}</div>
}

// Thai leading vowels (เ แ โ ใ ไ) make a poor initial, so skip to the first consonant.
const initial = (label: string) => Array.from(label).find((c) => /\p{L}/u.test(c) && !'เแโใไ'.includes(c)) ?? ''

// Fixed-ratio picture frame; shows an initial on a neutral surface until a real `src` exists.
// A picture slot (a letter frame until there is a real photo). Pictures of products are `square`;
// article pictures can be `wide` (16:9); the others (categories, courses) keep the 4:3 frame.
export function ProductImage({ label, src, alt = '', square, wide }: { label: string; src?: string; alt?: string; square?: boolean; wide?: boolean }) {
  const cls = `product-image${square ? ' product-image--square' : ''}${wide ? ' product-image--wide' : ''}`
  if (src) return <div className={cls}><img src={src} alt={alt} /></div>
  return (
    <div className={cls} role="img" aria-label={label}>
      <span aria-hidden="true">{initial(label)}</span>
    </div>
  )
}

type StepperProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  label: string
  decreaseLabel: string
  increaseLabel: string
}

export function QuantityStepper({ value, onChange, min = 1, max = 99, label, decreaseLabel, increaseLabel }: StepperProps) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <Button variant="secondary" size="sm" aria-label={decreaseLabel} disabled={value <= min} onClick={() => onChange(value - 1)}>−</Button>
      <span className="stepper__value" aria-live="polite">{value}</span>
      <Button variant="secondary" size="sm" aria-label={increaseLabel} disabled={value >= max} onClick={() => onChange(value + 1)}>+</Button>
    </div>
  )
}

// A label on the left and a value on the right, for prices and summaries.
export function DataRow({ label, value, muted, strong }: { label: ReactNode; value?: ReactNode; muted?: boolean; strong?: boolean }) {
  return (
    <div className={`data-row${muted ? ' data-row--muted' : ''}${strong ? ' data-row--strong' : ''}`}>
      <span className="data-row__label">{label}</span>
      {value !== undefined && <span className="data-row__value">{value}</span>}
    </div>
  )
}

export function ChoiceGroup({ label, children }: { label: string; children: ReactNode }) {
  return <div className="choice-group" role="radiogroup" aria-label={label}>{children}</div>
}

type ChoiceCardProps = { title: string; detail?: string; price?: string; selected: boolean; onSelect: () => void }

export function ChoiceCard({ title, detail, price, selected, onSelect }: ChoiceCardProps) {
  return (
    <button type="button" role="radio" aria-checked={selected} className={`choice${selected ? ' choice--selected' : ''}`} onClick={onSelect}>
      <span className="choice__title">{title}</span>
      {detail && <span className="choice__detail">{detail}</span>}
      {price && <span className="choice__price">{price}</span>}
    </button>
  )
}

// The opening block of a page: one oversized headline, a lead sentence and the main actions.
export function Hero({ badge, title, subtitle, actions }: { badge?: ReactNode; title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="hero">
      {badge}
      <h1 className="hero__title">{title}</h1>
      {subtitle && <p className="hero__subtitle">{subtitle}</p>}
      {actions && <div className="hero__actions">{actions}</div>}
    </div>
  )
}

// Built on native <details>, so it works without scripts and is keyboard accessible.
export function Accordion({ items }: { items: { title: string; body: ReactNode }[] }) {
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <details className="accordion__item" key={i}>
          <summary className="accordion__title">{item.title}</summary>
          <div className="accordion__body">{item.body}</div>
        </details>
      ))}
    </div>
  )
}

export function Quote({ text, author }: { text: string; author: string }) {
  return (
    <figure className="quote">
      <blockquote className="quote__text">{text}</blockquote>
      <figcaption className="quote__author">{author}</figcaption>
    </figure>
  )
}

// `value` is a percentage from 0 to 100.
export function ProgressBar({ value, label, tone = 'accent' }: { value: number; label: string; tone?: 'accent' | 'danger' }) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={`progress${tone === 'danger' ? ' progress--danger' : ''}`} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={clamped}>
      <div className="progress__fill" style={{ '--progress': `${clamped}%` } as CSSProperties} />
    </div>
  )
}

// The page-level menu of a Prototype; stays on one line and scrolls sideways when it must.
export function NavTabs({ label, items }: { label: string; items: { to: string; label: string; active: boolean }[] }) {
  return (
    <nav className="nav-tabs" aria-label={label}>
      {items.map((item) => (
        <Link key={`${item.to}-${item.label}`} to={item.to} className="nav-tabs__link" aria-current={item.active ? 'page' : undefined}>
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

// A placeholder brand mark: the first letter of `name` in a square, plus the name.
export function Logo({ name = 'Logo', tone = 'default', symbolOnly }: { name?: string; tone?: 'default' | 'on-dark' | 'on-accent'; symbolOnly?: boolean }) {
  return (
    <span className={`logo${tone === 'default' ? '' : ` logo--${tone}`}`} role="img" aria-label={name}>
      <span className="logo__mark" aria-hidden="true">{initial(name)}</span>
      {!symbolOnly && <span className="logo__name" aria-hidden="true">{name}</span>}
    </span>
  )
}
export * from './storefront'
export * from './megamenu'
export * from './product'
export * from './form'
export * from './account'
export * from './cart'
export * from './category'
export * from './dropdown'
export * from './icon'
export * from './article'
export * from './order'
export * from './modal'
export * from './coupon'
export * from './rating'
