import { InvalidFieldError } from '../errors'
import type { EmailValidator } from '../protocols/emailValidator'
import type { FieldValidation } from '../protocols/fieldValidation'

export class EmailValidation implements FieldValidation {
  constructor (
    private readonly emailValidator: EmailValidator,
    readonly field: string = 'email'
  ) {}

  validate (value: string): Error {
    const isValid = this.emailValidator.isValid(value)
    return isValid ? null : new InvalidFieldError('email')
  }
}
