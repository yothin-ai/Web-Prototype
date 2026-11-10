import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { monthReport, monthsBack, type LedgerEntry } from '../../../accounting/accounting'
import { Badge, Button, Card, CardGrid, Col, DataRow, DataTable, Grid, Notice, Select, StatCard, type DataColumn } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { ac, categoryLabel, kindLabel, payeeText } from '../accStrings'
import { downloadCsv } from '../csv'
import { b } from '../strings'
import { useSettings } from '../../../settings/useSettings'
import { st } from '../settingStrings'
import { PROTOTYPE_ID, useBooks, useSearch } from '../data'
import { monthLabel } from './CashBook'

export function VatReport() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const books = useBooks()
  const { vatNow } = useSettings()
  const months = monthsBack(6)
  const [month, setMonth] = useState(months[0])
  const report = monthReport(books, month)
  const inMonth = books.entries.filter((e) => e.day.startsWith(month))
  const output = inMonth.filter((e) => e.kind === 'sale' || e.kind === 'daily' || e.kind === 'refund').sort((x, y) => y.at.localeCompare(x.at))
  const input = inMonth.filter((e) => (e.kind === 'expense' || e.kind === 'purchase') && e.vat > 0).sort((x, y) => y.at.localeCompare(x.at))
  const date = (iso: string) => new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium' }).format(new Date(iso))
  const baseOf = (e: LedgerEntry) => (e.kind === 'refund' ? -(e.refundGross ?? 0) : e.kind === 'sale' || e.kind === 'daily' ? e.moneyIn : e.moneyOut) - e.vat
  const source = (e: LedgerEntry) => (e.kind === 'expense' ? `${t(categoryLabel(e.category!))} · ${payeeText(e.payee, t)}` : e.ref ? e.ref : t(kindLabel(e.kind)))
  const columns: DataColumn<LedgerEntry>[] = [
    { key: 'date', header: t(b.colDate), sort: (x, y) => x.at.localeCompare(y.at), render: (e) => date(e.at) },
    { key: 'source', header: t(ac.vatSource), render: (e) => (e.kind === 'sale' || e.kind === 'refund' ? <Link to={`${base}/orders/${e.ref}${search}`}>{e.ref}</Link> : e.kind === 'purchase' ? <Link to={`${base}/purchase-orders/${e.ref}${search}`}>{e.ref}</Link> : <span className="row">{source(e)}{e.sample && <Badge>{t(b.sampleBadge)}</Badge>}</span>) },
    { key: 'base', header: t(ac.vatBase), end: true, sort: (x, y) => baseOf(x) - baseOf(y), render: (e) => formatMoney(baseOf(e), lang) },
    { key: 'vat', header: t(ac.colVat), end: true, sort: (x, y) => x.vat - y.vat, render: (e) => <strong>{formatMoney(e.vat, lang)}</strong> },
  ]
  const payable = report.vatPayable >= 0
  const exportRows = () =>
    downloadCsv(`vat-${month}.csv`, [
      [t(ac.vatSummary), month],
      [t(ac.vatNetSales), report.netSales],
      [t(ac.vatOutput), report.outputVat],
      [t(ac.vatInput), report.inputVat],
      [t(payable ? ac.vatPayable : ac.vatCredit), Math.abs(report.vatPayable)],
      [],
      [t(ac.vatOutputList)],
      [t(b.colDate), t(ac.vatSource), t(ac.vatBase), t(ac.colVat)],
      ...output.map((e) => [new Date(e.at).toISOString(), source(e), baseOf(e), e.vat]),
      [],
      [t(ac.vatInputList)],
      [t(b.colDate), t(ac.vatSource), t(ac.vatBase), t(ac.colVat)],
      ...input.map((e) => [new Date(e.at).toISOString(), source(e), baseOf(e), e.vat]),
    ])
  return (
    <Grid>
      <Col>
        <PageHead title={t(ac.vatTitle)} text={`${t(ac.vatText)} ${t(b.sample)}`} actions={<Button variant="secondary" icon="receipt" onClick={exportRows}>{t(ac.exportCsv)}</Button>} />
      </Col>
      <Col><Notice tone="info">{t(ac.vatRateNote)} {t(ac.notAdvice)} {t(st.rateLine)} {vatNow.registered ? `${Math.round(vatNow.rate * 10000) / 100}%` : t(st.vatNone)}</Notice></Col>
      <Col span={{ base: 4, sm: 4, md: 4 }}>
        <Select label={t(ac.month)} value={month} onChange={(e) => setMonth(e.target.value)} options={months.map((m) => ({ value: m, label: monthLabel(m, lang) }))} />
      </Col>
      <Col>
        <CardGrid size="small">
          <StatCard icon="receipt" label={t(ac.vatOutput)} value={formatMoney(report.outputVat, lang)} note={monthLabel(month, lang)} />
          <StatCard icon="tag" label={t(ac.vatInput)} value={formatMoney(report.inputVat, lang)} note={monthLabel(month, lang)} />
          <StatCard icon="bank" label={t(payable ? ac.vatPayable : ac.vatCredit)} value={formatMoney(Math.abs(report.vatPayable), lang)} note={monthLabel(month, lang)} />
        </CardGrid>
      </Col>
      <Col>
        <CardGrid size="large">
          <Card>
            <div className="stack">
              <h3>{t(ac.vatSummary)}</h3>
              <DataRow label={t(ac.vatNetSales)} value={formatMoney(report.netSales, lang)} />
              <DataRow label={t(ac.vatOutput)} value={formatMoney(report.outputVat, lang)} />
              <DataRow label={t(ac.vatInput)} value={formatMoney(report.inputVat, lang)} />
              <DataRow strong label={t(payable ? ac.vatPayable : ac.vatCredit)} value={formatMoney(Math.abs(report.vatPayable), lang)} />
            </div>
          </Card>
          <Card>
            <div className="stack">
              <h3>{t(ac.vatInputList)}</h3>
              <DataTable label={t(ac.vatInputLabel)} columns={columns} rows={input} rowKey={(e) => e.id} empty={t(ac.vatNoRows)} />
            </div>
          </Card>
        </CardGrid>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <h3>{t(ac.vatOutputList)}</h3>
            <DataTable label={t(ac.vatOutputLabel)} columns={columns} rows={output} rowKey={(e) => e.id} empty={t(ac.vatNoRows)} />
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
