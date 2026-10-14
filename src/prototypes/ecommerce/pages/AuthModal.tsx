import { Modal } from '../../../ui'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useLang } from '../../../i18n'
import { useSignedIn } from '../account'
import { u } from '../authStrings'
import { withQuery } from '../Storefront'
import { RegisterForm } from './RegisterForm'
import { SignInForm } from './SignInForm'

// Sign in and register in a modal over the page the shopper is on. It is open while the address carries
// ?auth=login or ?auth=register, so the Back button closes it and the link can be shared.
export function AuthModal() {
  const { t } = useLang()
  const { pathname, search } = useLocation()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [signedIn] = useSignedIn()
  const mode = params.get('auth')
  const open = !signedIn && (mode === 'login' || mode === 'register')
  const go = (value: string) => navigate(`${pathname}${withQuery(search, 'auth', value)}`, { replace: true })
  const close = () => go('')

  return (
    <Modal open={open} onClose={close} label={t(mode === 'register' ? u.registerTitle : u.loginTitle)} closeLabel={t(u.closeModal)}>
      {mode === 'register' ? (
        <RegisterForm onDone={close} switchLink={<Link to={`${pathname}${withQuery(search, 'auth', 'login')}`} replace>{t(u.signIn)}</Link>} />
      ) : (
        <SignInForm onDone={close} switchLink={<Link to={`${pathname}${withQuery(search, 'auth', 'register')}`} replace>{t(u.goRegister)}</Link>} />
      )}
    </Modal>
  )
}
