import {
  createContext,
  useState,
  useEffect,
  SetStateAction,
  ReactNode,
  useMemo
} from 'react'

import axios from 'axios'

interface AuthProviderProps {
  children: ReactNode // definindo o tipo da prop `children` como `ReactNode`
}

interface User {
  // definindo os tipos da interface `User`
  email: string
}

interface Credentials {
  // definindo os tipos da interface `Credentials`
  jwt: string
}

interface AuthContextType {
  user: null | User
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

// Criando um contexto para armazenar informações de autenticação

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false
})

// Componente que envolve os elementos que deseja compartilhar o contexto
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null)
  const isAuthenticated = Boolean(user)

  // Função para fazer login
  async function login(credentials: any) {
    try {
      const response = await axios.post('/v1/users', credentials)
      setUser(response.data.user)
      localStorage.setItem('token', response.data.token) // Armazenando o token no localStorage
    } catch (error) {
      console.error(error)
    }
  }

  // Verificando se o usuário já está logado ao carregar a página
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${storedToken}` // Setando o header de autorização com o token
      axios
        .get('/v1/users')
        .then((response: { data: { user: SetStateAction<null> } }) => {
          setUser(response.data.user)
        })
        .catch((error: any) => {
          console.error(error)
        })
    }
  }, [])

  // Função para fazer logout
  function logout() {
    setUser(null)
    localStorage.removeItem('token')
    delete axios.defaults.headers.common.Authorization // Removendo o header de autorização
  }

  // Objeto com as informações de autenticação
  const authState = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: !!user
    }),
    [user, login, logout, isAuthenticated]
  )

  // Retornando o provider com as informações do contexto
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  )
}
