import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Router
import { AppRoutes } from './router/routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes /> 
  </StrictMode>,
)
