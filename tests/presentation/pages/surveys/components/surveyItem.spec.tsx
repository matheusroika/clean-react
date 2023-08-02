import React from 'react'
import { type RenderResult, render } from '@testing-library/react'
import SurveyItem from '@/presentation/pages/surveys/components/surveyItem/surveyItem'
import { mockSurvey } from '@/../tests/domain/mocks'
import { IconName } from '@/presentation/pages/surveys/components/answeredIcon/answeredIcon'
import { type Survey } from '@/domain/models/Survey'

type Sut = {
  sut: RenderResult
}

const makeSut = (survey: Survey): Sut => {
  const sut = render(<SurveyItem survey={survey} />)
  return {
    sut
  }
}

describe('Survey Item Component', () => {
  test('Should render with correct values', () => {
    const survey = mockSurvey()
    const { sut } = makeSut(survey)
    const iconImg = sut.getByTestId('iconImg') as HTMLImageElement
    expect(iconImg.src).toBe(IconName.thumbsDown)
    expect(sut.getByTestId('question').textContent).toBe(survey.question)
    expect(sut.getByTestId('day').textContent).toBe('03')
    expect(sut.getByTestId('month').textContent).toBe('jul')
    expect(sut.getByTestId('year').textContent).toBe('2023')
    expect(sut.getByTestId('result').textContent).toBe('Ver resultado')
  })

  test('Should render with other correct values', () => {
    const survey = mockSurvey()
    survey.question = 'other_question'
    survey.answered = true
    survey.date = new Date('2022-02-28T05:52:28.514Z')
    const { sut } = makeSut(survey)
    const iconImg = sut.getByTestId('iconImg') as HTMLImageElement
    expect(iconImg.src).toBe(IconName.thumbsUp)
    expect(sut.getByTestId('question').textContent).toBe(survey.question)
    expect(sut.getByTestId('day').textContent).toBe('28')
    expect(sut.getByTestId('month').textContent).toBe('fev')
    expect(sut.getByTestId('year').textContent).toBe('2022')
    expect(sut.getByTestId('result').textContent).toBe('Ver resultado')
  })
})
