import React from 'react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Login from '@/presentation/pages/login/login'
import ApiContext from '@/presentation/contexts/apiContext'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { InvalidCredentialsError } from '@/domain/errors'
import { testHelper } from '../../mocks'
import { mockAccount, mockAuthParams } from '@/../tests/domain/mocks'
import { mockAuthentication } from '@/../tests/data/mocks'
import { mockValidateCall, mockValidation } from '@/../tests/validation/mocks/mockValidation'
import type { RenderResult } from '@testing-library/react'
import type { Validation } from '@/presentation/protocols/validation'
import type { Authentication } from '@/domain/useCases/Authentication'
import type { Account } from '@/domain/models/Account'

type Sut = {
  sut: RenderResult
  validationStub: Validation
  authenticationStub: Authentication
  setCurrentAccountStub: (account: Account) => void
}

const makeSut = (mockMessage?: string): Sut => {
  const validationStub = mockValidation()
  if (mockMessage) jest.spyOn(validationStub, 'validate').mockReturnValue(mockMessage)
  const authenticationStub = mockAuthentication()
  const setCurrentAccountStub = jest.fn()
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountStub, getCurrentAccount: jest.fn() }}>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path='/login' element={<Login validation={validationStub} authentication={authenticationStub} />} />
          <Route path='/' element={<h1>Test Pass Index</h1>} />
          <Route path='/signup' element={<h1>Test Pass Sign Up</h1>} />
        </Routes>
      </MemoryRouter>
    </ApiContext.Provider>
  )

  return {
    sut,
    validationStub,
    authenticationStub,
    setCurrentAccountStub
  }
}

describe('Login page', () => {
  test('Should render correctly on initial state', () => {
    const error = 'Campo obrigatório'
    const { sut } = makeSut(error)
    testHelper.expectElementToNotExist(sut, 'modalWrapper')
    testHelper.expectButtonDisabledProperty({ sut, buttonId: 'submit', isDisabled: true })
    testHelper.expectFieldStatus({ sut, fieldName: 'email', titleContent: error, textContent: '🔴' })
    testHelper.expectFieldStatus({ sut, fieldName: 'password', titleContent: error, textContent: '🔴' })
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationStub } = makeSut()
    const email = 'any@email.com'
    const validateSpy = jest.spyOn(validationStub, 'validate')
    testHelper.fillInput({ sut, inputId: 'email', value: email })
    expect(validateSpy).toHaveBeenCalledWith('email', mockValidateCall('email', email))
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationStub } = makeSut()
    const password = 'any_password'
    const validateSpy = jest.spyOn(validationStub, 'validate')
    testHelper.fillInput({ sut, inputId: 'password', value: 'any_password' })
    expect(validateSpy).toHaveBeenCalledWith('password', mockValidateCall('password', password))
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

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    testHelper.fillForm(sut)
    testHelper.expectButtonDisabledProperty({ sut, buttonId: 'submit', isDisabled: false })
  })

  test('Should show loader on form submit', () => {
    const { sut } = makeSut()
    testHelper.submitForm(sut)
    testHelper.expectElementToExist(sut, 'loader')
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    testHelper.submitForm(sut)
    expect(authSpy).toHaveBeenCalledWith(mockAuthParams())
  })

  test('Should call Authentication only once even if submit is pressed multiple times', () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    testHelper.submitForm(sut)
    testHelper.clickSubmitButton(sut)
    expect(authSpy).toBeCalledTimes(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const { sut, authenticationStub } = makeSut('Campo obrigatório')
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    testHelper.fillInput({ sut, inputId: 'email', value: 'any@email.com' })
    testHelper.clickSubmitButton(sut, true)
    expect(authSpy).toBeCalledTimes(0)
  })

  test('Should hide loader and show error message if Authentication fails', async () => {
    const { sut, authenticationStub } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error)
    await testHelper.submitFormAndWait(sut)
    testHelper.expectElementToNotExist(sut, 'loader')
    const errorMessage = testHelper.expectElementToExist(sut, 'message')
    expect(errorMessage.textContent).toBe(error.message)
  })

  test('Should hide loader and message on close modal button click', async () => {
    const { sut, authenticationStub } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error)
    await testHelper.submitFormAndWait(sut)
    fireEvent.click(sut.getByTestId('closeButton'))
    testHelper.expectElementToNotExist(sut, 'loader')
    testHelper.expectElementToNotExist(sut, 'message')
  })

  test('Should call SaveCurrentAccount and go to index on Authentication success', async () => {
    const { sut, setCurrentAccountStub } = makeSut()
    await testHelper.submitFormAndWait(sut)
    expect(setCurrentAccountStub).toHaveBeenCalledWith(mockAccount())
    await waitFor(() => {
      expect(sut.getByText('Test Pass Index')).toBeTruthy()
    })
  })

  test('Should go to SignUp page on link click', async () => {
    const { sut } = makeSut()
    const signUpLink = sut.getByTestId('signup')
    fireEvent.click(signUpLink)
    await waitFor(() => {
      expect(sut.getByText('Test Pass Sign Up')).toBeTruthy()
    })
  })
})
