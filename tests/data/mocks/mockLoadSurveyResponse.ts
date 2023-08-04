import { mockSurveyResponse } from '../../domain/mocks'
import type { LoadSurveyResponse } from '@/domain/useCases/LoadSurveyResponse'
import type { SurveyResponse } from '@/domain/models/SurveyResponse'

export const mockLoadSurveyResponse = (): LoadSurveyResponse => {
  class LoadSurveyResponseStub implements LoadSurveyResponse {
    async load (): Promise<SurveyResponse> {
      return mockSurveyResponse()
    }
  }
  return new LoadSurveyResponseStub()
}
