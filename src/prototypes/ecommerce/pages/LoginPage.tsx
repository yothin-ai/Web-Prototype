import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { Breadcrumb, Col, Grid } from '../../../ui'
import { safeNext } from '../account'
import { PROTOTYPE_ID } from '../cart'
import { u } from '../authStrings'
import { s } from '../strings'
import { AuthCard } from './AuthShared'
import { SignInForm } from './SignInForm'
import { withQuery } from '../Storefront'

// Sign in as a page: where the account pages send a shopper who is signed out. The header opens the same form in a modal.
export function LoginPage() {
  const { t } = useLang()
  const { search } = useLocation()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const base = `/${PROTOTYPE_ID}`
  const next = safeNext(params.get('next'), `${base}/account`)

  return (
    <Grid>
      <Col>
        <Breadcrumb label={t(s.breadcrumbLabel)} items={[{ label: t(s.home), to: `${base}${search.replace(/[?&]next=[^&]*/, '')}` }, { label: t(u.loginTitle) }]} />
      </Col>
      <Col>
        <AuthCard>
          <SignInForm
            notice={!!params.get('next')}
            onDone={() => navigate(next, { replace: true })}
            switchLink={<Link to={`${base}/register${withQuery(search, 'q', '')}`}>{t(u.goRegister)}</Link>}
          />
        </AuthCard>
      </Col>
    </Grid>
  )
}
