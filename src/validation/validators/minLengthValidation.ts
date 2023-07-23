import { NotMinLengthError } from '../errors'
import type { FieldValidation } from '../protocols/fieldValidation'

export class MinLengthValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly minLength: number
  ) {}

  validate (value: string): Error {
    return value.length >= this.minLength ? null : new NotMinLengthError(this.field, this.minLength)
  }
}
