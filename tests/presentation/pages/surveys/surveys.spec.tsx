import React from 'react'
import { type RenderResult, render } from '@testing-library/react'
import Surveys from '@/presentation/pages/surveys/surveys'

type Sut = {
  sut: RenderResult
}

const makeSut = (): Sut => {
  const sut = render(<Surveys />)
  return {
    sut
  }
}

describe('Surveys Page', () => {
  test('Should show 4 empty survey items on initial state', () => {
    const { sut } = makeSut()
    const surveyList = sut.getByTestId('surveyList')
    expect(surveyList.querySelectorAll('li').length).toBe(4)
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })
})
