import { useLocation, useParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Breadcrumb, Button, Card, CategoryCard, Col, Grid, IconCircle, ProductImage } from '../../../ui'
import { PROTOTYPE_ID, useEcommerce } from '../cart'
import { productsFor } from '../category'
import { jobGroups } from '../jobGroups'
import { g } from '../listingStrings'
import { s } from '../strings'
import { ProductListing } from './ProductListing'

// One job (cards of the product groups it needs) or, with a group in the address, that group's products.
export function JobPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { job = '', group } = useParams()
  const { dataset } = useDataset()
  const { products } = useEcommerce()
  const home = dataset.ecommerce.home
  const base = `/${PROTOTYPE_ID}`
  const index = Number(job)
  const item = home.jobs[index]
  const groups = (item && jobGroups[item.th ?? '']) ?? []
  const groupIndex = group === undefined ? -1 : Number(group)
  const picked = groups[groupIndex]

  if (!item || (group !== undefined && !picked)) {
    return (
      <Grid>
        <Col>
          <Card>
            <h3>{t(g.jobNotFound)}</h3>
            <div><Button to={`${base}/jobs${search}`}>{t(g.backToJobs)}</Button></div>
          </Card>
        </Col>
      </Grid>
    )
  }

  const crumbs = [
    { label: t(s.home), to: `${base}${search}` },
    { label: t(home.jobsTitle), to: `${base}/jobs${search}` },
    ...(picked ? [{ label: t(item), to: `${base}/job/${index}${search}` }, { label: t(picked) }] : [{ label: t(item) }]),
  ]

  if (picked) {
    return (
      <ProductListing
        products={productsFor(products, [94, index, groupIndex])}
        head={
          <div className="stack">
            <Breadcrumb label={t(s.breadcrumbLabel)} items={crumbs} />
            <h1>{t(picked)}</h1>
          </div>
        }
      />
    )
  }

  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(s.breadcrumbLabel)} items={crumbs} />
          <div className="category-title">
            <IconCircle size="lg" />
            <h1>{t(item)}</h1>
          </div>
        </div>
      </Col>
      {groups.map((grp, i) => (
        <Col key={i} span={{ base: 4, sm: 8, md: 6 }}>
          <CategoryCard title={t(grp)} text="" actionLabel={t(g.shopNow)} to={`${base}/job/${index}/${i}${search}`} thumb={<ProductImage label={t(grp)} />} />
        </Col>
      ))}
    </Grid>
  )
}
