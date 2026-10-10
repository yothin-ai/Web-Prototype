import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import type { Product } from '../../../datasets/types'
import { Badge, Button, Card, Col, DataRow, FilterGroup, Grid, ProductImage, Select } from '../../../ui'
import { formatMoney, PROTOTYPE_ID, useAddToCart, useCart } from '../cart'
import { g } from '../listingStrings'
import { s } from '../strings'

type Sort = 'best' | 'low' | 'high' | 'name'
const onSale = (p: Product) => p.originalPrice !== undefined && p.originalPrice > p.price
const bestSeller = (p: Product) => (p.sold ?? 0) > 0

// Three price bands cut from the cheapest to the dearest product on the page.
function bands(products: Product[]): { id: string; lo: number; hi: number }[] {
  if (products.length === 0) return []
  const prices = products.map((p) => p.price).sort((a, b) => a - b)
  const edges = [prices[0], prices[Math.floor(prices.length / 3)], prices[Math.floor((2 * prices.length) / 3)], prices[prices.length - 1]]
  const out: { id: string; lo: number; hi: number }[] = []
  for (let i = 0; i < 3; i++) {
    const lo = edges[i]
    const hi = edges[i + 1]
    if (hi > lo && !out.some((b) => b.lo === lo && b.hi === hi)) out.push({ id: `${lo}-${hi}`, lo, hi })
  }
  return out
}

// The product grid with its sort menu and filter groups (brand, price band, promotion).
// `head` is whatever sits above it: breadcrumb, title, category pills.
export function ProductListing({ products, head }: { products: Product[]; head?: React.ReactNode }) {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const [cart] = useCart()
  const add = useAddToCart()
  const [sort, setSort] = useState<Sort>('best')
  const [brands, setBrands] = useState<string[]>([])
  const [ranges, setRanges] = useState<string[]>([])
  const [promos, setPromos] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const brandList = useMemo(() => {
    const map = new Map<string, { label: string; count: number }>()
    for (const p of products) {
      if (!p.brand) continue
      const key = p.brand.th ?? p.brand.en ?? ''
      map.set(key, { label: t(p.brand), count: (map.get(key)?.count ?? 0) + 1 })
    }
    return [...map.entries()].map(([id, v]) => ({ id, ...v })).sort((a, b) => b.count - a.count)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, lang])
  const bandList = useMemo(() => bands(products), [products])
  const toggle = (list: string[], set: (v: string[]) => void) => (id: string) => set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id])
  const money = (n: number) => formatMoney(n, lang)

  const shown = products
    .filter((p) => brands.length === 0 || brands.includes(p.brand?.th ?? p.brand?.en ?? ''))
    .filter((p) => ranges.length === 0 || bandList.some((b) => ranges.includes(b.id) && p.price >= b.lo && p.price <= b.hi))
    .filter((p) => promos.length === 0 || (promos.includes('sale') && onSale(p)) || (promos.includes('best') && bestSeller(p)))
    .map((p, i) => ({ p, i }))
    .sort((a, b) => {
      if (sort === 'low') return a.p.price - b.p.price
      if (sort === 'high') return b.p.price - a.p.price
      if (sort === 'name') return t(a.p.name).localeCompare(t(b.p.name), lang)
      return (b.p.sold ?? 0) - (a.p.sold ?? 0) || a.i - b.i
    })
    .map((x) => x.p)
  const active = brands.length + ranges.length + promos.length > 0
  const clear = () => { setBrands([]); setRanges([]); setPromos([]) }
  const detail = (id: string) => `/${PROTOTYPE_ID}/product/${id}${search}`

  return (
    <Grid>
      <Col>{head}</Col>
      <Col span={{ base: 4, sm: 8, md: 3 }}>
        <div className="stack">
          <Button className="listing-toggle" variant="secondary" size="sm" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? t(g.hideFilters) : t(g.filters)}{active ? ` (${brands.length + ranges.length + promos.length})` : ''}</Button>
          <div className={`listing-filters${open ? ' listing-filters--open' : ''}`}>
            {brandList.length > 0 && <FilterGroup title={t(g.brand)} options={brandList.map((b) => ({ ...b, checked: brands.includes(b.id) }))} onToggle={toggle(brands, setBrands)} />}
            {bandList.length > 0 && (
              <FilterGroup
                title={t(g.priceRange)}
                options={bandList.map((b) => ({ id: b.id, label: `${money(b.lo)} – ${money(b.hi)}`, count: products.filter((p) => p.price >= b.lo && p.price <= b.hi).length, checked: ranges.includes(b.id) }))}
                onToggle={toggle(ranges, setRanges)}
              />
            )}
            {(products.some(onSale) || products.some(bestSeller)) && (
              <FilterGroup
                title={t(g.promo)}
                options={[
                  ...(products.some(onSale) ? [{ id: 'sale', label: t(g.onSale), count: products.filter(onSale).length, checked: promos.includes('sale') }] : []),
                  ...(products.some(bestSeller) ? [{ id: 'best', label: t(g.bestSeller), count: products.filter(bestSeller).length, checked: promos.includes('best') }] : []),
                ]}
                onToggle={toggle(promos, setPromos)}
              />
            )}
            {active && <Button variant="ghost" size="sm" onClick={clear}>{t(g.clear)}</Button>}
          </div>
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 9 }}>
        <div className="stack">
          <div className="listing-bar">
            <span className="muted row__grow">{shown.length} {t(g.results)}</span>
            <Select
              label={t(g.sortBy)}
              id="listing-sort"
              value={sort}
              options={[{ value: 'best', label: t(g.sortBest) }, { value: 'low', label: t(g.sortLow) }, { value: 'high', label: t(g.sortHigh) }, { value: 'name', label: t(g.sortName) }]}
              onChange={(e) => setSort(e.target.value as Sort)}
            />
          </div>
          {shown.length === 0 && <Card><p>{t(g.noMatch)}</p></Card>}
          <div className="listing-grid">
            {shown.map((p) => {
              const qty = cart.find((l) => l.productId === p.id)?.qty ?? 0
              const cut = onSale(p) ? Math.round((1 - p.price / p.originalPrice!) * 100) : 0
              return (
                <Card key={p.id}>
                  <Link to={detail(p.id)} className="card-link"><ProductImage label={t(p.name)} /></Link>
                  <span className="row">
                    <Badge>{t(p.brand ?? p.category)}</Badge>
                    {cut > 0 && <Badge tone="warning">{t(g.discount)} {cut}%</Badge>}
                  </span>
                  <Link to={detail(p.id)} className="card-link"><h3 className="article-card__title">{t(p.name)}</h3></Link>
                  <DataRow
                    label={<strong>{money(p.price)}</strong>}
                    value={
                      <span className="row">
                        {qty > 0 && <span className="muted">{t(s.inCart)}: {qty}</span>}
                        <Button size="sm" onClick={() => add(p.id)}>{t(s.add)}</Button>
                      </span>
                    }
                  />
                </Card>
              )
            })}
          </div>
        </div>
      </Col>
    </Grid>
  )
}
