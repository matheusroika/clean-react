import { CompareFieldsValidation } from '@/validation/validators/compareFieldsValidation'
import { InvalidFieldError } from '@/validation/errors'

type Sut = {
  sut: CompareFieldsValidation
}

const makeSut = (): Sut => {
  const sut = new CompareFieldsValidation('any_field', 'other_field')
  return {
    sut
  }
}

describe('Compare Fields Validation', () => {
  test('Should return an error if fields values are different', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      any_field: 'any_value',
      other_field: 'other_value'
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return null if fields values are equal', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      any_field: 'any_value',
      other_field: 'any_value'
    })
    expect(error).toBeNull()
  })
})
