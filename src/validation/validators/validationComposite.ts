import type { Validation } from '@/presentation/protocols/validation'
import type { FieldValidation } from '../protocols/fieldValidation'

export class ValidationComposite implements Validation {
  constructor (
    private readonly validations: FieldValidation[]
  ) {}

  validate (fieldName: string, fieldValue: string): string {
    return 'any_error_message'
  }
}
