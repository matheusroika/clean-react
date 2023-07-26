import type { Validation } from '../protocols/validation'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (fieldName: string, fieldValue: string): string | null {
      return fieldValue ? null : 'Campo inválido'
    }
  }

  return new ValidationStub()
}
