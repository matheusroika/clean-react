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
    const error = sut.validate('123')
    expect(error).toEqual(new NotMinLengthError(5))
  })

  test('Should return null if value length is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate('12345')
    expect(error).toBeNull()
  })
})
