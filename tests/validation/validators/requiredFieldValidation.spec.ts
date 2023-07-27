import { RequiredFieldValidation } from '@/validation/validators/requiredFieldValidation'
import { RequiredFieldError } from '@/validation/errors'

type Sut = {
  sut: RequiredFieldValidation
}

const makeSut = (): Sut => {
  const sut = new RequiredFieldValidation('any_field')
  return {
    sut
  }
}

describe('Required Field Validation', () => {
  test('Should return an error if field is empty', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      any_field: ''
    })
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return null if field is not empty', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      any_field: 'any_value'
    })
    expect(error).toBeNull()
  })
})
