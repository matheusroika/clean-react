import { RemoteLoadSurveyResponse } from '@/data/useCases/loadSurveyResponse/remoteLoadSurveyResponse'
import { makeApiUrl } from '../../http/apiUrlFactory'
import { makeAuthHttpClientDecorator } from '../../decorators/authHttpClientDecoratorFactory'

export const makeRemoteLoadSurveyResponse = (id: string): RemoteLoadSurveyResponse => {
  return new RemoteLoadSurveyResponse(makeApiUrl(`/surveys/${id}/response`), makeAuthHttpClientDecorator())
}
