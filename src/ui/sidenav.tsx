import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './icon'
import './sidenav.css'

// The menu of a back office. Like everything in src/ui it reads tokens only.

export type SideNavItem = { to: string; label: string; icon?: IconName; active: boolean; badge?: string }

// A dark side menu in groups. From the md breakpoint it stands at the left edge; below it, only the brand and a
// menu button show, and the button opens the groups under the bar.
export function SideNav({ label, menuLabel, brand, groups }: { label: string; menuLabel: string; brand: ReactNode; groups: { title: string; items: SideNavItem[] }[] }) {
  const [open, setOpen] = useState(false)
  return (
    <nav className={`side-nav${open ? ' side-nav--open' : ''}`} aria-label={label}>
      <div className="side-nav__bar">
        <span className="side-nav__brand">{brand}</span>
        <button type="button" className="side-nav__toggle" aria-expanded={open} aria-label={menuLabel} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} size="md" />
        </button>
      </div>
      <div className="side-nav__panel">
        {groups.map((g) => (
          <div key={g.title} className="side-nav__group">
            <span className="side-nav__title">{g.title}</span>
            {g.items.map((item) => (
              <Link key={item.to} to={item.to} className="side-nav__link" aria-current={item.active ? 'page' : undefined} onClick={() => setOpen(false)}>
                {item.icon && <Icon name={item.icon} size="sm" />}
                <span className="side-nav__label">{item.label}</span>
                {item.badge && <span className="side-nav__badge">{item.badge}</span>}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </nav>
  )
}

// The menu beside the page. With `fill` the menu is as tall as the screen (a whole page); without it, as tall as its content.
export function SideNavLayout({ menu, children, fill }: { menu: ReactNode; children: ReactNode; fill?: boolean }) {
  return (
    <div className={`side-nav-layout${fill ? ' side-nav-layout--fill' : ''}`}>
      {menu}
      <div className="side-nav-layout__main">{children}</div>
    </div>
  )
}
