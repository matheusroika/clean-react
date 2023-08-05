import React from 'react'
import { type RenderResult, render, fireEvent } from '@testing-library/react'
import SurveyItem from '@/presentation/pages/surveys/components/surveyItem/surveyItem'
import { mockOtherSurvey, mockSurvey } from '@/../tests/domain/mocks'
import { IconName } from '@/presentation/pages/surveys/components/answeredIcon/answeredIcon'
import { type Survey } from '@/domain/models/Survey'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

type Sut = {
  sut: RenderResult
}

const makeSut = (survey: Survey): Sut => {
  const sut = render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={<SurveyItem survey={survey} />}/>
        <Route path='/surveys/any_id' element={<h1>Test Pass Survey Response</h1>}/>
      </Routes>
    </MemoryRouter>
  )
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
    const survey = mockOtherSurvey()
    const { sut } = makeSut(survey)
    const iconImg = sut.getByTestId('iconImg') as HTMLImageElement
    expect(iconImg.src).toBe(IconName.thumbsUp)
    expect(sut.getByTestId('question').textContent).toBe(survey.question)
    expect(sut.getByTestId('day').textContent).toBe('25')
    expect(sut.getByTestId('month').textContent).toBe('dez')
    expect(sut.getByTestId('year').textContent).toBe('2022')
    expect(sut.getByTestId('result').textContent).toBe('Ver resultado')
  })

  test('Should go to SurveyResponse page on click', async () => {
    const survey = mockSurvey()
    const { sut } = makeSut(survey)
    fireEvent.click(sut.getByTestId('result'))
    const surveyResponse = await sut.findByText('Test Pass Survey Response')
    expect(surveyResponse).toBeTruthy()
  })
})
