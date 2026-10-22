import { Navigate, useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, Col, DataRow, Grid } from '../../../ui'
import { PROTOTYPE_ID, useLanding, useLead } from '../lead'
import { s } from '../strings'

export function Thanks() {
  const { t } = useLang()
  const content = useLanding()
  const { search } = useLocation()
  const [lead] = useLead()
  const base = `/${PROTOTYPE_ID}`

  if (!lead) return <Navigate to={`${base}${search}`} replace />
  const interest = content.form.interests.find((i) => i.id === lead.interestId)

  return (
    <div className="section">
    <Grid>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <Card>
          <Badge tone="success">{t(s.thanksBadge)}</Badge>
          <h1>{t(s.thanksTitle)}, {lead.name}</h1>
          <p className="muted">{t(s.thanksNote)}</p>
          <p className="muted">{t(s.yourDetails)}</p>
          <DataRow label={t(s.email)} value={lead.email} />
          {lead.company && <DataRow label={t(content.form.companyLabel)} value={lead.company} />}
          {interest && <DataRow label={t(content.form.interestLabel)} value={t(interest.name)} />}
          <div><Button to={`${base}${search}`} variant="secondary">{t(s.backHome)}</Button></div>
        </Card>
      </Col>
    </Grid>
    </div>
  )
}
