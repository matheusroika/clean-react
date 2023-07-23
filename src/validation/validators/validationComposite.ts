import type { Validation } from '@/presentation/protocols/validation'
import type { FieldValidation } from '../protocols/fieldValidation'

export class ValidationComposite implements Validation {
  constructor (
    private readonly validations: FieldValidation[]
  ) {}

  validate (fieldName: string, fieldValue: string): string {
    const fieldValidations = this.validations.filter(validation => validation.field === fieldName)
    for (const validation of fieldValidations) {
      const error = validation.validate(fieldValue)
      if (error) return error.message
    }
    return null
  }
}
