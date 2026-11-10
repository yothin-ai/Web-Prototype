import { Link, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { nextInvoiceNo, type InvoiceLine } from '../../../accounting/accounting'
import { Badge, Breadcrumb, Button, Card, Col, DataRow, DataTable, Grid, Notice, type DataColumn } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { customerText } from '../../ecommerce/orders'
import { ac, buyerText, invoiceStatusLabel, invoiceStatusTone } from '../accStrings'
import { b } from '../strings'
import { PROTOTYPE_ID, useInvoiceRecords, useInvoices, useSearch } from '../data'

// A sample of the document, laid out like a tax invoice: seller, buyer, number and date, the items before VAT, the VAT and the total.
export function InvoiceView() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const { invoiceId = '' } = useParams()
  const invoice = useInvoices().find((i) => i.id === invoiceId)
  const [records, setRecords] = useInvoiceRecords()
  if (!invoice) {
    return (
      <Card>
        <div className="stack">
          <p>{t(b.notFound)}</p>
          <div><Button to={`${base}/accounting/invoices${search}`} variant="secondary">{t(ac.invBack)}</Button></div>
        </div>
      </Card>
    )
  }
  const date = new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'long' }).format(new Date(invoice.at))
  const columns: DataColumn<InvoiceLine>[] = [
    { key: 'item', wrap: true, header: t(ac.invItem), render: (l) => t(l.name) },
    { key: 'qty', header: t(b.colQty), end: true, render: (l) => l.qty },
    { key: 'unit', header: t(ac.invUnit), end: true, render: (l) => formatMoney(l.unitNet, lang) },
    { key: 'amount', header: t(ac.invAmount), end: true, render: (l) => formatMoney(l.net, lang) },
  ]
  const issue = () => setRecords([...records, { orderId: invoice.orderId!, no: nextInvoiceNo(records), issuedAt: new Date().toISOString(), status: 'issued' }])
  const cancel = () => setRecords(records.map((r) => (r.orderId === invoice.orderId ? { ...r, status: 'cancelled' as const } : r)))
  const taxId = invoice.buyerTaxId.replace(/^(\d)(\d{4})(\d{5})(\d{2})(\d)$/, '$1-$2-$3-$4-$5')
  return (
    <Grid>
      <Col>
        <div className="stack no-print">
          <Breadcrumb label={t(b.breadcrumb)} items={[{ label: t(ac.invBack), to: `${base}/accounting/invoices${search}` }, { label: invoice.no ?? invoice.id }]} />
          <div className="row">
            <Button icon="receipt" onClick={() => window.print()}>{t(ac.invPrint)}</Button>
            {invoice.status === 'pending' && <Button variant="secondary" disabled={!invoice.canIssue} onClick={issue}>{t(ac.invIssue)}</Button>}
            {invoice.status === 'issued' && !invoice.sample && <Button variant="ghost" onClick={cancel}>{t(ac.invCancelBtn)}</Button>}
            {invoice.status === 'pending' && !invoice.canIssue && <span className="muted">{t(ac.invWaitPay)}</span>}
          </div>
          {invoice.status === 'issued' && !invoice.sample && <Notice tone="success">{t(ac.invEmailNote)}</Notice>}
        </div>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <Notice tone="info">{t(ac.invSampleBanner)}</Notice>
            <div className="row">
              <h1 className="row__grow">{t(ac.invHeading)}</h1>
              <Badge tone={invoiceStatusTone(invoice.status)}>{t(invoiceStatusLabel(invoice.status))}</Badge>
            </div>
            <DataRow label={t(ac.invNo)} value={invoice.no ?? t(ac.invNotNumbered)} />
            <DataRow label={t(ac.invDate)} value={date} />
            <div className="stack">
              <h3>{t(ac.invSeller)}</h3>
              <strong>{t(ac.sellerName)}</strong>
              <span className="muted">{t(ac.invTaxId)} {t(ac.sellerTaxId)} · {t(ac.sellerBranch)}</span>
              <span className="muted">{t(ac.sellerAddress)}</span>
            </div>
            <div className="stack">
              <h3>{t(ac.invBuyer)}</h3>
              <strong>{buyerText(invoice.buyerName, t)}</strong>
              <span className="muted">{t(ac.invTaxId)} {taxId}</span>
              {invoice.buyerAddress && <span className="muted">{customerText(invoice.buyerAddress, lang)}</span>}
            </div>
            <DataTable label={t(ac.invHeading)} columns={columns} rows={invoice.lines} rowKey={(l) => t(l.name)} empty="" />
            <DataRow label={t(ac.invSubtotal)} value={formatMoney(invoice.net, lang)} />
            <DataRow label={t(ac.invVat)} value={formatMoney(invoice.vat, lang)} />
            <DataRow strong label={t(ac.invTotal)} value={formatMoney(invoice.gross, lang)} />
            {invoice.orderId && <span className="muted no-print"><Link to={`${base}/orders/${invoice.orderId}${search}`}>{invoice.orderId}</Link></span>}
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
