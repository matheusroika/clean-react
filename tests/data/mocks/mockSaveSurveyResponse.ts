import { mockSurveyResponse } from '../../domain/mocks'
import type { SaveSurveyResponse } from '@/domain/useCases/SaveSurveyResponse'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'

export const mockSaveSurveyResponse = (): SaveSurveyResponse => {
  class SaveSurveyResponseStub implements SaveSurveyResponse {
    async save (): Promise<SurveyResponse> {
      return mockSurveyResponse()
    }
  }
  return new SaveSurveyResponseStub()
}
