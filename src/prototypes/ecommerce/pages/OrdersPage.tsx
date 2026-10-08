import { useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, Col, Grid } from '../../../ui'
import { formatDate, PROTOTYPE_ID, useOrders } from '../cart'
import { s } from '../strings'
import { OrderSummary } from './OrderSummary'

export function OrdersPage() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const [orders] = useOrders()

  return (
    <Grid>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <div className="stack">
          {orders.length === 0 && (
            <Card>
              <h3>{t(s.ordersEmpty)}</h3>
              <div><Button to={`/${PROTOTYPE_ID}${search}`}>{t(s.continueShopping)}</Button></div>
            </Card>
          )}
          {orders.map((o) => (
            <Card key={o.id}>
              <div className="row">
                <h3 className="row__grow">{o.id}</h3>
                <Badge tone="warning">{t(s.processing)}</Badge>
              </div>
              <p className="muted">{t(s.placedOn)} {formatDate(o.placedAt, lang)}</p>
              <OrderSummary order={o} />
            </Card>
          ))}
        </div>
      </Col>
    </Grid>
  )
}
