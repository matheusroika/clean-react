import type { Validation } from '@/presentation/protocols/validation'
import type { FieldValidation, InputObject } from '../protocols/fieldValidation'

export class ValidationComposite implements Validation {
  constructor (
    private readonly validations: FieldValidation[]
  ) {}

  validate (fieldName: string, input: InputObject): string {
    const fieldValidations = this.validations.filter(validation => validation.field === fieldName)
    for (const validation of fieldValidations) {
      const error = validation.validate(input)
      if (error) return error.message
    }
    return null
  }
}
