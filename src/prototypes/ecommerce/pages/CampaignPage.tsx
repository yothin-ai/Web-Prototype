import { useLocation, useParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Breadcrumb, Button, Card, Col, Grid, Hero } from '../../../ui'
import { PROTOTYPE_ID, useEcommerce } from '../cart'
import { productsFor } from '../category'
import { g } from '../listingStrings'
import { s } from '../strings'
import { ProductListing } from './ProductListing'

// A campaign page: a banner and the products of the slide or shortcut circle that led here.
// The address is "slide-0" or "circle-3", the position in the home page lists.
export function CampaignPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { key = '' } = useParams()
  const { dataset } = useDataset()
  const { products } = useEcommerce()
  const { home } = dataset.ecommerce
  const [kind, n] = key.split('-')
  const index = Number(n)
  const item = kind === 'slide' ? home.slides[index] : kind === 'circle' ? { title: home.circles[index], text: undefined } : undefined
  const base = `/${PROTOTYPE_ID}`

  if (!item?.title) {
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
  return (
    <ProductListing
      products={productsFor(products, [kind === 'slide' ? 90 : 91, index])}
      head={
        <div className="stack">
          <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search}` }, { label: t(item.title) }]} />
          <Hero title={t(item.title)} subtitle={item.text ? t(item.text) : undefined} />
        </div>
      }
    />
  )
}
