import React from 'react'
import { type RenderResult, render, fireEvent } from '@testing-library/react'
import Surveys from '@/presentation/pages/surveys/surveys'
import { type LoadSurveys } from '@/domain/useCases/LoadSurveys'
import { type Survey } from '@/domain/models/Survey'
import { mockSurvey, mockSurveys } from '@/../tests/domain/mocks'
import { UnexpectedError } from '@/domain/errors'

type Sut = {
  sut: RenderResult
  loadAllSpy: jest.SpyInstance<Promise<Survey[]>, [], any>
}

const mockLoadSurveys = (amount = 1): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async loadAll (): Promise<Survey[]> {
      return mockSurveys(amount)
    }
  }
  return new LoadSurveyStub()
}

const makeSut = (amount = 1, error?: boolean): Sut => {
  const loadSurveysStub = mockLoadSurveys(amount)
  const loadAllSpy = jest.spyOn(loadSurveysStub, 'loadAll')
  if (error) loadAllSpy.mockRejectedValueOnce(new UnexpectedError())
  const sut = render(<Surveys loadSurveys={loadSurveysStub} />)
  return {
    sut,
    loadAllSpy
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

  test('Should show error on LoadSurvey failure', async () => {
    const { sut, loadAllSpy } = makeSut(1, true)
    const error = await sut.findByText(new UnexpectedError().message)
    expect(loadAllSpy).toHaveBeenCalledTimes(1)
    expect(sut.queryByTestId('surveyList')).toBeNull()
    expect(sut.queryByTestId('error')).toBeTruthy()
    expect(error).toBeTruthy()
  })

  test('Should call LoadSurvey on retry button click', async () => {
    const { sut, loadAllSpy } = makeSut(1, true)
    const error = await sut.findByText(new UnexpectedError().message)
    expect(loadAllSpy).toHaveBeenCalledTimes(1)
    expect(error).toBeTruthy()
    fireEvent.click(sut.getByTestId('retry'))
    const surveyItem = await sut.findByText(mockSurvey().question)
    expect(loadAllSpy).toHaveBeenCalledTimes(2)
    expect(surveyItem).toBeTruthy()
    expect(sut.queryByTestId('error')).toBeNull()
  })
})
