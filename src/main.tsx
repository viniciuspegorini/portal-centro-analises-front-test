import React from 'react'

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Router } from './routes'
import { ResetStyle, theme } from '@/styles'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        {/* <AuthProvider> */}
        <Router />
        <ResetStyle />
        {/* </AuthProvider> */}
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>
)
