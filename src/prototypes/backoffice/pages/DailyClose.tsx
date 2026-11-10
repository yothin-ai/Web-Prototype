import { useState } from 'react'
import { useProducts } from '../../../products/useProducts'
import { useLang } from '../../../i18n'
import { CLOSE_WINDOW, channels, dayKey, dayReport, isClosed, sampleCloseCounted, sampleCloseDays, type Close } from '../../../accounting/accounting'
import { Badge, Button, Card, CardGrid, Col, DataRow, DataTable, DropdownMenu, Field, Grid, Modal, Notice, StatCard, type DataColumn } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { mn } from '../menuStrings'
import { ac, channelLabel } from '../accStrings'
import { b } from '../strings'
import { useBooks, useCloses, useReopened } from '../data'

type DayRow = { day: string; report: ReturnType<typeof dayReport>; closed: boolean; counted?: number; sample: boolean }

export function DailyClose() {
  const { t, lang } = useLang()
  const products = useProducts().all
  const books = useBooks()
  const [closes, setCloses] = useCloses()
  const [reopened, setReopened] = useReopened()
  const [closing, setClosing] = useState<DayRow | null>(null)
  const [message, setMessage] = useState('')
  const now = Date.now()
  const sampleDays = sampleCloseDays(now)
  const rows: DayRow[] = Array.from({ length: CLOSE_WINDOW }, (_, i) => {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const day = dayKey(d)
    const report = dayReport(books, products, day, now)
    const own = closes.find((c) => c.day === day)
    const sample = sampleDays.includes(day)
    const closed = isClosed(day, closes, reopened, now)
    return { day, report, closed, sample: !own && sample && closed, counted: own ? own.counted : sample && closed ? sampleCloseCounted(day, report.expected) : undefined }
  })
  const date = (day: string) => new Intl.DateTimeFormat(lang === 'th' ? 'th-TH' : 'en-GB', { dateStyle: 'medium' }).format(new Date(`${day}T12:00:00`))
  const money = (n: number) => formatMoney(Math.round(n * 100) / 100, lang)
  const reopen = (row: DayRow) => {
    setCloses(closes.filter((c) => c.day !== row.day))
    if (sampleDays.includes(row.day)) setReopened([...reopened.filter((d) => d !== row.day), row.day])
    setMessage(t(ac.reopenedMessage))
  }
  const columns: DataColumn<DayRow>[] = [
    { key: 'day', header: t(b.colDate), render: (r) => <span className="row">{date(r.day)}{r.sample && <Badge>{t(b.sampleBadge)}</Badge>}</span> },
    { key: 'received', header: t(ac.colSales), end: true, render: (r) => money(r.report.received) },
    { key: 'costs', header: t(ac.colCosts), end: true, render: (r) => money(r.report.costs) },
    { key: 'expected', header: t(ac.colExpected), end: true, render: (r) => money(r.report.expected) },
    { key: 'counted', header: t(ac.colCounted), end: true, render: (r) => (r.counted === undefined ? '-' : money(r.counted)) },
    { key: 'diff', header: t(ac.colDiff), end: true, render: (r) => (r.counted === undefined ? '-' : <strong>{r.counted - r.report.expected > 0 ? '+' : ''}{money(r.counted - r.report.expected)}</strong>) },
    { key: 'status', header: t(b.colStatus), render: (r) => <Badge tone={r.closed ? 'success' : 'warning'}>{t(r.closed ? ac.closeStatusClosed : ac.closeStatusOpen)}</Badge> },
    { key: 'act', pin: true, header: t(b.colActions), end: true, render: (r) => <DropdownMenu variant="actions" label={`${t(mn.manage)} ${date(r.day)}`} items={[r.closed ? { id: 'reopen', label: t(ac.reopenAction), icon: 'returns', onSelect: () => reopen(r) } : { id: 'close', label: t(ac.closeAction), icon: 'check', onSelect: () => { setMessage(''); setClosing(r) } }]} /> },
  ]
  return (
    <Grid>
      <Col>
        <PageHead title={t(ac.closeTitle)} text={`${t(ac.closeText)} ${t(b.sample)}`} />
      </Col>
      <Col>
        <CardGrid size="small">
          <StatCard icon="check" label={t(ac.closedCount)} value={String(rows.filter((r) => r.closed).length)} note={`/ ${CLOSE_WINDOW}`} />
          <StatCard icon="clock" label={t(ac.openCount)} value={String(rows.filter((r) => !r.closed).length)} note={`/ ${CLOSE_WINDOW}`} />
        </CardGrid>
      </Col>
      {message && <Col><Notice tone="success">{message}</Notice></Col>}
      <Col>
        <Card>
          <div className="stack">
            <DataTable label={t(ac.closeLabel)} columns={columns} rows={rows} rowKey={(r) => r.day} empty={t(ac.closeEmpty)} />
            <span className="muted">{t(ac.closeExpectedHelp)}. {t(ac.notAdvice)}</span>
          </div>
        </Card>
      </Col>
      {closing && (
        <CloseDialog
          row={closing}
          money={money}
          date={date(closing.day)}
          onClose={() => setClosing(null)}
          onSave={(counted, note) => {
            const record: Close = { day: closing.day, counted, expected: closing.report.expected, note, closedAt: new Date().toISOString() }
            setCloses([...closes.filter((c) => c.day !== closing.day), record])
            setReopened(reopened.filter((d) => d !== closing.day))
            setClosing(null)
            setMessage(t(ac.closedMessage))
          }}
        />
      )}
    </Grid>
  )
}

function CloseDialog({ row, money, date, onClose, onSave }: { row: DayRow; money: (n: number) => string; date: string; onClose: () => void; onSave: (counted: number, note?: string) => void }) {
  const { t } = useLang()
  const [counted, setCounted] = useState('')
  const [note, setNote] = useState('')
  const [tried, setTried] = useState(false)
  const value = Number(counted)
  const ok = counted.trim() !== '' && Number.isFinite(value) && value >= 0
  const diff = ok ? value - row.report.expected : 0
  return (
    <Modal open onClose={onClose} label={t(ac.closeDialogTitle)} closeLabel={t(ac.closeCancel)}>
      <div className="stack">
        <h2>{t(ac.closeDialogTitle)}</h2>
        <strong>{date}</strong>
        <span className="muted">{t(ac.closeByChannel)}</span>
        {channels.map((c) => <DataRow key={c} muted label={t(channelLabel(c))} value={money(row.report.byChannel[c])} />)}
        <DataRow label={t(ac.colCosts)} value={money(row.report.costs)} />
        <DataRow strong label={t(ac.colExpected)} value={money(row.report.expected)} />
        <Field label={t(ac.closeCountedField)} id="close-counted" type="number" min={0} step="0.01" inputMode="decimal" value={counted} onChange={(e) => setCounted(e.target.value)} hint={tried && !ok ? t(ac.closeErr) : undefined} />
        {ok && <DataRow label={t(ac.colDiff)} value={<strong>{diff > 0 ? '+' : ''}{money(diff)}</strong>} />}
        <Field label={t(ac.closeNote)} id="close-note" value={note} onChange={(e) => setNote(e.target.value)} />
        <div className="row">
          <Button onClick={() => { setTried(true); if (ok) onSave(Math.round(value * 100) / 100, note.trim() || undefined) }}>{t(ac.closeSave)}</Button>
          <Button variant="ghost" onClick={onClose}>{t(ac.closeCancel)}</Button>
        </div>
      </div>
    </Modal>
  )
}
