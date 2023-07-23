import { ValidationBuilder as sut } from '@/validation/validators/validationBuilder'
import { EmailValidation, MinLengthValidation, RequiredFieldValidation } from '@/validation/validators'
import { mockEmailValidator } from '../mocks/mockValidation'

describe('Validation Builder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = 'any_field'
    const validations = sut.field(field).required().build()
    expect(validations.length).toBe(1)
    expect(validations[0]).toEqual(new RequiredFieldValidation(field))
  })

  test('Should return EmailValidation', () => {
    const field = 'any_field'
    const emailValidator = mockEmailValidator()
    const validations = sut.field(field).email(emailValidator).build()
    expect(validations.length).toBe(1)
    expect(validations[0]).toEqual(new EmailValidation(field, emailValidator))
  })

  test('Should return MinLengthValidation', () => {
    const field = 'any_field'
    const minLength = 5
    const validations = sut.field(field).minLength(minLength).build()
    expect(validations.length).toBe(1)
    expect(validations[0]).toEqual(new MinLengthValidation(field, minLength))
  })
})
