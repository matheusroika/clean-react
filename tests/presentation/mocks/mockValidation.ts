import type { Validation } from '../protocols/validation'
import type { InputObject } from '@/validation/protocols/fieldValidation'
import type { AuthParams } from '@/domain/useCases/Authentication'
import type { AddAccountParams } from '@/domain/useCases/AddAccount'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (fieldName: string, input: InputObject): string | null {
      return input[fieldName] ? null : 'Campo inválido'
    }
  }
  return new ValidationStub()
}

const mockEmptyValidateCall = (isSignUp?: boolean): AuthParams | AddAccountParams => {
  const auth = {
    email: '',
    password: ''
  }
  const addAccount = {
    ...auth,
    name: '',
    passwordConfirmation: ''
  }
  return isSignUp ? addAccount : auth
}

export const mockValidateCall = (fieldName: string, fieldValue: string, isSignUp?: boolean): AuthParams | AddAccountParams => {
  const emptyCall = mockEmptyValidateCall(isSignUp)
  const call = {
    ...emptyCall,
    [fieldName]: fieldValue
  }
  return call
}
