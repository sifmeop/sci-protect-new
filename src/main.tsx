import { AuthWrapper } from 'components/layout/AuthWrapper.tsx'
import { ReduxProvider } from 'providers/ReduxProvider.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Router } from './providers/Router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider>
      <AuthWrapper>
        <Router />
      </AuthWrapper>
    </ReduxProvider>
  </React.StrictMode>
)
