import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Button, Card, ChoiceCard, ChoiceGroup, Col, Field, Grid } from '../../../ui'
import { PROTOTYPE_ID, useLanding, useLead } from '../lead'
import { s } from '../strings'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function SignUp() {
  const { t } = useLang()
  const content = useLanding()
  const { search } = useLocation()
  const navigate = useNavigate()
  const [, setLead] = useLead()
  const [form, setForm] = useState({ name: '', email: '', company: '' })
  const [interestId, setInterestId] = useState(content.interests[0].id)
  const [touched, setTouched] = useState(false)

  const nameError = touched && !form.name.trim() ? t(s.required) : undefined
  const emailError = touched ? (!form.email.trim() ? t(s.required) : !EMAIL.test(form.email) ? t(s.badEmail) : undefined) : undefined

  const submit = () => {
    setTouched(true)
    if (!form.name.trim() || !EMAIL.test(form.email)) return
    setLead({ ...form, interestId })
    navigate(`/${PROTOTYPE_ID}/thanks${search}`)
  }

  return (
    <Grid>
      <Col span={{ base: 4, sm: 8, md: 7 }}>
        <Card>
          <h1>{t(content.formTitle)}</h1>
          <p className="muted">{t(s.formIntro)}</p>
          <Field label={t(s.name)} id="su-name" value={form.name} hint={nameError} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Field label={t(s.email)} id="su-email" type="email" value={form.email} hint={emailError} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Field label={t(content.companyLabel)} id="su-company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          <ChoiceGroup label={t(content.interestLabel)}>
            {content.interests.map((i) => (
              <ChoiceCard key={i.id} title={t(i.name)} detail={t(i.detail)} selected={i.id === interestId} onSelect={() => setInterestId(i.id)} />
            ))}
          </ChoiceGroup>
          <Button onClick={submit}>{t(s.submit)}</Button>
        </Card>
      </Col>
      <Col span={{ base: 4, sm: 8, md: 5 }}>
        <Card>
          <h3>{t(s.perks)}</h3>
          {content.features.map((f, i) => (
            <div key={i}>
              <strong>{t(f.title)}</strong>
              <p className="muted">{t(f.body)}</p>
            </div>
          ))}
        </Card>
      </Col>
    </Grid>
  )
}
