import React from 'react'
import { type RenderResult, render, waitFor } from '@testing-library/react'
import PrivateRoute from '@/main/routes/privateRoute'
import MockPage from '../../presentation/mocks/mockPage'

type Sut = {
  sut: RenderResult
}

const makeSut = (): Sut => {
  const sut = render(<PrivateRoute Page={MockPage} />)
  return {
    sut
  }
}

describe('Private Route', () => {
  test('Should render param Page correctly', async () => {
    const { sut } = makeSut()
    await waitFor(() => {
      expect(sut.getByText('Test Page')).toBeTruthy()
    })
  })
})
