import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useProducts } from '../../../products/useProducts'
import { useLang } from '../../../i18n'
import { remainingValue } from '../../../stock/stock'
import { useMovements } from '../../../stock/useStock'
import { Badge, Button, Card, CardGrid, Col, DataRow, Field, Grid, IconCircle, Modal, Notice, Switch } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { PROTOTYPE_ID, usePurchaseBook, useSearch } from '../data'
import { b } from '../strings'
import { sp } from '../supplierStrings'
import { useSuppliers, type Supplier } from '../suppliers'

export function Suppliers() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const products = useProducts().all
  const { all, update, remove } = useSuppliers()
  const [purchases] = usePurchaseBook()
  const [movements] = useMovements()
  const notice = (useLocation().state as { notice?: string } | null)?.notice ?? ''
  const [message, setMessage] = useState(notice)
  const [q, setQ] = useState('')
  const [showInactive, setShowInactive] = useState(false)
  const [deleting, setDeleting] = useState<Supplier | null>(null)
  const needle = q.trim().toLowerCase()
  const shown = all.filter((s) => (showInactive || !s.inactive) && (!needle || t(s.name).toLowerCase().includes(needle) || t(s.contact).toLowerCase().includes(needle)))
  const hasHistory = (id: string) => purchases.some((po) => po.supplierId === id) || movements.some((m) => m.supplierId === id)
  return (
    <Grid>
      <Col>
        <PageHead title={t(b.suppliersTitle)} text={`${t(b.suppliersText)} (${all.length} ${t(b.records)})`} actions={<Button icon="plus" to={`${base}/suppliers/new${search}`}>{t(sp.add)}</Button>} />
      </Col>
      <Col><Field label={t(b.supplierSearch)} id="sup-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} /></Col>
      <Col><Switch label={t(sp.showInactive)} checked={showInactive} onChange={setShowInactive} /></Col>
      {message && <Col><Notice tone="success">{message}</Notice></Col>}
      {shown.length === 0 && <Col><p className="muted">{t(b.supNone)}</p></Col>}
      <Col>
        <CardGrid size="medium">
          {shown.map((s) => {
            const open = purchases.filter((po) => po.supplierId === s.id && (po.status === 'ordered' || po.status === 'partial'))
            const value = open.reduce((n, po) => n + remainingValue(po, products), 0)
            return (
              <Card key={s.id}>
                <div className="stack">
                  <div className="row">
                    <IconCircle size="md" icon="truck" />
                    <div className="stack row__grow"><strong>{t(s.name)}</strong><span className="muted">{t(s.contact)}</span></div>
                    {s.custom && <Badge tone="info">{t(sp.mine)}</Badge>}
                    {s.inactive && <Badge>{t(sp.inactive)}</Badge>}
                  </div>
                  <DataRow muted label={t(b.supPhone)} value={s.phone || '-'} />
                  <DataRow muted label={t(b.supEmail)} value={s.email || '-'} />
                  <DataRow muted label={t(b.supCity)} value={t(s.city) || '-'} />
                  {s.address && <DataRow muted label={t(sp.address)} value={s.address} />}
                  {s.termsDays !== undefined && <DataRow muted label={t(sp.terms_)} value={`${s.termsDays} ${t(sp.days)}`} />}
                  <DataRow strong label={t(b.supOpen)} value={`${open.length} · ${formatMoney(value, lang)}`} />
                  <div className="row card-grid__push">
                    <Button to={`${base}/purchase-orders?supplier=${s.id}${search ? `&${search.slice(1)}` : ''}`} variant="secondary" size="sm">{t(b.supSeeOrders)}</Button>
                    <Button to={`${base}/suppliers/${s.id}/edit${search}`} variant="secondary" size="sm">{t(sp.edit)}</Button>
                    <Button variant="ghost" size="sm" onClick={() => update(s.id, { inactive: !s.inactive })}>{t(s.inactive ? sp.activate : sp.deactivate)}</Button>
                    {s.custom && <Button variant="ghost" size="sm" onClick={() => { setMessage(''); setDeleting(s) }}>{t(sp.delete)}</Button>}
                  </div>
                </div>
              </Card>
            )
          })}
        </CardGrid>
      </Col>
      {deleting && (
        <Modal open onClose={() => setDeleting(null)} label={t(sp.deleteTitle)} closeLabel={t(sp.close)}>
          <div className="stack">
            <h2>{t(sp.deleteTitle)}</h2>
            <p><strong>{t(deleting.name)}</strong></p>
            <p>{hasHistory(deleting.id) ? t(sp.cannotDelete) : t(sp.deleteText)}</p>
            <div className="row">
              <Button variant="danger" disabled={hasHistory(deleting.id)} onClick={() => { remove(deleting.id); setDeleting(null); setMessage(t(sp.removed)) }}>{t(sp.deleteConfirm)}</Button>
              <Button variant="ghost" onClick={() => setDeleting(null)}>{t(sp.cancel)}</Button>
            </div>
          </div>
        </Modal>
      )}
    </Grid>
  )
}
