import React from 'react'
import { type RenderResult, render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SurveyResponse from '@/presentation/pages/surveyResponse/surveyResponse'
import ApiContext from '@/presentation/contexts/apiContext'
import { mockAccount } from '@/../tests/domain/mocks'

type Sut = {
  sut: RenderResult
}

const makeSut = (): Sut => {
  const sut = render(
    <ApiContext.Provider value={{ getCurrentAccount: () => mockAccount(), setCurrentAccount: jest.fn() }}>
      <MemoryRouter initialEntries={['/survey']}>
        <Routes>
          <Route path='/survey' element={<SurveyResponse />} />
        </Routes>
      </MemoryRouter>
    </ApiContext.Provider>
  )
  return {
    sut
  }
}

describe('Survey Response Page', () => {
  test('Should show correct initial state', () => {
    const { sut } = makeSut()
    const surveyResponse = sut.getByTestId('surveyResponse')
    expect(surveyResponse.childElementCount).toBe(0)
    expect(sut.queryByTestId('loading')).toBeNull()
    expect(sut.queryByTestId('error')).toBeNull()
  })
})
