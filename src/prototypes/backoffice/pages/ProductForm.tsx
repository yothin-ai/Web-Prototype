import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import type { Localized } from '../../../i18n'
import type { Product, ProductDetail } from '../../../datasets/types'
import { missingParts, productParts, type ProductPart } from '../../../products/completeness'
import { IMAGE_TYPES, MAX_IMAGES, resizeImage, storageUsed, STORAGE_LIMIT } from '../../../products/resizeImage'
import { useProducts } from '../../../products/useProducts'
import { locationIds } from '../../../stock/stock'
import { useMovements } from '../../../stock/useStock'
import { Badge, Breadcrumb, Button, Card, Col, Field, Grid, Notice, ProductImage, ProgressBar, Select, Textarea } from '../../../ui'
import { skuOf } from '../../ecommerce/cart'
import { PageHead } from '../PageHead'
import { locationName, PROTOTYPE_ID, useSearch } from '../data'
import { pr } from '../productStrings'

const whole = (text: string) => /^\d+$/.test(text.trim())
const lines = (text: string) => text.split('\n').map((l) => l.trim())
// Two languages written line by line become one list; line i of each language is the same item.
function pairLines(th: string, en: string): Localized[] {
  const a = lines(th)
  const b = lines(en)
  const items: Localized[] = []
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const item: Localized = {}
    if (a[i]) item.th = a[i]
    if (b[i]) item.en = b[i]
    if (item.th || item.en) items.push(item)
  }
  return items
}
const joinLang = (items: Localized[] | undefined, lang: 'th' | 'en') => (items ?? []).map((x) => x[lang] ?? '').join('\n')
const splitSpec = (line: string) => {
  const at = line.search(/[:：]/)
  return at < 0 ? { label: line.trim(), value: '' } : { label: line.slice(0, at).trim(), value: line.slice(at + 1).trim() }
}
function specRows(th: string, en: string): { label: Localized; value: Localized }[] {
  const a = lines(th).map(splitSpec)
  const b = lines(en).map(splitSpec)
  const rows: { label: Localized; value: Localized }[] = []
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const label: Localized = {}
    const value: Localized = {}
    if (a[i]?.label) label.th = a[i].label
    if (a[i]?.value) value.th = a[i].value
    if (b[i]?.label) label.en = b[i].label
    if (b[i]?.value) value.en = b[i].value
    if (label.th || label.en) rows.push({ label, value })
  }
  return rows
}
const specText = (rows: { label: Localized; value: Localized }[] | undefined, lang: 'th' | 'en') => (rows ?? []).map((r) => (r.label[lang] || r.value[lang] ? `${r.label[lang] ?? ''}: ${r.value[lang] ?? ''}` : '')).join('\n')
const text = (th: string, en: string): Localized => {
  const out: Localized = {}
  if (th.trim()) out.th = th.trim()
  if (en.trim()) out.en = en.trim()
  return out
}

const partLabel = {
  pictures: pr.partPictures,
  description: pr.partDescription,
  highlights: pr.partHighlights,
  details: pr.partDetails,
  specs: pr.partSpecs,
  install: pr.partInstall,
  warranty: pr.partWarranty,
  caution: pr.partCaution,
} satisfies Record<ProductPart, Localized>

// The page that makes a product or changes one the visitor made.
export function ProductForm() {
  const { t } = useLang()
  const { productId } = useParams()
  const { all } = useProducts()
  const editing = productId ? all.find((p) => p.id === productId && p.custom) : undefined
  const base = `/${PROTOTYPE_ID}`
  const search = useSearch()
  if (productId && !editing) {
    return (
      <Grid>
        <Col>
          <Card>
            <p>{t(pr.notFound)}</p>
            <div><Button to={`${base}/products${search}`}>{t(pr.backToList)}</Button></div>
          </Card>
        </Col>
      </Grid>
    )
  }
  return <Form key={editing?.id ?? 'new'} product={editing} />
}

function Form({ product }: { product?: Product }) {
  const { t } = useLang()
  const navigate = useNavigate()
  const { seed, all, add, update } = useProducts()
  const [movements, setMovements] = useMovements()
  const base = `/${PROTOTYPE_ID}`
  const search = useSearch()
  const d = product?.detail

  const [nameTh, setNameTh] = useState(product?.name.th ?? '')
  const [nameEn, setNameEn] = useState(product?.name.en ?? '')
  const [descTh, setDescTh] = useState(product && product.description.th !== product.name.th ? (product.description.th ?? '') : '')
  const [descEn, setDescEn] = useState(product && product.description.en !== product.name.en ? (product.description.en ?? '') : '')
  const [categoryTh, setCategoryTh] = useState(product?.category.th ?? '')
  const [brand, setBrand] = useState(product?.brand?.th ?? '')
  const [images, setImages] = useState<string[]>(product?.images ?? [])
  const [imageError, setImageError] = useState('')
  const [price, setPrice] = useState(product ? String(product.price) : '')
  const [sku, setSku] = useState(product ? skuOf(product) : '')
  const [unit, setUnit] = useState(product?.unit?.th ?? '')
  const [cost, setCost] = useState(product?.cost !== undefined ? String(product.cost) : '')
  const [reorder, setReorder] = useState(product?.reorderAt !== undefined ? String(product.reorderAt) : '')
  const [stock, setStock] = useState('0')
  const [place, setPlace] = useState('central')
  const [highlightsTh, setHighlightsTh] = useState(joinLang(d?.highlights, 'th'))
  const [highlightsEn, setHighlightsEn] = useState(joinLang(d?.highlights, 'en'))
  const [generalTh, setGeneralTh] = useState(joinLang(d?.general, 'th'))
  const [generalEn, setGeneralEn] = useState(joinLang(d?.general, 'en'))
  const [detailsTh, setDetailsTh] = useState(joinLang(d?.details, 'th'))
  const [detailsEn, setDetailsEn] = useState(joinLang(d?.details, 'en'))
  const [specsTh, setSpecsTh] = useState(specText(d?.specs, 'th'))
  const [specsEn, setSpecsEn] = useState(specText(d?.specs, 'en'))
  const [installTh, setInstallTh] = useState(d?.install.th ?? '')
  const [installEn, setInstallEn] = useState(d?.install.en ?? '')
  const [warrantyTh, setWarrantyTh] = useState(d?.warranty.th ?? '')
  const [warrantyEn, setWarrantyEn] = useState(d?.warranty.en ?? '')
  const [cautionTh, setCautionTh] = useState(d?.caution.th ?? '')
  const [cautionEn, setCautionEn] = useState(d?.caution.en ?? '')
  const [tried, setTried] = useState(false)
  const [saveError, setSaveError] = useState('')

  const categories = [...new Map(seed.map((p) => [p.category.th, p.category])).values()]
  const priceNum = Number(price)
  const priceOk = price.trim() !== '' && Number.isFinite(priceNum) && priceNum > 0
  const skuTaken = all.some((p) => p.id !== product?.id && skuOf(p).toLowerCase() === sku.trim().toLowerCase())
  const costOk = cost.trim() === '' || (Number.isFinite(Number(cost)) && Number(cost) >= 0)
  const reorderOk = reorder.trim() === '' || whole(reorder)
  const stockOk = !!product || whole(stock)
  const nameOk = nameTh.trim() !== '' && nameEn.trim() !== ''
  const category = categories.find((c) => c.th === categoryTh)

  // The product as the form stands now; used to save it and to show how complete it is.
  const draft = (): Product => {
    const hasDetail = [highlightsTh, highlightsEn, generalTh, generalEn, detailsTh, detailsEn, specsTh, specsEn, installTh, installEn, warrantyTh, warrantyEn, cautionTh, cautionEn].some((x) => x.trim())
    const unitText = unit.trim()
    const detail: ProductDetail | undefined = hasDetail
      ? {
          sku: sku.trim(),
          unit: unitText ? { th: unitText, en: unitText } : {},
          highlights: pairLines(highlightsTh, highlightsEn),
          general: pairLines(generalTh, generalEn),
          details: pairLines(detailsTh, detailsEn),
          install: text(installTh, installEn),
          warranty: text(warrantyTh, warrantyEn),
          caution: text(cautionTh, cautionEn),
          specs: specRows(specsTh, specsEn),
        }
      : undefined
    const brandText = brand.trim()
    const name = { th: nameTh.trim(), en: nameEn.trim() }
    return {
      id: product?.id ?? `m-${Date.now()}`,
      name,
      description: { th: descTh.trim() || name.th, en: descEn.trim() || name.en },
      category: category ?? { th: '', en: '' },
      price: Math.round((Number.isFinite(priceNum) ? priceNum : 0) * 100) / 100,
      brand: brandText ? { th: brandText, en: brandText } : undefined,
      custom: true,
      images: images.length ? images : undefined,
      sku: sku.trim(),
      unit: unitText ? { th: unitText, en: unitText } : undefined,
      cost: cost.trim() === '' || !Number.isFinite(Number(cost)) ? undefined : Math.round(Number(cost) * 100) / 100,
      reorderAt: reorder.trim() === '' || !whole(reorder) ? undefined : Number(reorder),
      detail,
    }
  }
  const gaps = missingParts(draft())
  const done = productParts.length - gaps.length

  const pick = async (files: FileList | null) => {
    if (!files) return
    setImageError('')
    let next = [...images]
    for (const file of Array.from(files)) {
      if (next.length >= MAX_IMAGES) {
        setImageError(t(pr.errImageMax))
        break
      }
      const result = await resizeImage(file)
      if ('problem' in result) {
        setImageError(t(result.problem === 'type' ? pr.errImageType : result.problem === 'size' ? pr.errImageSize : pr.errImageRead))
        continue
      }
      next = [...next, result.url]
    }
    setImages(next)
  }
  const makeMain = (i: number) => setImages([images[i], ...images.filter((_, j) => j !== i)])
  const removeImage = (i: number) => setImages(images.filter((_, j) => j !== i))

  const save = () => {
    setTried(true)
    setSaveError('')
    if (!nameOk || !category || !priceOk || !sku.trim() || skuTaken || !costOk || !reorderOk || !stockOk) return
    const row = draft()
    const added = images.reduce((n, x) => n + x.length, 0)
    const before = (product?.images ?? []).reduce((n, x) => n + x.length, 0)
    if (storageUsed() + added - before > STORAGE_LIMIT) {
      setSaveError(t(pr.errStorage))
      return
    }
    if (product) update(row)
    else {
      add(row)
      const qty = Number(stock)
      if (qty > 0) setMovements([...movements, { id: `mv-${Date.now()}`, at: new Date().toISOString(), productId: row.id, loc: place, kind: 'in', qty, note: t(pr.openingNote) }])
    }
    // The browser may refuse a write that is too big without saying so; check that the product really went in.
    const kept = (() => {
      try {
        return (localStorage.getItem('mps:state:backoffice') ?? '').includes(row.id)
      } catch {
        return false
      }
    })()
    if (!kept) {
      setSaveError(t(pr.errStorage))
      return
    }
    navigate(`${base}/products${search}`, { state: { notice: t(product ? pr.updated : pr.saved) } })
  }

  const title = t(product ? pr.editTitle : pr.newTitle)
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(pr.breadcrumb)} items={[{ label: t(pr.title), to: `${base}/products${search}` }, { label: title }]} />
          <PageHead title={title} text={t(pr.formText)} />
        </div>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <h3>{t(pr.complete)}</h3>
            <ProgressBar value={Math.round((done / productParts.length) * 100)} label={t(pr.complete)} />
            <span>{t(pr.completeOf)} {done}/{productParts.length} {t(pr.completeUnit)}</span>
            {gaps.length === 0 ? <Badge tone="success">{t(pr.allThere)}</Badge> : <span className="muted">{t(pr.missing)}: {gaps.map((g) => t(partLabel[g])).join(', ')}</span>}
          </div>
        </Card>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <h3>{t(pr.cardMain)}</h3>
            <Field label={t(pr.nameTh)} id="prd-name-th" value={nameTh} onChange={(e) => setNameTh(e.target.value)} hint={tried && !nameOk ? t(pr.errName) : undefined} />
            <Field label={t(pr.nameEn)} id="prd-name-en" value={nameEn} onChange={(e) => setNameEn(e.target.value)} hint={tried && !nameOk ? t(pr.errName) : undefined} />
            <Textarea label={t(pr.descTh)} id="prd-desc-th" rows={3} value={descTh} onChange={(e) => setDescTh(e.target.value)} hint={t(pr.oneLangNote)} />
            <Textarea label={t(pr.descEn)} id="prd-desc-en" rows={3} value={descEn} onChange={(e) => setDescEn(e.target.value)} hint={t(pr.oneLangNote)} />
            <Select label={t(pr.category)} id="prd-category" value={categoryTh} placeholder={t(pr.pickCategory)} onChange={(e) => setCategoryTh(e.target.value)} options={categories.map((c) => ({ value: c.th ?? '', label: t(c) }))} hint={tried && !categoryTh ? t(pr.errCategory) : undefined} />
            <Field label={t(pr.brand)} id="prd-brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
          </div>
        </Card>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <h3>{t(pr.cardPictures)}</h3>
            <p className="muted">{t(pr.picturesText)}</p>
            {images.length === 0 && <p className="muted">{t(pr.noPictures)}</p>}
            {images.map((src, i) => (
              <div key={src.slice(-40) + i} className="row">
                <div style={{ width: 'var(--space-8)' }}><ProductImage label={`${t(pr.pictureOf)} ${i + 1}`} src={src} square /></div>
                <span className="row__grow">{i === 0 ? <Badge tone="info">{t(pr.mainPicture)}</Badge> : `${t(pr.pictureOf)} ${i + 1}`}</span>
                {i > 0 && <Button size="sm" variant="secondary" onClick={() => makeMain(i)}>{t(pr.makeMain)}</Button>}
                <Button size="sm" variant="ghost" onClick={() => removeImage(i)}>{t(pr.removePicture)}</Button>
              </div>
            ))}
            {imageError && <Notice tone="error">{imageError}</Notice>}
            {images.length < MAX_IMAGES && (
              <Field label={t(pr.pickPictures)} id="prd-images" type="file" accept={IMAGE_TYPES.join(',')} multiple onChange={(e) => { void pick(e.target.files); e.target.value = '' }} />
            )}
          </div>
        </Card>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <h3>{t(pr.cardPricing)}</h3>
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
          </div>
        </Card>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <h3>{t(pr.cardShop)}</h3>
            <p className="muted">{t(pr.cardShopText)}</p>
            <Textarea label={t(pr.highlightsTh)} id="prd-hl-th" rows={4} value={highlightsTh} onChange={(e) => setHighlightsTh(e.target.value)} hint={t(pr.listHint)} />
            <Textarea label={t(pr.highlightsEn)} id="prd-hl-en" rows={4} value={highlightsEn} onChange={(e) => setHighlightsEn(e.target.value)} hint={t(pr.listHint)} />
            <Textarea label={t(pr.generalTh)} id="prd-gen-th" rows={4} value={generalTh} onChange={(e) => setGeneralTh(e.target.value)} hint={t(pr.listHint)} />
            <Textarea label={t(pr.generalEn)} id="prd-gen-en" rows={4} value={generalEn} onChange={(e) => setGeneralEn(e.target.value)} hint={t(pr.listHint)} />
            <Textarea label={t(pr.detailsTh)} id="prd-det-th" rows={4} value={detailsTh} onChange={(e) => setDetailsTh(e.target.value)} hint={t(pr.listHint)} />
            <Textarea label={t(pr.detailsEn)} id="prd-det-en" rows={4} value={detailsEn} onChange={(e) => setDetailsEn(e.target.value)} hint={t(pr.listHint)} />
            <Textarea label={t(pr.specsTh)} id="prd-spec-th" rows={4} value={specsTh} onChange={(e) => setSpecsTh(e.target.value)} hint={t(pr.specHint)} />
            <Textarea label={t(pr.specsEn)} id="prd-spec-en" rows={4} value={specsEn} onChange={(e) => setSpecsEn(e.target.value)} hint={t(pr.specHint)} />
            <Textarea label={t(pr.installTh)} id="prd-inst-th" rows={3} value={installTh} onChange={(e) => setInstallTh(e.target.value)} />
            <Textarea label={t(pr.installEn)} id="prd-inst-en" rows={3} value={installEn} onChange={(e) => setInstallEn(e.target.value)} />
            <Textarea label={t(pr.warrantyTh)} id="prd-war-th" rows={3} value={warrantyTh} onChange={(e) => setWarrantyTh(e.target.value)} />
            <Textarea label={t(pr.warrantyEn)} id="prd-war-en" rows={3} value={warrantyEn} onChange={(e) => setWarrantyEn(e.target.value)} />
            <Textarea label={t(pr.cautionTh)} id="prd-cau-th" rows={3} value={cautionTh} onChange={(e) => setCautionTh(e.target.value)} />
            <Textarea label={t(pr.cautionEn)} id="prd-cau-en" rows={3} value={cautionEn} onChange={(e) => setCautionEn(e.target.value)} />
          </div>
        </Card>
      </Col>
      <Col>
        <div className="stack">
          {saveError && <Notice tone="error">{saveError}</Notice>}
          {tried && (!nameOk || !category || !priceOk || !sku.trim() || skuTaken || !costOk || !reorderOk || !stockOk) && <Notice tone="error">{t(pr.errSummary)}</Notice>}
          <div className="row"><Button onClick={save}>{t(pr.save)}</Button><Button variant="ghost" to={`${base}/products${search}`}>{t(pr.cancel)}</Button></div>
        </div>
      </Col>
    </Grid>
  )
}

