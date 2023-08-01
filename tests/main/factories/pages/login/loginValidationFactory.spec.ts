import { makeLoginValidation } from '@/main/factories/pages/login/loginValidationFactory'
import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeEmailValidator } from '@/main/factories/validation/emailValidatorFactory'

describe('Login Validation Factory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(new ValidationComposite([
      new RequiredFieldValidation('email'),
      new EmailValidation('email', makeEmailValidator()),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5)
    ]))
  })
})
