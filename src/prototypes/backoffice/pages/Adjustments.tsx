import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { adjustmentReasons, adjustmentsOf, type AdjustmentRow } from '../../../stock/stock'
import { useMovements } from '../../../stock/useStock'
import { Badge, Button, Card, Col, DataTable, Field, Grid, Notice, Select, StatCard, type DataColumn } from '../../../ui'
import { formatDate } from '../../ecommerce/cart'
import { AdjustModal, reasonLabel, reasonTone } from '../AdjustModal'
import { PageHead } from '../PageHead'
import { locationName, PROTOTYPE_ID, useSearch } from '../data'
import { b } from '../strings'

export function Adjustments() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const products = useDataset().dataset.ecommerce.products
  const [movements] = useMovements()
  const [q, setQ] = useState('')
  const [reason, setReason] = useState('')
  const [adding, setAdding] = useState(false)
  const [saved, setSaved] = useState(false)
  const all = adjustmentsOf(products, movements)
  const nameOf = (id: string) => t(products.find((p) => p.id === id)?.name ?? {})
  const needle = q.trim().toLowerCase()
  const rows = all.filter((r) => (!reason || r.reason === reason) && (!needle || r.id.toLowerCase().includes(needle) || nameOf(r.productId).toLowerCase().includes(needle) || (r.note ?? '').toLowerCase().includes(needle)))
  const columns: DataColumn<AdjustmentRow>[] = [
    { key: 'id', header: t(b.colAdjNo), sort: (x, y) => x.id.localeCompare(y.id), render: (r) => <span className="row">{r.id}{r.sample && <Badge>{t(b.sampleBadge)}</Badge>}</span> },
    { key: 'product', header: t(b.colProduct), render: (r) => <Link to={`${base}/stock/${r.productId}${search}`}>{nameOf(r.productId)}</Link> },
    { key: 'place', header: t(b.place), render: (r) => t(locationName(r.loc)) },
    { key: 'reason', header: t(b.colReason), render: (r) => <Badge tone={reasonTone(r.reason)}>{t(reasonLabel(r.reason))}</Badge> },
    { key: 'qty', header: t(b.colQtyChange), end: true, sort: (x, y) => x.qty - y.qty, render: (r) => <strong>{r.qty > 0 ? `+${r.qty}` : r.qty}</strong> },
    { key: 'date', header: t(b.colDate), sort: (x, y) => x.at.localeCompare(y.at), render: (r) => formatDate(r.at, lang) },
    { key: 'note', header: t(b.colNote), render: (r) => r.note ?? '-' },
  ]
  return (
    <Grid>
      <Col>
        <PageHead title={t(b.adjustmentsTitle)} text={`${t(b.adjustmentsText)} (${all.length} ${t(b.records)}) ${t(b.sample)}`} actions={<Button icon="plus" onClick={() => { setSaved(false); setAdding(true) }}>{t(b.adjNew)}</Button>} />
      </Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}><StatCard icon="orders" label={t(b.adjTotal)} value={String(all.length)} note={t(b.records)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}><StatCard icon="plus" label={t(b.adjAdditions)} value={String(all.filter((r) => r.qty > 0).length)} note={t(b.records)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}><StatCard icon="minus" label={t(b.adjSubtractions)} value={String(all.filter((r) => r.qty < 0).length)} note={t(b.records)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}><StatCard icon="warning" label={t(b.adjDamages)} value={String(all.filter((r) => r.reason === 'damaged').length)} note={t(b.records)} /></Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}><Field label={t(b.adjSearch)} id="adj-q" type="search" placeholder={t(b.adjSearchHint)} value={q} onChange={(e) => setQ(e.target.value)} /></Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Select label={t(b.reasonFilter)} value={reason} onChange={(e) => setReason(e.target.value)} options={[{ value: '', label: t(b.allReasons) }, ...adjustmentReasons.map((r) => ({ value: r, label: t(reasonLabel(r)) }))]} />
      </Col>
      {saved && <Col><Notice tone="success">{t(b.adjusted)}</Notice></Col>}
      <Col>
        <Card>
          <DataTable label={t(b.adjLabel)} columns={columns} rows={rows} rowKey={(r) => r.id} empty={t(b.adjEmpty)} />
        </Card>
      </Col>
      {adding && <AdjustModal open onClose={() => setAdding(false)} initialLoc="central" onSaved={() => setSaved(true)} />}
    </Grid>
  )
}
