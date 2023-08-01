import React from 'react'
import { type RenderResult, render, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Header from '@/presentation/components/header/header'
import ApiContext from '@/presentation/contexts/apiContext'
import { type Account } from '@/domain/models/Account'

type Sut = {
  sut: RenderResult
  setCurrentAccountStub: (account: Account) => void
}

const makeSut = (): Sut => {
  const setCurrentAccountStub = jest.fn()
  const sut = render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountStub, getCurrentAccount: jest.fn() }}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Header />}/>
          <Route path='/login' element={<h1>Test Pass Login</h1>} />
        </Routes>
      </MemoryRouter>
    </ApiContext.Provider>
  )
  return {
    sut,
    setCurrentAccountStub
  }
}

describe('Header Component', () => {
  test('Should call setCurrentAccount with null and redirects to /login on logout click', async () => {
    const { sut, setCurrentAccountStub } = makeSut()
    fireEvent.click(sut.getByTestId('logout'))
    expect(setCurrentAccountStub).toHaveBeenCalledWith(null)
    const login = await sut.findByText('Test Pass Login')
    expect(login).toBeTruthy()
  })
})
