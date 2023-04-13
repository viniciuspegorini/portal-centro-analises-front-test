import React, { useState, useContext } from 'react'

import { AuthContext } from './contexts/authContext'

export const App = () => {
  const { login } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    console.log('chamou')
    login(username, password)
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  )
}
