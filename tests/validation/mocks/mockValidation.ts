import type { EmailValidator } from '@/validation/protocols/emailValidator'
import type { FieldValidation, InputObject } from '../protocols/fieldValidation'
import type { Validation } from '@/presentation/protocols/validation'
import type { AuthParams } from '@/domain/useCases/Authentication'
import type { AddAccountParams } from '@/domain/useCases/AddAccount'

export const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return !!email
    }
  }
  return new EmailValidatorStub()
}

export const mockFieldValidation = (field: string): FieldValidation => {
  class FieldValidationStub implements FieldValidation {
    constructor (readonly field: string) {}

    validate (input: InputObject): Error {
      return null
    }
  }
  return new FieldValidationStub(field)
}

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
