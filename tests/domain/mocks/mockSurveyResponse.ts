import { mockSurvey } from './mockSurvey'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'

export const mockSurveyResponse = (): SurveyResponse => ({
  id: 'any_id',
  accountId: 'account_id',
  answer: 'any_answer',
  date: new Date('2023-08-01T05:52:28.514Z'),
  survey: mockSurvey()
})
