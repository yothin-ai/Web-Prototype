import { Route, Routes, useLocation } from 'react-router-dom'
import { useDataset } from '../../datasets/DatasetContext'
import { useLang } from '../../i18n'
import { Button, Col, Grid } from '../../ui'
import { PROTOTYPE_ID } from './lead'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { Thanks } from './pages/Thanks'
import { s } from './strings'

export function Landing() {
  const { t } = useLang()
  const { dataset } = useDataset()
  const { search } = useLocation()
  const base = `/${PROTOTYPE_ID}`

  return (
    <>
      <div className="section">
        <Grid>
          <Col>
            <div className="row">
              <h2 className="row__grow">{t(dataset.brandName)}</h2>
              <Button to={`${base}/signup${search}`} size="sm">{t(s.signUp)}</Button>
            </div>
          </Col>
        </Grid>
      </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="thanks" element={<Thanks />} />
      </Routes>
    </>
  )
}
