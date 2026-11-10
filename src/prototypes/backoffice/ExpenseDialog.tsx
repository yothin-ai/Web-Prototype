import { useState } from 'react'
import { useLang } from '../../i18n'
import { expenseCategories, isClosed, type Expense, type ExpenseCategory } from '../../accounting/accounting'
import { Button, Field, Modal, Notice, Select } from '../../ui'
import { categoryLabel, ac } from './accStrings'
import { useCloses, useExpenses, useReopened } from './data'

const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Records a cost, or changes one the visitor recorded. A closed day takes no new costs until it is reopened.
export function ExpenseDialog({ expense, onClose, onSaved }: { expense?: Expense; onClose: () => void; onSaved: () => void }) {
  const { t } = useLang()
  const [expenses, setExpenses] = useExpenses()
  const [closes] = useCloses()
  const [reopened] = useReopened()
  const [date, setDate] = useState(expense?.date ?? today())
  const [category, setCategory] = useState<ExpenseCategory>(expense?.category ?? 'other')
  const [payee, setPayee] = useState(expense?.payee ?? '')
  const [amount, setAmount] = useState(expense ? String(expense.amount) : '')
  const [vat, setVat] = useState(expense ? (expense.vat ? 'yes' : 'no') : 'no')
  const [note, setNote] = useState(expense?.note ?? '')
  const [tried, setTried] = useState(false)
  const value = Number(amount)
  const amountOk = amount.trim() !== '' && Number.isFinite(value) && value > 0
  const closed = !!date && isClosed(date, closes, reopened)
  const save = () => {
    setTried(true)
    if (!date || !payee.trim() || !amountOk || closed) return
    const row: Expense = { id: expense?.id ?? `m-${Date.now()}`, date, category, payee: payee.trim(), amount: Math.round(value * 100) / 100, vat: vat === 'yes', note: note.trim() || undefined }
    setExpenses(expense ? expenses.map((e) => (e.id === expense.id ? row : e)) : [...expenses, row])
    onSaved()
    onClose()
  }
  return (
    <Modal open onClose={onClose} label={t(expense ? ac.expEditTitle : ac.expAdd)} closeLabel={t(ac.expClose)}>
      <div className="stack">
        <h2>{t(expense ? ac.expEditTitle : ac.expAdd)}</h2>
        <Field label={t(ac.expDate)} id="exp-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} hint={tried && !date ? t(ac.expErrDate) : undefined} />
        {closed && <Notice tone="error">{t(ac.expErrClosed)}</Notice>}
        <Select label={t(ac.expCategory)} id="exp-category" value={category} onChange={(e) => setCategory(e.target.value as ExpenseCategory)} options={expenseCategories.map((c) => ({ value: c, label: t(categoryLabel(c)) }))} />
        <Field label={t(ac.expPayee)} id="exp-payee" value={payee} onChange={(e) => setPayee(e.target.value)} hint={tried && !payee.trim() ? t(ac.expErrPayee) : undefined} />
        <Field label={t(ac.expAmount)} id="exp-amount" type="number" min={0} step="0.01" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} hint={tried && !amountOk ? t(ac.expErrAmount) : undefined} />
        <Select label={t(ac.expVat)} id="exp-vat" value={vat} onChange={(e) => setVat(e.target.value)} options={[{ value: 'yes', label: t(ac.expVatYes) }, { value: 'no', label: t(ac.expVatNo) }]} />
        <Field label={t(ac.expNote)} id="exp-note" value={note} onChange={(e) => setNote(e.target.value)} />
        <div className="row"><Button onClick={save}>{t(ac.expSave)}</Button><Button variant="ghost" onClick={onClose}>{t(ac.expClose)}</Button></div>
      </div>
    </Modal>
  )
}
