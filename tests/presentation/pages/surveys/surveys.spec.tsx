import React from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { type RenderResult, render, fireEvent } from '@testing-library/react'
import Surveys from '@/presentation/pages/surveys/surveys'
import ApiContext from '@/presentation/contexts/apiContext'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockAccount, mockSurvey } from '@/../tests/domain/mocks'
import { mockLoadSurveys } from '@/../tests/data/mocks'
import { type Survey } from '@/domain/models/Survey'
import { type Account } from '@/domain/models/Account'

type Sut = {
  sut: RenderResult
  loadAllSpy: jest.SpyInstance<Promise<Survey[]>, [], any>
  setCurrentAccountStub: (account: Account) => void
}

const makeSut = (amount = 1, error?: Error): Sut => {
  const loadSurveysStub = mockLoadSurveys(amount)
  const loadAllSpy = jest.spyOn(loadSurveysStub, 'loadAll')
  if (error) loadAllSpy.mockRejectedValueOnce(error)
  const setCurrentAccountStub = jest.fn()
  const sut = render(
    <ApiContext.Provider value={{ getCurrentAccount: () => mockAccount(), setCurrentAccount: setCurrentAccountStub }}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Surveys loadSurveys={loadSurveysStub} />}/>
          <Route path='/login' element={<h1>Test Pass Login</h1>} />
        </Routes>
      </MemoryRouter>
    </ApiContext.Provider>
  )
  return {
    sut,
    loadAllSpy,
    setCurrentAccountStub
  }
}

describe('Surveys Page', () => {
  test('Should show 4 empty survey items on initial state', () => {
    const { sut } = makeSut()
    const surveyList = sut.getByTestId('surveyList')
    expect(surveyList.querySelectorAll('li').length).toBe(4)
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
    expect(sut.queryByTestId('error')).toBeNull()
  })

  test('Should call LoadSurveys and load a Survey item correctly', async () => {
    const { sut, loadAllSpy } = makeSut()
    const surveyItem = await sut.findByText(mockSurvey().question)
    expect(loadAllSpy).toHaveBeenCalledTimes(1)
    expect(surveyItem).toBeTruthy()
    expect(sut.queryByTestId('error')).toBeNull()
  })

  test('Should load multiple Survey items correctly', async () => {
    const { sut } = makeSut(3)
    await sut.findAllByText(mockSurvey().question)
    const surveyList = sut.getByTestId('surveyList')
    expect(surveyList.querySelectorAll('li').length).toBe(3)
    expect(surveyList.querySelectorAll('li:not(:empty)').length).toBe(3)
    expect(sut.queryByTestId('error')).toBeNull()
  })

  test('Should show message if there are no Survey items', async () => {
    const { sut, loadAllSpy } = makeSut(0)
    const message = await sut.findByText('Não existem enquetes no momento')
    expect(loadAllSpy).toHaveBeenCalledTimes(1)
    expect(message).toBeTruthy()
    expect(sut.queryByTestId('message')).toBeTruthy()
    expect(sut.queryByTestId('error')).toBeNull()
  })

  test('Should show error on LoadSurvey UnexpectedError', async () => {
    const error = new UnexpectedError()
    const { sut, loadAllSpy } = makeSut(1, error)
    const errorMessage = await sut.findByText(error.message)
    expect(loadAllSpy).toHaveBeenCalledTimes(1)
    expect(sut.queryByTestId('surveyList')).toBeNull()
    expect(sut.queryByTestId('error')).toBeTruthy()
    expect(errorMessage).toBeTruthy()
  })

  test('Should logout and redirect to /login on AccessDeniedError', async () => {
    const { sut, loadAllSpy, setCurrentAccountStub } = makeSut(1, new AccessDeniedError())
    const login = await sut.findByText('Test Pass Login')
    expect(loadAllSpy).toHaveBeenCalledTimes(1)
    expect(setCurrentAccountStub).toHaveBeenCalledWith(null)
    expect(login).toBeTruthy()
  })

  test('Should call LoadSurvey on retry button click', async () => {
    const error = new UnexpectedError()
    const { sut, loadAllSpy } = makeSut(1, error)
    const errorMessage = await sut.findByText(error.message)
    expect(loadAllSpy).toHaveBeenCalledTimes(1)
    expect(errorMessage).toBeTruthy()
    fireEvent.click(sut.getByTestId('retry'))
    const surveyItem = await sut.findByText(mockSurvey().question)
    expect(loadAllSpy).toHaveBeenCalledTimes(2)
    expect(surveyItem).toBeTruthy()
    expect(sut.queryByTestId('error')).toBeNull()
  })
})
