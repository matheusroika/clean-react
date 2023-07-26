import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './signUpStyles.scss'
import Header from '@/presentation/components/authHeader/authHeader'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'
import FormStatus from '@/presentation/components/formStatus/formStatus'

const SignUp: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [nameError] = useState('')
  const [emailError] = useState('')
  const [passwordError] = useState('')
  const [passwordConfirmationError] = useState('')
  const [isLoading] = useState(false)
  const [message] = useState('')

  return (
    <div className={styles.signUp}>
      <Header />
      <main>
        <form className={styles.form} data-testid="form">
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" title={nameError} value={name} setValue={setName} />
          <Input type="email" name="email" placeholder="Digite seu e-mail" title={emailError} value={email} setValue={setEmail} />
          <Input type="password" name="password" placeholder="Digite sua senha" title={passwordError} value={password} setValue={setPassword} />
          <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" title={passwordConfirmationError} value={passwordConfirmation} setValue={setPasswordConfirmation} />
          <button data-testid="submit" type="submit" disabled={!!passwordError || !!emailError}>Cadastrar</button>
          <span className={styles.link}>
            <Link data-testid="login" to="/login">Fazer login</Link>
          </span>
          <FormStatus isLoading={isLoading} message={message} />
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default SignUp
