import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { Button, Card, Col, Countdown, DataRow, Field, Grid, Notice, StepPill } from '../../../ui'
import { formatMoney, PROTOTYPE_ID, useOrders } from '../cart'
import { findPayment, usePayOrder } from '../checkout'
import { c } from '../checkoutStrings'
import '../checkout.css'
import { NotFoundPage } from './NotFoundPage'

const SAMPLE_OTP = '123456'

export function PaymentPage() {
  const { t, lang } = useLang()
  const { search } = useLocation()
  const navigate = useNavigate()
  const { dataset } = useDataset()
  const { checkout } = dataset.ecommerce
  const { orderId } = useParams()
  const [orders] = useOrders()
  const payOrder = usePayOrder()
  // The order already exists, waiting for payment; this page only takes the (simulated) payment.
  const pending = orders.find((o) => o.id === orderId)
  const [otp, setOtp] = useState('')
  const base = `/${PROTOTYPE_ID}`

  if (!pending) return <NotFoundPage />

  const method = findPayment(pending.paymentId)
  const paid = () => {
    payOrder(pending.id)
    navigate(`${base}/done/${pending.id}${search}`)
  }

  return (
    <Grid>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <Card>
          <StepPill step={2} label={t(c.stepPay)} progress={`${t(c.stepWord)} 2 ${t(c.ofThree)}`} />
          <h2>{t(c.payTitle)} · {method ? t(method.name) : ''}</h2>
          <Notice tone="info">{t(c.payDemoNote)}</Notice>
          <DataRow strong label={t(c.amountDue)} value={<span className="checkout-total">{formatMoney(pending.total, lang)}</span>} />

          {pending.paymentId === 'promptpay' && (
            <div className="stack">
              <strong>{t(c.scanQr)}</strong>
              <div className="pay-qr">{t(c.qrFrame)}</div>
              <Countdown startSeconds={checkout.paymentWindowMinutes * 60} label={t(c.timeLeft)} />
            </div>
          )}

          {pending.paymentId === 'card' && (
            <div className="stack">
              <strong>{t(c.otpTitle)}</strong>
              <span className="muted">{t(c.otpHint)}</span>
              <Field label={`${t(c.otpSample)}: ${SAMPLE_OTP}`} id="pay-otp" inputMode="numeric" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} />
            </div>
          )}

          {pending.paymentId === 'transfer' && (
            <div className="stack">
              <strong>{t(c.transferInfo)}</strong>
              <DataRow muted label={t(c.accountBank)} value={t(checkout.transfer.bank)} />
              <DataRow muted label={t(c.accountName)} value={t(checkout.transfer.name)} />
              <DataRow muted label={t(c.accountNumber)} value={checkout.transfer.number} />
              <Countdown startSeconds={checkout.paymentWindowMinutes * 60} label={t(c.timeLeft)} />
            </div>
          )}

          <div className="row">
            <Button onClick={paid}>{t(c.paidDemo)}</Button>
            <Button to={`${base}/orders/${pending.id}${search}`} variant="ghost">{t(c.payLater)}</Button>
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
