import { Login } from './types'
import { api } from '..'

export const login: Login = async ({ email, password }) => {
  const {
    data: { token }
  } = await api.post('/login', {
    username: email,
    password
  })

  return {
    token
  }
}
