import { ValidationBuilder } from '@/validation/validators/validationBuilder'
import { RequiredFieldValidation } from '@/validation/validators'

type Sut = {
  sut: ValidationBuilder
}

const makeSut = (fieldName: string): Sut => {
  const sut = ValidationBuilder.field(fieldName)
  return {
    sut
  }
}

describe('Validation Builder', () => {
  test('Should return RequiredFieldValidation', () => {
    const field = 'any_field'
    const { sut } = makeSut(field)
    const validations = sut.required().build()
    expect(validations.length).toBe(1)
    expect(validations[0]).toEqual(new RequiredFieldValidation(field))
  })
})
