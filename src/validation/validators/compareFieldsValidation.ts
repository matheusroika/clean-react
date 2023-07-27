import { InvalidFieldError } from '../errors'
import type { FieldValidation, InputObject } from '../protocols/fieldValidation'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (input: InputObject): Error {
    return input[this.field] === input[this.fieldToCompare] ? null : new InvalidFieldError()
  }
}
