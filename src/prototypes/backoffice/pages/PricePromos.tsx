import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { useProducts } from '../../../products/useProducts'
import { soldIn, stateOf, usePricePromos, type PricePromo, type PromoState } from '../../../promotions/usePricePromos'
import { useDemoState } from '../../../state/demoState'
import type { Order } from '../../ecommerce/cart'
import { Badge, Button, Card, Col, DataTable, Field, Grid, Modal, Notice, Select, type DataColumn } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { PROTOTYPE_ID, useSearch } from '../data'
import { pm } from '../promoStrings'

const NO_ORDERS: Order[] = []

export function PricePromos() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const { all, regularPriceOf } = useProducts()
  const [promos, setPromos] = usePricePromos()
  const [orders] = useDemoState<Order[]>('ecommerce', 'orders', NO_ORDERS)
  const notice = (useLocation().state as { notice?: string } | null)?.notice ?? ''
  const [message, setMessage] = useState(notice)
  const [q, setQ] = useState('')
  const [kind, setKind] = useState('')
  const [deleting, setDeleting] = useState<PricePromo | null>(null)
  const now = new Date().toISOString()
  const productOf = (id: string) => all.find((p) => p.id === id)
  const needle = q.trim().toLowerCase()
  const rows = [...promos].sort((a, b) => b.starts.localeCompare(a.starts)).filter((x) => (!kind || x.kind === kind) && (!needle || t(productOf(x.productId)?.name ?? {}).toLowerCase().includes(needle)))
  const stateLabel: Record<PromoState, (typeof pm)['psActive']> = { scheduled: pm.psScheduled, active: pm.psActive, ended: pm.psEnded, soldout: pm.psSoldout }
  const stateTone: Record<PromoState, 'success' | 'info' | 'warning' | undefined> = { scheduled: 'info', active: 'success', ended: undefined, soldout: 'warning' }
  const when = (iso: string) => new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))

  const columns: DataColumn<PricePromo>[] = [
    { key: 'product', wrap: true, header: t(pm.colProduct), render: (x) => (productOf(x.productId) ? <Link to={`${base}/stock/${x.productId}${search}`}>{t(productOf(x.productId)!.name)}</Link> : x.productId) },
    { key: 'kind', header: t(pm.colKind), render: (x) => <Badge tone={x.kind === 'flash' ? 'warning' : 'info'}>{t(x.kind === 'flash' ? pm.kindFlash : pm.kindDiscount)}</Badge> },
    { key: 'regular', header: t(pm.colRegular), end: true, render: (x) => formatMoney(regularPriceOf(x.productId) ?? 0, lang) },
    { key: 'price', header: t(pm.colPromo), end: true, render: (x) => <strong>{formatMoney(x.price, lang)}</strong> },
    { key: 'window', header: t(pm.colWindow), render: (x) => `${when(x.starts)} – ${when(x.ends)}` },
    { key: 'qty', header: t(pm.colQty), end: true, render: (x) => (x.kind === 'flash' ? `${soldIn(x, orders)}/${x.qty ?? '-'}` : '-') },
    { key: 'status', header: t(pm.colStatus), render: (x) => { const s = stateOf(x, now, soldIn(x, orders)); return <Badge tone={stateTone[s]}>{t(stateLabel[s])}</Badge> } },
    {
      key: 'act',
      header: t(pm.colAction),
      render: (x) => {
        const s = stateOf(x, now, soldIn(x, orders))
        return (
          <span className="row">
            <Button size="sm" variant="secondary" to={`${base}/promotions/prices/${x.id}/edit${search}`}>{t(pm.edit)}</Button>
            {(s === 'active' || s === 'scheduled') && <Button size="sm" variant="ghost" onClick={() => { setPromos(promos.map((p) => (p.id === x.id ? { ...p, ends: now < p.starts ? p.starts : now } : p))); setMessage(t(pm.pEnded)) }}>{t(pm.endNow)}</Button>}
            <Button size="sm" variant="ghost" onClick={() => { setMessage(''); setDeleting(x) }}>{t(pm.delete)}</Button>
          </span>
        )
      },
    },
  ]
  return (
    <Grid>
      <Col><PageHead title={t(pm.pTitle)} text={`${t(pm.pText)} (${promos.length})`} actions={<Button icon="plus" to={`${base}/promotions/prices/new${search}`}>{t(pm.pAdd)}</Button>} /></Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}><Field label={t(pm.pSearch)} id="pp-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} /></Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Select label={t(pm.pKindFilter)} id="pp-kind" value={kind} onChange={(e) => setKind(e.target.value)} options={[{ value: '', label: t(pm.allKinds) }, { value: 'discount', label: t(pm.kindDiscount) }, { value: 'flash', label: t(pm.kindFlash) }]} />
      </Col>
      {message && <Col><Notice tone="success">{message}</Notice></Col>}
      <Col><Card><DataTable label={t(pm.pLabel)} columns={columns} rows={rows} rowKey={(x) => x.id} empty={t(pm.pEmpty)} /></Card></Col>
      {deleting && (
        <Modal open onClose={() => setDeleting(null)} label={t(pm.pDeleteTitle)} closeLabel={t(pm.close)}>
          <div className="stack">
            <h2>{t(pm.pDeleteTitle)}</h2>
            <p>{t(pm.pDeleteText)}</p>
            <div className="row">
              <Button variant="danger" onClick={() => { setPromos(promos.filter((p) => p.id !== deleting.id)); setDeleting(null); setMessage(t(pm.pRemoved)) }}>{t(pm.pDeleteConfirm)}</Button>
              <Button variant="ghost" onClick={() => setDeleting(null)}>{t(pm.cancel)}</Button>
            </div>
          </div>
        </Modal>
      )}
    </Grid>
  )
}
