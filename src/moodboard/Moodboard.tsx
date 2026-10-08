import { useState } from 'react'
import { useLang, type Localized } from '../i18n'
import { PageHeader } from '../shell/PageHeader'
import { strings } from '../shell/strings'
import { colorUsage, tokens, type ColorToken } from '../tokens/tokens'
import { Accordion, Badge, Button, Card, ChoiceCard, ChoiceGroup, Col, DataRow, Field, Grid, Hero, NavTabs, ProductImage, ProgressBar, Quote, QuantityStepper } from '../ui'
import './moodboard.css'

const text = {
  title: { th: 'Moodboard', en: 'Moodboard' },
  intro: {
    th: 'แหล่งอ้างอิงเดียวของหน้าตาระบบ UI ของทุก Prototype ต้องใช้เฉพาะค่าและ component ในหน้านี้',
    en: 'The single reference for how the system looks. Every Prototype UI may use only the values and components on this page.',
  },
  colors: { th: 'สี', en: 'Color' },
  typography: { th: 'ตัวอักษร', en: 'Typography' },
  sample: { th: 'ตัวอย่างข้อความภาษาไทยและ English', en: 'Sample text in Thai and English' },
  spacing: { th: 'ระยะห่าง', en: 'Spacing' },
  radius: { th: 'มุมโค้ง', en: 'Radius' },
  shadow: { th: 'เงา', en: 'Shadow' },
  grid: { th: 'Grid และ Breakpoint', en: 'Grid and breakpoints' },
  gridNote: {
    th: 'Container เดียวกันทั้งระบบ: 4 คอลัมน์บนมือถือ, 8 จาก sm, 12 จาก md ลองย่อขยายหน้าต่างเพื่อดู',
    en: 'One container for the whole system: 4 columns on phones, 8 from sm, 12 from md. Resize the window to see it.',
  },
  components: { th: 'Component', en: 'Components' },
  buttons: { th: 'ปุ่ม', en: 'Buttons' },
  badges: { th: 'ป้าย', en: 'Badges' },
  card: { th: 'การ์ด', en: 'Card' },
  cardBody: { th: 'พื้นผิวสำหรับจัดกลุ่มเนื้อหา', en: 'A surface that groups related content' },
  form: { th: 'ฟอร์ม', en: 'Form field' },
  fieldHint: { th: 'ข้อความช่วยเหลือ', en: 'Helper text' },
  primary: { th: 'หลัก', en: 'Primary' },
  secondary: { th: 'รอง', en: 'Secondary' },
  ghost: { th: 'เบา', en: 'Ghost' },
  danger: { th: 'อันตราย', en: 'Danger' },
  success: { th: 'สำเร็จ', en: 'Success' },
  warning: { th: 'คำเตือน', en: 'Warning' },
  productImage: { th: 'กรอบภาพสินค้า', en: 'Product image' },
  stepper: { th: 'ตัวปรับจำนวน', en: 'Quantity stepper' },
  dataRow: { th: 'แถวป้าย-ค่า', en: 'Data row' },
  choice: { th: 'ตัวเลือกแบบการ์ด', en: 'Choice card' },
  sampleName: { th: 'สินค้าตัวอย่าง', en: 'Sample item' },
  decrease: { th: 'ลดจำนวน', en: 'Decrease quantity' },
  increase: { th: 'เพิ่มจำนวน', en: 'Increase quantity' },
  quantity: { th: 'จำนวน', en: 'Quantity' },
  subtotal: { th: 'ราคาสินค้า', en: 'Subtotal' },
  shipping: { th: 'ค่าจัดส่ง', en: 'Shipping' },
  total: { th: 'รวมทั้งหมด', en: 'Total' },
  optionA: { th: 'ตัวเลือก A', en: 'Option A' },
  optionB: { th: 'ตัวเลือก B', en: 'Option B' },
  hero: { th: 'ส่วนเปิดหน้า', en: 'Hero' },
  accordion: { th: 'พับ/ขยายเนื้อหา', en: 'Accordion' },
  quote: { th: 'คำพูดอ้างอิง', en: 'Quote' },
  heroTitle: { th: 'หัวข้อใหญ่ที่บอกคุณค่าในประโยคเดียว', en: 'One big headline that states the value' },
  heroSubtitle: { th: 'ประโยคนำที่อธิบายเพิ่ม', en: 'A lead sentence that adds detail' },
  question: { th: 'คำถามตัวอย่าง', en: 'Sample question' },
  answer: { th: 'คำตอบที่ซ่อนอยู่จนกว่าจะกดเปิด', en: 'An answer hidden until opened' },
  quoteText: { th: 'คำพูดจากผู้ใช้ตัวอย่าง', en: 'A sample quote from a user' },
  quoteAuthor: { th: 'ผู้ใช้ตัวอย่าง', en: 'Sample user' },
  progressBar: { th: 'แถบความคืบหน้า', en: 'Progress bar' },
  navTabs: { th: 'เมนูแท็บ', en: 'Nav tabs' },
  tabOne: { th: 'หน้าแรก', en: 'Home' },
  tabTwo: { th: 'หน้าที่สอง', en: 'Second page' },
  tabThree: { th: 'หน้าที่สาม', en: 'Third page' },
  optionDetail: { th: 'คำอธิบายสั้น ๆ', en: 'A short description' },
} satisfies Record<string, Localized>

export function Moodboard() {
  const { t } = useLang()
  const [qty, setQty] = useState(1)
  const [choice, setChoice] = useState('a')
  const colorNames = Object.keys(tokens.color) as ColorToken[]
  const spans = Array.from({ length: tokens.grid.columns.md }, (_, i) => i)

  return (
    <>
      <PageHeader showBack />
      <Grid>
        <Col>
          <div className="stack section">
            <h1>{t(text.title)}</h1>
            <p className="muted">{t(text.intro)}</p>
          </div>

          <section className="mb-section">
            <h2>{t(text.colors)}</h2>
            <div className="swatches">
              {colorNames.map((name) => (
                <div className="swatch" key={name}>
                  <div className="swatch__chip" style={{ background: `var(--color-${name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)})` }} />
                  <div className="swatch__meta">
                    <strong>{name}</strong>
                    <span className="swatch__code">{tokens.color[name]}</span>
                    <span className="muted">{t(colorUsage[name])}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-section">
            <h2>{t(text.typography)}</h2>
            <div className="scale">
              {Object.entries(tokens.font.size).map(([name, size]) => (
                <div className="scale__row" key={name}>
                  <span className="scale__label">{name} · {size}</span>
                  <span style={{ fontSize: size }}>{t(text.sample)}</span>
                </div>
              ))}
            </div>
            <p className="muted">
              {Object.entries(tokens.font.weight).map(([k, v]) => `${k} ${v}`).join(' · ')}
            </p>
          </section>

          <section className="mb-section">
            <h2>{t(text.spacing)}</h2>
            <div className="scale">
              {Object.entries(tokens.space).map(([name, size]) => (
                <div className="scale__row" key={name}>
                  <span className="scale__label">space-{name} · {size}</span>
                  <div className="space-bar" style={{ width: size }} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-section">
            <h2>{t(text.radius)}</h2>
            <div className="row">
              {Object.entries(tokens.radius).map(([name, size]) => (
                <div key={name} className="stack">
                  <div className="radius-box" style={{ borderRadius: size }} />
                  <span className="scale__label">{name} · {size}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-section">
            <h2>{t(text.shadow)}</h2>
            <div className="row">
              {Object.keys(tokens.shadow).map((name) => (
                <div key={name} className="stack">
                  <div className="shadow-box" style={{ boxShadow: `var(--shadow-${name})` }} />
                  <span className="scale__label">{name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-section">
            <h2>{t(text.grid)}</h2>
            <p className="muted">{t(text.gridNote)}</p>
            <p className="swatch__code">
              sm ≥ {tokens.breakpoint.sm}px · md ≥ {tokens.breakpoint.md}px · gutter {tokens.grid.gutter} · max {tokens.grid.maxWidth}
            </p>
            <Grid>
              {spans.map((i) => (
                <Col key={i} span={{ base: 1, sm: 1, md: 1 }}>
                  <div className="grid-demo">{i + 1}</div>
                </Col>
              ))}
            </Grid>
          </section>

          <section className="mb-section">
            <h2>{t(text.components)}</h2>
            <h3>{t(text.buttons)}</h3>
            <div className="row">
              <Button>{t(text.primary)}</Button>
              <Button variant="secondary">{t(text.secondary)}</Button>
              <Button variant="ghost">{t(text.ghost)}</Button>
              <Button variant="danger">{t(text.danger)}</Button>
              <Button disabled>{t(strings.open)}</Button>
            </div>
            <h3>{t(text.badges)}</h3>
            <div className="row">
              <Badge>{t(strings.ready)}</Badge>
              <Badge tone="success">{t(text.success)}</Badge>
              <Badge tone="warning">{t(text.warning)}</Badge>
            </div>
            <Grid>
              <Col span={{ base: 4, sm: 4, md: 6 }}>
                <Card>
                  <h3>{t(text.card)}</h3>
                  <p className="muted">{t(text.cardBody)}</p>
                </Card>
              </Col>
              <Col span={{ base: 4, sm: 4, md: 6 }}>
                <Card>
                  <Field label={t(text.form)} hint={t(text.fieldHint)} defaultValue="" id="mb-field" />
                </Card>
              </Col>
            </Grid>
            <Grid>
              <Col span={{ base: 4, sm: 4, md: 3 }}>
                <div className="stack">
                  <h3>{t(text.productImage)}</h3>
                  <ProductImage label={t(text.sampleName)} />
                </div>
              </Col>
              <Col span={{ base: 4, sm: 4, md: 3 }}>
                <div className="stack">
                  <h3>{t(text.stepper)}</h3>
                  <QuantityStepper
                    value={qty}
                    onChange={setQty}
                    label={t(text.quantity)}
                    decreaseLabel={t(text.decrease)}
                    increaseLabel={t(text.increase)}
                  />
                </div>
              </Col>
              <Col span={{ base: 4, sm: 8, md: 6 }}>
                <div className="stack">
                  <h3>{t(text.dataRow)}</h3>
                  <Card>
                    <DataRow muted label={t(text.subtotal)} value="฿1,200" />
                    <DataRow muted label={t(text.shipping)} value="฿40" />
                    <DataRow strong label={t(text.total)} value="฿1,240" />
                  </Card>
                </div>
              </Col>
              <Col span={{ base: 4, sm: 8, md: 6 }}>
                <div className="stack">
                  <h3>{t(text.accordion)}</h3>
                  <Accordion items={[{ title: t(text.question), body: t(text.answer) }, { title: t(text.question), body: t(text.answer) }]} />
                </div>
              </Col>
              <Col span={{ base: 4, sm: 8, md: 6 }}>
                <div className="stack">
                  <h3>{t(text.quote)}</h3>
                  <Quote text={t(text.quoteText)} author={t(text.quoteAuthor)} />
                </div>
              </Col>
              <Col span={{ base: 4, sm: 8, md: 6 }}>
                <div className="stack">
                  <h3>{t(text.progressBar)}</h3>
                  <ProgressBar value={60} label={t(text.progressBar)} />
                </div>
              </Col>
              <Col span={{ base: 4, sm: 8, md: 6 }}>
                <div className="stack">
                  <h3>{t(text.navTabs)}</h3>
                  <NavTabs
                    label={t(text.navTabs)}
                    items={[
                      { to: '/moodboard', label: t(text.tabOne), active: true },
                      { to: '/moodboard', label: t(text.tabTwo), active: false },
                      { to: '/moodboard', label: t(text.tabThree), active: false },
                    ]}
                  />
                </div>
              </Col>
              <Col>
                <div className="stack">
                  <h3>{t(text.hero)}</h3>
                  <Hero title={t(text.heroTitle)} subtitle={t(text.heroSubtitle)} actions={<Button>{t(text.primary)}</Button>} />
                </div>
              </Col>
              <Col>
                <div className="stack">
                  <h3>{t(text.choice)}</h3>
                  <ChoiceGroup label={t(text.choice)}>
                    <ChoiceCard title={t(text.optionA)} detail={t(text.optionDetail)} price="฿40" selected={choice === 'a'} onSelect={() => setChoice('a')} />
                    <ChoiceCard title={t(text.optionB)} detail={t(text.optionDetail)} price="฿90" selected={choice === 'b'} onSelect={() => setChoice('b')} />
                  </ChoiceGroup>
                </div>
              </Col>
            </Grid>
          </section>
        </Col>
      </Grid>
    </>
  )
}
