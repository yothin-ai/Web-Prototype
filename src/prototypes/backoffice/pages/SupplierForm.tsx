import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Breadcrumb, Button, Card, Col, Field, Grid } from '../../../ui'
import { PageHead } from '../PageHead'
import { PROTOTYPE_ID, useSearch } from '../data'
import { b } from '../strings'
import { sp } from '../supplierStrings'
import { useSuppliers, type Supplier } from '../suppliers'

export function SupplierForm() {
  const { t } = useLang()
  const { supplierId } = useParams()
  const { byId } = useSuppliers()
  const base = `/${PROTOTYPE_ID}`
  const search = useSearch()
  const supplier = supplierId ? byId(supplierId) : undefined
  if (supplierId && !supplier) {
    return (
      <Grid>
        <Col><Card><p>{t(sp.notFound)}</p><div><Button to={`${base}/suppliers${search}`}>{t(sp.backToList)}</Button></div></Card></Col>
      </Grid>
    )
  }
  return <Form key={supplier?.id ?? 'new'} supplier={supplier} />
}

function Form({ supplier }: { supplier?: Supplier }) {
  const { t } = useLang()
  const navigate = useNavigate()
  const { add, update } = useSuppliers()
  const base = `/${PROTOTYPE_ID}`
  const search = useSearch()
  const [nameTh, setNameTh] = useState(supplier?.name.th ?? '')
  const [nameEn, setNameEn] = useState(supplier?.name.en ?? '')
  const [contact, setContact] = useState(supplier ? t(supplier.contact) : '')
  const [phone, setPhone] = useState(supplier?.phone ?? '')
  const [email, setEmail] = useState(supplier?.email ?? '')
  const [city, setCity] = useState(supplier ? t(supplier.city) : '')
  const [address, setAddress] = useState(supplier?.address ?? '')
  const [terms, setTerms] = useState(supplier?.termsDays !== undefined ? String(supplier.termsDays) : '')
  const [tried, setTried] = useState(false)

  const nameOk = nameTh.trim() !== '' && nameEn.trim() !== ''
  const emailOk = email.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const termsOk = terms.trim() === '' || /^\d+$/.test(terms.trim())
  const save = () => {
    setTried(true)
    if (!nameOk || !emailOk || !termsOk) return
    const same = (x: string) => ({ th: x.trim(), en: x.trim() })
    const row = {
      name: { th: nameTh.trim(), en: nameEn.trim() },
      contact: same(contact),
      phone: phone.trim(),
      email: email.trim(),
      city: same(city),
      address: address.trim() || undefined,
      termsDays: terms.trim() === '' ? undefined : Number(terms),
    }
    if (supplier) update(supplier.id, row)
    else add({ id: `sm-${Date.now()}`, custom: true, ...row })
    navigate(`${base}/suppliers${search}`, { state: { notice: t(sp.saved) } })
  }
  const title = t(supplier ? sp.editTitle : sp.newTitle)
  return (
    <Grid>
      <Col>
        <div className="stack">
          <Breadcrumb label={t(sp.breadcrumb)} items={[{ label: t(b.suppliersTitle), to: `${base}/suppliers${search}` }, { label: title }]} />
          <PageHead title={title} text={t(sp.formText)} />
        </div>
      </Col>
      <Col>
        <Card>
          <div className="stack">
            <Field label={t(sp.nameTh)} id="sup-name-th" value={nameTh} onChange={(e) => setNameTh(e.target.value)} hint={tried && !nameOk ? t(sp.errName) : undefined} />
            <Field label={t(sp.nameEn)} id="sup-name-en" value={nameEn} onChange={(e) => setNameEn(e.target.value)} hint={tried && !nameOk ? t(sp.errName) : undefined} />
            <Field label={t(sp.contact)} id="sup-contact" value={contact} onChange={(e) => setContact(e.target.value)} />
            <Field label={t(sp.phone)} id="sup-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Field label={t(sp.email)} id="sup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} hint={tried && !emailOk ? t(sp.errEmail) : undefined} />
            <Field label={t(sp.city)} id="sup-city" value={city} onChange={(e) => setCity(e.target.value)} />
            <Field label={t(sp.address)} id="sup-address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <Field label={t(sp.terms)} id="sup-terms" type="number" min={0} inputMode="numeric" value={terms} onChange={(e) => setTerms(e.target.value)} hint={tried && !termsOk ? t(sp.errTerms) : t(sp.termsHint)} />
            <div className="row"><Button onClick={save}>{t(sp.save)}</Button><Button variant="ghost" to={`${base}/suppliers${search}`}>{t(sp.cancel)}</Button></div>
          </div>
        </Card>
      </Col>
    </Grid>
  )
}
