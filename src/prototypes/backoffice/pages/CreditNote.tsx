import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { paidAtOf, vatIncluded } from '../../../accounting/accounting'
import { useReturns } from '../../../returns/useReturns'
import { useSettings } from '../../../settings/useSettings'
import { Badge, Breadcrumb, Button, Card, Col, DataRow, DataTable, Grid, Notice, type DataColumn } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { customerText } from '../../ecommerce/orders'
import { ac } from '../accStrings'
import { PROTOTYPE_ID, useBackOrders, useSearch } from '../data'
import { rt } from '../returnStrings'
import { reasonText } from './Returns'

// A sample credit note for a return, laid out like the tax invoice and printable the same way.
export function CreditNote() {
  const { t, lang } = useLang()
  const { returnId } = useParams()
  const { shop, policy } = useSettings()
  const [returns] = useReturns()
  const orders = useBackOrders()
  const base = `/${PROTOTYPE_ID}`
  const search = useSearch()
  const state = useLocation().state as { notice?: string; print?: boolean } | null
  const notice = state?.notice ?? ''
  const printOnArrival = !!state?.print
  useEffect(() => {
    // Coming from a Print choice in the returns table: the page opens the print dialog once it is drawn.
    if (!printOnArrival) return
    const timer = window.setTimeout(() => window.print(), 400)
    return () => window.clearTimeout(timer)
  }, [printOnArrival])
  const r = returns.find((x) => x.id === returnId)
  if (!r) return <Grid><Col><Card><p>{t(rt.cnNotFound)}</p><div><Button to={`${base}/returns${search}`}>{t(rt.cnBack)}</Button></div></Card></Col></Grid>
  const order = orders.find((o) => o.id === r.orderId)
  const vat = vatIncluded(r.amount, policy.rateAt(order ? paidAtOf(order) : r.at))
  const net = Math.round((r.amount - vat) * 100) / 100
  const date = new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'long' }).format(new Date(r.at))
  const buyer = order?.taxBuyer?.name ?? (order ? customerText(order.customer.name, lang) : '')
  type Row = (typeof r.lines)[number]
  const columns: DataColumn<Row>[] = [
    { key: 'item', wrap: true, header: t(rt.cnItem), render: (l) => t(l.name) },
    { key: 'qty', header: t(rt.cnQty), end: true, render: (l) => l.qty },
    { key: 'unit', header: t(rt.cnUnit), end: true, render: (l) => formatMoney(l.price, lang) },
    { key: 'amount', header: t(rt.cnAmount), end: true, render: (l) => formatMoney(l.price * l.qty, lang) },
  ]
  return (
    <Grid>
      <Col>
        <div className="stack no-print">
          <Breadcrumb label={t(rt.breadcrumb)} items={[{ label: t(rt.nav), to: `${base}/returns${search}` }, { label: r.id }]} />
          {notice && <Notice tone="success">{notice}</Notice>}
          <div className="row"><Button icon="receipt" onClick={() => window.print()}>{t(rt.cnPrint)}</Button><Button variant="ghost" to={`${base}/returns${search}`}>{t(rt.cnBack)}</Button></div>
        </div>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <Notice tone="info">{t(rt.cnBanner)}</Notice>
            <div className="row"><h1 className="row__grow">{t(rt.cnHeading)}</h1><Badge tone="warning">{t(reasonText[r.reason])}</Badge></div>
            <DataRow label={t(rt.cnNo)} value={r.creditNo} />
            <DataRow label={t(rt.cnDate)} value={date} />
            <DataRow label={t(rt.cnRef)} value={<Link to={`${base}/orders/${r.orderId}${search}`}>{r.orderId}</Link>} />
            <div className="stack">
              <h3>{t(rt.cnSeller)}</h3>
              <strong>{shop.name || t(ac.sellerName)}</strong>
              <span className="muted">{t(ac.invTaxId)} {shop.taxId || t(ac.sellerTaxId)} · {shop.branch || t(ac.sellerBranch)}</span>
              <span className="muted">{shop.address || t(ac.sellerAddress)}</span>
            </div>
            <div className="stack"><h3>{t(rt.cnBuyer)}</h3><strong>{buyer}</strong></div>
            <DataTable label={t(rt.cnHeading)} columns={columns} rows={r.lines} rowKey={(l) => String(l.lineIndex)} empty="" />
            <DataRow label={t(rt.cnNet)} value={formatMoney(net, lang)} />
            <DataRow label={t(rt.cnVat)} value={formatMoney(vat, lang)} />
            <DataRow strong label={t(rt.cnTotal)} value={formatMoney(r.amount, lang)} />
            {r.note && <span className="muted">{t(rt.note)}: {r.note}</span>}
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
