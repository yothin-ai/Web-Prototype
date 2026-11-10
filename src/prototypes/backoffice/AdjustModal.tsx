import { useState } from 'react'
import { useLang } from '../../i18n'
import type { Product } from '../../datasets/types'
import { locationIds } from '../../stock/stock'
import { useMovements, useStock } from '../../stock/useStock'
import { Button, DataRow, Field, Modal, Notice, Select } from '../../ui'
import { locationName } from './data'
import { b } from './strings'

// Corrects a place's figure after a count: the difference is recorded as a movement, so the history keeps it.
export function AdjustModal({ product, open, onClose, initialLoc, onSaved }: { product: Product; open: boolean; onClose: () => void; initialLoc: string; onSaved: () => void }) {
  const { t } = useLang()
  const book = useStock()
  const [movements, setMovements] = useMovements()
  const [loc, setLoc] = useState(initialLoc)
  const [counted, setCounted] = useState('')
  const [note, setNote] = useState('')
  const [tried, setTried] = useState(false)
  const current = book.cell(product.id, loc).onHand
  const number = counted.trim() === '' ? NaN : Number(counted)
  const valid = Number.isInteger(number) && number >= 0
  const diff = valid ? number - current : 0
  const close = () => {
    setCounted('')
    setNote('')
    setTried(false)
    onClose()
  }
  const save = () => {
    setTried(true)
    if (!valid || diff === 0) return
    setMovements([...movements, { id: `m-${Date.now()}`, at: new Date().toISOString(), productId: product.id, loc, kind: 'adjust', qty: diff, note: note.trim() || t(b.countNote) }])
    close()
    onSaved()
  }
  return (
    <Modal open={open} onClose={close} label={t(b.adjustTitle)} closeLabel={t(b.adjustClose)}>
      <div className="stack">
        <h2>{t(b.adjustTitle)}</h2>
        <strong>{t(product.name)}</strong>
        <Select label={t(b.place)} value={loc} onChange={(e) => { setLoc(e.target.value); setCounted('') }} options={locationIds.map((id) => ({ value: id, label: t(locationName(id)) }))} />
        <DataRow label={t(b.inSystem)} value={`${current} ${t(b.pieces)}`} />
        <Field label={t(b.counted)} id="adj-counted" type="number" min={0} inputMode="numeric" value={counted} onChange={(e) => setCounted(e.target.value)} hint={tried && !valid ? t(b.adjustBad) : undefined} />
        {valid && <DataRow label={t(b.difference)} value={<strong>{diff > 0 ? `+${diff}` : diff}</strong>} />}
        <Field label={t(b.adjustNote)} id="adj-note" placeholder={t(b.adjustNoteHint)} value={note} onChange={(e) => setNote(e.target.value)} />
        {tried && valid && diff === 0 && <Notice tone="info">{t(b.adjustNone)}</Notice>}
        <div className="row"><Button onClick={save}>{t(b.adjustSave)}</Button><Button variant="ghost" onClick={close}>{t(b.adjustClose)}</Button></div>
      </div>
    </Modal>
  )
}
