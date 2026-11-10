import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Breadcrumb, Button, Card, Col, DataRow, Grid } from '../../../ui'
import { courseFinished, PROTOTYPE_ID, useCompleted, useCourses, useEnrollments, useResults } from '../data'
import { s } from '../strings'

// A certificate for a finished course, drawn from Card and text. Printing leaves out the frame around it.
export function CertificatePage() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const { courseId } = useParams()
  const { dataset } = useDataset()
  const { courseById } = useCourses()
  const course = courseById(courseId)
  const [enrolled] = useEnrollments()
  const [completed] = useCompleted()
  const [results] = useResults()
  const base = `/${PROTOTYPE_ID}`

  if (!course || !enrolled.includes(course.id) || !courseFinished(completed, results, course)) {
    return <Navigate to={course ? `${base}/course/${course.id}${search}` : `${base}${search}`} replace />
  }
  const result = results[course.id]
  const date = new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'long' }).format(new Date(result.takenAt))
  const brand = t(dataset.brandName)

  return (
    <Grid>
      <Col>
        <div className="no-print">
          <Breadcrumb label={t(s.breadcrumb)} items={[{ label: t(s.courses), to: `${base}${search}` }, { label: t(course.title), to: `${base}/course/${course.id}${search}` }, { label: t(s.certificate) }]} />
        </div>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <span className="muted">{brand}</span>
            <h1>{t(s.certHeading)}</h1>
            <p>{t(s.certGiven)}</p>
            <h2>{t(dataset.ecommerce.account.name)}</h2>
            <p>{t(s.certText)}</p>
            <h2>{t(course.title)}</h2>
            <DataRow label={t(s.certScore)} value={`${result.score}/${result.total}`} />
            <DataRow label={t(s.certDate)} value={date} />
            <span className="muted">{t(s.certNote)}</span>
          </div>
        </Card>
      </Col>
      <Col>
        <div className="row no-print">
          <Button onClick={() => window.print()}>{t(s.print)}</Button>
          <Button variant="secondary" to={`${base}/course/${course.id}${search}`}>{t(s.backToCourse)}</Button>
        </div>
      </Col>
    </Grid>
  )
}
