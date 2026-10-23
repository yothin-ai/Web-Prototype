import { useEffect, useRef, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLang } from '../i18n'
import { resetPrototype } from '../state/demoState'
import type { PrototypeManifest } from '../prototypes/types'
import { ConfirmButton } from './ConfirmButton'
import { LanguageToggle } from './LanguageToggle'
import { strings } from './strings'
import './shell.css'

// The frame around every Prototype. `?clean=1` hides it for a full-screen view;
// pressing Escape brings it back.
export function Shell({ prototype, children }: { prototype: PrototypeManifest; children: ReactNode }) {
  const { t } = useLang()
  const [params, setParams] = useSearchParams()
  const clean = params.get('clean') === '1'
  const barRef = useRef<HTMLElement>(null)

  // Publish the bar's height as --shell-bar-height so sticky page headers can sit just below it.
  useEffect(() => {
    const root = document.documentElement
    const bar = barRef.current
    if (clean || !bar || typeof ResizeObserver === 'undefined') {
      root.style.setProperty('--shell-bar-height', '0px')
      return
    }
    const update = () => root.style.setProperty('--shell-bar-height', `${bar.offsetHeight}px`)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(bar)
    return () => {
      observer.disconnect()
      root.style.setProperty('--shell-bar-height', '0px')
    }
  }, [clean])

  useEffect(() => {
    if (!clean) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setParams({}, { replace: true })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [clean, setParams])

  return (
    <>
      {!clean && (
        <header className="topbar" ref={barRef}>
          <div className="topbar__inner">
            <span className="topbar__title">{t(prototype.title)}</span>
            <LanguageToggle />
            <ConfirmButton label={strings.reset} onConfirm={() => resetPrototype(prototype.id)} />
          </div>
        </header>
      )}
      <main>{children}</main>
    </>
  )
}
