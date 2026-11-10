import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { locationIds, type Transfer, type TransferStatus } from '../../../stock/stock'
import { useStock } from '../../../stock/useStock'
import { Badge, Button, Card, Col, DataTable, Field, Grid, Modal, Notice, Select, type DataColumn } from '../../../ui'
import { formatDate } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { locationName, PROTOTYPE_ID, useSearch, useTransferBook } from '../data'
import { b } from '../strings'

const statuses: TransferStatus[] = ['pending', 'transit', 'done', 'cancelled']
const statusLabel = (s: TransferStatus) => ({ pending: b.trfPending, transit: b.trfTransit, done: b.trfDone, cancelled: b.trfCancelled })[s]
const statusTone = (s: TransferStatus) => ({ pending: 'warning', transit: 'info', done: 'success', cancelled: undefined })[s] as 'warning' | 'info' | 'success' | undefined

export function Transfers() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const products = useDataset().dataset.ecommerce.products
  const book = useStock()
  const [transfers, setTransfers] = useTransferBook()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [adding, setAdding] = useState(false)
  const [message, setMessage] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)
  const nameOf = (id: string) => t(products.find((p) => p.id === id)?.name ?? {})
  const needle = q.trim().toLowerCase()
  const rows = transfers.filter((x) => (!status || x.status === status) && (!needle || x.id.toLowerCase().includes(needle) || nameOf(x.productId).toLowerCase().includes(needle)))
  const update = (id: string, patch: Partial<Transfer>) => setTransfers(transfers.map((x) => (x.id === id ? { ...x, ...patch } : x)))
  const approve = (x: Transfer) => {
    if (book.cell(x.productId, x.from).available < x.qty) {
      setMessage({ tone: 'error', text: t(b.trfShortApprove) })
      return
    }
    setMessage(null)
    update(x.id, { status: 'transit', outAt: new Date().toISOString() })
  }
  const columns: DataColumn<Transfer>[] = [
    { key: 'id', header: t(b.colTrfNo), sort: (x, y) => x.id.localeCompare(y.id), render: (x) => <span className="row">{x.id}{x.sample && <Badge>{t(b.sampleBadge)}</Badge>}</span> },
    { key: 'product', header: t(b.colProduct), render: (x) => <Link to={`${base}/stock/${x.productId}${search}`}>{nameOf(x.productId)}</Link> },
    { key: 'route', header: t(b.colRoute), render: (x) => `${t(locationName(x.from))} → ${t(locationName(x.to))}` },
    { key: 'qty', header: t(b.colQty), end: true, sort: (x, y) => x.qty - y.qty, render: (x) => x.qty },
    { key: 'status', header: t(b.colStatus), render: (x) => <Badge tone={statusTone(x.status)}>{t(statusLabel(x.status))}</Badge> },
    { key: 'date', header: t(b.colDate), sort: (x, y) => x.at.localeCompare(y.at), render: (x) => formatDate(x.at, lang) },
    {
      key: 'act',
      header: t(b.colActions),
      render: (x) => (
        <span className="row">
          {x.status === 'pending' && <Button size="sm" onClick={() => approve(x)}>{t(b.trfApprove)}</Button>}
          {x.status === 'transit' && <Button size="sm" onClick={() => update(x.id, { status: 'done', inAt: new Date().toISOString() })}>{t(b.trfReceive)}</Button>}
          {x.status === 'pending' && <Button size="sm" variant="ghost" onClick={() => update(x.id, { status: 'cancelled' })}>{t(b.trfCancel)}</Button>}
          {(x.status === 'done' || x.status === 'cancelled') && '-'}
        </span>
      ),
    },
  ]
  return (
    <Grid>
      <Col>
        <PageHead title={t(b.transfersTitle)} text={`${t(b.transfersText)} (${transfers.length} ${t(b.records)}) ${t(b.sample)}`} actions={<Button icon="plus" onClick={() => { setMessage(null); setAdding(true) }}>{t(b.trfNew)}</Button>} />
      </Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}><Field label={t(b.trfSearch)} id="trf-q" type="search" placeholder={t(b.trfSearchHint)} value={q} onChange={(e) => setQ(e.target.value)} /></Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Select label={t(b.statusFilter)} value={status} onChange={(e) => setStatus(e.target.value)} options={[{ value: '', label: t(b.allStatuses) }, ...statuses.map((s) => ({ value: s, label: t(statusLabel(s)) }))]} />
      </Col>
      {message && <Col><Notice tone={message.tone}>{message.text}</Notice></Col>}
      <Col>
        <Card>
          <DataTable label={t(b.trfLabel)} columns={columns} rows={rows} rowKey={(x) => x.id} empty={t(b.trfEmpty)} />
        </Card>
      </Col>
      {adding && (
        <NewTransfer
          onClose={() => setAdding(false)}
          onCreate={(draft) => {
            const own = transfers.filter((x) => !x.sample).length
            setTransfers([...transfers, { ...draft, id: `TRF-${1001 + own}`, at: new Date().toISOString(), status: 'pending' }])
            setMessage({ tone: 'success', text: t(b.trfCreated) })
            setAdding(false)
          }}
        />
      )}
    </Grid>
  )
}

function NewTransfer({ onClose, onCreate }: { onClose: () => void; onCreate: (draft: Omit<Transfer, 'id' | 'at' | 'status'>) => void }) {
  const { t } = useLang()
  const products = useDataset().dataset.ecommerce.products
  const book = useStock()
  const [productId, setProductId] = useState('')
  const [from, setFrom] = useState('central')
  const [to, setTo] = useState('b1')
  const [qty, setQty] = useState('')
  const [note, setNote] = useState('')
  const [tried, setTried] = useState(false)
  const amount = Number(qty)
  const qtyOk = qty.trim() !== '' && Number.isInteger(amount) && amount >= 1
  const have = productId ? book.cell(productId, from).available : 0
  const save = () => {
    setTried(true)
    if (!productId || from === to || !qtyOk || amount > have) return
    onCreate({ productId, qty: amount, from, to, note: note.trim() || undefined })
  }
  const places = locationIds.map((id) => ({ value: id, label: t(locationName(id)) }))
  return (
    <Modal open onClose={onClose} label={t(b.trfTitle)} closeLabel={t(b.trfClose)}>
      <div className="stack">
        <h2>{t(b.trfTitle)}</h2>
        <Select label={t(b.product)} id="trf-product" value={productId} placeholder={t(b.adjProductPick)} onChange={(e) => setProductId(e.target.value)} hint={tried && !productId ? t(b.trfErrProduct) : undefined} options={products.map((p) => ({ value: p.id, label: t(p.name) }))} />
        <Select label={t(b.trfFrom)} id="trf-from" value={from} onChange={(e) => setFrom(e.target.value)} options={places} />
        <Select label={t(b.trfTo)} id="trf-to" value={to} onChange={(e) => setTo(e.target.value)} hint={tried && from === to ? t(b.trfErrSame) : undefined} options={places} />
        {productId && <span className="muted">{t(b.trfAvailableAtSource)}: {have} {t(b.pieces)}</span>}
        <Field label={t(b.trfQty)} id="trf-qty" type="number" min={1} inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value)} hint={tried && !qtyOk ? t(b.trfErrQty) : tried && qtyOk && amount > have ? t(b.trfErrShort) : undefined} />
        <Field label={t(b.trfNote)} id="trf-note" value={note} onChange={(e) => setNote(e.target.value)} />
        <div className="row"><Button onClick={save}>{t(b.trfSave)}</Button><Button variant="ghost" onClick={onClose}>{t(b.trfClose)}</Button></div>
      </div>
    </Modal>
  )
}
