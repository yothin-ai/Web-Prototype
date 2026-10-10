import { useLocation, useSearchParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Breadcrumb } from '../../../ui'
import { PROTOTYPE_ID, useEcommerce } from '../cart'
import { s } from '../strings'
import { ProductListing } from './ProductListing'

// Every product, or the ones matching the `q` search term, in the shared product list.
export function Browse() {
  const { t } = useLang()
  const [params] = useSearchParams()
  const { search } = useLocation()
  const { products } = useEcommerce()
  const q = (params.get('q') ?? '').trim().toLowerCase()

  const matches = (text: string) => text.toLowerCase().includes(q)
  const shown = q
    ? products.filter((p) => matches(t(p.name)) || matches(t(p.category)) || (p.brand && matches(t(p.brand))))
    : products
  const title = q ? `${t(s.resultsTitle)}: ${params.get('q')}` : t(s.allProducts)

  return (
    <ProductListing
      products={shown}
      head={
        <div className="stack">
          <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `/${PROTOTYPE_ID}${search}` }, { label: title }]} />
          <h1>{title}</h1>
        </div>
      }
    />
  )
}
