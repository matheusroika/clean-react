import type { Validation } from '../protocols/validation'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (fieldName: string, fieldValue: string): string | null {
      return 'Campo obrigatório'
    }
  }

  return new ValidationStub()
}
