import { useLang } from '../../i18n'
import { colorUsage, landingTheme, tokens, type ColorToken } from '../../tokens/tokens'
import { contrast, grade, hexToRgb } from '../color'
import { Block, Chapter } from '../shared'
import { text } from '../text'

const cssVar = (name: string) => `--color-${name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`

function Swatch({ name }: { name: ColorToken }) {
  const { t } = useLang()
  const hex = tokens.color[name]
  const [r, g, b] = hexToRgb(hex)
  // Show the sample text in whichever of the two text colors reads better on this swatch.
  const light = tokens.color.surface
  const dark = tokens.color.text
  const useLight = contrast(hex, light) >= contrast(hex, dark)
  const ratio = contrast(hex, useLight ? light : dark)

  return (
    <div className="swatch">
      <div className="swatch__chip" style={{ background: `var(${cssVar(name)})`, color: `var(${useLight ? '--color-surface' : '--color-text'})` }}>
        <span className="swatch__sample">Aa</span>
        <span className="swatch__grade">{ratio.toFixed(1)}:1 · {grade(ratio)}</span>
      </div>
      <div className="swatch__meta">
        <strong>{name}</strong>
        <span className="swatch__code">{cssVar(name)}</span>
        <span className="swatch__code">HEX {hex.toUpperCase()}</span>
        <span className="swatch__code">RGB {r}, {g}, {b}</span>
        <span className="muted">{t(colorUsage[name])}</span>
      </div>
    </div>
  )
}

// The landing page's own colours (a theme that applies only inside .theme-landing), shown with their role.
const themeUsage: Record<string, { th: string; en: string }> = {
  accent: { th: 'ปุ่มหลักและป้ายเน้น (แดงอิฐ)', en: 'Primary buttons and highlights (brick red)' },
  accentHover: { th: 'สถานะ hover/กดของปุ่มหลัก', en: 'Hover and pressed state of the primary button' },
  skyTop: { th: 'ขอบบนของส่วนหัวเมื่อไม่มีรูป', en: 'Top of the opening band when it has no picture' },
  skyBottom: { th: 'ขอบล่างของส่วนหัวเมื่อไม่มีรูป', en: 'Bottom of the opening band when it has no picture' },
  skySoft: { th: 'ฟ้าอ่อนหลังส่วนคำถามที่พบบ่อย', en: 'Soft blue behind the FAQ' },
  heroLead: { th: 'บรรทัดแรกของหัวข้อบนส่วนหัว', en: 'First line of the opening headline' },
  heroAccent: { th: 'คำเน้นในหัวข้อบนส่วนหัว', en: 'Highlighted words in the opening headline' },
  ink: { th: 'พื้นส่วนท้ายหน้า', en: 'Foot of the page' },
}

function ThemeSwatch({ name, hex }: { name: string; hex: string }) {
  const { t } = useLang()
  const [r, g, b] = hexToRgb(hex)
  const varName = `--color-${name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`
  const useLight = contrast(hex, tokens.color.surface) >= contrast(hex, tokens.color.text)
  const ratio = contrast(hex, useLight ? tokens.color.surface : tokens.color.text)
  return (
    <div className="swatch">
      <div className="swatch__chip" style={{ background: hex, color: `var(${useLight ? '--color-surface' : '--color-text'})` }}>
        <span className="swatch__sample">Aa</span>
        <span className="swatch__grade">{ratio.toFixed(1)}:1 · {grade(ratio)}</span>
      </div>
      <div className="swatch__meta">
        <strong>{name}</strong>
        <span className="swatch__code">{varName}</span>
        <span className="swatch__code">HEX {hex.toUpperCase()}</span>
        <span className="swatch__code">RGB {r}, {g}, {b}</span>
        {themeUsage[name] && <span className="muted">{t(themeUsage[name])}</span>}
      </div>
    </div>
  )
}

function Group({ names }: { names: ColorToken[] }) {
  return <div className="swatches">{names.map((n) => <Swatch key={n} name={n} />)}</div>
}

export function Colors() {
  const { t } = useLang()
  return (
    <Chapter id="colors" number="01" title={t(text.c1Title)} tag={t(text.c1Tag)}>
      <Block number="1.1" title={t(text.c11)} note={t(text.c11Note)}>
        <Group names={['accent', 'accentHover', 'accentText', 'accentSoft']} />
        <div className="mb-dodont">
          <p className="mb-do"><strong>{t(text.doTitle)}</strong> {t(text.doAccent)}</p>
          <p className="mb-dont"><strong>{t(text.dontTitle)}</strong> {t(text.dontAccent)}</p>
        </div>
      </Block>
      <Block number="1.2" title={t(text.c12)} note={t(text.c12Note)}>
        <Group names={['success', 'warning', 'danger']} />
      </Block>
      <Block number="1.3" title={t(text.c13)} note={t(text.c13Note)}>
        <Group names={['bg', 'surface', 'surfaceAlt', 'border', 'text', 'textMuted']} />
      </Block>
      <Block number="1.4" title={t(text.c14)} note={t(text.c14Note)}>
        <div className="swatches">
          {(['accent', 'accentHover'] as const).map((n) => <ThemeSwatch key={n} name={n} hex={landingTheme.color[n]} />)}
          {Object.entries(landingTheme.extra).map(([n, hex]) => <ThemeSwatch key={n} name={n} hex={hex} />)}
        </div>
      </Block>
    </Chapter>
  )
}
