import { useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Button, Col, Grid } from '../../../ui'
import { PROTOTYPE_ID } from '../cart'
import { nf } from '../miscStrings'

// Shown for any address under the shop that has no page.
export function NotFoundPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const base = `/${PROTOTYPE_ID}`
  return (
    <Grid>
      <Col>
        <div className="not-found">
          <span className="not-found__code" aria-hidden="true">404</span>
          <h1>{t(nf.title)}</h1>
          <span className="muted">{t(nf.text)}</span>
          <div className="row">
            <Button to={`${base}${search}`}>{t(nf.home)}</Button>
            <Button to={`${base}/products${search}`} variant="secondary">{t(nf.all)}</Button>
          </div>
        </div>
      </Col>
    </Grid>
  )
}
