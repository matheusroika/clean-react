import type { SurveyResponse } from '../models/SurveyResponse'

export interface LoadSurveyResponse {
  load: () => Promise<SurveyResponse>
}
