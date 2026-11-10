import { useState } from 'react'
import { useProducts } from '../../../products/useProducts'
import { useLang } from '../../../i18n'
import { remainingValue } from '../../../stock/stock'
import { Button, Card, CardGrid, Col, DataRow, Field, Grid, IconCircle } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { PROTOTYPE_ID, usePurchaseBook, useSearch } from '../data'
import { suppliers } from '../suppliers'
import { b } from '../strings'

export function Suppliers() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const products = useProducts().all
  const [purchases] = usePurchaseBook()
  const [q, setQ] = useState('')
  const needle = q.trim().toLowerCase()
  const shown = suppliers.filter((s) => !needle || t(s.name).toLowerCase().includes(needle) || t(s.contact).toLowerCase().includes(needle))
  return (
    <Grid>
      <Col>
        <PageHead title={t(b.suppliersTitle)} text={`${t(b.suppliersText)} (${suppliers.length} ${t(b.records)}) ${t(b.sample)}`} />
      </Col>
      <Col><Field label={t(b.supplierSearch)} id="sup-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} /></Col>
      {shown.length === 0 && <Col><p className="muted">{t(b.supNone)}</p></Col>}
      <Col>
        <CardGrid size="medium">
      {shown.map((s) => {
        const open = purchases.filter((po) => po.supplierId === s.id && po.status === 'ordered' || po.status === 'partial')
        const value = open.reduce((n, po) => n + remainingValue(po, products), 0)
        return (
          <Card key={s.id}>
              <div className="stack">
                <div className="row"><IconCircle size="md" icon="truck" /><div className="stack row__grow"><strong>{t(s.name)}</strong><span className="muted">{t(s.contact)}</span></div></div>
                <DataRow muted label={t(b.supPhone)} value={s.phone} />
                <DataRow muted label={t(b.supEmail)} value={s.email} />
                <DataRow muted label={t(b.supCity)} value={t(s.city)} />
                <DataRow strong label={t(b.supOpen)} value={`${open.length} · ${formatMoney(value, lang)}`} />
                <div className="card-grid__push"><Button to={`${base}/purchase-orders?supplier=${s.id}${search ? `&${search.slice(1)}` : ''}`} variant="secondary" size="sm">{t(b.supSeeOrders)}</Button></div>
              </div>
          </Card>
        )
      })}
        </CardGrid>
      </Col>
    </Grid>
  )
}
