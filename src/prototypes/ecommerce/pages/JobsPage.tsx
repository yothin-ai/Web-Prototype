import { useLocation } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { jobImage } from '../../../assets/jobs'
import { Breadcrumb, CategoryTile, Col, Grid, ProductImage } from '../../../ui'
import { PROTOTYPE_ID } from '../cart'
import { s } from '../strings'

// Every job as a tile with its name on the picture; a tile opens that job's product groups.
export function JobsPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { dataset } = useDataset()
  const home = dataset.ecommerce.home
  const base = `/${PROTOTYPE_ID}`
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search}` }, { label: t(home.jobsTitle) }]} />
          <h1>{t(home.jobsTitle)}</h1>
        </div>
      </Col>
      <Col>
        <div className="listing-grid">
          {home.jobs.map((job, i) => (
            <CategoryTile key={i} overlay title={t(job)} to={`${base}/job/${i}${search}`} thumb={<ProductImage label={t(job)} src={jobImage(job)} />} />
          ))}
        </div>
      </Col>
    </Grid>
  )
}
