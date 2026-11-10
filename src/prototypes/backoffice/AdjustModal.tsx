import { useState } from 'react'
import { useProducts } from '../../products/useProducts'
import { useLang } from '../../i18n'
import type { Product } from '../../datasets/types'
import { adjustmentReasons, locationIds, type AdjustmentReason } from '../../stock/stock'
import { useMovements, useStock } from '../../stock/useStock'
import { Button, DataRow, Field, Modal, Notice, Select } from '../../ui'
import { locationName } from './data'
import { b } from './strings'

export const reasonLabel = (r: AdjustmentReason) => ({ count: b.reasonCount, damaged: b.reasonDamaged, expired: b.reasonExpired, lost: b.reasonLost, other: b.reasonOther })[r]
export const reasonTone = (r: AdjustmentReason) => (r === 'damaged' ? 'danger' : r === 'expired' || r === 'lost' ? 'warning' : r === 'count' ? 'info' : undefined)

// Corrects a place's figure: the difference is recorded as a movement with its reason, so the history keeps it.
// Without a `product` the dialog first asks which one.
export function AdjustModal({ product, open, onClose, initialLoc, onSaved }: { product?: Product; open: boolean; onClose: () => void; initialLoc: string; onSaved: () => void }) {
  const { t } = useLang()
  const products = useProducts().all
  const book = useStock()
  const [movements, setMovements] = useMovements()
  const [pickedId, setPickedId] = useState('')
  const [loc, setLoc] = useState(initialLoc)
  const [reason, setReason] = useState<AdjustmentReason>('count')
  const [counted, setCounted] = useState('')
  const [note, setNote] = useState('')
  const [tried, setTried] = useState(false)
  const chosen = product ?? products.find((p) => p.id === pickedId)
  const current = chosen ? book.cell(chosen.id, loc).onHand : 0
  const number = counted.trim() === '' ? NaN : Number(counted)
  const valid = Number.isInteger(number) && number >= 0
  const diff = valid ? number - current : 0
  const close = () => {
    setCounted('')
    setNote('')
    setTried(false)
    setPickedId('')
    onClose()
  }
  const save = () => {
    setTried(true)
    if (!chosen || !valid || diff === 0) return
    setMovements([...movements, { id: `m-${Date.now()}`, at: new Date().toISOString(), productId: chosen.id, loc, kind: 'adjust', qty: diff, reason, note: note.trim() || undefined }])
    close()
    onSaved()
  }
  return (
    <Modal open={open} onClose={close} label={t(b.adjustTitle)} closeLabel={t(b.adjustClose)}>
      <div className="stack">
        <h2>{t(b.adjustTitle)}</h2>
        {product ? <strong>{t(product.name)}</strong> : <Select label={t(b.product)} id="adj-product" value={pickedId} placeholder={t(b.adjProductPick)} onChange={(e) => setPickedId(e.target.value)} hint={tried && !chosen ? t(b.adjErrProduct) : undefined} options={products.map((p) => ({ value: p.id, label: t(p.name) }))} />}
        <Select label={t(b.place)} id="adj-place" value={loc} onChange={(e) => { setLoc(e.target.value); setCounted('') }} options={locationIds.map((id) => ({ value: id, label: t(locationName(id)) }))} />
        <Select label={t(b.reasonFilter)} id="adj-reason" value={reason} onChange={(e) => setReason(e.target.value as AdjustmentReason)} options={adjustmentReasons.map((r) => ({ value: r, label: t(reasonLabel(r)) }))} />
        <DataRow label={t(b.inSystem)} value={`${current} ${t(b.pieces)}`} />
        <Field label={t(b.counted)} id="adj-counted" type="number" min={0} inputMode="numeric" value={counted} onChange={(e) => setCounted(e.target.value)} hint={tried && !valid ? t(b.adjustBad) : undefined} />
        {valid && <DataRow label={t(b.difference)} value={<strong>{diff > 0 ? `+${diff}` : diff}</strong>} />}
        <Field label={t(b.adjustNote)} id="adj-note" placeholder={t(b.adjustNoteHint)} value={note} onChange={(e) => setNote(e.target.value)} />
        {tried && chosen && valid && diff === 0 && <Notice tone="info">{t(b.adjustNone)}</Notice>}
        <div className="row"><Button onClick={save}>{t(b.adjustSave)}</Button><Button variant="ghost" onClick={close}>{t(b.adjustClose)}</Button></div>
      </div>
    </Modal>
  )
}
