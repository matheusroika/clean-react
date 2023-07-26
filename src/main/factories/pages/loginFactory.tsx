import React from 'react'
import Login from '@/presentation/pages/login/login'
import { makeRemoteAuthentication } from '../useCases/authentication/remoteAuthenticationFactory'
import { makeLoginValidation } from './loginValidationFactory'
import { makeLocalSaveAccessToken } from '../useCases/saveAccessToken/localSaveAccessTokenFactory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
