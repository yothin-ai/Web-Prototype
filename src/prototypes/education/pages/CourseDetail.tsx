import { useLocation, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, Col, DataRow, Grid, ProgressBar } from '../../../ui'
import { allLessonsDone, percent, PROTOTYPE_ID, useCompleted, useCourses, useEnrollments, useResults } from '../data'
import { s } from '../strings'

export function CourseDetail() {
  const { t } = useLang()
  const { search } = useLocation()
  const { courseId } = useParams()
  const { courseById } = useCourses()
  const course = courseById(courseId)
  const [enrolled, setEnrolled] = useEnrollments()
  const [completed] = useCompleted()
  const [results] = useResults()
  const base = `/${PROTOTYPE_ID}`

  if (!course) {
    return (
      <Grid><Col><Card><h3>{t(s.notFound)}</h3><div><Button to={`${base}${search}`}>{t(s.browseCourses)}</Button></div></Card></Col></Grid>
    )
  }

  const isEnrolled = enrolled.includes(course.id)
  const done = completed[course.id] ?? []
  const unlocked = isEnrolled && allLessonsDone(completed, course)
  const result = results[course.id]

  return (
    <Grid>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <div className="stack">
          <Badge>{t(course.level)}</Badge>
          <h1>{t(course.title)}</h1>
          <p className="muted">{t(course.summary)}</p>
          <Card>
            <h3>{t(s.lessons)}</h3>
            {isEnrolled && <ProgressBar value={percent(done.length, course.lessons.length)} label={t(s.lessonsDone)} />}
            {course.lessons.map((l, i) => (
              <DataRow
                key={l.id}
                label={`${i + 1}. ${t(l.title)} · ${l.minutes} ${t(s.minutes)}`}
                value={
                  isEnrolled ? (
                    <Button to={`${base}/course/${course.id}/lesson/${l.id}${search}`} size="sm" variant={done.includes(l.id) ? 'ghost' : 'secondary'}>
                      {done.includes(l.id) ? t(s.review) : t(s.start)}
                    </Button>
                  ) : undefined
                }
              />
            ))}
          </Card>
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Card>
          {isEnrolled ? <Badge tone="success">{t(s.enrolled)}</Badge> : <p className="muted">{t(s.locked)}</p>}
          {!isEnrolled && <Button onClick={() => setEnrolled([...enrolled, course.id])}>{t(s.enroll)}</Button>}
          {isEnrolled && (
            <>
              <h3>{t(s.quiz)}</h3>
              {!unlocked && <p className="muted">{t(s.quizLocked)}</p>}
              {result && <DataRow label={t(s.score)} value={`${result.score}/${result.total}`} />}
              <Button disabled={!unlocked} to={unlocked ? `${base}/course/${course.id}/quiz${search}` : undefined}>{t(s.takeQuiz)}</Button>
              <Button variant="ghost" to={`${base}/progress${search}`}>{t(s.viewProgress)}</Button>
            </>
          )}
        </Card>
      </Col>
    </Grid>
  )
}
