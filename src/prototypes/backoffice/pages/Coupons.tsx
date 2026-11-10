import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { useCoupons, type CouponView } from '../../../promotions/useCoupons'
import { Badge, Button, Card, Col, DataTable, Field, Grid, Modal, Notice, Select, type DataColumn } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { usePaging } from '../paging'
import { PROTOTYPE_ID, useSearch } from '../data'
import { pm } from '../promoStrings'

export const couponStatus = (c: CouponView): 'inactive' | 'expired' | 'notStarted' | 'full' | 'active' => (c.inactive ? 'inactive' : c.expired ? 'expired' : c.notStarted ? 'notStarted' : c.full ? 'full' : 'active')

export function Coupons() {
  const { t, lang } = useLang()
  const paging = usePaging()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const { all, update, remove, edited } = useCoupons()
  const notice = (useLocation().state as { notice?: string } | null)?.notice ?? ''
  const [message, setMessage] = useState(notice)
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [deleting, setDeleting] = useState<CouponView | null>(null)
  const needle = q.trim().toLowerCase()
  const rows = all.filter((c) => (!needle || t(c.title).toLowerCase().includes(needle) || t(c.detail).toLowerCase().includes(needle)) && (!status || couponStatus(c) === status))
  const date = (d: string) => new Intl.DateTimeFormat(lang === 'th' ? 'th-TH-u-ca-gregory' : 'en-GB', { day: 'numeric', month: 'short', year: '2-digit' }).format(new Date(d))
  const statusLabel = { active: pm.sActive, inactive: pm.sInactive, expired: pm.sExpired, notStarted: pm.sNotStarted, full: pm.sFull }
  const statusTone = { active: 'success', inactive: undefined, expired: undefined, notStarted: 'info', full: 'warning' } as const
  const discountText = (c: CouponView) => (c.kind === 'freeship' ? t(pm.freeShip) : c.kind === 'amount' ? formatMoney(c.value, lang) : `${c.value}%${c.cap ? ` (${t(pm.upTo)} ${formatMoney(c.cap, lang)})` : ''}`)

  const columns: DataColumn<CouponView>[] = [
    { key: 'title', wrap: true, header: t(pm.colCoupon), sort: (x, y) => t(x.title).localeCompare(t(y.title)), render: (c) => <span className="stack"><span className="row"><strong>{t(c.title)}</strong>{c.custom && <Badge tone="info">{t(pm.mine)}</Badge>}{edited(c.id) && <Badge>{t(pm.changed)}</Badge>}</span><span className="muted">{t(c.detail)}</span></span> },
    { key: 'discount', header: t(pm.colDiscount), render: (c) => discountText(c) },
    { key: 'min', header: t(pm.colMin), end: true, render: (c) => formatMoney(c.minSpend, lang) },
    { key: 'channel', header: t(pm.colChannel), render: (c) => t(c.channel === 'online' ? pm.online : pm.store) },
    { key: 'valid', header: t(pm.colValid), render: (c) => `${date(c.starts)} – ${date(c.expires)}` },
    { key: 'used', header: t(pm.colUsed), end: true, render: (c) => (c.limit !== undefined ? `${c.used}/${c.limit}` : `${c.used} (${t(pm.unlimited)})`) },
    { key: 'status', header: t(pm.colStatus), render: (c) => <Badge tone={statusTone[couponStatus(c)]}>{t(statusLabel[couponStatus(c)])}</Badge> },
    {
      key: 'act',
      header: t(pm.colAction),
      render: (c) => (
        <span className="row">
          <Button size="sm" variant="secondary" to={`${base}/promotions/coupons/${c.id}/edit${search}`}>{t(pm.edit)}</Button>
          <Button size="sm" variant="ghost" onClick={() => update(c.id, { inactive: !c.inactive })}>{t(c.inactive ? pm.activate : pm.deactivate)}</Button>
          {c.custom && <Button size="sm" variant="ghost" onClick={() => { setMessage(''); setDeleting(c) }}>{t(pm.delete)}</Button>}
        </span>
      ),
    },
  ]
  return (
    <Grid>
      <Col><PageHead title={t(pm.cTitle)} text={`${t(pm.cText)} (${all.length})`} actions={<Button icon="plus" to={`${base}/promotions/coupons/new${search}`}>{t(pm.cAdd)}</Button>} /></Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}><Field label={t(pm.cSearch)} id="cp-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} /></Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Select label={t(pm.cStatusFilter)} id="cp-status" value={status} onChange={(e) => setStatus(e.target.value)} options={[{ value: '', label: t(pm.allStatus) }, ...(['active', 'inactive', 'expired', 'notStarted', 'full'] as const).map((k) => ({ value: k, label: t(statusLabel[k]) }))]} />
      </Col>
      {message && <Col><Notice tone="success">{message}</Notice></Col>}
      <Col><Card><DataTable label={t(pm.cLabel)} columns={columns} rows={rows} rowKey={(c) => c.id} empty={t(pm.cEmpty)} {...paging()} /></Card></Col>
      {deleting && (
        <Modal open onClose={() => setDeleting(null)} label={t(pm.cDeleteTitle)} closeLabel={t(pm.close)}>
          <div className="stack">
            <h2>{t(pm.cDeleteTitle)}</h2>
            <p><strong>{t(deleting.title)}</strong></p>
            <p>{deleting.used > 0 ? t(pm.cCannotDelete) : t(pm.cDeleteText)}</p>
            <div className="row">
              <Button variant="danger" disabled={deleting.used > 0} onClick={() => { remove(deleting.id); setDeleting(null); setMessage(t(pm.cRemoved)) }}>{t(pm.cDeleteConfirm)}</Button>
              <Button variant="ghost" onClick={() => setDeleting(null)}>{t(pm.cancel)}</Button>
            </div>
          </div>
        </Modal>
      )}
    </Grid>
  )
}
