import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import Login from '@/presentation/pages/login/login'
import type { RenderResult } from '@testing-library/react'
import type { Validation } from '@/presentation/protocols/validation'

const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: object): string | null {
      return null
    }
  }

  return new ValidationStub()
}

type Sut = {
  sut: RenderResult
  validationStub: Validation
}

const makeSut = (): Sut => {
  const validationStub = mockValidation()
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

describe('Login page', () => {
  afterEach(cleanup)

  test('Should render correctly on initial state', () => {
    const { sut } = makeSut()
    const modalWrapper = sut.queryByTestId('modalWrapper')
    expect(modalWrapper).toBeNull()
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('emailStatus')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('passwordStatus')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('Should call Validation with correct value', () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    expect(validateSpy).toHaveBeenCalledWith({ email: 'any_email' })
  })
})
