import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Badge, Button, Card, Modal, Switch } from '../../../ui'
import { PROTOTYPE_ID } from '../cart'
import { useCookieChoice } from '../cookies'
import { ck } from '../miscStrings'
import { withQuery } from '../Storefront'

// The cookie notice at the bottom of the page and the settings window. The window is open while the address
// carries ?cookies=1, so the footer link, the notice and the Back button all use the same address.
export function CookieConsent() {
  const { t } = useLang()
  const { pathname, search } = useLocation()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [choice, setChoice] = useCookieChoice()
  const open = params.get('cookies') === '1'
  const [analytics, setAnalytics] = useState(choice.analytics)
  const [marketing, setMarketing] = useState(choice.marketing)
  useEffect(() => { if (open) { setAnalytics(choice.analytics); setMarketing(choice.marketing) } }, [open, choice.analytics, choice.marketing])
  const go = (value: string) => navigate(`${pathname}${withQuery(search, 'cookies', value)}`, { replace: true })
  const decide = (a: boolean, m: boolean) => { setChoice({ decided: true, analytics: a, marketing: m }); go('') }

  return (
    <>
      {!choice.decided && (
        <div className="cookie-banner" role="region" aria-label={t(ck.regionLabel)}>
          <Card>
            <div className="cookie-banner__body">
              <div className="stack cookie-banner__text">
                <strong>{t(ck.bannerTitle)}</strong>
                <span className="muted">{t(ck.bannerText)} <a href={`#/${PROTOTYPE_ID}/info/cookie`}>{t(ck.readPolicy)}</a></span>
              </div>
              <div className="cookie-banner__actions">
                <Button variant="ghost" onClick={() => go('1')}>{t(ck.settings)}</Button>
                <Button variant="secondary" onClick={() => decide(false, false)}>{t(ck.rejectAll)}</Button>
                <Button onClick={() => decide(true, true)}>{t(ck.acceptAll)}</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      <Modal open={open} onClose={() => go('')} label={t(ck.modalTitle)} closeLabel={t(ck.closeModal)}>
        <div className="stack">
          <h2>{t(ck.modalTitle)}</h2>
          <span className="muted">{t(ck.modalIntro)}</span>
          <div className="switch-row">
            <span className="switch-row__text"><strong>{t(ck.necessary)}</strong><span className="muted">{t(ck.necessaryText)}</span></span>
            <Badge>{t(ck.alwaysOn)}</Badge>
          </div>
          <Switch checked={analytics} onChange={setAnalytics} label={t(ck.analytics)} description={t(ck.analyticsText)} />
          <Switch checked={marketing} onChange={setMarketing} label={t(ck.marketing)} description={t(ck.marketingText)} />
          <Button onClick={() => decide(analytics, marketing)}>{t(ck.save)}</Button>
          <span className="muted">{t(ck.demoNote)}</span>
        </div>
      </Modal>
    </>
  )
}
