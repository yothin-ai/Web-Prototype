import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDataset } from '../../datasets/DatasetContext'
import { useLang } from '../../i18n'
import { LanguageToggle } from '../../shell/LanguageToggle'
import { CategoryNav, DropdownMenu, IconCircle, Logo, MegaMenu, PromoStrip, SiteFooter, SiteHeader, UtilityBar, type MegaNode } from '../../ui'
import type { MenuNode } from '../../datasets/types'
import { useProfile, useSignedIn } from './account'
import { u } from './authStrings'
import { branchById, branches, useBranch } from './branches'
import { findPathByLabel, useCategoryLink, useCategoryTo } from './category'
import { f } from './footer'
import { paymentStrip, socialIcons, storeBadges } from '../../assets/brand'
import { cartCount, PROTOTYPE_ID, useCart } from './cart'
import { s } from './strings'
import { cp } from './couponStrings'
import { AuthModal } from './pages/AuthModal'
import { CookieConsent } from './pages/CookieConsent'
import { ck, pm } from './miscStrings'

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
  const categoryTo = useCategoryTo()
  // The top-level category of the page being viewed (/category/3-1-2 is category 3), if any.
  const onCategory = pathname.match(/\/category\/(\d+)/)
  const activeCategory = onCategory ? Number(onCategory[1]) : null
  const categoryLink = useCategoryLink()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [cart] = useCart()
  const [profile] = useProfile()
  const [signedIn] = useSignedIn()
  const [branchId, setBranchId] = useBranch()
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
  // Publishes the sticky header's height so sticky columns can sit just under it.
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('.site-header')
    if (!el) return
    const publish = () => document.documentElement.style.setProperty('--site-header-height', `${el.offsetHeight}px`)
    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
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
      <AuthModal />
      <CookieConsent />
      <PromoStrip>{t(home.promoStrip)}</PromoStrip>
      <UtilityBar
        items={[
          <><IconCircle size="sm" tone="muted" icon="phone" />{t(home.utility[0])}</>,
          <DropdownMenu
            key="branch"
            icon="pin"
            trigger={t(branchById(branchId).name)}
            label={t(s.branchMenu)}
            items={branches.map((b) => ({ id: b.id, label: t(b.name), detail: t(b.province), active: b.id === branchId, onSelect: () => setBranchId(b.id) }))}
            footer={<Link to={`${base}/stores${search}`}>{t(s.allStores)}</Link>}
          />,
          <Link key="coupons" to={`${base}/coupons${search}`} className="utility-bar__link"><IconCircle size="sm" tone="muted" icon="ticket" />{t(cp.utilityLabel)}</Link>,
          <DropdownMenu
            key="help"
            icon="headset"
            trigger={t(s.helpCenter)}
            label={t(s.helpCenter)}
            items={f.help.map((l, i) => ({ id: f.helpTo[i], label: t(l), to: `${base}/${f.helpTo[i]}${search}` }))}
          />,
        ]}
        end={<LanguageToggle />}
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
        account={signedIn ? { label: t(s.account), sub: profile.name || t(dataset.ecommerce.account.name), to: `${base}/account${withQuery(search, 'q', '')}` } : { label: t(u.headerSignIn), sub: t(u.headerRegister), to: `${pathname}${withQuery(search, 'auth', 'login')}` }}
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
              onSelect={(_label, path) => {
                setMenuOpen(false)
                navigate(categoryLink(path))
              }}
              onClose={() => setMenuOpen(false)}
            />
          ),
        }}
        cart={{ label: t(s.cartTitle), sub: count ? `${count} ${t(s.itemsCount)}` : t(s.cartEmptyShort), to: `${base}/cart${withQuery(search, 'q', '')}`, count }}
      />
      <CategoryNav
        label={t(s.categoriesButton)}
        items={home.categories.map((c) => ({ label: t(c), to: categoryTo(t(c)), active: activeCategory !== null && findPathByLabel(home.menu, t(c))?.[0] === activeCategory }))}
        prevLabel={t(s.scrollPrev)}
        nextLabel={t(s.scrollNext)}
        end={
          <DropdownMenu
            trigger={t(pm.navLabel)}
            label={t(pm.navLabel)}
            items={[
              { id: 'all', label: t(pm.menuAll), to: `${base}/promotions${search}` },
              { id: 'coupons', label: t(pm.menuCoupons), to: `${base}/coupons${search}` },
              { id: 'club', label: t(pm.menuClub), to: `${base}/account/club${search}` },
            ]}
          />
        }
      />
      <main className="storefront-main">{children}</main>
      <SiteFooter
        logo={<Logo name={t(dataset.brandName)} tone="on-dark" />}
        contact={f.contact.map((c, i) => ({ text: t(c), icon: f.contactIcons[i] }))}
        socials={socialIcons}
        stores={storeBadges}
        perks={f.perks.map((x, i) => ({ title: t(x.title), text: t(x.text), icon: f.perkIcons[i] }))}
        columns={[
          { title: t(f.aboutTitle), links: f.about.map((l, i) => ({ label: t(l), to: `${base}/${f.aboutTo[i]}${search}` })) },
          { title: t(f.helpTitle), links: [...f.help.map((l, i) => ({ label: t(l), to: `${base}/${f.helpTo[i]}${search}` })), { label: t(home.ideasTitle), to: `${base}/ideas${search}` }] },
          {
            title: t(f.accountTitle),
            links: [
              { label: t(f.signInMember), to: signedIn ? `${base}/account${search}` : `${pathname}${withQuery(search, 'auth', 'login')}` },
              { label: t(f.profile), to: `${base}/account/profile${search}` },
              { label: t(f.orders), to: `${base}/orders${search}` },
              { label: t(f.addresses), to: `${base}/account/addresses${search}` },
              { label: t(f.coupons), to: `${base}/account/coupons${search}` },
              { label: t(home.app.club), to: `${base}/account/club${search}` },
            ],
          },
        ]}
        certTitle={t(f.certTitle)}
        hoursNote={t(f.hoursNote)}
        complaint={{ label: t(f.complaint), to: `${base}/${f.complaintTo}${search}` }}
        copyright={`© 2026 ${t(dataset.brandName)} · ${t(f.copyright)}`}
        legal={[...f.legal.map((l, i) => ({ label: t(l), to: `${base}/${f.legalTo[i]}${search}` })), { label: t(ck.settings), to: `${pathname}${withQuery(search, 'cookies', '1')}` }]}
        payments={paymentStrip}
      />
    </>
  )
}
