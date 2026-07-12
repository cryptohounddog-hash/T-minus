import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-grid-layout/css/styles.css'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'

// Mount into a container we create and append directly to <body>, rather than
// rendering into whatever element happens to already be in the page (e.g. an
// embedded HTML block deep inside a page builder's own wrapper divs). Some of
// those wrapper elements apply CSS transforms/filters, which silently break
// `position: fixed` on a nested descendant by giving it a new containing
// block instead of the viewport. Being a direct child of <body> avoids that
// entirely, so the app reliably covers the full screen no matter where the
// original mount point was embedded.
const container = document.createElement('div')
container.className = 'tminus-app-root'
document.body.appendChild(container)

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
