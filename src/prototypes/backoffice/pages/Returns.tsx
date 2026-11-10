import { Link } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { useReturns, type Return } from '../../../returns/useReturns'
import { Badge, Button, Card, Col, DataTable, Grid, type DataColumn } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { PROTOTYPE_ID, useSearch } from '../data'
import { rt } from '../returnStrings'

export const reasonText = { defective: rt.reasonDefective, changed: rt.reasonChanged, wrong: rt.reasonWrong, other: rt.reasonOther }
export const methodText = { cash: rt.methodCash, transfer: rt.methodTransfer, wallet: rt.methodWallet }

export function Returns() {
  const { t, lang } = useLang()
  const search = useSearch()
  const base = `/${PROTOTYPE_ID}`
  const [returns] = useReturns()
  const rows = [...returns].sort((a, b) => b.at.localeCompare(a.at))
  const date = (iso: string) => new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
  const columns: DataColumn<Return>[] = [
    { key: 'no', header: t(rt.colNo), sort: (x, y) => x.id.localeCompare(y.id), render: (r) => <Link to={`${base}/returns/${r.id}${search}`}>{r.id}</Link> },
    { key: 'order', header: t(rt.colOrder), render: (r) => <Link to={`${base}/orders/${r.orderId}${search}`}>{r.orderId}</Link> },
    { key: 'date', header: t(rt.colDate), sort: (x, y) => x.at.localeCompare(y.at), render: (r) => date(r.at) },
    { key: 'reason', header: t(rt.colReason), render: (r) => t(reasonText[r.reason]) },
    { key: 'items', header: t(rt.colItems), end: true, render: (r) => r.lines.reduce((n, l) => n + l.qty, 0) },
    { key: 'where', header: t(rt.colWhere), render: (r) => <Badge tone={r.destination === 'restock' ? 'success' : 'warning'}>{t(r.destination === 'restock' ? rt.destRestock : rt.destDiscard)}</Badge> },
    { key: 'method', header: t(rt.colMethod), render: (r) => t(methodText[r.method]) },
    { key: 'amount', header: t(rt.colAmount), end: true, sort: (x, y) => x.amount - y.amount, render: (r) => formatMoney(r.amount, lang) },
    { key: 'cn', header: t(rt.colCredit), render: (r) => <Button size="sm" variant="secondary" to={`${base}/returns/${r.id}${search}`}>{t(rt.openCredit)}</Button> },
  ]
  return (
    <Grid>
      <Col><PageHead title={t(rt.title)} text={`${t(rt.text)} (${returns.length})`} /></Col>
      <Col><Card><DataTable label={t(rt.label)} columns={columns} rows={rows} rowKey={(r) => r.id} empty={t(rt.empty)} /></Card></Col>
    </Grid>
  )
}
