import type { ReactNode } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDataset } from '../../datasets/DatasetContext'
import { useLang } from '../../i18n'
import { LanguageToggle } from '../../shell/LanguageToggle'
import { CategoryNav, IconCircle, Logo, PromoStrip, SiteFooter, SiteHeader, UtilityBar } from '../../ui'
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
  const { t } = useLang()
  const { dataset } = useDataset()
  const { search } = useLocation()
  const goSearch = useGoSearch()
  const [params] = useSearchParams()
  const [cart] = useCart()
  const home = dataset.ecommerce.home
  const base = `/${PROTOTYPE_ID}`
  const count = cartCount(cart)


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
      <SiteHeader
        logo={<Logo name={t(dataset.brandName)} />}
        categoriesLabel={t(s.categoriesButton)}
        searchPlaceholder={t(s.searchPlaceholder)}
        searchLabel={t(s.searchButton)}
        initialQuery={params.get('q') ?? ''}
        onSearch={goSearch}
        account={{ label: t(s.account), sub: t(s.signIn), to: `${base}/orders${search}` }}
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
