import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import type { Transfer, TransferStatus } from '../../../stock/stock'
import { useStock } from '../../../stock/useStock'
import { Badge, Breadcrumb, Button, Card, Col, DataRow, Grid, Notice, OrderTimeline, type TimelineStep } from '../../../ui'
import { formatDate } from '../../ecommerce/cart'
import { locationName, PROTOTYPE_ID, useSearch, useTransferActions } from '../data'
import { b } from '../strings'

const statusLabel = (s: TransferStatus) => ({ pending: b.trfPending, transit: b.trfTransit, done: b.trfDone, cancelled: b.trfCancelled })[s]
const statusTone = (s: TransferStatus) => ({ pending: 'warning', transit: 'info', done: 'success', cancelled: undefined })[s] as 'warning' | 'info' | 'success' | undefined
const noteOf = (s: TransferStatus) => ({ pending: b.trfPendingNote, transit: b.trfTransitNote, done: b.trfDoneNote, cancelled: b.trfCancelledNote })[s]

// One transfer: where it stands on a line of steps, what it moves, and the buttons for its next move.
export function TransferDetail() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const { transferId = '' } = useParams()
  const products = useDataset().dataset.ecommerce.products
  const book = useStock()
  const { transfers, approve, receive, cancel } = useTransferActions()
  const [short, setShort] = useState(false)
  const tr: Transfer | undefined = transfers.find((x) => x.id === transferId)
  if (!tr) {
    return (
      <Card>
        <div className="stack">
          <p>{t(b.notFound)}</p>
          <div><Button to={`${base}/transfers${search}`} variant="secondary">{t(b.trfBack)}</Button></div>
        </div>
      </Card>
    )
  }
  const product = products.find((p) => p.id === tr.productId)
  const cancelled = tr.status === 'cancelled'
  // A made-up past transfer has no times for its steps, but its status tells how far it went.
  const reachedOut = tr.status === 'transit' || tr.status === 'done'
  const steps: TimelineStep[] = [
    { label: t(b.trfStepRequested), state: 'done', icon: 'edit' },
    { label: t(b.trfStepApproved), state: reachedOut ? 'done' : cancelled ? 'cancelled' : 'current', icon: 'truck' },
    { label: t(b.trfStepReceived), state: tr.status === 'done' ? 'done' : tr.status === 'transit' ? 'current' : 'todo', icon: 'check' },
  ]
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(b.breadcrumb)} items={[{ label: t(b.navTransfers), to: `${base}/transfers${search}` }, { label: tr.id }]} />
          <div className="row">
            <h1>{tr.id}</h1>
            <Badge tone={statusTone(tr.status)}>{t(statusLabel(tr.status))}</Badge>
            {tr.sample && <Badge>{t(b.sampleBadge)}</Badge>}
          </div>
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 6 }}>
        <div className="stack">
          <Card>
            <OrderTimeline label={t(b.trfStepsLabel)} steps={steps} />
          </Card>
          <Notice tone={tr.status === 'done' ? 'success' : 'info'}>{t(noteOf(tr.status))}</Notice>
          {short && <Notice tone="error">{t(b.trfShortApprove)}</Notice>}
          <div className="row">
            {tr.status === 'pending' && <Button onClick={() => setShort(!approve(tr))}>{t(b.trfApprove)}</Button>}
            {tr.status === 'transit' && <Button onClick={() => receive(tr)}>{t(b.trfReceive)}</Button>}
            {tr.status === 'pending' && <Button variant="secondary" onClick={() => cancel(tr)}>{t(b.trfCancel)}</Button>}
          </div>
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 6 }}>
        <Card>
          <div className="stack">
            <DataRow label={t(b.colProduct)} value={product ? <Link to={`${base}/stock/${product.id}${search}`}>{t(product.name)}</Link> : tr.productId} />
            <DataRow label={t(b.colQty)} value={tr.qty} />
            <DataRow label={t(b.trfFrom)} value={t(locationName(tr.from))} />
            <DataRow label={t(b.trfTo)} value={t(locationName(tr.to))} />
            {tr.status === 'pending' && <DataRow label={t(b.trfAvailableAtSource)} value={`${book.cell(tr.productId, tr.from).available} ${t(b.pieces)}`} />}
            <DataRow label={t(b.trfCreatedAt)} value={formatDate(tr.at, lang)} />
            {tr.outAt && <DataRow label={t(b.trfApprovedAt)} value={formatDate(tr.outAt, lang)} />}
            {tr.inAt && <DataRow label={t(b.trfReceivedAt)} value={formatDate(tr.inAt, lang)} />}
            {tr.note && <DataRow label={t(b.colNote)} value={tr.note} />}
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
