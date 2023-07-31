import React from 'react'
import SignUp from '@/presentation/pages/signUp/signUp'
import { makeRemoteAddAccount } from '../../useCases/addAccount/remoteAddAccountFactory'
import { makeSignUpValidation } from './signUpValidationFactory'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
