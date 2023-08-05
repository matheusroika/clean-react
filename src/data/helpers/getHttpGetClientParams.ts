import type { Account } from '@/domain/models/Account'
import type { HttpGetParams } from '../protocols/http'

export type Headers = {
  'x-access-token': string
}

export const getHttpGetClientParams = (url: string, account: Account): HttpGetParams<any> => {
  let httpGetClientParams: HttpGetParams<Headers> = { url }
  /* istanbul ignore next */
  if (account?.accessToken && account?.name && account?.email) {
    httpGetClientParams = {
      ...httpGetClientParams,
      headers: {
        'x-access-token': account.accessToken
      }
    }
  }
  return httpGetClientParams
}
