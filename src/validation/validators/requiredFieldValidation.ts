import { RequiredFieldError } from '../errors'
import type { FieldValidation } from '../protocols/fieldValidation'

export class RequiredFieldValidation implements FieldValidation {
  constructor (
    readonly field: string
  ) {}

  validate (value: string): Error {
    return new RequiredFieldError()
  }
}
