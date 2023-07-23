import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators'
import type { FieldValidation } from '../protocols/fieldValidation'
import type { EmailValidator } from '../protocols/emailValidator'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email (emailValidator: EmailValidator): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName, emailValidator))
    return this
  }

  minLength (minLength: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, minLength))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
