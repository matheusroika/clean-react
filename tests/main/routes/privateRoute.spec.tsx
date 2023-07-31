import React from 'react'
import { type RenderResult, render, waitFor, cleanup } from '@testing-library/react'
import PrivateRoute from '@/main/routes/privateRoute'
import MockPage from '../../presentation/mocks/mockPage'
import ApiContext from '@/presentation/contexts/apiContext'
import { mockAccount } from '../../domain/mocks'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import { type Account } from '@/domain/models/Account'

type Sut = {
  sut: RenderResult
}

const makeSut = (account: Account): Sut => {
  const sut = render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account, setCurrentAccount: jest.fn() }}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<PrivateRoute Page={MockPage} />} />
          <Route path='/login' element={<h1>Test Login Page</h1>} />
        </Routes>
      </MemoryRouter>
    </ApiContext.Provider>
  )
  return {
    sut
  }
}

describe('Private Route', () => {
  afterEach(cleanup)

  test('Should render passed Page correctly', async () => {
    const { sut } = makeSut(mockAccount())
    await waitFor(() => {
      expect(sut.getByText('Test Page')).toBeTruthy()
    })
  })

  test('Should redirect to /login if account is empty', async () => {
    const { sut } = makeSut(undefined)
    await waitFor(() => {
      expect(sut.getByText('Test Login Page')).toBeTruthy()
    })
  })
})
