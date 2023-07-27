import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { makeEmailValidator } from '../../validation/emailValidatorFactory'
import type { Validation } from '@/presentation/protocols/validation'

export const makeLoginValidation = (): Validation => {
  return new ValidationComposite([
    ...ValidationBuilder.field('email').required().email(makeEmailValidator()).build(),
    ...ValidationBuilder.field('password').required().minLength(5).build()
  ])
}
