import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from '@/presentation/pages/login/login'

describe('Login page', () => {
  test('Should render correctly on initial state', () => {
    render(<Login />)
    const modalWrapper = screen.queryByTestId('modalWrapper')
    expect(modalWrapper).toBeNull()
    const submitButton = screen.getByTestId<HTMLButtonElement>('submit')
    expect(submitButton.disabled).toBe(true)
    const emailStatus = screen.getByTestId('emailStatus')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = screen.getByTestId('passwordStatus')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
