import React from 'react'
import { type RenderResult, render } from '@testing-library/react'
import Surveys from '@/presentation/pages/surveys/surveys'
import { type LoadSurveys } from '@/domain/useCases/LoadSurveys'
import { type Survey } from '@/domain/models/Survey'
import { mockSurvey, mockSurveys } from '@/../tests/domain/mocks'

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

const makeSut = (amount = 1): Sut => {
  const loadSurveysStub = mockLoadSurveys(amount)
  const loadAllSpy = jest.spyOn(loadSurveysStub, 'loadAll')
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
  })

  test('Should call LoadSurveys and load a Survey item correctly', async () => {
    const { sut, loadAllSpy } = makeSut()
    const surveyItem = await sut.findByText(mockSurvey().question)
    expect(loadAllSpy).toHaveBeenCalledTimes(1)
    expect(surveyItem).toBeTruthy()
  })

  test('Should load multiple Survey items correctly', async () => {
    const { sut } = makeSut(3)
    await sut.findAllByText(mockSurvey().question)
    const surveyList = sut.getByTestId('surveyList')
    expect(surveyList.querySelectorAll('li').length).toBe(3)
    expect(surveyList.querySelectorAll('li:not(:empty)').length).toBe(3)
  })
})
