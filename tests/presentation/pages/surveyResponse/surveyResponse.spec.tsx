import React from 'react'
import { type RenderResult, render, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import SurveyResponse from '@/presentation/pages/surveyResponse/surveyResponse'
import ApiContext from '@/presentation/contexts/apiContext'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockAccount, mockSurveyResponse } from '@/../tests/domain/mocks'
import { mockLoadSurveyResponse } from '@/../tests/data/mocks/mockLoadSurveyResponse'
import type { SurveyResponse as SurveyResponseModel } from '@/domain/models/SurveyResponse'
import type { Account } from '@/domain/models/Account'

type Sut = {
  sut: RenderResult
  loadSpy: jest.SpyInstance<Promise<SurveyResponseModel>, [], any>
  setCurrentAccountStub: (account: Account) => void
}

const makeSut = (error?: Error): Sut => {
  const loadSurveyResponseStub = mockLoadSurveyResponse()
  const loadSpy = jest.spyOn(loadSurveyResponseStub, 'load')
  const setCurrentAccountStub = jest.fn()
  if (error) loadSpy.mockRejectedValueOnce(error)
  const sut = render(
    <ApiContext.Provider value={{ getCurrentAccount: () => mockAccount(), setCurrentAccount: setCurrentAccountStub }}>
      <MemoryRouter initialEntries={['/survey']}>
        <Routes>
          <Route path='/survey' element={<SurveyResponse loadSurveyResponse={loadSurveyResponseStub} />} />
          <Route path='/login' element={<h1>Test Pass Login</h1>} />
          <Route path='/' element={<h1>Test Pass Surveys</h1>} />
        </Routes>
      </MemoryRouter>
    </ApiContext.Provider>
  )
  return {
    sut,
    loadSpy,
    setCurrentAccountStub
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

    const answerWrapper = sut.getAllByTestId('answerWrapper')
    expect(answerWrapper).toHaveLength(2)
    expect(answerWrapper[0].className).toBe('answerWrapper')
    expect(answerWrapper[1].className).toBe('answerWrapper userAnswer')

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
    const { sut } = makeSut(error)
    await waitFor(() => sut.getByTestId('surveyResponse'))
    expect(sut.queryByTestId('title')).toBeNull()
    expect(sut.queryByTestId('answers')).toBeNull()
    expect(sut.queryByTestId('loading')).toBeNull()
    expect(sut.queryByTestId('error').textContent).toBe(error.message)
  })

  test('Should logout and redirect to /login on AccessDeniedError', async () => {
    const { sut, setCurrentAccountStub } = makeSut(new AccessDeniedError())
    const login = await sut.findByText('Test Pass Login')
    expect(setCurrentAccountStub).toHaveBeenCalledWith(null)
    expect(login).toBeTruthy()
  })

  test('Should call LoadSurveyResponse on retry button click', async () => {
    const error = new UnexpectedError()
    const { sut, loadSpy } = makeSut(error)
    await waitFor(() => sut.getByTestId('surveyResponse'))
    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(sut.queryByTestId('error').textContent).toBe(error.message)
    fireEvent.click(sut.getByTestId('retry'))
    await waitFor(() => sut.getByTestId('surveyResponse'))
    expect(loadSpy).toHaveBeenCalledTimes(2)
    expect(sut.getByTestId('answers').childElementCount).toBe(2)
    expect(sut.queryByTestId('error')).toBeNull()
    expect(sut.queryByTestId('loading')).toBeNull()
  })

  test('Should go to Surveys page on back button click', async () => {
    const { sut } = makeSut()
    await waitFor(() => sut.getByTestId('surveyResponse'))
    fireEvent.click(sut.getByTestId('back'))
    const surveys = await sut.findByText('Test Pass Surveys')
    expect(surveys).toBeTruthy()
  })

  test('Should not show loading on current answer click', async () => {
    const { sut } = makeSut()
    await waitFor(() => sut.getByTestId('surveyResponse'))
    const answerWrapper = sut.getAllByTestId('answerWrapper')
    fireEvent.click(answerWrapper[1])
    expect(sut.queryByTestId('loading')).toBeNull()
  })
})
