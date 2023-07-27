import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { makeEmailValidator } from '../../validation/emailValidatorFactory'
import type { Validation } from '@/presentation/protocols/validation'

export const makeSignUpValidation = (): Validation => {
  return new ValidationComposite([
    ...ValidationBuilder.field('name').required().build(),
    ...ValidationBuilder.field('email').required().email(makeEmailValidator()).build(),
    ...ValidationBuilder.field('password').required().minLength(5).build(),
    ...ValidationBuilder.field('passwordConfirmation').required().compare('password').build()
  ])
}
