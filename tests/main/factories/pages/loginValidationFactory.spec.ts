import { makeLoginValidation } from '@/main/factories/pages/loginValidationFactory'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { makeEmailValidator } from '@/main/factories/validation/emailValidatorFactory'

describe('Login Validation Factory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(new ValidationComposite([
      ...ValidationBuilder.field('email').required().email(makeEmailValidator()).build(),
      ...ValidationBuilder.field('password').required().minLength(5).build()
    ]))
  })
})
