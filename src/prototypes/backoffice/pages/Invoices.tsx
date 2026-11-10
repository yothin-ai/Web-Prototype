import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { nextInvoiceNo, type Invoice } from '../../../accounting/accounting'
import { Badge, Button, Card, CardGrid, Col, DataTable, Field, Grid, Select, Notice, StatCard, type DataColumn } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { ac, buyerText, invoiceStatusLabel, invoiceStatusTone } from '../accStrings'
import { b } from '../strings'
import { useSettings } from '../../../settings/useSettings'
import { st } from '../settingStrings'
import { PROTOTYPE_ID, useInvoiceRecords, useInvoices, useSearch } from '../data'

export function Invoices() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const invoices = useInvoices()
  const { vatNow } = useSettings()
  const [records, setRecords] = useInvoiceRecords()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const needle = q.trim().toLowerCase()
  const rows = invoices.filter((i) => (!status || i.status === status) && (!needle || (i.no ?? '').toLowerCase().includes(needle) || buyerText(i.buyerName, t).toLowerCase().includes(needle) || (i.orderId ?? '').toLowerCase().includes(needle)))
  const date = (iso: string) => new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium' }).format(new Date(iso))
  const issue = (i: Invoice) => setRecords([...records, { orderId: i.orderId!, no: nextInvoiceNo(records), issuedAt: new Date().toISOString(), status: 'issued' }])
  const cancel = (i: Invoice) => setRecords(records.map((r) => (r.orderId === i.orderId ? { ...r, status: 'cancelled' as const } : r)))
  const columns: DataColumn<Invoice>[] = [
    { key: 'no', header: t(ac.colInvNo), render: (i) => <span className="row"><Link to={`${base}/accounting/invoices/${i.id}${search}`}>{i.no ?? t(ac.invNotNumbered)}</Link>{i.sample && <Badge>{t(b.sampleBadge)}</Badge>}</span> },
    { key: 'buyer', wrap: true, header: t(ac.colBuyer), render: (i) => buyerText(i.buyerName, t) },
    { key: 'date', header: t(b.colDate), sort: (x, y) => x.at.localeCompare(y.at), render: (i) => date(i.at) },
    { key: 'order', header: t(b.colOrder), render: (i) => (i.orderId ? <Link to={`${base}/orders/${i.orderId}${search}`}>{i.orderId}</Link> : '-') },
    { key: 'net', header: t(ac.colNet), end: true, render: (i) => formatMoney(i.net, lang) },
    { key: 'vat', header: t(ac.colVat), end: true, render: (i) => formatMoney(i.vat, lang) },
    { key: 'gross', header: t(b.colTotal), end: true, sort: (x, y) => x.gross - y.gross, render: (i) => <strong>{formatMoney(i.gross, lang)}</strong> },
    { key: 'status', header: t(b.colStatus), render: (i) => <Badge tone={invoiceStatusTone(i.status)}>{t(invoiceStatusLabel(i.status))}</Badge> },
    {
      key: 'act',
      header: t(b.colActions),
      render: (i) => (
        <span className="row">
          {i.status === 'pending' && <Button size="sm" disabled={!i.canIssue} onClick={() => issue(i)}>{t(ac.invIssue)}</Button>}
          {i.status === 'pending' && !i.canIssue && <span className="muted">{t(ac.invWaitPay)}</span>}
          {i.status === 'issued' && !i.sample && <Button size="sm" variant="ghost" onClick={() => cancel(i)}>{t(ac.invCancelBtn)}</Button>}
          {(i.sample || i.status === 'cancelled') && '-'}
        </span>
      ),
    },
  ]
  return (
    <Grid>
      <Col>
        <PageHead title={t(ac.invTitle)} text={`${t(ac.invText)} (${invoices.length} ${t(b.records)}) ${t(b.sample)}`} />
      </Col>
      {!vatNow.registered && <Col><Notice tone="info">{t(st.noInvoices)}</Notice></Col>}
      <Col>
        <CardGrid size="small">
          <StatCard icon="clock" label={t(ac.invPending)} value={String(invoices.filter((i) => i.status === 'pending').length)} note={t(b.records)} />
          <StatCard icon="check" label={t(ac.invIssued)} value={String(invoices.filter((i) => i.status === 'issued').length)} note={t(b.records)} />
          <StatCard icon="close" label={t(ac.invCancelled)} value={String(invoices.filter((i) => i.status === 'cancelled').length)} note={t(b.records)} />
        </CardGrid>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 8 }}><Field label={t(ac.invSearch)} id="inv-q" type="search" placeholder={t(ac.invSearchHint)} value={q} onChange={(e) => setQ(e.target.value)} /></Col>
      <Col span={{ base: 4, sm: 8, md: 4 }}>
        <Select label={t(b.statusFilter)} value={status} onChange={(e) => setStatus(e.target.value)} options={[{ value: '', label: t(b.allStatuses) }, { value: 'pending', label: t(ac.invPending) }, { value: 'issued', label: t(ac.invIssued) }, { value: 'cancelled', label: t(ac.invCancelled) }]} />
      </Col>
      <Col>
        <Card>
          <DataTable label={t(ac.invLabel)} columns={columns} rows={rows} rowKey={(i) => i.id} empty={t(ac.invEmpty)} />
        </Card>
      </Col>
    </Grid>
  )
}
