import { useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, ChoiceCard, ChoiceGroup, Col, DataRow, Grid } from '../../../ui'
import { allLessonsDone, PROTOTYPE_ID, useCompleted, useCourses, useEnrollments, useResults } from '../data'
import { s } from '../strings'

export function QuizPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const { courseId } = useParams()
  const { courseById } = useCourses()
  const course = courseById(courseId)
  const [enrolled] = useEnrollments()
  const [completed] = useCompleted()
  const [results, setResults] = useResults()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [retaking, setRetaking] = useState(false)
  const base = `/${PROTOTYPE_ID}`

  if (!course || !enrolled.includes(course.id) || !allLessonsDone(completed, course)) {
    return <Navigate to={course ? `${base}/course/${course.id}${search}` : `${base}${search}`} replace />
  }

  const result = retaking ? undefined : results[course.id]
  const complete = course.quiz.every((q) => answers[q.id])

  const submit = () => {
    const score = course.quiz.filter((q) => answers[q.id] === q.correctId).length
    setResults({ ...results, [course.id]: { answers, score, total: course.quiz.length } })
    setRetaking(false)
  }

  if (result) {
    return (
      <Grid>
        <Col span={{ base: 4, sm: 8, md: 8 }}>
          <div className="stack">
            <Card>
              <Badge tone={result.score === result.total ? 'success' : 'warning'}>{t(s.quizResult)}</Badge>
              <h1>{t(s.score)} {result.score}/{result.total}</h1>
              <div className="row">
                <Button to={`${base}/progress${search}`}>{t(s.viewProgress)}</Button>
                <Button variant="secondary" onClick={() => { setAnswers({}); setRetaking(true) }}>{t(s.retake)}</Button>
              </div>
            </Card>
            {course.quiz.map((q) => {
              const ok = result.answers[q.id] === q.correctId
              const right = q.options.find((o) => o.id === q.correctId)
              return (
                <Card key={q.id}>
                  <Badge tone={ok ? 'success' : 'warning'}>{ok ? t(s.correct) : t(s.incorrect)}</Badge>
                  <h3>{t(q.question)}</h3>
                  {!ok && right && <DataRow muted label={t(s.rightAnswer)} value={t(right.text)} />}
                </Card>
              )
            })}
          </div>
        </Col>
      </Grid>
    )
  }

  return (
    <Grid>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <div className="stack">
          <h1>{t(s.quiz)} · {t(course.title)}</h1>
          {course.quiz.map((q, i) => (
            <Card key={q.id}>
              <h3>{i + 1}. {t(q.question)}</h3>
              <ChoiceGroup label={t(q.question)}>
                {q.options.map((o) => (
                  <ChoiceCard key={o.id} title={t(o.text)} selected={answers[q.id] === o.id} onSelect={() => setAnswers({ ...answers, [q.id]: o.id })} />
                ))}
              </ChoiceGroup>
            </Card>
          ))}
          {!complete && <p className="muted">{t(s.answerAll)}</p>}
          <div><Button disabled={!complete} onClick={submit}>{t(s.submitQuiz)}</Button></div>
        </div>
      </Col>
    </Grid>
  )
}
