import { makeSignUpValidation } from '@/main/factories/pages/signUp/signUpValidationFactory'
import { CompareFieldsValidation, EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeEmailValidator } from '@/main/factories/validation/emailValidatorFactory'

describe('Sign Up Validation Factory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(new ValidationComposite([
      new RequiredFieldValidation('name'),
      new RequiredFieldValidation('email'),
      new EmailValidation('email', makeEmailValidator()),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5),
      new RequiredFieldValidation('passwordConfirmation'),
      new CompareFieldsValidation('passwordConfirmation', 'password')
    ]))
  })
})
