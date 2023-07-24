import validator from 'validator'
import { EmailValidatorAdapter } from '@/infra/validators/emailValidatorAdapter'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

type Sut = {
  sut: EmailValidatorAdapter
}

const makeSut = (): Sut => {
  const sut = new EmailValidatorAdapter()
  return {
    sut
  }
}

describe('Email Validator Adapter', () => {
  test('Should call validator.isEmail with correct email', () => {
    const { sut } = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any@email.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any@email.com')
  })
})
