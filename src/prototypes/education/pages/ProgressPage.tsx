import { useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, Col, DataRow, Grid, ProgressBar } from '../../../ui'
import { allLessonsDone, lessonsDone, nextLessonId, percent, PROTOTYPE_ID, useCompleted, useCourses, useEnrollments, useResults } from '../data'
import { s } from '../strings'

export function ProgressPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { courses } = useCourses()
  const [enrolled] = useEnrollments()
  const [completed] = useCompleted()
  const [results] = useResults()
  const base = `/${PROTOTYPE_ID}`
  const mine = courses.filter((c) => enrolled.includes(c.id))

  if (mine.length === 0) {
    return (
      <Grid>
        <Col>
          <Card>
            <h3>{t(s.noProgress)}</h3>
            <div><Button to={`${base}${search}`}>{t(s.browseCourses)}</Button></div>
          </Card>
        </Col>
      </Grid>
    )
  }

  return (
    <Grid>
      {mine.map((c) => {
        const done = lessonsDone(completed, c)
        const result = results[c.id]
        const finished = allLessonsDone(completed, c) && result
        return (
          <Col key={c.id} span={{ base: 4, sm: 8, md: 6 }}>
            <Card>
              <div className="row">
                <h3 className="row__grow">{t(c.title)}</h3>
                {finished && <Badge tone="success">{t(s.completed)}</Badge>}
              </div>
              <ProgressBar value={percent(done, c.lessons.length)} label={t(s.lessonsDone)} />
              <DataRow muted label={t(s.lessonsDone)} value={`${done}/${c.lessons.length} (${percent(done, c.lessons.length)}%)`} />
              <DataRow muted label={t(s.quizResult)} value={result ? `${result.score}/${result.total}` : t(s.notTaken)} />
              <div>
                <Button size="sm" to={`${base}/course/${c.id}${allLessonsDone(completed, c) ? '' : `/lesson/${nextLessonId(completed, c)}`}${search}`}>
                  {finished ? t(s.viewCourse) : t(s.continue)}
                </Button>
              </div>
            </Card>
          </Col>
        )
      })}
    </Grid>
  )
}
