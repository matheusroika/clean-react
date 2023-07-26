import { InvalidFieldError } from '../errors'
import type { FieldValidation } from '../protocols/fieldValidation'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate (value: string): Error {
    return value === this.valueToCompare ? null : new InvalidFieldError()
  }
}
