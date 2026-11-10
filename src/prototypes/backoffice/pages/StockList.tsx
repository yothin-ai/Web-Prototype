import { useState } from 'react'
import { useProducts } from '../../../products/useProducts'
import { Link, useLocation } from 'react-router-dom'
import type { Product } from '../../../datasets/types'
import { useLang } from '../../../i18n'
import { useSearchLabels } from '../../../i18n/searchLabels'
import { locationIds, reorderPoint, type StockStatus } from '../../../stock/stock'
import { useStock } from '../../../stock/useStock'
import { Badge, Button, Card, Col, DataTable, Field, Grid, Notice, SearchSelect, Select, type DataColumn } from '../../../ui'
import { skuOf } from '../../ecommerce/cart'
import { AdjustModal } from '../AdjustModal'
import { downloadCsv } from '../csv'
import { PageHead } from '../PageHead'
import { usePaging } from '../paging'
import { locationName, PROTOTYPE_ID, useSearch } from '../data'
import { b } from '../strings'

export const levelLabel = (s: StockStatus) => ({ out: b.levelOut, low: b.levelLow, ok: b.levelOk })[s]

export function StockList() {
  const { t } = useLang()
  const sl = useSearchLabels()
  const paging = usePaging()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const products = useProducts().all
  const book = useStock()
  const [q, setQ] = useState('')
  const [loc, setLoc] = useState('')
  const [level, setLevel] = useState(new URLSearchParams(useLocation().search).get('level') ?? '')
  const [adjusting, setAdjusting] = useState<Product | null>(null)
  const [saved, setSaved] = useState(false)
  const needle = q.trim().toLowerCase()
  const cellOf = (p: Product) => (loc ? book.cell(p.id, loc) : book.total(p.id))
  const rows = products.filter((p) => (!needle || t(p.name).toLowerCase().includes(needle) || skuOf(p).toLowerCase().includes(needle)) && (!level || (level === 'alert' ? book.status(p.id) !== 'ok' : book.status(p.id) === level)))
  const columns: DataColumn<Product>[] = [
    { key: 'name', wrap: true, header: t(b.colProduct), sort: (x, y) => t(x.name).localeCompare(t(y.name)), render: (p) => <span className="stack"><Link to={`${base}/stock/${p.id}${search}`}>{t(p.name)}</Link><span className="muted">{skuOf(p)}</span></span> },
    { key: 'cat', header: t(b.colCategory), sort: (x, y) => t(x.category).localeCompare(t(y.category)), render: (p) => t(p.category) },
    { key: 'onhand', header: t(b.colOnHand), end: true, sort: (x, y) => cellOf(x).onHand - cellOf(y).onHand, render: (p) => cellOf(p).onHand },
    { key: 'reserved', header: t(b.colReserved), end: true, render: (p) => cellOf(p).reserved },
    { key: 'avail', header: t(b.colAvailable), end: true, sort: (x, y) => cellOf(x).available - cellOf(y).available, render: (p) => <strong>{cellOf(p).available}</strong> },
    { key: 'reorder', header: t(b.colReorder), end: true, render: (p) => reorderPoint(p) },
    { key: 'level', header: t(b.colLevel), render: (p) => <Badge tone={book.status(p.id) === 'ok' ? 'success' : book.status(p.id) === 'out' ? 'danger' : 'warning'}>{t(levelLabel(book.status(p.id)))}</Badge> },
    { key: 'act', header: t(b.colAction), render: (p) => <Button variant="secondary" size="sm" onClick={() => { setSaved(false); setAdjusting(p) }}>{t(b.adjust)}</Button> },
  ]
  return (
    <Grid>
      <Col>
        <PageHead title={t(b.stockTitle)} text={`${t(b.stockText)} (${products.length} ${t(b.records)}) ${t(b.sample)}`} actions={<><Button variant="secondary" icon="receipt" onClick={() => downloadCsv('stock.csv', [[t(b.colProduct), 'SKU', t(b.colCategory), t(b.place), t(b.colOnHand), t(b.colReserved), t(b.colAvailable), t(b.colReorder), t(b.colLevel)], ...rows.map((p) => [t(p.name), skuOf(p), t(p.category), loc ? t(locationName(loc)) : t(b.allPlaces), cellOf(p).onHand, cellOf(p).reserved, cellOf(p).available, reorderPoint(p), t(levelLabel(book.status(p.id)))])])}>{t(b.exportCsv)}</Button><Button to={`${base}/receive${search}`}>{t(b.receive)}</Button></>} />
      </Col>
      <Col span={{ base: 4, sm: 8, md: 5 }}><Field label={t(b.search)} id="stock-q" type="search" placeholder={t(b.searchHint)} value={q} onChange={(e) => setQ(e.target.value)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 4 }}>
        <SearchSelect {...sl} label={t(b.place)} value={loc} onChange={(v) => setLoc(v)} options={[{ value: '', label: t(b.allPlaces) }, ...locationIds.map((id) => ({ value: id, label: t(locationName(id)) }))]} />
      </Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}>
        <Select label={t(b.stockFilter)} value={level} onChange={(e) => setLevel(e.target.value)} options={[{ value: '', label: t(b.allLevels) }, { value: 'alert', label: t(b.levelAlert) }, { value: 'low', label: t(b.levelLow) }, { value: 'out', label: t(b.levelOut) }, { value: 'ok', label: t(b.levelOk) }]} />
      </Col>
      {saved && <Col><Notice tone="success">{t(b.adjusted)}</Notice></Col>}
      <Col>
        <Card>
          <DataTable label={t(b.stockLabel)} columns={columns} rows={rows} rowKey={(p) => p.id} empty={t(b.stockEmpty)} {...paging()} />
        </Card>
      </Col>
      {adjusting && <AdjustModal key={adjusting.id} product={adjusting} open onClose={() => setAdjusting(null)} initialLoc={loc || 'central'} onSaved={() => setSaved(true)} />}
    </Grid>
  )
}
