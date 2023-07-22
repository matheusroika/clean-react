import React from 'react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Login from '@/presentation/pages/login/login'
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import { expectFieldStatus, fillForm, fillInput, mockAuthentication, mockValidation, submitForm } from '../../mocks'
import type { RenderResult } from '@testing-library/react'
import type { Validation } from '@/presentation/protocols/validation'
import type { Authentication } from '@/domain/useCases/Authentication'
import { InvalidCredentialsError } from '@/domain/errors'

type Sut = {
  sut: RenderResult
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (mockMessage?: string): Sut => {
  const validationStub = mockValidation()
  if (mockMessage) jest.spyOn(validationStub, 'validate').mockReturnValue(mockMessage)
  const authenticationStub = mockAuthentication()
  const sut = render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path='/login' element={<Login validation={validationStub} authentication={authenticationStub} />} />
        <Route path='/signup' element={<h1>Test Pass Sign Up</h1>} />
      </Routes>
    </MemoryRouter>
  )

  return {
    sut,
    validationStub,
    authenticationStub
  }
}

describe('Login page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(cleanup)

  test('Should render correctly on initial state', () => {
    const error = 'Campo obrigatório'
    const { sut } = makeSut(error)
    const modalWrapper = sut.queryByTestId('modalWrapper')
    expect(modalWrapper).toBeNull()
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    expectFieldStatus({ sut, fieldName: 'email', titleContent: error, textContent: '🔴' })
    expectFieldStatus({ sut, fieldName: 'password', titleContent: error, textContent: '🔴' })
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationStub } = makeSut()
    const email = 'any@email.com'
    const validateSpy = jest.spyOn(validationStub, 'validate')
    fillInput({ sut, inputId: 'email', value: email })
    expect(validateSpy).toHaveBeenCalledWith('email', email)
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationStub } = makeSut()
    const password = 'any_password'
    const validateSpy = jest.spyOn(validationStub, 'validate')
    fillInput({ sut, inputId: 'password', value: 'any_password' })
    expect(validateSpy).toHaveBeenCalledWith('password', password)
  })

  test('Should show message with error if email Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const message = 'Any Message'
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(message)
    fillInput({ sut, inputId: 'email', value: 'any@email.com' })
    expectFieldStatus({ sut, fieldName: 'email', titleContent: message, textContent: '🔴' })
  })

  test('Should show message with error if password Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const message = 'Any Message'
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(message)
    fillInput({ sut, inputId: 'password', value: 'any_password' })
    expectFieldStatus({ sut, fieldName: 'password', titleContent: message, textContent: '🔴' })
  })

  test('Should show correct status if email Validation succeeds', () => {
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
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show loader on form submit', () => {
    const { sut } = makeSut()
    submitForm(sut)
    const loader = sut.queryByTestId('loader')
    expect(loader).toBeTruthy()
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
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitButton)
    expect(authSpy).toBeCalledTimes(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const { sut, authenticationStub } = makeSut('Campo obrigatório')
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    fillInput({ sut, inputId: 'email', value: 'any@email.com' })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    submitButton.disabled = false
    fireEvent.click(submitButton)
    expect(authSpy).toBeCalledTimes(0)
  })

  test('Should hide loader and show error message if Authentication fails', async () => {
    const { sut, authenticationStub } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error)
    submitForm(sut)
    const modalWrapper = sut.getByTestId('modalWrapper')
    await waitFor(() => modalWrapper)
    const loader = sut.queryByTestId('loader')
    expect(loader).toBeNull()
    const errorMessage = sut.queryByTestId('message')
    expect(errorMessage).toBeTruthy()
    expect(errorMessage.textContent).toBe(error.message)
  })

  test('Should hide loader and add accessToken to localStorage on Authentication success', async () => {
    const { sut } = makeSut()
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem')
    submitForm(sut)
    const modalWrapper = sut.getByTestId('modalWrapper')
    await waitFor(() => modalWrapper)
    const loader = sut.queryByTestId('loader')
    expect(loader).toBeNull()
    const errorMessage = sut.queryByTestId('message')
    expect(errorMessage).toBeNull()
    expect(setItemSpy).toHaveBeenCalledWith('accessToken', 'any_token')
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
