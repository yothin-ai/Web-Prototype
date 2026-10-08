import { useLang } from '../i18n'
import { strings } from './strings'

export function LanguageToggle() {
  const { lang, setLang, t } = useLang()
  return (
    <div className="lang" role="group" aria-label={t(strings.languageLabel)}>
      {(['th', 'en'] as const).map((code) => (
        <button key={code} type="button" aria-pressed={lang === code} onClick={() => setLang(code)}>
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
