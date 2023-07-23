import { ValidationBuilder as sut } from '@/validation/validators/validationBuilder'
import { RequiredFieldValidation } from '@/validation/validators'

describe('Validation Builder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = 'any_field'
    const validations = sut.field(field).required().build()
    expect(validations.length).toBe(1)
    expect(validations[0]).toEqual(new RequiredFieldValidation(field))
  })
})
