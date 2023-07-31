import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiContext from '@/presentation/contexts/apiContext'
import styles from './signUpStyles.scss'
import Header from '@/presentation/components/authHeader/authHeader'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'
import FormStatus from '@/presentation/components/formStatus/formStatus'
import type { Validation } from '@/presentation/protocols/validation'
import type { AddAccount } from '@/domain/useCases/AddAccount'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }) => {
  const { setCurrentAccount } = useContext(apiContext)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const errors = [nameError, emailError, passwordError, passwordConfirmationError]
  const haveError = errors.some(error => error !== ('' || null))
  const formValues = {
    name,
    email,
    password,
    passwordConfirmation
  }

  useEffect(() => {
    setNameError(validation.validate('name', formValues))
  }, [name])

  useEffect(() => {
    setEmailError(validation.validate('email', formValues))
  }, [email])

  useEffect(() => {
    setPasswordError(validation.validate('password', formValues))
  }, [password])

  useEffect(() => {
    setPasswordConfirmationError(validation.validate('passwordConfirmation', formValues))
  }, [password, passwordConfirmation])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    e.preventDefault()
    if (isLoading || haveError) return
    setIsLoading(true)
    try {
      const account = await addAccount.add(formValues)
      setCurrentAccount(account)
      setIsLoading(false)
      navigate('/')
    } catch (error) {
      const errorTyped = error as Error
      setIsLoading(false)
      setMessage(errorTyped.message)
    }
  }

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
          <button data-testid="submit" type="submit" disabled={haveError} onClick={handleSubmit}>Cadastrar</button>
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
