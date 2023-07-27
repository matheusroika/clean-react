import { RequiredFieldError } from '../errors'
import type { FieldValidation, InputObject } from '../protocols/fieldValidation'

export class RequiredFieldValidation implements FieldValidation {
  constructor (
    readonly field: string
  ) {}

  validate (input: InputObject): Error {
    return input[this.field] ? null : new RequiredFieldError()
  }
}
