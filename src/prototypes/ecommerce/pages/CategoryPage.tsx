import { useLocation, useParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Breadcrumb, Button, Card, CategoryCard, CategoryPills, CategoryTile, Col, Grid, IconCircle, ProductImage } from '../../../ui'
import { useEcommerce, PROTOTYPE_ID } from '../cart'
import { joinLabels, nodeAt, productsFor, slugToPath, useCategoryLink } from '../category'
import { g } from '../listingStrings'
import { s } from '../strings'
import { ProductListing } from './ProductListing'

// The three category pages: main category (cards), subcategory (tiles) and item (product list).
export function CategoryPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { slug } = useParams()
  const { dataset } = useDataset()
  const { products } = useEcommerce()
  const link = useCategoryLink()
  const menu = dataset.ecommerce.home.menu
  const path = slugToPath(slug)
  const node = path.every((n) => Number.isInteger(n) && n >= 0) ? nodeAt(menu, path) : undefined
  const base = `/${PROTOTYPE_ID}`

  if (!node) {
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

  const crumbs = [
    { label: t(s.home), to: `${base}${search}` },
    ...path.slice(0, -1).map((_, i) => ({ label: t(nodeAt(menu, path.slice(0, i + 1))!.label), to: link(path.slice(0, i + 1)) })),
    { label: t(node.label) },
  ]
  const thumb = (label: string) => <ProductImage label={label} />
  const title = (
    <div className="category-title">
      <IconCircle size="lg" />
      <h1>{t(node.label)}</h1>
    </div>
  )
  const heading = (
    <div className="stack">
      <Breadcrumb label={t(s.breadcrumbLabel)} items={crumbs} />
      {title}
    </div>
  )
  const children = node.children ?? []

  if (children.length > 0 && path.length === 1) {
    return (
      <Grid>
        <Col>{heading}</Col>
        {children.map((c, i) => (
          <Col key={i} span={{ base: 4, sm: 8, md: 6 }}>
            <CategoryCard title={t(c.label)} text={joinLabels(c.children, t)} actionLabel={t(g.shopNow)} to={link([...path, i])} thumb={thumb(t(c.label))} />
          </Col>
        ))}
      </Grid>
    )
  }

  if (children.length > 0) {
    return (
      <Grid>
        <Col>{heading}</Col>
        <Col>
          <div className="listing-grid">
            {children.map((c, i) => (
              <CategoryTile key={i} title={t(c.label)} to={link([...path, i])} thumb={thumb(t(c.label))} />
            ))}
          </div>
        </Col>
      </Grid>
    )
  }

  // An item (or a node with nothing below it): its products, with its siblings as pills.
  const parentPath = path.slice(0, -1)
  const siblings = parentPath.length > 0 ? nodeAt(menu, parentPath)?.children ?? [] : menu
  const pills = [
    ...(parentPath.length > 0 ? [{ label: t(g.all), to: link(parentPath), active: false }] : []),
    ...siblings.map((n, i) => ({ label: t(n.label), to: link([...parentPath, i]), active: i === path[path.length - 1] })),
  ]
  return (
    <ProductListing
      products={productsFor(products, path)}
      head={<div className="stack">{heading}<CategoryPills label={t(g.siblings)} items={pills} /></div>}
    />
  )
}
