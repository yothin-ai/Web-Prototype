import { useLang } from '../../i18n'
import { radiusUsage, shadowUsage, tokens } from '../../tokens/tokens'
import { Block, Chapter } from '../shared'
import { text } from '../text'

export function Elevation() {
  const { t } = useLang()
  const levels = [
    { name: text.level0, shadow: 'none', code: 'none', use: text.level0Use },
    { name: text.level1, shadow: 'var(--shadow-sm)', code: tokens.shadow.sm, use: shadowUsage.sm },
    { name: text.level2, shadow: 'var(--shadow-md)', code: tokens.shadow.md, use: shadowUsage.md },
  ]
  return (
    <Chapter id="elevation" number="05" title={t(text.c5Title)} tag={t(text.c5Tag)}>
      <Block number="5.1" title={t(text.c51)} note={t(text.c51Note)}>
        <div className="mb-levels">
          {levels.map((l, i) => (
            <div key={i} className="mb-level">
              <div className="mb-level__box" style={{ boxShadow: l.shadow }} />
              <strong>{t(l.name)}</strong>
              <span className="swatch__code">{l.code}</span>
              <span className="muted">{t(l.use)}</span>
            </div>
          ))}
        </div>
      </Block>
      <Block number="5.2" title={t(text.c52)} note={t(text.c52Note)}>
        <div className="mb-levels">
          {(Object.entries(tokens.radius) as [keyof typeof tokens.radius, string][]).map(([name, size]) => (
            <div key={name} className="mb-level">
              <div className="radius-box" style={{ borderRadius: `var(--radius-${name})` }} />
              <strong>radius-{name}</strong>
              <span className="swatch__code">{size}</span>
              <span className="muted">{t(radiusUsage[name])}</span>
            </div>
          ))}
        </div>
      </Block>
    </Chapter>
  )
}
