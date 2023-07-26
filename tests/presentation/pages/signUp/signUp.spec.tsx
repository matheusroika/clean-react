import React from 'react'
import SignUp from '@/presentation/pages/signUp/signUp'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { cleanup, render } from '@testing-library/react'
import { testHelper, mockValidation } from '../../mocks'
// import { InvalidCredentialsError } from '@/domain/errors'
import type { RenderResult } from '@testing-library/react'
import type { Validation } from '@/presentation/protocols/validation'

type Sut = {
  sut: RenderResult
  validationStub: Validation
}

const makeSut = (mockMessage?: string): Sut => {
  const validationStub = mockValidation()
  if (mockMessage) jest.spyOn(validationStub, 'validate').mockReturnValue(mockMessage)
  const sut = render(
    <MemoryRouter initialEntries={['/signup']}>
      <Routes>
        <Route path='/signup' element={<SignUp validation={validationStub} />} />
        <Route path='/' element={<h1>Test Pass Index</h1>} />
        <Route path='/login' element={<h1>Test Pass Login</h1>} />
      </Routes>
    </MemoryRouter>
  )

  return {
    sut,
    validationStub
  }
}

describe('Login page', () => {
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
    expect(validateSpy).toHaveBeenCalledWith('name', name)
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationStub } = makeSut()
    const email = 'any@email.com'
    const validateSpy = jest.spyOn(validationStub, 'validate')
    testHelper.fillInput({ sut, inputId: 'email', value: email })
    expect(validateSpy).toHaveBeenCalledWith('email', email)
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationStub } = makeSut()
    const password = 'any_password'
    const validateSpy = jest.spyOn(validationStub, 'validate')
    testHelper.fillInput({ sut, inputId: 'password', value: 'any_password' })
    expect(validateSpy).toHaveBeenCalledWith('password', password)
  })

  test('Should call Validation with correct password confirmation', () => {
    const { sut, validationStub } = makeSut()
    const passwordConfirmation = 'any_password'
    const validateSpy = jest.spyOn(validationStub, 'validate')
    testHelper.fillInput({ sut, inputId: 'passwordConfirmation', value: 'any_password' })
    expect(validateSpy).toHaveBeenCalledWith('passwordConfirmation', passwordConfirmation)
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

  /* test('Should show correct status if email Validation succeeds', () => {
    const { sut } = makeSut()
    fillInput({ sut, inputId: 'email', value: 'any@email.com' })
    expectFieldStatus({ sut, fieldName: 'email', titleContent: 'Tudo certo!', textContent: '🟢' })
  })

  test('Should show correct status if password Validation succeeds', () => {
    const { sut } = makeSut()
    fillInput({ sut, inputId: 'password', value: 'any_password' })
    expectFieldStatus({ sut, fieldName: 'password', titleContent: 'Tudo certo!', textContent: '🟢' })
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    fillForm(sut)
    expectButtonDisabledProperty({ sut, buttonId: 'submit', isDisabled: false })
  })

  test('Should show loader on form submit', () => {
    const { sut } = makeSut()
    submitForm(sut)
    expectElementToExist(sut, 'loader')
  })

  test('Should call Authentication with correct values', () => {
    const { sut, authenticationStub } = makeSut()
    const email = 'any@email.com'
    const password = 'any_password'
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    submitForm(sut)
    expect(authSpy).toHaveBeenCalledWith({
      email,
      password
    })
  })

  test('Should call Authentication only once even if submit is pressed multiple times', () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    submitForm(sut)
    clickSubmitButton(sut)
    expect(authSpy).toBeCalledTimes(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const { sut, authenticationStub } = makeSut('Campo obrigatório')
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    fillInput({ sut, inputId: 'email', value: 'any@email.com' })
    clickSubmitButton(sut, true)
    expect(authSpy).toBeCalledTimes(0)
  })

  test('Should hide loader and show error message if Authentication fails', async () => {
    const { sut, authenticationStub } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error)
    await submitFormAndWait(sut)
    expectElementToNotExist(sut, 'loader')
    const errorMessage = expectElementToExist(sut, 'message')
    expect(errorMessage.textContent).toBe(error.message)
  })

  test('Should call SaveAccessToken and go to index on Authentication success', async () => {
    const { sut, saveAccessTokenStub } = makeSut()
    const saveSpy = jest.spyOn(saveAccessTokenStub, 'save')
    await submitFormAndWait(sut)
    expect(saveSpy).toHaveBeenCalledWith('any_token')
    await waitFor(() => {
      expect(sut.getByText('Test Pass Index')).toBeTruthy()
    })
  })

  test('Should show message with error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenStub } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenStub, 'save').mockRejectedValueOnce(error)
    await submitFormAndWait(sut)
    await waitFor(() => {
      expectElementToNotExist(sut, 'loader')
      const errorMessage = expectElementToExist(sut, 'message')
      expect(errorMessage.textContent).toBe(error.message)
    })
  })

  test('Should go to SignUp page on link click', async () => {
    const { sut } = makeSut()
    const signUpLink = sut.getByTestId('signup')
    fireEvent.click(signUpLink)
    await waitFor(() => {
      expect(sut.getByText('Test Pass Sign Up')).toBeTruthy()
    })
  }) */
})
