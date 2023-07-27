import { RemoteAddAccount } from '@/data/useCases/addAccount/remoteAddAccount'
import { makeAxiosHttpClient } from '../../http/axiosHttpClientFactory'
import { makeApiUrl } from '../../http/apiUrlFactory'

export const makeRemoteAddAccount = (): RemoteAddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
