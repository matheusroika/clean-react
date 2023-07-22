import { RequiredFieldValidation } from '@/validation/validators/requiredFieldValidation'
import { RequiredFieldError } from '@/validation/errors'

type Sut = {
  sut: RequiredFieldValidation
}

const makeSut = (): Sut => {
  const sut = new RequiredFieldValidation('email')
  return {
    sut
  }
}

describe('Required Field Validation', () => {
  test('Should return an error if field is empty', () => {
    const { sut } = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
