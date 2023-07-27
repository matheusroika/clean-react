import React from 'react'
import SignUp from '@/presentation/pages/signUp/signUp'
import { makeRemoteAddAccount } from '../../useCases/addAccount/remoteAddAccountFactory'
import { makeSignUpValidation } from './signUpValidationFactory'
import { makeLocalSaveAccessToken } from '../../useCases/saveAccessToken/localSaveAccessTokenFactory'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
