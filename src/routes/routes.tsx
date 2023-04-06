import React from 'react'

import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'

type RouteProps = {
  path: () => string
  component: React.ReactNode
}

type RoutesProps = {
  [key: string]: RouteProps
}

export const ROUTES = Object.freeze<RoutesProps>({
  login: {
    path: () => '/login',
    component: <LoginPage />
  },
  home: {
    path: () => '/home',
    component: <HomePage />
  }
})
