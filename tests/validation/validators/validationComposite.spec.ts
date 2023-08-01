import { ValidationComposite } from '@/validation/validators'
import { mockFieldValidation } from '../mocks/mockValidation'
import type { FieldValidation } from '../protocols/fieldValidation'

type Sut = {
  sut: ValidationComposite
  validationStubs: FieldValidation[]
}

const makeSut = (): Sut => {
  const validationStubs = [mockFieldValidation('any_field'), mockFieldValidation('other_field')]
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
    const error = sut.validate('any_field', {
      any_field: 'any_value'
    })
    expect(error).toBe('any_error_message')
  })

  test('Should return the first error message if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error('first_error_message'))
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new Error('second_error_message'))
    const error = sut.validate('any_field', {
      any_field: 'any_value'
    })
    expect(error).toEqual('first_error_message')
  })

  test('Should return null if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate('any_field', {
      any_field: 'any_value'
    })
    expect(error).toBeNull()
  })
})
