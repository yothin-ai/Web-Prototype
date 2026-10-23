import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'th' | 'en'
export type Localized = { th?: string; en?: string }

// The Dataset's main language, used when a string is missing in the chosen one.
const MAIN_LANG: Lang = 'th'
const STORAGE_KEY = 'mps:lang'

function readLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'th' || stored === 'en') return stored
  } catch {
    // storage unavailable: fall through to the default
  }
  return MAIN_LANG
}

type LangContext = { lang: Lang; setLang: (lang: Lang) => void; t: (text: Localized) => string }

const Context = createContext<LangContext | null>(null)
const warned = new Set<string>()

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang)

  // A choice made in another tab of this browser applies here too.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) setLangState(readLang())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    document.documentElement.lang = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // keep the choice in memory only
    }
  }, [])

  const t = useCallback(
    (text: Localized) => {
      const chosen = text[lang]
      if (chosen !== undefined) return chosen
      if (import.meta.env.DEV) {
        const key = `${lang}:${text[MAIN_LANG] ?? ''}`
        if (!warned.has(key)) {
          warned.add(key)
          console.warn(`[i18n] missing ${lang} text for "${text[MAIN_LANG] ?? '?'}"`)
        }
      }
      return text[MAIN_LANG] ?? text.en ?? ''
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])
  document.documentElement.lang = lang
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useLang(): LangContext {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
