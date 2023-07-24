import { RemoteAuthentication } from '@/data/useCases/authentication/RemoteAuthentication'
import { makeAxiosHttpClient } from '../../http/axiosHttpClientFactory'
import { makeApiUrl } from '../../http/apiUrlFactory'

export const makeRemoteAuthentication = (): RemoteAuthentication => {
  return new RemoteAuthentication(makeApiUrl('/login'), makeAxiosHttpClient())
}
