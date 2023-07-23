import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './loginStyles.scss'
import Header from '@/presentation/components/authHeader/authHeader'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'
import FormStatus from '@/presentation/components/formStatus/formStatus'
import type { Validation } from '@/presentation/protocols/validation'
import type { Authentication } from '@/domain/useCases/Authentication'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setEmailError(validation.validate('email', email))
  }, [email])

  useEffect(() => {
    setPasswordError(validation.validate('password', password))
  }, [password])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)
    if (isLoading || emailError || passwordError) return
    try {
      const account = await authentication.auth({
        email,
        password
      })
      localStorage.setItem('accessToken', account.accessToken)
      setIsLoading(false)
      navigate('/')
    } catch (error) {
      const errorTyped = error as Error
      setIsLoading(false)
      setMessage(errorTyped.message)
    }
  }

  return (
    <div className={styles.login}>
      <Header />
      <main>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" title={emailError} value={email} setValue={setEmail} />
          <Input type="password" name="password" placeholder="Digite sua senha" title={passwordError} value={password} setValue={setPassword} />
          <button data-testid="submit" type="submit" disabled={!!passwordError || !!emailError} onClick={handleSubmit}>Entrar</button>
          <span className={styles.link}>
            <Link data-testid="signup" to="/signup">Criar conta</Link>
          </span>
          <FormStatus isLoading={isLoading} message={message} />
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default Login
