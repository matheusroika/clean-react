import React, { useState, useEffect } from 'react'
import styles from './loginStyles.scss'
import Header from '@/presentation/components/authHeader/authHeader'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'
import FormStatus from '@/presentation/components/formStatus/formStatus'
import type { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }) => {
  const [email, setEmail] = useState('')
  const [emailRequirement] = useState('Campo obrigatório')
  const [passwordRequirement] = useState('Campo obrigatório')
  const [isLoading] = useState(false)
  const [message] = useState('')

  useEffect(() => {
    validation.validate({ email })
  }, [email])

  return (
    <div className={styles.login}>
      <Header />
      <main>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" title={emailRequirement} value={email} onChange={(e) => { setEmail(e.target.value) }} />
          <Input type="password" name="password" placeholder="Digite sua senha" title={passwordRequirement} />
          <button data-testid="submit" type="submit" disabled>Entrar</button>
          <span className={styles.link}>
            <a href="">Criar conta</a>
          </span>
          <FormStatus isLoading={isLoading} message={message} />
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default Login
