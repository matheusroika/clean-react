import { RemoteLoadSurveys } from '@/data/useCases/loadSurveys/remoteLoadSurveys'
import { makeApiUrl } from '../../http/apiUrlFactory'
import { makeAuthHttpClientDecorator } from '../../decorators/authHttpClientDecoratorFactory'

export const makeRemoteLoadSurveys = (): RemoteLoadSurveys => {
  return new RemoteLoadSurveys(makeApiUrl('/surveys'), makeAuthHttpClientDecorator())
}
