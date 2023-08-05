import React from 'react'
import { type RenderResult, render, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SurveyResponse from '@/presentation/pages/surveyResponse/surveyResponse'
import ApiContext from '@/presentation/contexts/apiContext'
import { UnexpectedError } from '@/domain/errors'
import { mockAccount, mockSurveyResponse } from '@/../tests/domain/mocks'
import { mockLoadSurveyResponse } from '@/../tests/data/mocks/mockLoadSurveyResponse'
import type { SurveyResponse as SurveyResponseModel } from '@/domain/models/SurveyResponse'

type Sut = {
  sut: RenderResult
  loadSpy: jest.SpyInstance<Promise<SurveyResponseModel>, [], any>
}

const makeSut = (error?: Error): Sut => {
  const loadSurveyResponseStub = mockLoadSurveyResponse()
  const loadSpy = jest.spyOn(loadSurveyResponseStub, 'load')
  if (error) loadSpy.mockRejectedValueOnce(error)
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

  test('Should show a SurveyResponse on success', async () => {
    const { sut } = makeSut()
    const surveyResponse = mockSurveyResponse()
    await waitFor(() => sut.getByTestId('surveyResponse'))
    expect(sut.getByTestId('day').textContent).toBe('03')
    expect(sut.getByTestId('month').textContent).toBe('jul')
    expect(sut.getByTestId('year').textContent).toBe('2023')
    expect(sut.getByTestId('question').textContent).toBe(surveyResponse.survey.question)
    expect(sut.getByTestId('answers').childElementCount).toBe(2)

    const answerWrappers = sut.getAllByTestId('answerWrapper')
    expect(answerWrappers).toHaveLength(2)
    expect(answerWrappers[0].className).toBe('')
    expect(answerWrappers[1].className).toBe('userAnswer')

    const images = sut.getAllByTestId('image') as HTMLImageElement[]
    expect(images).toHaveLength(1)
    expect(images[0].src).toBe(`http://localhost/${surveyResponse.survey.answers[1].image}`)
    expect(images[0].alt).toBe(surveyResponse.survey.answers[1].answer)

    const answers = sut.getAllByTestId('answer')
    expect(answers).toHaveLength(2)
    expect(answers[0].textContent).toBe(surveyResponse.survey.answers[0].answer)
    expect(answers[1].textContent).toBe(surveyResponse.survey.answers[1].answer)

    const percents = sut.getAllByTestId('percent')
    expect(percents).toHaveLength(2)
    expect(percents[0].textContent).toBe(`${surveyResponse.survey.answers[0].percent}%`)
    expect(percents[1].textContent).toBe(`${surveyResponse.survey.answers[1].percent}%`)

    expect(sut.queryByTestId('loading')).toBeNull()
    expect(sut.queryByTestId('error')).toBeNull()
    expect(sut.queryByTestId('back')).toBeTruthy()
  })

  test('Should show error on LoadSurveyResponse UnexpectedError', async () => {
    const error = new UnexpectedError()
    const { sut, loadSpy } = makeSut(error)
    await waitFor(() => sut.getByTestId('surveyResponse'))
    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(sut.queryByTestId('title')).toBeNull()
    expect(sut.queryByTestId('answers')).toBeNull()
    expect(sut.queryByTestId('loading')).toBeNull()
    expect(sut.queryByTestId('error').textContent).toBe(error.message)
  })
})
