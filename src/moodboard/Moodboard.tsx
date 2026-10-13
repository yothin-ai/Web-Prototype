import { useLang } from '../i18n'
import { LanguageToggle } from '../shell/LanguageToggle'
import { strings } from '../shell/strings'
import { tokens } from '../tokens/tokens'
import { Button, Logo } from '../ui'
import { Colors } from './chapters/Colors'
import { Components } from './chapters/Components'
import { Elevation } from './chapters/Elevation'
import { IconsChapter } from './chapters/Icons'
import { LogoChapter } from './chapters/Logo'
import { Spacing } from './chapters/Spacing'
import { Typography } from './chapters/Typography'
import { text } from './text'
import './moodboard.css'

const chapters = [
  { id: 'colors', label: text.nav1 },
  { id: 'typography', label: text.nav2 },
  { id: 'spacing', label: text.nav3 },
  { id: 'components', label: text.nav4 },
  { id: 'elevation', label: text.nav5 },
  { id: 'logo', label: text.nav6 },
  { id: 'icons', label: text.nav7 },
]

export function Moodboard() {
  const { t } = useLang()
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <header className="mb-topbar">
        <div className="mb-topbar__inner">
          <Button to="/" variant="ghost" size="sm">{t(strings.backToHub)}</Button>
          <nav className="mb-topbar__nav" aria-label="Moodboard">
            {chapters.map((c) => (
              <button key={c.id} type="button" className="mb-topbar__link" onClick={() => go(c.id)}>{t(c.label)}</button>
            ))}
          </nav>
          <LanguageToggle />
        </div>
      </header>

      <section className="mb-hero">
        <div className="mb-hero__inner">
          <div className="stack">
            <Logo name={t(text.brandName)} tone="on-dark" />
            <span className="mb-hero__badge">{t(text.badge)}</span>
            <h1 className="mb-hero__title">{t(text.pageTitle)}</h1>
            <p className="mb-hero__intro">{t(text.pageIntro)}</p>
          </div>
          <div className="mb-hero__facts">
            <div className="mb-fact"><span>{t(text.primaryColor)}</span><strong>{tokens.color.accent.toUpperCase()}</strong></div>
            <div className="mb-fact"><span>{t(text.surfaceColor)}</span><strong>{tokens.color.bg.toUpperCase()}</strong></div>
            <div className="mb-fact"><span>{t(text.mainFont)}</span><strong>Inter · Noto Sans Thai</strong></div>
          </div>
        </div>
      </section>

      <main className="mb-main">
        <Colors />
        <Typography />
        <Spacing />
        <Components />
        <Elevation />
        <LogoChapter />
        <IconsChapter />
      </main>
    </>
  )
}
