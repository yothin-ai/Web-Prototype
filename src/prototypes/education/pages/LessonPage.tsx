import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Breadcrumb, Button, Card, Col, DataRow, Grid, ProductImage, ProgressBar, Textarea } from '../../../ui'
import { allLessonsDone, PROTOTYPE_ID, useActivity, useBookmarks, useCompleted, useCourses, useEnrollments, useNotes } from '../data'
import { s } from '../strings'

// The mock player runs a lesson's length in about this many seconds, so the demo does not wait minutes.
const DEMO_SECONDS = 20
const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`

export function LessonPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const navigate = useNavigate()
  const { courseId, lessonId } = useParams()
  const { courseById } = useCourses()
  const course = courseById(courseId)
  const [enrolled] = useEnrollments()
  const [completed, setCompleted] = useCompleted()
  const [notes, setNotes] = useNotes()
  const [bookmarks, setBookmarks] = useBookmarks()
  const [activity, setActivity] = useActivity()
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  const base = `/${PROTOTYPE_ID}`

  const index = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1
  const lesson = course && index >= 0 ? course.lessons[index] : undefined
  const length = (lesson?.minutes ?? 1) * 60

  // A new lesson starts the player again from the top.
  useEffect(() => {
    setPlaying(false)
    setPosition(0)
  }, [courseId, lessonId])

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      setPosition((p) => {
        const next = p + length / DEMO_SECONDS / 4
        if (next >= length) {
          setPlaying(false)
          return length
        }
        return next
      })
    }, 250)
    return () => window.clearInterval(timer)
  }, [playing, length])

  if (!course || !lesson || !enrolled.includes(course.id)) {
    return <Navigate to={course ? `${base}/course/${course.id}${search}` : `${base}${search}`} replace />
  }

  const done = completed[course.id] ?? []
  const isDone = done.includes(lesson.id)
  const next = course.lessons[index + 1]
  const noteKey = `${course.id}:${lesson.id}`
  const marked = bookmarks[course.id] === lesson.id

  const finish = () => {
    const nextDone = isDone ? done : [...done, lesson.id]
    const nextCompleted = { ...completed, [course.id]: nextDone }
    setCompleted(nextCompleted)
    if (!isDone) setActivity([...activity, new Date().toISOString()])
    if (next) navigate(`${base}/course/${course.id}/lesson/${next.id}${search}`)
    else if (allLessonsDone(nextCompleted, course)) navigate(`${base}/course/${course.id}/quiz${search}`)
    else navigate(`${base}/course/${course.id}${search}`)
  }
  const toggleBookmark = () => {
    const rest = { ...bookmarks }
    if (marked) delete rest[course.id]
    else rest[course.id] = lesson.id
    setBookmarks(rest)
  }

  return (
    <Grid>
      <Col>
        <Breadcrumb label={t(s.breadcrumb)} items={[{ label: t(s.courses), to: `${base}${search}` }, { label: t(course.title), to: `${base}/course/${course.id}${search}` }, { label: t(lesson.title) }]} />
      </Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <div className="stack">
          <Card>
            <div role="group" aria-label={t(s.videoLabel)} className="stack">
              <ProductImage label={t(lesson.title)} wide />
              <ProgressBar value={Math.round((position / length) * 100)} label={t(s.videoLabel)} />
              <div className="row">
                <Button size="sm" variant="secondary" aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? t(s.pause) : t(s.play)}</Button>
                <span>{clock(position)} / {clock(length)}</span>
              </div>
              <span className="muted">{t(s.videoSample)}</span>
            </div>
          </Card>
          <Card>
            <div className="row">
              <Badge>{t(s.lessonOf)} {index + 1} {t(s.of)} {course.lessons.length}</Badge>
              {isDone && <Badge tone="success">{t(s.completed)}</Badge>}
              {marked && <Badge tone="info">{t(s.bookmarked)}</Badge>}
            </div>
            <h1>{t(lesson.title)}</h1>
            <p>{t(lesson.body)}</p>
            <DataRow muted label={`${lesson.minutes} ${t(s.minutes)}`} />
            <div className="row">
              <Button onClick={finish}>{next ? `${t(s.finishLesson)} · ${t(s.nextLesson)}` : t(s.finishLesson)}</Button>
              <Button variant="secondary" onClick={toggleBookmark}>{marked ? t(s.removeBookmark) : t(s.bookmark)}</Button>
              <Button variant="ghost" to={`${base}/course/${course.id}${search}`}>{t(s.backToCourse)}</Button>
            </div>
          </Card>
          <Card>
            <h3>{t(s.noteTitle)}</h3>
            <Textarea label={t(s.noteLabel)} id={`edu-note-${lesson.id}`} value={notes[noteKey] ?? ''} hint={t(s.noteHint)} onChange={(e) => setNotes({ ...notes, [noteKey]: e.target.value })} />
          </Card>
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Card>
          <h3>{t(s.lessonList)}</h3>
          <ProgressBar value={Math.round((done.length / course.lessons.length) * 100)} label={t(s.lessonsDone)} />
          <nav aria-label={t(s.lessonList)} className="stack">
            {course.lessons.map((l, i) => (
              <div key={l.id} className="row">
                <Link to={`${base}/course/${course.id}/lesson/${l.id}${search}`} aria-current={l.id === lesson.id ? 'page' : undefined} className="row__grow">
                  {i + 1}. {l.id === lesson.id ? <strong>{t(l.title)}</strong> : t(l.title)}
                </Link>
                {done.includes(l.id) && <Badge tone="success">{t(s.completed)}</Badge>}
              </div>
            ))}
          </nav>
        </Card>
      </Col>
    </Grid>
  )
}
