import { EmailValidatorAdapter } from '@/infra/validators/emailValidatorAdapter'
import type { EmailValidator } from '@/validation/protocols/emailValidator'

export const makeEmailValidator = (): EmailValidator => {
  return new EmailValidatorAdapter()
}
