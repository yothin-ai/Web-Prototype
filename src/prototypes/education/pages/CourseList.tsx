import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, CardGrid, Col, DataRow, Field, Grid, ProductImage, RatingStars, Select } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { courseMinutes, levelLabel, PROTOTYPE_ID, useCompleted, useCourses, useEnrollments, lessonsDone, percent } from '../data'
import { s } from '../strings'

export function CourseList() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const { dataset } = useDataset()
  const { courses } = useCourses()
  const [enrolled] = useEnrollments()
  const [completed] = useCompleted()
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')
  const [sort, setSort] = useState('top')
  const { categories, instructors } = dataset.education
  const instructorName = (id: string) => t(instructors.find((i) => i.id === id)?.name ?? { th: '', en: '' })

  const needle = q.trim().toLowerCase()
  const shown = courses
    .filter((c) => !category || c.categoryId === category)
    .filter((c) => !level || c.levelId === level)
    .filter((c) => !needle || t(c.title).toLowerCase().includes(needle) || instructorName(c.instructorId).toLowerCase().includes(needle))
    .sort((a, b) => {
      if (sort === 'new') return Number(!!b.isNew) - Number(!!a.isNew) || b.rating - a.rating
      if (sort === 'price') return a.price - b.price
      if (sort === 'short') return courseMinutes(a) - courseMinutes(b)
      return b.rating - a.rating
    })
  const filtered = !!(q || category || level)
  const clear = () => { setQ(''); setCategory(''); setLevel('') }
  const hoursText = (mins: number) => (mins < 60 ? `${mins} ${t(s.minutes)}` : `${Math.round((mins / 60) * 10) / 10} ${t(s.hours)}`)

  return (
    <Grid>
      <Col>
        <div className="stack">
          <h1>{t(s.listTitle)}</h1>
          <p className="muted">{t(s.listText)}</p>
        </div>
      </Col>
      <Col>
        <div className="row" role="group" aria-label={t(s.categories)}>
          <Button size="sm" variant={category === '' ? 'primary' : 'secondary'} aria-pressed={category === ''} onClick={() => setCategory('')}>{t(s.allCategories)}</Button>
          {categories.map((c) => (
            <Button key={c.id} size="sm" variant={category === c.id ? 'primary' : 'secondary'} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>{t(c.name)}</Button>
          ))}
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 6 }}><Field label={t(s.search)} id="edu-q" type="search" placeholder={t(s.searchHint)} value={q} onChange={(e) => setQ(e.target.value)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}>
        <Select label={t(s.level)} id="edu-level" value={level} onChange={(e) => setLevel(e.target.value)} options={[{ value: '', label: t(s.allLevels) }, { value: 'beginner', label: t(s.levelBeginner) }, { value: 'all', label: t(s.levelAll) }, { value: 'intermediate', label: t(s.levelIntermediate) }]} />
      </Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}>
        <Select label={t(s.sort)} id="edu-sort" value={sort} onChange={(e) => setSort(e.target.value)} options={[{ value: 'top', label: t(s.sortPopular) }, { value: 'new', label: t(s.sortNew) }, { value: 'price', label: t(s.sortPriceLow) }, { value: 'short', label: t(s.sortShort) }]} />
      </Col>
      <Col><p className="muted" role="status">{shown.length} {t(s.resultsCount)}</p></Col>
      {shown.length === 0 && (
        <Col>
          <Card>
            <p>{t(s.noResults)}</p>
            <div><Button variant="secondary" onClick={clear}>{t(s.clearFilters)}</Button></div>
          </Card>
        </Col>
      )}
      {shown.length > 0 && (
        <Col>
          <CardGrid size="medium" key={`${filtered}`}>
            {shown.map((c) => {
              const isIn = enrolled.includes(c.id)
              const catName = categories.find((x) => x.id === c.categoryId)?.name
              return (
                <Card key={c.id}>
                  <ProductImage label={t(c.title)} wide />
                  <div className="row">
                    <Badge>{t(levelLabel(c.levelId))}</Badge>
                    {catName && <Badge tone="info">{t(catName)}</Badge>}
                    {c.isNew && <Badge tone="warning">{t(s.isNew)}</Badge>}
                    {isIn && <Badge tone="success">{t(s.enrolled)}</Badge>}
                  </div>
                  <h3>{t(c.title)}</h3>
                  <p className="muted">{t(c.summary)}</p>
                  <div className="row"><RatingStars value={c.rating} label={t(s.ratingLabel)} /><span>{c.rating}</span><span className="muted">({c.ratingCount})</span></div>
                  <DataRow muted label={`${t(s.by)} ${instructorName(c.instructorId)}`} />
                  <DataRow muted label={`${c.lessons.length} ${t(s.lessonsUnit)} · ${hoursText(courseMinutes(c))}`} />
                  {isIn && <DataRow muted label={t(s.lessonsDone)} value={`${percent(lessonsDone(completed, c), c.lessons.length)}%`} />}
                  <div className="row card-grid__push">
                    <strong className="row__grow">{c.price === 0 ? t(s.free) : formatMoney(c.price, lang)}</strong>
                    <Button to={`/${PROTOTYPE_ID}/course/${c.id}${search}`} size="sm">{t(s.viewCourse)}</Button>
                  </div>
                </Card>
              )
            })}
          </CardGrid>
        </Col>
      )}
    </Grid>
  )
}
