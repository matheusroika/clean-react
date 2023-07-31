import React from 'react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import SignUp from '@/presentation/pages/signUp/signUp'
import ApiContext from '@/presentation/contexts/apiContext'
import { EmailInUseError } from '@/domain/errors'
import { testHelper, mockValidation, mockAddAccount, mockValidateCall } from '../../mocks'
import { mockAccount, mockAddAccountParams } from '@/../tests/domain/mocks'
import type { RenderResult } from '@testing-library/react'
import type { Validation } from '@/presentation/protocols/validation'
import type { AddAccount } from '@/domain/useCases/AddAccount'
import type { Account } from '@/domain/models/Account'

type Sut = {
  sut: RenderResult
  validationStub: Validation
  addAccountStub: AddAccount
  setCurrentAccountStub: (account: Account) => void
}

const makeSut = (mockMessage?: string): Sut => {
  const validationStub = mockValidation()
  if (mockMessage) jest.spyOn(validationStub, 'validate').mockReturnValue(mockMessage)
  const addAccountStub = mockAddAccount()
  const setCurrentAccountStub = jest.fn()
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountStub }}>
      <MemoryRouter initialEntries={['/signup']}>
        <Routes>
          <Route path='/signup' element={<SignUp validation={validationStub} addAccount={addAccountStub} />} />
          <Route path='/' element={<h1>Test Pass Index</h1>} />
          <Route path='/login' element={<h1>Test Pass Login</h1>} />
        </Routes>
      </MemoryRouter>
    </ApiContext.Provider>
  )

  return {
    sut,
    validationStub,
    addAccountStub,
    setCurrentAccountStub
  }
}

describe('Sign page', () => {
  afterEach(cleanup)

  test('Should render correctly on initial state', () => {
    const error = 'Campo obrigatório'
    const { sut } = makeSut(error)
    testHelper.expectElementToNotExist(sut, 'modalWrapper')
    testHelper.expectButtonDisabledProperty({ sut, buttonId: 'submit', isDisabled: true })
    testHelper.expectFieldStatus({ sut, fieldName: 'name', titleContent: error, textContent: '🔴' })
    testHelper.expectFieldStatus({ sut, fieldName: 'email', titleContent: error, textContent: '🔴' })
    testHelper.expectFieldStatus({ sut, fieldName: 'password', titleContent: error, textContent: '🔴' })
    testHelper.expectFieldStatus({ sut, fieldName: 'passwordConfirmation', titleContent: error, textContent: '🔴' })
  })

  test('Should call Validation with correct name', () => {
    const { sut, validationStub } = makeSut()
    const name = 'Any Name'
    const validateSpy = jest.spyOn(validationStub, 'validate')
    testHelper.fillInput({ sut, inputId: 'name', value: name })
    expect(validateSpy).toHaveBeenCalledWith('name', mockValidateCall('name', name, true))
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationStub } = makeSut()
    const email = 'any@email.com'
    const validateSpy = jest.spyOn(validationStub, 'validate')
    testHelper.fillInput({ sut, inputId: 'email', value: email })
    expect(validateSpy).toHaveBeenCalledWith('email', mockValidateCall('email', email, true))
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationStub } = makeSut()
    const password = 'any_password'
    const validateSpy = jest.spyOn(validationStub, 'validate')
    testHelper.fillInput({ sut, inputId: 'password', value: password })
    expect(validateSpy).toHaveBeenCalledWith('password', mockValidateCall('password', password, true))
  })

  test('Should call Validation with correct password confirmation', () => {
    const { sut, validationStub } = makeSut()
    const passwordConfirmation = 'any_password'
    const validateSpy = jest.spyOn(validationStub, 'validate')
    testHelper.fillInput({ sut, inputId: 'passwordConfirmation', value: passwordConfirmation })
    expect(validateSpy).toHaveBeenCalledWith('passwordConfirmation', mockValidateCall('passwordConfirmation', passwordConfirmation, true))
  })

  test('Should call Validation with password confirmation on password input', () => {
    const { sut, validationStub } = makeSut()
    const passwordConfirmation = 'any_password'
    testHelper.fillInput({ sut, inputId: 'passwordConfirmation', value: passwordConfirmation })
    const validateSpy = jest.spyOn(validationStub, 'validate')
    testHelper.fillInput({ sut, inputId: 'password', value: passwordConfirmation })
    expect(validateSpy).toHaveBeenCalledWith('passwordConfirmation', {
      email: '',
      name: '',
      password: passwordConfirmation,
      passwordConfirmation
    })
  })

  test('Should show message with error if name Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const message = 'Any Message'
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(message)
    testHelper.fillInput({ sut, inputId: 'name', value: 'Any Name' })
    testHelper.expectFieldStatus({ sut, fieldName: 'name', titleContent: message, textContent: '🔴' })
  })

  test('Should show message with error if email Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const message = 'Any Message'
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(message)
    testHelper.fillInput({ sut, inputId: 'email', value: 'any@email.com' })
    testHelper.expectFieldStatus({ sut, fieldName: 'email', titleContent: message, textContent: '🔴' })
  })

  test('Should show message with error if password Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const message = 'Any Message'
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(message)
    testHelper.fillInput({ sut, inputId: 'password', value: 'any_password' })
    testHelper.expectFieldStatus({ sut, fieldName: 'password', titleContent: message, textContent: '🔴' })
  })

  test('Should show message with error if password confirmation Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const message = 'Any Message'
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(message)
    testHelper.fillInput({ sut, inputId: 'passwordConfirmation', value: 'any_password' })
    testHelper.expectFieldStatus({ sut, fieldName: 'passwordConfirmation', titleContent: message, textContent: '🔴' })
  })

  test('Should show correct status if name Validation succeeds', () => {
    const { sut } = makeSut()
    testHelper.fillInput({ sut, inputId: 'name', value: 'Any Name' })
    testHelper.expectFieldStatus({ sut, fieldName: 'name', titleContent: 'Tudo certo!', textContent: '🟢' })
  })

  test('Should show correct status if email Validation succeeds', () => {
    const { sut } = makeSut()
    testHelper.fillInput({ sut, inputId: 'email', value: 'any@email.com' })
    testHelper.expectFieldStatus({ sut, fieldName: 'email', titleContent: 'Tudo certo!', textContent: '🟢' })
  })

  test('Should show correct status if password Validation succeeds', () => {
    const { sut } = makeSut()
    testHelper.fillInput({ sut, inputId: 'password', value: 'any_password' })
    testHelper.expectFieldStatus({ sut, fieldName: 'password', titleContent: 'Tudo certo!', textContent: '🟢' })
  })

  test('Should show correct status if passwordConfirmation Validation succeeds', () => {
    const { sut } = makeSut()
    testHelper.fillInput({ sut, inputId: 'passwordConfirmation', value: 'any_password' })
    testHelper.expectFieldStatus({ sut, fieldName: 'passwordConfirmation', titleContent: 'Tudo certo!', textContent: '🟢' })
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    testHelper.fillForm(sut, true)
    testHelper.expectButtonDisabledProperty({ sut, buttonId: 'submit', isDisabled: false })
  })

  test('Should show loader on form submit', () => {
    const { sut } = makeSut()
    testHelper.submitForm(sut, true)
    testHelper.expectElementToExist(sut, 'loader')
  })

  test('Should call AddAccount with correct values', () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    testHelper.submitForm(sut, true)
    expect(addSpy).toHaveBeenCalledWith(mockAddAccountParams())
  })

  test('Should call AddAccount only once even if submit is pressed multiple times', () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    testHelper.submitForm(sut, true)
    testHelper.clickSubmitButton(sut)
    expect(addSpy).toBeCalledTimes(1)
  })

  test('Should not call AddAccount if form is invalid', () => {
    const { sut, addAccountStub } = makeSut('Campo obrigatório')
    const authSpy = jest.spyOn(addAccountStub, 'add')
    testHelper.fillInput({ sut, inputId: 'email', value: 'any@email.com' })
    testHelper.clickSubmitButton(sut, true)
    expect(authSpy).toBeCalledTimes(0)
  })

  test('Should hide loader and show error message if AddAccount fails', async () => {
    const { sut, addAccountStub } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountStub, 'add').mockRejectedValueOnce(error)
    await testHelper.submitFormAndWait(sut, true)
    testHelper.expectElementToNotExist(sut, 'loader')
    const errorMessage = testHelper.expectElementToExist(sut, 'message')
    expect(errorMessage.textContent).toBe(error.message)
  })

  test('Should call SaveCurrentAccount and go to index on AddAccount success', async () => {
    const { sut, setCurrentAccountStub } = makeSut()
    await testHelper.submitFormAndWait(sut, true)
    expect(setCurrentAccountStub).toHaveBeenCalledWith(mockAccount())
    await waitFor(() => {
      expect(sut.getByText('Test Pass Index')).toBeTruthy()
    })
  })

  test('Should go to Login page on link click', async () => {
    const { sut } = makeSut()
    const loginLink = sut.getByTestId('login')
    fireEvent.click(loginLink)
    await waitFor(() => {
      expect(sut.getByText('Test Pass Login')).toBeTruthy()
    })
  })
})
