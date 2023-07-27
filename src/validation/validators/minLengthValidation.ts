import { NotMinLengthError } from '../errors'
import type { FieldValidation, InputObject } from '../protocols/fieldValidation'

export class MinLengthValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly minLength: number
  ) {}

  validate (input: InputObject): Error {
    return input[this.field]?.length < this.minLength ? new NotMinLengthError(this.minLength) : null
  }
}
