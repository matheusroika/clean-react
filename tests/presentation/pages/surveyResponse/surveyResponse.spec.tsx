import React from 'react'
import { type RenderResult, render, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SurveyResponse from '@/presentation/pages/surveyResponse/surveyResponse'
import ApiContext from '@/presentation/contexts/apiContext'
import { mockAccount } from '@/../tests/domain/mocks'
import { mockLoadSurveyResponse } from '@/../tests/data/mocks/mockLoadSurveyResponse'
import type { SurveyResponse as SurveyResponseModel } from '@/domain/models/SurveyResponse'

type Sut = {
  sut: RenderResult
  loadSpy: jest.SpyInstance<Promise<SurveyResponseModel>, [], any>
}

const makeSut = (): Sut => {
  const loadSurveyResponseStub = mockLoadSurveyResponse()
  const loadSpy = jest.spyOn(loadSurveyResponseStub, 'load')
  const sut = render(
    <ApiContext.Provider value={{ getCurrentAccount: () => mockAccount(), setCurrentAccount: jest.fn() }}>
      <MemoryRouter initialEntries={['/survey']}>
        <Routes>
          <Route path='/survey' element={<SurveyResponse loadSurveyResponse={loadSurveyResponseStub} />} />
        </Routes>
      </MemoryRouter>
    </ApiContext.Provider>
  )
  return {
    sut,
    loadSpy
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

  test('Should call LoadSurveyResponse', async () => {
    const { sut, loadSpy } = makeSut()
    await waitFor(() => sut.getByTestId('surveyResponse'))
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })
})
