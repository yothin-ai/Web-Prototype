import { useLang } from '../../i18n'
import { colorUsage, tokens, type ColorToken } from '../../tokens/tokens'
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
    </Chapter>
  )
}
