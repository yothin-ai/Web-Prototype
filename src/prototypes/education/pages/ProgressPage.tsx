import { useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, CardGrid, Col, DataRow, Grid, ProgressBar, Select, StatCard } from '../../../ui'
import { allLessonsDone, courseFinished, lessonsDone, nextLessonId, percent, PROTOTYPE_ID, quizPassed, useActivity, useBookmarks, useCompleted, useCourses, useEnrollments, useGoal, useResults } from '../data'
import { s } from '../strings'

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

export function ProgressPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { courses } = useCourses()
  const [enrolled] = useEnrollments()
  const [completed] = useCompleted()
  const [results] = useResults()
  const [bookmarks] = useBookmarks()
  const [activity] = useActivity()
  const [goal, setGoal] = useGoal()
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

  const lessonCount = mine.reduce((n, c) => n + lessonsDone(completed, c), 0)
  const minutes = mine.reduce((n, c) => n + c.lessons.filter((l) => (completed[c.id] ?? []).includes(l.id)).reduce((m, l) => m + l.minutes, 0), 0)
  const certs = mine.filter((c) => courseFinished(completed, results, c)).length
  const thisWeek = activity.filter((a) => Date.now() - new Date(a).getTime() <= WEEK_MS).length
  const timeText = minutes < 60 ? `${minutes} ${t(s.minutes)}` : `${Math.round((minutes / 60) * 10) / 10} ${t(s.hours)}`
  const marks = mine.filter((c) => bookmarks[c.id])

  return (
    <Grid>
      <Col>
        <div className="stack">
          <h1>{t(s.dashTitle)}</h1>
          <p className="muted">{t(s.dashText)}</p>
        </div>
      </Col>
      <Col>
        <CardGrid size="small">
          <StatCard icon="orders" label={t(s.statCourses)} value={String(mine.length)} note={t(s.statNote)} />
          <StatCard icon="check" label={t(s.statLessons)} value={String(lessonCount)} note={t(s.statNote)} />
          <StatCard icon="clock" label={t(s.statTime)} value={timeText} note={t(s.statNote)} />
          <StatCard icon="star" label={t(s.statCerts)} value={String(certs)} note={t(s.statNote)} />
        </CardGrid>
      </Col>
      <Col>
        <CardGrid size="large">
          <Card>
            <h3>{t(s.goalTitle)}</h3>
            <Select label={t(s.goalLabel)} id="edu-goal" value={String(goal)} onChange={(e) => setGoal(Number(e.target.value))} options={[1, 2, 3, 5, 7, 10].map((n) => ({ value: String(n), label: String(n) }))} />
            <ProgressBar value={percent(Math.min(thisWeek, goal), goal)} label={t(s.goalProgress)} />
            <DataRow muted label={t(s.goalProgress)} value={`${thisWeek}/${goal}`} />
            {thisWeek >= goal && <Badge tone="success">{t(s.goalReached)}</Badge>}
          </Card>
          <Card>
            <h3>{t(s.bookmarksTitle)}</h3>
            {marks.length === 0 && <p className="muted">{t(s.bookmark)}</p>}
            {marks.map((c) => {
              const lesson = c.lessons.find((l) => l.id === bookmarks[c.id])
              return lesson ? (
                <div key={c.id} className="row">
                  <span className="row__grow">{t(c.title)} · {t(lesson.title)}</span>
                  <Button size="sm" variant="secondary" to={`${base}/course/${c.id}/lesson/${lesson.id}${search}`}>{t(s.openLesson)}</Button>
                </div>
              ) : null
            })}
          </Card>
        </CardGrid>
      </Col>
      <Col>
        <h2>{t(s.myCourses)}</h2>
      </Col>
      <Col>
        <CardGrid size="medium">
          {mine.map((c) => {
            const done = lessonsDone(completed, c)
            const result = results[c.id]
            const finished = courseFinished(completed, results, c)
            const lessonsAll = allLessonsDone(completed, c)
            return (
              <Card key={c.id}>
                <div className="row">
                  <h3 className="row__grow">{t(c.title)}</h3>
                  {finished && <Badge tone="success">{t(s.completed)}</Badge>}
                </div>
                <ProgressBar value={percent(done, c.lessons.length)} label={t(s.lessonsDone)} />
                <DataRow muted label={t(s.lessonsDone)} value={`${done}/${c.lessons.length} (${percent(done, c.lessons.length)}%)`} />
                <DataRow muted label={t(s.quizResult)} value={result ? `${result.score}/${result.total}${quizPassed(result) ? ` · ${t(s.passed)}` : ''}` : t(s.notTaken)} />
                <div className="row card-grid__push">
                  <Button size="sm" to={`${base}/course/${c.id}${lessonsAll ? '' : `/lesson/${nextLessonId(completed, c)}`}${search}`}>{finished ? t(s.viewCourse) : t(s.continue)}</Button>
                  {lessonsAll && !finished && <Button size="sm" variant="secondary" to={`${base}/course/${c.id}/quiz${search}`}>{t(s.takeQuiz)}</Button>}
                  {finished && <Button size="sm" variant="secondary" to={`${base}/course/${c.id}/certificate${search}`}>{t(s.viewCertificate)}</Button>}
                </div>
              </Card>
            )
          })}
        </CardGrid>
      </Col>
    </Grid>
  )
}
