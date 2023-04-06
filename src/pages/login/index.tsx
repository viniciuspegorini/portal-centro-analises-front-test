import React, { useCallback, useState } from 'react'

import { Button } from '@material-ui/core'

import { TextField } from '@/components'
import { AuthContainerTemplate } from '@/templates/containers/auth'

export type LoginUserParams = {
  email: string
  password: string
}

export const LoginPage: React.FC = () => {
  // const authHookData = useAuth()
  //   const { loading, handleSignIn } = authHookData

  const [formData, setFormData] = useState<LoginUserParams>({
    email: '',
    password: ''
  })

  const handleSubmit = useCallback(async () => {
    // await handleSignIn(formData)
    //   }, [formData, handleSignIn])
  }, [formData])
  return (
    <AuthContainerTemplate
      title="Bem vindo!"
      description="Digite seus dados para continuar"
      body={
        <>
          <TextField
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={formData?.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
          />

          <TextField
            label="Senha"
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
          />
        </>
      }
      footer={
        <>
          <Button type="submit">Entrar</Button>
          <Button type="submit">Cadastro</Button>
        </>
      }
      handleSubmit={handleSubmit}
    />
  )
}
