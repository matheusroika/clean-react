import type { Survey, Answer } from '@/domain/models/Survey'

export const mockAnswer = (): Answer => ({
  answer: 'any_answer',
  count: 0,
  percent: 0,
  isCurrentAccountAnswer: false
})

export const mockSurvey = (): Survey => ({
  id: 'any_id',
  question: 'any_question',
  answers: [mockAnswer()],
  totalResponses: 0,
  date: new Date('2023-07-03T05:52:28.514Z'),
  answered: false
})

export const mockSurveys = (amount = 1): Survey[] => {
  const surveys: Survey[] = []
  for (let i = 0; i < amount; i++) {
    surveys.push(mockSurvey())
  }
  return surveys
}
