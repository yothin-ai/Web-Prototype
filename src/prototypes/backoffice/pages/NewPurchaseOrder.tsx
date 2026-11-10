import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDataset } from '../../../datasets/DatasetContext'
import { useLang } from '../../../i18n'
import { costOf, locationIds, type PurchaseOrder } from '../../../stock/stock'
import { Breadcrumb, Button, Card, Col, DataRow, Field, Grid, Select } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { locationName, PROTOTYPE_ID, usePurchaseBook, useSearch } from '../data'
import { suppliers } from '../suppliers'
import { b } from '../strings'

type Draft = { productId: string; qty: string }

export function NewPurchaseOrder() {
  const { t, lang } = useLang()
  const search = useSearch()
  const navigate = useNavigate()
  const base = `/${PROTOTYPE_ID}`
  const products = useDataset().dataset.ecommerce.products
  const [purchases, setPurchases] = usePurchaseBook()
  const [supplierId, setSupplierId] = useState('')
  const [loc, setLoc] = useState('central')
  const [expected, setExpected] = useState('')
  const [note, setNote] = useState('')
  const [lines, setLines] = useState<Draft[]>([{ productId: '', qty: '' }])
  const [tried, setTried] = useState(false)
  const setLine = (i: number, patch: Partial<Draft>) => setLines(lines.map((l, j) => (j === i ? { ...l, ...patch } : l)))
  const linesOk = lines.every((l) => l.productId && Number.isInteger(Number(l.qty)) && Number(l.qty) >= 1 && l.qty.trim() !== '')
  const total = lines.reduce((n, l) => {
    const p = products.find((x) => x.id === l.productId)
    return n + (p && Number(l.qty) >= 1 ? costOf(p) * Number(l.qty) : 0)
  }, 0)
  const save = (status: 'draft' | 'ordered') => {
    setTried(true)
    if (!supplierId || !linesOk) return
    const own = purchases.filter((x) => !x.sample).length
    const id = `PO-${1001 + own}`
    const merged = new Map<string, number>()
    for (const l of lines) merged.set(l.productId, (merged.get(l.productId) ?? 0) + Number(l.qty))
    const po: PurchaseOrder = { id, at: new Date().toISOString(), supplierId, loc, lines: [...merged].map(([productId, qty]) => ({ productId, qty })), status, expectedAt: expected ? new Date(expected).toISOString() : undefined, note: note.trim() || undefined }
    setPurchases([...purchases, po])
    navigate(`${base}/purchase-orders/${id}${search}`)
  }
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(b.breadcrumb)} items={[{ label: t(b.navPurchaseOrders), to: `${base}/purchase-orders${search}` }, { label: t(b.poNewTitle) }]} />
          <PageHead title={t(b.poNewTitle)} text={t(b.poNewText)} />
        </div>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}>
        <Card>
          <div className="stack">
            <Select label={t(b.colSupplier)} id="po-supplier" value={supplierId} placeholder={t(b.pickSupplier)} onChange={(e) => setSupplierId(e.target.value)} hint={tried && !supplierId ? t(b.poErrSupplier) : undefined} options={suppliers.map((s) => ({ value: s.id, label: t(s.name) }))} />
            <h3>{t(b.poLines)}</h3>
            {lines.map((l, i) => (
              <div key={i} className="stack">
                <Select label={t(b.product)} id={`po-line-${i}`} value={l.productId} placeholder={t(b.pickProduct)} onChange={(e) => setLine(i, { productId: e.target.value })} options={products.map((p) => ({ value: p.id, label: t(p.name) }))} />
                <Field label={t(b.colQty)} id={`po-qty-${i}`} type="number" min={1} inputMode="numeric" value={l.qty} onChange={(e) => setLine(i, { qty: e.target.value })} />
                {lines.length > 1 && <div><Button variant="ghost" size="sm" icon="trash" onClick={() => setLines(lines.filter((_, j) => j !== i))}>{t(b.poRemoveLine)}</Button></div>}
              </div>
            ))}
            {tried && !linesOk && <span className="field__hint">{t(b.poErrLines)}</span>}
            <div><Button variant="secondary" size="sm" icon="plus" onClick={() => setLines([...lines, { productId: '', qty: '' }])}>{t(b.poAddLine)}</Button></div>
          </div>
        </Card>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Card>
          <div className="stack">
            <Select label={t(b.poPlace)} id="po-place" value={loc} onChange={(e) => setLoc(e.target.value)} options={locationIds.map((id) => ({ value: id, label: t(locationName(id)) }))} />
            <Field label={t(b.poExpectedDate)} id="po-expected" type="date" value={expected} onChange={(e) => setExpected(e.target.value)} />
            <Field label={t(b.adjustNote)} id="po-note" value={note} onChange={(e) => setNote(e.target.value)} />
            <DataRow strong label={t(b.poTotal)} value={formatMoney(total, lang)} />
            <span className="muted">{t(b.poCostNote)}</span>
            <div className="row"><Button onClick={() => save('ordered')}>{t(b.poOrderNow)}</Button><Button variant="secondary" onClick={() => save('draft')}>{t(b.poSaveDraft)}</Button></div>
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
