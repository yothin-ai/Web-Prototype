import { useLocation, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { StepPill, Badge, Button, Card, Col, Grid } from '../../../ui'
import { PROTOTYPE_ID, useOrders } from '../cart'
import { c } from '../checkoutStrings'
import { o as ot } from '../orderStrings'
import { s } from '../strings'
import { OrderSummary } from './OrderSummary'

export function Confirmation() {
  const { t } = useLang()
  const { search } = useLocation()
  const { orderId } = useParams()
  const [orders] = useOrders()
  const order = orders.find((o) => o.id === orderId)
  const base = `/${PROTOTYPE_ID}`

  return (
    <Grid>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <Card>
          {order ? (
            <>
              <StepPill step={3} label={t(c.stepDone)} progress={`${t(c.stepWord)} 3 ${t(c.ofThree)}`} />
              <Badge tone="success">{t(s.thanks)}</Badge>
              <h2>{t(s.orderNumber)} {order.id}</h2>
              <p className="muted">{t(s.thanksNote)}</p>
              <OrderSummary order={order} />
            </>
          ) : (
            <h3>{t(s.notFoundOrder)}</h3>
          )}
          <div className="row">
            {order && <Button to={`${base}/orders/${order.id}${search}`} icon="view">{t(ot.viewMyOrder)}</Button>}
            <Button to={`${base}/orders${search}`} variant="secondary">{t(s.viewOrders)}</Button>
            <Button to={`${base}${search}`} variant="ghost">{t(s.continueShopping)}</Button>
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
