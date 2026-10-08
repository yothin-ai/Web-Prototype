import '@fontsource-variable/inter'
import '@fontsource/noto-sans-thai/400.css'
import '@fontsource/noto-sans-thai/500.css'
import '@fontsource/noto-sans-thai/700.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { DatasetProvider } from './datasets/DatasetContext'
import { LanguageProvider } from './i18n'
import { injectTokens } from './tokens/inject'

injectTokens()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <DatasetProvider>
        <App />
      </DatasetProvider>
    </LanguageProvider>
  </StrictMode>,
)
