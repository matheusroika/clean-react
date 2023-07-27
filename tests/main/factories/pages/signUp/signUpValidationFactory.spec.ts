import { makeSignUpValidation } from '@/main/factories/pages/signUp/signUpValidationFactory'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { makeEmailValidator } from '@/main/factories/validation/emailValidatorFactory'

describe('Sign Up Validation Factory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(new ValidationComposite([
      ...ValidationBuilder.field('name').required().build(),
      ...ValidationBuilder.field('email').required().email(makeEmailValidator()).build(),
      ...ValidationBuilder.field('password').required().minLength(5).build(),
      ...ValidationBuilder.field('passwordConfirmation').required().compare('password').build()
    ]))
  })
})
