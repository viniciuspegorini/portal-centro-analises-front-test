import React, { useMemo, useState } from 'react'

import axios from 'axios'

interface AuthContextData {
  isAuthenticated: boolean
  login: (username: string, password: string) => void
}

const AuthContext = React.createContext<AuthContextData>({
  isAuthenticated: false,
  login: () => {}
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null)
  const isAuthenticated = Boolean(user)

  async function login(username: string, password: string) {
    // Validação do usuário e senha aqui.
    try {
      const response = await axios.post('http://localhost:8085/api/login', {
        username,
        password
      })
      setUser(response.data.user)
      localStorage.setItem('token', response.data.token) // Armazenando o token no localStorage
    } catch (error) {
      console.error(error)
    }
  }
  // Objeto com as informações de autenticação
  const authState = useMemo(
    () => ({
      login,
      isAuthenticated: !!user
    }),
    [login, isAuthenticated]
  )

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
