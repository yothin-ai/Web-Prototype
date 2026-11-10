import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Accordion, Badge, Breadcrumb, Button, Card, CardGrid, Col, DataRow, Grid, IconCircle, Notice, ProgressBar, RatingStars, StickyActionBar, Tabs, Textarea } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { useNarrow } from '../../ecommerce/useNarrow'
import { allLessonsDone, courseFinished, courseMinutes, levelLabel, nextLessonId, percent, PROTOTYPE_ID, ratingSplit, useCompleted, useCourses, useEnrollments, useMyReviews, useResults } from '../data'
import { s } from '../strings'

export function CourseDetail() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const { courseId } = useParams()
  const { dataset } = useDataset()
  const { courseById } = useCourses()
  const course = courseById(courseId)
  const [enrolled, setEnrolled] = useEnrollments()
  const [completed] = useCompleted()
  const [results] = useResults()
  const [mine, setMine] = useMyReviews()
  const narrow = useNarrow()
  const [draftRating, setDraftRating] = useState(0)
  const [draftText, setDraftText] = useState('')
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const base = `/${PROTOTYPE_ID}`

  if (!course) {
    return (
      <Grid><Col><Card><h3>{t(s.notFound)}</h3><div><Button to={`${base}${search}`}>{t(s.browseCourses)}</Button></div></Card></Col></Grid>
    )
  }

  const { categories, instructors, reviews, faq } = dataset.education
  const instructor = instructors.find((i) => i.id === course.instructorId)
  const category = categories.find((c) => c.id === course.categoryId)
  const isEnrolled = enrolled.includes(course.id)
  const done = completed[course.id] ?? []
  const allDone = allLessonsDone(completed, course)
  const result = results[course.id]
  const finished = courseFinished(completed, results, course)
  const pct = percent(done.length, course.lessons.length)
  const mins = courseMinutes(course)
  const hoursText = mins < 60 ? `${mins} ${t(s.minutes)}` : `${Math.round((mins / 60) * 10) / 10} ${t(s.hours)}`
  const priceText = course.price === 0 ? t(s.free) : formatMoney(course.price, lang)
  const myReview = mine[course.id]
  const split = ratingSplit(course.rating)
  const expectation = Math.round(course.rating * 20)
  const resumeTo = `${base}/course/${course.id}/lesson/${nextLessonId(completed, course)}${search}`
  const dateText = (iso: string) => new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium' }).format(new Date(iso))

  const enroll = () => setEnrolled([...enrolled, course.id])
  const sendReview = () => {
    if (draftRating === 0) return
    setMine({ ...mine, [course.id]: { rating: draftRating, text: draftText.trim(), date: new Date().toISOString() } })
    setEditing(false)
    setSaved(true)
  }

  const detailTab = (
    <div className="stack">
      <Card>
        <h3>{t(s.outcomesTitle)}</h3>
        <ul>{course.outcomes.map((o, i) => <li key={i}>{t(o)}</li>)}</ul>
      </Card>
      <Card>
        <h3>{t(s.audienceTitle)}</h3>
        <ul>{course.audience.map((o, i) => <li key={i}>{t(o)}</li>)}</ul>
      </Card>
    </div>
  )

  const instructorTab = instructor && (
    <Card>
      <div className="row"><IconCircle size="md" icon="user" /><div className="stack"><h3>{t(instructor.name)}</h3><span className="muted">{t(instructor.role)}</span></div></div>
      <p>{t(instructor.bio)}</p>
    </Card>
  )

  const contentTab = (
    <div className="stack">
      {isEnrolled && <ProgressBar value={pct} label={t(s.lessonsDone)} />}
      <Accordion
        items={course.lessons.map((l, i) => ({
          title: `${i + 1}. ${t(l.title)} · ${l.minutes} ${t(s.minutes)}${done.includes(l.id) ? ` · ${t(s.completed)}` : ''}`,
          body: (
            <div className="stack">
              <p>{t(l.body)}</p>
              {isEnrolled ? <div><Button size="sm" variant={done.includes(l.id) ? 'ghost' : 'secondary'} to={`${base}/course/${course.id}/lesson/${l.id}${search}`}>{done.includes(l.id) ? t(s.review) : t(s.start)}</Button></div> : <span className="muted">{t(s.lockedLesson)}</span>}
            </div>
          ),
        }))}
      />
    </div>
  )

  const reviewsTab = (
    <div className="stack">
      <Card>
        <div className="row">
          <strong>{course.rating}</strong>
          <RatingStars value={course.rating} label={t(s.ratingLabel)} />
          <span className="muted">{t(s.outOf)} · {course.ratingCount} {t(s.reviewsUnit)}</span>
        </div>
        <p>{expectation}% {t(s.expectation)}</p>
        {[5, 4, 3, 2, 1].map((n, i) => <ProgressBar key={n} value={split[i]} label={`${n} ${t(s.starsOf)}: ${split[i]}%`} />)}
      </Card>
      <Card>
        <h3>{t(s.myReviewTitle)}</h3>
        {saved && <Notice tone="success">{t(s.reviewSaved)}</Notice>}
        {!finished && <p className="muted">{t(s.reviewLocked)}</p>}
        {finished && myReview && !editing && (
          <div className="stack">
            <div className="row"><RatingStars value={myReview.rating} label={t(s.reviewStars)} /><Badge tone="info">{t(s.youBadge)}</Badge><span className="muted">{dateText(myReview.date)}</span></div>
            {myReview.text && <p>{myReview.text}</p>}
            <div><Button size="sm" variant="secondary" onClick={() => { setDraftRating(myReview.rating); setDraftText(myReview.text); setEditing(true); setSaved(false) }}>{t(s.editReview)}</Button></div>
          </div>
        )}
        {finished && (!myReview || editing) && (
          <div className="stack">
            <RatingStars value={draftRating} onChange={setDraftRating} label={t(s.reviewStars)} starLabel={(n) => `${n} ${t(s.starLabel)}`} />
            <Textarea label={t(s.reviewText)} id="edu-review" value={draftText} onChange={(e) => setDraftText(e.target.value)} />
            <div><Button disabled={draftRating === 0} onClick={sendReview}>{t(s.sendReview)}</Button></div>
          </div>
        )}
      </Card>
      <h3>{t(s.sampleReviews)}</h3>
      <CardGrid size="medium">
        {reviews.map((r) => (
          <Card key={r.id}>
            <div className="row"><RatingStars value={r.rating} label={t(s.ratingLabel)} /><span className="muted">{dateText(r.date)}</span></div>
            <strong>{t(r.name)}</strong>
            <p>{t(r.text)}</p>
          </Card>
        ))}
      </CardGrid>
    </div>
  )

  const faqTab = <Accordion items={faq.map((f) => ({ title: t(f.question), body: <p>{t(f.answer)}</p> }))} />

  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(s.breadcrumb)} items={[{ label: t(s.courses), to: `${base}${search}` }, { label: t(course.title) }]} />
          <div className="row">
            <Badge>{t(levelLabel(course.levelId))}</Badge>
            {category && <Badge tone="info">{t(category.name)}</Badge>}
            {course.isNew && <Badge tone="warning">{t(s.isNew)}</Badge>}
            {isEnrolled && <Badge tone="success">{t(s.enrolled)}</Badge>}
          </div>
          <h1>{t(course.title)}</h1>
          <p className="muted">{t(course.summary)}</p>
          <div className="row">
            <RatingStars value={course.rating} label={t(s.ratingLabel)} />
            <span>{course.rating}</span>
            <span className="muted">({course.ratingCount} {t(s.reviewsUnit)})</span>
            {instructor && <span className="muted">· {t(s.by)} {t(instructor.name)}</span>}
            <span className="muted">· {course.lessons.length} {t(s.lessonsUnit)} · {hoursText}</span>
          </div>
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <Tabs
          label={t(s.courseTabs)}
          tabs={[
            { id: 'detail', label: t(s.tabDetail), content: detailTab },
            { id: 'instructor', label: t(s.tabInstructor), content: instructorTab },
            { id: 'content', label: t(s.tabContent), content: contentTab },
            { id: 'reviews', label: t(s.tabReviews), content: reviewsTab },
            { id: 'faq', label: t(s.tabFaq), content: faqTab },
          ]}
        />
      </Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Card>
          <strong>{priceText}</strong>
          {!isEnrolled && (
            <>
              <Button onClick={enroll}>{t(s.enroll)}</Button>
              <span className="muted">{t(s.enrollNote)}</span>
            </>
          )}
          {isEnrolled && (
            <>
              <ProgressBar value={pct} label={t(s.lessonsDone)} />
              <DataRow muted label={t(s.lessonsDone)} value={`${done.length}/${course.lessons.length}`} />
              <Button to={resumeTo}>{done.length === 0 ? t(s.startLearning) : t(s.continue)}</Button>
              <h3>{t(s.quiz)}</h3>
              {!allDone && <p className="muted">{t(s.quizLocked)}</p>}
              {result && <DataRow label={t(s.score)} value={`${result.score}/${result.total}`} />}
              <Button variant="secondary" disabled={!allDone} to={allDone ? `${base}/course/${course.id}/quiz${search}` : undefined}>{t(s.takeQuiz)}</Button>
              <h3>{t(s.certificate)}</h3>
              {finished ? <Button variant="secondary" to={`${base}/course/${course.id}/certificate${search}`}>{t(s.viewCertificate)}</Button> : <p className="muted">{t(s.certLocked)}</p>}
              <Link to={`${base}/progress${search}`}>{t(s.viewProgress)}</Link>
            </>
          )}
        </Card>
      </Col>
      <StickyActionBar thumb={false} visible={narrow && !isEnrolled} name={t(course.title)} price={priceText} actions={<Button size="sm" onClick={enroll}>{t(s.enroll)}</Button>} />
    </Grid>
  )
}

