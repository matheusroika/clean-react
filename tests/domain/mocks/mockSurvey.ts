import type { Survey, Answer } from '@/domain/models/Survey'

export const mockAnswer = (): Answer => ({
  answer: 'any_answer',
  count: 0,
  percent: 0,
  isCurrentAccountAnswer: false
})

export const mockOtherAnswer = (): Answer => ({
  image: 'image.png',
  answer: 'other_answer',
  count: 5,
  percent: 100,
  isCurrentAccountAnswer: true
})

export const mockSurvey = (): Survey => ({
  id: 'any_id',
  question: 'any_question',
  answers: [mockAnswer(), mockOtherAnswer()],
  totalResponses: 5,
  date: new Date('2023-07-03T05:52:28.514Z'),
  answered: false
})

export const mockOtherSurvey = (): Survey => ({
  id: 'other_id',
  question: 'other_question',
  answers: [mockOtherAnswer()],
  totalResponses: 5,
  date: new Date('2022-12-25T05:52:28.514Z'),
  answered: true
})

export const mockSurveys = (amount = 1): Survey[] => {
  const surveys: Survey[] = []
  for (let i = 0; i < amount; i++) {
    if (i % 2 === 0) surveys.push(mockSurvey())
    else surveys.push(mockOtherSurvey())
  }
  return surveys
}
