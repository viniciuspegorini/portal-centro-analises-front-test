import React from 'react'

import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'

import { AuthProvider } from './contexts/authContext'
import { App } from '@/App'
import { ResetStyle, theme } from '@/styles'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <AuthProvider>
        <App />
        <ResetStyle />
      </AuthProvider>
    </React.StrictMode>
  </ThemeProvider>
)
