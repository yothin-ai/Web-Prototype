import { useState } from 'react'
import { useProducts } from '../../../products/useProducts'
import { Link } from 'react-router-dom'
import type { Product } from '../../../datasets/types'
import { useLang } from '../../../i18n'
import { costOf, locationIds } from '../../../stock/stock'
import { useStock } from '../../../stock/useStock'
import { Card, CardGrid, Col, DataTable, Grid, Select, StatCard, type DataColumn } from '../../../ui'
import { formatMoney, skuOf } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { usePaging } from '../paging'
import { locationName, PROTOTYPE_ID, useSearch } from '../data'
import { b } from '../strings'

export function Valuation() {
  const { t, lang } = useLang()
  const paging = usePaging()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const products = useProducts().all
  const book = useStock()
  const [loc, setLoc] = useState('')
  const held = (p: Product) => Math.max(0, loc ? book.cell(p.id, loc).onHand : book.total(p.id).onHand)
  const value = (p: Product) => held(p) * costOf(p)
  const rows = [...products].sort((x, y) => value(y) - value(x))
  const columns: DataColumn<Product>[] = [
    { key: 'name', wrap: true, header: t(b.colProduct), sort: (x, y) => t(x.name).localeCompare(t(y.name)), render: (p) => <span className="stack"><Link to={`${base}/stock/${p.id}${search}`}>{t(p.name)}</Link><span className="muted">{skuOf(p)}</span></span> },
    { key: 'onhand', header: t(b.colOnHand), end: true, sort: (x, y) => held(x) - held(y), render: (p) => held(p) },
    { key: 'cost', header: t(b.colUnitCost), end: true, render: (p) => formatMoney(costOf(p), lang) },
    { key: 'value', header: t(b.valValue), end: true, sort: (x, y) => value(x) - value(y), render: (p) => <strong>{formatMoney(value(p), lang)}</strong> },
  ]
  return (
    <Grid>
      <Col>
        <PageHead title={t(b.valuationTitle)} text={`${t(b.valuationText)} ${t(b.sample)}`} />
      </Col>
      <Col>
        <CardGrid size="small">
          <StatCard icon="cash" label={t(b.valTotal)} value={formatMoney(products.reduce((n, p) => n + value(p), 0), lang)} note={t(b.poCostNote)} />
          <StatCard icon="package" label={t(b.valUnits)} value={String(products.reduce((n, p) => n + held(p), 0))} note={t(b.pieces)} />
          <StatCard icon="grid" label={t(b.valProducts)} value={String(products.filter((p) => held(p) > 0).length)} note={`${products.length} ${t(b.records)}`} />
        </CardGrid>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Select label={t(b.place)} value={loc} onChange={(e) => setLoc(e.target.value)} options={[{ value: '', label: t(b.allPlaces) }, ...locationIds.map((id) => ({ value: id, label: t(locationName(id)) }))]} />
      </Col>
      <Col>
        <Card>
          <DataTable label={t(b.valLabel)} columns={columns} rows={rows} rowKey={(p) => p.id} empty={t(b.stockEmpty)} {...paging()} />
        </Card>
      </Col>
    </Grid>
  )
}
