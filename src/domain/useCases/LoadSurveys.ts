import type { Survey } from '../models/Survey'

export interface LoadSurveys {
  loadAll: () => Promise<Survey[]>
}
