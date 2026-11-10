import { useState } from 'react'
import { useProducts } from '../../../products/useProducts'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { locationIds, supplierIds, type Movement } from '../../../stock/stock'
import { useMovements } from '../../../stock/useStock'
import { Button, Card, CardGrid, Col, DataTable, Field, Grid, Notice, Select, type DataColumn } from '../../../ui'
import { formatDate, skuOf } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { locationName, PROTOTYPE_ID, useSearch } from '../data'
import { b, supplierNames } from '../strings'

export function Receive() {
  const { t, lang } = useLang()
  const { search: rawSearch } = useLocation()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const products = useProducts().all
  const [movements, setMovements] = useMovements()
  const preset = new URLSearchParams(rawSearch).get('product') ?? ''
  const [productId, setProductId] = useState(products.some((p) => p.id === preset) ? preset : '')
  const [supplierId, setSupplierId] = useState('')
  const [loc, setLoc] = useState('central')
  const [qty, setQty] = useState('')
  const [tried, setTried] = useState(false)
  const [done, setDone] = useState<{ productId: string } | null>(null)
  const amount = Number(qty)
  const qtyOk = qty.trim() !== '' && Number.isInteger(amount) && amount >= 1
  const save = () => {
    setTried(true)
    if (!productId || !supplierId || !qtyOk) return
    setMovements([...movements, { id: `m-${Date.now()}`, at: new Date().toISOString(), productId, loc, kind: 'in', qty: amount, supplierId }])
    setDone({ productId })
    setQty('')
    setTried(false)
  }
  const recent = movements.filter((m) => m.kind === 'in').sort((a, c) => c.at.localeCompare(a.at)).slice(0, 8)
  const nameOf = (id: string) => products.find((p) => p.id === id)?.name ?? {}
  const columns: DataColumn<Movement>[] = [
    { key: 'date', header: t(b.colDate), render: (m) => formatDate(m.at, lang) },
    { key: 'product', wrap: true, header: t(b.colProduct), render: (m) => <Link to={`${base}/stock/${m.productId}${search}`}>{t(nameOf(m.productId))}</Link> },
    { key: 'supplier', wrap: true, header: t(b.supplier), render: (m) => (m.supplierId ? t(supplierNames[m.supplierId]) : '-') },
    { key: 'place', header: t(b.place), render: (m) => t(locationName(m.loc)) },
    { key: 'qty', header: t(b.colQtyChange), end: true, render: (m) => <strong>+{m.qty}</strong> },
  ]
  return (
    <Grid>
      <Col>
        <PageHead title={t(b.receiveTitle)} text={t(b.receiveText)} />
      </Col>
      <Col>
        <CardGrid size="large">
          <Card>
            <div className="stack">
              {done && (
                <Notice tone="success" title={t(b.received)}>
                  {t(b.receivedText)} <Link to={`${base}/stock/${done.productId}${search}`}>{t(b.viewProduct)}</Link>
                </Notice>
              )}
              <Select label={t(b.product)} id="rc-product" value={productId} placeholder={t(b.pickProduct)} onChange={(e) => setProductId(e.target.value)} hint={tried && !productId ? t(b.errProduct) : undefined} options={products.map((p) => ({ value: p.id, label: `${t(p.name)} (${skuOf(p)})` }))} />
              <Select label={t(b.supplier)} id="rc-supplier" value={supplierId} placeholder={t(b.pickSupplier)} onChange={(e) => setSupplierId(e.target.value)} hint={tried && !supplierId ? t(b.errSupplier) : undefined} options={supplierIds.map((id) => ({ value: id, label: t(supplierNames[id]) }))} />
              <Select label={t(b.receiveTo)} id="rc-place" value={loc} onChange={(e) => setLoc(e.target.value)} options={locationIds.map((id) => ({ value: id, label: t(locationName(id)) }))} />
              <Field label={t(b.quantity)} id="rc-qty" type="number" min={1} inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value)} hint={tried && !qtyOk ? t(b.errQty) : undefined} />
              <div><Button onClick={save}>{t(b.saveReceipt)}</Button></div>
            </div>
          </Card>
          <Card>
            <div className="stack">
              <h3>{t(b.recentTitle)}</h3>
              <DataTable label={t(b.recentLabel)} columns={columns} rows={recent} rowKey={(m) => m.id} empty={t(b.recentEmpty)} />
            </div>
          </Card>
        </CardGrid>
      </Col>
    </Grid>
  )
}
