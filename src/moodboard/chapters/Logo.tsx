import { useLang } from '../../i18n'
import { Badge, Logo } from '../../ui'
import { Block, Chapter } from '../shared'
import { text } from '../text'

export function LogoChapter() {
  const { t } = useLang()
  const name = t(text.brandName)
  const tones = [
    { label: text.onLight, tone: 'default' as const, surface: 'mb-stage' },
    { label: text.onDark, tone: 'on-dark' as const, surface: 'mb-stage mb-stage--dark' },
    { label: text.onAccent, tone: 'on-accent' as const, surface: 'mb-stage mb-stage--accent' },
  ]
  return (
    <Chapter id="logo" number="06" title={t(text.c6Title)} tag={t(text.c6Tag)}>
      <Block number="6.1" title={t(text.c61)} tag={t(text.mock)} note={t(text.c61Note)}>
        <div className="mb-logos">
          {tones.map((x, i) => (
            <div key={i} className="mb-logo">
              <div className={x.surface}><Logo name={name} tone={x.tone} /></div>
              <span className="muted">{t(x.label)}</span>
            </div>
          ))}
          <div className="mb-logo">
            <div className="mb-stage"><Logo name={name} symbolOnly /></div>
            <span className="muted">{t(text.symbolOnly)}</span>
          </div>
        </div>
      </Block>
      <Block number="6.2" title={t(text.c62)} note={t(text.c62Note)}>
        <div className="mb-usage">
          <div className="mb-clearspace">
            <div className="mb-clearspace__inner"><Logo name={name} /></div>
          </div>
          <div className="stack">
            <p>{t(text.clearSpace)}</p>
            <p>{t(text.minSize)}</p>
          </div>
        </div>
        <div className="mb-dodont">
          <div className="mb-do"><strong>{t(text.doTitle)}</strong><p>{t(text.logoDo1)}</p><p>{t(text.logoDo2)}</p></div>
          <div className="mb-dont"><strong>{t(text.dontTitle)}</strong><p>{t(text.logoDont1)}</p><p>{t(text.logoDont2)}</p></div>
        </div>
      </Block>
      <Block number="6.3" title={t(text.c63)} tag={t(text.mock)} note={t(text.c63Note)}>
        <div className="mb-tones">
          {[[text.tone1, text.tone1Body], [text.tone2, text.tone2Body], [text.tone3, text.tone3Body]].map(([title, body], i) => (
            <div key={i} className="mb-tone">
              <Badge>{t(title)}</Badge>
              <p className="muted">{t(body)}</p>
            </div>
          ))}
        </div>
      </Block>
    </Chapter>
  )
}
