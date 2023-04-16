import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

import toast from 'react-hot-toast'

import { useHistory, useLocalStorage } from '@/hooks'
import { api } from '@/services/api'
import { LoginParams, LoginResponseProps, login } from '@/services/api/auth'

type AuthContextProps = {
  auth: LoginResponseProps | null
  loading: boolean

  handleSignIn: (params: LoginParams) => Promise<void>
  handleSignOut: () => void
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { navigateToSignedBasePath } = useHistory()
  const localStorage = useLocalStorage()

  const [authData, setAuthData] = useState<AuthContextProps['auth'] | null>(
    () => {
      const auth = localStorage.get(localStorage.LOCAL_STORAGE_KEYS.AUTH)

      if (auth) return auth
      return null
    }
  )

  const [loading, setLoading] = useState(false)

  const handleSignIn = useCallback(
    async (params: LoginParams) => {
      try {
        setLoading(true)

        const loggedUser = await login(params)

        setAuthData(loggedUser)
        navigateToSignedBasePath()
      } catch {
        // ToDo: improve error message according to API error
        toast.error('Erro inesperado, tente novamente mais tarde')
      } finally {
        setLoading(false)
      }
    },
    [navigateToSignedBasePath]
  )

  const handleSignOut = useCallback(() => {
    setAuthData(null)
  }, [])

  useEffect(() => {
    if (authData) {
      localStorage.set(localStorage.LOCAL_STORAGE_KEYS.AUTH, authData)
      api.defaults.headers.Authorization = `Bearer ${authData.token}`
      return
    }

    delete api.defaults.headers.Authorization
    localStorage.remove(localStorage.LOCAL_STORAGE_KEYS.AUTH)
  }, [authData, localStorage])

  const providerProps = useMemo(
    () => ({
      auth: authData,
      loading,
      handleSignIn,
      handleSignOut
    }),
    [authData, handleSignIn, handleSignOut, loading]
  )

  return (
    <AuthContext.Provider value={providerProps}>
      {children}
    </AuthContext.Provider>
  )
}
