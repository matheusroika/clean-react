import React from 'react'
import { render } from '@testing-library/react'
import Login from '@/presentation/pages/login/login'

describe('Login page', () => {
  test('Should not render modalWrapper on initial state', () => {
    const { queryByTestId } = render(<Login />)
    const modalWrapper = queryByTestId('modalWrapper')
    expect(modalWrapper).toBeNull()
  })
})
