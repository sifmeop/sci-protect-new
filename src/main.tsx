import { AuthWrapper } from 'components/layout/AuthWrapper.tsx'
import { ReduxProvider } from 'providers/ReduxProvider.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import './index.css'
import { Router } from './providers/Router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider>
      <ToastContainer />
      <AuthWrapper>
        <Router />
      </AuthWrapper>
    </ReduxProvider>
  </React.StrictMode>
)
