import { makeApiUrl } from '../../http/apiUrlFactory'
import { makeAxiosHttpClient } from '../../http/axiosHttpClientFactory'
import { RemoteLoadSurveyResponse } from '@/data/useCases/loadSurveyResponse/remoteLoadSurveyResponse'

export const makeRemoteLoadSurveyResponse = (id: string): RemoteLoadSurveyResponse => {
  return new RemoteLoadSurveyResponse(makeApiUrl(`/surveys/${id}/results`), makeAxiosHttpClient())
}
