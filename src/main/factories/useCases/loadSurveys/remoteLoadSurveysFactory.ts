import { RemoteLoadSurveys } from '@/data/useCases/loadSurveys/remoteLoadSurveys'
import { makeApiUrl } from '../../http/apiUrlFactory'
import { makeAxiosHttpClient } from '../../http/axiosHttpClientFactory'
import { makeLocalStorageAdapter } from '../../cache/localStorageAdapterFactory'
import { redirectAdapter } from '@/main/adapters/redirectAdapter'

export const makeRemoteLoadSurveys = (): RemoteLoadSurveys => {
  return new RemoteLoadSurveys(makeApiUrl('/surveys'), makeAxiosHttpClient(), makeLocalStorageAdapter(), redirectAdapter)
}
