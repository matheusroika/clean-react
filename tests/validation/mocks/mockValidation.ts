import type { EmailValidator } from '@/validation/protocols/emailValidator'
import type { FieldValidation, InputObject } from '../protocols/fieldValidation'

export const mockEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return !!email
    }
  }
  return new EmailValidatorStub()
}

export const mockValidation = (field: string): FieldValidation => {
  class ValidationStub implements FieldValidation {
    constructor (readonly field: string) {}

    validate (input: InputObject): Error {
      return null
    }
  }
  return new ValidationStub(field)
}
