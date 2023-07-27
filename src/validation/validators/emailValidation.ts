import { InvalidFieldError } from '../errors'
import type { EmailValidator } from '../protocols/emailValidator'
import type { FieldValidation, InputObject } from '../protocols/fieldValidation'

export class EmailValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: InputObject): Error {
    const isValid = this.emailValidator.isValid(input[this.field])
    return (isValid || !input[this.field]) ? null : new InvalidFieldError()
  }
}
