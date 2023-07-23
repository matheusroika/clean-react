import React from 'react'
import Login from '@/presentation/pages/login/login'
import { RemoteAuthentication } from '@/data/useCases/authentication/RemoteAuthentication'
import { AxiosHttpClient } from '@/infra/http/AxiosHttpClient'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { EmailValidatorAdapter } from '@/infra/validators/emailValidatorAdapter'
import { apiUrl } from '@/main/config/env'

export const makeLogin: React.FC = () => {
  const url = `${apiUrl}/login` || 'http://localhost:5050/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const emailValidator = new EmailValidatorAdapter()
  const validations = [
    ...ValidationBuilder.field('email').required().email(emailValidator).build(),
    ...ValidationBuilder.field('password').required().minLength(5).build()
  ]
  const validationComposite = new ValidationComposite(validations)

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
