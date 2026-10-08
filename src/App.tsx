import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { Hub } from './hub/Hub'
import { useLang } from './i18n'
import { Moodboard } from './moodboard/Moodboard'
import { Placeholder } from './prototypes/Placeholder'
import { findPrototype } from './prototypes/registry'
import { Shell } from './shell/Shell'
import { strings } from './shell/strings'
import { Button } from './ui'

function PrototypeRoute() {
  const { prototypeId = '' } = useParams()
  const { t } = useLang()
  const prototype = findPrototype(prototypeId)
  if (!prototype) {
    return (
      <div className="section stack" style={{ alignItems: 'center' }}>
        <h1>{t(strings.notFound)}</h1>
        <Button to="/">{t(strings.backToHub)}</Button>
      </div>
    )
  }
  const Component = prototype.Component
  return <Shell prototype={prototype}>{Component ? <Component /> : <Placeholder prototype={prototype} />}</Shell>
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/moodboard" element={<Moodboard />} />
        <Route path="/:prototypeId/*" element={<PrototypeRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
