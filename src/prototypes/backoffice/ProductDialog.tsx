import { useState } from 'react'
import { useLang } from '../../i18n'
import type { Product } from '../../datasets/types'
import { useProducts } from '../../products/useProducts'
import { locationIds } from '../../stock/stock'
import { useMovements } from '../../stock/useStock'
import { Button, Field, Modal, Select } from '../../ui'
import { skuOf } from '../ecommerce/cart'
import { locationName } from './data'
import { pr } from './productStrings'

const whole = (text: string) => /^\d+$/.test(text.trim())

// Makes a product, or changes one the visitor made. The opening stock goes in as a receipt, so the stock figures and the history agree.
export function ProductDialog({ product, onClose, onSaved }: { product?: Product; onClose: () => void; onSaved: (made: boolean) => void }) {
  const { t } = useLang()
  const { seed, all, add, update } = useProducts()
  const [movements, setMovements] = useMovements()
  const [nameTh, setNameTh] = useState(product?.name.th ?? '')
  const [nameEn, setNameEn] = useState(product?.name.en ?? '')
  const [descTh, setDescTh] = useState(product?.description.th ?? '')
  const [descEn, setDescEn] = useState(product?.description.en ?? '')
  const [categoryTh, setCategoryTh] = useState(product?.category.th ?? '')
  const [brand, setBrand] = useState(product?.brand?.th ?? '')
  const [price, setPrice] = useState(product ? String(product.price) : '')
  const [sku, setSku] = useState(product ? skuOf(product) : '')
  const [unit, setUnit] = useState(product?.unit?.th ?? '')
  const [cost, setCost] = useState(product?.cost !== undefined ? String(product.cost) : '')
  const [reorder, setReorder] = useState(product?.reorderAt !== undefined ? String(product.reorderAt) : '')
  const [stock, setStock] = useState('0')
  const [place, setPlace] = useState('central')
  const [tried, setTried] = useState(false)

  const categories = [...new Map(seed.map((p) => [p.category.th, p.category])).values()]
  const priceNum = Number(price)
  const priceOk = price.trim() !== '' && Number.isFinite(priceNum) && priceNum > 0
  const skuTaken = all.some((p) => p.id !== product?.id && skuOf(p).toLowerCase() === sku.trim().toLowerCase())
  const costOk = cost.trim() === '' || (Number.isFinite(Number(cost)) && Number(cost) >= 0)
  const reorderOk = reorder.trim() === '' || whole(reorder)
  const stockOk = !!product || whole(stock)
  const nameOk = nameTh.trim() !== '' && nameEn.trim() !== ''

  const save = () => {
    setTried(true)
    const category = categories.find((c) => c.th === categoryTh)
    if (!nameOk || !category || !priceOk || !sku.trim() || skuTaken || !costOk || !reorderOk || !stockOk) return
    const unitText = unit.trim()
    const brandText = brand.trim()
    const row: Product = {
      id: product?.id ?? `m-${Date.now()}`,
      name: { th: nameTh.trim(), en: nameEn.trim() },
      description: { th: descTh.trim() || nameTh.trim(), en: descEn.trim() || nameEn.trim() },
      category,
      price: Math.round(priceNum * 100) / 100,
      brand: brandText ? { th: brandText, en: brandText } : undefined,
      custom: true,
      sku: sku.trim(),
      unit: unitText ? { th: unitText, en: unitText } : undefined,
      cost: cost.trim() === '' ? undefined : Math.round(Number(cost) * 100) / 100,
      reorderAt: reorder.trim() === '' ? undefined : Number(reorder),
    }
    if (product) update(row)
    else {
      add(row)
      const qty = Number(stock)
      if (qty > 0) setMovements([...movements, { id: `mv-${Date.now()}`, at: new Date().toISOString(), productId: row.id, loc: place, kind: 'in', qty, note: t(pr.openingNote) }])
    }
    onSaved(!product)
    onClose()
  }

  return (
    <Modal open onClose={onClose} label={t(product ? pr.editTitle : pr.add)} closeLabel={t(pr.close)}>
      <div className="stack">
        <h2>{t(product ? pr.editTitle : pr.add)}</h2>
        <Field label={t(pr.nameTh)} id="prd-name-th" value={nameTh} onChange={(e) => setNameTh(e.target.value)} hint={tried && !nameOk ? t(pr.errName) : undefined} />
        <Field label={t(pr.nameEn)} id="prd-name-en" value={nameEn} onChange={(e) => setNameEn(e.target.value)} hint={tried && !nameOk ? t(pr.errName) : undefined} />
        <Field label={t(pr.descTh)} id="prd-desc-th" value={descTh} onChange={(e) => setDescTh(e.target.value)} />
        <Field label={t(pr.descEn)} id="prd-desc-en" value={descEn} onChange={(e) => setDescEn(e.target.value)} />
        <Select label={t(pr.category)} id="prd-category" value={categoryTh} placeholder={t(pr.pickCategory)} onChange={(e) => setCategoryTh(e.target.value)} options={categories.map((c) => ({ value: c.th ?? "", label: t(c) }))} hint={tried && !categoryTh ? t(pr.errCategory) : undefined} />
        <Field label={t(pr.brand)} id="prd-brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <Field label={t(pr.price)} id="prd-price" type="number" min={0} step="0.01" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} hint={tried && !priceOk ? t(pr.errPrice) : t(pr.priceHint)} />
        <Field label={t(pr.sku)} id="prd-sku" value={sku} onChange={(e) => setSku(e.target.value)} hint={tried && !sku.trim() ? t(pr.errSku) : tried && skuTaken ? t(pr.errSkuTaken) : undefined} />
        <Field label={t(pr.unit)} id="prd-unit" value={unit} onChange={(e) => setUnit(e.target.value)} hint={t(pr.unitHint)} />
        <Field label={t(pr.cost)} id="prd-cost" type="number" min={0} step="0.01" inputMode="decimal" value={cost} onChange={(e) => setCost(e.target.value)} hint={tried && !costOk ? t(pr.errCost) : t(pr.costHint)} />
        <Field label={t(pr.reorderAt)} id="prd-reorder" type="number" min={0} inputMode="numeric" value={reorder} onChange={(e) => setReorder(e.target.value)} hint={tried && !reorderOk ? t(pr.errReorder) : t(pr.reorderHint)} />
        {!product && (
          <>
            <Field label={t(pr.openingStock)} id="prd-stock" type="number" min={0} inputMode="numeric" value={stock} onChange={(e) => setStock(e.target.value)} hint={tried && !stockOk ? t(pr.errStock) : undefined} />
            <Select label={t(pr.openingPlace)} id="prd-place" value={place} onChange={(e) => setPlace(e.target.value)} options={locationIds.map((id) => ({ value: id, label: t(locationName(id)) }))} />
          </>
        )}
        <div className="row"><Button onClick={save}>{t(pr.save)}</Button><Button variant="ghost" onClick={onClose}>{t(pr.close)}</Button></div>
      </div>
    </Modal>
  )
}
