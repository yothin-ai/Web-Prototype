import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { monthReport, monthsBack, type Expense, type LedgerEntry } from '../../../accounting/accounting'
import { Badge, Button, Card, CardGrid, Col, DataTable, DropdownMenu, Grid, Notice, Select, StatCard, type DataColumn } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { ExpenseDialog } from '../ExpenseDialog'
import { PageHead } from '../PageHead'
import { mn } from '../menuStrings'
import { usePaging } from '../paging'
import { ac, categoryLabel, channelLabel, kindLabel, payeeText } from '../accStrings'
import { downloadCsv } from '../csv'
import { b } from '../strings'
import { PROTOTYPE_ID, useBooks, useExpenses, useSearch } from '../data'

export const monthLabel = (month: string, lang: string) => new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { month: 'long', year: 'numeric' }).format(new Date(`${month}-15T12:00:00`))

export function CashBook() {
  const { t, lang } = useLang()
  const paging = usePaging()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const books = useBooks()
  const [expenses, setExpenses] = useExpenses()
  const months = monthsBack(2)
  const [month, setMonth] = useState(months[0])
  const [kind, setKind] = useState('')
  const [editing, setEditing] = useState<Expense | 'new' | null>(null)
  const [saved, setSaved] = useState(false)
  const report = monthReport(books, month)
  const rows = books.entries.filter((e) => e.day.startsWith(month) && (!kind || e.kind === kind))
  const date = (iso: string) => new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium' }).format(new Date(iso))
  const describe = (e: LedgerEntry) => (e.kind === 'expense' ? `${t(categoryLabel(e.category!))} · ${payeeText(e.payee, t)}` : e.kind === 'sale' || e.kind === 'purchase' || e.kind === 'refund' ? e.ref! : t(kindLabel(e.kind)))
  const columns: DataColumn<LedgerEntry>[] = [
    { key: 'date', header: t(b.colDate), sort: (x, y) => x.at.localeCompare(y.at), render: (e) => date(e.at) },
    { key: 'kind', header: t(b.colType), render: (e) => <span className="row"><Badge tone={e.moneyIn > 0 ? 'success' : undefined}>{t(kindLabel(e.kind))}</Badge>{e.sample && <Badge>{t(b.sampleBadge)}</Badge>}</span> },
    { key: 'desc', wrap: true, header: t(ac.colDesc), render: (e) => (e.kind === 'sale' || e.kind === 'refund' ? <Link to={`${base}/orders/${e.ref}${search}`}>{e.ref}</Link> : e.kind === 'purchase' ? <Link to={`${base}/purchase-orders/${e.ref}${search}`}>{e.ref}</Link> : describe(e)) },
    { key: 'channel', header: t(ac.colChannel), render: (e) => (e.channel && (e.kind === 'sale' || e.kind === 'refund') ? t(channelLabel(e.channel)) : '-') },
    { key: 'in', header: t(ac.colIn), end: true, sort: (x, y) => x.moneyIn - y.moneyIn, render: (e) => (e.moneyIn ? formatMoney(e.moneyIn, lang) : '-') },
    { key: 'out', header: t(ac.colOut), end: true, sort: (x, y) => x.moneyOut - y.moneyOut, render: (e) => (e.moneyOut ? formatMoney(e.moneyOut, lang) : '-') },
    { key: 'vat', header: t(ac.colVat), end: true, render: (e) => (e.vat ? formatMoney(e.vat, lang) : '-') },
    {
      key: 'act', pin: true,
      header: t(b.colActions),
      end: true,
      render: (e) => {
        const own = e.kind === 'expense' && !e.sample ? expenses.find((x) => x.id === e.expenseId) : undefined
        return own ? (
          <DropdownMenu
            variant="actions"
            label={`${t(mn.manage)} ${payeeText(own.payee, t)}`}
            items={[
              { id: 'edit', label: t(ac.expEdit), icon: 'edit', onSelect: () => setEditing(own) },
              { id: 'delete', label: t(ac.expDelete), icon: 'trash', danger: true, separator: true, onSelect: () => setExpenses(expenses.filter((x) => x.id !== own.id)) },
            ]}
          />
        ) : '-'
      },
    },
  ]
  const exportRows = () =>
    downloadCsv(`cash-book-${month}.csv`, [
      [t(b.colDate), t(b.colType), t(ac.colDesc), t(ac.colChannel), t(ac.colIn), t(ac.colOut), t(ac.colVat)],
      ...[...rows].sort((x, y) => x.at.localeCompare(y.at)).map((e) => [new Date(e.at).toISOString(), t(kindLabel(e.kind)), describe(e), e.channel && e.kind === 'sale' ? t(channelLabel(e.channel)) : '', e.moneyIn, e.moneyOut, e.vat]),
    ])
  return (
    <Grid>
      <Col>
        <PageHead title={t(ac.cashBookTitle)} text={`${t(ac.cashBookText)} (${rows.length} ${t(b.records)}) ${t(b.sample)}`} actions={<><Button variant="secondary" icon="receipt" onClick={exportRows}>{t(ac.exportCsv)}</Button><Button icon="plus" onClick={() => { setSaved(false); setEditing('new') }}>{t(ac.expAdd)}</Button></>} />
      </Col>
      <Col>
        <CardGrid size="small">
          <StatCard icon="plus" label={t(ac.moneyIn)} value={formatMoney(report.moneyIn, lang)} note={monthLabel(month, lang)} />
          <StatCard icon="minus" label={t(ac.moneyOut)} value={formatMoney(report.moneyOut, lang)} note={monthLabel(month, lang)} />
          <StatCard icon="cash" label={t(ac.moneyNet)} value={formatMoney(report.moneyIn - report.moneyOut, lang)} note={monthLabel(month, lang)} />
          <StatCard icon="clock" label={t(ac.receivable)} value={formatMoney(report.receivable, lang)} note={t(ac.receivableNote)} />
        </CardGrid>
      </Col>
      <Col span={{ base: 4, sm: 4, md: 4 }}>
        <Select label={t(ac.month)} value={month} onChange={(e) => setMonth(e.target.value)} options={months.map((m) => ({ value: m, label: monthLabel(m, lang) }))} />
      </Col>
      <Col span={{ base: 4, sm: 4, md: 4 }}>
        <Select label={t(b.typeFilter)} value={kind} onChange={(e) => setKind(e.target.value)} options={[{ value: '', label: t(b.allTypes) }, { value: 'sale', label: t(ac.kindSale) }, { value: 'daily', label: t(ac.kindDaily) }, { value: 'expense', label: t(ac.kindExpense) }, { value: 'purchase', label: t(ac.kindPurchase) }]} />
      </Col>
      {saved && <Col><Notice tone="success">{t(ac.expSaved)}</Notice></Col>}
      <Col>
        <Card>
          <div className="stack">
            <DataTable label={t(ac.cashLabel)} columns={columns} rows={rows} rowKey={(e) => e.id} empty={t(ac.cashEmpty)} {...paging()} />
            <span className="muted">{t(ac.expOwnOnly)}. {t(ac.notAdvice)}</span>
          </div>
        </Card>
      </Col>
      {editing && <ExpenseDialog expense={editing === 'new' ? undefined : editing} onClose={() => setEditing(null)} onSaved={() => setSaved(true)} />}
    </Grid>
  )
}
