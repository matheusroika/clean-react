import type { Survey } from './Survey'

export interface SurveyResponse {
  id: string
  accountId: string
  answer: string
  date: Date
  survey: Survey
}
