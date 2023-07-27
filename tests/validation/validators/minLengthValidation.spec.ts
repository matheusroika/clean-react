import { NotMinLengthError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators/minLengthValidation'

type Sut = {
  sut: MinLengthValidation
}

const makeSut = (minLength: number = 5): Sut => {
  const sut = new MinLengthValidation('any_field', minLength)
  return {
    sut
  }
}

describe('Minimum Length Validation', () => {
  test('Should return error if value length is less than required', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      any_field: '123'
    })
    expect(error).toEqual(new NotMinLengthError(5))
  })

  test('Should return null if value length is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      any_field: '12345'
    })
    expect(error).toBeNull()
  })

  test('Should return null if field provided does not exists', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      other_field: '12345'
    })
    expect(error).toBeNull()
  })
})
