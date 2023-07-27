import type { InputObject } from '@/validation/protocols/fieldValidation'

export interface Validation {
  validate: (fieldName: string, input: InputObject) => string | null
}
