import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import type { Coupon } from '../../../datasets/types'
import { useCoupons } from '../../../promotions/useCoupons'
import { Breadcrumb, Button, Card, Col, Field, Grid, Select, Switch, Textarea } from '../../../ui'
import { PageHead } from '../PageHead'
import { PROTOTYPE_ID, useSearch } from '../data'
import { pm } from '../promoStrings'

export function CouponForm() {
  const { t } = useLang()
  const { couponId } = useParams()
  const { all } = useCoupons()
  const base = `/${PROTOTYPE_ID}`
  const search = useSearch()
  const coupon = couponId ? all.find((c) => c.id === couponId) : undefined
  if (couponId && !coupon) {
    return <Grid><Col><Card><p>{t(pm.cNotFound)}</p><div><Button to={`${base}/promotions/coupons${search}`}>{t(pm.backToCoupons)}</Button></div></Card></Col></Grid>
  }
  return <Form key={coupon?.id ?? 'new'} coupon={coupon} />
}

const dayInput = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

function Form({ coupon }: { coupon?: Coupon }) {
  const { t } = useLang()
  const navigate = useNavigate()
  const { add, update, restore, edited } = useCoupons()
  const base = `/${PROTOTYPE_ID}`
  const search = useSearch()
  const today = new Date()
  const later = new Date(today.getTime() + 30 * 86_400_000)
  const [titleTh, setTitleTh] = useState(coupon?.title.th ?? '')
  const [titleEn, setTitleEn] = useState(coupon?.title.en ?? '')
  const [detailTh, setDetailTh] = useState(coupon?.detail.th ?? '')
  const [detailEn, setDetailEn] = useState(coupon?.detail.en ?? '')
  const [kind, setKind] = useState<Coupon['kind']>(coupon?.kind ?? 'amount')
  const [value, setValue] = useState(coupon ? String(coupon.value) : '')
  const [cap, setCap] = useState(coupon?.cap !== undefined ? String(coupon.cap) : '')
  const [min, setMin] = useState(coupon ? String(coupon.minSpend) : '0')
  const [channel, setChannel] = useState<Coupon['channel']>(coupon?.channel ?? 'online')
  const [starts, setStarts] = useState(coupon?.starts ?? dayInput(today))
  const [expires, setExpires] = useState(coupon?.expires ?? dayInput(later))
  const [member, setMember] = useState(!!coupon?.memberOnly)
  const [limit, setLimit] = useState(coupon?.limit !== undefined ? String(coupon.limit) : '')
  const [redeem, setRedeem] = useState(coupon?.redeemCost !== undefined ? String(coupon.redeemCost) : '')
  const [tried, setTried] = useState(false)

  const num = (x: string) => (x.trim() === '' ? NaN : Number(x))
  const titleOk = titleTh.trim() !== '' && titleEn.trim() !== ''
  const valueNum = num(value)
  const valueOk = kind === 'freeship' || (Number.isFinite(valueNum) && valueNum > 0 && (kind !== 'percent' || valueNum <= 100))
  const capOk = kind !== 'percent' || cap.trim() === '' || (Number.isFinite(num(cap)) && num(cap) >= 0)
  const minOk = Number.isFinite(num(min)) && num(min) >= 0
  const datesOk = !!starts && !!expires && expires >= starts
  const limitOk = limit.trim() === '' || /^[1-9]\d*$/.test(limit.trim())
  const redeemOk = redeem.trim() === '' || /^[1-9]\d*$/.test(redeem.trim())
  const ok = titleOk && valueOk && capOk && minOk && datesOk && limitOk && redeemOk

  const save = () => {
    setTried(true)
    if (!ok) return
    const row: Coupon = {
      id: coupon?.id ?? `cm-${Date.now()}`,
      title: { th: titleTh.trim(), en: titleEn.trim() },
      detail: { th: detailTh.trim() || titleTh.trim(), en: detailEn.trim() || titleEn.trim() },
      kind,
      value: kind === 'freeship' ? 0 : valueNum,
      cap: kind === 'percent' && cap.trim() !== '' ? num(cap) : undefined,
      minSpend: num(min),
      channel,
      starts,
      expires,
      memberOnly: member || undefined,
      limit: limit.trim() === '' ? undefined : Number(limit),
      redeemCost: redeem.trim() === '' ? undefined : Number(redeem),
    }
    if (coupon) {
      const { id: _id, ...patch } = row
      void _id
      update(coupon.id, { ...patch, memberOnly: member || undefined })
    } else add({ ...row, custom: true })
    navigate(`${base}/promotions/coupons${search}`, { state: { notice: t(pm.cSaved) } })
  }
  const title = t(coupon ? pm.cEditTitle : pm.cNewTitle)
  const err = (bad: boolean, message: string) => (tried && bad ? message : undefined)
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(pm.breadcrumb)} items={[{ label: t(pm.cTitle), to: `${base}/promotions/coupons${search}` }, { label: title }]} />
          <PageHead title={title} text={t(pm.cFormText)} />
        </div>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <Field label={t(pm.fTitleTh)} id="cp-title-th" value={titleTh} onChange={(e) => setTitleTh(e.target.value)} hint={err(!titleOk, t(pm.eTitle))} />
            <Field label={t(pm.fTitleEn)} id="cp-title-en" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} hint={err(!titleOk, t(pm.eTitle))} />
            <Textarea label={t(pm.fDetailTh)} id="cp-detail-th" rows={2} value={detailTh} onChange={(e) => setDetailTh(e.target.value)} />
            <Textarea label={t(pm.fDetailEn)} id="cp-detail-en" rows={2} value={detailEn} onChange={(e) => setDetailEn(e.target.value)} />
            <Select label={t(pm.fKind)} id="cp-kind" value={kind} onChange={(e) => setKind(e.target.value as Coupon['kind'])} options={[{ value: 'amount', label: t(pm.kAmount) }, { value: 'percent', label: t(pm.kPercent) }, { value: 'freeship', label: t(pm.kFree) }]} />
            {kind !== 'freeship' && <Field label={t(kind === 'amount' ? pm.fValueBaht : pm.fValuePct)} id="cp-value" type="number" min={0} step="0.01" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} hint={err(!valueOk, t(kind === 'percent' ? pm.ePercent : pm.eValue))} />}
            {kind === 'percent' && <Field label={t(pm.fCap)} id="cp-cap" type="number" min={0} inputMode="decimal" value={cap} onChange={(e) => setCap(e.target.value)} hint={err(!capOk, t(pm.eNum))} />}
            <Field label={t(pm.fMin)} id="cp-min" type="number" min={0} inputMode="decimal" value={min} onChange={(e) => setMin(e.target.value)} hint={err(!minOk, t(pm.eNum))} />
            <Select label={t(pm.fChannel)} id="cp-channel" value={channel} onChange={(e) => setChannel(e.target.value as Coupon['channel'])} options={[{ value: 'online', label: t(pm.online) }, { value: 'store', label: t(pm.store) }]} />
            <Field label={t(pm.fStarts)} id="cp-starts" type="date" value={starts} onChange={(e) => setStarts(e.target.value)} />
            <Field label={t(pm.fExpires)} id="cp-expires" type="date" value={expires} onChange={(e) => setExpires(e.target.value)} hint={err(!datesOk, t(pm.eDates))} />
            <Switch checked={member} onChange={setMember} label={t(pm.fMember)} />
            <Field label={t(pm.fLimit)} id="cp-limit" type="number" min={1} inputMode="numeric" value={limit} onChange={(e) => setLimit(e.target.value)} hint={err(!limitOk, t(pm.eWhole)) ?? t(pm.fLimitHint)} />
            <Field label={t(pm.fRedeem)} id="cp-redeem" type="number" min={1} inputMode="numeric" value={redeem} onChange={(e) => setRedeem(e.target.value)} hint={err(!redeemOk, t(pm.eWhole)) ?? t(pm.fRedeemHint)} />
            <div className="row">
              <Button onClick={save}>{t(pm.cSave)}</Button>
              {coupon && edited(coupon.id) && !coupon.custom && <Button variant="secondary" onClick={() => { restore(coupon.id); navigate(`${base}/promotions/coupons${search}`, { state: { notice: t(pm.cRestored) } }) }}>{t(pm.cRestore)}</Button>}
              <Button variant="ghost" to={`${base}/promotions/coupons${search}`}>{t(pm.cancel)}</Button>
            </div>
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
