import React from 'react'
import { type RenderResult, render } from '@testing-library/react'
import SurveyItem from '@/presentation/pages/surveys/components/surveyItem/surveyItem'
import { mockSurvey } from '@/../tests/domain/mocks'
import { IconName } from '@/presentation/components/answeredIcon/answeredIcon'

type Sut = {
  sut: RenderResult
}

const makeSut = (): Sut => {
  const sut = render(<SurveyItem survey={mockSurvey()} />)
  return {
    sut
  }
}

describe('Survey Item Component', () => {
  test('Should render with correct values', () => {
    const { sut } = makeSut()
    const survey = mockSurvey()
    const iconImg = sut.getByTestId('iconImg') as HTMLImageElement
    expect(iconImg.src).toBe(IconName.thumbsDown)
    expect(sut.getByTestId('question').textContent).toBe(survey.question)
    expect(sut.getByTestId('day').textContent).toBe('03')
    expect(sut.getByTestId('month').textContent).toBe('jul')
    expect(sut.getByTestId('year').textContent).toBe('2023')
    expect(sut.getByTestId('result').textContent).toBe('Ver resultado')
  })
})
