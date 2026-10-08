import { useState } from 'react'
import { useLang } from '../../i18n'
import {
  Accordion, Badge, Button, Card, ChoiceCard, ChoiceGroup, Col, DataRow, Field, Grid, Hero, Logo, NavTabs, ProductImage, ProgressBar, QuantityStepper, Quote,
} from '../../ui'
import { Block, Chapter, TableWrap } from '../shared'
import { text } from '../text'

export function Components() {
  const { t } = useLang()
  const [qty, setQty] = useState(1)
  const [choice, setChoice] = useState('a')
  const variants = [
    { name: text.primary, variant: 'primary' as const },
    { name: text.secondary, variant: 'secondary' as const },
    { name: text.ghost, variant: 'ghost' as const },
    { name: text.danger, variant: 'danger' as const },
  ]

  return (
    <Chapter id="components" number="04" title={t(text.c4Title)} tag={t(text.c4Tag)}>
      <Block number="4.1" title={t(text.c41)} note={t(text.c41Note)}>
        <TableWrap>
          <thead>
            <tr>
              <th />
              <th>{t(text.stateDefault)}</th>
              <th>{t(text.stateHover)}</th>
              <th>{t(text.stateFocus)}</th>
              <th>{t(text.stateDisabled)}</th>
              <th>{t(text.small)}</th>
            </tr>
          </thead>
          <tbody>
            {variants.map(({ name, variant }) => (
              <tr key={variant}>
                <td><strong>{t(name)}</strong></td>
                <td><Button variant={variant}>{t(name)}</Button></td>
                <td><Button variant={variant} className="state-hover">{t(name)}</Button></td>
                <td><Button variant={variant} className="state-focus">{t(name)}</Button></td>
                <td><Button variant={variant} disabled>{t(name)}</Button></td>
                <td><Button variant={variant} size="sm">{t(name)}</Button></td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </Block>

      <Block number="4.2" title={t(text.c42)} note={t(text.c42Note)}>
        <Grid>
          <Col span={{ base: 4, sm: 4, md: 3 }}>
            <p className="mb-caption">{t(text.stateDefault)}</p>
            <Field label={t(text.fieldLabel)} hint={t(text.fieldHint)} id="mb-f1" />
          </Col>
          <Col span={{ base: 4, sm: 4, md: 3 }}>
            <p className="mb-caption">{t(text.stateFocus)}</p>
            <div className="state-focus-field"><Field label={t(text.fieldLabel)} hint={t(text.fieldHint)} id="mb-f2" defaultValue={t(text.fieldValue)} /></div>
          </Col>
          <Col span={{ base: 4, sm: 4, md: 3 }}>
            <p className="mb-caption">{t(text.stateDisabled)}</p>
            <Field label={t(text.fieldLabel)} hint={t(text.fieldHint)} id="mb-f3" defaultValue={t(text.fieldValue)} disabled />
          </Col>
        </Grid>
      </Block>

      <Block number="4.3" title={t(text.c43)} note={t(text.c43Note)}>
        <Grid>
          <Col span={{ base: 4, sm: 4, md: 4 }}>
            <p className="mb-caption">{t(text.stateDefault)}</p>
            <Card>
              <ProductImage label={t(text.sampleName)} />
              <Badge>{t(text.sampleCategory)}</Badge>
              <h3>{t(text.sampleName)}</h3>
              <p className="muted">{t(text.sampleDesc)}</p>
              <DataRow label={<strong>฿1,200</strong>} value={<Button size="sm">{t(text.add)}</Button>} />
            </Card>
          </Col>
          <Col span={{ base: 4, sm: 4, md: 4 }}>
            <p className="mb-caption">{t(text.stateHover)}</p>
            <div className="state-hover-card">
              <Card>
                <ProductImage label={t(text.sampleName)} />
                <Badge>{t(text.sampleCategory)}</Badge>
                <h3>{t(text.sampleName)}</h3>
                <p className="muted">{t(text.sampleDesc)}</p>
                <DataRow label={<strong>฿1,200</strong>} value={<Button size="sm">{t(text.add)}</Button>} />
              </Card>
            </div>
          </Col>
        </Grid>
      </Block>

      <Block number="4.4" title={t(text.c44)} note={t(text.c44Note)}>
        <div className="row">
          <Badge>{t(text.ready)}</Badge>
          <Badge tone="success">{t(text.success)}</Badge>
          <Badge tone="warning">{t(text.warning)}</Badge>
        </div>
      </Block>

      <Block number="4.5" title={t(text.c45)} note={t(text.c45Note)}>
        <div className="mb-bar">
          <Logo name={t(text.brandName)} />
          <NavTabs
            label={t(text.navTabs)}
            items={[
              { to: '/moodboard', label: t(text.tabOne), active: true },
              { to: '/moodboard', label: t(text.tabTwo), active: false },
              { to: '/moodboard', label: t(text.tabThree), active: false },
            ]}
          />
        </div>
      </Block>

      <Block number="4.6" title={t(text.c46)} note={t(text.c46Note)}>
        <Grid>
          <Col span={{ base: 4, sm: 8, md: 6 }}>
            <p className="mb-caption">{t(text.choice)}</p>
            <ChoiceGroup label={t(text.choice)}>
              <ChoiceCard title={t(text.optionA)} detail={t(text.optionDetail)} price="฿40" selected={choice === 'a'} onSelect={() => setChoice('a')} />
              <ChoiceCard title={t(text.optionB)} detail={t(text.optionDetail)} price="฿90" selected={choice === 'b'} onSelect={() => setChoice('b')} />
            </ChoiceGroup>
          </Col>
          <Col span={{ base: 4, sm: 8, md: 6 }}>
            <div className="stack">
              <div className="stack">
                <p className="mb-caption">{t(text.stepper)}</p>
                <div><QuantityStepper value={qty} onChange={setQty} label={t(text.quantity)} decreaseLabel={t(text.decrease)} increaseLabel={t(text.increase)} /></div>
              </div>
              <div className="stack">
                <p className="mb-caption">{t(text.dataRow)}</p>
                <Card>
                  <DataRow muted label={t(text.subtotal)} value="฿1,200" />
                  <DataRow muted label={t(text.shipping)} value="฿40" />
                  <DataRow strong label={t(text.total)} value="฿1,240" />
                </Card>
              </div>
              <div className="stack">
                <p className="mb-caption">{t(text.progressBar)}</p>
                <ProgressBar value={60} label={t(text.progress)} />
              </div>
            </div>
          </Col>
        </Grid>
      </Block>

      <Block number="4.7" title={t(text.c47)} note={t(text.c47Note)}>
        <div className="stack">
          <p className="mb-caption">{t(text.heroName)}</p>
          <Hero title={t(text.heroTitle)} subtitle={t(text.heroSubtitle)} actions={<Button>{t(text.primary)}</Button>} />
          <Grid>
            <Col span={{ base: 4, sm: 8, md: 6 }}>
              <p className="mb-caption">{t(text.accordion)}</p>
              <Accordion items={[{ title: t(text.question), body: t(text.answer) }, { title: t(text.question), body: t(text.answer) }]} />
            </Col>
            <Col span={{ base: 4, sm: 8, md: 6 }}>
              <p className="mb-caption">{t(text.quote)}</p>
              <Quote text={t(text.quoteText)} author={t(text.quoteAuthor)} />
            </Col>
          </Grid>
        </div>
      </Block>
    </Chapter>
  )
}
