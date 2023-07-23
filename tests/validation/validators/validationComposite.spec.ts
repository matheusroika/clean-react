import { ValidationComposite } from '@/validation/validators/validationComposite'
import { mockValidation } from '../mocks/mockValidation'
import type { FieldValidation } from '../protocols/fieldValidation'

type Sut = {
  sut: ValidationComposite
  validationStubs: FieldValidation[]
}

const makeSut = (): Sut => {
  const validationStubs = [mockValidation('any_field'), mockValidation('other_field')]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should return the error message if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error('any_error_message'))
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('any_error_message')
  })
})
