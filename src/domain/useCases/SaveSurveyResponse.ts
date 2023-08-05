import type { SurveyResponse } from '../models/SurveyResponse'

export type SaveSurveyResponseParams = {
  answer: string
}

export interface SaveSurveyResponse {
  save: (params: SaveSurveyResponseParams) => Promise<SurveyResponse>
}
