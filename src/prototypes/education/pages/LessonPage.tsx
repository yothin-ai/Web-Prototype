import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, Col, DataRow, Grid } from '../../../ui'
import { allLessonsDone, PROTOTYPE_ID, useCompleted, useCourses, useEnrollments } from '../data'
import { s } from '../strings'

export function LessonPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const navigate = useNavigate()
  const { courseId, lessonId } = useParams()
  const { courseById } = useCourses()
  const course = courseById(courseId)
  const [enrolled] = useEnrollments()
  const [completed, setCompleted] = useCompleted()
  const base = `/${PROTOTYPE_ID}`

  const index = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1
  if (!course || index < 0 || !enrolled.includes(course.id)) {
    return <Navigate to={course ? `${base}/course/${course.id}${search}` : `${base}${search}`} replace />
  }

  const lesson = course.lessons[index]
  const done = completed[course.id] ?? []
  const isDone = done.includes(lesson.id)
  const next = course.lessons[index + 1]

  const finish = () => {
    const nextDone = isDone ? done : [...done, lesson.id]
    const nextCompleted = { ...completed, [course.id]: nextDone }
    setCompleted(nextCompleted)
    if (next) navigate(`${base}/course/${course.id}/lesson/${next.id}${search}`)
    else if (allLessonsDone(nextCompleted, course)) navigate(`${base}/course/${course.id}/quiz${search}`)
    else navigate(`${base}/course/${course.id}${search}`)
  }

  return (
    <Grid>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <Card>
          <div className="row">
            <Badge>{t(s.lessonOf)} {index + 1} {t(s.of)} {course.lessons.length}</Badge>
            {isDone && <Badge tone="success">{t(s.completed)}</Badge>}
          </div>
          <h1>{t(lesson.title)}</h1>
          <p>{t(lesson.body)}</p>
          <DataRow muted label={`${lesson.minutes} ${t(s.minutes)}`} />
          <div className="row">
            <Button onClick={finish}>{next ? `${t(s.finishLesson)} · ${t(s.nextLesson)}` : t(s.finishLesson)}</Button>
            <Button variant="ghost" to={`${base}/course/${course.id}${search}`}>{t(s.backToCourse)}</Button>
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
