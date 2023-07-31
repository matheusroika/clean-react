import React from 'react'
import { type RenderResult, render } from '@testing-library/react'
import Surveys from '@/presentation/pages/surveys/surveys'
import { type LoadSurveys } from '@/domain/useCases/LoadSurveys'
import { type Survey } from '@/domain/models/Survey'
import { mockSurvey } from '@/../tests/domain/mocks'

type Sut = {
  sut: RenderResult
  loadSurveysStub: LoadSurveys
}

const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async loadAll (): Promise<Survey[]> {
      return [mockSurvey()]
    }
  }
  return new LoadSurveyStub()
}

const makeSut = (): Sut => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = render(<Surveys loadSurveys={loadSurveysStub} />)
  return {
    sut,
    loadSurveysStub
  }
}

describe('Surveys Page', () => {
  test('Should show 4 empty survey items on initial state', () => {
    const { sut } = makeSut()
    const surveyList = sut.getByTestId('surveyList')
    expect(surveyList.querySelectorAll('li').length).toBe(4)
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  test('Should load a Survey item correctly', async () => {
    const { sut } = makeSut()
    const surveyItem = await sut.findByText('Qual é seu framework web favorito?')
    expect(surveyItem).toBeTruthy()
  })
})
