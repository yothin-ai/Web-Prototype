import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { Product } from '../../../datasets/types'
import { useLang } from '../../../i18n'
import { missingParts } from '../../../products/completeness'
import { useProducts } from '../../../products/useProducts'
import { useMovements, useStock } from '../../../stock/useStock'
import { Badge, Button, Card, CardGrid, Col, DataTable, Field, Grid, Modal, Notice, Select, StatCard, type DataColumn } from '../../../ui'
import { formatMoney, skuOf } from '../../ecommerce/cart'
import { costOf } from '../../../stock/stock'
import { PageHead } from '../PageHead'
import { PROTOTYPE_ID, usePurchaseBook, useBackOrders, useSearch, useTransferBook } from '../data'
import { pr } from '../productStrings'

export function Products() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const { all, remove, setShown, isHidden } = useProducts()
  const book = useStock()
  const [movements] = useMovements()
  const [orders, transfers, purchases] = [useBackOrders(), useTransferBook()[0], usePurchaseBook()[0]]
  const [q, setQ] = useState('')
  const [source, setSource] = useState('')
  const [shop, setShop] = useState('')
  const [deleting, setDeleting] = useState<Product | null>(null)
  const notice = (useLocation().state as { notice?: string } | null)?.notice ?? ''
  const [message, setMessage] = useState(notice)
  const [info, setInfo] = useState('')

  const hasHistory = (id: string) =>
    orders.some((o) => o.lines.some((l) => l.productId === id)) || movements.some((m) => m.productId === id) || transfers.some((x) => x.productId === id) || purchases.some((po) => po.lines.some((l) => l.productId === id))
  const needle = q.trim().toLowerCase()
  const rows = all.filter((p) => (!needle || t(p.name).toLowerCase().includes(needle) || skuOf(p).toLowerCase().includes(needle)) && (!source || (source === 'mine' ? !!p.custom : !p.custom)) && (!shop || (shop === 'hidden' ? isHidden(p.id) : !isHidden(p.id))) && (!info || (!!p.custom && (info === 'incomplete' ? missingParts(p).length > 0 : missingParts(p).length === 0))))

  const columns: DataColumn<Product>[] = [
    { key: 'sku', header: t(pr.colSku), sort: (x, y) => skuOf(x).localeCompare(skuOf(y)), render: (p) => <span className="row">{skuOf(p)}{p.custom && <Badge tone="info">{t(pr.mine)}</Badge>}</span> },
    { key: 'name', wrap: true, header: t(pr.colName), sort: (x, y) => t(x.name).localeCompare(t(y.name)), render: (p) => <Link to={`${base}/stock/${p.id}${search}`}>{t(p.name)}</Link> },
    { key: 'cat', header: t(pr.colCategory), sort: (x, y) => t(x.category).localeCompare(t(y.category)), render: (p) => t(p.category) },
    { key: 'unit', header: t(pr.colUnit), render: (p) => (p.unit ? t(p.unit) : '-') },
    { key: 'price', header: t(pr.colPrice), end: true, sort: (x, y) => x.price - y.price, render: (p) => formatMoney(p.price, lang) },
    { key: 'cost', header: t(pr.colCost), end: true, render: (p) => formatMoney(costOf(p), lang) },
    { key: 'stock', header: t(pr.colStock), end: true, sort: (x, y) => book.total(x.id).available - book.total(y.id).available, render: (p) => <strong>{book.total(p.id).available}</strong> },
    { key: 'info', header: t(pr.colInfo), render: (p) => (p.custom ? (missingParts(p).length === 0 ? <Badge tone="success">{t(pr.infoComplete)}</Badge> : <Badge tone="warning">{t(pr.infoMissing)} ({missingParts(p).length})</Badge>) : '-') },
    { key: 'shop', header: t(pr.colShop), render: (p) => <Badge tone={isHidden(p.id) ? undefined : 'success'}>{t(isHidden(p.id) ? pr.hidden : pr.shown)}</Badge> },
    {
      key: 'act',
      header: t(pr.colAction),
      render: (p) => (
        <span className="row">
          {p.custom && <Button size="sm" variant="secondary" to={`${base}/products/${p.id}/edit${search}`}>{t(pr.edit)}</Button>}
          <Button size="sm" variant="secondary" onClick={() => setShown(p.id, isHidden(p.id))}>{t(isHidden(p.id) ? pr.show : pr.hide)}</Button>
          {p.custom && <Button size="sm" variant="ghost" onClick={() => { setMessage(''); setDeleting(p) }}>{t(pr.delete)}</Button>}
        </span>
      ),
    },
  ]

  const deletable = deleting ? !hasHistory(deleting.id) : false
  return (
    <Grid>
      <Col>
        <PageHead title={t(pr.title)} text={`${t(pr.text)} (${all.length} ${t(pr.records)})`} actions={<Button icon="plus" to={`${base}/products/new${search}`}>{t(pr.add)}</Button>} />
      </Col>
      <Col>
        <CardGrid size="small">
          <StatCard icon="grid" label={t(pr.statTotal)} value={String(all.length)} note={t(pr.records)} />
          <StatCard icon="edit" label={t(pr.statMine)} value={String(all.filter((p) => p.custom).length)} note={t(pr.records)} />
          <StatCard icon="view" label={t(pr.statHidden)} value={String(all.filter((p) => isHidden(p.id)).length)} note={t(pr.records)} />
        </CardGrid>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 12 }}><Field label={t(pr.search)} id="prd-q" type="search" placeholder={t(pr.searchHint)} value={q} onChange={(e) => setQ(e.target.value)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}>
        <Select label={t(pr.source)} id="prd-source" value={source} onChange={(e) => setSource(e.target.value)} options={[{ value: '', label: t(pr.allSources) }, { value: 'mine', label: t(pr.mine) }, { value: 'sample', label: t(pr.sampleSource) }]} />
      </Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}>
        <Select label={t(pr.infoFilter)} id="prd-info" value={info} onChange={(e) => setInfo(e.target.value)} options={[{ value: '', label: t(pr.infoAll) }, { value: 'incomplete', label: t(pr.infoIncomplete) }, { value: 'complete', label: t(pr.infoComplete) }]} />
      </Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}>
        <Select label={t(pr.shopStatus)} id="prd-shop" value={shop} onChange={(e) => setShop(e.target.value)} options={[{ value: '', label: t(pr.allShop) }, { value: 'shown', label: t(pr.shown) }, { value: 'hidden', label: t(pr.hidden) }]} />
      </Col>
      {message && <Col><Notice tone="success">{message}</Notice></Col>}
      <Col><p className="muted">{t(pr.readOnly)}</p></Col>
      <Col>
        <Card>
          <DataTable label={t(pr.label)} columns={columns} rows={rows} rowKey={(p) => p.id} empty={t(pr.empty)} />
        </Card>
      </Col>
      {deleting && (
        <Modal open onClose={() => setDeleting(null)} label={t(pr.deleteTitle)} closeLabel={t(pr.close)}>
          <div className="stack">
            <h2>{t(pr.deleteTitle)}</h2>
            <p><strong>{t(deleting.name)}</strong></p>
            <p>{deletable ? t(pr.deleteText) : t(pr.cannotDelete)}</p>
            <div className="row">
              <Button variant="danger" disabled={!deletable} onClick={() => { remove(deleting.id); setDeleting(null); setMessage(t(pr.removed)) }}>{t(pr.deleteConfirm)}</Button>
              <Button variant="ghost" onClick={() => setDeleting(null)}>{t(pr.cancel)}</Button>
            </div>
          </div>
        </Modal>
      )}
    </Grid>
  )
}
