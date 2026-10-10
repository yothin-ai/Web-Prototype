import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDataset } from '../../datasets/DatasetContext'
import { useLang } from '../../i18n'
import { LanguageToggle } from '../../shell/LanguageToggle'
import { CategoryNav, IconCircle, Logo, MegaMenu, PromoStrip, SiteFooter, SiteHeader, UtilityBar, type MegaNode } from '../../ui'
import type { MenuNode } from '../../datasets/types'
import { f } from './footer'
import { cartCount, PROTOTYPE_ID, useCart } from './cart'
import { s } from './strings'

// Adds or replaces the search term while keeping other query parameters such as ?clean=1.
export const withQuery = (search: string, key: string, value: string) => {
  const params = new URLSearchParams(search)
  if (value) params.set(key, value)
  else params.delete(key)
  const out = params.toString()
  return out ? `?${out}` : ''
}

// The frame shared by every E-Commerce page: promo strip, utility bar, header and category menu.
// Returns a function that opens the results page for a search term, keeping ?clean=1 and friends.
export function useGoSearch() {
  const { search } = useLocation()
  const navigate = useNavigate()
  return (q: string) => navigate({ pathname: `/${PROTOTYPE_ID}/products`, search: withQuery(search, 'q', q) })
}

export function Storefront({ children }: { children: ReactNode }) {
  const { t, lang } = useLang()
  const { dataset } = useDataset()
  const { pathname, search } = useLocation()
  const goSearch = useGoSearch()
  const [params] = useSearchParams()
  const [cart] = useCart()
  const home = dataset.ecommerce.home
  const base = `/${PROTOTYPE_ID}`
  const count = cartCount(cart)
  const [menuOpen, setMenuOpen] = useState(false)
  const nodes = useMemo(() => {
    const toNode = (n: MenuNode): MegaNode => ({ label: t(n.label), children: n.children?.map(toNode) })
    return home.menu.map(toNode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [home.menu, lang])

  // The menu closes when the page changes or Escape is pressed.
  useEffect(() => setMenuOpen(false), [pathname, search])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      document.querySelector<HTMLButtonElement>('.site-header__categories')?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])


  return (
    <>
      <PromoStrip>{t(home.promoStrip)}</PromoStrip>
      <UtilityBar
        items={home.utility.map((x) => t(x))}
        end={
          <>
            <LanguageToggle />
            <button type="button" className="btn btn--ghost btn--sm" disabled aria-label={t(s.darkMode)}><IconCircle size="sm" tone="muted" />{t(s.darkMode)}</button>
          </>
        }
      />
      {menuOpen && <div className="mega-backdrop" onClick={() => setMenuOpen(false)} />}
      <SiteHeader
        logo={
          <Link to={{ pathname: base, search: withQuery(search, 'q', '') }} className="site-header__home" aria-label={t(s.goHome)}>
            <Logo name={t(dataset.brandName)} />
          </Link>
        }
        categoriesLabel={t(s.categoriesButton)}
        searchPlaceholder={t(s.searchPlaceholder)}
        searchLabel={t(s.searchButton)}
        initialQuery={params.get('q') ?? ''}
        onSearch={goSearch}
        account={{ label: t(s.account), sub: t(s.signIn), to: `${base}/orders${search}` }}
        menu={{
          open: menuOpen,
          onToggle: () => setMenuOpen((o) => !o),
          id: 'storefront-mega-menu',
          panel: (
            <MegaMenu
              id="storefront-mega-menu"
              nodes={nodes}
              title={t(s.menuTitle)}
              viewAllLabel={t(s.viewAll)}
              backLabel={t(s.back)}
              emptyText={t(s.menuEmpty)}
              onSelect={(label) => {
                setMenuOpen(false)
                goSearch(label)
              }}
              onClose={() => setMenuOpen(false)}
            />
          ),
        }}
        cart={{ label: t(s.cartTitle), sub: count ? `${count} ${t(s.itemsCount)}` : t(s.cartEmptyShort), to: `${base}/cart${search}`, count }}
      />
      <CategoryNav
        label={t(s.categoriesButton)}
        items={home.categories.map((c) => t(c))}
        onSelect={goSearch}
        prevLabel={t(s.scrollPrev)}
        nextLabel={t(s.scrollNext)}
        end={<button type="button" className="btn btn--primary btn--sm"><IconCircle size="sm" />{t(home.assistant)}</button>}
      />
      <main className="storefront-main">{children}</main>
      <SiteFooter
        logo={<Logo name={t(dataset.brandName)} tone="on-dark" />}
        contact={f.contact.map((c) => t(c))}
        socials={f.socials}
        stores={f.stores}
        perks={f.perks.map((x) => ({ title: t(x.title), text: t(x.text) }))}
        columns={[
          { title: t(f.aboutTitle), links: f.about.map((l) => ({ label: t(l) })) },
          { title: t(f.helpTitle), links: [...f.help.map((l) => ({ label: t(l) })), { label: t(home.ideasTitle) }] },
          {
            title: t(f.accountTitle),
            links: [
              { label: t(f.signInMember) },
              { label: t(f.profile) },
              { label: t(f.orders), to: `${base}/orders${search}` },
              { label: t(f.addresses) },
              { label: t(f.coupons) },
              { label: t(home.app.club) },
            ],
          },
        ]}
        certTitle={t(f.certTitle)}
        hoursNote={t(f.hoursNote)}
        complaint={t(f.complaint)}
        copyright={`© 2026 ${t(dataset.brandName)} · ${t(f.copyright)}`}
        legal={f.legal.map((l) => t(l))}
        payments={f.payments}
      />
    </>
  )
}
