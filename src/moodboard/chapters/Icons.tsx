import { useLang } from '../../i18n'
import { tokens } from '../../tokens/tokens'
import { Icon, IconCircle, icons, type IconName, type IconSize } from '../../ui'
import { Block, Chapter } from '../shared'
import { text } from '../text'

const names = Object.keys(icons) as IconName[]
const sizes = Object.keys(tokens.icon.size) as IconSize[]

export function IconsChapter() {
  const { t } = useLang()
  return (
    <Chapter id="icons" number="07" title={t(text.c7Title)} tag={t(text.c7Tag)}>
      <Block number="7.1" title={t(text.c71)} note={t(text.c71Note)}>
        <div className="icon-grid">
          {names.map((name) => (
            <div key={name} className="icon-grid__cell">
              <Icon name={name} />
              <code>{name}</code>
            </div>
          ))}
        </div>
        <p className="muted"><a href="https://lucide.dev/icons/" target="_blank" rel="noreferrer">lucide.dev/icons</a> · {t(text.c71Add)}</p>
      </Block>
      <Block number="7.2" title={t(text.c72)} note={t(text.c72Note)}>
        <div className="row">
          {sizes.map((size) => (
            <div key={size} className="icon-grid__cell">
              <Icon name="cart" size={size} />
              <code>{size} · {tokens.icon.size[size]}</code>
            </div>
          ))}
          <div className="icon-grid__cell"><code>stroke · {tokens.icon.stroke}</code></div>
        </div>
      </Block>
      <Block number="7.3" title={t(text.c73)} note={t(text.c73Note)}>
        <div className="row">
          <span className="icon-sample"><Icon name="info" /> {t(text.iconText)}</span>
          <span className="icon-sample icon-sample--muted"><Icon name="info" /> {t(text.iconMuted)}</span>
          <span className="icon-sample icon-sample--accent"><Icon name="info" /> {t(text.iconAccent)}</span>
          <span className="icon-sample icon-sample--danger"><Icon name="warning" /> {t(text.iconDanger)}</span>
        </div>
      </Block>
      <Block number="7.4" title={t(text.c74)} note={t(text.c74Note)}>
        <div className="row">
          <IconCircle size="sm" icon="phone" />
          <IconCircle size="md" icon="user" />
          <IconCircle size="lg" icon="truck" />
          <IconCircle size="lg" tone="muted" icon="shield" />
          <IconCircle size="lg" />
        </div>
        <p className="muted">{t(text.iconEmptyNote)}</p>
      </Block>
      <Block number="7.5" title={t(text.c75)}>
        <ul className="mb-rules">
          <li>{t(text.iconRule1)}</li>
          <li>{t(text.iconRule2)}</li>
          <li>{t(text.iconRule3)}</li>
          <li>{t(text.iconRule4)}</li>
        </ul>
      </Block>
    </Chapter>
  )
}
