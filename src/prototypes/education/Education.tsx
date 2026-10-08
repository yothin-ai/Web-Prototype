import { Route, Routes, useLocation } from 'react-router-dom'
import { useDataset } from '../../datasets/DatasetContext'
import { useLang } from '../../i18n'
import { Col, Grid, NavTabs } from '../../ui'
import { PROTOTYPE_ID } from './data'
import { CourseDetail } from './pages/CourseDetail'
import { CourseList } from './pages/CourseList'
import { LessonPage } from './pages/LessonPage'
import { ProgressPage } from './pages/ProgressPage'
import { QuizPage } from './pages/QuizPage'
import { s } from './strings'

export function Education() {
  const { t } = useLang()
  const { dataset } = useDataset()
  const { pathname, search } = useLocation()
  const base = `/${PROTOTYPE_ID}`

  const onProgress = pathname.startsWith(`${base}/progress`)
  const items = [
    { to: `${base}${search}`, label: t(s.courses), active: !onProgress },
    { to: `${base}/progress${search}`, label: t(s.progress), active: onProgress },
  ]

  return (
    <>
      <div className="section">
        <Grid>
          <Col>
            <div className="stack">
              <h2>{t(dataset.brandName)}</h2>
              <NavTabs label={t(dataset.brandName)} items={items} />
            </div>
          </Col>
        </Grid>
      </div>
      <Routes>
        <Route index element={<CourseList />} />
        <Route path="course/:courseId" element={<CourseDetail />} />
        <Route path="course/:courseId/lesson/:lessonId" element={<LessonPage />} />
        <Route path="course/:courseId/quiz" element={<QuizPage />} />
        <Route path="progress" element={<ProgressPage />} />
      </Routes>
    </>
  )
}
