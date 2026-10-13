import { useLocation, useParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Breadcrumb, Button, Card, Col, Grid } from '../../../ui'
import { PROTOTYPE_ID, useEcommerce } from '../cart'
import { productsFor } from '../category'
import { g } from '../listingStrings'
import { s } from '../strings'
import { ProductListing } from './ProductListing'

// A brand page: the products of that brand, or a fixed sample when the Dataset has none under that name.
export function BrandPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { index = '' } = useParams()
  const { dataset } = useDataset()
  const { products } = useEcommerce()
  const brand = dataset.ecommerce.home.brands[Number(index)]
  const base = `/${PROTOTYPE_ID}`

  if (!brand) {
    return (
      <Grid>
        <Col>
          <Card>
            <h3>{t(g.notFound)}</h3>
            <div><Button to={`${base}${search}`}>{t(g.backHome)}</Button></div>
          </Card>
        </Col>
      </Grid>
    )
  }
  const own = products.filter((p) => p.brand?.th === brand.th)
  return (
    <ProductListing
      products={own.length > 0 ? own : productsFor(products, [92, Number(index)])}
      head={
        <div className="stack">
          <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search}` }, { label: t(brand) }]} />
          <h1>{t(brand)}</h1>
        </div>
      }
    />
  )
}
