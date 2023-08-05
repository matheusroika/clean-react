import { RemoteSaveSurveyResponse } from '@/data/useCases/saveSurveyResponse/remoteSaveSurveyResponse'
import { makeApiUrl } from '../../http/apiUrlFactory'
import { makeAuthHttpClientDecorator } from '../../decorators/authHttpClientDecoratorFactory'

export const makeRemoteSaveSurveyResponse = (id: string): RemoteSaveSurveyResponse => {
  return new RemoteSaveSurveyResponse(makeApiUrl(`/surveys/${id}/response`), makeAuthHttpClientDecorator())
}
