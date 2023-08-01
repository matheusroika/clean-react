import { mockSurveys } from '../../domain/mocks'
import type { LoadSurveys } from '@/domain/useCases/LoadSurveys'
import type { Survey } from '@/domain/models/Survey'

export const mockLoadSurveys = (amount = 1): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async loadAll (): Promise<Survey[]> {
      return mockSurveys(amount)
    }
  }
  return new LoadSurveyStub()
}
