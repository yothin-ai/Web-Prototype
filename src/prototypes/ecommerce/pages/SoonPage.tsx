import { useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Button, Card, Col, Grid } from '../../../ui'
import { a } from '../accountStrings'
import { PROTOTYPE_ID } from '../cart'
import { g } from '../listingStrings'

// A stand-in for pages that are planned but not built yet.
export function SoonPage() {
  const { t } = useLang()
  const { search } = useLocation()
  return (
    <Grid>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <Card>
          <h2>{t(a.soonTitle)}</h2>
          <span className="muted">{t(a.soonText)}</span>
          <div><Button to={`/${PROTOTYPE_ID}${search}`} variant="secondary" size="sm">{t(g.backHome)}</Button></div>
        </Card>
      </Col>
    </Grid>
  )
}
