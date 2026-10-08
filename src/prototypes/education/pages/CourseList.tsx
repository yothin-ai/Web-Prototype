import { useLang } from '../../../i18n'
import { Badge, Button, Card, Col, DataRow, Grid, ProductImage } from '../../../ui'
import { PROTOTYPE_ID, useCourses, useEnrollments } from '../data'
import { s } from '../strings'
import { useLocation } from 'react-router-dom'

export function CourseList() {
  const { t } = useLang()
  const { search } = useLocation()
  const { courses } = useCourses()
  const [enrolled] = useEnrollments()

  return (
    <Grid>
      {courses.map((c) => (
        <Col key={c.id} span={{ base: 4, sm: 4, md: 4 }}>
          <Card>
            <ProductImage label={t(c.title)} />
            <div className="row">
              <Badge>{t(c.level)}</Badge>
              {enrolled.includes(c.id) && <Badge tone="success">{t(s.enrolled)}</Badge>}
            </div>
            <h3>{t(c.title)}</h3>
            <p className="muted">{t(c.summary)}</p>
            <DataRow muted label={t(s.lessonsCount)} value={c.lessons.length} />
            <div><Button to={`/${PROTOTYPE_ID}/course/${c.id}${search}`} size="sm">{t(s.viewCourse)}</Button></div>
          </Card>
        </Col>
      ))}
    </Grid>
  )
}
