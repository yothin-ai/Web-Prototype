import { useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Breadcrumb, Button, Card, Checkbox, ChoiceCard, ChoiceGroup, Col, DataRow, Grid, Notice } from '../../../ui'
import { allLessonsDone, percent, PROTOTYPE_ID, quizPassed, useCompleted, useCourses, useEnrollments, useResults } from '../data'
import { s } from '../strings'

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
const sameSet = (a: string[], b: string[]) => a.length === b.length && a.every((x) => b.includes(x))

export function QuizPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { courseId } = useParams()
  const { courseById } = useCourses()
  const course = courseById(courseId)
  const [enrolled] = useEnrollments()
  const [completed] = useCompleted()
  const [results, setResults] = useResults()
  const [answers, setAnswers] = useState<Record<string, string[]>>({})
  const [retaking, setRetaking] = useState(false)
  const [left, setLeft] = useState(() => (course?.quizMinutes ?? 10) * 60)
  const [timedOut, setTimedOut] = useState(false)
  const base = `/${PROTOTYPE_ID}`
  const stored = course ? results[course.id] : undefined
  const result = retaking ? undefined : stored
  const answersRef = useRef(answers)
  answersRef.current = answers

  const submit = (given: Record<string, string[]>) => {
    if (!course) return
    const score = course.quiz.filter((q) => sameSet(given[q.id] ?? [], q.correctIds)).length
    setResults({ ...results, [course.id]: { answers: given, score, total: course.quiz.length, takenAt: new Date().toISOString() } })
    setRetaking(false)
  }

  const running = !!course && !result
  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => setLeft((n) => n - 1), 1000)
    return () => window.clearInterval(timer)
  }, [running])
  useEffect(() => {
    if (running && left <= 0) {
      setTimedOut(true)
      submit(answersRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, running])

  if (!course || !enrolled.includes(course.id) || !allLessonsDone(completed, course)) {
    return <Navigate to={course ? `${base}/course/${course.id}${search}` : `${base}${search}`} replace />
  }

  const complete = course.quiz.every((q) => (answers[q.id] ?? []).length > 0)
  const toggle = (qid: string, oid: string, multi: boolean, on: boolean) => {
    setAnswers((all) => {
      const cur = all[qid] ?? []
      return { ...all, [qid]: multi ? (on ? [...cur, oid] : cur.filter((x) => x !== oid)) : [oid] }
    })
  }
  const crumbs = <Breadcrumb label={t(s.breadcrumb)} items={[{ label: t(s.courses), to: `${base}${search}` }, { label: t(course.title), to: `${base}/course/${course.id}${search}` }, { label: t(s.quiz) }]} />

  if (result) {
    const ok = quizPassed(result)
    return (
      <Grid>
        <Col>{crumbs}</Col>
        <Col span={{ base: 4, sm: 8, md: 8 }}>
          <div className="stack">
            {timedOut && <Notice tone="info">{t(s.timeUp)}</Notice>}
            <Card>
              <Badge tone={ok ? 'success' : 'warning'}>{t(ok ? s.passed : s.notPassed)}</Badge>
              <h1>{t(s.score)} {result.score}/{result.total} ({percent(result.score, result.total)}%)</h1>
              <p className="muted">{t(s.quizIntro)}</p>
              <div className="row">
                {ok && <Button to={`${base}/course/${course.id}/certificate${search}`}>{t(s.viewCertificate)}</Button>}
                <Button variant="secondary" to={`${base}/progress${search}`}>{t(s.viewProgress)}</Button>
                <Button variant="secondary" onClick={() => { setAnswers({}); setLeft(course.quizMinutes * 60); setTimedOut(false); setRetaking(true) }}>{t(s.retake)}</Button>
              </div>
            </Card>
            {course.quiz.map((q, i) => {
              const given = result.answers[q.id] ?? []
              const right = sameSet(given, q.correctIds)
              const text = (ids: string[]) => ids.map((id) => t(q.options.find((o) => o.id === id)?.text ?? { th: '', en: '' })).join(', ')
              return (
                <Card key={q.id}>
                  <Badge tone={right ? 'success' : 'warning'}>{right ? t(s.correct) : t(s.incorrect)}</Badge>
                  <h3>{i + 1}. {t(q.question)}</h3>
                  <DataRow muted label={t(s.yourAnswer)} value={given.length ? text(given) : t(s.noAnswer)} />
                  {!right && <DataRow muted label={t(s.rightAnswer)} value={text(q.correctIds)} />}
                </Card>
              )
            })}
          </div>
        </Col>
      </Grid>
    )
  }

  const urgent = left <= 60
  return (
    <Grid>
      <Col>{crumbs}</Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <div className="stack">
          <h1>{t(s.quiz)} · {t(course.title)}</h1>
          <Card>
            <div className="row">
              <span>{t(s.timeLeft)}</span>
              <Badge tone={urgent ? 'danger' : 'info'}>{clock(Math.max(0, left))}</Badge>
              <span className="muted">{t(s.quizIntro)}</span>
            </div>
          </Card>
          {course.quiz.map((q, i) => {
            const multi = q.correctIds.length > 1
            return (
              <Card key={q.id}>
                <h3>{t(s.questionOf)} {i + 1}/{course.quiz.length}: {t(q.question)}</h3>
                <p className="muted">{multi ? t(s.pickAll) : t(s.pickOne)}</p>
                {multi ? (
                  <div className="stack" role="group" aria-label={t(q.question)}>
                    {q.options.map((o) => <Checkbox key={o.id} label={t(o.text)} checked={(answers[q.id] ?? []).includes(o.id)} onChange={(on) => toggle(q.id, o.id, true, on)} />)}
                  </div>
                ) : (
                  <ChoiceGroup label={t(q.question)}>
                    {q.options.map((o) => (
                      <ChoiceCard key={o.id} title={t(o.text)} selected={(answers[q.id] ?? [])[0] === o.id} onSelect={() => toggle(q.id, o.id, false, true)} />
                    ))}
                  </ChoiceGroup>
                )}
              </Card>
            )
          })}
          {!complete && <p className="muted">{t(s.answerAll)}</p>}
          <div><Button disabled={!complete} onClick={() => submit(answers)}>{t(s.submitQuiz)}</Button></div>
        </div>
      </Col>
    </Grid>
  )
}

