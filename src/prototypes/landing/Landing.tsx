import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useDataset } from '../../datasets/DatasetContext'
import { useLang } from '../../i18n'
import { Button, ContactFooter, SiteNav } from '../../ui'
import { PROTOTYPE_ID, scrollToSection, signupPath, useLanding } from './lead'
import { ArticlePage } from './pages/ArticlePage'
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { Thanks } from './pages/Thanks'
import { s } from './strings'

export function Landing() {
  const { t } = useLang()
  const { dataset } = useDataset()
  const content = useLanding()
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const base = `/${PROTOTYPE_ID}`
  const isHome = pathname.replace(/\/$/, '') === base

  // A new page opens at its top.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // From another page the link goes home first, then scrolls.
  const goTo = (id: string) => () => {
    if (isHome) scrollToSection(id)
    else {
      navigate(`${base}${search}`)
      window.setTimeout(() => scrollToSection(id), 80)
    }
  }
  const brand = t(dataset.brandName)
  const links = [
    { label: t(s.navSolutions), onSelect: goTo('solutions') },
    { label: t(s.navCourses), onSelect: goTo('courses') },
    { label: t(s.navArticles), onSelect: goTo('articles') },
    { label: t(s.navFaq), onSelect: goTo('faq') },
  ]
  const phone = content.contact.phone

  return (
    <>
      <SiteNav
        brand={brand}
        label={t(s.navLabel)}
        menuLabel={t(s.menu)}
        overlay={isHome}
        links={links}
        action={<Button to={signupPath(search, 'journey')} size="sm">{t(content.hero.cta)}</Button>}
      />
      <Routes>
        <Route index element={<Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="thanks" element={<Thanks />} />
        <Route path="article/:index" element={<ArticlePage />} />
        <Route path="*" element={<Navigate to={`${base}${search}`} replace />} />
      </Routes>
      <ContactFooter
        brand={brand}
        company={t(content.contact.company)}
        address={t(content.contact.address)}
        contacts={[
          { icon: 'phone', label: phone, href: `tel:${phone.replace(/\D/g, '')}` },
          { icon: 'mail', label: content.contact.email, href: `mailto:${content.contact.email}` },
        ]}
        columns={[
          { title: t(s.navSolutions), links: content.solutions.products.map((p) => ({ label: t(p.name), onSelect: goTo('solutions') })) },
          { title: t(s.footerExplore), links: links.slice(1) },
        ]}
        copyright={`© 2026 ${t(content.contact.company)}. ${t(s.rights)}`}
      />
    </>
  )
}
