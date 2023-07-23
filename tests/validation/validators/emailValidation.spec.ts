import { EmailValidation } from '@/validation/validators/emailValidation'
import { mockEmailValidator } from '../mocks/mockValidation'
import { InvalidFieldError } from '@/validation/errors'
import type { EmailValidator } from '@/validation/protocols/emailValidator'

type Sut = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): Sut => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new EmailValidation(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate('any@email.com')
    expect(isValidSpy).toHaveBeenCalledWith('any@email.com')
  })

  test('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate('not_email')
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  test('Should return null if EmailValidator returns true', () => {
    const { sut } = makeSut()
    const error = sut.validate('any@email.com')
    expect(error).toBeNull()
  })
})
