import { useState } from 'react'
import { useLang } from '../../../i18n'
import { expenseCategories, monthReport, monthsBack, type ExpenseCategory } from '../../../accounting/accounting'
import { BarChart, Card, Col, DataRow, Grid, Notice, Select, StatCard } from '../../../ui'
import { formatMoney } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { ac, categoryLabel } from '../accStrings'
import { b } from '../strings'
import { useBooks } from '../data'
import { monthLabel } from './CashBook'

export function ProfitLoss() {
  const { t, lang } = useLang()
  const books = useBooks()
  const months = monthsBack(6)
  const [month, setMonth] = useState(months[0])
  const report = monthReport(books, month)
  const locale = lang === 'th' ? 'th-TH' : 'en-US'
  const compact = new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: 1 })
  const short = (m: string) => new Intl.DateTimeFormat(locale, { month: 'short' }).format(new Date(`${m}-15T12:00:00`))
  const byCategory = (c: ExpenseCategory) => books.entries.filter((e) => e.kind === 'expense' && e.category === c && e.day.startsWith(month)).reduce((n, e) => n + e.moneyOut - e.vat, 0)
  const margin = report.netSales > 0 ? Math.round((report.netProfit / report.netSales) * 1000) / 10 : 0
  const money = (n: number) => formatMoney(Math.round(n * 100) / 100, lang)
  return (
    <Grid>
      <Col>
        <PageHead title={t(ac.profitTitle)} text={`${t(ac.profitText)} ${t(b.sample)}`} />
      </Col>
      <Col span={{ base: 4, sm: 4, md: 4 }}>
        <Select label={t(ac.month)} value={month} onChange={(e) => setMonth(e.target.value)} options={months.map((m) => ({ value: m, label: monthLabel(m, lang) }))} />
      </Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}><StatCard icon="cash" label={t(ac.plRevenue)} value={money(report.netSales)} note={monthLabel(month, lang)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}><StatCard icon="package" label={t(ac.plGross)} value={money(report.grossProfit)} note={monthLabel(month, lang)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}><StatCard icon="minus" label={t(ac.plOpex)} value={money(report.opex)} note={monthLabel(month, lang)} /></Col>
      <Col span={{ base: 4, sm: 4, md: 3 }}><StatCard icon="bank" label={t(ac.plNet)} value={money(report.netProfit)} note={`${t(ac.plMargin)} ${margin}%`} /></Col>
      <Col span={{ base: 4, sm: 8, md: 6 }}>
        <Card>
          <div className="stack">
            <h3>{t(ac.plStatement)} · {monthLabel(month, lang)}</h3>
            <DataRow label={t(ac.plRevenue)} value={money(report.netSales)} />
            <DataRow label={t(ac.plCogs)} value={`-${money(report.cogs)}`} />
            <DataRow strong label={t(ac.plGross)} value={money(report.grossProfit)} />
            {expenseCategories.map((c) => <DataRow key={c} muted label={t(categoryLabel(c))} value={`-${money(byCategory(c))}`} />)}
            <DataRow label={t(ac.plOpex)} value={`-${money(report.opex)}`} />
            <DataRow strong label={t(ac.plNet)} value={money(report.netProfit)} />
            <span className="muted">{t(ac.plCostNote)} {t(ac.notAdvice)}</span>
          </div>
        </Card>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 6 }}>
        <Card>
          <div className="stack">
            <h3>{t(ac.plChart)}</h3>
            <BarChart label={t(ac.plChartLabel)} items={[...months].reverse().map((m) => ({ label: short(m), value: Math.max(0, monthReport(books, m).netSales), text: compact.format(monthReport(books, m).netSales) }))} />
            {report.netProfit < 0 && <Notice tone="info">{t(ac.plNet)}: {money(report.netProfit)}</Notice>}
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
