import React from 'react'
import Login from '@/presentation/pages/login/login'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { mockValidation } from '../../mocks/mockValidation'
import type { RenderResult } from '@testing-library/react'
import type { Validation } from '@/presentation/protocols/validation'

type Sut = {
  sut: RenderResult
  validationStub: Validation
}

const makeSut = (mockMessage?: string): Sut => {
  const validationStub = mockValidation()
  if (mockMessage) jest.spyOn(validationStub, 'validate').mockReturnValue(mockMessage)
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

describe('Login page', () => {
  afterEach(cleanup)

  test('Should render correctly on initial state', () => {
    const message = 'Campo obrigatório'
    const { sut } = makeSut(message)
    const modalWrapper = sut.queryByTestId('modalWrapper')
    expect(modalWrapper).toBeNull()
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('emailStatus')
    expect(emailStatus.title).toBe(message)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('passwordStatus')
    expect(passwordStatus.title).toBe(message)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should call Validation with correct email', () => {
    const { sut, validationStub } = makeSut()
    const email = 'any_email'
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validateSpy).toHaveBeenCalledWith('email', email)
  })

  test('Should call Validation with correct password', () => {
    const { sut, validationStub } = makeSut()
    const password = 'any_password'
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validateSpy).toHaveBeenCalledWith('password', password)
  })

  test('Should show message with error if email Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const message = 'Any Message'
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(message)
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    const emailStatus = sut.getByTestId('emailStatus')
    expect(emailStatus.title).toBe(message)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('Should show message with error if password Validation fails', () => {
    const { sut, validationStub } = makeSut()
    const message = 'Any Message'
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(message)
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    const passwordStatus = sut.getByTestId('passwordStatus')
    expect(passwordStatus.title).toBe(message)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should show correct status if email Validation succeeds', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    const emailStatus = sut.getByTestId('emailStatus')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('Should show correct status if password Validation succeeds', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    const passwordStatus = sut.getByTestId('passwordStatus')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should should show loader on submit', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitButton)
    const loader = sut.queryByTestId('loader')
    expect(loader).toBeTruthy()
  })
})
