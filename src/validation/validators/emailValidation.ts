import { InvalidFieldError } from '../errors/invalidFieldError'
import type { EmailValidator } from '../protocols/emailValidator'
import type { FieldValidation } from '../protocols/fieldValidation'

export class EmailValidation implements FieldValidation {
  constructor (
    private readonly emailValidator: EmailValidator,
    readonly field: string = 'email'
  ) {}

  validate (value: string): Error {
    const isValid = this.emailValidator.isValid(value)
    if (!isValid) {
      return new InvalidFieldError('email')
    }
    return null
  }
}
