import { InvalidFieldError } from '../errors'
import type { EmailValidator } from '../protocols/emailValidator'
import type { FieldValidation } from '../protocols/fieldValidation'

export class EmailValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (value: string): Error {
    const isValid = this.emailValidator.isValid(value)
    return (isValid || !value) ? null : new InvalidFieldError()
  }
}
