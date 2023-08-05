import { mockSurvey } from './mockSurvey'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'

const survey = mockSurvey()

export const mockSurveyResponse = (): SurveyResponse => ({
  id: 'any_id',
  accountId: 'account_id',
  answer: 'any_answer',
  date: new Date('2023-08-01T05:52:28.514Z'),
  survey
})

export const mockUpdatedSurveyResponse = (): SurveyResponse => ({
  id: 'any_id',
  accountId: 'account_id',
  answer: 'any_answer',
  date: new Date('2023-08-01T05:52:28.514Z'),
  survey: {
    ...survey,
    question: 'other_question',
    date: new Date('2023-08-01T05:52:28.514Z'),
    answers: survey.answers.map((answer, index) => {
      const count = index === 0 ? answer.count + 1 : answer.count - 1
      return {
        image: answer.image,
        answer: answer.answer,
        count,
        percent: (count / survey.totalResponses) * 100,
        isCurrentAccountAnswer: index === 0
      }
    })
  }
})
