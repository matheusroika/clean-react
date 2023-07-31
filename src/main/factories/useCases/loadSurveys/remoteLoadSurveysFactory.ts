import { RemoteLoadSurveys } from '@/data/useCases/loadSurveys/remoteLoadSurveys'
import { makeApiUrl } from '../../http/apiUrlFactory'
import { makeAxiosHttpClient } from '../../http/axiosHttpClientFactory'

export const makeRemoteLoadSurveys = (): RemoteLoadSurveys => {
  return new RemoteLoadSurveys(makeApiUrl('/surveys'), makeAxiosHttpClient())
}
